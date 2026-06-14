const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');
const Reto = require('../models/Reto');
const User = require('../models/User');
const Questionnaire = require('../models/Questionnaire');
const { generateRetos } = require('../services/gemini');

const VALID_CAT = ['aventura', 'naturaleza', 'fitness', 'social', 'creatividad', 'aprendizaje', 'hogar', 'mente', 'otro'];
const VALID_CTX = ['aire_libre', 'casa', 'ciudad', 'cualquiera'];
const VALID_DIF = ['facil', 'media', 'dificil'];

// Generar con IA cuesta tokens: limiter dedicado.
const sugerirLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15, standardHeaders: true, legacyHeaders: false, message: { message: 'Límite de sugerencias alcanzado. Intenta en unos minutos.' } });

// Catálogo base que se siembra la primera vez que el usuario abre Retos.
const SEED = [
  { titulo: 'Corre 3 km al aire libre', descripcion: 'Sal a trotar por tu zona. Música opcional, excusas no.', categoria: 'fitness', contexto: 'aire_libre', dificultad: 'media', distanciaKm: 3, duracion: '30 min', xp: 200 },
  { titulo: 'Sube a un mirador o cerro cercano', descripcion: 'Busca un punto alto cerca de ti y disfruta la vista.', categoria: 'aventura', contexto: 'aire_libre', dificultad: 'media', duracion: '1-2 h', xp: 250 },
  { titulo: 'Camina 5 km explorando un barrio nuevo', descripcion: 'Elige una zona que no conozcas y recórrela a pie.', categoria: 'aventura', contexto: 'ciudad', dificultad: 'media', distanciaKm: 5, duracion: '1 h', xp: 220 },
  { titulo: 'Visita un lugar de tu ciudad que no conozcas', descripcion: 'Un parque, museo, café o plaza nuevo para ti.', categoria: 'aventura', contexto: 'ciudad', dificultad: 'facil', duracion: '1-2 h', xp: 150 },
  { titulo: 'Caminata en la naturaleza (1 hora)', descripcion: 'Desconéctate entre árboles, río o campo.', categoria: 'naturaleza', contexto: 'aire_libre', dificultad: 'facil', duracion: '1 h', xp: 180 },
  { titulo: 'Cocina una receta nueva', descripcion: 'Algo que nunca hayas preparado. Bonus si es saludable.', categoria: 'creatividad', contexto: 'casa', dificultad: 'facil', duracion: '1 h', xp: 150 },
  { titulo: 'Lee 50 páginas de un libro', descripcion: 'Avanza de verdad en esa lectura pendiente.', categoria: 'aprendizaje', contexto: 'cualquiera', dificultad: 'facil', duracion: '1 h', xp: 150 },
  { titulo: 'Sesión de 2 horas de tu hobby', descripcion: 'Música, arte, código... deep work en lo que amas.', categoria: 'creatividad', contexto: 'casa', dificultad: 'media', duracion: '2 h', xp: 300 },
  { titulo: 'Llama a alguien que no ves hace tiempo', descripcion: 'Un familiar o amigo. Reconecta de verdad.', categoria: 'social', contexto: 'cualquiera', dificultad: 'facil', duracion: '20 min', xp: 120 },
  { titulo: 'Medita 20 minutos al aire libre', descripcion: 'Respira, observa, suelta. Sin pantallas.', categoria: 'mente', contexto: 'aire_libre', dificultad: 'facil', duracion: '20 min', xp: 130 },
  { titulo: 'Ordena y limpia un espacio de tu casa', descripcion: 'Un cajón, un closet, tu escritorio. Espacio claro, mente clara.', categoria: 'hogar', contexto: 'casa', dificultad: 'facil', duracion: '45 min', xp: 120 },
  { titulo: 'Día sin redes sociales', descripcion: 'Reto de desintoxicación digital por 24 horas.', categoria: 'mente', contexto: 'cualquiera', dificultad: 'dificil', duracion: '1 día', xp: 350 },
  { titulo: 'Toma fotos de 5 cosas bonitas que veas hoy', descripcion: 'Entrena tu mirada para lo positivo.', categoria: 'creatividad', contexto: 'aire_libre', dificultad: 'facil', duracion: '30 min', xp: 100 },
  { titulo: 'Prueba un café o restaurante nuevo', descripcion: 'Rompe la rutina y descubre un sabor distinto.', categoria: 'social', contexto: 'ciudad', dificultad: 'facil', duracion: '1 h', xp: 120 },
  { titulo: 'Aprende a tocar una canción nueva', descripcion: 'En tu instrumento. Una sección a la vez.', categoria: 'creatividad', contexto: 'casa', dificultad: 'media', duracion: '1-2 h', xp: 250 },
  { titulo: 'Anda en bici 10 km', descripcion: 'Explora rodando. Cardio + aventura.', categoria: 'fitness', contexto: 'aire_libre', dificultad: 'media', distanciaKm: 10, duracion: '1 h', xp: 240 }
];

