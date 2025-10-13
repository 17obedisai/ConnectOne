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
    req.userId = usuario._id;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado' });
  }
};

// ✅ REGISTRO - CON questionnaire_completed
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    console.log('📝 Registro nuevo usuario:', { nombre, email });
    
    // Validaciones
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }
    
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      console.log('❌ Usuario ya existe:', email);
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    
    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear usuario
    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      questionnaire_completed: false // ← Siempre false al registrarse
    });
    
    await usuario.save();
    console.log('✅ Usuario creado:', usuario._id);
    
    // Generar token
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // ✅ RESPUESTA CON FORMATO CORRECTO
    res.status(201).json({
      success: true,
      token,
      data: {
        user: {
          id: usuario._id, 
          nombre: usuario.nombre, 
          email: usuario.email,
          nivel: usuario.nivel || 1,
          experiencia: usuario.experiencia || 0,
          racha: usuario.racha || 0,
          questionnaire_completed: false // ← Siempre false para nuevos usuarios
        }
      }
    });
    
  } catch (error) {
    console.error('💥 Error en registro:', error);
    res.status(500).json({ 
      mensaje: 'Error en el servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ✅ LOGIN - CON questionnaire_completed
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔍 Intento de login:', email);
    
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son requeridos' });
    }
    
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log('❌ Usuario no existe');
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    
    const passwordValido = await bcrypt.compare(password, usuario.password);
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
    
    // ✅ RESPUESTA CON FORMATO CORRECTO
    res.json({
      success: true,
      token,
      data: {
        user: {
          id: usuario._id, 
          nombre: usuario.nombre, 
          email: usuario.email,
          nivel: usuario.nivel || 1,
          experiencia: usuario.experiencia || 0,
          racha: usuario.racha || 0,
          questionnaire_completed: usuario.questionnaire_completed || false // ← Incluir estado del cuestionario
        }
      }
    });
    
  } catch (error) {
    console.error('💥 Error en login:', error);
    res.status(500).json({ 
      mensaje: 'Error en el servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ✅ Obtener usuario actual
router.get('/me', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).select('-password');
    
    res.json({
      success: true,
      data: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        nivel: usuario.nivel,
        experiencia: usuario.experiencia,
        racha: usuario.racha,
        questionnaire_completed: usuario.questionnaire_completed || false,
        perfilInicial: usuario.perfilInicial
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;