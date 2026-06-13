const mongoose = require('mongoose');

// Notas (Bloque B): captura rápida de ideas, por texto o por voz.
const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  contenido: { type: String, required: true, trim: true },
  categoria: {
    type: String,
    enum: ['idea', 'proyecto', 'lectura', 'personal', 'tarea', 'otro'],
    default: 'otro'
  },
  // Si la nota es algo a retomar en una fecha (ej. "voy en la página 80 del libro").
  fechaRecordatorio: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
