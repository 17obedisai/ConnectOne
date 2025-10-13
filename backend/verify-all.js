// verify-all.js
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

const tests = [];

// Test 1: Variables de entorno
console.log('🔍 TEST 1: Variables de entorno\n');
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName} está definida`);
    tests.push(true);
  } else {
    console.log(`❌ ${varName} NO está definida`);
    tests.push(false);
  }
});

// Test 2: MongoDB
console.log('\n🔍 TEST 2: Conexión a MongoDB\n');
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB conectado');
    tests.push(true);
    
    // Test 3: Servidor
    console.log('\n🔍 TEST 3: Verificando servidor (debe estar corriendo)\n');
    try {
      const response = await axios.get('http://localhost:5000/');
      console.log('✅ Servidor responde correctamente');
      console.log('   Status:', response.status);
      tests.push(true);
    } catch (error) {
      console.log('❌ Servidor NO responde (¿está corriendo?)');
      console.log('   Ejecuta: npm start');
      tests.push(false);
    }
    
    // Resumen
    console.log('\n' + '='.repeat(50));
    const passed = tests.filter(t => t).length;
    const total = tests.length;
    console.log(`📊 RESULTADO: ${passed}/${total} tests pasados`);
    
    if (passed === total) {
      console.log('✨ ¡Todo está listo para desplegar!');
    } else {
      console.log('⚠️  Revisa los errores antes de desplegar');
    }
    
    process.exit(passed === total ? 0 : 1);
  })
  .catch(error => {
    console.log('❌ Error en MongoDB:', error.message);
    tests.push(false);
    process.exit(1);
  });