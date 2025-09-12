const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  objetivos: [{
    type: String,
    enum: ['perder_peso', 'ganar_musculo', 'reducir_estres', 'mejorar_sueno', 'aumentar_energia', 'habitos_saludables']
  }],
  nivelActividad: {
    type: String,
    enum: ['sedentario', 'poco_activo', 'moderado', 'activo', 'muy_activo']
  },
  tiempoDisponible: {
    type: String,
    enum: ['15min', '30min', '45min', '60min', 'mas_60min']
  },
  preferencias: {
    meditacion: Boolean,
    ejercicio: Boolean,
    lectura: Boolean,
    aire_libre: Boolean,
    social: Boolean
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCompletado: Date
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);