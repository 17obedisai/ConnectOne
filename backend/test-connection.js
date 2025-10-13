require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Verificando variables de entorno...');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('JWT_SECRET existe:', !!process.env.JWT_SECRET);
console.log('MONGODB_URI existe:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length);

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI no está definido!');
  process.exit(1);
}

console.log('\n🔗 Intentando conectar a MongoDB...');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conexión exitosa!');
    console.log('📊 Base de datos:', mongoose.connection.name);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
