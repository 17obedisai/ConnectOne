const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Fitness = require('../models/Fitness');
const User = require('../models/User');

const getOrCreate = async (userId) => {
  let f = await Fitness.findOne({ userId });
  if (!f) f = await Fitness.create({ userId });
  return f;
};

// GET /api/fitness — perfil + registros + entrenamientos del usuario.
router.get('/', auth, async (req, res) => {
  try {
    const f = await getOrCreate(req.user.id);
    res.json({ success: true, data: f });
  } catch (error) {
    console.error('[fitness GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo fitness' });
  }
});

// PUT /api/fitness — objetivo, peso objetivo, altura.
router.put('/', auth, async (req, res) => {
  try {
    const { objetivo, pesoObjetivo, altura } = req.body;
    const update = {};
    if (objetivo !== undefined) update.objetivo = objetivo;
    if (pesoObjetivo !== undefined) update.pesoObjetivo = pesoObjetivo;
    if (altura !== undefined) update.altura = altura;
    const f = await Fitness.findOneAndUpdate({ userId: req.user.id }, { $set: update, $setOnInsert: { userId: req.user.id } }, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.json({ success: true, data: f });
  } catch (error) {
    console.error('[fitness PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando fitness' });
  }
});

// POST /api/fitness/registro — añade un registro de peso/composición.
router.post('/registro', auth, async (req, res) => {
  try {
    const peso = Number(req.body.peso);
    if (!Number.isFinite(peso) || peso <= 0) return res.status(400).json({ success: false, message: 'Peso inválido' });
    const f = await getOrCreate(req.user.id);
    f.registros.push({ peso, grasa: req.body.grasa != null ? Number(req.body.grasa) : undefined, notas: req.body.notas || '', fecha: req.body.fecha ? new Date(req.body.fecha) : new Date() });
    f.registros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    await f.save();
    res.status(201).json({ success: true, data: f });
  } catch (error) {
    console.error('[fitness/registro]', error);
    res.status(500).json({ success: false, message: 'Error registrando peso' });
  }
});

// DELETE /api/fitness/registro/:i
router.delete('/registro/:i', auth, async (req, res) => {
  try {
    const f = await getOrCreate(req.user.id);
    const i = parseInt(req.params.i, 10);
    if (f.registros[i]) { f.registros.splice(i, 1); await f.save(); }
    res.json({ success: true, data: f });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando registro' });
  }
});

// POST /api/fitness/entrenamiento — registra un entrenamiento (+30 XP).
router.post('/entrenamiento', auth, async (req, res) => {
  try {
    const { tipo, duracionMin, notas } = req.body;
    const f = await getOrCreate(req.user.id);
    f.entrenamientos.unshift({ tipo: tipo || 'Entrenamiento', duracionMin: Number(duracionMin) || 0, notas: notas || '', fecha: new Date() });
    await f.save();
    const usuario = await User.findByIdAndUpdate(req.user.id, { $inc: { experiencia: 30 } }, { new: true }).select('experiencia');
    res.status(201).json({ success: true, data: f, xpGanado: 30, experiencia: usuario?.experiencia });
  } catch (error) {
    console.error('[fitness/entrenamiento]', error);
    res.status(500).json({ success: false, message: 'Error registrando entrenamiento' });
  }
});

// DELETE /api/fitness/entrenamiento/:i
router.delete('/entrenamiento/:i', auth, async (req, res) => {
  try {
    const f = await getOrCreate(req.user.id);
    const i = parseInt(req.params.i, 10);
    if (f.entrenamientos[i]) { f.entrenamientos.splice(i, 1); await f.save(); }
    res.json({ success: true, data: f });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando entrenamiento' });
  }
});

module.exports = router;
