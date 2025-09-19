import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, Target, Flame, Clock, Calendar, TrendingUp, Activity,
  Brain, Heart, Users, ChevronRight, Star, Zap, Award, CheckCircle,
  PlayCircle, Coffee, Moon, Sun, Sparkles, Shield, Gift, Bell,
  BarChart, Dumbbell, Book, Headphones, Timer, Battery, Droplets,
  Wind, MapPin, Settings, ArrowRight, Pause, RefreshCw,
  Crown, User // AGREGADOS: Crown y User que faltaban
} from 'lucide-react';
import { useData } from '@/contexts/DataContext'; // Ruta correcta
import { useAuth } from '@/contexts/AuthContext'; // Ruta correcta
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { profile, stats = {}, loading } = useData();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Estados mejorados
  const [celebrating, setCelebrating] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  const [todayProgress, setTodayProgress] = useState(0);
  const [fastingActive, setFastingActive] = useState(false);
  const [fastingTime, setFastingTime] = useState(0);
  const [focusActive, setFocusActive] = useState(false);
  const [focusTime, setFocusTime] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  
  // Misiones personalizadas basadas en el perfil del usuario
  const personalizedMissions = [
    {
      id: 'm1',
      titulo: 'Meditación Matutina',
      descripcion: '10 minutos de mindfulness',
      categoria: 'meditacion',
      duracion: 10,
      xp: 50,
      icono: '🧘',
      color: 'from-purple-500 to-indigo-600',
      prioridad: 1,
      hora_ideal: 'mañana'
    },
    {
      id: 'm2',
      titulo: 'HIIT Express',
      descripcion: 'Entrenamiento de 7 minutos',
      categoria: 'ejercicio',
      duracion: 7,
      xp: 100,
      icono: '⚡',
      color: 'from-red-500 to-orange-600',
      prioridad: 2,
      hora_ideal: 'cualquiera'
    },
    {
      id: 'm3',
      titulo: 'Lectura Reflexiva',
      descripcion: '20 minutos de lectura',
      categoria: 'desarrollo',
      duracion: 20,
      xp: 60,
      icono: '📚',
      color: 'from-green-500 to-teal-600',
      prioridad: 3,
      hora_ideal: 'noche'
    },
    {
      id: 'm4',
      titulo: 'Conexión Social',
      descripcion: 'Llama a un ser querido',
      categoria: 'social',
      duracion: 15,
      xp: 40,
      icono: '💬',
      color: 'from-blue-500 to-cyan-600',
      prioridad: 4,
      hora_ideal: 'tarde'
    },
    {
      id: 'm5',
      titulo: 'Gratitud Nocturna',
      descripcion: 'Escribe 3 agradecimientos',
      categoria: 'mindfulness',
      duracion: 5,
      xp: 30,
      icono: '🙏',
      color: 'from-yellow-500 to-amber-600',
      prioridad: 5,
      hora_ideal: 'noche'
    }
  ];

  // Retos semanales dinámicos
  const weeklyChallenge = {
    id: 'wc1',
    nombre: 'Semana de Bienestar Total',
    descripcion: 'Completa 20 misiones esta semana',
    progreso: stats?.weeklyMissions || 12,
    meta: 20,
    premio: 500,
    diasRestantes: 3,
    participantes: 1247,
    tuPosicion: 89
  };

  // Estadísticas reales
  const realStats = {
    misionsToday: stats?.missionsCompletedToday || 2,
    minutesActive: stats?.minutesActiveToday || 45,
    focusTime: stats?.focusTimeToday || 25,
    wellbeingScore: stats?.wellbeingScore || 85,
    caloriesBurned: stats?.caloriesBurnedToday || 320,
    mindfulMinutes: stats?.mindfulMinutesToday || 15
  };

  // Herramientas interactivas
  const tools = [
    {
      id: 'focus',
      nombre: 'Modo Focus',
      descripcion: 'Pomodoro timer inteligente',
      icono: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600',
      activo: focusActive
    },
    {
      id: 'fasting',
      nombre: 'Ayuno Intermitente',
      descripcion: 'Tracker 16:8',
      icono: <Clock className="w-6 h-6" />,
      color: 'from-green-500 to-teal-600',
      activo: fastingActive
    },
    {
      id: 'water',
      nombre: 'Hidratación',
      descripcion: `${waterIntake}/8 vasos`,
      icono: <Droplets className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      progreso: (waterIntake / 8) * 100
    },
    {
      id: 'breathing',
      nombre: 'Respiración',
      descripcion: 'Ejercicio 4-7-8',
      icono: <Wind className="w-6 h-6" />,
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 'sleep',
      nombre: 'Sueño',
      descripcion: 'Análisis y mejora',
      icono: <Moon className="w-6 h-6" />,
      color: 'from-indigo-600 to-purple-700'
    },
    {
      id: 'nutrition',
      nombre: 'Nutrición',
      descripcion: 'Registro de comidas',
      icono: <Coffee className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = profile?.nombre?.split(' ')[0] || user?.nombre || 'Campeón';
    
    if (hour < 12) return { saludo: '¡Buenos días', nombre: name, emoji: '☀️' };
    if (hour < 18) return { saludo: '¡Buenas tardes', nombre: name, emoji: '🌤️' };
    return { saludo: '¡Buenas noches', nombre: name, emoji: '🌙' };
  };

  const greeting = getGreeting();

  // Efectos para timers
  useEffect(() => {
    let interval;
    if (fastingActive) {
      interval = setInterval(() => {
        setFastingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fastingActive]);

  useEffect(() => {
    let interval;
    if (focusActive) {
      interval = setInterval(() => {
        setFocusTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [focusActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMissionStart = (mission) => {
    setSelectedMission(mission);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    toast({
      title: "¡Misión iniciada!",
      description: `${mission.titulo} - ${mission.duracion} minutos`
    });
    
    // Navegar a la página de misiones con la misión seleccionada
    setTimeout(() => {
      navigate('/missions', { state: { selectedMission: mission.id } });
    }, 1000);
  };

  const handleToolClick = (tool) => {
    switch(tool.id) {
      case 'focus':
        setFocusActive(!focusActive);
        if (!focusActive) {
          toast({
            title: "Modo Focus activado",
            description: "¡Concéntrate durante 25 minutos!"
          });
        }
        break;
      case 'fasting':
        setFastingActive(!fastingActive);
        if (!fastingActive) {
          setFastingTime(0);
          toast({
            title: "Ayuno iniciado",
            description: "Meta: 16 horas"
          });
        }
        break;
      case 'water':
        if (waterIntake < 8) {
          setWaterIntake(waterIntake + 1);
          toast({
            title: `${waterIntake + 1}/8 vasos`,
            description: waterIntake === 7 ? "¡Meta alcanzada! 🎉" : "Sigue así"
          });
        }
        break;
      case 'breathing':
        navigate('/missions', { state: { filter: 'respiracion' } });
        break;
      case 'sleep':
        setActiveWidget('sleep');
        break;
      case 'nutrition':
        setActiveWidget('nutrition');
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-12 h-12 text-purple-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - ConnectONE</title>
      </Helmet>
      
      {celebrating && <confetti recycle={false} numberOfPieces={200} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Principal Mejorado */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {greeting.emoji}
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    {greeting.saludo}, {greeting.nombre}!
                  </h1>
                  <p className="text-purple-200 mt-1">
                    Tu bienestar está al {realStats.wellbeingScore}% hoy
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">{stats?.streak || 0} días</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-medium">Nivel {stats?.level || 1}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">{stats?.achievements || 0} logros</span>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-200 hover:bg-purple-800/30"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => navigate('/missions')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Ver Todas las Misiones
                </Button>
              </div>
            </div>

            {/* Barra de progreso diario */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-purple-200 text-sm">Progreso diario</span>
                <span className="text-white font-bold">
                  {realStats.misionsToday}/5 misiones
                </span>
              </div>
              <Progress 
                value={(realStats.misionsToday / 5) * 100} 
                className="h-3 bg-purple-950"
              />
            </motion.div>
          </motion.div>

          {/* Reto Semanal Destacado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur rounded-2xl p-6 border border-yellow-500/30 cursor-pointer"
            onClick={() => navigate('/challenges')}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {weeklyChallenge.nombre}
                    <Badge className="bg-yellow-500/20 text-yellow-300">
                      ACTIVO
                    </Badge>
                  </h3>
                  <p className="text-purple-200 text-sm mt-1">{weeklyChallenge.descripcion}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-purple-300">
                      👥 {weeklyChallenge.participantes} participantes
                    </span>
                    <span className="text-purple-300">
                      🏆 Posición #{weeklyChallenge.tuPosicion}
                    </span>
                    <span className="text-yellow-400 font-medium">
                      {weeklyChallenge.diasRestantes} días restantes
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="text-right mb-2">
                  <span className="text-2xl font-bold text-white">
                    {weeklyChallenge.progreso}/{weeklyChallenge.meta}
                  </span>
                  <p className="text-xs text-purple-300">+{weeklyChallenge.premio} XP al completar</p>
                </div>
                <Progress 
                  value={(weeklyChallenge.progreso / weeklyChallenge.meta) * 100}
                  className="w-full md:w-32 h-2"
                />
              </div>
            </div>
          </motion.div>

          {/* Grid Principal: Misiones y Estadísticas */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Columna Izquierda: Misiones del Día */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      Misiones Recomendadas Hoy
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-purple-300 hover:text-white"
                      onClick={() => navigate('/missions')}
                    >
                      Ver todas
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {personalizedMissions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="bg-purple-900/30 rounded-lg p-4 cursor-pointer border border-purple-500/20 hover:border-purple-500/40 transition-all"
                      onClick={() => handleMissionStart(mission)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mission.color} flex items-center justify-center text-2xl`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {mission.icono}
                          </motion.div>
                          <div>
                            <h4 className="text-white font-semibold">{mission.titulo}</h4>
                            <p className="text-purple-300 text-sm">{mission.descripcion}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-purple-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {mission.duracion} min
                              </span>
                              <span className="text-xs text-yellow-400 flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                +{mission.xp} XP
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <PlayCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Herramientas Grid */}
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Herramientas de Bienestar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card 
                          className={`
                            cursor-pointer transition-all
                            ${tool.activo 
                              ? 'bg-gradient-to-br ' + tool.color + ' border-white/30' 
                              : 'bg-purple-900/30 border-purple-500/20 hover:border-purple-500/40'}
                          `}
                          onClick={() => handleToolClick(tool)}
                        >
                          <CardContent className="p-4 text-center">
                            <motion.div 
                              className={`mx-auto mb-2 ${tool.activo ? 'text-white' : 'text-purple-400'}`}
                              animate={tool.activo ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {tool.icono}
                            </motion.div>
                            <p className={`font-medium text-sm ${tool.activo ? 'text-white' : 'text-white'}`}>
                              {tool.nombre}
                            </p>
                            <p className={`text-xs mt-1 ${tool.activo ? 'text-white/80' : 'text-purple-300'}`}>
                              {tool.descripcion}
                            </p>
                            {tool.progreso !== undefined && (
                              <Progress value={tool.progreso} className="h-1 mt-2" />
                            )}
                            {tool.id === 'focus' && focusActive && (
                              <p className="text-xs text-white font-mono mt-1">
                                {formatTime(focusTime)}
                              </p>
                            )}
                            {tool.id === 'fasting' && fastingActive && (
                              <p className="text-xs text-white font-mono mt-1">
                                {formatTime(fastingTime)}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Estadísticas y Progreso */}
            <div className="space-y-6">
              {/* Estadísticas en Vivo */}
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Estadísticas de Hoy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      label: 'Minutos Activos', 
                      value: realStats.minutesActive, 
                      max: 60, 
                      icon: <Activity className="w-4 h-4" />,
                      color: 'text-green-400'
                    },
                    { 
                      label: 'Tiempo Focus', 
                      value: realStats.focusTime, 
                      max: 90, 
                      icon: <Brain className="w-4 h-4" />,
                      color: 'text-purple-400'
                    },
                    { 
                      label: 'Mindfulness', 
                      value: realStats.mindfulMinutes, 
                      max: 30, 
                      icon: <Heart className="w-4 h-4" />,
                      color: 'text-pink-400'
                    },
                    { 
                      label: 'Calorías', 
                      value: realStats.caloriesBurned, 
                      max: 500, 
                      icon: <Flame className="w-4 h-4" />,
                      color: 'text-orange-400'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200 text-sm flex items-center gap-2">
                          <span className={stat.color}>{stat.icon}</span>
                          {stat.label}
                        </span>
                        <span className="text-white font-bold">
                          {stat.value}/{stat.max}
                        </span>
                      </div>
                      <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Widget de Próximo Nivel */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/levels')}
              >
                <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-purple-200 text-sm">Nivel Actual</p>
                        <p className="text-3xl font-bold text-white">{stats?.level || 1}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                      >
                        <Crown className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-300">Progreso al nivel {(stats?.level || 1) + 1}</span>
                        <span className="text-white font-medium">
                          {stats?.xp || 0} / {stats?.xpToNext || 1000} XP
                        </span>
                      </div>
                      <Progress 
                        value={((stats?.xp || 0) / (stats?.xpToNext || 1000)) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Accesos Rápidos */}
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Accesos Rápidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: 'Ver Logros', icon: <Trophy className="w-4 h-4" />, path: '/achievements' },
                    { label: 'Mapa de Progreso', icon: <MapPin className="w-4 h-4" />, path: '/map' },
                    { label: 'Mi Perfil', icon: <User className="w-4 h-4" />, path: '/profile' },
                    { label: 'Configuración', icon: <Settings className="w-4 h-4" />, path: '/settings' }
                  ].map(link => (
                    <Button
                      key={link.path}
                      variant="ghost"
                      className="w-full justify-start text-purple-200 hover:text-white hover:bg-purple-800/30"
                      onClick={() => navigate(link.path)}
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;