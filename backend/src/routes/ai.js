const express = require('express');
const router = express.Router();
const { Type } = require('@google/genai');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Questionnaire = require('../models/Questionnaire');
const DailyFocus = require('../models/DailyFocus');
const Reminder = require('../models/Reminder');
const Transaction = require('../models/Transaction');
const JournalEntry = require('../models/JournalEntry');
const Note = require('../models/Note');
const Reto = require('../models/Reto');
const { isConfigured, generateAssistantReply, runAssistantAgent, generateDayPlan } = require('../services/gemini');

// Reúne el contexto de HOY del usuario (plan, hábitos, retos) para la IA.
const contextoDeHoy = async (userId) => {
  const fecha = hoy();
  const [plan, retos] = await Promise.all([
    DailyFocus.findOne({ userId, fecha }),
    Reto.find({ userId, completado: false }).limit(5).select('titulo')
  ]);
  return {
    energia: plan?.energia,
    horasSueno: plan?.horasSueno,
    tareasFoco: (plan?.tareas || []).filter((t) => !t.completada).map((t) => t.texto),
    agendaHoy: (plan?.agenda || []).map((b) => `${b.inicio}${b.fin ? '-' + b.fin : ''} ${b.titulo}`),
    habitosHoy: (plan?.habitos || []).map((h) => h.nombre),
    retosPendientes: retos.map((r) => r.titulo),
    plan
  };
};

const hoy = () => new Date().toISOString().slice(0, 10);
const esFecha = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);

// Declaración de herramientas que el agente Energiko puede invocar.
const toolDeclarations = [
  {
    name: 'crear_recordatorio',
    description: 'Crea un recordatorio de gestión práctica (ej. cambio de aceite de la moto, renovar un documento, una cita).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING, description: 'Qué hay que recordar' },
        categoria: { type: Type.STRING, enum: ['moto', 'documento', 'salud', 'finanzas', 'hogar', 'otro'] },
        fechaLimite: { type: Type.STRING, description: 'Fecha límite en formato YYYY-MM-DD (opcional)' }
      },
      required: ['titulo']
    }
  },
  {
    name: 'agendar_bloque',
    description: 'Agenda un bloque de tiempo en la agenda de un día concreto (ej. domingo 2h de piano, viernes 7pm mezclar una canción).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        fecha: { type: Type.STRING, description: 'Día del bloque en formato YYYY-MM-DD' },
        inicio: { type: Type.STRING, description: 'Hora de inicio HH:MM (24h)' },
        fin: { type: Type.STRING, description: 'Hora de fin HH:MM (24h), opcional' },
        tipo: { type: Type.STRING, enum: ['trabajo', 'estudio', 'descanso', 'fitness'] }
      },
      required: ['titulo', 'fecha', 'inicio']
    }
  },
  {
    name: 'agregar_tarea_critica',
    description: 'Agrega una tarea crítica al Focus del Día de HOY (máximo 3 tareas).',
    parameters: {
      type: Type.OBJECT,
      properties: { texto: { type: Type.STRING } },
      required: ['texto']
    }
  },
  {
    name: 'registrar_movimiento',
    description: 'Registra un ingreso o un gasto en el hub financiero.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        tipo: { type: Type.STRING, enum: ['ingreso', 'gasto'] },
        monto: { type: Type.NUMBER, description: 'Monto en pesos (COP)' },
        categoria: { type: Type.STRING },
        descripcion: { type: Type.STRING }
      },
      required: ['tipo', 'monto']
    }
  },
  {
    name: 'anotar_aprendizaje',
    description: 'Guarda en la bitácora de HOY qué aprendió el usuario y/o qué agradece.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        aprendizaje: { type: Type.STRING },
        gratitud: { type: Type.STRING }
      }
    }
  },
  {
    name: 'crear_nota',
    description: 'Guarda una nota rápida del usuario (idea, avance de un proyecto, página de un libro, recordatorio personal).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        contenido: { type: Type.STRING },
        categoria: { type: Type.STRING, enum: ['idea', 'proyecto', 'lectura', 'personal', 'tarea', 'otro'] }
      },
      required: ['contenido']
    }
  },
  {
    name: 'crear_reto',
    description: 'Crea un reto secundario para días libres (ej. "subir a un mirador", "correr 5 km", "visitar un lugar nuevo").',
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        descripcion: { type: Type.STRING },
        categoria: { type: Type.STRING, enum: ['aventura', 'naturaleza', 'fitness', 'social', 'creatividad', 'aprendizaje', 'hogar', 'mente', 'otro'] },
        contexto: { type: Type.STRING, enum: ['aire_libre', 'casa', 'ciudad', 'cualquiera'] }
      },
      required: ['titulo']
    }
  }
];

