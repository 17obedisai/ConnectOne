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

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, profile, completedMissions, updateMissionProgress } = useData();
  const { toast } = useToast();
  
  const [greeting, setGreeting] = useState('');
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [toolModal, setToolModal] = useState(null);
  const [wellnessData, setWellnessData] = useState({
    focus: { active: false, time: 25, breakTime: 5, sessions: 0 },
    fasting: { active: false, hours: 16, startTime: null, targetHours: 16 },
    hydration: { glasses: 0, ml: 0, targetMl: 2000, dailyLog: [] }
  });

  // Timer refs
  const focusTimerRef = useRef(null);
  const fastingTimerRef = useRef(null);
  const [timers, setTimers] = useState({
    focus: 0,
    fasting: 0
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');

    // Cargar datos guardados
    const savedWellness = localStorage.getItem('wellnessData');
    if (savedWellness) {
      setWellnessData(JSON.parse(savedWellness));
    }

    // Limpiar hidratación diariamente
    const lastReset = localStorage.getItem('lastHydrationReset');
    const today = new Date().toDateString();
    if (lastReset !== today) {
      setWellnessData(prev => ({
        ...prev,
        hydration: { ...prev.hydration, glasses: 0, ml: 0, dailyLog: [] }
      }));
      localStorage.setItem('lastHydrationReset', today);
    }
  }, []);

  // Misiones regulares
  const misionesRecomendadas = [
    { 
      id: 'm1', 
      titulo: 'Meditación Matutina', 
      descripcion: '10 minutos de mindfulness',
      duracion: '10 min', 
      xp: 50, 
      categoria: 'meditacion',
      emoji: '🧘',
      color: 'from-purple-500 to-violet-600',
      instrucciones: 'Encuentra un lugar tranquilo, siéntate cómodamente y sigue la respiración guiada.',
      beneficios: ['Reduce estrés', 'Mejora concentración', 'Aumenta bienestar']
    },
    { 
      id: 'm2', 
      titulo: 'HIIT Express', 
      descripcion: 'Entrenamiento de 7 minutos',
      duracion: '7 min', 
      xp: 100, 
      categoria: 'ejercicio',
      emoji: '⚡',
      color: 'from-orange-500 to-red-600',
      instrucciones: '30 segundos de ejercicio intenso, 10 segundos de descanso. Repite el circuito.',
      beneficios: ['Quema calorías', 'Mejora resistencia', 'Fortalece músculos']
    },
    { 
      id: 'm3', 
      titulo: 'Lectura Reflexiva', 
      descripcion: '20 minutos de lectura',
      duracion: '20 min', 
      xp: 60, 
      categoria: 'desarrollo',
      emoji: '📚',
      color: 'from-blue-500 to-cyan-600',
      instrucciones: 'Lee con atención, toma notas de ideas importantes y reflexiona sobre lo aprendido.',
      beneficios: ['Expande conocimiento', 'Mejora vocabulario', 'Estimula creatividad']
    },
    { 
      id: 'm4', 
      titulo: 'Conexión Social', 
      descripcion: 'Llama a un ser querido',
      duracion: '15 min', 
      xp: 40, 
      categoria: 'social',
      emoji: '💬',
      color: 'from-pink-500 to-rose-600',
      instrucciones: 'Contacta a alguien importante, pregunta cómo está y comparte tu día.',
      beneficios: ['Fortalece vínculos', 'Reduce soledad', 'Aumenta felicidad']
    },
    { 
      id: 'm5', 
      titulo: 'Gratitud Nocturna', 
      descripcion: 'Escribe 3 agradecimientos',
      duracion: '5 min', 
      xp: 30, 
      categoria: 'bienestar',
      emoji: '🙏',
      color: 'from-green-500 to-emerald-600',
      instrucciones: 'Reflexiona sobre tu día y escribe 3 cosas por las que estás agradecido.',
      beneficios: ['Mejora positividad', 'Reduce ansiedad', 'Mejor sueño']
    }
  ];

  // MISIONES SEMANALES (Challenges)
