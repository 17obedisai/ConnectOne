// backend/src/models/Notification.js
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tipo: String,
  mensaje: String,
  leida: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});