const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Questionnaire = require('../models/Questionnaire');
const User = require('../models/User');

// POST /submit — guarda las respuestas y marca al usuario como completado
router.post('/submit', auth, async (req, res) => {
  try {
    const { feeling, main_goal, challenges, activity_level, nutrition_rating, advanced_options, completedAt } = req.body;
    const userId = req.user.id;

    let questionnaire = await Questionnaire.findOne({ userId });

    const questionnaireData = {
      feeling,
      main_goal,
      challenges: challenges || [],
      activity_level,
      nutrition_rating,
      advanced_options: advanced_options || [],
      completado: true,
      fechaCompletado: completedAt ? new Date(completedAt) : new Date()
    };

    if (questionnaire) {
      Object.assign(questionnaire, questionnaireData);
    } else {
      questionnaire = new Questionnaire({ userId, ...questionnaireData });
    }

    await questionnaire.save();

    // Marcar usuario como completado y actualizar su perfil inicial
    await User.findByIdAndUpdate(userId, {
      questionnaire_completed: true,
      perfilInicial: {
        objetivos: main_goal ? [main_goal] : [],
        nivelActividad: activity_level || '',
        tiempoDisponible: ''
      }
    });

    res.json({ success: true, message: 'Cuestionario guardado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error guardando cuestionario' });
  }
});

// GET /my-questionnaire — obtiene el cuestionario del usuario autenticado
router.get('/my-questionnaire', auth, async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findOne({ userId: req.user.id });
    res.json({ success: true, data: questionnaire || { completado: false } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error obteniendo cuestionario' });
  }
});

module.exports = router;
