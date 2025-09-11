const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Obtener misiones activas del usuario
router.get('/', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId).select('misionesActivas');
        res.json(usuario.misionesActivas || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones' });
    }
});

module.exports = router;