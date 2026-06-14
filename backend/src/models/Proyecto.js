const mongoose = require('mongoose');

// Seguimiento de Proyectos personales (programación, música, etc.).
// El último "avance" responde a "¿dónde quedé?".
const proyectoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '' },
  estado: { type: String, enum: ['activo', 'pausado', 'terminado'], default: 'activo' },
  progreso: { type: Number, min: 0, max: 100, default: 0 },
  avances: [{
    fecha: { type: Date, default: Date.now },
    texto: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Proyecto', proyectoSchema);
