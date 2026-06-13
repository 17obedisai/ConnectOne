const mongoose = require('mongoose');

// Bitácora de Alto Rendimiento (Pilar 3): el cierre reflexivo de UN día.
// Combina la "night routine" con el tracker de vitalidad. Upsert por (userId, fecha).
const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fecha: { type: String, required: true }, // YYYY-MM-DD

  // Night routine — reflexión del día.
  aprendizaje: { type: String, default: '' }, // ¿Qué aprendí?
  gratitud: { type: String, default: '' },    // ¿Qué agradezco hoy?
  concentracion: { type: Number, min: 1, max: 5, default: null }, // ¿Cómo estuvo la concentración?
  notas: { type: String, default: '' },

  // Tracker de vitalidad (1-5).
  calidadSueno: { type: Number, min: 1, max: 5, default: null },
  nivelEstres: { type: Number, min: 1, max: 5, default: null },
  animo: { type: Number, min: 1, max: 5, default: null },

  // Reflexión generada por la IA (opcional).
  reflexionIA: { type: String, default: '' }
}, { timestamps: true });

journalEntrySchema.index({ userId: 1, fecha: 1 }, { unique: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
