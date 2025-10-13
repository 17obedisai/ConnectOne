const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ✅ SIN las opciones deprecadas
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Atlas conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

module.exports = connectDB;
