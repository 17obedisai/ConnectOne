// backend/src/models/Challenge.js
const challengeSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaInicio: Date,
  fechaFin: Date,
  participantes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    progreso: Number
  }],
  meta: Number,
  recompensa: Number,
  tipo: { type: String, enum: ['individual', 'grupal'] }
});