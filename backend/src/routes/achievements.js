const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Obtener logros del usuario
router.get('/', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId).select('logros');
        res.json(usuario.logros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo logros' });
    }
    });

    // Desbloquear nuevo logro
    router.post('/unlock', auth, async (req, res) => {
    try {
        const { id, nombre, descripcion } = req.body;
        
        const usuario = await User.findById(req.userId);
        
        // Verificar si ya tiene el logro
        const logroExistente = usuario.logros.find(l => l.id === id);
        if (logroExistente) {
        return res.status(400).json({ mensaje: 'Logro ya desbloqueado' });
        }
        
        // Agregar nuevo logro
        usuario.logros.push({
        id,
        nombre,
        descripcion,
        fechaObtenido: new Date()
        });
        
        await usuario.save();
        res.json({ mensaje: 'Logro desbloqueado!', logro: { id, nombre, descripcion } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error desbloqueando logro' });
    }
    });

module.exports = router;