const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// GET /api/notes — notas del usuario (más recientes primero).
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: notes });
  } catch (error) {
    console.error('[notes GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo notas' });
  }
});

// POST /api/notes — crear nota.
router.post('/', auth, async (req, res) => {
  try {
    const { contenido, categoria, fechaRecordatorio } = req.body;
    if (!contenido || !contenido.trim()) {
      return res.status(400).json({ success: false, message: 'La nota no puede estar vacía' });
    }
    const note = await Note.create({
      userId: req.user.id,
      contenido: contenido.trim(),
      categoria: categoria || 'otro',
      fechaRecordatorio: fechaRecordatorio || null
    });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error('[notes POST]', error);
    res.status(500).json({ success: false, message: 'Error creando la nota' });
  }
});

// PUT /api/notes/:id — editar (solo del propio usuario).
router.put('/:id', auth, async (req, res) => {
  try {
    const { contenido, categoria, fechaRecordatorio } = req.body;
    const update = {};
    if (contenido !== undefined) update.contenido = contenido;
    if (categoria !== undefined) update.categoria = categoria;
    if (fechaRecordatorio !== undefined) update.fechaRecordatorio = fechaRecordatorio;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: update },
      { new: true }
    );
    if (!note) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
    res.json({ success: true, data: note });
  } catch (error) {
    console.error('[notes PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando la nota' });
  }
});

// DELETE /api/notes/:id — eliminar (solo del propio usuario).
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
    res.json({ success: true });
  } catch (error) {
    console.error('[notes DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando la nota' });
  }
});

module.exports = router;
