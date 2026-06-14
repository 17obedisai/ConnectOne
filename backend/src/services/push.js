// Servicio de Web Push (notificaciones). Usa claves VAPID de las variables de entorno.
const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');

const isConfigured = () => Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);

if (isConfigured()) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@connectone.space',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const publicKey = () => process.env.VAPID_PUBLIC_KEY || null;

// Envía una notificación a TODOS los dispositivos del usuario.
// Limpia automáticamente las suscripciones caducadas (410/404).
const sendPushToUser = async (userId, payload) => {
  if (!isConfigured()) return { ok: false, configured: false, enviados: 0 };
  const subs = await PushSubscription.find({ userId });
  let enviados = 0;
  await Promise.all(subs.map(async (s) => {
    try {
      await webpush.sendNotification(s.subscription, JSON.stringify(payload));
      enviados++;
    } catch (error) {
      if (error.statusCode === 410 || error.statusCode === 404) {
        await PushSubscription.deleteOne({ _id: s._id }).catch(() => {});
      } else {
        console.error('[push] error enviando:', error.statusCode || error.message);
      }
    }
  }));
  return { ok: true, configured: true, enviados };
};

module.exports = { isConfigured, publicKey, sendPushToUser };
