import { content } from '@/config/content.js';

export const ItemTypes = {
  ACCESSORY: 'accessory',
};

export const accessoriesInventory = {
  sombreros: [
    {
      id: 'gorra_basica',
      name: 'Gorra básica',
      src: '/images/items/sombreros/gorra-basica.png', // Actualiza esta ruta
      category: 'sombreros',
      unlock_level: 1,
    },
    {
      id: 'cinta_deportiva',
      name: 'Cinta deportiva',
      src: '/images/items/sombreros/cinta-deportiva.png',
      category: 'sombreros',
      unlock_level: 3,
    },
    // ... más items
  ],
  gafas: [
    {
      id: 'gafas_sol',
      name: 'Gafas de sol',
      src: '/images/items/gafas/gafas-sol.png',
      category: 'gafas',
      unlock_level: 2,
    },
    // ... más items
  ],
  collares: [
    {
      id: 'collar_nivel_7',
      name: 'Collar Nivel 7',
      src: '/images/items/collares/collar-7.png',
      category: 'collares',
      unlock_level: 7,
    },
    {
      id: 'collar_nivel_13',
      name: 'Collar Nivel 13',
      src: '/images/items/collares/collar-13.png',
      category: 'collares',
      unlock_level: 13,
    },
  ],
};

const getAnchors = (category, hand) => {
    switch(category) {
        case 'hat': return { x: 50, y: 15, scale: 0.7, zIndex: 10 };
        case 'glasses': return { x: 50, y: 35, scale: 0.5, zIndex: 20 };
        case 'necklace': return { x: 50, y: 65, scale: 0.4, zIndex: 30 };
        case 'wristbands': 
            return hand === 'left' 
                ? { x: 15, y: 70, scale: 0.2, zIndex: 25 }
                : { x: 85, y: 70, scale: 0.2, zIndex: 25 };
        case 'stickers': return { x: 50, y: 60, scale: 0.2, zIndex: 5 };
        default: return { x: 50, y: 50, scale: 0.3, zIndex: 1 };
    }
};

export { accessoriesInventory, getAnchors };