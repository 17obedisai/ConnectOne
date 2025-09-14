// backend/src/models/Activity.js
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tipo: String, // 'mision_completada', 'nivel_subido', 'logro_desbloqueado'
  descripcion: String,
  datos: Object,
  fecha: { type: Date, default: Date.now }
});