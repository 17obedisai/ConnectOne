import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setProfile(null);
      setStats(null);
      setCustomization(null);
      setCompletedActivities([]);
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Valores por defecto garantizados
      const defaultProfile = {
        full_name: user?.nombre || 'Usuario',
        email: user?.email || '',
        bio: '',
        level: 1,
        main_goal: 'physical_wellness',
        notifications: true
      };
      
      const defaultStats = {
        level: user?.nivel || 1,
        xp: user?.experiencia || 0,
        xp_to_next_level: 1000,
        streak: user?.racha || 0,
        achievements_unlocked: 0
      };
      
      const defaultCustomization = {
        items: []
      };
      
      // Intentar cargar datos del backend si hay token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/stats/dashboard', {
            headers: { 
              'x-auth-token': token,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setProfile({
              ...defaultProfile,
              ...data.usuario
            });
            setStats({
              ...defaultStats,
              level: data.usuario?.nivel || 1,
              xp: data.usuario?.experiencia || 0,
              streak: data.usuario?.racha || 0
            });
          } else {
            // Usar valores por defecto si falla
            setProfile(defaultProfile);
            setStats(defaultStats);
          }
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
      setCompletedActivities([]);
      
    } catch (error) {
      console.error('Error cargando datos:', error);
      // Establecer valores mínimos para evitar errores
      setProfile({
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
        streak: 0,
        achievements_unlocked: 0
      });
      setCustomization({ items: [] });
      setCompletedActivities([]);
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

  return (
    <DataContext.Provider value={{
      profile,
      stats,
      customization,
      completedActivities,
      loading,
      refreshData,
      setProfile,
      setStats,
      setCustomization,
      setCompletedActivities,
      updateProfile,
      updateStats
    }}>
      {children}
    </DataContext.Provider>
  );
};