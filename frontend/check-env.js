// check-env.js
import fs from 'fs';
import path from 'path';

console.log('🔍 Verificando configuración del frontend...\n');

// Verificar archivos .env
const envFiles = ['.env', '.env.production'];
const projectRoot = process.cwd();

envFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`   Contenido:`);
    content.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        console.log(`   - ${line}`);
      }
    });
  } else {
    console.log(`❌ ${file} NO existe`);
  }
  console.log('');
});

// Verificar package.json
const packagePath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log('📦 Scripts disponibles:');
  Object.keys(pkg.scripts || {}).forEach(script => {
    console.log(`   - npm run ${script}`);
  });
}