// Fábrica del ejecutor de herramientas: cierra sobre el userId autenticado.
const makeExecuteTool = (userId) => async (name, args) => {
  switch (name) {
    case 'crear_recordatorio': {
      const r = await Reminder.create({
        userId,
        titulo: (args.titulo || '').trim(),
        categoria: args.categoria || 'otro',
        fechaLimite: esFecha(args.fechaLimite) ? new Date(args.fechaLimite) : null
      });
      return { ok: true, tipo: 'recordatorio', id: r._id, titulo: r.titulo };
    }
    case 'agendar_bloque': {
      const fecha = esFecha(args.fecha) ? args.fecha : hoy();
      const bloque = {
        titulo: (args.titulo || '').trim(),
        inicio: args.inicio || '',
        fin: args.fin || '',
        tipo: ['trabajo', 'estudio', 'descanso', 'fitness'].includes(args.tipo) ? args.tipo : 'trabajo'
      };
      await DailyFocus.findOneAndUpdate(
        { userId, fecha },
        { $push: { agenda: bloque }, $setOnInsert: { userId, fecha } },
        { upsert: true, setDefaultsOnInsert: true }
      );
      return { ok: true, tipo: 'agenda', fecha, ...bloque };
    }
    case 'agregar_tarea_critica': {
      const fecha = hoy();
      const plan = await DailyFocus.findOne({ userId, fecha });
      if (plan && plan.tareas.length >= 3) {
        return { ok: false, motivo: 'Ya tienes 3 tareas críticas hoy' };
      }
      await DailyFocus.findOneAndUpdate(
        { userId, fecha },
        { $push: { tareas: { texto: (args.texto || '').trim(), completada: false } }, $setOnInsert: { userId, fecha } },
        { upsert: true, setDefaultsOnInsert: true }
      );
      return { ok: true, tipo: 'tarea', texto: args.texto };
    }
    case 'registrar_movimiento': {
      const monto = Number(args.monto);
      if (!Number.isFinite(monto) || monto <= 0) return { ok: false, motivo: 'Monto inválido' };
      const t = await Transaction.create({
        userId,
        tipo: args.tipo === 'ingreso' ? 'ingreso' : 'gasto',
        monto,
        categoria: args.categoria || 'otro',
        descripcion: args.descripcion || ''
      });
      return { ok: true, tipo: 'movimiento', movimiento: t.tipo, monto: t.monto, categoria: t.categoria };
    }
    case 'anotar_aprendizaje': {
      const fecha = hoy();
      const update = {};
      if (args.aprendizaje) update.aprendizaje = args.aprendizaje;
      if (args.gratitud) update.gratitud = args.gratitud;
      if (!Object.keys(update).length) return { ok: false, motivo: 'Nada que anotar' };
      await JournalEntry.findOneAndUpdate(
        { userId, fecha },
        { $set: update, $setOnInsert: { userId, fecha } },
        { upsert: true, setDefaultsOnInsert: true }
      );
      return { ok: true, tipo: 'journal', ...update };
    }
    case 'crear_nota': {
      if (!args.contenido || !args.contenido.trim()) return { ok: false, motivo: 'Nota vacía' };
      const n = await Note.create({
        userId,
        contenido: args.contenido.trim(),
        categoria: ['idea', 'proyecto', 'lectura', 'personal', 'tarea', 'otro'].includes(args.categoria) ? args.categoria : 'otro'
      });
      return { ok: true, tipo: 'nota', id: n._id, contenido: n.contenido };
    }
    case 'crear_reto': {
      if (!args.titulo || !args.titulo.trim()) return { ok: false, motivo: 'Reto sin título' };
      const r = await Reto.create({
        userId,
        titulo: args.titulo.trim(),
        descripcion: args.descripcion || '',
        categoria: ['aventura', 'naturaleza', 'fitness', 'social', 'creatividad', 'aprendizaje', 'hogar', 'mente', 'otro'].includes(args.categoria) ? args.categoria : 'otro',
        contexto: ['aire_libre', 'casa', 'ciudad', 'cualquiera'].includes(args.contexto) ? args.contexto : 'cualquiera',
        personalizado: true
      });
      return { ok: true, tipo: 'reto', id: r._id, titulo: r.titulo };
    }
    default:
      return { ok: false, motivo: `Herramienta desconocida: ${name}` };
  }
};

// GET /api/ai/status — ¿está el motor de IA configurado en el servidor?
router.get('/status', auth, (req, res) => {
  res.json({ success: true, configured: isConfigured() });
});

