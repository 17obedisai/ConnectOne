const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Obtener perfil del usuario actual
router.get('/profile', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.user.id).select('-password');
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
        req.user.id,
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

    // Actualizar perfil unificado (datos personales + skin + objetivos/intereses + preferencias)
    router.put('/profile', auth, async (req, res) => {
    try {
        const { nombre, bio, ciudad, avatarSkin, objetivos, intereses, notificaciones } = req.body;
        const usuario = await User.findById(req.user.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (nombre !== undefined && nombre.trim()) usuario.nombre = nombre.trim();
        if (bio !== undefined) usuario.bio = bio;
        if (ciudad !== undefined) usuario.ciudad = ciudad;
        // La skin solo puede ser un nivel ya alcanzado.
        if (avatarSkin !== undefined) usuario.avatarSkin = Math.min(Math.max(parseInt(avatarSkin, 10) || 1, 1), usuario.nivel);
        if (Array.isArray(objetivos)) usuario.perfilInicial.objetivos = objetivos;
        if (Array.isArray(intereses)) usuario.perfilInicial.intereses = intereses;
        if (notificaciones !== undefined) usuario.preferencias.notificaciones = !!notificaciones;

        await usuario.save();
        const limpio = usuario.toObject();
        delete limpio.password;
        res.json({ success: true, data: limpio });
    } catch (error) {
        console.error('[users/profile PUT]', error);
        res.status(500).json({ message: 'Error actualizando el perfil' });
    }
    });

    // Actualizar nivel y experiencia
    router.put('/level-up', auth, async (req, res) => {
    try {
    const { experiencia } = req.body;
    const usuario = await User.findById(req.user.id);
    
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