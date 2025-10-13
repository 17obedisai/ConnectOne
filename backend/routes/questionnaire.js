    const express = require('express');
    const router = express.Router();
    const Usuario = require('../models/Usuario');

    // Middleware de autenticación simple
    const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
        return res.status(401).json({ mensaje: 'No autorizado' });
        }
        
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id).select('-password');
        
        if (!usuario) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }
        
        req.usuario = usuario;
        req.userId = usuario._id;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
    };

    // ✅ GUARDAR RESPUESTAS DEL CUESTIONARIO
    router.post('/submit', auth, async (req, res) => {
    try {
        const { 
        feeling,
        main_goal,
        challenges,
        activity_level,
        nutrition_rating,
        advanced_options,
        completedAt
        } = req.body;
        
        console.log('📝 Guardando cuestionario para usuario:', req.userId);
        
        // Actualizar usuario con toda la información del cuestionario
        const usuario = await Usuario.findByIdAndUpdate(
        req.userId,
        {
            questionnaire_completed: true,
            perfilInicial: {
            feeling,
            main_goal,
            challenges,
            activity_level,
            nutrition_rating,
            advanced_options,
            completadoEn: completedAt || new Date()
            }
        },
        { new: true }
        ).select('-password');
        
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        console.log('✅ Cuestionario guardado exitosamente');
        
        res.json({
        success: true,
        mensaje: 'Cuestionario completado',
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            nivel: usuario.nivel,
            experiencia: usuario.experiencia,
            questionnaire_completed: usuario.questionnaire_completed,
            perfilInicial: usuario.perfilInicial
        }
        });
        
    } catch (error) {
        console.error('❌ Error guardando cuestionario:', error);
        res.status(500).json({ 
        mensaje: 'Error guardando cuestionario',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
    });

    // ✅ VERIFICAR SI COMPLETÓ EL CUESTIONARIO
    router.get('/status', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.userId).select('questionnaire_completed perfilInicial');
        
        res.json({
        completed: usuario.questionnaire_completed || false,
        profile: usuario.perfilInicial || null
        });
        
    } catch (error) {
        console.error('❌ Error verificando cuestionario:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
    });

    // ✅ OBTENER DATOS DEL CUESTIONARIO
    router.get('/my-questionnaire', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.userId).select('questionnaire_completed perfilInicial');
        
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        res.json({
        success: true,
        completed: usuario.questionnaire_completed || false,
        data: usuario.perfilInicial || null
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo cuestionario:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
    });

    module.exports = router;