require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http'); // IMPORTANTE: Agregar esto
const connectDB = require('./config/database');

const app = express();
const server = http.createServer(app); // IMPORTANTE: Crear servidor HTTP

// Socket.io (opcional, puedes comentarlo si no lo usas aún)
// const { Server } = require('socket.io');
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/missions', require('./src/routes/missions'));
app.use('/api/achievements', require('./src/routes/achievements'));
app.use('/api/questionnaire', require('./src/routes/questionnaire'));
app.use('/api/stats', require('./src/routes/stats'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🐼 ConnectONE API funcionando!' });
});

const PORT = process.env.PORT || 5000;

// IMPORTANTE: Usar server.listen en lugar de app.listen
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});