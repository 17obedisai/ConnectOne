const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

const resolveFecha = (raw) => {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return new Date().toISOString().slice(0, 10);
};

// GET /api/journal/today — entrada de hoy (o null si no existe aún).
router.get('/today', auth, async (req, res) => {
  try {
    const fecha = resolveFecha(req.query.fecha);
    const entry = await JournalEntry.findOne({ userId: req.user.id, fecha });
    res.json({ success: true, data: entry });
  } catch (error) {
    console.error('[journal/today GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo la bitácora de hoy' });
  }
});

// GET /api/journal/recent?dias=7 — entradas recientes para historial y tendencias de vitalidad.
router.get('/recent', auth, async (req, res) => {
  try {
    const dias = Math.min(parseInt(req.query.dias, 10) || 7, 60);
    const entries = await JournalEntry.find({ userId: req.user.id })
      .sort({ fecha: -1 })
      .limit(dias);
    res.json({ success: true, data: entries });
  } catch (error) {
    console.error('[journal/recent]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo el historial' });
  }
});

// PUT /api/journal/today — upsert del cierre de día (update parcial).
router.put('/today', auth, async (req, res) => {
  try {
    const fecha = resolveFecha(req.body.fecha);
    const campos = ['aprendizaje', 'gratitud', 'concentracion', 'notas',
      'calidadSueno', 'nivelEstres', 'animo', 'reflexionIA'];

    const update = {};
    for (const c of campos) {
      if (req.body[c] !== undefined) update[c] = req.body[c];
    }

    const entry = await JournalEntry.findOneAndUpdate(
      { userId: req.user.id, fecha },
      { $set: update, $setOnInsert: { userId: req.user.id, fecha } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: entry });
  } catch (error) {
    console.error('[journal/today PUT]', error);
    res.status(500).json({ success: false, message: 'Error guardando la bitácora' });
  }
});

module.exports = router;
