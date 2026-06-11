// backend/src/routes/pomodoro.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Registrar una sesión de pomodoro / bloque de foco completada
router.post('/session', auth, async (req, res) => {
  try {
    const { duracion, tipo } = req.body;
    // TODO (Fase 3): persistir la sesión y actualizar estadísticas del usuario
    res.status(201).json({
      success: true,
      mensaje: 'Sesión registrada',
      session: { duracion, tipo, userId: req.userId }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error registrando la sesión' });
  }
});

// Obtener estadísticas de foco del usuario
router.get('/stats', auth, async (req, res) => {
  try {
    // TODO (Fase 3): calcular estadísticas reales desde la base de datos
    res.json({ success: true, stats: { totalSesiones: 0, minutosTotales: 0 } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo estadísticas' });
  }
});

module.exports = router;
