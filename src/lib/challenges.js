
import { content } from '@/config/content.js';

export const challengeDifficulties = {
  easy: { name: 'Fácil', color: 'bg-green-500', rewardMultiplier: 1 },
  medium: { name: 'Medio', color: 'bg-yellow-500', rewardMultiplier: 2 },
  hard: { name: 'Difícil', color: 'bg-red-500', rewardMultiplier: 3 },
};

export const challengesPool = [
  // Bienestar
  { id: 'ch_meditate_3', title: '3 Días de Calma', description: 'Completa 3 sesiones de meditación esta semana.', category: 'wellbeing', difficulty: 'easy', target: 3, reward: { coins: 50 } },
  { id: 'ch_hydrate_7', title: 'Hidratación Total', description: 'Registra tu consumo de agua los 7 días de la semana.', category: 'wellbeing', difficulty: 'medium', target: 7, reward: { coins: 150 } },
  { id: 'ch_no_sugar_3', title: 'Semana sin Azúcar', description: 'Evita los azúcares añadidos durante 3 días.', category: 'wellbeing', difficulty: 'medium', target: 3, reward: { coins: 120 } },
  { id: 'ch_no_screens_5', title: 'Noches Analógicas', description: 'No uses pantallas 30 min antes de dormir durante 5 noches.', category: 'wellbeing', difficulty: 'hard', target: 5, reward: { coins: 250, accessory: 'glasses_round' } },
  
  // Productividad
  { id: 'ch_pomodoro_5', title: 'Foco Principiante', description: 'Completa 5 sesiones Pomodoro.', category: 'productivity', difficulty: 'easy', target: 5, reward: { coins: 60 } },
  { id: 'ch_read_2', title: 'Rincón de Lectura', description: 'Lee durante 25 minutos en 2 días diferentes.', category: 'productivity', difficulty: 'easy', target: 2, reward: { coins: 50 } },
  { id: 'ch_pomodoro_10', title: 'Foco Intermedio', description: 'Completa 10 sesiones Pomodoro.', category: 'productivity', difficulty: 'medium', target: 10, reward: { coins: 130 } },
  
  // Actividad Física
  { id: 'ch_exercise_3', title: 'Trío Funcional', description: 'Realiza 3 rutinas de ejercicio funcional.', category: 'physical', difficulty: 'medium', target: 3, reward: { coins: 150, accessory: 'band_white' } },
  { id: 'ch_steps_50k', title: 'Maratón Semanal', description: 'Alcanza los 50,000 pasos en la semana.', category: 'physical', difficulty: 'hard', target: 50000, reward: { coins: 300 } },
  { id: 'ch_stretch_5', title: 'Flexibilidad Diaria', description: 'Realiza una sesión de estiramiento 5 días.', category: 'physical', difficulty: 'easy', target: 5, reward: { coins: 70 } },

  // Maestría y otros
  { id: 'ch_missions_10', title: 'Cazador de Misiones', description: 'Completa 10 misiones diarias esta semana.', category: 'mastery', difficulty: 'medium', target: 10, reward: { coins: 100 } },
  { id: 'ch_journal_3', title: 'Diario de Gratitud', description: 'Escribe en tu diario 3 veces esta semana.', category: 'wellbeing', difficulty: 'easy', target: 3, reward: { coins: 40 } },
  { id: 'ch_sleep_8h_4', title: 'Sueño Reparador', description: 'Duerme 8 horas o más durante 4 noches.', category: 'wellbeing', difficulty: 'medium', target: 4, reward: { coins: 120 } },
  { id: 'ch_new_recipe_1', title: 'Chef Experimental', description: 'Prueba una receta saludable nueva.', category: 'wellbeing', difficulty: 'easy', target: 1, reward: { coins: 30 } },
  { id: 'ch_digital_detox_1', title: 'Detox Digital', description: 'Pasa 2 horas seguidas sin redes sociales.', category: 'wellbeing', difficulty: 'easy', target: 1, reward: { coins: 50 } },
];

// Simple pseudo-random generator based on seed
const seededRandom = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
};

export const getWeeklyChallenges = () => {
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeekNumber(now);
  const seed = year * 100 + week;

  // Shuffle the pool based on the seed
  const shuffled = [...challengesPool].sort((a, b) => {
    const randomA = seededRandom(seed + a.id.charCodeAt(3));
    const randomB = seededRandom(seed + b.id.charCodeAt(3));
    return randomA - randomB;
  });

  // Select 2 of each difficulty
  const easy = shuffled.filter(c => c.difficulty === 'easy').slice(0, 2);
  const medium = shuffled.filter(c => c.difficulty === 'medium').slice(0, 2);
  const hard = shuffled.filter(c => c.difficulty === 'hard').slice(0, 2);

  return [...easy, ...medium, ...hard];
};

export const getChallengesEndDate = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
    const daysUntilSunday = 7 - dayOfWeek;
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + daysUntilSunday);
    endDate.setHours(23, 59, 59, 999);
    return endDate;
};
