const mongoose = require('mongoose');

// Seguimiento de Lectura: libros con página actual y notas.
const libroSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, default: '' },
  paginasTotal: { type: Number, default: 0 },
  paginaActual: { type: Number, default: 0 },
  estado: { type: String, enum: ['por_leer', 'leyendo', 'terminado'], default: 'leyendo' },
  notas: [{
    fecha: { type: Date, default: Date.now },
    pagina: Number,
    texto: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);
