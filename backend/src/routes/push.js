const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PushSubscription = require('../models/PushSubscription');
const Reminder = require('../models/Reminder');
const { isConfigured, publicKey, sendPushToUser } = require('../services/push');

// GET /api/push/publicKey — clave pública VAPID para el navegador (no requiere auth).
router.get('/publicKey', (req, res) => {
  res.json({ success: true, configured: isConfigured(), publicKey: publicKey() });
});

// POST /api/push/subscribe — guarda la suscripción del dispositivo del usuario.
router.post('/subscribe', auth, async (req, res) => {
  try {
    const sub = req.body.subscription || req.body;
    if (!sub || !sub.endpoint) return res.status(400).json({ success: false, message: 'Suscripción inválida' });
    await PushSubscription.findOneAndUpdate(
      { endpoint: sub.endpoint },
      { userId: req.user.id, endpoint: sub.endpoint, subscription: sub },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('[push/subscribe]', error);
    res.status(500).json({ success: false, message: 'Error guardando la suscripción' });
  }
});

// POST /api/push/unsubscribe — elimina la suscripción de este dispositivo.
router.post('/unsubscribe', auth, async (req, res) => {
  try {
    const endpoint = req.body.endpoint || req.body.subscription?.endpoint;
    if (endpoint) await PushSubscription.deleteOne({ endpoint, userId: req.user.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al desuscribir' });
  }
});

// POST /api/push/test — envía una notificación de prueba al usuario.
router.post('/test', auth, async (req, res) => {
  try {
    const r = await sendPushToUser(req.user.id, {
      title: '🔔 ¡Notificaciones activas!',
      body: 'Energiko te avisará de tus recordatorios y bloques del día.',
      url: '/dashboard'
    });
    if (!r.configured) return res.status(503).json({ success: false, message: 'Push no configurado en el servidor' });
    res.json({ success: true, enviados: r.enviados });
  } catch (error) {
    console.error('[push/test]', error);
    res.status(500).json({ success: false, message: 'Error enviando la prueba' });
  }
});

// POST /api/push/run?key=CRON_SECRET — dispara recordatorios vencidos/del día.
// Pensado para un cron externo (ej. cron-job.org) cada 15-30 min. No usa auth de usuario.
router.post('/run', async (req, res) => {
  try {
    const key = req.query.key || req.headers['x-cron-key'];
    if (!process.env.CRON_SECRET || key !== process.env.CRON_SECRET) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }
    if (!isConfigured()) return res.json({ success: true, enviados: 0, nota: 'Push no configurado' });

    // Recordatorios con fecha límite hasta el final de hoy, sin completar ni notificar.
    const finHoy = new Date();
    finHoy.setHours(23, 59, 59, 999);
    const pendientes = await Reminder.find({
      completado: false,
      notificado: { $ne: true },
      fechaLimite: { $ne: null, $lte: finHoy }
    }).limit(200);

    let enviados = 0;
    for (const r of pendientes) {
      const res2 = await sendPushToUser(r.userId, {
        title: '⏰ Recordatorio',
        body: r.titulo,
        url: '/dashboard'
      });
      if (res2.enviados > 0) enviados += res2.enviados;
      r.notificado = true;
      await r.save();
    }

    res.json({ success: true, recordatorios: pendientes.length, enviados });
  } catch (error) {
    console.error('[push/run]', error);
    res.status(500).json({ success: false, message: 'Error ejecutando recordatorios' });
  }
});

module.exports = router;
