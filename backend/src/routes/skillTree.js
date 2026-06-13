const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');
const SkillTree = require('../models/SkillTree');
const User = require('../models/User');
const { generateSkillTree } = require('../services/gemini');

// Generar con IA cuesta tokens: limiter dedicado (15 generaciones / 15 min por IP).
const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Límite de generación de rutas alcanzado. Intenta en unos minutos.' }
});

// GET /api/skilltree — todas las rutas del usuario.
router.get('/', auth, async (req, res) => {
  try {
    const trees = await SkillTree.find({ userId: req.user.id });
    res.json({ success: true, data: trees });
  } catch (error) {
    console.error('[skilltree GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo tus rutas' });
  }
});

// POST /api/skilltree/generate — genera (o regenera) la ruta de un área con Gemini.
// body: { area, nombre, descripcion }
router.post('/generate', auth, generateLimiter, async (req, res) => {
  try {
    const { area, nombre, descripcion } = req.body;
    if (!area || !nombre) {
      return res.status(400).json({ success: false, message: 'Área y nombre son obligatorios' });
    }

    const usuario = await User.findById(req.user.id).select('nivel');
    const result = await generateSkillTree({
      nombreArea: nombre,
      descripcionArea: descripcion || '',
      nivelUsuario: usuario?.nivel || 1
    });

    if (!result.ok || result.nodos.length === 0) {
      return res.status(result.configured ? 502 : 503).json({
        success: false,
        message: result.configured
          ? 'La IA no pudo generar la ruta. Intenta de nuevo.'
          : 'El motor de IA no está configurado en el servidor.'
      });
    }

    const tree = await SkillTree.findOneAndUpdate(
      { userId: req.user.id, area },
      {
        $set: {
          nombre,
          nodos: result.nodos.map((n) => ({ ...n, completado: false })),
          generadoPorIA: true
        },
        $setOnInsert: { userId: req.user.id, area }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: tree });
  } catch (error) {
    console.error('[skilltree/generate]', error);
    res.status(500).json({ success: false, message: 'Error generando la ruta' });
  }
});

// POST /api/skilltree/:area/complete/:orden — completa un nodo (desbloqueo secuencial) y otorga XP.
router.post('/:area/complete/:orden', auth, async (req, res) => {
  try {
    const orden = parseInt(req.params.orden, 10);
    const tree = await SkillTree.findOne({ userId: req.user.id, area: req.params.area });

    if (!tree || !tree.nodos[orden]) {
      return res.status(404).json({ success: false, message: 'Nodo no encontrado' });
    }

    // Desbloqueo secuencial: solo se puede completar si el anterior ya está completo.
    if (orden > 0 && !tree.nodos[orden - 1].completado) {
      return res.status(400).json({ success: false, message: 'Completa primero el nodo anterior' });
    }

    if (tree.nodos[orden].completado) {
      return res.status(400).json({ success: false, message: 'Ese nodo ya está completado' });
    }

    tree.nodos[orden].completado = true;
    tree.nodos[orden].completadoEn = new Date();
    await tree.save();

    // Otorga la XP del nodo al usuario.
    const xp = tree.nodos[orden].xp || 0;
    const usuario = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { experiencia: xp } },
      { new: true }
    ).select('experiencia nivel');

    res.json({
      success: true,
      data: { tree, xpGanado: xp, experiencia: usuario?.experiencia, nivel: usuario?.nivel }
    });
  } catch (error) {
    console.error('[skilltree/complete]', error);
    res.status(500).json({ success: false, message: 'Error completando el nodo' });
  }
});

module.exports = router;
