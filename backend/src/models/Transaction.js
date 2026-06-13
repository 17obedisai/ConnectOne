const mongoose = require('mongoose');

// Hub Financiero (Pilar 4): un movimiento de dinero (ingreso o gasto).
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
  monto: { type: Number, required: true, min: 0 },
  categoria: { type: String, default: 'otro' },
  descripcion: { type: String, default: '', trim: true },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

transactionSchema.index({ userId: 1, fecha: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
