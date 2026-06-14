const mongoose = require('mongoose');

// Academia: cursos profundos (idiomas, instrumentos, software...).
// Estructura módulos -> lecciones. El contenido de cada lección se genera al abrirla.
const leccionSchema = new mongoose.Schema({
  titulo: String,
  duracionMin: { type: Number, default: 20 },
  completada: { type: Boolean, default: false },
  completadaEn: { type: Date, default: null },
  generada: { type: Boolean, default: false }, // ¿ya se generó el contenido?
  contenido: {
    introduccion: { type: String, default: '' },
    pasos: [{ titulo: String, detalle: String }],
    tips: [String],
    ejemplo: { type: String, default: '' },
    practica: { type: String, default: '' }
  }
}, { _id: false });

const moduloSchema = new mongoose.Schema({
  titulo: String,
  descripcion: { type: String, default: '' },
  lecciones: [leccionSchema]
}, { _id: false });

const cursoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  titulo: { type: String, required: true, trim: true },
  categoria: {
    type: String,
    enum: ['idioma', 'instrumento', 'software', 'arte', 'fitness', 'conocimiento', 'otro'],
    default: 'conocimiento'
  },
  nivel: { type: String, default: 'principiante' },
  descripcion: { type: String, default: '' },
  modulos: [moduloSchema],
  valoracion: { type: Number, min: 1, max: 5, default: null },
  generadoPorIA: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);
