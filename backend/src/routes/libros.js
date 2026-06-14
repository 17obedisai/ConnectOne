const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Libro = require('../models/Libro');
const User = require('../models/User');

// GET /api/libros
router.get('/', auth, async (req, res) => {
  try {
    const libros = await Libro.find({ userId: req.user.id }).sort({ estado: 1, updatedAt: -1 });
    res.json({ success: true, data: libros });
  } catch (error) {
    console.error('[libros GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo libros' });
  }
});

// POST /api/libros
router.post('/', auth, async (req, res) => {
  try {
    const { titulo, autor, paginasTotal, estado } = req.body;
    if (!titulo || !titulo.trim()) return res.status(400).json({ success: false, message: 'El título es obligatorio' });
    const l = await Libro.create({
      userId: req.user.id,
      titulo: titulo.trim(),
      autor: autor || '',
      paginasTotal: Number(paginasTotal) || 0,
      estado: ['por_leer', 'leyendo', 'terminado'].includes(estado) ? estado : 'leyendo'
    });
    res.status(201).json({ success: true, data: l });
  } catch (error) {
    console.error('[libros POST]', error);
    res.status(500).json({ success: false, message: 'Error creando el libro' });
  }
});

// PUT /api/libros/:id — actualizar página, estado, etc. (+100 XP al terminar).
router.put('/:id', auth, async (req, res) => {
  try {
    const l = await Libro.findOne({ _id: req.params.id, userId: req.user.id });
    if (!l) return res.status(404).json({ success: false, message: 'Libro no encontrado' });

    const eraTerminado = l.estado === 'terminado';
    ['titulo', 'autor', 'paginasTotal', 'paginaActual', 'estado'].forEach((c) => {
      if (req.body[c] !== undefined) l[c] = req.body[c];
    });
    // Si alcanza el total de páginas, se marca terminado automáticamente.
    if (l.paginasTotal && l.paginaActual >= l.paginasTotal) l.estado = 'terminado';
    await l.save();

    let xpGanado = 0, experiencia;
    if (!eraTerminado && l.estado === 'terminado') {
      const usuario = await User.findByIdAndUpdate(req.user.id, { $inc: { experiencia: 100 } }, { new: true }).select('experiencia');
      xpGanado = 100; experiencia = usuario?.experiencia;
    }
    res.json({ success: true, data: l, xpGanado, experiencia });
  } catch (error) {
    console.error('[libros PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando el libro' });
  }
});

// POST /api/libros/:id/nota — añade una nota de lectura.
router.post('/:id/nota', auth, async (req, res) => {
  try {
    const { texto, pagina } = req.body;
    if (!texto || !texto.trim()) return res.status(400).json({ success: false, message: 'Escribe la nota' });
    const l = await Libro.findOne({ _id: req.params.id, userId: req.user.id });
    if (!l) return res.status(404).json({ success: false, message: 'Libro no encontrado' });
    l.notas.unshift({ texto: texto.trim(), pagina: pagina != null ? Number(pagina) : l.paginaActual, fecha: new Date() });
    await l.save();
    res.json({ success: true, data: l });
  } catch (error) {
    console.error('[libros/nota]', error);
    res.status(500).json({ success: false, message: 'Error añadiendo la nota' });
  }
});

// DELETE /api/libros/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const del = await Libro.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ success: false, message: 'Libro no encontrado' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error eliminando el libro' });
  }
});

module.exports = router;
