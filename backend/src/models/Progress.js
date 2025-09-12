const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  misionesCompletadas: [{
    misionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission'
    },
    completadaEn: Date,
    tiempoTomado: Number // minutos
  }],
  experienciaGanada: {
    type: Number,
    default: 0
  },
  minutosActivos: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Progress', progressSchema);