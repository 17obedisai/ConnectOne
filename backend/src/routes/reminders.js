const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reminder = require('../models/Reminder');

// GET /api/reminders — todos los recordatorios del usuario (pendientes primero, por fecha).
router.get('/', auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id })
      .sort({ completado: 1, fechaLimite: 1, createdAt: -1 });
    res.json({ success: true, data: reminders });
  } catch (error) {
    console.error('[reminders GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo recordatorios' });
  }
});

// POST /api/reminders — crear.
router.post('/', auth, async (req, res) => {
  try {
    const { titulo, categoria, fechaLimite, notas } = req.body;
    if (!titulo || !titulo.trim()) {
      return res.status(400).json({ success: false, message: 'El título es obligatorio' });
    }
    const reminder = await Reminder.create({
      userId: req.user.id,
      titulo: titulo.trim(),
      categoria: categoria || 'otro',
      fechaLimite: fechaLimite || null,
      notas: notas || ''
    });
    res.status(201).json({ success: true, data: reminder });
  } catch (error) {
    console.error('[reminders POST]', error);
    res.status(500).json({ success: false, message: 'Error creando el recordatorio' });
  }
});

// PUT /api/reminders/:id — actualizar (editar o togglear completado). Solo del propio usuario.
router.put('/:id', auth, async (req, res) => {
  try {
    const { titulo, categoria, fechaLimite, completado, notas } = req.body;
    const update = {};
    if (titulo !== undefined) update.titulo = titulo;
    if (categoria !== undefined) update.categoria = categoria;
    if (fechaLimite !== undefined) update.fechaLimite = fechaLimite;
    if (completado !== undefined) update.completado = completado;
    if (notas !== undefined) update.notas = notas;

    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: update },
      { new: true }
    );
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Recordatorio no encontrado' });
    }
    res.json({ success: true, data: reminder });
  } catch (error) {
    console.error('[reminders PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando el recordatorio' });
  }
});

// DELETE /api/reminders/:id — eliminar (solo del propio usuario).
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Recordatorio no encontrado' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('[reminders DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando el recordatorio' });
  }
});

module.exports = router;
