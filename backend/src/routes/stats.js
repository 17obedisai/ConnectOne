const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Progress = require('../models/Progress');

// Obtener estadísticas del usuario
router.get('/dashboard', auth, async (req, res) => {
  try {
    const usuario = await User.findById(req.userId).select('-password');
    
    // Obtener progreso de los últimos 7 días
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);
    
    const progresoSemanal = await Progress.find({
      userId: req.userId,
      fecha: { $gte: hace7Dias }
    });
    
    // Calcular totales
    const totalMisiones = progresoSemanal.reduce((acc, p) => 
      acc + p.misionesCompletadas.length, 0
    );
    const totalMinutos = progresoSemanal.reduce((acc, p) => 
      acc + p.minutosActivos, 0
    );
    
    res.json({
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        nivel: usuario.nivel,
        experiencia: usuario.experiencia,
        experienciaProximoNivel: Math.ceil((usuario.nivel) * 1000),
        racha: usuario.racha,
        logros: usuario.logros.length
      },
      estadisticasSemana: {
        misionesCompletadas: totalMisiones,
        minutosActivos: totalMinutos,
        diasActivos: progresoSemanal.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo estadísticas' });
  }
});

module.exports = router;