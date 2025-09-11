
import { content } from '@/config/content.js';

export const achievementCategories = {
  progress: { name: 'Progreso', icon: 'Star' },
  consistency: { name: 'Consistencia', icon: 'Flame' },
  mastery: { name: 'Maestría', icon: 'BrainCircuit' },
  wellbeing: { name: 'Bienestar', icon: 'Heart' },
  social: { name: 'Social', icon: 'Users' },
};

export const achievementsList = [
  // Consistencia
  { id: 'streak_3', category: 'consistency', title: '¡En Marcha!', description: 'Mantén una racha de 3 días seguidos.', rarity: 'comun', target: 3, reward: { coins: 50, trophy: content.trophies.bronze } },
  { id: 'streak_7', category: 'consistency', title: 'Semana Perfecta', description: 'Mantén una racha de 7 días seguidos.', rarity: 'comun', target: 7, reward: { coins: 100, trophy: content.trophies.silver } },
  { id: 'streak_14', category: 'consistency', title: 'Quincena de Hierro', description: 'Mantén una racha de 14 días seguidos.', rarity: 'epico', target: 14, reward: { coins: 250, trophy: content.trophies.gold } },
  { id: 'streak_30', category: 'consistency', title: 'Compromiso Total', description: 'Mantén una racha de 30 días.', rarity: 'legendario', target: 30, reward: { coins: 500, trophy: content.trophies.platinum } },

  // Progreso
  { id: 'level_2', category: 'progress', title: 'Primeros Pasos', description: 'Alcanza el nivel 2.', rarity: 'comun', target: 2, reward: { coins: 20 } },
  { id: 'level_5', category: 'progress', title: 'Poder Panda', description: 'Alcanza el nivel 5.', rarity: 'comun', target: 5, reward: { coins: 150, accessory: 'hat_basic' } },
  { id: 'level_10', category: 'progress', title: 'Veterano de ConnectONE', description: 'Alcanza el nivel 10.', rarity: 'epico', target: 10, reward: { coins: 300, accessory: 'glasses_cool' } },
  { id: 'level_16', category: 'progress', title: 'Maestro Legendario', description: 'Alcanza el nivel 16, el máximo nivel.', rarity: 'legendario', target: 16, reward: { coins: 1000, accessory: 'hat_crown' } },

  // Maestría
  { id: 'missions_10', category: 'mastery', title: 'Aprendiz de Misiones', description: 'Completa 10 misiones.', rarity: 'comun', target: 10, reward: { coins: 50 } },
  { id: 'missions_50', category: 'mastery', title: 'Hábito Maestro', description: 'Completa 50 misiones.', rarity: 'epico', target: 50, reward: { coins: 200 } },
  { id: 'missions_100', category: 'mastery', title: 'Señor de las Tareas', description: 'Completa 100 misiones.', rarity: 'legendario', target: 100, reward: { coins: 400 } },
  { id: 'all_categories', category: 'mastery', title: 'Multitarea', description: 'Completa una misión de cada categoría principal en una semana.', rarity: 'epico', target: 3, reward: { coins: 150 } },

  // Bienestar
  { id: 'meditate_10', category: 'wellbeing', title: 'Mente Serena', description: 'Completa 10 sesiones de meditación.', rarity: 'comun', target: 10, reward: { coins: 75, accessory: 'band_white' } },
  { id: 'meditate_50', category: 'wellbeing', title: 'Maestro Zen', description: 'Completa 50 sesiones de meditación.', rarity: 'epico', target: 50, reward: { coins: 250 } },
  { id: 'exercise_10', category: 'wellbeing', title: 'Atleta Amateur', description: 'Completa 10 rutinas de ejercicio.', rarity: 'comun', target: 10, reward: { coins: 75, accessory: 'wristband_left' } },
  { id: 'exercise_50', category: 'wellbeing', title: 'Atleta Pro', description: 'Completa 50 rutinas de ejercicio.', rarity: 'epico', target: 50, reward: { coins: 250 } },
  { id: 'focus_10', category: 'wellbeing', title: 'Foco Inicial', description: 'Usa el modo Foco por 10 horas.', rarity: 'comun', target: 10, reward: { coins: 100 } },
  { id: 'focus_50', category: 'wellbeing', title: 'Foco Inquebrantable', description: 'Usa el modo Foco por 50 horas.', rarity: 'epico', target: 50, reward: { coins: 300, accessory: 'glasses_round' } },

  // Social (simulado por ahora)
  { id: 'share_1', category: 'social', title: '¡Hola Mundo!', description: 'Comparte tu primer logro.', rarity: 'comun', target: 1, reward: { coins: 25 } },
  { id: 'share_5', category: 'social', title: 'Explorador Social', description: 'Comparte 5 logros o progresos.', rarity: 'comun', target: 5, reward: { coins: 100 } },
];
