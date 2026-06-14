const mongoose = require('mongoose');

// Categorías de finanzas personalizables por usuario.
const categoriaFinanzaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  nombre: { type: String, required: true, trim: true },
  tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
  emoji: { type: String, default: '🏷️' }
}, { timestamps: true });

module.exports = mongoose.model('CategoriaFinanza', categoriaFinanzaSchema);