const weeklyChallenges = [
    {
      id: 'w1',
      titulo: 'Maestro del Bienestar',
      descripcion: 'Completa 20 misiones esta semana',
      progreso: 12,
      meta: 20,
      xp: 500,
      dias: 5,
      emoji: '👑',
      color: 'from-yellow-500 to-amber-600',
      recompensas: ['Título especial', 'Skin dorada', '500 XP'],
      tareas: [
        { nombre: 'Meditar 5 días', completado: true },
        { nombre: 'Ejercicio 4 días', completado: true },
        { nombre: 'Lectura diaria', completado: false },
        { nombre: 'Sin pantallas 1h antes de dormir', completado: false }
      ]
    },
    {
      id: 'w2',
      titulo: 'Guerrero Fitness',
      descripcion: 'Acumula 150 minutos de ejercicio',
      progreso: 87,
      meta: 150,
      xp: 400,
      dias: 6,
      emoji: '💪',
      color: 'from-red-500 to-pink-600',
      recompensas: ['Badge atleta', 'Rutinas premium', '400 XP'],
      tareas: [
        { nombre: 'HIIT 3 veces', completado: true },
        { nombre: 'Yoga 2 veces', completado: false },
        { nombre: 'Caminata 10k pasos diarios', completado: false }
      ]
    },
    {
      id: 'w3',
      titulo: 'Mente Zen',
      descripcion: '7 días de meditación consecutivos',
      progreso: 4,
      meta: 7,
      xp: 350,
      dias: 7,
      emoji: '🧘',
      color: 'from-purple-500 to-indigo-600',
      recompensas: ['Modo zen premium', 'Música exclusiva', '350 XP'],
      tareas: [
        { nombre: 'Meditación matutina', completado: true },
        { nombre: 'Respiración consciente', completado: true },
        { nombre: 'Body scan nocturno', completado: false }
      ]
    },
    {
      id: 'w4',
      titulo: 'Explorador Social',
      descripcion: 'Conecta con 10 personas diferentes',
      progreso: 6,
      meta: 10,
      xp: 300,
      dias: 7,
      emoji: '🤝',
      color: 'from-blue-500 to-cyan-600',
      recompensas: ['Badge social', 'Stickers chat', '300 XP'],
      tareas: [
        { nombre: 'Llamadas telefónicas', completado: true },
        { nombre: 'Mensajes positivos', completado: false },
        { nombre: 'Acto de bondad diario', completado: false }
      ]
    },
    {
      id: 'w5',
      titulo: 'Hábitos Dorados',
      descripcion: 'Mantén 5 hábitos durante 7 días',
      progreso: 3,
      meta: 5,
      xp: 450,
      dias: 7,
      emoji: '⭐',
      color: 'from-green-500 to-emerald-600',
      recompensas: ['Corona de hábitos', 'Tracker premium', '450 XP'],
      tareas: [
        { nombre: 'Despertar temprano', completado: true },
        { nombre: 'Hidratación completa', completado: true },
        { nombre: 'Sin azúcar', completado: false },
        { nombre: 'Diario nocturno', completado: false },
        { nombre: 'Estiramiento matutino', completado: false }
      ]
    },
    {
      id: 'w6',
      titulo: 'Transformación Total',
      descripcion: 'Completa todos los desafíos anteriores',
      progreso: 2,
      meta: 5,
      xp: 1000,
      dias: 7,
      emoji: '🏆',
      color: 'from-purple-500 via-pink-500 to-yellow-500',
      recompensas: ['Título legendario', 'Todas las skins', '1000 XP', 'Modo infinito'],
      tareas: [
        { nombre: 'Maestro del Bienestar', completado: false },
        { nombre: 'Guerrero Fitness', completado: false },
        { nombre: 'Mente Zen', completado: false },
        { nombre: 'Explorador Social', completado: false },
        { nombre: 'Hábitos Dorados', completado: false }
      ]
    }
  ];

  // Navegación directa a misión
  const handleMissionClick = (mission) => {
    navigate('/missions', { state: { selectedMission: mission } });
  };

  // HERRAMIENTAS DE BIENESTAR MEJORADAS

  // Modo Focus (Pomodoro)
  const startFocusTimer = () => {
    const minutes = wellnessData.focus.time;
    setTimers(prev => ({ ...prev, focus: minutes * 60 }));
    setWellnessData(prev => ({
      ...prev,
      focus: { ...prev.focus, active: true }
    }));

    focusTimerRef.current = setInterval(() => {
      setTimers(prev => {
        if (prev.focus <= 1) {
          clearInterval(focusTimerRef.current);
          toast({
            title: "¡Sesión completada!",
            description: "Tiempo para un descanso"
          });
          confetti();
          return { ...prev, focus: 0 };
        }
        return { ...prev, focus: prev.focus - 1 };
      });
    }, 1000);
  };

  const pauseFocusTimer = () => {
    clearInterval(focusTimerRef.current);
    setWellnessData(prev => ({
      ...prev,
      focus: { ...prev.focus, active: false }
    }));
  };

  // Ayuno Intermitente
  const startFasting = () => {
    const now = new Date();
    setWellnessData(prev => ({
      ...prev,
      fasting: { ...prev.fasting, active: true, startTime: now.toISOString() }
    }));
    
    localStorage.setItem('fastingStart', now.toISOString());
    
    // Notificación a mitad
    setTimeout(() => {
      toast({
        title: "¡Mitad del ayuno!",
        description: `Llevas ${wellnessData.fasting.hours / 2} horas. ¡Sigue así!`
      });
    }, (wellnessData.fasting.hours / 2) * 60 * 60 * 1000);

    // Notificación final
    setTimeout(() => {
      toast({
        title: "¡Ayuno completado!",
        description: "Has completado tu período de ayuno"
      });
      confetti();
    }, wellnessData.fasting.hours * 60 * 60 * 1000);
  };

  // Hidratación
  const addWater = (amount) => {
    const newMl = wellnessData.hydration.ml + amount;
    const newGlasses = Math.floor(newMl / 250);
    
    setWellnessData(prev => ({
      ...prev,
      hydration: {
        ...prev.hydration,
        ml: newMl,
        glasses: newGlasses,
        dailyLog: [...prev.hydration.dailyLog, { time: new Date().toISOString(), amount }]
      }
    }));

    if (newMl >= wellnessData.hydration.targetMl) {
      toast({
        title: "¡Meta de hidratación alcanzada!",
        description: "Has bebido suficiente agua hoy"
      });
      confetti();
    }

    // Guardar en localStorage
    localStorage.setItem('hydrationData', JSON.stringify({
      ml: newMl,
      glasses: newGlasses,
      date: new Date().toDateString()
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <div className="flex justify-between items-center">
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
                  <p className="text-sm text-purple-200 flex items-center gap-1">
                    <Flame className="w-4 h-4" /> días
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    Nivel {stats?.level || 1}
                  </div>
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

          {/* Desafíos Semanales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    Desafíos Semanales
                  </span>
                  <Badge className="bg-purple-600">
                    {weeklyChallenges.filter(c => c.progreso >= c.meta).length}/{weeklyChallenges.length} completados
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weeklyChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedChallenge(challenge)}
                      className="cursor-pointer"
                    >
                      <Card className={`
                        bg-gradient-to-br ${challenge.color} border-0 hover:shadow-xl transition-all
                        ${challenge.progreso >= challenge.meta ? 'ring-2 ring-yellow-400' : ''}
                      `}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-4xl">{challenge.emoji}</span>
                            <Badge className="bg-black/30 text-white">
                              {challenge.xp} XP
                            </Badge>
                          </div>
                          
                          <h4 className="text-white font-bold mb-1">{challenge.titulo}</h4>
                          <p className="text-white/80 text-sm mb-3">{challenge.descripcion}</p>
                          
                          <div className="space-y-2">
                            <Progress 
                              value={(challenge.progreso / challenge.meta) * 100} 
                              className="h-2 bg-white/20"
                            />
                            <div className="flex justify-between text-xs text-white/70">
                              <span>{challenge.progreso}/{challenge.meta}</span>
                              <span>{challenge.dias} días</span>
                            </div>
                          </div>

                          {challenge.progreso >= challenge.meta && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mt-2 text-center"
                            >
                              <Badge className="bg-yellow-500 text-black">
                                ✓ Completado
                              </Badge>
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Misiones Recomendadas */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Misiones Recomendadas Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misionesRecomendadas.map((mision, index) => (
                <motion.div
                  key={mision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleMissionClick(mision)}
                  className="cursor-pointer"
                >
                  <Card className={`bg-gradient-to-br ${mision.color} border-0 hover:shadow-lg transition-all`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{mision.emoji}</span>
                        <Badge className="bg-white/20 text-white">
                          +{mision.xp} XP
                        </Badge>
                      </div>
                      <h4 className="text-white font-bold">{mision.titulo}</h4>
                      <p className="text-white/80 text-sm mt-1">{mision.descripcion}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Clock className="w-4 h-4 text-white/60" />
                        <span className="text-white/60 text-sm">{mision.duracion}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Herramientas de Bienestar MEJORADAS */}
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
                <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 border-0">
                  <CardContent className="p-4 text-center">
                    <Timer className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Modo Focus</h4>
                    <p className="text-white/80 text-sm mb-3">Pomodoro timer inteligente</p>
                    {wellnessData.focus.active ? (
                      <div className="text-2xl font-bold text-yellow-400">
                        {formatTime(timers.focus)}
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

              {/* Ayuno Intermitente */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setToolModal('fasting')}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Ayuno Intermitente</h4>
                    <p className="text-white/80 text-sm mb-3">Tracker 16:8 y más</p>
                    {wellnessData.fasting.active ? (
                      <div className="text-2xl font-bold text-yellow-400">
                        {calculateFastingTime()}
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
                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0">
                  <CardContent className="p-4 text-center">
                    <Droplets className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-white font-bold mb-2">Hidratación</h4>
                    <p className="text-white/80 text-sm mb-3">Registro de consumo de agua</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-white">
                        {wellnessData.hydration.ml}ml
                      </span>
                      <span className="text-white/60">
                        / {wellnessData.hydration.targetMl}ml
                      </span>
                    </div>
                    <Progress 
                      value={(wellnessData.hydration.ml / wellnessData.hydration.targetMl) * 100}
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </CardContent>
          </Card>

          {/* Estadísticas Mejoradas */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Estadísticas de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-purple-900/30 rounded-lg">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">
                  {completedMissions?.length || 2}
                </p>
                <p className="text-xs text-purple-200">Misiones</p>
              </div>
              
              <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">
                  {wellnessData.focus.sessions * 25}
                </p>
                <p className="text-xs text-blue-200">Min. Focus</p>
              </div>
              
              <div className="text-center p-3 bg-green-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-xs text-green-200">Bienestar</p>
              </div>
              
              <div className="text-center p-3 bg-yellow-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">
                  {(completedMissions?.length || 2) * 50}
                </p>
                <p className="text-xs text-yellow-200">XP Ganado</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* MODALES DE HERRAMIENTAS */}
      <AnimatePresence>
        {/* Modal Modo Focus */}
        {toolModal === 'focus' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Timer className="w-6 h-6" />
                  Modo Focus
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-purple-200">Tiempo de focus (minutos)</Label>
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
                      <SelectItem value="25">25 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-purple-200">Tiempo de descanso (minutos)</Label>
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
                    </SelectContent>
                  </Select>
                </div>

                {wellnessData.focus.active ? (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-4">
                      {formatTime(timers.focus)}
                    </div>
                    <Button
                      onClick={pauseFocusTimer}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={startFocusTimer}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                )}

                <div className="text-center">
                  <p className="text-purple-200 text-sm">
                    Sesiones completadas hoy: {wellnessData.focus.sessions}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-orange-900/95 to-red-900/95 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Ayuno Intermitente
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-orange-200">Tipo de ayuno</Label>
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
                      <SelectItem value="12">12:12 (Principiante)</SelectItem>
                      <SelectItem value="14">14:10 (Intermedio)</SelectItem>
                      <SelectItem value="16">16:8 (Estándar)</SelectItem>
                      <SelectItem value="18">18:6 (Avanzado)</SelectItem>
                      <SelectItem value="20">20:4 (Guerrero)</SelectItem>
                      <SelectItem value="24">24h (OMAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {wellnessData.fasting.active ? (
                  <div className="text-center">
                    <p className="text-orange-200 mb-2">Tiempo en ayuno</p>
                    <div className="text-5xl font-bold text-white mb-4">
                      {calculateFastingTime()}
                    </div>
                    <Progress 
                      value={(parseInt(calculateFastingTime().split(':')[0]) / wellnessData.fasting.targetHours) * 100}
                      className="mb-4"
                    />
                    <Button
                      onClick={() => setWellnessData(prev => ({
                        ...prev,
                        fasting: { ...prev.fasting, active: false, startTime: null }
                      }))}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Detener Ayuno
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={startFasting}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Iniciar Ayuno
                  </Button>
                )}

                <div className="bg-orange-900/30 rounded-lg p-3">
                  <p className="text-orange-200 text-sm">
                    <Bell className="w-4 h-4 inline mr-1" />
                    Recibirás notificaciones a mitad y al finalizar el ayuno
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
            onClick={() => setToolModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Droplets className="w-6 h-6" />
                  Hidratación
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setToolModal(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {wellnessData.hydration.ml} ml
                  </div>
                  <Progress 
                    value={(wellnessData.hydration.ml / wellnessData.hydration.targetMl) * 100}
                    className="mb-4 h-3"
                  />
                  <p className="text-blue-200">
                    Meta diaria: {wellnessData.hydration.targetMl} ml
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[250, 350, 500, 1000].map(amount => (
                    <Button
                      key={amount}
                      onClick={() => addWater(amount)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      +{amount}ml
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Cantidad personalizada (ml)"
                    className="bg-blue-900/30 border-blue-500/30 text-white"
                    id="customWater"
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById('customWater');
                      const amount = parseInt(input.value);
                      if (amount > 0) {
                        addWater(amount);
                        input.value = '';
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-3">
                  <p className="text-blue-200 text-sm mb-2">Registro de hoy:</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          i < wellnessData.hydration.glasses
                            ? 'bg-blue-500'
                            : 'bg-blue-900/50'
                        }`}
                      >
                        💧
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-blue-200">Meta diaria (ml)</Label>
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
                      <SelectItem value="1500">1500 ml</SelectItem>
                      <SelectItem value="2000">2000 ml</SelectItem>
                      <SelectItem value="2500">2500 ml</SelectItem>
                      <SelectItem value="3000">3000 ml</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Desafío Semanal */}
        {selectedChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
            onClick={() => setSelectedChallenge(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-lg w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-5xl p-3 rounded-xl bg-gradient-to-br ${selectedChallenge.color}`}>
                  {selectedChallenge.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{selectedChallenge.titulo}</h3>
                  <p className="text-purple-200">{selectedChallenge.descripcion}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-purple-200">Progreso</span>
                  <span className="text-white font-bold">
                    {selectedChallenge.progreso}/{selectedChallenge.meta}
                  </span>
                </div>
                <Progress 
                  value={(selectedChallenge.progreso / selectedChallenge.meta) * 100}
                  className="h-3"
                />
              </div>

              <div className="mb-4">
                <h4 className="text-white font-bold mb-2">Tareas:</h4>
                <div className="space-y-2">
                  {selectedChallenge.tareas.map((tarea, i) => (
                    <div key={i} className="flex items-center gap-2 bg-purple-800/30 p-2 rounded-lg">
                      {tarea.completado ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-purple-400" />
                      )}
                      <span className={tarea.completado ? 'text-green-400 line-through' : 'text-white'}>
                        {tarea.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-bold mb-2">Recompensas:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChallenge.recompensas.map((recompensa, i) => (
                    <Badge key={i} className="bg-purple-700">
                      <Gift className="w-3 h-3 mr-1" />
                      {recompensa}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setSelectedChallenge(null)}
                className="w-full"
              >
                Cerrar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardPage;