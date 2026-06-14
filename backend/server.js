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

// CORS estricto: allowlist con el dominio de producción + orígenes de desarrollo.
// Incluimos el dominio real (connectone.space) por defecto para no depender de que
// FRONTEND_URL esté configurada exactamente. Normalizamos el slash final para evitar
// fallos por "https://dominio.com/" vs "https://dominio.com".
const normalizeOrigin = (u) => (u || '').replace(/\/+$/, '');
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://connectone.space',
  'https://www.connectone.space',
  'http://localhost:5173',
  'http://localhost:4173'
].filter(Boolean).map(normalizeOrigin);

app.use(
  cors({
    origin: (origin, callback) => {
      // Sin Origin (curl, health checks server-to-server) o en la allowlist -> permitido.
      if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
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
  message: { message: 'Demasiadas peticiones, intenta de nuevo más tarde.' }
});
app.use('/api/', apiLimiter);

// Limiter estricto anti fuerza-bruta sobre autenticación: 10 intentos por hora/IP.
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  // Las peticiones exitosas no cuentan: solo penalizamos intentos fallidos.
  skipSuccessfulRequests: true,
  message: { message: 'Demasiados intentos de autenticación. Espera una hora e intenta de nuevo.' }
});

// Limiter para IA: las llamadas a Gemini cuestan dinero/tokens. 30 por 15 min/IP.
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Has alcanzado el límite de consultas a la IA. Intenta de nuevo en unos minutos.' }
});

// ─────────────────────────────────────────────────────────────
// 4. RUTAS — ÚNICA FUENTE DE VERDAD: backend/src/routes/
// ─────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, require('./src/routes/auth'));
app.use('/api/questionnaire', require('./src/routes/questionnaire'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/missions', require('./src/routes/missions'));
app.use('/api/pomodoro', require('./src/routes/pomodoro'));
app.use('/api/dailyfocus', require('./src/routes/dailyFocus'));
app.use('/api/skilltree', require('./src/routes/skillTree'));
app.use('/api/journal', require('./src/routes/journal'));
app.use('/api/reminders', require('./src/routes/reminders'));
app.use('/api/notes', require('./src/routes/notes'));
app.use('/api/retos', require('./src/routes/retos'));
app.use('/api/academia', require('./src/routes/academia'));
app.use('/api/fitness', require('./src/routes/fitness'));
app.use('/api/proyectos', require('./src/routes/proyectos'));
app.use('/api/libros', require('./src/routes/libros'));
app.use('/api/finance', require('./src/routes/finance'));
app.use('/api/overview', require('./src/routes/overview'));
app.use('/api/push', require('./src/routes/push'));
app.use('/api/ai', aiLimiter, require('./src/routes/ai'));

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
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Error handler global — captura cualquier fallo no manejado para que el
// proceso NO se caiga y el frontend reciba siempre un message legible.
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || '(no definida)'}`);
});
