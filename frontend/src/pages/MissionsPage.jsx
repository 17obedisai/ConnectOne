import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Clock, Award, TrendingUp, BookOpen, Brain, Dumbbell, 
  Heart, Users, Coffee, Moon, Star, CheckCircle, PlayCircle, 
  Target, Calendar, Timer, Camera, FileText, Mic, Sparkles,
  Zap, Mountain, Shield, Flame, Trophy, ChevronRight, Info,
  BarChart, Lock, Gift, Volume2, Eye, Filter, Grid, List,
  Sunrise, Wind, Cloud, TreePine, Flower2, Bird, Activity,
  Palette, Music, Smile, AlertCircle, RefreshCw, ArrowUp,
  X, Pause, BookMarked, Layers, GitBranch, Hash, AlertTriangle,
  ChevronDown, ChevronUp, Navigation, Beaker, GraduationCap
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import confetti from 'canvas-confetti';

import { 
  transformativeMissions, 
  missionCategories, 
  saveMissionProgress, 
  getRecommendedMissions 
} from './missionsData';

const TIMER_STORAGE_KEY = 'mission_active_timers';
const TIMER_CHECK_INTERVAL = 1000;

const saveTimersToStorage = (timers) => {
  try {
    const dataToSave = {};
    Object.entries(timers).forEach(([missionId, timer]) => {
      dataToSave[missionId] = { ...timer, savedAt: Date.now() };
    });
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};

const loadTimersFromStorage = () => {
  try {
    const saved = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!saved) return {};
    
    const timers = JSON.parse(saved);
    const now = Date.now();
    const restoredTimers = {};
    
    Object.entries(timers).forEach(([missionId, timer]) => {
      if (timer.isPaused) {
        restoredTimers[missionId] = timer;
      } else {
        const elapsed = now - timer.savedAt;
        const newRemaining = timer.remaining - elapsed;
        if (newRemaining > 0) {
          restoredTimers[missionId] = {
            ...timer,
            remaining: newRemaining,
            startTime: timer.startTime
          };
        }
      }
    });
    return restoredTimers;
  } catch (error) {
    console.error('Error loading timers:', error);
    return {};
  }
};

