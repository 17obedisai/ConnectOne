import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Lock, CheckCircle, Star, Trophy, Sparkles, 
  ChevronLeft, ChevronRight, Zap, Heart, Brain, Gift,
  Crown, Shield, Gem, Award, Target, Flame, Clock,
  Calendar, Users, Activity, Mountain, Sunrise, Moon,
  Wind, Cloud, Sun, TreePine, Flower2, Bird
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import confetti from 'canvas-confetti';

const ProgressMapPage = () => {
  const { stats } = useData();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const currentLevel = stats?.level || 1;
  const userPandaSkin = localStorage.getItem('userPandaSkin') || 1;
  const pandaImage = `/images/panda-level-${userPandaSkin}.png`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 16 NIVELES con posiciones curvas para crear un camino serpenteante
  const levels = [
    { 
      id: 1, name: 'El Despertar', 
      x: 15, y: 85,
      icon: <Sunrise className="w-6 h-6" />, 
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      description: 'Tu viaje de transformación comienza aquí',
      rewards: ['Primera misión desbloqueada', 'Avatar básico de panda', '+50 XP inicial'],
      stats: { xpRequired: 0, missionsRequired: 0 },
      milestone: false,
      theme: 'dawn'
    },
    { 
      id: 2, name: 'Primeros Pasos', 
      x: 30, y: 78,
      icon: <Activity className="w-6 h-6" />, 
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      description: 'Aprendiendo a establecer rutinas básicas',
      rewards: ['+100 XP', 'Badge "Iniciado"', 'Misiones de meditación'],
      stats: { xpRequired: 100, missionsRequired: 3 },
      milestone: false,
      theme: 'water'
    },
    { 
      id: 3, name: 'Valle de la Constancia', 
      x: 45, y: 72,
      icon: <Mountain className="w-6 h-6" />, 
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      description: 'La disciplina se convierte en hábito',
      rewards: ['Modo focus activado', 'Meditación guiada', 'Tracker de hábitos'],
      stats: { xpRequired: 300, missionsRequired: 7 },
      milestone: false,
      theme: 'nature'
    },
    { 
      id: 4, name: 'Río de la Meditación', 
      x: 35, y: 62,
      icon: <Brain className="w-6 h-6" />, 
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      description: 'Encuentra paz interior y claridad mental',
      rewards: ['Sonidos ambientales', 'Timer Pomodoro', 'Respiración guiada'],
      stats: { xpRequired: 500, missionsRequired: 12 },
      milestone: false,
      theme: 'water'
    },
    { 
      id: 5, name: 'Bosque del Conocimiento', 
      x: 50, y: 55,
      icon: <TreePine className="w-6 h-6" />, 
      color: 'from-green-500 to-lime-500',
      bgColor: 'bg-gradient-to-br from-green-600/30 to-lime-500/30',
      description: '¡HITO! Has dominado los fundamentos',
      rewards: ['Biblioteca de contenido', 'Skin especial: Panda Sabio', 'Título: Aprendiz'],
      stats: { xpRequired: 800, missionsRequired: 20 },
      milestone: true,
      theme: 'forest'
    },
    { 
      id: 6, name: 'Montaña del Desafío', 
      x: 65, y: 48,
      icon: <Zap className="w-6 h-6" />, 
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-500/20 to-gray-600/20',
      description: 'Supera tus límites personales',
      rewards: ['Rutinas avanzadas', 'Badge "Escalador"', 'Desafíos semanales'],
      stats: { xpRequired: 1200, missionsRequired: 30 },
      milestone: false,
      theme: 'mountain'
    },
    { 
      id: 7, name: 'Jardín de la Gratitud', 
      x: 55, y: 40,
      icon: <Flower2 className="w-6 h-6" />, 
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
      description: 'Cultiva la felicidad y el agradecimiento',
      rewards: ['Diario de gratitud', 'Tracker emocional', 'Meditación de amor'],
      stats: { xpRequired: 1600, missionsRequired: 40 },
      milestone: false,
      theme: 'garden'
    },
    { 
      id: 8, name: 'Templo del Equilibrio', 
      x: 70, y: 35,
      icon: <Shield className="w-6 h-6" />, 
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
      description: 'Balance perfecto entre cuerpo y mente',
      rewards: ['Modo zen maestro', 'Personalización total', 'Coach AI personal'],
      stats: { xpRequired: 2000, missionsRequired: 50 },
      milestone: false,
      theme: 'temple'
    },
    { 
      id: 9, name: 'Ciudad del Mentor', 
      x: 60, y: 28,
      icon: <Users className="w-6 h-6" />, 
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
      description: 'Comparte tu sabiduría con otros',
      rewards: ['Modo mentor activado', 'Acceso a comunidad VIP', 'Badge "Guía"'],
      stats: { xpRequired: 2500, missionsRequired: 65 },
      milestone: false,
      theme: 'city'
    },
    { 
      id: 10, name: 'Reino Dorado', 
      x: 75, y: 22,
      icon: <Crown className="w-6 h-6" />, 
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-gradient-to-br from-yellow-500/30 to-amber-600/30',
      description: '¡HITO ÉPICO! Has alcanzado la maestría',
      rewards: ['Corona dorada permanente', 'Título: Maestro del Bienestar', 'Todas las skins doradas'],
      stats: { xpRequired: 3000, missionsRequired: 80 },
      milestone: true,
      theme: 'golden'
    },
    { 
      id: 11, name: 'Puente del Arcoíris', 
      x: 65, y: 18,
      icon: <Bird className="w-6 h-6" />, 
      color: 'from-purple-400 via-pink-400 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-cyan-400/20',
      description: 'Conexión universal con todo ser viviente',
      rewards: ['Efectos visuales únicos', 'Temas personalizados', 'Música exclusiva'],
      stats: { xpRequired: 3500, missionsRequired: 95 },
      milestone: false,
      theme: 'rainbow'
    },
    { 
      id: 12, name: 'Volcán de Energía', 
      x: 80, y: 15,
      icon: <Flame className="w-6 h-6" />, 
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-red-500/20 to-orange-600/20',
      description: 'Poder ilimitado y energía infinita',
      rewards: ['Super poderes desbloqueados', 'Modo turbo', 'Multiplicador x3 XP'],
      stats: { xpRequired: 4000, missionsRequired: 110 },
      milestone: false,
      theme: 'volcano'
    },
    { 
      id: 13, name: 'Isla de la Serenidad', 
      x: 70, y: 12,
      icon: <Wind className="w-6 h-6" />, 
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20',
      description: 'Paz absoluta y tranquilidad interior',
      rewards: ['Retiro virtual premium', 'Soundscapes exclusivos', 'Modo flotación'],
      stats: { xpRequired: 4500, missionsRequired: 125 },
      milestone: false,
      theme: 'island'
    },
    { 
      id: 14, name: 'Aurora Celestial', 
      x: 85, y: 10,
      icon: <Star className="w-6 h-6" />, 
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-purple-600/20',
      description: 'Magia celestial y conexión cósmica',
      rewards: ['Efectos aurora boreal', 'Badge mítico', 'Predicciones personalizadas'],
      stats: { xpRequired: 5000, missionsRequired: 140 },
      milestone: false,
      theme: 'aurora'
    },
    { 
      id: 15, name: 'Cumbre de Leyenda', 
      x: 75, y: 7,
      icon: <Trophy className="w-6 h-6" />, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500/30 to-pink-500/30',
      description: '¡HITO LEGENDARIO! Entre los mejores del mundo',
      rewards: ['Hall de la fama eterno', 'Reconocimiento global', 'Mentor supremo'],
      stats: { xpRequired: 5500, missionsRequired: 160 },
      milestone: true,
      theme: 'legendary'
    },
    { 
      id: 16, name: 'Galaxia Infinita', 
      x: 90, y: 5,
      icon: <Gem className="w-6 h-6" />, 
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30',
      description: '¡MAESTRÍA ABSOLUTA! Has trascendido todos los límites',
      rewards: ['Todo contenido desbloqueado', 'Modo Dios activado', 'Status eterno de leyenda', 'Panda Cósmico'],
      stats: { xpRequired: 6000, missionsRequired: 200 },
      milestone: true,
      theme: 'cosmic'
    }
  ];

  // Elementos decorativos temáticos mejorados
  const decorativeElements = [
    // Árboles y naturaleza
    { type: 'tree', x: 20, y: 80, icon: <TreePine className="w-8 h-8 text-green-600/40" /> },
    { type: 'tree', x: 38, y: 68, icon: <TreePine className="w-6 h-6 text-green-600/30" /> },
    { type: 'tree', x: 55, y: 58, icon: <TreePine className="w-10 h-10 text-green-700/40" /> },
    
    // Nubes
    { type: 'cloud', x: 25, y: 20, icon: <Cloud className="w-12 h-12 text-white/20" /> },
    { type: 'cloud', x: 60, y: 15, icon: <Cloud className="w-10 h-10 text-white/15" /> },
    { type: 'cloud', x: 85, y: 25, icon: <Cloud className="w-8 h-8 text-white/10" /> },
    
    // Montañas de fondo
    { type: 'mountain', x: 30, y: 45, icon: <Mountain className="w-20 h-20 text-gray-600/20" /> },
    { type: 'mountain', x: 75, y: 40, icon: <Mountain className="w-16 h-16 text-gray-600/15" /> },
    
    // Elementos mágicos
    { type: 'sparkle', x: 45, y: 30, icon: <Sparkles className="w-6 h-6 text-yellow-400/40" /> },
    { type: 'sparkle', x: 80, y: 35, icon: <Sparkles className="w-5 h-5 text-purple-400/30" /> },
  ];

  const handleLevelClick = (level) => {
    if (level.id > currentLevel) {
      toast({
        title: "Nivel bloqueado",
        description: `Alcanza el nivel ${level.id} para desbloquear "${level.name}"`,
      });
      return;
    }
    
    setSelectedLevel(level);
    
    if (level.milestone && level.id <= currentLevel) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateProgress = () => {
    const unlockedCount = levels.filter(l => l.id <= currentLevel).length;
    return (unlockedCount / levels.length) * 100;
  };

  const getNodeStyle = (level) => {
    const isUnlocked = level.id <= currentLevel;
    const isCurrent = level.id === currentLevel;
    const isHovered = hoveredLevel === level.id;
    
    if (isCurrent) return 'ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/50';
    if (isHovered && isUnlocked) return 'ring-2 ring-white/50 shadow-xl transform scale-110';
    if (isUnlocked) return 'shadow-lg';
    return 'opacity-60 grayscale';
  };

  return (
    <>
      <Helmet>
        <title>Mapa de Progreso - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-4">
        <div className="max-w-full mx-auto">
          
          {/* Header con estadísticas mejoradas */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 via-indigo-800/50 to-purple-800/50 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/30 mb-6 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-2xl">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    Tu Camino de Transformación
                  </h1>
                  <p className="text-purple-200 mt-1 flex items-center gap-2">
                    16 niveles épicos 
                    <span className="text-yellow-400">•</span> 
                    {levels.filter(l => l.milestone).length} hitos legendarios
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                {[
                  { icon: <Star />, value: currentLevel, label: 'Nivel', color: 'from-yellow-400 to-orange-400' },
                  { icon: <Trophy />, value: levels.filter(l => l.id <= currentLevel).length, label: 'Completados', color: 'from-green-400 to-emerald-400' },
                  { icon: <Crown />, value: levels.filter(l => l.milestone && l.id <= currentLevel).length, label: 'Hitos', color: 'from-purple-400 to-pink-400' }
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative"
                  >
                    <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl shadow-xl`}>
                      <div className="text-white mb-1">{stat.icon}</div>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/80">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-purple-200 font-semibold">Progreso Total del Viaje</span>
                <span className="text-white font-bold text-lg">{Math.round(calculateProgress())}%</span>
              </div>
              <div className="relative h-4 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ width: '50px', filter: 'blur(20px)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* MAPA PRINCIPAL MEJORADO */}
          <Card className="relative bg-gradient-to-br from-indigo-950/50 via-purple-950/50 to-slate-950/50 backdrop-blur-xl border-purple-500/20 overflow-hidden shadow-2xl">
            <div className="relative w-full" style={{ height: '1000px' }}>
              
              {/* Fondo con gradiente y estrellas animadas */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-purple-950/80 to-slate-950/80">
                {/* Estrellas de fondo */}
                {Array.from({ length: 60 }, (_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute text-white"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${Math.random() * 8 + 4}px`,
                      opacity: Math.random() * 0.5 + 0.1
                    }}
                    animate={{
                      opacity: [0.1, 0.6, 0.1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 3,
                      delay: Math.random() * 2,
                      repeat: Infinity
                    }}
                  >
                    ✦
                  </motion.div>
                ))}
              </div>

              {/* Elementos decorativos mejorados */}
              {decorativeElements.map((element, index) => (
                <motion.div
                  key={`deco-${index}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                  }}
                  animate={{
                    y: element.type === 'cloud' ? [0, -10, 0] : [0, -3, 0],
                    opacity: element.type === 'sparkle' ? [0.4, 1, 0.4] : 1
                  }}
                  transition={{
                    duration: element.type === 'cloud' ? 20 : 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {element.icon}
                </motion.div>
              ))}

              {/* CAMINO MEJORADO CON TEXTURA */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                <defs>
                  {/* Gradiente principal del camino */}
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#EC4899" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.9" />
                  </linearGradient>
                  
                  {/* Patrón de textura para el camino */}
                  <pattern id="pathPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.2" />
                    <circle cx="10" cy="10" r="1" fill="#ffffff" opacity="0.15" />
                    <circle cx="18" cy="6" r="1" fill="#ffffff" opacity="0.1" />
                    <circle cx="6" cy="14" r="1" fill="#ffffff" opacity="0.2" />
                  </pattern>
                  
                  {/* Filtro de brillo */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Camino principal */}
                {levels.slice(0, -1).map((level, index) => {
                  const nextLevel = levels[index + 1];
                  const isUnlocked = level.id <= currentLevel && nextLevel.id <= currentLevel;
                  const isCurrent = level.id === currentLevel || nextLevel.id === currentLevel;
                  
                  // Control points para curvas Bezier más suaves
                  const cp1x = level.x + (nextLevel.x - level.x) * 0.5;
                  const cp1y = level.y - 5;
                  const cp2x = level.x + (nextLevel.x - level.x) * 0.5;
                  const cp2y = nextLevel.y + 5;
                  
                  return (
                    <g key={`path-group-${index}`}>
                      {/* Sombra del camino */}
                      <motion.path
                        d={`M ${level.x}% ${level.y}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${nextLevel.x}% ${nextLevel.y}%`}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="14"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        style={{ transform: 'translate(2px, 2px)' }}
                      />
                      
                      {/* Camino base */}
                      <motion.path
                        d={`M ${level.x}% ${level.y}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${nextLevel.x}% ${nextLevel.y}%`}
                        stroke={isUnlocked ? "url(#pathGradient)" : "#4C1D95"}
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={isUnlocked ? "0" : "15 10"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        filter={isCurrent ? "url(#glow)" : ""}
                        opacity={isUnlocked ? 1 : 0.4}
                      />
                      
                      {/* Textura sobre el camino desbloqueado */}
                      {isUnlocked && (
                        <motion.path
                          d={`M ${level.x}% ${level.y}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${nextLevel.x}% ${nextLevel.y}%`}
                          stroke="url(#pathPattern)"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ duration: 2, delay: index * 0.1 + 0.5 }}
                        />
                      )}
                      
                      {/* Partículas animadas en el camino actual */}
                      {isCurrent && (
                        <motion.circle
                          r="4"
                          fill="#FCD34D"
                          filter="url(#glow)"
                          animate={{
                            offsetDistance: ['0%', '100%'],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 3
                          }}
                        >
                          <animateMotion
                            dur="3s"
                            repeatCount="indefinite"
                            path={`M ${level.x}% ${level.y}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${nextLevel.x}% ${nextLevel.y}%`}
                          />
                        </motion.circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* NODOS DEL MAPA REDISEÑADOS */}
              {levels.map((level, index) => {
                const isUnlocked = level.id <= currentLevel;
                const isCurrent = level.id === currentLevel;
                const isHovered = hoveredLevel === level.id;
                const isCompleted = level.id < currentLevel;
                
                return (
                  <motion.div
                    key={level.id}
                    className="absolute"
                    style={{
                      left: `${level.x}%`,
                      top: `${level.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isCurrent ? 30 : isHovered ? 25 : 20 - index * 0.1
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                    onMouseEnter={() => setHoveredLevel(level.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                  >
                    {/* Aura especial para hitos */}
                    {level.milestone && isUnlocked && (
                      <motion.div
                        className={`absolute rounded-full bg-gradient-to-r ${level.color}`}
                        style={{
                          width: '150px',
                          height: '150px',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          filter: 'blur(30px)',
                          opacity: 0.4
                        }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Nodo principal circular */}
                    <motion.button
                      whileHover={isUnlocked ? { scale: 1.15 } : {}}
                      whileTap={isUnlocked ? { scale: 0.95 } : {}}
                      onClick={() => handleLevelClick(level)}
                      className={`
                        relative rounded-full transition-all duration-300
                        ${isMobile ? 'w-20 h-20' : 'w-28 h-28'}
                        ${getNodeStyle(level)}
                      `}
                    >
                      {/* Fondo del nodo */}
                      <div className={`
                        absolute inset-0 rounded-full
                        ${isUnlocked ? level.bgColor : 'bg-gray-800/50'}
                        ${isUnlocked ? 'backdrop-blur-sm' : ''}
                      `} />
                      
                      {/* Borde gradiente */}
                      <div className={`
                        absolute inset-0 rounded-full p-[2px]
                        ${isUnlocked ? `bg-gradient-to-br ${level.color}` : 'bg-gray-600'}
                      `}>
                        <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur" />
                      </div>
                      
                      {/* Contenido del nodo */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10">
                        {isCurrent ? (
                          // Panda en círculo amarillo para nivel actual
                          <motion.div
                            className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-2 shadow-xl"
                            animate={{ 
                              boxShadow: [
                                '0 0 20px rgba(251, 191, 36, 0.5)',
                                '0 0 40px rgba(251, 191, 36, 0.8)',
                                '0 0 20px rgba(251, 191, 36, 0.5)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <motion.img
                              src={pandaImage}
                              alt="Tu posición"
                              className="w-full h-full object-contain drop-shadow-lg"
                              animate={{ 
                                y: [0, -3, 0],
                                rotate: [-5, 5, -5]
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </motion.div>
                        ) : isCompleted ? (
                          // Nivel completado
                          <motion.div className={`text-white ${level.color ? `bg-gradient-to-br ${level.color} bg-clip-text text-transparent` : ''}`}>
                            <CheckCircle className="w-10 h-10" />
                          </motion.div>
                        ) : isUnlocked ? (
                          // Nivel desbloqueado pero no alcanzado
                          <motion.div 
                            className={`text-white`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {level.icon}
                          </motion.div>
                        ) : (
                          // Nivel bloqueado
                          <Lock className="w-8 h-8 text-gray-500" />
                        )}
                      </div>
                      
                      {/* Badge de nivel */}
                      <div className={`
                        absolute -bottom-2 left-1/2 -translate-x-1/2
                        px-3 py-1 rounded-full text-xs font-bold
                        ${isUnlocked 
                          ? 'bg-gradient-to-r ' + level.color + ' text-white shadow-lg' 
                          : 'bg-gray-700 text-gray-400'}
                      `}>
                        Nivel {level.id}
                      </div>
                      
                      {/* Corona para hitos */}
                      {level.milestone && (
                        <motion.div
                          className="absolute -top-3 -right-3"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <div className="relative">
                            <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                            <motion.div
                              className="absolute inset-0"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Crown className="w-8 h-8 text-yellow-400" />
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Indicador "Estás aquí" mejorado */}
                      {isCurrent && (
                        <motion.div
                          className="absolute -top-12 left-1/2 -translate-x-1/2"
                          animate={{ y: [-5, 0, -5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-xl">
                            <Sparkles className="w-4 h-4 inline mr-1" />
                            ¡ESTÁS AQUÍ!
                            <Sparkles className="w-4 h-4 inline ml-1" />
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 
                            border-l-[8px] border-l-transparent
                            border-t-[8px] border-t-yellow-400
                            border-r-[8px] border-r-transparent" />
                        </motion.div>
                      )}
                    </motion.button>
                    
                    {/* Nombre del nivel */}
                    <motion.div 
                      className="mt-3 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <p className={`
                        font-bold ${isMobile ? 'text-xs' : 'text-sm'}
                        ${isUnlocked ? 'text-white' : 'text-gray-500'}
                        ${isCurrent ? 'text-yellow-400' : ''}
                      `}>
                        {level.name}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-green-400 mt-1">✓ Completado</p>
                      )}
                    </motion.div>
                    
                    {/* Tooltip mejorado al hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-40"
                        >
                          <Card className={`
                            ${isUnlocked ? level.bgColor : 'bg-gray-800/95'} 
                            backdrop-blur-xl border-2
                            ${isUnlocked ? 'border-purple-400/50' : 'border-gray-600'}
                            p-4 min-w-[280px] shadow-2xl
                          `}>
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`p-2 rounded-xl bg-gradient-to-br ${isUnlocked ? level.color : 'from-gray-600 to-gray-700'}`}>
                                {isUnlocked ? level.icon : <Lock className="w-5 h-5 text-white" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-bold text-lg">{level.name}</p>
                                <Badge variant={level.milestone ? "default" : "secondary"} className="mt-1">
                                  Nivel {level.id} {level.milestone && '• HITO'}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-purple-200 text-sm mb-3">{level.description}</p>
                            
                            {/* Requisitos */}
                            <div className="bg-black/20 rounded-lg p-2 mb-3">
                              <p className="text-xs font-bold text-purple-300 mb-1">Requisitos:</p>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-purple-200">XP necesario:</span>
                                  <span className="text-white font-bold">{level.stats.xpRequired}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-purple-200">Misiones:</span>
                                  <span className="text-white font-bold">{level.stats.missionsRequired}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Recompensas con iconos */}
                            {level.rewards && (
                              <div>
                                <p className="text-yellow-400 text-xs font-bold mb-2 flex items-center gap-1">
                                  <Gift className="w-4 h-4" />
                                  Recompensas:
                                </p>
                                <div className="space-y-1">
                                  {level.rewards.map((reward, i) => (
                                    <motion.div 
                                      key={i}
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex items-center gap-2 bg-purple-800/30 rounded-lg p-1.5"
                                    >
                                      <Star className="w-3 h-3 text-yellow-400" />
                                      <span className="text-xs text-white">{reward}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {!isUnlocked && (
                              <div className="mt-3 pt-3 border-t border-gray-600">
                                <p className="text-xs text-gray-400">
                                  🔒 Alcanza el nivel {level.id} para desbloquear
                                </p>
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Modal de detalle del nivel (cuando se hace click) */}
          <AnimatePresence>
            {selectedLevel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedLevel(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  className={`
                    ${selectedLevel.bgColor} backdrop-blur-xl
                    rounded-3xl p-8 max-w-2xl w-full shadow-2xl
                    border-2 border-white/20
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${selectedLevel.color} shadow-xl`}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {selectedLevel.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedLevel.name}</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-white/20 text-white">Nivel {selectedLevel.id}</Badge>
                        {selectedLevel.milestone && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900">
                            <Crown className="w-3 h-3 mr-1" />
                            HITO ÉPICO
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-lg mb-6">{selectedLevel.description}</p>
                  
                  {/* Estadísticas del nivel */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <p className="text-white/70 text-sm">XP Requerido</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{selectedLevel.stats.xpRequired}</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <p className="text-white/70 text-sm">Misiones Necesarias</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{selectedLevel.stats.missionsRequired}</p>
                    </div>
                  </div>
                  
                  {/* Recompensas detalladas */}
                  {selectedLevel.rewards && (
                    <div className="mb-6">
                      <p className="text-yellow-400 font-bold mb-4 flex items-center gap-2 text-lg">
                        <Gift className="w-6 h-6" />
                        Recompensas al Completar:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedLevel.rewards.map((reward, i) => (
                          <motion.div 
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 bg-white/10 rounded-xl p-3"
                          >
                            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-2 rounded-lg">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-medium">{reward}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Botón de acción */}
                  <div className="flex gap-3">
                    {selectedLevel.id <= currentLevel ? (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg py-6"
                        disabled
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Nivel Completado
                      </Button>
                    ) : selectedLevel.id === currentLevel + 1 ? (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg py-6"
                        onClick={() => {
                          // Aquí iría la lógica para ir a las misiones
                          setSelectedLevel(null);
                        }}
                      >
                        <Target className="w-5 h-5 mr-2" />
                        Continuar Viaje
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1 bg-gray-700 text-gray-300 font-bold text-lg py-6"
                        disabled
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Bloqueado - Nivel {selectedLevel.id} Requerido
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setSelectedLevel(null)}
                    >
                      Cerrar
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ProgressMapPage;