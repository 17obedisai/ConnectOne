const mongoose = require('mongoose');

// Retos (rediseño de "Misiones"): desafíos secundarios para días libres, por contexto/ubicación.
// No tienen fecha fija; se hacen cuando hay tiempo. El usuario puede crear muchos más.
const retoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '' },
  categoria: {
    type: String,
    enum: ['aventura', 'naturaleza', 'fitness', 'social', 'creatividad', 'aprendizaje', 'hogar', 'mente', 'otro'],
    default: 'otro'
  },
  // Dónde/contexto en que se hace el reto (para sugerir según dónde estás).
  contexto: {
    type: String,
    enum: ['aire_libre', 'casa', 'ciudad', 'cualquiera'],
    default: 'cualquiera'
  },
  dificultad: { type: String, enum: ['facil', 'media', 'dificil'], default: 'media' },
  distanciaKm: { type: Number, default: null }, // ej. "corre 3 km"
  duracion: { type: String, default: '' }, // ej. "30 min", "2 h"
  xp: { type: Number, default: 100 },
  completado: { type: Boolean, default: false },
  completadoEn: { type: Date, default: null },
  personalizado: { type: Boolean, default: false } // creado por el usuario (vs. catálogo base)
}, { timestamps: true });

module.exports = mongoose.model('Reto', retoSchema);
