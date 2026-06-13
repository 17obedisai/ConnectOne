const mongoose = require('mongoose');

// Gestión Práctica (parte del Pilar 3): recordatorios de vida.
// Ej. cambio de aceite de la moto, renovación de documentos, citas.
const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  titulo: { type: String, required: true, trim: true },
  categoria: {
    type: String,
    enum: ['moto', 'documento', 'salud', 'finanzas', 'hogar', 'otro'],
    default: 'otro'
  },
  fechaLimite: { type: Date, default: null },
  completado: { type: Boolean, default: false },
  notas: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
