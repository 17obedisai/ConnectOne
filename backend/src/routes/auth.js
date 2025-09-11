const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }
        
        // Crear nuevo usuario
        const nuevoUsuario = new User({
        nombre,
        email,
        password
        });
        
        await nuevoUsuario.save();
        
        // Crear token
        const token = jwt.sign(
        { userId: nuevoUsuario._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
        );
        
        res.status(201).json({
        token,
        usuario: {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            nivel: nuevoUsuario.nivel
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    });

    // Login de usuario
    router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario
        const usuario = await User.findOne({ email });
        if (!usuario) {
        return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }
        
        // Verificar contraseña
        const passwordValido = await usuario.verificarPassword(password);
        if (!passwordValido) {
        return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }
        
        // Crear token
        const token = jwt.sign(
        { userId: usuario._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
        );
        
        res.json({
        token,
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            nivel: usuario.nivel,
            experiencia: usuario.experiencia,
            racha: usuario.racha
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

module.exports = router;