const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/authSchemas');

const TOKEN_EXPIRY = '7d';

// Genera un JWT cuyo payload contiene SIEMPRE el id del usuario.
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

// Serializa un usuario para la respuesta, garantizando que NUNCA se exponga el password.
const serializeUser = (user) => ({
  id: user._id,
  nombre: user.nombre,
  email: user.email,
  nivel: user.nivel,
  experiencia: user.experiencia,
  racha: user.racha
});

// ─────────────────────────────────────────────────────────────
// POST /register — datos validados por registerSchema antes de la lógica
// ─────────────────────────────────────────────────────────────
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Comprobación de existencia sin traer el hash de password.
    const usuarioExistente = await User.findOne({ email }).select('_id');
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    // El hash de password lo realiza el hook pre-save del modelo.
    const nuevoUsuario = await User.create({ nombre, email, password });

    const token = signToken(nuevoUsuario._id);

    res.status(201).json({
      success: true,
      token,
      data: { user: serializeUser(nuevoUsuario) }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /login — datos validados por loginSchema antes de la lógica
// ─────────────────────────────────────────────────────────────
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Aquí sí se requiere el hash para verificar la contraseña; nunca se devuelve al cliente.
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }

    const passwordValido = await usuario.verificarPassword(password);
    if (!passwordValido) {
      return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }

    const token = signToken(usuario._id);

    res.json({
      success: true,
      token,
      data: { user: serializeUser(usuario) }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /me — identidad tomada del JWT (req.user.id), NUNCA del body
// ─────────────────────────────────────────────────────────────
router.get('/me', auth, async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.json({
      success: true,
      data: { user: serializeUser(usuario) }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
