import { accessoriesInventory } from './accessories';

export const levelData = [
    { level: 1, name: "Novato del cambio", xpThreshold: 0 },
    { level: 2, name: "Explorador de hábitos", xpThreshold: 1000 },
    { level: 3, name: "Constructor diario", xpThreshold: 2500 },
    { level: 4, name: "Guardián de la rutina", xpThreshold: 4500 },
    { level: 5, name: "Atleta del bienestar", xpThreshold: 7000 },
    { level: 6, name: "Mente serena", xpThreshold: 10000 },
    { level: 7, name: "Energía constante", xpThreshold: 13500 },
    { level: 8, name: "Foco inquebrantable", xpThreshold: 17500 },
    { level: 9, name: "Arquitecto de la vida", xpThreshold: 22000 },
    { level: 10, name: "Virtuoso de la disciplina", xpThreshold: 27000 },
    { level: 11, name: "Campeón de la conexión", xpThreshold: 32500 },
    { level: 12, name: "Sabio del equilibrio", xpThreshold: 38500 },
    { level: 13, name: "Titán del crecimiento", xpThreshold: 45000 },
    { level: 14, name: "Héroe de la constancia", xpThreshold: 52000 },
    { level: 15, name: "Maestría Panda", xpThreshold: 60000 },
    { level: 16, name: "Leyenda del equilibrio", xpThreshold: 70000 },
];

export const getLevelRewards = (level) => {
    let rewards = [];
    for (const category in accessoriesInventory) {
        accessoriesInventory[category].forEach(item => {
            if (item.unlock_level === level) {
                rewards.push(item);
            }
        });
    }
    return rewards;
};
