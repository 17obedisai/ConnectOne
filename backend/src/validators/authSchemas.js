const { z } = require('zod');

// Esquema de registro. No se permiten contraseñas por defecto ni campos opcionales:
// todos los campos son obligatorios y validados estrictamente.
const registerSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es requerido').max(60, 'Nombre demasiado largo'),
  email: z.string().trim().toLowerCase().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

// Esquema de login. Email validado; password solo se exige presente.
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

module.exports = { registerSchema, loginSchema };
