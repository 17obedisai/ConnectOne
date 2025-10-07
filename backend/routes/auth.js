const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware de autenticación
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) {
      throw new Error();
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado' });
  }
};

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword
    });
    
    await usuario.save();
    
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      data: { 
        user: { 
          id: usuario._id, 
          nombre: usuario.nombre, 
          email: usuario.email 
        } 
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔍 Intento de login:', { email, password: '***' });
    
    const usuario = await Usuario.findOne({ email });
    console.log('👤 Usuario encontrado:', usuario ? 'Sí' : 'No');
    
    if (!usuario) {
      console.log('❌ Usuario no existe');
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    
    console.log('🔑 Comparando passwords...');
    const passwordValido = await bcrypt.compare(password, usuario.password);
    console.log('✅ Password válido:', passwordValido);
    
    if (!passwordValido) {
      console.log('❌ Password incorrecto');
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login exitoso');
    
    res.json({
      success: true,
      token,
      data: { 
        user: { 
          id: usuario._id, 
          nombre: usuario.nombre, 
          email: usuario.email 
        } 
      }
    });
  } catch (error) {
    console.error('💥 Error en login:', error);
    res.status(500).json({ mensaje: error.message });
  }
});
// Obtener usuario actual (ESTA RUTA FALTABA)
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.usuario
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;