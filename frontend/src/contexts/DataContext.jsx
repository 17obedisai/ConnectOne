import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);

  // Estado de logros expandido
  const [achievements, setAchievements] = useState({
    unlocked: ['welcome'], // Logro inicial
    progress: {
      misiones: 0,
      meditacion: 0,
      ejercicio: 0,
      lectura: 0,
      conexion: 0,
      bondad: 0,
      hidratacion: 0,
      sueno: 0,
      diario: 0,
      metas: 0,
      planificacion: 0,
      respiracion: 0,
      estiramiento: 0,
      hiit: 0,
      conversacion: 0,
      ayuda: 0,
      alimentacion: 0,
      detox: 0,
      gratitud: 0,
      nivel: 1,
      racha: 0,
      regreso: 0,
      recuperacion: 0,
      meditacion_am: 0,
      ejercicio_am: 0,
      temprano: 0,
      nocturno: 0,
      finde: 0,
      dia_perfecto: 0,
      categorias: 0,
      velocidad: 0,
      logros: 1
    }
  });

  // Función para actualizar progreso de logros
  const updateAchievementProgress = (type, value = 1) => {
    setAchievements(prev => {
      const newProgress = {
        ...prev.progress,
        [type]: (prev.progress[type] || 0) + value
      };

      // Auto-desbloquear logros basados en el progreso
      const newUnlocked = [...prev.unlocked];
      
      // Verificar cada logro
      if (newProgress.misiones >= 1 && !newUnlocked.includes('first_step')) {
        newUnlocked.push('first_step');
      }
      if (newProgress.misiones >= 3 && !newUnlocked.includes('three_missions')) {
        newUnlocked.push('three_missions');
      }
      if (newProgress.racha >= 2 && !newUnlocked.includes('first_streak')) {
        newUnlocked.push('first_streak');
      }
      if (newProgress.racha >= 7 && !newUnlocked.includes('week_warrior')) {
        newUnlocked.push('week_warrior');
      }
      if (newProgress.racha >= 14 && !newUnlocked.includes('two_weeks')) {
        newUnlocked.push('two_weeks');
      }
      if (newProgress.racha >= 30 && !newUnlocked.includes('month_master')) {
        newUnlocked.push('month_master');
      }
      if (newProgress.nivel >= 5 && !newUnlocked.includes('level_5')) {
        newUnlocked.push('level_5');
      }
      if (newProgress.nivel >= 10 && !newUnlocked.includes('level_10')) {
        newUnlocked.push('level_10');
      }
      if (newProgress.meditacion >= 1 && !newUnlocked.includes('first_meditation')) {
        newUnlocked.push('first_meditation');
      }
      if (newProgress.ejercicio >= 1 && !newUnlocked.includes('first_workout')) {
        newUnlocked.push('first_workout');
      }
      if (newProgress.lectura >= 1 && !newUnlocked.includes('first_book')) {
        newUnlocked.push('first_book');
      }
      if (newProgress.diario >= 1 && !newUnlocked.includes('first_journal')) {
        newUnlocked.push('first_journal');
      }
      if (newProgress.conexion >= 1 && !newUnlocked.includes('first_connection')) {
        newUnlocked.push('first_connection');
      }
      if (newProgress.bondad >= 5 && !newUnlocked.includes('kind_heart')) {
        newUnlocked.push('kind_heart');
      }
      if (newProgress.hidratacion >= 3 && !newUnlocked.includes('hydration_hero')) {
        newUnlocked.push('hydration_hero');
      }

      // Actualizar contador de logros
      newProgress.logros = newUnlocked.length;

      return {
        unlocked: newUnlocked,
        progress: newProgress
      };
    });
  };

  // Función para actualizar progreso de misiones
  const updateMissionProgress = (missionId, completed) => {
    if (completed) {
      setCompletedMissions(prev => [...prev, missionId]);
      updateAchievementProgress('misiones');
      
      // Actualizar stats
      setStats(prev => ({
        ...prev,
        missionsCompleted: (prev?.missionsCompleted || 0) + 1,
        missionsCompletedToday: (prev?.missionsCompletedToday || 0) + 1,
        xp: (prev?.xp || 0) + 50
      }));
    }
  };

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      // Resetear todo cuando no hay usuario
      setProfile(null);
      setStats(null);
      setCustomization(null);
      setCompletedActivities([]);
      setCompletedMissions([]);
      setAchievements({
        unlocked: ['welcome'],
        progress: {
          misiones: 0,
          nivel: 1,
          racha: 0,
          logros: 1
        }
      });
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Valores por defecto mejorados
      const defaultProfile = {
        nombre: user?.nombre || 'Usuario',
        full_name: user?.nombre || 'Usuario',
        email: user?.email || '',
        bio: 'Bienvenido a tu viaje de bienestar',
        level: 1,
        main_goal: 'physical_wellness',
        notifications: true,
        avatar: '🐼'
      };
      
      const defaultStats = {
        level: 1,
        xp: 0,
        xpToNext: 1000,
        xp_to_next_level: 1000,
        streak: 3, // Para demostración
        achievements: 1,
        achievements_unlocked: 1,
        missionsCompleted: 2, // Para demostración
        missionsCompletedToday: 2,
        weeklyMissions: 12,
        minutesActiveToday: 45,
        focusTimeToday: 25,
        wellbeingScore: 85,
        caloriesBurnedToday: 320,
        mindfulMinutesToday: 15
      };
      
      const defaultCustomization = {
        items: [],
        theme: 'default',
        pandaSkin: 'classic'
      };
      
      // Simular carga desde backend
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Simular delay de red
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Por ahora usar valores de demo
          setProfile(defaultProfile);
          setStats(defaultStats);
          
          // Actualizar logros basados en stats
          updateAchievementProgress('nivel', defaultStats.level - 1);
          updateAchievementProgress('racha', defaultStats.streak);
          updateAchievementProgress('misiones', defaultStats.missionsCompleted);
          
        } catch (error) {
          console.log('Usando datos locales');
          setProfile(defaultProfile);
          setStats(defaultStats);
        }
      } else {
        setProfile(defaultProfile);
        setStats(defaultStats);
      }
      
      setCustomization(defaultCustomization);
      setCompletedActivities(['activity1', 'activity2']); // Demo data
      setCompletedMissions(['m1', 'm2']); // Demo data
      
    } catch (error) {
      console.error('Error cargando datos:', error);
      // Valores mínimos de emergencia
      setProfile({
        nombre: 'Usuario',
        full_name: 'Usuario',
        email: '',
        bio: '',
        level: 1,
        main_goal: 'physical_wellness'
      });
      setStats({
        level: 1,
        xp: 0,
        xp_to_next_level: 1000,
        xpToNext: 1000,
        streak: 0,
        achievements: 0,
        achievements_unlocked: 0,
        missionsCompleted: 0,
        missionsCompletedToday: 0
      });
      setCustomization({ items: [] });
      setCompletedActivities([]);
      setCompletedMissions([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadUserData();
  };

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateStats = (updates) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const updateCustomization = (updates) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  // Valor del contexto con todas las funciones
  const value = {
    // Estados
    profile,
    stats,
    customization,
    completedActivities,
    completedMissions,
    achievements,
    loading,
    
    // Funciones de actualización
    refreshData,
    setProfile,
    setStats,
    setCustomization,
    setCompletedActivities,
    setCompletedMissions,
    updateProfile,
    updateStats,
    updateCustomization,
    updateAchievementProgress,
    updateMissionProgress,
    
    // Helpers
    isAchievementUnlocked: (achievementId) => {
      return achievements.unlocked.includes(achievementId);
    },
    getAchievementProgress: (type) => {
      return achievements.progress[type] || 0;
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;