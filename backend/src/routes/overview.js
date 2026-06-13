const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DailyFocus = require('../models/DailyFocus');
const JournalEntry = require('../models/JournalEntry');
const Transaction = require('../models/Transaction');
const Reminder = require('../models/Reminder');
const Note = require('../models/Note');

const hoyStr = () => new Date().toISOString().slice(0, 10);
const mesStr = (raw) => (/^\d{4}-\d{2}$/.test(raw || '') ? raw : new Date().toISOString().slice(0, 7));

// HH:MM -> minutos del día (o null).
const toMin = (hhmm) => {
  const [h, m] = String(hhmm || '').split(':').map(Number);
  return Number.isFinite(h) ? h * 60 + (Number.isFinite(m) ? m : 0) : null;
};

const promedio = (arr) => {
  const vals = arr.filter((v) => typeof v === 'number');
  return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
};

// GET /api/overview/today — resumen ejecutivo de HOY.
router.get('/today', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const fecha = hoyStr();
    const inicioDia = new Date(`${fecha}T00:00:00`);
    const finDia = new Date(`${fecha}T23:59:59.999`);

    const [plan, journal, notasHoy, txHoy] = await Promise.all([
      DailyFocus.findOne({ userId, fecha }),
      JournalEntry.findOne({ userId, fecha }),
      Note.countDocuments({ userId, createdAt: { $gte: inicioDia, $lte: finDia } }),
      Transaction.find({ userId, fecha: { $gte: inicioDia, $lte: finDia } })
    ]);

    const tareas = plan?.tareas || [];
    const habitos = plan?.habitos || [];
    let ingresos = 0, gastos = 0;
    for (const t of txHoy) (t.tipo === 'ingreso' ? (ingresos += t.monto) : (gastos += t.monto));

    res.json({
      success: true,
      data: {
        fecha,
        energia: plan?.energia ?? null,
        horasSueno: plan?.horasSueno ?? null,
        tareas: { hechas: tareas.filter((t) => t.completada).length, total: tareas.length, lista: tareas },
        habitos: { hechos: habitos.filter((h) => h.completado).length, total: habitos.length, lista: habitos },
        agenda: plan?.agenda || [],
        journal: journal
          ? { concentracion: journal.concentracion, calidadSueno: journal.calidadSueno, nivelEstres: journal.nivelEstres, aprendizaje: journal.aprendizaje, gratitud: journal.gratitud }
          : null,
        notasHoy,
        finanzasHoy: { ingresos, gastos, balance: ingresos - gastos, movimientos: txHoy.length }
      }
    });
  } catch (error) {
    console.error('[overview/today]', error);
    res.status(500).json({ success: false, message: 'Error generando el resumen de hoy' });
  }
});

// GET /api/overview/month?mes=YYYY-MM — recap del mes + datos para el calendario.
router.get('/month', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const mes = mesStr(req.query.mes);
    const inicioStr = `${mes}-01`;
    const [y, m] = mes.split('-').map(Number);
    const sigMes = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
    const finStr = `${sigMes}-01`;
    const inicioDate = new Date(`${inicioStr}T00:00:00`);
    const finDate = new Date(`${finStr}T00:00:00`);

    const [planes, journals, txs, recordatorios, notasMes] = await Promise.all([
      DailyFocus.find({ userId, fecha: { $gte: inicioStr, $lt: finStr } }),
      JournalEntry.find({ userId, fecha: { $gte: inicioStr, $lt: finStr } }),
      Transaction.find({ userId, fecha: { $gte: inicioDate, $lt: finDate } }),
      Reminder.find({ userId, fechaLimite: { $gte: inicioDate, $lt: finDate } }),
      Note.countDocuments({ userId, createdAt: { $gte: inicioDate, $lt: finDate } })
    ]);

    // Hábitos: días completados por nombre de hábito.
    const habitosPorNombre = {};
    let tareasCompletadas = 0;
    const horasPorTipo = { trabajo: 0, estudio: 0, descanso: 0, fitness: 0 };
    const calendario = {};

    for (const p of planes) {
      for (const h of p.habitos || []) {
        if (h.completado && h.nombre) habitosPorNombre[h.nombre] = (habitosPorNombre[h.nombre] || 0) + 1;
      }
      tareasCompletadas += (p.tareas || []).filter((t) => t.completada).length;
      for (const b of p.agenda || []) {
        const ini = toMin(b.inicio), fin = toMin(b.fin);
        if (ini != null && fin != null && fin > ini && horasPorTipo[b.tipo] != null) {
          horasPorTipo[b.tipo] += (fin - ini) / 60;
        }
      }
      calendario[p.fecha] = {
        agenda: (p.agenda || []).length,
        tareas: (p.tareas || []).length,
        journal: false,
        recordatorios: 0
      };
    }
    for (const j of journals) {
      calendario[j.fecha] = calendario[j.fecha] || { agenda: 0, tareas: 0, journal: false, recordatorios: 0 };
      calendario[j.fecha].journal = true;
    }
    for (const r of recordatorios) {
      const f = new Date(r.fechaLimite).toISOString().slice(0, 10);
      calendario[f] = calendario[f] || { agenda: 0, tareas: 0, journal: false, recordatorios: 0 };
      calendario[f].recordatorios += 1;
    }

    let ingresos = 0, gastos = 0;
    for (const t of txs) (t.tipo === 'ingreso' ? (ingresos += t.monto) : (gastos += t.monto));

    // Redondea horas por tipo.
    Object.keys(horasPorTipo).forEach((k) => { horasPorTipo[k] = +horasPorTipo[k].toFixed(1); });

    res.json({
      success: true,
      data: {
        mes,
        diasConActividad: planes.length,
        tareasCompletadas,
        habitosPorNombre,
        horasPorTipo,
        horasTotales: +Object.values(horasPorTipo).reduce((a, b) => a + b, 0).toFixed(1),
        journal: {
          dias: journals.length,
          concentracion: promedio(journals.map((j) => j.concentracion)),
          calidadSueno: promedio(journals.map((j) => j.calidadSueno)),
          nivelEstres: promedio(journals.map((j) => j.nivelEstres))
        },
        finanzas: { ingresos, gastos, balance: ingresos - gastos },
        notasMes,
        calendario
      }
    });
  } catch (error) {
    console.error('[overview/month]', error);
    res.status(500).json({ success: false, message: 'Error generando el recap del mes' });
  }
});

module.exports = router;
