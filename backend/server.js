require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas (las crearemos a continuación)
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/missions', require('./src/routes/missions'));
app.use('/api/achievements', require('./src/routes/achievements'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: '🐼 ConnectONE API funcionando!' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});