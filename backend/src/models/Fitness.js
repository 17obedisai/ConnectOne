const mongoose = require('mongoose');

// Seguimiento de Fitness (un documento por usuario).
const fitnessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  objetivo: { type: String, enum: ['perder_grasa', 'ganar_musculo', 'mantener', 'rendimiento'], default: 'mantener' },
  pesoObjetivo: { type: Number, default: null },
  altura: { type: Number, default: null }, // cm
  // Registros de peso/composición en el tiempo (para la gráfica).
  registros: [{
    fecha: { type: Date, default: Date.now },
    peso: Number,
    grasa: Number, // % opcional
    notas: { type: String, default: '' }
  }],
  // Entrenamientos realizados.
  entrenamientos: [{
    fecha: { type: Date, default: Date.now },
    tipo: { type: String, default: '' },
    duracionMin: { type: Number, default: 0 },
    notas: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Fitness', fitnessSchema);
