const mongoose = require('mongoose');

// Suscripción Web Push de un dispositivo del usuario.
const pushSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  endpoint: { type: String, required: true, unique: true },
  // Objeto completo de suscripción del navegador { endpoint, keys: { p256dh, auth } }.
  subscription: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PushSubscription', pushSubscriptionSchema);
