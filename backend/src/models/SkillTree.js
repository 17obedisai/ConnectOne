const mongoose = require('mongoose');

// Árbol de Habilidades (Pilar 2): una ruta de progresión RPG por usuario y área.
// Upsert por (userId, area): regenerar reemplaza los nodos del área.
const skillTreeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // Clave del área de interés (coincide con los intereses del cuestionario): software, music, ...
  area: { type: String, required: true },
  nombre: { type: String, required: true },

  // Nodos ordenados (índice 0 = primero). Desbloqueo secuencial.
  nodos: [
    {
      titulo: String,
      descripcion: String,
      recurso: String,
      xp: { type: Number, default: 100 },
      completado: { type: Boolean, default: false },
      completadoEn: Date
    }
  ],

  generadoPorIA: { type: Boolean, default: true }
}, { timestamps: true });

skillTreeSchema.index({ userId: 1, area: 1 }, { unique: true });

module.exports = mongoose.model('SkillTree', skillTreeSchema);