const clearTimersFromStorage = () => {
  localStorage.removeItem(TIMER_STORAGE_KEY);
};
const MissionsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { stats, updateMissionProgress } = useData();
  
  // Estados principales
  const [selectedMission, setSelectedMission] = useState(null);
  const [activeTab, setActiveTab] = useState('recomendadas');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todas');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('impacto');
  const [difficulty, setDifficulty] = useState('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  
  // Estados de progreso
  const [missionProgress, setMissionProgress] = useState({});
  const [activeMissions, setActiveMissions] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [favoriteMissions, setFavoriteMissions] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  
  // Estados de timer
  const [activeTimers, setActiveTimers] = useState({});
  const [pausedMissions, setPausedMissions] = useState({});
  const [sessionNotes, setSessionNotes] = useState({});
  
  // Estado expandido
  const [expandedSections, setExpandedSections] = useState({
    instrucciones: true,
    beneficios: true,
    ciencia: false,
    recursos: false
  });

  useEffect(() => {
    loadPersistedData();
    calculateDailyProgress();
    setRecommendedMissionsForTime();
    
    const autoSaveInterval = setInterval(() => {
      saveAllProgress();
    }, 30000);
    
    window.addEventListener('beforeunload', saveAllProgress);
    
    return () => {
      clearInterval(autoSaveInterval);
      window.removeEventListener('beforeunload', saveAllProgress);
      saveAllProgress();
    };
  }, []);

  const loadPersistedData = () => {
    try {
      const savedProgress = localStorage.getItem('missionProgress');
      if (savedProgress) setMissionProgress(JSON.parse(savedProgress));
      
      const savedActive = localStorage.getItem('activeMissions');
      if (savedActive) setActiveMissions(JSON.parse(savedActive));
      
      const savedFavorites = localStorage.getItem('favoriteMissions');
      if (savedFavorites) setFavoriteMissions(JSON.parse(savedFavorites));
      
      const savedPaused = localStorage.getItem('pausedMissions');
      if (savedPaused) setPausedMissions(JSON.parse(savedPaused));
      
      const savedNotes = localStorage.getItem('sessionNotes');
      if (savedNotes) setSessionNotes(JSON.parse(savedNotes));
      
      const savedStats = localStorage.getItem('userStats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        setDailyStreak(stats.streak || 0);
        setTotalXP(stats.totalXP || 0);
        setUserLevel(calculateLevel(stats.totalXP || 0));
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  };

  const saveAllProgress = useCallback(() => {
    try {
      localStorage.setItem('missionProgress', JSON.stringify(missionProgress));
      localStorage.setItem('activeMissions', JSON.stringify(activeMissions));
      localStorage.setItem('favoriteMissions', JSON.stringify(favoriteMissions));
      localStorage.setItem('pausedMissions', JSON.stringify(pausedMissions));
      localStorage.setItem('sessionNotes', JSON.stringify(sessionNotes));
      localStorage.setItem('userStats', JSON.stringify({
        streak: dailyStreak,
        totalXP,
        level: userLevel,
        lastActive: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [missionProgress, activeMissions, favoriteMissions, pausedMissions, sessionNotes, dailyStreak, totalXP, userLevel]);

  const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForNextLevel = (level) => Math.pow(level, 2) * 100;

  const calculateDailyProgress = () => {
    const today = new Date().toDateString();
    const todayCompleted = Object.entries(missionProgress)
      .filter(([_, progress]) => {
        const progressDate = new Date(progress.lastCompleted).toDateString();
        return progressDate === today;
      })
      .map(([missionId]) => missionId);
    setCompletedToday(todayCompleted);
  };

  const setRecommendedMissionsForTime = () => {
    const recommended = getRecommendedMissions(
      { level: userLevel, completedMissions: Object.keys(missionProgress) },
      Object.keys(missionProgress)
    );
    const recommendedMissions = transformativeMissions
      .filter(m => recommended.includes(m.id))
      .slice(0, 5);
    setActiveMissions(recommendedMissions);
  }; const handleStartMission = (mission) => {
    const missionId = mission.id;
    
    if (activeTimers[missionId]) {
      toast({
        title: "Misión ya en progreso",
        description: "Continúa con tu sesión actual o pausala primero",
        variant: "warning"
      });
      return;
    }
    
    const newTimer = {
      missionId,
      startTime: Date.now(),
      duration: mission.duracion * 60 * 1000,
      remaining: mission.duracion * 60 * 1000,
      isPaused: false
    };
    
    setActiveTimers(prev => ({ ...prev, [missionId]: newTimer }));
    startTimer(missionId, newTimer.remaining);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8B5CF6', '#EC4899', '#10B981']
    });
    
    toast({
      title: "🚀 ¡Misión Iniciada!",
      description: (
        <div className="space-y-2">
          <p className="font-bold text-base md:text-lg">{mission.titulo}</p>
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {mission.duracion} min
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
              +{mission.experiencia} XP
            </span>
          </div>
        </div>
      ),
      duration: 5000
    });
    
    saveAllProgress();
  };

  const startTimer = (missionId, duration) => {
    const intervalId = setInterval(() => {
      setActiveTimers(prev => {
        const timer = prev[missionId];
        if (!timer || timer.isPaused) {
          clearInterval(intervalId);
          return prev;
        }
        
        const newRemaining = timer.remaining - 1000;
        
        if (newRemaining <= 0) {
          clearInterval(intervalId);
          handleTimerComplete(missionId);
          return { ...prev, [missionId]: { ...timer, remaining: 0 } };
        }
        
        return { ...prev, [missionId]: { ...timer, remaining: newRemaining } };
      });
    }, 1000);
  };

  const handlePauseMission = (missionId) => {
    setActiveTimers(prev => ({
      ...prev,
      [missionId]: { ...prev[missionId], isPaused: true }
    }));
    
    setPausedMissions(prev => ({
      ...prev,
      [missionId]: {
        pausedAt: Date.now(),
        remaining: activeTimers[missionId].remaining
      }
    }));
    
    toast({
      title: "⏸️ Misión Pausada",
      description: "Puedes retomarla cuando quieras",
      action: (
        <Button size="sm" onClick={() => handleResumeMission(missionId)}>
          Reanudar
        </Button>
      )
    });
    
    saveAllProgress();
  };

  const handleResumeMission = (missionId) => {
    const pausedMission = pausedMissions[missionId];
    if (!pausedMission) return;
    
    setActiveTimers(prev => ({
      ...prev,
      [missionId]: {
        ...prev[missionId],
        isPaused: false,
        remaining: pausedMission.remaining
      }
    }));
    
    setPausedMissions(prev => {
      const { [missionId]: _, ...rest } = prev;
      return rest;
    });
    
    startTimer(missionId, pausedMission.remaining);
    
    toast({
      title: "▶️ Misión Reanudada",
      description: "Continúa donde lo dejaste"
    });
  };

  const handleTimerComplete = (missionId) => {
    const mission = transformativeMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    if (typeof window !== 'undefined' && window.Audio) {
      const audio = new Audio('/sounds/complete.mp3');
      audio.play().catch(() => {});
    }
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Misión Completada!', {
        body: `Has completado ${mission.titulo} y ganado ${mission.experiencia} XP`,
        icon: '/icon-192x192.png'
      });
    }
    
    handleCompleteMission(mission);
  };

  const handleCompleteMission = (mission) => {
    const missionId = mission.id;
    
    const newProgress = {
      completed: true,
      lastCompleted: new Date().toISOString(),
      completions: (missionProgress[missionId]?.completions || 0) + 1,
      totalTime: (missionProgress[missionId]?.totalTime || 0) + mission.duracion,
      notes: sessionNotes[missionId] || '',
      rating: 5
    };
    
    setMissionProgress(prev => ({
      ...prev,
      [missionId]: newProgress
    }));
    
    const newTotalXP = totalXP + mission.experiencia;
    setTotalXP(newTotalXP);
    
    const newLevel = calculateLevel(newTotalXP);
    if (newLevel > userLevel) {
      handleLevelUp(newLevel);
    }
    setUserLevel(newLevel);
    
    updateStreak();
    
    setActiveTimers(prev => {
      const { [missionId]: _, ...rest } = prev;
      return rest;
    });
    
    const duration = 3000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    toast({
      title: "🎉 ¡MISIÓN COMPLETADA!",
      description: (
        <div className="space-y-2 md:space-y-3">
          <p className="font-bold text-lg md:text-xl">{mission.titulo}</p>
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <span className="font-bold">+{mission.experiencia} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              <span>Racha: {dailyStreak + 1} días</span>
            </div>
          </div>
          <Progress 
            value={(newTotalXP % xpForNextLevel(newLevel)) / xpForNextLevel(newLevel) * 100} 
            className="h-2"
          />
        </div>
      ),
      duration: 8000,
      className: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500"
    });
    
    saveMissionProgress(missionId, newProgress);
    saveAllProgress();
    setCompletedToday(prev => [...prev, missionId]);
  };

  const handleLevelUp = (newLevel) => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    });
    
    toast({
      title: "🎊 ¡SUBISTE DE NIVEL!",
      description: (
        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-bold">Nivel {newLevel}</p>
          <p className="text-sm md:text-base">Has desbloqueado nuevas misiones y recompensas</p>
        </div>
      ),
      duration: 10000,
      className: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500"
    });
  };

  const updateStreak = () => {
    const lastActive = localStorage.getItem('lastActiveDate');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastActive === yesterday || lastActive === today) {
      setDailyStreak(prev => prev + (lastActive === today ? 0 : 1));
    } else {
      setDailyStreak(1);
    }
    
    localStorage.setItem('lastActiveDate', today);
  };

  const filteredAndSortedMissions = useMemo(() => {
    let filtered = [...transformativeMissions];
    
    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.descripcionCorta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.contenido.descripcionCompleta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory !== 'todas') {
      filtered = filtered.filter(m => m.categoria === activeCategory);
    }
    
    if (difficulty !== 'all') {
      filtered = filtered.filter(m => m.dificultad === difficulty);
    }
    
    if (showOnlyAvailable) {
      filtered = filtered.filter(m => !completedToday.includes(m.id));
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'impacto':
          return b.impactoVida - a.impactoVida;
        case 'duracion':
          return a.duracion - b.duracion;
        case 'xp':
          return b.experiencia - a.experiencia;
        case 'prioridad':
          return a.prioridad - b.prioridad;
        case 'dificultad':
          const diffOrder = { 'principiante': 1, 'intermedio': 2, 'avanzado': 3 };
          return diffOrder[a.dificultad] - diffOrder[b.dificultad];
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [searchTerm, activeCategory, difficulty, showOnlyAvailable, sortBy, completedToday]);

  const getMissionsForTab = (tab) => {
    switch (tab) {
      case 'recomendadas':
        const recommendedIds = getRecommendedMissions(
          { level: userLevel, completedMissions: Object.keys(missionProgress) },
          Object.keys(missionProgress)
        );
        return filteredAndSortedMissions.filter(m => recommendedIds.includes(m.id));
        
      case 'activas':
        return filteredAndSortedMissions.filter(m => 
          Object.keys(activeTimers).includes(m.id) || 
          Object.keys(pausedMissions).includes(m.id)
        );
        
      case 'favoritas':
        return filteredAndSortedMissions.filter(m => favoriteMissions.includes(m.id));
        
      case 'completadas':
        return filteredAndSortedMissions.filter(m => completedToday.includes(m.id));
        
      case 'todas':
      default:
        return filteredAndSortedMissions;
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatTimeRemaining = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const renderMissionCard = (mission) => {
    const isCompleted = completedToday.includes(mission.id);
    const isFavorite = favoriteMissions.includes(mission.id);
    const isActive = Object.keys(activeTimers).includes(mission.id);
    const isPaused = Object.keys(pausedMissions).includes(mission.id);
    const progress = missionProgress[mission.id];
    
    return (
      <motion.div
        key={mission.id}
        layout
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        <Card 
          className={`
            ${mission.bgColor} border-2 backdrop-blur-lg 
            hover:shadow-2xl transition-all group cursor-pointer
            ${isCompleted ? 'border-green-400 opacity-90' : 'border-purple-500/50'}
            ${isActive ? 'ring-2 md:ring-4 ring-yellow-400 animate-pulse' : ''}
            ${isPaused ? 'ring-2 ring-orange-400' : ''}
            relative overflow-hidden min-h-[280px] md:min-h-[320px]
          `}
          onClick={() => setSelectedMission(mission)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Indicadores de estado */}
          <div className="absolute top-2 right-2 flex gap-1 md:gap-2 z-10">
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500 text-white p-1.5 md:p-2 rounded-full"
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            )}
            
            {isActive && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="bg-yellow-500 text-white p-1.5 md:p-2 rounded-full"
              >
                <Timer className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            )}
            
            {isPaused && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-orange-500 text-white p-1.5 md:p-2 rounded-full"
              >
                <Pause className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            )}
          </div>

          <CardHeader className="relative z-10 pb-2 p-3 md:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <motion.div 
                  className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur
                    flex items-center justify-center text-xl md:text-2xl shadow-xl flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {mission.icono}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-sm md:text-base font-bold line-clamp-2">
                    {mission.titulo}
                  </CardTitle>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    <Badge className="bg-white/20 text-white border-white/30 text-[10px] md:text-xs px-1.5 py-0.5">
                      {mission.dificultad}
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30 text-[10px] md:text-xs px-1.5 py-0.5">
                      {mission.impactoVida}%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFavorite) {
                    setFavoriteMissions(prev => prev.filter(id => id !== mission.id));
                  } else {
                    setFavoriteMissions(prev => [...prev, mission.id]);
                  }
                }}
                className="text-white/50 hover:text-yellow-400 transition-colors flex-shrink-0"
              >
                <Star className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              </motion.button>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-2 md:space-y-3 p-3 md:p-4 pt-0">
            <p className="text-white/90 text-xs md:text-sm line-clamp-2">
              {mission.descripcionCorta}
            </p>
            
            {/* Estadísticas compactas */}
            <div className="grid grid-cols-3 gap-1">
              <div className="bg-white/10 rounded-lg p-1 md:p-1.5 text-center">
                <Clock className="w-3 h-3 text-white/70 mx-auto mb-0.5" />
                <p className="text-white text-[10px] md:text-xs font-semibold">{mission.duracion}m</p>
              </div>
              <div className="bg-white/10 rounded-lg p-1 md:p-1.5 text-center">
                <Zap className="w-3 h-3 text-yellow-400 mx-auto mb-0.5" />
                <p className="text-white text-[10px] md:text-xs font-semibold">+{mission.experiencia}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-1 md:p-1.5 text-center">
                <Trophy className="w-3 h-3 text-white/70 mx-auto mb-0.5" />
                <p className="text-white text-[10px] md:text-xs font-semibold">{progress?.completions || 0}</p>
              </div>
            </div>

            {/* Beneficios clave - Ocultar en móvil pequeño */}
            <div className="space-y-1 hidden sm:block">
              <p className="text-white/70 text-xs font-medium">Beneficios clave:</p>
              <div className="flex flex-wrap gap-1">
                {mission.contenido.beneficios.inmediatos.slice(0, 2).map((beneficio, i) => (
                  <span key={i} className="text-[10px] md:text-xs bg-white/10 text-white/80 px-1.5 md:px-2 py-0.5 rounded-full line-clamp-1">
                    {beneficio.icono} {beneficio.texto.split(' ').slice(0, 3).join(' ')}...
                  </span>
                ))}
              </div>
            </div>
            
            {/* Timer si está activo */}
            {isActive && activeTimers[mission.id] && (
              <div className="bg-black/20 rounded-lg p-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">En progreso</span>
                  <span className="text-yellow-400 font-bold text-sm md:text-base">
                    {formatTimeRemaining(activeTimers[mission.id].remaining)}
                  </span>
                </div>
                <Progress 
                  value={(1 - activeTimers[mission.id].remaining / (mission.duracion * 60 * 1000)) * 100} 
                  className="h-1 mt-1"
                />
              </div>
            )}
            
            {/* Botones de acción */}
            <div className="flex gap-1.5 md:gap-2 pt-1">
              {isActive ? (
                <>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePauseMission(mission.id);
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-[10px] md:text-xs h-8 md:h-9"
                  >
                    <Pause className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Pausar</span>
                    <span className="sm:hidden">⏸️</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteMission(mission);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] md:text-xs h-8 md:h-9"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Completar</span>
                    <span className="sm:hidden">✓</span>
                  </Button>
                </>
              ) : isPaused ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResumeMission(mission.id);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs h-8 md:h-9"
                >
                  <PlayCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Reanudar</span>
                  <span className="sm:hidden">▶️</span>
                </Button>
              ) : isCompleted ? (
                <Button
                  size="sm"
                  className="flex-1 bg-green-600/80 text-white cursor-default text-[10px] md:text-xs h-8 md:h-9"
                  disabled
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Completada hoy</span>
                  <span className="sm:hidden">✓ Hoy</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartMission(mission);
                  }}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 text-[10px] md:text-xs h-8 md:h-9"
                >
                  <PlayCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Iniciar</span>
                  <span className="sm:hidden">▶️</span>
                </Button>
              )}
              
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMission(mission);
                }}
                className="text-white hover:bg-white/20 px-2 h-8 md:h-9"
              >
                <Info className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </CardContent>

          {/* Indicador de progreso */}
          {isActive && activeTimers[mission.id] && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 - activeTimers[mission.id].remaining / (mission.duracion * 60 * 1000) }}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </Card>
      </motion.div>
    );
  };
  return (
    <>
      <Helmet>
        <title>Centro de Misiones Transformadoras - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 md:p-4">
        {/* Partículas de fondo animadas */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
              animate={{
                x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 relative z-10">
          
          {/* Header con estadísticas mejoradas */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/60 to-indigo-800/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-purple-500/30 shadow-2xl"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex-1">
                <motion.h1 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Misiones Transformadoras
                </motion.h1>
                <p className="text-xs md:text-sm lg:text-base text-purple-200">
                  Hábitos científicamente validados para elevar tu vida
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <span className="text-white font-bold text-sm md:text-base">Nivel {userLevel}</span>
                  </div>
                  <Progress 
                    value={(totalXP % xpForNextLevel(userLevel)) / xpForNextLevel(userLevel) * 100} 
                    className="h-2 w-24 md:w-32"
                  />
                  <span className="text-purple-200 text-xs md:text-sm">
                    {totalXP % xpForNextLevel(userLevel)} / {xpForNextLevel(userLevel)} XP
                  </span>
                </div>
              </div>
              
              {/* Stats Grid - Responsive */}
              <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
                <motion.div 
                  className="text-center bg-purple-900/30 rounded-xl p-2 md:p-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.p 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {completedToday.length}
                  </motion.p>
                  <p className="text-[10px] md:text-xs text-purple-200">Hoy</p>
                </motion.div>
                <motion.div 
                  className="text-center bg-purple-900/30 rounded-xl p-2 md:p-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.p 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    {dailyStreak}
                  </motion.p>
                  <p className="text-[10px] md:text-xs text-purple-200">Racha</p>
                </motion.div>
                <motion.div 
                  className="text-center bg-purple-900/30 rounded-xl p-2 md:p-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.p 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    {totalXP}
                  </motion.p>
                  <p className="text-[10px] md:text-xs text-purple-200">XP Total</p>
                </motion.div>
                <motion.div 
                  className="text-center bg-purple-900/30 rounded-xl p-2 md:p-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.p 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    {Object.keys(missionProgress).length}
                  </motion.p>
                  <p className="text-[10px] md:text-xs text-purple-200">Total</p>
                </motion.div>
              </div>
            </div>
            
            {/* Barra de búsqueda mejorada */}
            <motion.div 
              className="mt-4 md:mt-6 relative"
              whileHover={{ scale: 1.01 }}
            >
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4 md:w-5 md:h-5" />
              <Input
                placeholder="Buscar misiones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 pr-10 md:pr-4 py-2 md:py-3 bg-purple-900/30 border-purple-500/30 text-white placeholder:text-purple-300 rounded-full text-sm md:text-base"
              />
              {searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
                </motion.button>
              )}
            </motion.div>

            {/* Controles de filtrado y vista */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 mt-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 md:px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-white rounded-lg text-xs md:text-sm"
              >
                <option value="impacto">Mayor Impacto</option>
                <option value="prioridad">Prioridad</option>
                <option value="duracion">Duración</option>
                <option value="xp">Mayor XP</option>
                <option value="dificultad">Dificultad</option>
              </select>
              
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-3 md:px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-white rounded-lg text-xs md:text-sm"
              >
                <option value="all">Todas</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>

              <label className="flex items-center gap-2 text-purple-200 text-xs md:text-sm px-2">
                <Checkbox
                  checked={showOnlyAvailable}
                  onCheckedChange={setShowOnlyAvailable}
                  className="border-purple-400"
                />
                <span className="hidden sm:inline">Solo disponibles</span>
                <span className="sm:hidden">Disponibles</span>
              </label>

              <div className="ml-auto flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="bg-purple-700 hover:bg-purple-600 h-8 md:h-9 px-2 md:px-3"
                >
                  <Grid className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="bg-purple-700 hover:bg-purple-600 h-8 md:h-9 px-2 md:px-3"
                >
                  <List className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>

            {/* Barra de progreso diario mejorada */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-200 text-xs md:text-sm font-medium">Meta Diaria</span>
                <span className="text-white font-bold text-xs md:text-sm">{completedToday.length}/5</span>
              </div>
              <div className="relative h-2 md:h-3 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((completedToday.length / 5) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              {completedToday.length >= 3 && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-yellow-400 text-xs md:text-sm mt-2 flex items-center gap-1"
                >
                  <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                  ¡Excelente progreso!
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Categorías mejoradas con scroll horizontal */}
          <motion.div 
            className="flex gap-2 md:gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-purple-600 snap-x snap-mandatory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory('todas')}
              className={`
                relative px-3 md:px-4 py-1.5 md:py-2 rounded-2xl flex items-center gap-1.5 md:gap-2 transition-all min-w-fit snap-start
                ${activeCategory === 'todas' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl' 
                  : 'bg-purple-800/40 text-purple-200 hover:bg-purple-800/60 border border-purple-600/30'}
              `}
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-medium">Todas</span>
              <Badge className="bg-white/20 text-[10px] md:text-xs px-1.5 py-0.5">{transformativeMissions.length}</Badge>
            </motion.button>
            
            {missionCategories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative px-3 md:px-4 py-1.5 md:py-2 rounded-2xl flex items-center gap-1.5 md:gap-2 transition-all min-w-fit snap-start
                  ${activeCategory === cat.id 
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-xl` 
                    : 'bg-purple-800/40 text-purple-200 hover:bg-purple-800/60 border border-purple-600/30'}
                `}
              >
                <span className="text-base md:text-lg">{cat.icono}</span>
                <span className="text-xs md:text-sm font-medium">{cat.nombre}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Tabs de navegación - Responsive */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-1 bg-purple-900/30 p-1">
              <TabsTrigger value="recomendadas" className="text-[10px] md:text-xs lg:text-sm">
                <span className="hidden sm:inline">Recomendadas</span>
                <span className="sm:hidden">⭐</span>
              </TabsTrigger>
              <TabsTrigger value="activas" className="text-[10px] md:text-xs lg:text-sm">
                <span className="hidden sm:inline">En Progreso</span>
                <span className="sm:hidden">🎯</span>
              </TabsTrigger>
              <TabsTrigger value="favoritas" className="hidden sm:block text-[10px] md:text-xs lg:text-sm">
                Favoritas
              </TabsTrigger>
              <TabsTrigger value="completadas" className="hidden sm:block text-[10px] md:text-xs lg:text-sm">
                Completadas
              </TabsTrigger>
              <TabsTrigger value="todas" className="text-[10px] md:text-xs lg:text-sm">
                <span className="hidden sm:inline">Todas</span>
                <span className="sm:hidden">📋</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 md:mt-6">
              {/* Grid de misiones responsive */}
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'flex flex-col gap-3 md:gap-4'}
              `}>
                <AnimatePresence mode="popLayout">
                  {getMissionsForTab(activeTab).map((mission) => renderMissionCard(mission))}
                </AnimatePresence>
              </div>

              {/* Mensaje si no hay misiones */}
              {getMissionsForTab(activeTab).length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 md:py-12"
                >
                  <div className="text-4xl md:text-6xl mb-4">
                    {activeTab === 'favoritas' ? '⭐' : 
                    activeTab === 'activas' ? '🎯' :
                    activeTab === 'completadas' ? '✅' : '🔍'}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {activeTab === 'favoritas' ? 'No tienes favoritas aún' :
                    activeTab === 'activas' ? 'No hay misiones en progreso' :
                    activeTab === 'completadas' ? 'No has completado misiones hoy' :
                    'No se encontraron misiones'}
                  </h3>
                  <p className="text-sm md:text-base text-purple-200 mb-4">
                    {activeTab === 'favoritas' ? 'Marca misiones con la estrella' :
                    activeTab === 'activas' ? 'Inicia una misión para verla aquí' :
                    activeTab === 'completadas' ? '¡Es hora de comenzar!' :
                    'Intenta ajustar los filtros'}
                  </p>
                  {activeTab === 'todas' && (
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('todas');
                        setDifficulty('all');
                        setShowOnlyAvailable(false);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
          {/* Modal de detalle de misión ultra-completo y responsive */}
          <AnimatePresence>
            {selectedMission && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedMission(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl md:rounded-3xl 
                    max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] shadow-2xl border border-purple-500/30 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Container con scroll */}
                  <div className="overflow-y-auto h-full max-h-[95vh] md:max-h-[90vh]">
                    
                    {/* Header del modal - STICKY */}
                    <div className="sticky top-0 z-20 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-transparent backdrop-blur-xl border-b border-purple-500/20 p-3 md:p-6">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-3xl md:text-4xl lg:text-5xl flex-shrink-0"
                          >
                            {selectedMission.icono}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white line-clamp-2">
                              {selectedMission.titulo}
                            </h2>
                            <p className="text-xs md:text-sm lg:text-base text-purple-200 mt-1 line-clamp-2">
                              {selectedMission.descripcionCorta}
                            </p>
                            <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
                              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px] md:text-xs">
                                <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                                {selectedMission.duracion} min
                              </Badge>
                              <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30 text-[10px] md:text-xs">
                                <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                                +{selectedMission.experiencia} XP
                              </Badge>
                              <Badge className={`
                                text-[10px] md:text-xs
                                ${selectedMission.dificultad === 'principiante' ? 'bg-green-600/20 text-green-300 border-green-500/30' :
                                  selectedMission.dificultad === 'intermedio' ? 'bg-orange-600/20 text-orange-300 border-orange-500/30' :
                                  'bg-red-600/20 text-red-300 border-red-500/30'}
                              `}>
                                {selectedMission.dificultad === 'principiante' ? '🟢' :
                                 selectedMission.dificultad === 'intermedio' ? '🟡' : '🔴'} 
                                {selectedMission.dificultad}
                              </Badge>
                              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-[10px] md:text-xs">
                                <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                                {selectedMission.impactoVida}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedMission(null)}
                          className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                        >
                          <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>

                    {/* Contenido con padding */}
                    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
                      
                      {/* Descripción completa */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                      >
                        <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          Descripción Completa
                        </h3>
                        <p className="text-purple-100 leading-relaxed text-sm md:text-base">
                          {selectedMission.contenido.descripcionCompleta}
                        </p>
                      </motion.div>

                      {/* Base Científica - Expandible */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                      >
                        <button
                          onClick={() => toggleSection('ciencia')}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                            <Beaker className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                            {selectedMission.contenido.ciencia.titulo}
                          </h3>
                          {expandedSections.ciencia ? 
                            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-purple-400" /> : 
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          }
                        </button>
                        
                        <AnimatePresence>
                          {expandedSections.ciencia && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 md:mt-4 space-y-3">
                                <div>
                                  <h4 className="text-purple-300 font-medium mb-2 text-sm md:text-base">Estudios Científicos:</h4>
                                  <ul className="space-y-2">
                                    {selectedMission.contenido.ciencia.estudios.map((estudio, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                        className="flex items-start gap-2 text-purple-200 text-xs md:text-sm"
                                      >
                                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>{estudio}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {selectedMission.contenido.ciencia.mecanismos && (
                                  <div>
                                    <h4 className="text-purple-300 font-medium mb-2 text-sm md:text-base">Mecanismos de Acción:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {selectedMission.contenido.ciencia.mecanismos.map((mecanismo, i) => (
                                        <div key={i} className="bg-purple-900/30 rounded-lg p-2 md:p-3">
                                          <p className="text-purple-200 text-xs md:text-sm">{mecanismo}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Instrucciones Detalladas */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                      >
                        <h3 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                          <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          Protocolo Paso a Paso
                        </h3>
                        
                        <div className="space-y-3 md:space-y-4">
                          {selectedMission.contenido.instrucciones.map((instruccion, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="flex gap-2 md:gap-4"
                            >
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                                  {instruccion.paso}
                                </div>
                              </div>
                              <div className="flex-1 space-y-1 md:space-y-2">
                                <div>
                                  <h4 className="text-white font-semibold text-sm md:text-base">
                                    {instruccion.titulo}
                                  </h4>
                                  <p className="text-purple-200 text-xs md:text-sm">
                                    {instruccion.descripcion}
                                  </p>
                                </div>
                                
                                {instruccion.detalles && (
                                  <p className="text-purple-300 text-xs md:text-sm italic">
                                    {instruccion.detalles}
                                  </p>
                                )}
                                
                                <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs">
                                  <span className="text-purple-400 flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                    {instruccion.duracion}
                                  </span>
                                  <span className="text-purple-400">
                                    {instruccion.icono}
                                  </span>
                                </div>
                                
                                {instruccion.tips && instruccion.tips.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {instruccion.tips.map((tip, j) => (
                                      <span key={j} className="text-[10px] md:text-xs bg-purple-800/30 text-purple-200 px-2 py-1 rounded-full">
                                        {tip}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Beneficios Detallados */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                      >
                        <h3 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          Beneficios Comprobados
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <h4 className="text-purple-300 font-semibold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                              Beneficios Inmediatos
                            </h4>
                            <div className="space-y-2 md:space-y-3">
                              {selectedMission.contenido.beneficios.inmediatos.map((beneficio, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + i * 0.05 }}
                                  className="flex items-start gap-2 md:gap-3 bg-purple-900/30 rounded-lg p-2 md:p-3"
                                >
                                  <span className="text-xl md:text-2xl">{beneficio.icono}</span>
                                  <div>
                                    <p className="text-white font-medium text-xs md:text-sm">{beneficio.texto}</p>
                                    <p className="text-purple-300 text-[10px] md:text-xs mt-1">{beneficio.detalle}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-purple-300 font-semibold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                              Beneficios a Largo Plazo
                            </h4>
                            <div className="space-y-2 md:space-y-3">
                              {selectedMission.contenido.beneficios.largoplazo.map((beneficio, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.7 + i * 0.05 }}
                                  className="flex items-start gap-2 md:gap-3 bg-purple-900/30 rounded-lg p-2 md:p-3"
                                >
                                  <span className="text-xl md:text-2xl">{beneficio.icono}</span>
                                  <div>
                                    <p className="text-white font-medium text-xs md:text-sm">{beneficio.texto}</p>
                                    <p className="text-purple-300 text-[10px] md:text-xs mt-1">{beneficio.detalle}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Recursos Adicionales - Expandible */}
                      {selectedMission.contenido.recursosAdicionales && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                        >
                          <button
                            onClick={() => toggleSection('recursos')}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <h3 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                              <BookMarked className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                              Recursos y Referencias
                            </h3>
                            {expandedSections.recursos ? 
                              <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-purple-400" /> : 
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                            }
                          </button>
                          
                          <AnimatePresence>
                            {expandedSections.recursos && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
                                  {selectedMission.contenido.recursosAdicionales.libros && (
                                    <div>
                                      <h4 className="text-purple-300 font-medium mb-2 flex items-center gap-2 text-sm md:text-base">
                                        <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                                        Libros Recomendados
                                      </h4>
                                      <div className="space-y-1">
                                        {selectedMission.contenido.recursosAdicionales.libros.map((libro, i) => (
                                          <p key={i} className="text-purple-200 text-xs md:text-sm pl-4 md:pl-6">• {libro}</p>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {selectedMission.contenido.recursosAdicionales.apps && (
                                    <div>
                                      <h4 className="text-purple-300 font-medium mb-2 flex items-center gap-2 text-sm md:text-base">
                                        <Camera className="w-3 h-3 md:w-4 md:h-4" />
                                        Apps Útiles
                                      </h4>
                                      <div className="space-y-1">
                                        {selectedMission.contenido.recursosAdicionales.apps.map((app, i) => (
                                          <p key={i} className="text-purple-200 text-xs md:text-sm pl-4 md:pl-6">• {app}</p>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {selectedMission.contenido.recursosAdicionales.herramientas && (
                                    <div>
                                      <h4 className="text-purple-300 font-medium mb-2 flex items-center gap-2 text-sm md:text-base">
                                        <Shield className="w-3 h-3 md:w-4 md:h-4" />
                                        Herramientas
                                      </h4>
                                      <div className="space-y-1">
                                        {selectedMission.contenido.recursosAdicionales.herramientas.map((tool, i) => (
                                          <p key={i} className="text-purple-200 text-xs md:text-sm pl-4 md:pl-6">• {tool}</p>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      {/* Notas importantes */}
                      {selectedMission.contenido.notas && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-yellow-500/20"
                        >
                          <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                            Nota Importante
                          </h3>
                          <p className="text-yellow-100 text-xs md:text-sm lg:text-base">
                            {selectedMission.contenido.notas}
                          </p>
                        </motion.div>
                      )}

                      {/* Campo para notas personales */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="bg-purple-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur border border-purple-500/20"
                      >
                        <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          Tus Notas de Sesión
                        </h3>
                        <textarea
                          placeholder="Registra tus reflexiones..."
                          value={sessionNotes[selectedMission.id] || ''}
                          onChange={(e) => setSessionNotes(prev => ({
                            ...prev,
                            [selectedMission.id]: e.target.value
                          }))}
                          className="w-full h-20 md:h-24 bg-purple-900/30 border border-purple-500/30 rounded-lg p-2 md:p-3 text-white placeholder:text-purple-400 resize-none text-xs md:text-sm"
                        />
                        <p className="text-purple-400 text-[10px] md:text-xs mt-2">
                          Las notas se guardan automáticamente
                        </p>
                      </motion.div>
                      {/* Botones de acción principales */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col sm:flex-row gap-2 md:gap-4"
                      >
                        {Object.keys(activeTimers).includes(selectedMission.id) ? (
                          <>
                            <Button
                              size="lg"
                              onClick={() => {
                                handlePauseMission(selectedMission.id);
                                setSelectedMission(null);
                              }}
                              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm md:text-lg py-4 md:py-6"
                            >
                              <Pause className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Pausar Misión
                            </Button>
                            <Button
                              size="lg"
                              onClick={() => {
                                handleCompleteMission(selectedMission);
                                setSelectedMission(null);
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-sm md:text-lg py-4 md:py-6"
                            >
                              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Marcar Completada
                            </Button>
                          </>
                        ) : Object.keys(pausedMissions).includes(selectedMission.id) ? (
                          <Button
                            size="lg"
                            onClick={() => {
                              handleResumeMission(selectedMission.id);
                              setSelectedMission(null);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-lg py-4 md:py-6"
                          >
                            <PlayCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                            Reanudar Misión
                          </Button>
                        ) : completedToday.includes(selectedMission.id) ? (
                          <Button
                            size="lg"
                            disabled
                            className="flex-1 bg-green-600/50 text-white font-bold text-sm md:text-lg py-4 md:py-6 cursor-not-allowed"
                          >
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                            Completada Hoy
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            onClick={() => {
                              handleStartMission(selectedMission);
                              setSelectedMission(null);
                            }}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm md:text-lg py-4 md:py-6"
                          >
                            <PlayCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                            Comenzar Misión
                          </Button>
                        )}
                        
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => setSelectedMission(null)}
                          className="border-purple-500/30 text-purple-300 hover:bg-purple-900/30 py-4 md:py-6 text-sm md:text-base"
                        >
                          Cerrar
                        </Button>
                      </motion.div>

                      {/* Estadísticas de esta misión */}
                      {missionProgress[selectedMission.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.3 }}
                          className="bg-purple-900/20 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur border border-purple-500/20"
                        >
                          <h4 className="text-purple-300 font-medium mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <BarChart className="w-3 h-3 md:w-4 md:h-4" />
                            Tu Progreso en esta Misión
                          </h4>
                          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                            <div>
                              <p className="text-xl md:text-2xl font-bold text-white">
                                {missionProgress[selectedMission.id].completions || 0}
                              </p>
                              <p className="text-[10px] md:text-xs text-purple-400">Completada</p>
                            </div>
                            <div>
                              <p className="text-xl md:text-2xl font-bold text-white">
                                {missionProgress[selectedMission.id].totalTime || 0}
                              </p>
                              <p className="text-[10px] md:text-xs text-purple-400">Min. totales</p>
                            </div>
                            <div>
                              <p className="text-xl md:text-2xl font-bold text-white">
                                {((missionProgress[selectedMission.id].completions || 0) * selectedMission.experiencia)}
                              </p>
                              <p className="text-[10px] md:text-xs text-purple-400">XP ganado</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timers flotantes para misiones activas - RESPONSIVE */}
          <AnimatePresence>
            {Object.keys(activeTimers).length > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 100 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: 100 }}
                className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-40 space-y-2 md:space-y-3 max-w-[calc(100vw-24px)] sm:max-w-sm"
              >
                {Object.entries(activeTimers).map(([missionId, timer]) => {
                  const mission = transformativeMissions.find(m => m.id === missionId);
                  if (!mission || timer.isPaused) return null;
                  
                  return (
                    <motion.div
                      key={missionId}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 border-2 border-yellow-400/50 shadow-2xl">
                        <CardContent className="p-3 md:p-4">
                          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                            <motion.div 
                              className="text-2xl md:text-3xl flex-shrink-0"
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                scale: { duration: 1, repeat: Infinity }
                              }}
                            >
                              {mission.icono}
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-xs md:text-sm truncate">{mission.titulo}</p>
                              <p className="text-yellow-400 text-[10px] md:text-xs">En progreso...</p>
                            </div>
                          </div>
                          
                          <div className="mb-2 md:mb-3">
                            <div className="flex justify-between text-white text-[10px] md:text-xs mb-1">
                              <span>Tiempo restante</span>
                              <span className="font-bold text-yellow-400 text-xs md:text-sm">
                                {formatTimeRemaining(timer.remaining)}
                              </span>
                            </div>
                            <Progress 
                              value={(1 - timer.remaining / (mission.duracion * 60 * 1000)) * 100} 
                              className="h-1 md:h-2 bg-purple-800"
                            />
                          </div>

                          <div className="flex gap-1.5 md:gap-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePauseMission(missionId);
                              }}
                              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-[10px] md:text-xs h-8 md:h-9"
                            >
                              <Pause className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Pausar</span>
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteMission(mission);
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] md:text-xs h-8 md:h-9"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Completar</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de misiones pausadas - RESPONSIVE */}
          {Object.keys(pausedMissions).length > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-40"
            >
              <Card className="bg-orange-900/90 border-orange-500/50">
                <CardContent className="p-2 md:p-3">
                  <div className="flex items-center gap-1.5 md:gap-2 text-white">
                    <Pause className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                    <span className="text-xs md:text-sm font-medium">
                      {Object.keys(pausedMissions).length} 
                      <span className="hidden sm:inline"> misión{Object.keys(pausedMissions).length > 1 ? 'es' : ''} pausada{Object.keys(pausedMissions).length > 1 ? 's' : ''}</span>
                      <span className="sm:hidden"> ⏸️</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Botón flotante de scroll to top */}
          <AnimatePresence>
            {typeof window !== 'undefined' && window.scrollY > 200 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-20 md:bottom-24 right-3 md:right-6 z-30 bg-purple-600 hover:bg-purple-700 text-white p-2.5 md:p-3 rounded-full shadow-lg"
              >
                <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Notificación de logros - RESPONSIVE */}
          <AnimatePresence>
            {dailyStreak > 0 && dailyStreak % 7 === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                className="fixed top-16 md:top-20 right-3 md:right-6 z-50 max-w-[calc(100vw-24px)] sm:max-w-sm"
              >
                <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-200 flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-sm md:text-base">¡Racha de {dailyStreak} días!</p>
                        <p className="text-yellow-100 text-xs md:text-sm">Eres imparable 🔥</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default MissionsPage;