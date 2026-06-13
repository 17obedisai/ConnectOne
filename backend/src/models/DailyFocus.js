const mongoose = require('mongoose');

// Centro de Comando: el plan de UN día para UN usuario.
// Se hace upsert por (userId, fecha) — un documento por día.
const dailyFocusSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // Fecha en formato YYYY-MM-DD (zona del cliente) para upsert idempotente por día.
  fecha: {
    type: String,
    required: true
  },
  // Estado de energía (1-5) y sueño de anoche — alimentan al coach de IA.
  energia: { type: Number, min: 1, max: 5, default: null },
  horasSueno: { type: Number, min: 0, max: 24, default: null },

  // Las 3 tareas críticas del día (Focus del Día).
  tareas: [
    {
      texto: { type: String, trim: true },
      completada: { type: Boolean, default: false }
    }
  ],

  // Hábitos del día con su estado.
  habitos: [
    {
      nombre: { type: String, trim: true },
      completado: { type: Boolean, default: false }
    }
  ],

  // Agenda híbrida: bloques de tiempo (trabajo / estudio / descanso).
  agenda: [
    {
      inicio: String, // "09:00"
      fin: String, // "10:30"
      titulo: String,
      tipo: { type: String, enum: ['trabajo', 'estudio', 'descanso', 'fitness'], default: 'trabajo' }
    }
  ]
}, { timestamps: true });

// Un único documento por usuario y día.
dailyFocusSchema.index({ userId: 1, fecha: 1 }, { unique: true });

module.exports = mongoose.model('DailyFocus', dailyFocusSchema);
