import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';
import { 
  Trophy, Target, Flame, Clock, Calendar, TrendingUp, Activity,
  Brain, Heart, Users, ChevronRight, Star, Zap, Award, CheckCircle,
  PlayCircle, Coffee, Sun, Sparkles, Shield, Gift, Bell,
  BarChart, Timer, Droplets, Plus, Minus, Settings, X, Pause
} from 'lucide-react';

// Importar utilidades del dashboard
import { 
  getWeeklyChallengesForUser, 
  getChallengeProgress, 
  updateChallengeProgress,
  getRecommendedMissions,
  TimerPersistence,
  formatTime
} from '@/lib/dashboardUtils';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, profile, completedMissions, updateMissionProgress } = useData();
  const { toast } = useToast();
  
  const [greeting, setGreeting] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [toolModal, setToolModal] = useState(null);
  const [weeklyChallenges, setWeeklyChallenges] = useState([]);
  const [misionesRecomendadas, setMisionesRecomendadas] = useState([]);
  
  // Estados de herramientas de bienestar
  const [wellnessData, setWellnessData] = useState({
    focus: { 
      active: false, 
      time: 25, 
      breakTime: 5, 
      sessions: 0,
      endTime: null 
    },
    fasting: { 
      active: false, 
      hours: 16, 
      startTime: null, 
      endTime: null,
      targetHours: 16 
    },
    hydration: { 
      glasses: 0, 
      ml: 0, 
      targetMl: 2000, 
      dailyLog: [],
      date: new Date().toDateString()
    }
  });

  // Timer refs
  const focusIntervalRef = useRef(null);
  const fastingIntervalRef = useRef(null);
  const [timers, setTimers] = useState({
    focus: 0,
    fasting: 0
  });

  // ============================================
  // INICIALIZACIÓN Y CARGA DE DATOS
  // ============================================

  useEffect(() => {
    initializeDashboard();
    
    // Cleanup al desmontar
    return () => {
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
      if (fastingIntervalRef.current) clearInterval(fastingIntervalRef.current);
    };
  }, []);

  const initializeDashboard = () => {
    // Saludo
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');

    // Cargar desafíos semanales (solo 2 de 6 pool)
    if (user?.id) {
      const userChallenges = getWeeklyChallengesForUser(user.id);
      const challengesWithProgress = userChallenges.map(challenge => ({
        ...challenge,
        progreso: getChallengeProgress(challenge.id, user.id),
        dias: 7 - Math.floor((Date.now() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))
      }));
      setWeeklyChallenges(challengesWithProgress);
    }

    // Cargar misiones recomendadas (conectadas con missionsData)
    const recommended = getRecommendedMissions();
    setMisionesRecomendadas(recommended);

    // Restaurar timers persistentes
    restoreTimers();

    // Limpiar hidratación diariamente
    checkAndResetHydration();

    // Solicitar permiso de notificaciones
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  // ============================================
  // RESTAURAR TIMERS AL CARGAR PÁGINA
  // ============================================

  const restoreTimers = () => {
    // Restaurar Focus Timer
    const focusData = TimerPersistence.load('focus');
    if (focusData && focusData.endTime && Date.now() < focusData.endTime) {
      const remaining = Math.floor((focusData.endTime - Date.now()) / 1000);
      setTimers(prev => ({ ...prev, focus: remaining }));
      setWellnessData(prev => ({
        ...prev,
        focus: { ...prev.focus, active: true, endTime: focusData.endTime }
      }));
      startFocusInterval();
      
      toast({
        title: "🎯 Sesión de Focus restaurada",
        description: `Tienes ${Math.floor(remaining / 60)} minutos restantes`
      });
    }

    // Restaurar Ayuno
    const fastingData = TimerPersistence.load('fasting');
    if (fastingData && fastingData.active && fastingData.startTime) {
      const endTime = new Date(fastingData.endTime);
      if (Date.now() < endTime.getTime()) {
        setWellnessData(prev => ({
          ...prev,
          fasting: { 
            ...prev.fasting, 
            active: true, 
            startTime: fastingData.startTime,
            endTime: fastingData.endTime,
            targetHours: fastingData.targetHours || 16
          }
        }));
        startFastingInterval();
        
        const elapsed = Math.floor((Date.now() - new Date(fastingData.startTime)) / 1000 / 3600);
        toast({
          title: "🕐 Ayuno en progreso",
          description: `Llevas ${elapsed.toFixed(1)} horas de ayuno`
        });
      } else {
        // El ayuno ya terminó
        TimerPersistence.clear('fasting');
        handleFastingComplete();
      }
    }

    // Restaurar Hidratación
    const hydrationData = localStorage.getItem('hydrationData');
    if (hydrationData) {
      const parsed = JSON.parse(hydrationData);
      if (parsed.date === new Date().toDateString()) {
        setWellnessData(prev => ({
          ...prev,
          hydration: { ...prev.hydration, ...parsed }
        }));
      }
    }

    // Restaurar sesiones de focus completadas hoy
    const focusStats = localStorage.getItem('focusStats');
    if (focusStats) {
      const stats = JSON.parse(focusStats);
      const today = new Date().toDateString();
      if (stats.date === today) {
        setWellnessData(prev => ({
          ...prev,
          focus: { ...prev.focus, sessions: stats.sessions || 0 }
        }));
      } else {
        // Nueva día, resetear
        localStorage.setItem('focusStats', JSON.stringify({ sessions: 0, totalMinutes: 0, date: today }));
      }
    }
  };

  const checkAndResetHydration = () => {
    const lastReset = localStorage.getItem('lastHydrationReset');
    const today = new Date().toDateString();
    if (lastReset !== today) {
      setWellnessData(prev => ({
        ...prev,
        hydration: { 
          glasses: 0, 
          ml: 0, 
          targetMl: prev.hydration.targetMl, 
          dailyLog: [],
          date: today
        }
      }));
      localStorage.setItem('lastHydrationReset', today);
      localStorage.removeItem('hydrationData');
    }
  };

  // ============================================
  // MODO FOCUS (POMODORO) - PERSISTENTE
  // ============================================

  const startFocusTimer = () => {
    const minutes = wellnessData.focus.time;
    const endTime = Date.now() + (minutes * 60 * 1000);
    
    setTimers(prev => ({ ...prev, focus: minutes * 60 }));
    setWellnessData(prev => ({
      ...prev,
      focus: { ...prev.focus, active: true, endTime }
    }));

    // Guardar en persistencia
    TimerPersistence.save('focus', {
      active: true,
      endTime,
      duration: minutes * 60,
      breakTime: wellnessData.focus.breakTime
    });

    startFocusInterval();
    setToolModal(null); // Cerrar modal
    
    toast({
      title: "🎯 Sesión de Focus iniciada",
      description: `${minutes} minutos de concentración profunda`
    });
  };

  const startFocusInterval = () => {
    if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
    
    focusIntervalRef.current = setInterval(() => {
      setTimers(prev => {
        const newFocus = prev.focus - 1;
        
        if (newFocus <= 0) {
          clearInterval(focusIntervalRef.current);
          handleFocusComplete();
          return { ...prev, focus: 0 };
        }
        
        return { ...prev, focus: newFocus };
      });
    }, 1000);
  };

  const handleFocusComplete = () => {
    const today = new Date().toDateString();
    const focusStats = JSON.parse(localStorage.getItem('focusStats') || '{"sessions": 0, "totalMinutes": 0}');
    
    // Verificar si es el mismo día
    if (focusStats.date !== today) {
      focusStats.sessions = 0;
      focusStats.totalMinutes = 0;
      focusStats.date = today;
    }
    
    const newSessions = focusStats.sessions + 1;
    focusStats.sessions = newSessions;
    focusStats.totalMinutes = (focusStats.totalMinutes || 0) + wellnessData.focus.time;
    localStorage.setItem('focusStats', JSON.stringify(focusStats));
    
    setWellnessData(prev => ({
      ...prev,
      focus: { ...prev.focus, active: false, sessions: newSessions, endTime: null }
    }));

    TimerPersistence.clear('focus');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    toast({
      title: "✅ ¡Sesión completada!",
      description: `Tiempo para un descanso de ${wellnessData.focus.breakTime} minutos`,
      duration: 5000
    });

    // Notificación del navegador
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Sesión de Focus completada', {
        body: `Tiempo para un descanso de ${wellnessData.focus.breakTime} minutos`,
        icon: '/favicon.ico'
      });
    }
  };

  const pauseFocusTimer = () => {
    clearInterval(focusIntervalRef.current);
    setWellnessData(prev => ({
      ...prev,
      focus: { ...prev.focus, active: false }
    }));
    TimerPersistence.clear('focus');
    
    toast({
      title: "⏸️ Sesión pausada",
      description: "Puedes reanudarla cuando quieras"
    });
  };

  // ============================================
  // AYUNO INTERMITENTE - PERSISTENTE
  // ============================================

  const startFasting = () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + (wellnessData.fasting.hours * 60 * 60 * 1000));
    
    setWellnessData(prev => ({
      ...prev,
      fasting: { 
        ...prev.fasting, 
        active: true, 
        startTime: now.toISOString(),
        endTime: endTime.toISOString()
      }
    }));
    
    // Persistir
    TimerPersistence.save('fasting', {
      active: true,
      startTime: now.toISOString(),
      endTime: endTime.toISOString(),
      targetHours: wellnessData.fasting.hours
    });

    startFastingInterval();
    setToolModal(null); // Cerrar modal

    // Programar notificación a mitad
    const halfwayTime = wellnessData.fasting.hours / 2 * 60 * 60 * 1000;
    setTimeout(() => {
      if (TimerPersistence.hasActive('fasting')) {
        toast({
          title: "⏰ ¡Mitad del ayuno!",
          description: `Llevas ${wellnessData.fasting.hours / 2} horas. ¡Excelente!`,
          duration: 5000
        });
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Mitad del ayuno alcanzada', {
            body: `Llevas ${wellnessData.fasting.hours / 2} horas de ayuno`,
            icon: '/favicon.ico'
          });
        }
      }
    }, halfwayTime);

    // Programar notificación final
    setTimeout(() => {
      if (TimerPersistence.hasActive('fasting')) {
        handleFastingComplete();
      }
    }, wellnessData.fasting.hours * 60 * 60 * 1000);

    toast({
      title: "🕐 Ayuno iniciado",
      description: `${wellnessData.fasting.hours} horas de ayuno. ¡Adelante!`
    });
  };

  const startFastingInterval = () => {
    if (fastingIntervalRef.current) clearInterval(fastingIntervalRef.current);
    
    fastingIntervalRef.current = setInterval(() => {
      // Solo para actualizar el display, no afecta el timer real
      setTimers(prev => ({ ...prev, fasting: prev.fasting + 1 }));
    }, 60000); // Actualizar cada minuto
  };

  const handleFastingComplete = () => {
    clearInterval(fastingIntervalRef.current);
    
    setWellnessData(prev => ({
      ...prev,
      fasting: { ...prev.fasting, active: false, startTime: null, endTime: null }
    }));

    TimerPersistence.clear('fasting');

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    toast({
      title: "✅ ¡Ayuno completado!",
      description: `Has completado ${wellnessData.fasting.hours} horas de ayuno`,
      duration: 5000
    });

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Ayuno completado', {
        body: `Has completado ${wellnessData.fasting.hours} horas de ayuno`,
        icon: '/favicon.ico'
      });
    }

    // Guardar en historial
    const fastingHistory = JSON.parse(localStorage.getItem('fastingHistory') || '[]');
    fastingHistory.push({
      date: new Date().toISOString(),
      hours: wellnessData.fasting.hours,
      completed: true
    });
    localStorage.setItem('fastingHistory', JSON.stringify(fastingHistory));
  };

  const stopFasting = () => {
    clearInterval(fastingIntervalRef.current);
    setWellnessData(prev => ({
      ...prev,
      fasting: { ...prev.fasting, active: false, startTime: null, endTime: null }
    }));
    TimerPersistence.clear('fasting');
    setTimers(prev => ({ ...prev, fasting: 0 }));
    
    toast({
      title: "⏹️ Ayuno detenido",
      description: "Has detenido tu periodo de ayuno"
    });
  };

  const calculateFastingTime = () => {
    if (!wellnessData.fasting.startTime) return '00:00';
    const start = new Date(wellnessData.fasting.startTime);
    const now = new Date();
    const diff = Math.floor((now - start) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getFastingProgress = () => {
    if (!wellnessData.fasting.startTime) return 0;
    const start = new Date(wellnessData.fasting.startTime);
    const now = new Date();
    const elapsed = (now - start) / 1000 / 3600; // horas
    return Math.min((elapsed / wellnessData.fasting.targetHours) * 100, 100);
  };

  // ============================================
  // HIDRATACIÓN - PERSISTENTE
  // ============================================

  const addWater = (amount) => {
    const newMl = wellnessData.hydration.ml + amount;
    const newGlasses = Math.floor(newMl / 250);
    const today = new Date().toDateString();
    
    const updatedHydration = {
      ml: newMl,
      glasses: newGlasses,
      targetMl: wellnessData.hydration.targetMl,
      dailyLog: [...wellnessData.hydration.dailyLog, { 
        time: new Date().toISOString(), 
        amount 
      }],
      date: today
    };
    
    setWellnessData(prev => ({
      ...prev,
      hydration: updatedHydration
    }));

    // Persistir
    localStorage.setItem('hydrationData', JSON.stringify(updatedHydration));

    // Felicitación si alcanza la meta
    if (newMl >= wellnessData.hydration.targetMl && wellnessData.hydration.ml < wellnessData.hydration.targetMl) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#06B6D4', '#0EA5E9']
      });
      
      toast({
        title: "💧 ¡Meta de hidratación alcanzada!",
        description: "Has bebido suficiente agua hoy",
        duration: 5000
      });
    }

    toast({
      title: `+${amount}ml añadidos`,
      description: `Total: ${newMl}ml / ${wellnessData.hydration.targetMl}ml`,
      duration: 2000
    });
  };

  // ============================================
  // NAVEGACIÓN A MISIONES
  // ============================================

  const handleMissionClick = (mission) => {
    // Navegar a /missions y pasar el ID para abrir automáticamente
    navigate('/missions', { 
      state: { 
        openMissionId: mission.id,
        autoOpen: true
      } 
    });
  };

  // ============================================
  // RENDER - PARTE PRINCIPAL
  // ============================================

  return (
    <>
      <Helmet>
        <title>Dashboard - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Principal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  {greeting === 'Buenos días' && '☀️'}
                  {greeting === 'Buenas tardes' && '🌤️'}
                  {greeting === 'Buenas noches' && '🌙'}
                  ¡{greeting}, {user?.nombre || 'Explorador'}!
                </h1>
                <p className="text-purple-200 mt-2">Tu bienestar está al 85% hoy</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stats?.streak || 3}
                  </motion.div>
                  <p className="text-sm text-purple-200 flex items-center gap-1 justify-center">
                    <Flame className="w-4 h-4" /> días
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    Nivel {stats?.level || 1}
                  </div>
                  <p className="text-sm text-purple-200">nivel</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    {stats?.achievements_unlocked || 1}
                  </div>
                  <p className="text-sm text-purple-200">logros</p>
                </div>
              </div>
            </div>

            {/* Progreso diario */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-purple-200">Progreso diario</span>
                <span className="text-white font-bold">
                  {completedMissions?.length || 2}/5 misiones
                </span>
              </div>
              <Progress value={((completedMissions?.length || 2) / 5) * 100} className="h-3" />
            </div>
          </motion.div>

          {/* Desafíos Semanales - SOLO 2 VISIBLES QUE ROTAN */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    Desafíos Semanales
                  </span>
                  <Badge className="bg-purple-600 text-white">
                    🔄 Rotan cada lunes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {weeklyChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedChallenge(challenge)}
                      className="cursor-pointer"
                    >
                      <Card className={`
                        bg-gradient-to-br ${challenge.color} border-0 hover:shadow-2xl transition-all
                        ${challenge.progreso >= challenge.meta ? 'ring-4 ring-yellow-400' : ''}
                      `}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-6xl">{challenge.emoji}</span>
                            <Badge className="bg-black/30 text-white text-sm font-bold">
                              {challenge.xp} XP
                            </Badge>
                          </div>
                          
                          <h4 className="text-white font-bold text-xl mb-2">{challenge.titulo}</h4>
                          <p className="text-white/90 text-sm mb-4">{challenge.descripcion}</p>
                          
                          <div className="space-y-2">
                            <Progress 
                              value={(challenge.progreso / challenge.meta) * 100} 
                              className="h-3 bg-white/20"
                            />
                            <div className="flex justify-between text-sm text-white/80 font-medium">
                              <span>{challenge.progreso}/{challenge.meta}</span>
                              <span>{challenge.dias} días restantes</span>
                            </div>
                          </div>

                          {challenge.progreso >= challenge.meta && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mt-3 text-center"
                            >
                              <Badge className="bg-yellow-500 text-black font-bold text-sm">
                                ✓ COMPLETADO
                              </Badge>
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-purple-300 text-sm text-center mt-6 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Cada semana te asignamos 2 desafíos personalizados de un pool de 6
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Misiones Recomendadas - CONECTADAS CON MISSIONSPAGE */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Misiones Recomendadas Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {misionesRecomendadas.map((mision, index) => (
                <motion.div
                  key={mision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleMissionClick(mision)}
                  className="cursor-pointer"
                >
                  <Card className={`${mision.bgColor} border-0 hover:shadow-xl transition-all`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{mision.icono}</span>
                        <Badge className="bg-white/20 text-white text-xs">
                          +{mision.experiencia} XP
                        </Badge>
                      </div>
                      <h4 className="text-white font-bold text-sm">{mision.titulo}</h4>
                      <p className="text-white/80 text-xs mt-1">{mision.descripcionCorta}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-white/60" />
                        <span className="text-white/60 text-xs">{mision.duracion} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Herramientas de Bienestar - CON PERSISTENCIA TOTAL */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Herramientas de Bienestar
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {/* Modo Focus */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setToolModal('focus')}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 border-0 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <Timer className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Modo Focus</h4>
                    <p className="text-white/80 text-sm mb-3">Pomodoro persistente</p>
                    {wellnessData.focus.active ? (
                      <div>
                        <div className="text-3xl font-bold text-yellow-400 mb-1">
                          {formatTime(timers.focus)}
                        </div>
                        <Badge className="mt-2 bg-green-500 animate-pulse">
                          ⏱️ En progreso
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <p className="text-white/60 text-xs mb-2">
                          {wellnessData.focus.sessions} sesiones hoy
                        </p>
                        <Button 
                          size="sm" 
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          Iniciar
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Ayuno Intermitente */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setToolModal('fasting')}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Ayuno Intermitente</h4>
                    <p className="text-white/80 text-sm mb-3">Tracker persistente</p>
                    {wellnessData.fasting.active ? (
                      <div>
                        <div className="text-3xl font-bold text-yellow-400 mb-1">
                          {calculateFastingTime()}
                        </div>
                        <Progress 
                          value={getFastingProgress()}
                          className="h-2 mb-2"
                        />
                        <Badge className="mt-1 bg-green-500 animate-pulse">
                          🕐 Activo
                        </Badge>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white"
                      >
                        Configurar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hidratación */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setToolModal('hydration')}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <Droplets className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Hidratación</h4>
                    <p className="text-white/80 text-sm mb-3">Registro persistente</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">
                        {wellnessData.hydration.ml}ml
                      </span>
                    </div>
                    <Progress 
                      value={(wellnessData.hydration.ml / wellnessData.hydration.targetMl) * 100}
                      className="h-2 mb-2"
                    />
                    <p className="text-white/60 text-xs">
                      {wellnessData.hydration.glasses}/8 vasos
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </CardContent>
          </Card>

          {/* Estadísticas del Día */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Estadísticas de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-purple-900/30 rounded-xl border border-purple-500/20"
              >
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">
                  {completedMissions?.length || 2}
                </p>
                <p className="text-xs text-purple-200 mt-1">Misiones Completadas</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-blue-900/30 rounded-xl border border-blue-500/20"
              >
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">
                  {JSON.parse(localStorage.getItem('focusStats') || '{"totalMinutes":0}').totalMinutes || 0}
                </p>
                <p className="text-xs text-blue-200 mt-1">Min. de Focus</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-green-900/30 rounded-xl border border-green-500/20"
              >
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">85%</p>
                <p className="text-xs text-green-200 mt-1">Bienestar General</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/20"
              >
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">
                  {(completedMissions?.length || 2) * 50}
                </p>
                <p className="text-xs text-yellow-200 mt-1">XP Ganado Hoy</p>
              </motion.div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ============================================ */}
      {/* MODALES COMPLETOS */}
      {/* ============================================ */}

      <AnimatePresence>
        {/* Modal Modo Focus */}
        {toolModal === 'focus' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-md w-full border border-purple-500/30 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Timer className="w-6 h-6 text-purple-400" />
                  Modo Focus
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {!wellnessData.focus.active ? (
                  <>
                    <div>
                      <Label className="text-purple-200 text-sm mb-2 block">
                        Tiempo de focus (minutos)
                      </Label>
                      <Select
                        value={wellnessData.focus.time.toString()}
                        onValueChange={(value) => setWellnessData(prev => ({
                          ...prev,
                          focus: { ...prev.focus, time: parseInt(value) }
                        }))}
                      >
                        <SelectTrigger className="bg-purple-900/30 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="20">20 minutos</SelectItem>
                          <SelectItem value="25">25 minutos (Pomodoro)</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="45">45 minutos</SelectItem>
                          <SelectItem value="60">60 minutos</SelectItem>
                          <SelectItem value="90">90 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-purple-200 text-sm mb-2 block">
                        Tiempo de descanso (minutos)
                      </Label>
                      <Select
                        value={wellnessData.focus.breakTime.toString()}
                        onValueChange={(value) => setWellnessData(prev => ({
                          ...prev,
                          focus: { ...prev.focus, breakTime: parseInt(value) }
                        }))}
                      >
                        <SelectTrigger className="bg-purple-900/30 border-purple-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutos</SelectItem>
                          <SelectItem value="10">10 minutos</SelectItem>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="20">20 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                      <p className="text-purple-200 text-sm flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Recibirás una notificación al completar la sesión
                      </p>
                    </div>

                    <Button
                      onClick={startFocusTimer}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
                      size="lg"
                    >
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Iniciar Sesión de {wellnessData.focus.time} min
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center py-8">
                      <p className="text-purple-300 text-sm mb-4">Sesión en progreso</p>
                      <div className="text-6xl font-bold text-white mb-4 font-mono">
                        {formatTime(timers.focus)}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">Modo Focus Activo</span>
                      </div>
                      <Progress 
                        value={((wellnessData.focus.time * 60 - timers.focus) / (wellnessData.focus.time * 60)) * 100}
                        className="h-3 mb-6"
                      />
                      <Button
                        onClick={pauseFocusTimer}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold"
                        size="lg"
                      >
                        <Pause className="w-5 h-5 mr-2" />
                        Pausar Sesión
                      </Button>
                    </div>
                  </>
                )}

                <div className="text-center pt-4 border-t border-purple-500/20">
                  <p className="text-purple-300 text-sm">
                    📊 Sesiones completadas hoy: <span className="font-bold text-white">{wellnessData.focus.sessions}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Ayuno Intermitente */}
        {toolModal === 'fasting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-orange-900/95 to-red-900/95 rounded-2xl p-6 max-w-md w-full border border-orange-500/30 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-400" />
                  Ayuno Intermitente
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {!wellnessData.fasting.active ? (
                  <>
                    <div>
                      <Label className="text-orange-200 text-sm mb-2 block">
                        Protocolo de ayuno
                      </Label>
                      <Select
                        value={wellnessData.fasting.hours.toString()}
                        onValueChange={(value) => setWellnessData(prev => ({
                          ...prev,
                          fasting: { ...prev.fasting, hours: parseInt(value), targetHours: parseInt(value) }
                        }))}
                      >
                        <SelectTrigger className="bg-orange-900/30 border-orange-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12:12 - Principiante (12h ayuno)</SelectItem>
                          <SelectItem value="14">14:10 - Intermedio (14h ayuno)</SelectItem>
                          <SelectItem value="16">16:8 - Estándar (16h ayuno)</SelectItem>
                          <SelectItem value="18">18:6 - Avanzado (18h ayuno)</SelectItem>
                          <SelectItem value="20">20:4 - Guerrero (20h ayuno)</SelectItem>
                          <SelectItem value="24">24h - OMAD (Una comida al día)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/20 space-y-2">
                      <p className="text-orange-200 text-sm font-medium">
                        📝 Beneficios del protocolo {wellnessData.fasting.hours}:{24 - wellnessData.fasting.hours}
                      </p>
                      <ul className="text-orange-300 text-xs space-y-1 list-disc list-inside">
                        <li>Mejora sensibilidad a la insulina</li>
                        <li>Aumenta autofagia celular</li>
                        <li>Optimiza metabolismo</li>
                        <li>Claridad mental aumentada</li>
                      </ul>
                    </div>

                    <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-500/20">
                      <p className="text-orange-200 text-sm flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Notificaciones a mitad y al completar
                      </p>
                    </div>

                    <Button
                      onClick={startFasting}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3"
                      size="lg"
                    >
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Iniciar Ayuno de {wellnessData.fasting.hours}h
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center py-8">
                      <p className="text-orange-300 text-sm mb-2">Tiempo en ayuno</p>
                      <div className="text-6xl font-bold text-white mb-4 font-mono">
                        {calculateFastingTime()}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-orange-400 text-sm">Ayuno Activo</span>
                      </div>
                      
                      <div className="mb-6">
                        <Progress 
                          value={getFastingProgress()}
                          className="h-3 mb-2"
                        />
                        <p className="text-orange-300 text-sm">
                          Meta: {wellnessData.fasting.targetHours} horas
                        </p>
                      </div>

                      <Button
                        onClick={stopFasting}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold mb-2"
                        size="lg"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Detener Ayuno
                      </Button>
                      
                      <p className="text-orange-400 text-xs mt-4">
                        💡 Puedes cerrar este modal, el ayuno continuará
                      </p>
                    </div>
                  </>
                )}

                <div className="text-center pt-4 border-t border-orange-500/20">
                  <p className="text-orange-300 text-sm">
                    ⏱️ El timer persiste aunque cierres la app
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Hidratación */}
        {toolModal === 'hydration' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 rounded-2xl p-6 max-w-md w-full border border-blue-500/30 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  Hidratación
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {wellnessData.hydration.ml}
                    <span className="text-2xl text-blue-300">ml</span>
                  </div>
                  <Progress 
                    value={(wellnessData.hydration.ml / wellnessData.hydration.targetMl) * 100}
                    className="mb-4 h-4"
                  />
                  <p className="text-blue-200 text-sm">
                    Meta diaria: {wellnessData.hydration.targetMl}ml
                  </p>
                </div>

                <div>
                  <Label className="text-blue-200 text-sm mb-2 block">
                    Añadir agua rápidamente:
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[250, 350, 500, 1000].map(amount => (
                      <Button
                        key={amount}
                        onClick={() => addWater(amount)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                        size="sm"
                      >
                        +{amount}ml
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-blue-200 text-sm mb-2 block">
                    Cantidad personalizada:
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="ml"
                      className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400"
                      id="customWater"
                      min="0"
                      max="2000"
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById('customWater');
                        const amount = parseInt(input.value);
                        if (amount > 0 && amount <= 2000) {
                          addWater(amount);
                          input.value = '';
                        } else {
                          toast({
                            title: "Cantidad inválida",
                            description: "Ingresa entre 1 y 2000ml",
                            variant: "destructive"
                          });
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
                  <p className="text-blue-200 text-sm mb-3 font-medium">
                    💧 Registro visual de hoy:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {Array.from({ length: 8 }, (_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-xl
                          ${i < wellnessData.hydration.glasses
                            ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                            : 'bg-blue-900/50 border border-blue-700'}
                        `}
                      >
                        💧
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-blue-200 text-sm mb-2 block">
                    Ajustar meta diaria:
                  </Label>
                  <Select
                    value={wellnessData.hydration.targetMl.toString()}
                    onValueChange={(value) => setWellnessData(prev => ({
                      ...prev,
                      hydration: { ...prev.hydration, targetMl: parseInt(value) }
                    }))}
                  >
                    <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1500">1500 ml (Mínimo)</SelectItem>
                      <SelectItem value="2000">2000 ml (Recomendado)</SelectItem>
                      <SelectItem value="2500">2500 ml (Activo)</SelectItem>
                      <SelectItem value="3000">3000 ml (Muy activo)</SelectItem>
                      <SelectItem value="3500">3500 ml (Atleta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/20">
                  <p className="text-blue-200 text-xs">
                    💡 <span className="font-medium">Tip:</span> Tu registro se guarda automáticamente y se resetea cada día
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Desafío Semanal Detallado */}
        {selectedChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedChallenge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-lg w-full border border-purple-500/30 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-6xl p-4 rounded-2xl bg-gradient-to-br ${selectedChallenge.color} shadow-xl`}>
                  {selectedChallenge.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedChallenge.titulo}
                  </h3>
                  <p className="text-purple-200 text-sm">
                    {selectedChallenge.descripcion}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedChallenge(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-purple-200 font-medium">Progreso</span>
                  <span className="text-white font-bold text-lg">
                    {selectedChallenge.progreso}/{selectedChallenge.meta}
                  </span>
                </div>
                <Progress 
                  value={(selectedChallenge.progreso / selectedChallenge.meta) * 100}
                  className="h-4 mb-2"
                />
                <div className="flex justify-between text-sm text-purple-300">
                  <span>{Math.round((selectedChallenge.progreso / selectedChallenge.meta) * 100)}% completado</span>
                  <span>{selectedChallenge.dias} días restantes</span>
                </div>
              </div>

              {selectedChallenge.tareas && (
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Tareas del desafío:
                  </h4>
                  <div className="space-y-2">
                    {selectedChallenge.tareas.map((tarea, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 bg-purple-800/30 p-3 rounded-lg border border-purple-500/20"
                      >
                        {tarea.completado ? (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-purple-400 flex-shrink-0" />
                        )}
                        <span className={`${tarea.completado ? 'text-green-400 line-through' : 'text-white'} text-sm`}>
                          {tarea.nombre}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedChallenge.recompensas && (
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-yellow-400" />
                    Recompensas al completar:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChallenge.recompensas.map((recompensa, i) => (
                      <Badge 
                        key={i} 
                        className="bg-purple-700 text-white px-3 py-1 text-sm"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {recompensa}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20 mb-4">
                <p className="text-purple-200 text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>
                    Gana <span className="font-bold text-yellow-400">{selectedChallenge.xp} XP</span> al completar
                  </span>
                </p>
              </div>

              <Button
                onClick={() => setSelectedChallenge(null)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                size="lg"
              >
                Entendido
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardPage;