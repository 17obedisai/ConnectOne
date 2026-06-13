const mongoose = require('mongoose');

// Metas de Inversión (Pilar 4): ahorro dirigido a equipos, plugins, hardware, educación...
const financialGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  nombre: { type: String, required: true, trim: true },
  montoObjetivo: { type: Number, required: true, min: 1 },
  montoActual: { type: Number, default: 0, min: 0 },
  categoria: {
    type: String,
    enum: ['equipo', 'plugin', 'hardware', 'educacion', 'software', 'otro'],
    default: 'otro'
  },
  fechaObjetivo: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('FinancialGoal', financialGoalSchema);
