import { accessoriesInventory } from '@/config/accessories.js';
import { content } from '@/config/content.js';

export const levelData = [
    { level: 1, name: "Bebé Panda", xpThreshold: 0, theme: 'forest', pandaImage: content.pandas.level_01 },
    { level: 2, name: "Panda Explorador", xpThreshold: 1000, theme: 'forest', pandaImage: content.pandas.level_02 },
    { level: 3, name: "Panda Deportista", xpThreshold: 2500, theme: 'forest', pandaImage: content.pandas.level_03 },
    { level: 4, name: "Panda Meditador", xpThreshold: 4500, theme: 'river', pandaImage: content.pandas.level_04 },
    { level: 5, name: "Panda Chef", xpThreshold: 7000, theme: 'river', pandaImage: content.pandas.level_05 },
    { level: 6, name: "Panda Mago", xpThreshold: 10000, theme: 'river', pandaImage: content.pandas.level_06 },
    { level: 7, name: "Panda Viajero", xpThreshold: 13500, theme: 'mountain', pandaImage: content.pandas.level_07 },
    { level: 8, name: "Panda Samurai", xpThreshold: 17500, theme: 'mountain', pandaImage: content.pandas.level_08 },
    { level: 9, name: "Panda Científico", xpThreshold: 22000, theme: 'mountain', pandaImage: content.pandas.level_09 },
    { level: 10, name: "Panda Gamer", xpThreshold: 27000, theme: 'city', pandaImage: content.pandas.level_10 },
    { level: 11, name: "Panda Artista", xpThreshold: 32500, theme: 'city', pandaImage: content.pandas.level_11 },
    { level: 12, name: "Panda Ninja", xpThreshold: 38500, theme: 'city', pandaImage: content.pandas.level_12 },
    { level: 13, name: "Panda Astronauta", xpThreshold: 45000, theme: 'temple', pandaImage: content.pandas.level_13 },
    { level: 14, name: "Panda DJ", xpThreshold: 52000, theme: 'temple', pandaImage: content.pandas.level_14 },
    { level: 15, name: "Panda Maestro", xpThreshold: 60000, theme: 'temple', pandaImage: content.pandas.level_15 },
    { level: 16, name: "Panda Legendario", xpThreshold: 70000, theme: 'temple', pandaImage: content.pandas.level_16 },
];

export const getLevelRewards = (level) => {
    let rewards = [];
    for (const category in accessoriesInventory) {
        const categoryItems = accessoriesInventory[category];
        if (Array.isArray(categoryItems)) {
            categoryItems.forEach(item => {
                if (item.unlock_level === level) {
                    rewards.push(item);
                }
            });
        }
    }
    return rewards;
};