const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: String,
  tipo: {
    type: String,
    enum: ['diaria', 'semanal', 'especial'],
    default: 'diaria'
  },
  categoria: {
    type: String,
    enum: ['meditacion', 'ejercicio', 'lectura', 'habitos', 'social'],
    required: true
  },
  experiencia: {
    type: Number,
    default: 50
  },
  duracion: {
    type: Number, // en minutos
    required: true
  },
  activa: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Mission', missionSchema);