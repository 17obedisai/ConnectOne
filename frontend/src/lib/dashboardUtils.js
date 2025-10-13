// src/lib/dashboardUtils.js

import { transformativeMissions } from './missionsData.js';

// ============================================
// SISTEMA DE DESAFÍOS SEMANALES ROTATORIOS
// ============================================

const WEEKLY_CHALLENGES_POOL = [
  {
    id: 'wc1',
    titulo: 'Semana de Sueño Perfecto',
    descripcion: 'Duerme 8+ horas durante 7 días consecutivos',
    tipo: 'sleep',
    meta: 7,
    xp: 500,
    emoji: '😴',
    color: 'from-indigo-600 to-purple-700',
    verificacion: (userData) => {
      // Verifica que se completó la misión de sueño 7 días seguidos
      const sleepMission = userData.completedMissions?.filter(m => m.includes('tm1')) || [];
      return sleepMission.length >= 7;
    },
    recompensas: ['Título "Maestro del Descanso"', 'Badge especial', '500 XP']
  },
  {
    id: 'wc2',
    titulo: 'Transformación Fitness Total',
    descripcion: 'Completa 5 entrenamientos de 45+ minutos',
    tipo: 'fitness',
    meta: 5,
    xp: 600,
    emoji: '💪',
    color: 'from-red-600 to-orange-700',
    verificacion: (userData) => {
      const workouts = userData.workoutSessions || [];
      return workouts.filter(w => w.duration >= 45).length >= 5;
    },
    recompensas: ['Badge "Guerrero Fitness"', 'Rutinas premium', '600 XP']
  },
  {
    id: 'wc3',
    titulo: 'Mente Zen Absoluta',
    descripcion: 'Medita 30+ minutos diarios por 7 días',
    tipo: 'meditation',
    meta: 7,
    xp: 450,
    emoji: '🧘',
    color: 'from-purple-600 to-pink-700',
    verificacion: (userData) => {
      const meditations = userData.meditationMinutes || {};
      const last7Days = Object.values(meditations).slice(-7);
      return last7Days.filter(m => m >= 30).length >= 7;
    },
    recompensas: ['Modo Zen Premium', 'Música exclusiva', '450 XP']
  },
  {
    id: 'wc4',
    titulo: 'Maestro del Enfoque',
    descripcion: 'Acumula 15 horas de deep work',
    tipo: 'focus',
    meta: 15,
    xp: 550,
    emoji: '🎯',
    color: 'from-blue-600 to-cyan-700',
    verificacion: (userData) => {
      const focusHours = (userData.totalFocusMinutes || 0) / 60;
      return focusHours >= 15;
    },
    recompensas: ['Timer avanzado', 'Estadísticas detalladas', '550 XP']
  },
  {
    id: 'wc5',
    titulo: 'Conexión Humana',
    descripcion: 'Conecta profundamente con 5 personas',
    tipo: 'social',
    meta: 5,
    xp: 400,
    emoji: '🤝',
    color: 'from-pink-600 to-rose-700',
    verificacion: (userData) => {
      return (userData.socialConnections || 0) >= 5;
    },
    recompensas: ['Badge Social', 'Chat stickers', '400 XP']
  },
  {
    id: 'wc6',
    titulo: 'Nutrición Óptima',
    descripcion: 'Completa protocolo de nutrición 7 días',
    tipo: 'nutrition',
    meta: 7,
    xp: 500,
    emoji: '🥗',
    color: 'from-green-600 to-emerald-700',
    verificacion: (userData) => {
      const nutritionDays = userData.completedNutrition || [];
      return nutritionDays.length >= 7;
    },
    recompensas: ['Plan nutricional premium', 'Recetas exclusivas', '500 XP']
  }
];

// Función para obtener 2 desafíos específicos basados en semana del año + userId
export const getWeeklyChallengesForUser = (userId) => {
  const weekNumber = getWeekOfYear();
  const userSeed = hashCode(userId);
  const combinedSeed = weekNumber + userSeed;
  
  // Usar el seed para seleccionar consistentemente 2 desafíos
  const index1 = combinedSeed % WEEKLY_CHALLENGES_POOL.length;
  const index2 = (combinedSeed + 3) % WEEKLY_CHALLENGES_POOL.length;
  
  const challenge1 = WEEKLY_CHALLENGES_POOL[index1];
  const challenge2 = WEEKLY_CHALLENGES_POOL[index2 !== index1 ? index2 : (index2 + 1) % WEEKLY_CHALLENGES_POOL.length];
  
  return [challenge1, challenge2];
};

// Calcular número de semana del año
const getWeekOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
};

// Hash simple para userId (consistente)
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Obtener progreso del usuario para un desafío
export const getChallengeProgress = (challengeId, userId) => {
  const savedProgress = localStorage.getItem(`challenge_${userId}_${challengeId}`);
  if (savedProgress) {
    const data = JSON.parse(savedProgress);
    const weekNumber = getWeekOfYear();
    
    // Si es la misma semana, retornar progreso guardado
    if (data.week === weekNumber) {
      return data.progress;
    }
  }
  
  // Nueva semana o sin datos = progreso 0
  return 0;
};

// Actualizar progreso de desafío
export const updateChallengeProgress = (challengeId, userId, progress) => {
  const weekNumber = getWeekOfYear();
  const data = {
    progress,
    week: weekNumber,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(`challenge_${userId}_${challengeId}`, JSON.stringify(data));
};

// ============================================
// CONEXIÓN CON MISIONES TRANSFORMADORAS
// ============================================

// Obtener misiones recomendadas (conectadas con missionsData.js)
export const getRecommendedMissions = () => {
  // Seleccionar 5 misiones estratégicamente
  return [
    transformativeMissions[0], // Sueño
    transformativeMissions[3], // Ejercicio  
    transformativeMissions[2], // Terapia cognitiva
    transformativeMissions[4], // Meditación
    transformativeMissions[7]  // Journaling
  ];
};

// ============================================
// PERSISTENCIA DE TIMERS
// ============================================

export const TimerPersistence = {
  // Guardar estado del timer
  save: (type, data) => {
    const timerData = {
      ...data,
      savedAt: Date.now()
    };
    localStorage.setItem(`timer_${type}`, JSON.stringify(timerData));
  },
  
  // Recuperar y calcular tiempo restante
  load: (type) => {
    const saved = localStorage.getItem(`timer_${type}`);
    if (!saved) return null;
    
    const data = JSON.parse(saved);
    const elapsed = Math.floor((Date.now() - data.savedAt) / 1000);
    
    if (data.endTime) {
      const remaining = Math.max(0, Math.floor((data.endTime - Date.now()) / 1000));
      return { ...data, remaining, elapsed };
    }
    
    return data;
  },
  
  // Limpiar timer
  clear: (type) => {
    localStorage.removeItem(`timer_${type}`);
  },
  
  // Verificar si hay timer activo
  hasActive: (type) => {
    const data = TimerPersistence.load(type);
    if (!data) return false;
    
    if (data.endTime && Date.now() < data.endTime) {
      return true;
    }
    
    return data.active;
  }
};

// ============================================
// UTILIDADES GENERALES
// ============================================

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default {
  getWeeklyChallengesForUser,
  getChallengeProgress,
  updateChallengeProgress,
  getRecommendedMissions,
  TimerPersistence,
  formatTime
};