// POST /api/ai/assistant — chat AGÉNTICO: Energiko conversa y EJECUTA acciones en la app.
router.post('/assistant', auth, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'El mensaje es obligatorio' });
    }

    const [usuario, cuestionario, hoyCtx] = await Promise.all([
      User.findById(req.user.id).select('nombre nivel perfilInicial'),
      Questionnaire.findOne({ userId: req.user.id }).select('interests main_goal'),
      contextoDeHoy(req.user.id)
    ]);

    // Contexto rico: datos reales de hoy (del servidor) + lo efímero del cliente.
    const mergedContext = {
      fechaActual: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'short' }),
      nombre: usuario?.nombre,
      nivel: usuario?.nivel,
      objetivo: cuestionario?.main_goal || (usuario?.perfilInicial?.objetivos || [])[0],
      intereses: cuestionario?.interests || usuario?.perfilInicial?.intereses || [],
      energia: hoyCtx.energia ?? context.energia,
      horasSueno: hoyCtx.horasSueno ?? context.horasSueno,
      minutosLibres: context.minutosLibres,
      tareasFoco: hoyCtx.tareasFoco?.length ? hoyCtx.tareasFoco.slice(0, 5) : (Array.isArray(context.tareasFoco) ? context.tareasFoco.slice(0, 5) : undefined),
      agendaHoy: hoyCtx.agendaHoy,
      habitosHoy: hoyCtx.habitosHoy,
      retosPendientes: hoyCtx.retosPendientes
    };

    const result = await runAssistantAgent({
      message: message.trim(),
      history: Array.isArray(history) ? history.slice(-10) : [],
      context: mergedContext,
      tools: toolDeclarations,
      executeTool: makeExecuteTool(req.user.id)
    });

    res.json({
      success: result.ok,
      configured: result.configured,
      reply: result.text,
      acciones: result.acciones || []
    });
  } catch (error) {
    console.error('[ai/assistant]', error);
    res.status(500).json({ success: false, message: 'Error en el asistente de IA' });
  }
});

// POST /api/ai/plan-dia — Energiko ARMA el día: rutina, recomendaciones y (opcional) agenda.
router.post('/plan-dia', auth, async (req, res) => {
  try {
    const fecha = hoy();
    const [usuario, cuestionario, hoyCtx] = await Promise.all([
      User.findById(req.user.id).select('nombre perfilInicial'),
      Questionnaire.findOne({ userId: req.user.id }).select('interests main_goal'),
      contextoDeHoy(req.user.id)
    ]);

    const context = {
      fechaActual: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'short' }),
      nombre: usuario?.nombre,
      objetivo: cuestionario?.main_goal || (usuario?.perfilInicial?.objetivos || [])[0],
      intereses: cuestionario?.interests || usuario?.perfilInicial?.intereses || [],
      energia: hoyCtx.energia,
      horasSueno: hoyCtx.horasSueno,
      tareasFoco: hoyCtx.tareasFoco,
      retosPendientes: hoyCtx.retosPendientes,
      preferencias: req.body?.preferencias
    };

    const result = await generateDayPlan({ context });
    if (!result.ok || !result.plan) {
      return res.status(result.configured ? 502 : 503).json({
        success: false,
        message: result.configured ? 'No pude armar tu día. Intenta de nuevo.' : 'El motor de IA no está configurado.'
      });
    }

    // Reemplaza la agenda de hoy con la rutina propuesta y guarda el resumen.
    const plan = await DailyFocus.findOneAndUpdate(
      { userId: req.user.id, fecha },
      {
        $set: { agenda: result.plan.bloques, resumenIA: result.plan.resumen, recomendaciones: result.plan.recomendaciones },
        $setOnInsert: { userId: req.user.id, fecha }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: { ...result.plan, agenda: plan.agenda } });
  } catch (error) {
    console.error('[ai/plan-dia]', error);
    res.status(500).json({ success: false, message: 'Error armando el día' });
  }
});

// POST /api/ai/reflect — reflexión breve del coach sobre el cierre de día.
router.post('/reflect', auth, async (req, res) => {
  try {
    const { aprendizaje, gratitud, concentracion, calidadSueno, nivelEstres } = req.body;
    const usuario = await User.findById(req.user.id).select('nombre');

    const partes = [];
    if (aprendizaje) partes.push(`Hoy aprendí: ${aprendizaje}`);
    if (gratitud) partes.push(`Agradezco: ${gratitud}`);
    if (concentracion) partes.push(`Concentración del día: ${concentracion}/5`);
    if (calidadSueno) partes.push(`Calidad de sueño: ${calidadSueno}/5`);
    if (nivelEstres) partes.push(`Nivel de estrés: ${nivelEstres}/5`);

    if (!partes.length) {
      return res.status(400).json({ success: false, message: 'Completa tu cierre de día primero' });
    }

    const message =
      `Este es el cierre de mi día:\n${partes.join('\n')}\n\n` +
      'Dame una reflexión breve (máx 3 frases): reconoce lo bueno, señala UN patrón a cuidar ' +
      'y propón UN foco concreto para mañana. Tono cálido pero directo.';

    const result = await generateAssistantReply({ message, context: { nombre: usuario?.nombre } });
    res.json({ success: result.ok, configured: result.configured, reflexion: result.text });
  } catch (error) {
    console.error('[ai/reflect]', error);
    res.status(500).json({ success: false, message: 'Error generando la reflexión' });
  }
});

module.exports = router;
