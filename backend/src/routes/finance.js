const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const FinancialGoal = require('../models/FinancialGoal');
const CategoriaFinanza = require('../models/CategoriaFinanza');

// Categorías base que se siembran la primera vez.
const CATEGORIAS_SEED = [
  { nombre: 'Comida', tipo: 'gasto', emoji: '🍔' },
  { nombre: 'Transporte', tipo: 'gasto', emoji: '🚗' },
  { nombre: 'Equipos', tipo: 'gasto', emoji: '🎛️' },
  { nombre: 'Educación', tipo: 'gasto', emoji: '🎓' },
  { nombre: 'Suscripciones', tipo: 'gasto', emoji: '📺' },
  { nombre: 'Ocio', tipo: 'gasto', emoji: '🎮' },
  { nombre: 'Salud', tipo: 'gasto', emoji: '🩺' },
  { nombre: 'Hogar', tipo: 'gasto', emoji: '🏠' },
  { nombre: 'Salario', tipo: 'ingreso', emoji: '💼' },
  { nombre: 'Freelance', tipo: 'ingreso', emoji: '💻' },
  { nombre: 'Venta', tipo: 'ingreso', emoji: '🏷️' }
];

// ── CATEGORÍAS ──
router.get('/categorias', auth, async (req, res) => {
  try {
    let cats = await CategoriaFinanza.find({ userId: req.user.id }).sort({ tipo: 1, nombre: 1 });
    if (cats.length === 0) {
      await CategoriaFinanza.insertMany(CATEGORIAS_SEED.map((c) => ({ ...c, userId: req.user.id })));
      cats = await CategoriaFinanza.find({ userId: req.user.id }).sort({ tipo: 1, nombre: 1 });
    }
    res.json({ success: true, data: cats });
  } catch (error) {
    console.error('[finance/categorias GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo categorías' });
  }
});

router.post('/categorias', auth, async (req, res) => {
  try {
    const { nombre, tipo, emoji } = req.body;
    if (!nombre || !nombre.trim()) return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    if (!['ingreso', 'gasto'].includes(tipo)) return res.status(400).json({ success: false, message: 'Tipo inválido' });
    const cat = await CategoriaFinanza.create({ userId: req.user.id, nombre: nombre.trim(), tipo, emoji: emoji || '🏷️' });
    res.status(201).json({ success: true, data: cat });
  } catch (error) {
    console.error('[finance/categorias POST]', error);
    res.status(500).json({ success: false, message: 'Error creando la categoría' });
  }
});

router.delete('/categorias/:id', auth, async (req, res) => {
  try {
    const del = await CategoriaFinanza.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando la categoría' });
  }
});

// Rango [inicio, fin) del mes indicado (YYYY-MM) o del mes actual.
const rangoMes = (mes) => {
  const base = /^\d{4}-\d{2}$/.test(mes || '') ? new Date(`${mes}-01T00:00:00`) : new Date();
  const inicio = new Date(base.getFullYear(), base.getMonth(), 1);
  const fin = new Date(base.getFullYear(), base.getMonth() + 1, 1);
  return { inicio, fin };
};

// ── TRANSACCIONES ──

// GET /api/finance/transactions?mes=YYYY-MM
router.get('/transactions', auth, async (req, res) => {
  try {
    const { inicio, fin } = rangoMes(req.query.mes);
    const txs = await Transaction.find({
      userId: req.user.id,
      fecha: { $gte: inicio, $lt: fin }
    }).sort({ fecha: -1 });
    res.json({ success: true, data: txs });
  } catch (error) {
    console.error('[finance/transactions GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo movimientos' });
  }
});

