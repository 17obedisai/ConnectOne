const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Proyecto = require('../models/Proyecto');
const User = require('../models/User');

// GET /api/proyectos
router.get('/', auth, async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ userId: req.user.id }).sort({ estado: 1, updatedAt: -1 });
    res.json({ success: true, data: proyectos });
  } catch (error) {
    console.error('[proyectos GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo proyectos' });
  }
});

// POST /api/proyectos
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !nombre.trim()) return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    const p = await Proyecto.create({ userId: req.user.id, nombre: nombre.trim(), descripcion: descripcion || '' });
    res.status(201).json({ success: true, data: p });
  } catch (error) {
    console.error('[proyectos POST]', error);
    res.status(500).json({ success: false, message: 'Error creando el proyecto' });
  }
});

// PUT /api/proyectos/:id — editar nombre/descripcion/estado/progreso.
router.put('/:id', auth, async (req, res) => {
  try {
    const campos = ['nombre', 'descripcion', 'estado', 'progreso'];
    const update = {};
    for (const c of campos) if (req.body[c] !== undefined) update[c] = req.body[c];
    const p = await Proyecto.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $set: update }, { new: true });
    if (!p) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
    res.json({ success: true, data: p });
  } catch (error) {
    console.error('[proyectos PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando el proyecto' });
  }
});

// POST /api/proyectos/:id/avance — registra un avance (+20 XP) y opcionalmente actualiza progreso.
router.post('/:id/avance', auth, async (req, res) => {
  try {
    const { texto, progreso } = req.body;
    if (!texto || !texto.trim()) return res.status(400).json({ success: false, message: 'Escribe tu avance' });
    const p = await Proyecto.findOne({ _id: req.params.id, userId: req.user.id });
    if (!p) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
    p.avances.unshift({ texto: texto.trim(), fecha: new Date() });
    if (progreso !== undefined) p.progreso = Math.min(Math.max(Number(progreso) || 0, 0), 100);
    await p.save();
    const usuario = await User.findByIdAndUpdate(req.user.id, { $inc: { experiencia: 20 } }, { new: true }).select('experiencia');
    res.json({ success: true, data: p, xpGanado: 20, experiencia: usuario?.experiencia });
  } catch (error) {
    console.error('[proyectos/avance]', error);
    res.status(500).json({ success: false, message: 'Error registrando el avance' });
  }
});

// DELETE /api/proyectos/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const del = await Proyecto.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando el proyecto' });
  }
});

module.exports = router;
