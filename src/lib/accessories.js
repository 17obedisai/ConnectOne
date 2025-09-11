export const ItemTypes = {
  ACCESSORY: 'accessory',
};

const accessoriesInventory = {
  hat: [
    { id: 'hat_basic_cap', name: 'Gorra básica', src: 'https://horizons-cdn.hostinger.com/06f38999-b919-492f-b7f0-5d133cb25cb2/gorra.png', category: 'hat', unlocked: true },
    { id: 'hat_bandana', name: 'Cinta deportiva blanca', src: 'https://horizons-cdn.hostinger.com/06f38999-b919-492f-b7f0-5d133cb25cb2/cinta.png', category: 'hat', unlocked: false, unlock_level: 5 },
    { id: 'hat_wizard', name: 'Sombrero de mago', src: 'https://horizons-cdn.hostinger.com/06f38999-b919-492f-b7f0-5d133cb25cb2/sombrero.png', category: 'hat', unlocked: false, unlock_level: 7 },
    { id: 'hat_crown', name: 'Corona', src: '', category: 'hat', unlocked: false, unlock_level: 13 },
  ],
  glasses: [
    { id: 'glasses_round', name: 'Gafas redondas', src: 'https://horizons-cdn.hostinger.com/06f38999-b919-492f-b7f0-5d133cb25cb2/gafas.png', category: 'glasses', unlocked: true },
    { id: 'glasses_square', name: 'Gafas cuadradas', src: '', category: 'glasses', unlocked: true },
    { id: 'glasses_cool', name: 'Gafas de sol', src: '', category: 'glasses', unlocked: false, unlock_level: 4 },
  ],
  necklace: [
    { id: 'necklace_scarf', name: 'Bufanda simple', src: '', category: 'necklace', unlocked: true },
    { id: 'necklace_medal', name: 'Medalla de oro', src: '', category: 'necklace', unlocked: false, unlock_level: 14 },
  ],
  wristbands: [
    { id: 'wristband_green_left', name: 'Muñequera verde (izq)', src: '', category: 'wristbands', unlocked: true, hand: 'left' },
    { id: 'wristband_green_right', name: 'Muñequera verde (der)', src: '', category: 'wristbands', unlocked: true, hand: 'right' },
  ],
  stickers: [
    { id: 'sticker_e', name: 'Letra E', src: '', category: 'stickers', unlocked: true },
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