// POST /api/finance/transactions
router.post('/transactions', auth, async (req, res) => {
  try {
    const { tipo, monto, categoria, descripcion, fecha } = req.body;
    if (!['ingreso', 'gasto'].includes(tipo)) {
      return res.status(400).json({ success: false, message: 'Tipo inválido' });
    }
    const montoNum = Number(monto);
    if (!Number.isFinite(montoNum) || montoNum <= 0) {
      return res.status(400).json({ success: false, message: 'El monto debe ser mayor que 0' });
    }
    const tx = await Transaction.create({
      userId: req.user.id,
      tipo,
      monto: montoNum,
      categoria: categoria || 'otro',
      descripcion: descripcion || '',
      fecha: fecha ? new Date(fecha) : new Date()
    });
    res.status(201).json({ success: true, data: tx });
  } catch (error) {
    console.error('[finance/transactions POST]', error);
    res.status(500).json({ success: false, message: 'Error registrando el movimiento' });
  }
});

// DELETE /api/finance/transactions/:id
router.delete('/transactions/:id', auth, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
    res.json({ success: true });
  } catch (error) {
    console.error('[finance/transactions DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando el movimiento' });
  }
});

// GET /api/finance/summary?mes=YYYY-MM — totales del mes y desglose de gastos por categoría.
router.get('/summary', auth, async (req, res) => {
  try {
    const { inicio, fin } = rangoMes(req.query.mes);
    const txs = await Transaction.find({
      userId: req.user.id,
      fecha: { $gte: inicio, $lt: fin }
    });

    let ingresos = 0;
    let gastos = 0;
    const porCategoria = {};
    for (const t of txs) {
      if (t.tipo === 'ingreso') {
        ingresos += t.monto;
      } else {
        gastos += t.monto;
        porCategoria[t.categoria] = (porCategoria[t.categoria] || 0) + t.monto;
      }
    }

    res.json({
      success: true,
      data: { ingresos, gastos, balance: ingresos - gastos, porCategoria, movimientos: txs.length }
    });
  } catch (error) {
    console.error('[finance/summary]', error);
    res.status(500).json({ success: false, message: 'Error calculando el resumen' });
  }
});

// ── METAS DE INVERSIÓN ──

router.get('/goals', auth, async (req, res) => {
  try {
    const goals = await FinancialGoal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: goals });
  } catch (error) {
    console.error('[finance/goals GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo metas' });
  }
});

router.post('/goals', auth, async (req, res) => {
  try {
    const { nombre, montoObjetivo, categoria, fechaObjetivo, montoActual } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    }
    const objetivo = Number(montoObjetivo);
    if (!Number.isFinite(objetivo) || objetivo <= 0) {
      return res.status(400).json({ success: false, message: 'El monto objetivo debe ser mayor que 0' });
    }
    const goal = await FinancialGoal.create({
      userId: req.user.id,
      nombre: nombre.trim(),
      montoObjetivo: objetivo,
      montoActual: Number(montoActual) || 0,
      categoria: categoria || 'otro',
      fechaObjetivo: fechaObjetivo || null
    });
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    console.error('[finance/goals POST]', error);
    res.status(500).json({ success: false, message: 'Error creando la meta' });
  }
});

// PUT /api/finance/goals/:id — editar o sumar un aporte ({ aporte: N } incrementa montoActual).
router.put('/goals/:id', auth, async (req, res) => {
  try {
    const { nombre, montoObjetivo, categoria, fechaObjetivo, aporte, montoActual } = req.body;

    const goal = await FinancialGoal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ success: false, message: 'Meta no encontrada' });

    if (nombre !== undefined) goal.nombre = nombre;
    if (montoObjetivo !== undefined) goal.montoObjetivo = montoObjetivo;
    if (categoria !== undefined) goal.categoria = categoria;
    if (fechaObjetivo !== undefined) goal.fechaObjetivo = fechaObjetivo;
    if (montoActual !== undefined) goal.montoActual = Math.max(0, Number(montoActual) || 0);
    if (aporte !== undefined) goal.montoActual = Math.max(0, goal.montoActual + Number(aporte || 0));

    await goal.save();
    res.json({ success: true, data: goal });
  } catch (error) {
    console.error('[finance/goals PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando la meta' });
  }
});

router.delete('/goals/:id', auth, async (req, res) => {
  try {
    const deleted = await FinancialGoal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Meta no encontrada' });
    res.json({ success: true });
  } catch (error) {
    console.error('[finance/goals DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando la meta' });
  }
});

module.exports = router;
