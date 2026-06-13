const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DailyFocus = require('../models/DailyFocus');

// Helper: fecha de hoy YYYY-MM-DD. El cliente puede enviar su fecha local (?fecha=).
const resolveFecha = (raw) => {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return new Date().toISOString().slice(0, 10);
};

// GET /api/dailyfocus/today — obtiene (o crea vacío) el plan del día.
router.get('/today', auth, async (req, res) => {
  try {
    const fecha = resolveFecha(req.query.fecha);
    let plan = await DailyFocus.findOne({ userId: req.user.id, fecha });

    if (!plan) {
      plan = await DailyFocus.create({
        userId: req.user.id,
        fecha,
        tareas: [],
        habitos: [],
        agenda: []
      });
    }

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('[dailyfocus/today GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo el plan del día' });
  }
});

// PUT /api/dailyfocus/today — upsert del plan del día con los campos provistos.
router.put('/today', auth, async (req, res) => {
  try {
    const fecha = resolveFecha(req.body.fecha);
    const { energia, horasSueno, tareas, habitos, agenda } = req.body;

    // Solo aplicamos los campos presentes (update parcial).
    const update = {};
    if (energia !== undefined) update.energia = energia;
    if (horasSueno !== undefined) update.horasSueno = horasSueno;
    if (Array.isArray(tareas)) update.tareas = tareas.slice(0, 3); // 3 tareas críticas máx.
    if (Array.isArray(habitos)) update.habitos = habitos;
    if (Array.isArray(agenda)) update.agenda = agenda;

    const plan = await DailyFocus.findOneAndUpdate(
      { userId: req.user.id, fecha },
      { $set: update, $setOnInsert: { userId: req.user.id, fecha } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('[dailyfocus/today PUT]', error);
    res.status(500).json({ success: false, message: 'Error guardando el plan del día' });
  }
});

module.exports = router;
