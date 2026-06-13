const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Questionnaire = require('../models/Questionnaire');
const { isConfigured, generateAssistantReply } = require('../services/gemini');

// GET /api/ai/status — ¿está el motor de IA configurado en el servidor?
router.get('/status', auth, (req, res) => {
  res.json({ success: true, configured: isConfigured() });
});

// POST /api/ai/assistant — chat con el coach Energiko.
// body: { message: string, history?: [{role,text}], context?: { energia, minutosLibres, ... } }
router.post('/assistant', auth, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'El mensaje es obligatorio' });
    }

    // Enriquecemos el contexto con datos reales del usuario (no confiamos en el cliente
    // para identidad: nombre/nivel/intereses se leen de la base de datos).
    const [usuario, cuestionario] = await Promise.all([
      User.findById(req.user.id).select('nombre nivel perfilInicial'),
      Questionnaire.findOne({ userId: req.user.id }).select('interests main_goal')
    ]);

    const serverContext = {
      nombre: usuario?.nombre,
      nivel: usuario?.nivel,
      intereses: cuestionario?.interests || usuario?.perfilInicial?.intereses || []
    };

    // El cliente puede aportar contexto efímero (energía de hoy, minutos libres, tareas).
    const mergedContext = {
      ...serverContext,
      energia: context.energia,
      horasSueno: context.horasSueno,
      minutosLibres: context.minutosLibres,
      tareasFoco: Array.isArray(context.tareasFoco) ? context.tareasFoco.slice(0, 5) : undefined
    };

    // Limitamos el historial para controlar tokens/costo.
    const safeHistory = Array.isArray(history) ? history.slice(-10) : [];

    const result = await generateAssistantReply({
      message: message.trim(),
      history: safeHistory,
      context: mergedContext
    });

    res.json({
      success: result.ok,
      configured: result.configured,
      reply: result.text
    });
  } catch (error) {
    console.error('[ai/assistant]', error);
    res.status(500).json({ success: false, message: 'Error en el asistente de IA' });
  }
});

// POST /api/ai/reflect — reflexión breve del coach sobre el cierre de día.
// body: { aprendizaje, gratitud, concentracion, calidadSueno, nivelEstres }
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

    const result = await generateAssistantReply({
      message,
      context: { nombre: usuario?.nombre }
    });

    res.json({ success: result.ok, configured: result.configured, reflexion: result.text });
  } catch (error) {
    console.error('[ai/reflect]', error);
    res.status(500).json({ success: false, message: 'Error generando la reflexión' });
  }
});

module.exports = router;
