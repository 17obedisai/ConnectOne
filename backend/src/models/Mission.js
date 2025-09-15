const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  // Información básica
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: {
    type: String,
    enum: ['ejercicio', 'meditacion', 'lectura', 'nutricion', 'social', 'gratitud', 'aprendizaje', 'creatividad'],
    required: true
  },
  
  // Detalles de la misión
  contenido: {
    introduccion: String, // Por qué es importante
    ciencia: String, // Base científica
    instrucciones: [{
      paso: Number,
      descripcion: String,
      duracion: String,
      imagen: String
    }],
    
    // Para ejercicio
    ejercicios: [{
      nombre: String,
      series: Number,
      repeticiones: String,
      descanso: String,
      tecnica: String,
      erroresComunes: [String],
      imagenUrl: String,
      videoUrl: String
    }],
    
    // Variaciones
    variaciones: {
      casa: String,
      gym: String,
      principiante: String,
      avanzado: String
    },
    
    // Seguridad
    precauciones: [String],
    calentamiento: String,
    enfriamiento: String,
    
    // Tips y recomendaciones
    tips: [String],
    beneficios: [String],
    equipamientoNecesario: [String],
    
    // Para meditación/mindfulness
    guiaAudio: String,
    tecnicaRespiracion: String,
    
    // Reflexiones para journaling
    preguntasReflexion: [String]
  },
  
  // Metadata
  duracion: { type: Number, required: true }, // minutos
  dificultad: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    default: 'principiante'
  },
  experiencia: { type: Number, default: 50 },
  
  // Tracking
  vecesCompletada: { type: Number, default: 0 },
  valoracionPromedio: { type: Number, default: 0 },
  
  // Estado
  activa: { type: Boolean, default: true },
  premium: { type: Boolean, default: false }
});

module.exports = mongoose.model('Mission', missionSchema);