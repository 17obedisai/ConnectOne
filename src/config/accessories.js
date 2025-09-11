import { content } from '@/config/content.js';

export const ItemTypes = {
  ACCESSORY: 'accessory',
};

const accessoriesInventory = {
  hat: [
    { id: 'hat_basic_cap', name: 'Gorra básica', src: content.accessories.hat_basic, category: 'hat', unlock_level: 1 },
    { id: 'hat_bandana', name: 'Cinta deportiva', src: content.accessories.band_white, category: 'hat', unlock_level: 5 },
    { id: 'hat_wizard', name: 'Sombrero de mago', src: content.accessories.hat_wizard, category: 'hat', unlock_level: 7 },
    { id: 'hat_crown', name: 'Corona', src: content.accessories.hat_crown, category: 'hat', unlock_level: 13 },
  ],
  glasses: [
    { id: 'glasses_round', name: 'Gafas redondas', src: content.accessories.glasses_round, category: 'glasses', unlock_level: 1 },
    { id: 'glasses_square', name: 'Gafas cuadradas', src: content.accessories.glasses_square, category: 'glasses', unlock_level: 1 },
    { id: 'glasses_cool', name: 'Gafas de sol', src: content.accessories.glasses_cool, category: 'glasses', unlock_level: 4 },
  ],
  necklace: [
    { id: 'necklace_scarf', name: 'Bufanda simple', src: content.accessories.necklace_scarf, category: 'necklace', unlock_level: 1 },
    { id: 'necklace_medal', name: 'Medalla de oro', src: content.accessories.necklace_medal, category: 'necklace', unlock_level: 14 },
  ],
  wristbands: [
    { id: 'wristband_green_left', name: 'Muñequera verde (izq)', src: content.accessories.wristband_left, category: 'wristbands', unlock_level: 1, hand: 'left' },
    { id: 'wristband_green_right', name: 'Muñequera verde (der)', src: content.accessories.wristband_right, category: 'wristbands', unlock_level: 1, hand: 'right' },
  ],
  stickers: [
    { id: 'sticker_e', name: 'Letra E', src: content.accessories.sticker_e, category: 'stickers', unlock_level: 1 },
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