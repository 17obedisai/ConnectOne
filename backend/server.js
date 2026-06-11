require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// ─────────────────────────────────────────────────────────────
// 1. VALIDACIÓN IMPERATIVA DE VARIABLES DE ENTORNO
//    Si falta alguna variable crítica, abortamos el arranque.
// ─────────────────────────────────────────────────────────────
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(
    `❌ Faltan variables de entorno obligatorias: ${missingEnv.join(', ')}.\n` +
      '   Define un archivo .env antes de iniciar el servidor.'
  );
  process.exit(1);
}

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// ─────────────────────────────────────────────────────────────
// 2. SEGURIDAD Y MIDDLEWARES BASE
// ─────────────────────────────────────────────────────────────
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sanitización anti-inyección NoSQL.
// NOTA: express-mongo-sanitize como middleware global es INCOMPATIBLE con
// Express 5 (intenta reasignar req.query, que es un getter de solo lectura).
// Verificado empíricamente -> usamos su función pura sanitize() mutando en sitio.
app.use((req, res, next) => {
  const options = { replaceWith: '_' };
  if (req.body) mongoSanitize.sanitize(req.body, options);
  if (req.params) mongoSanitize.sanitize(req.params, options);
  if (req.query) mongoSanitize.sanitize(req.query, options);
  next();
});

// ─────────────────────────────────────────────────────────────
// 3. RATE LIMITING GLOBAL SOBRE /api/
//    100 peticiones por IP cada 15 minutos.
// ─────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { mensaje: 'Demasiadas peticiones, intenta de nuevo más tarde.' }
});
app.use('/api/', apiLimiter);

// ─────────────────────────────────────────────────────────────
// 4. RUTAS — ÚNICA FUENTE DE VERDAD: backend/src/routes/
// ─────────────────────────────────────────────────────────────
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/questionnaire', require('./src/routes/questionnaire'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/missions', require('./src/routes/missions'));
app.use('/api/achievements', require('./src/routes/achievements'));
app.use('/api/pomodoro', require('./src/routes/pomodoro'));

// Health check
app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 API de ConnectONE',
    status: 'Funcionando correctamente',
    timestamp: new Date()
  });
});

// ─────────────────────────────────────────────────────────────
// 5. MANEJO DE ERRORES
// ─────────────────────────────────────────────────────────────
// 404
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    mensaje: 'Error del servidor',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || '(no definida)'}`);
});
