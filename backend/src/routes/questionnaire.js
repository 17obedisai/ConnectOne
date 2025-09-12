const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Questionnaire = require('../models/Questionnaire');
const User = require('../models/User');

// Guardar respuestas del cuestionario
router.post('/submit', auth, async (req, res) => {
  try {
    const { objetivos, nivelActividad, tiempoDisponible, preferencias } = req.body;
    
    // Buscar si ya existe un cuestionario
    let questionnaire = await Questionnaire.findOne({ userId: req.userId });
    
    if (questionnaire) {
      // Actualizar existente
      questionnaire.objetivos = objetivos;
      questionnaire.nivelActividad = nivelActividad;
      questionnaire.tiempoDisponible = tiempoDisponible;
      questionnaire.preferencias = preferencias;
      questionnaire.completado = true;
      questionnaire.fechaCompletado = new Date();
    } else {
      // Crear nuevo
      questionnaire = new Questionnaire({
        userId: req.userId,
        objetivos,
        nivelActividad,
        tiempoDisponible,
        preferencias,
        completado: true,
        fechaCompletado: new Date()
      });
    }
    
    await questionnaire.save();
    
    // Actualizar el perfil inicial del usuario
    await User.findByIdAndUpdate(req.userId, {
      perfilInicial: {
        objetivos,
        nivelActividad,
        tiempoDisponible
      }
    });
    
    res.json({ 
      mensaje: 'Cuestionario guardado exitosamente',
      cuestionario: questionnaire 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error guardando cuestionario' });
  }
});

// Obtener cuestionario del usuario
router.get('/my-questionnaire', auth, async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findOne({ userId: req.userId });
    res.json(questionnaire || { completado: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo cuestionario' });
  }
});

module.exports = router;