// GET /api/retos — todos los retos del usuario (siembra el catálogo base la primera vez).
router.get('/', auth, async (req, res) => {
  try {
    let retos = await Reto.find({ userId: req.user.id }).sort({ completado: 1, createdAt: -1 });
    if (retos.length === 0) {
      await Reto.insertMany(SEED.map((r) => ({ ...r, userId: req.user.id, personalizado: false })));
      retos = await Reto.find({ userId: req.user.id }).sort({ completado: 1, createdAt: -1 });
    }
    res.json({ success: true, data: retos });
  } catch (error) {
    console.error('[retos GET]', error);
    res.status(500).json({ success: false, message: 'Error obteniendo retos' });
  }
});

// POST /api/retos — crear un reto personalizado.
router.post('/', auth, async (req, res) => {
  try {
    const { titulo, descripcion, categoria, contexto, dificultad, distanciaKm, duracion, xp } = req.body;
    if (!titulo || !titulo.trim()) {
      return res.status(400).json({ success: false, message: 'El título es obligatorio' });
    }
    const reto = await Reto.create({
      userId: req.user.id,
      titulo: titulo.trim(),
      descripcion: descripcion || '',
      categoria: categoria || 'otro',
      contexto: contexto || 'cualquiera',
      dificultad: dificultad || 'media',
      distanciaKm: distanciaKm || null,
      duracion: duracion || '',
      xp: Number.isFinite(xp) ? xp : 100,
      personalizado: true
    });
    res.status(201).json({ success: true, data: reto });
  } catch (error) {
    console.error('[retos POST]', error);
    res.status(500).json({ success: false, message: 'Error creando el reto' });
  }
});

// POST /api/retos/sugerir — la IA genera retos nuevos (según lugar e intereses) y los guarda.
router.post('/sugerir', auth, sugerirLimiter, async (req, res) => {
  try {
    const { lugar, cantidad } = req.body;
    const cuestionario = await Questionnaire.findOne({ userId: req.user.id }).select('interests');
    const result = await generateRetos({ lugar: lugar || '', intereses: cuestionario?.interests || [], cantidad });

    if (!result.ok || result.retos.length === 0) {
      return res.status(result.configured ? 502 : 503).json({
        success: false,
        message: result.configured ? 'La IA no pudo sugerir retos. Intenta de nuevo.' : 'El motor de IA no está configurado.'
      });
    }

    const docs = result.retos.map((r) => ({
      userId: req.user.id,
      titulo: String(r.titulo).slice(0, 120),
      descripcion: String(r.descripcion || '').slice(0, 300),
      categoria: VALID_CAT.includes(r.categoria) ? r.categoria : 'otro',
      contexto: VALID_CTX.includes(r.contexto) ? r.contexto : 'cualquiera',
      dificultad: VALID_DIF.includes(r.dificultad) ? r.dificultad : 'media',
      duracion: String(r.duracion || ''),
      xp: Number.isFinite(r.xp) ? Math.min(Math.max(Math.round(r.xp), 50), 400) : 150,
      personalizado: false
    }));
    const creados = await Reto.insertMany(docs);
    res.status(201).json({ success: true, data: creados });
  } catch (error) {
    console.error('[retos/sugerir]', error);
    res.status(500).json({ success: false, message: 'Error sugiriendo retos' });
  }
});

// POST /api/retos/:id/completar — marca completado y otorga XP (una vez).
router.post('/:id/completar', auth, async (req, res) => {
  try {
    const reto = await Reto.findOne({ _id: req.params.id, userId: req.user.id });
    if (!reto) return res.status(404).json({ success: false, message: 'Reto no encontrado' });
    if (reto.completado) return res.status(400).json({ success: false, message: 'Ese reto ya está completado' });

    reto.completado = true;
    reto.completadoEn = new Date();
    await reto.save();

    const usuario = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { experiencia: reto.xp || 0 } },
      { new: true }
    ).select('experiencia nivel');

    res.json({ success: true, data: { reto, xpGanado: reto.xp || 0, experiencia: usuario?.experiencia } });
  } catch (error) {
    console.error('[retos/completar]', error);
    res.status(500).json({ success: false, message: 'Error completando el reto' });
  }
});

// PUT /api/retos/:id — editar (ej. reabrir un reto: completado=false).
router.put('/:id', auth, async (req, res) => {
  try {
    const campos = ['titulo', 'descripcion', 'categoria', 'contexto', 'dificultad', 'distanciaKm', 'duracion', 'xp', 'completado'];
    const update = {};
    for (const c of campos) if (req.body[c] !== undefined) update[c] = req.body[c];
    if (update.completado === false) update.completadoEn = null;

    const reto = await Reto.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $set: update }, { new: true });
    if (!reto) return res.status(404).json({ success: false, message: 'Reto no encontrado' });
    res.json({ success: true, data: reto });
  } catch (error) {
    console.error('[retos PUT]', error);
    res.status(500).json({ success: false, message: 'Error actualizando el reto' });
  }
});

// DELETE /api/retos/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const del = await Reto.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ success: false, message: 'Reto no encontrado' });
    res.json({ success: true });
  } catch (error) {
    console.error('[retos DELETE]', error);
    res.status(500).json({ success: false, message: 'Error eliminando el reto' });
  }
});

module.exports = router;
