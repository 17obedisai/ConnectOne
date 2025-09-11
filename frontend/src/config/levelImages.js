// Configuración de imágenes para cada nivel
export const levelImages = {
  1: '/images/panda-level-1.png',
  2: '/images/panda-level-2.png', 
  3: '/images/panda-level-3.png',
  4: '/images/panda-level-4.png',
  5: '/images/panda-level-5.png',
  6: '/images/panda-level-6.png',
  7: '/images/panda-level-7.png',
  8: '/images/panda-level-8.png',
  9: '/images/panda-level-9.png',
  10: '/images/panda-level-10.png',
  11: '/images/panda-level-11.png',
  12: '/images/panda-level-12.png',
  13: '/images/panda-level-13.png',
  14: '/images/panda-level-14.png',
  15: '/images/panda-level-15.png',
  16: '/images/panda-level-16.png',
};
export const getLevelImage = (level) => {
  return levelImages[level] || '/images/panda-logo.png';
};
// Si no tienes todas las imágenes, usa la imagen por defecto
export const getLevelImage = (level) => {
  return levelImages[level] || '/images/panda-logo.png';
};
