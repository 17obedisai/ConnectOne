// backend/src/routes/pomodoro.js
router.post('/session', auth, async (req, res) => {
  // Guardar sesión de pomodoro completada
  const { duracion, tipo } = req.body;
  // Actualizar estadísticas del usuario
});

router.get('/stats', auth, async (req, res) => {
  // Obtener estadísticas de pomodoro
});