const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Obtener perfil del usuario actual
router.get('/profile', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId).select('-password');
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
    });

    // Actualizar perfil inicial (después del cuestionario)
    router.post('/initial-profile', auth, async (req, res) => {
    try {
        const { objetivos, intereses, nivelActividad, tiempoDisponible } = req.body;
        
        const usuario = await User.findByIdAndUpdate(
        req.userId,
        {
            perfilInicial: {
            objetivos,
            intereses,
            nivelActividad,
            tiempoDisponible
            }
        },
        { new: true }
        ).select('-password');
        
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error actualizando perfil' });
    }
    });

    // Actualizar nivel y experiencia
    router.put('/level-up', auth, async (req, res) => {
    try {
    const { experiencia } = req.body;
    const usuario = await User.findById(req.userId);
    
    usuario.experiencia += experiencia;
    
    // Calcular si sube de nivel (cada 1000 puntos)
    const nuevoNivel = Math.floor(usuario.experiencia / 1000) + 1;
    if (nuevoNivel > usuario.nivel) {
        usuario.nivel = nuevoNivel;
        }
        
        await usuario.save();
        res.json({ 
        nivel: usuario.nivel, 
        experiencia: usuario.experiencia 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error actualizando nivel' });
    }
    });

module.exports = router;