const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6
  },
  nivel: {
    type: Number,
    default: 1
  },
  experiencia: {
    type: Number,
    default: 0
  },
  racha: {
    type: Number,
    default: 0
  },
  // 🔧 CAMPO NUEVO - Para controlar si completó el cuestionario
  questionnaire_completed: {
    type: Boolean,
    default: false
  },
  // Perfil inicial del cuestionario
  perfilInicial: {
    feeling: Number,
    main_goal: String,
    challenges: [String],
    activity_level: String,
    nutrition_rating: String,
    advanced_options: [String],
    completadoEn: Date
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  ultimaConexion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para búsquedas rápidas por email
usuarioSchema.index({ email: 1 });

module.exports = mongoose.model('Usuario', usuarioSchema);