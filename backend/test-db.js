// test-db.js
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Verificando conexión a MongoDB...\n');
console.log('📝 Variables de entorno:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Definida' : '❌ NO definida');
console.log('- NODE_ENV:', process.env.NODE_ENV || '(no definido)');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Definida' : '❌ NO definida');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || '❌ NO definida');
console.log('\n🔗 Intentando conectar a MongoDB...\n');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');
    console.log('📊 Base de datos:', mongoose.connection.name);
    console.log('🌍 Host:', mongoose.connection.host);
    console.log('\n✨ Todo está correcto. Cerrando conexión...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:');
    console.error(error.message);
    console.log('\n💡 Revisa:');
    console.log('1. Que tu MONGODB_URI esté correcta en el .env');
    console.log('2. Que tu IP esté en la whitelist de MongoDB Atlas');
    console.log('3. Que el usuario/contraseña sean correctos');
    process.exit(1);
  });

// Timeout de seguridad
setTimeout(() => {
  console.error('⏱️  Timeout: La conexión tardó demasiado');
  process.exit(1);
}, 10000);