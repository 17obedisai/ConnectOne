const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');
const Curso = require('../models/Curso');
const User = require('../models/User');
const Questionnaire = require('../models/Questionnaire');
const { generateCursoOutline, generateLeccionContenido } = require('../services/gemini');

// Generar con IA cuesta tokens: limiter dedicado.
const iaLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false, message: { message: 'Límite de generación alcanzado. Intenta en unos minutos.' } });

// Resumen de progreso de un curso (sin volcar todo el contenido en la lista).
const resumen = (c) => {
  const lecciones = c.modulos.reduce((a, m) => a + m.lecciones.length, 0);
  const hechas = c.modulos.reduce((a, m) => a + m.lecciones.filter((l) => l.completada).length, 0);
  return {
    _id: c._id, titulo: c.titulo, categoria: c.categoria, nivel: c.nivel, descripcion: c.descripcion,
    valoracion: c.valoracion, modulos: c.modulos.length, lecciones, leccionesHechas: hechas,
    progreso: lecciones ? Math.round((hechas / lecciones) * 100) : 0
  };
};

// GET /api/academia — lista de cursos del usuario (resumen).
router.get('/', auth, async (req, res) => {
  try {
    const cursos = await Curso.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: cursos.map(resumen) });
  } catch (error) {
    console.error('[academia GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo cursos' });
  }
});

// GET /api/academia/:id — curso completo (con módulos y lecciones).
router.get('/:id', auth, async (req, res) => {
  try {
    const curso = await Curso.findOne({ _id: req.params.id, userId: req.user.id });
    if (!curso) return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    res.json({ success: true, data: curso });
  } catch (error) {
    console.error('[academia/:id]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo el curso' });
  }
});

// POST /api/academia/generar — la IA crea el esquema de un curso para un tema.
router.post('/generar', auth, iaLimiter, async (req, res) => {
  try {
    const { tema, nivel } = req.body;
    if (!tema || !tema.trim()) return res.status(400).json({ success: false, message: 'Indica qué quieres aprender' });

    const cuestionario = await Questionnaire.findOne({ userId: req.user.id }).select('interests');
    const result = await generateCursoOutline({ tema: tema.trim(), nivel: nivel || 'principiante', intereses: cuestionario?.interests || [] });
    if (!result.ok || !result.curso) {
      return res.status(result.configured ? 502 : 503).json({ success: false, message: result.configured ? 'La IA no pudo crear el curso. Intenta de nuevo.' : 'El motor de IA no está configurado.' });
    }

    const curso = await Curso.create({ userId: req.user.id, ...result.curso });
    res.status(201).json({ success: true, data: curso });
  } catch (error) {
    console.error('[academia/generar]', error);
    res.status(500).json({ success: false, message: 'Error creando el curso' });
  }
});

// POST /api/academia/:id/leccion/:mi/:li/contenido — genera (o devuelve) el contenido de una lección.
router.post('/:id/leccion/:mi/:li/contenido', auth, iaLimiter, async (req, res) => {
  try {
    const mi = parseInt(req.params.mi, 10);
    const li = parseInt(req.params.li, 10);
    const curso = await Curso.findOne({ _id: req.params.id, userId: req.user.id });
    if (!curso || !curso.modulos[mi] || !curso.modulos[mi].lecciones[li]) {
      return res.status(404).json({ success: false, message: 'Lección no encontrada' });
    }
    const leccion = curso.modulos[mi].lecciones[li];

    // Si ya se generó, la devolvemos cacheada (no regeneramos).
    if (leccion.generada && leccion.contenido?.pasos?.length) {
      return res.json({ success: true, data: leccion.contenido, cacheada: true });
    }

    const result = await generateLeccionContenido({
      cursoTitulo: curso.titulo, moduloTitulo: curso.modulos[mi].titulo, leccionTitulo: leccion.titulo, nivel: curso.nivel
    });
    if (!result.ok || !result.contenido) {
      return res.status(result.configured ? 502 : 503).json({ success: false, message: result.configured ? 'No pude generar la lección. Intenta de nuevo.' : 'El motor de IA no está configurado.' });
    }

    leccion.contenido = result.contenido;
    leccion.generada = true;
    await curso.save();
    res.json({ success: true, data: result.contenido, cacheada: false });
  } catch (error) {
    console.error('[academia/leccion/contenido]', error);
    res.status(500).json({ success: false, message: 'Error generando la lección' });
  }
});

// POST /api/academia/:id/leccion/:mi/:li/completar — completa una lección y otorga XP.
router.post('/:id/leccion/:mi/:li/completar', auth, async (req, res) => {
  try {
    const mi = parseInt(req.params.mi, 10);
    const li = parseInt(req.params.li, 10);
    const curso = await Curso.findOne({ _id: req.params.id, userId: req.user.id });
    if (!curso || !curso.modulos[mi] || !curso.modulos[mi].lecciones[li]) {
      return res.status(404).json({ success: false, message: 'Lección no encontrada' });
    }
    const leccion = curso.modulos[mi].lecciones[li];
    if (leccion.completada) return res.status(400).json({ success: false, message: 'Esa lección ya está completada' });

    leccion.completada = true;
    leccion.completadaEn = new Date();
    await curso.save();

    const XP = 50;
    const usuario = await User.findByIdAndUpdate(req.user.id, { $inc: { experiencia: XP } }, { new: true }).select('experiencia');
    res.json({ success: true, data: { curso: resumen(curso), xpGanado: XP, experiencia: usuario?.experiencia } });
  } catch (error) {
    console.error('[academia/leccion/completar]', error);
    res.status(500).json({ success: false, message: 'Error completando la lección' });
  }
});

// PUT /api/academia/:id/valorar — valoración del curso (1-5).
router.put('/:id/valorar', auth, async (req, res) => {
  try {
    const valoracion = Math.min(Math.max(parseInt(req.body.valoracion, 10) || 0, 1), 5);
    const curso = await Curso.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $set: { valoracion } }, { new: true });
    if (!curso) return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    res.json({ success: true, data: { valoracion: curso.valoracion } });
  } catch (error) {
    console.error('[academia/valorar]', error);
    res.status(500).json({ success: false, message: 'Error guardando la valoración' });
  }
});

// DELETE /api/academia/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const del = await Curso.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    res.json({ success: true });
  } catch (error) {
    console.error('[academia DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando el curso' });
  }
});

module.exports = router;
