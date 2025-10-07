require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth'));        // ← AGREGAR ESTA LÍNEA
app.use('/api/usuarios', require('./routes/usuarios'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🚀 API conectada a MongoDB Atlas',
    status: 'Funcionando correctamente'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});