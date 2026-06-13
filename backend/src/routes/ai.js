const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Questionnaire = require('../models/Questionnaire');
const { isConfigured, generateAssistantReply } = require('../services/gemini');

// GET /api/ai/status — ¿está el motor de IA configurado en el servidor?
router.get('/status', auth, (req, res) => {
  res.json({ success: true, configured: isConfigured() });
});

// POST /api/ai/assistant — chat con el coach Energiko.
// body: { message: string, history?: [{role,text}], context?: { energia, minutosLibres, ... } }
router.post('/assistant', auth, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'El mensaje es obligatorio' });
    }

    // Enriquecemos el contexto con datos reales del usuario (no confiamos en el cliente
    // para identidad: nombre/nivel/intereses se leen de la base de datos).
    const [usuario, cuestionario] = await Promise.all([
      User.findById(req.user.id).select('nombre nivel perfilInicial'),
      Questionnaire.findOne({ userId: req.user.id }).select('interests main_goal')
    ]);

    const serverContext = {
      nombre: usuario?.nombre,
      nivel: usuario?.nivel,
      intereses: cuestionario?.interests || usuario?.perfilInicial?.intereses || []
    };

    // El cliente puede aportar contexto efímero (energía de hoy, minutos libres, tareas).
    const mergedContext = {
      ...serverContext,
      energia: context.energia,
      horasSueno: context.horasSueno,
      minutosLibres: context.minutosLibres,
      tareasFoco: Array.isArray(context.tareasFoco) ? context.tareasFoco.slice(0, 5) : undefined
    };

    // Limitamos el historial para controlar tokens/costo.
    const safeHistory = Array.isArray(history) ? history.slice(-10) : [];

    const result = await generateAssistantReply({
      message: message.trim(),
      history: safeHistory,
      context: mergedContext
    });

    res.json({
      success: result.ok,
      configured: result.configured,
      reply: result.text
    });
  } catch (error) {
    console.error('[ai/assistant]', error);
    res.status(500).json({ success: false, message: 'Error en el asistente de IA' });
  }
});

module.exports = router;
