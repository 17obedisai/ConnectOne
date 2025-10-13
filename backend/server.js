require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Seguridad y middlewares
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questionnaire', require('./routes/questionnaire')); // ← NUEVA RUTA

// Health check
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🚀 API de ConnectONE',
    status: 'Funcionando correctamente',
    timestamp: new Date(),
    rutas: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/questionnaire/submit',
      '/api/questionnaire/status'
    ]
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Error handler
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
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});