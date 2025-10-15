import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Lock, CheckCircle, Star, Trophy, Sparkles, 
  Crown, Gem, Target, Zap, Gift,
  Sunrise, Activity, Mountain, Brain, TreePine, 
  Flower2, Shield, Users, Bird, Flame, Wind
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const ProgressMapPage = () => {
  const { stats } = useData();
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const currentLevel = stats?.level || 1;
  const userPandaSkin = localStorage.getItem('userPandaSkin') || 1;
  const pandaImage = `/images/panda-level-${userPandaSkin}.png`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 16 NIVELES con posiciones OPTIMIZADAS para móvil
  const levels = [
    { id: 1, name: 'El Despertar', x: 15, y: 90, icon: <Sunrise className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-yellow-400 to-orange-500', bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      description: 'Tu viaje comienza', rewards: ['Primera misión', 'Avatar panda', '+50 XP'],
      stats: { xpRequired: 0, missionsRequired: 0 }, milestone: false },
    
    { id: 2, name: 'Primeros Pasos', x: 25, y: 85, icon: <Activity className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-blue-400 to-cyan-500', bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      description: 'Rutinas básicas', rewards: ['+100 XP', 'Badge Iniciado', 'Meditaciones'],
      stats: { xpRequired: 100, missionsRequired: 3 }, milestone: false },
    
    { id: 3, name: 'Valle Constancia', x: 40, y: 78, icon: <Mountain className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-green-400 to-emerald-500', bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      description: 'Disciplina en hábito', rewards: ['Modo focus', 'Tracker hábitos'],
      stats: { xpRequired: 300, missionsRequired: 7 }, milestone: false },
    
    { id: 4, name: 'Río Meditación', x: 30, y: 68, icon: <Brain className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-cyan-400 to-blue-500', bgColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      description: 'Paz interior', rewards: ['Sonidos ambient', 'Timer Pomodoro'],
      stats: { xpRequired: 500, missionsRequired: 12 }, milestone: false },
    
    { id: 5, name: 'Bosque Conocimiento', x: 50, y: 62, icon: <TreePine className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-green-500 to-lime-500', bgColor: 'bg-gradient-to-br from-green-600/30 to-lime-500/30',
      description: 'HITO: Fundamentos dominados', rewards: ['Biblioteca', 'Panda Sabio', 'Título Aprendiz'],
      stats: { xpRequired: 800, missionsRequired: 20 }, milestone: true },
    
    { id: 6, name: 'Montaña Desafío', x: 65, y: 55, icon: <Zap className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-gray-400 to-gray-600', bgColor: 'bg-gradient-to-br from-gray-500/20 to-gray-600/20',
      description: 'Supera límites', rewards: ['Rutinas avanzadas', 'Badge Escalador'],
      stats: { xpRequired: 1200, missionsRequired: 30 }, milestone: false },
    
    { id: 7, name: 'Jardín Gratitud', x: 55, y: 48, icon: <Flower2 className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-pink-400 to-rose-500', bgColor: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
      description: 'Cultiva felicidad', rewards: ['Diario gratitud', 'Tracker emocional'],
      stats: { xpRequired: 1600, missionsRequired: 40 }, milestone: false },
    
    { id: 8, name: 'Templo Equilibrio', x: 70, y: 42, icon: <Shield className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-purple-400 to-indigo-500', bgColor: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
      description: 'Balance perfecto', rewards: ['Modo zen', 'Coach AI'],
      stats: { xpRequired: 2000, missionsRequired: 50 }, milestone: false },
    
    { id: 9, name: 'Ciudad Mentor', x: 60, y: 35, icon: <Users className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-indigo-400 to-purple-500', bgColor: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
      description: 'Comparte sabiduría', rewards: ['Modo mentor', 'Comunidad VIP'],
      stats: { xpRequired: 2500, missionsRequired: 65 }, milestone: false },
    
    { id: 10, name: 'Reino Dorado', x: 75, y: 28, icon: <Crown className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-yellow-500 to-amber-600', bgColor: 'bg-gradient-to-br from-yellow-500/30 to-amber-600/30',
      description: 'HITO: Maestría alcanzada', rewards: ['Corona dorada', 'Título Maestro', 'Skins doradas'],
      stats: { xpRequired: 3000, missionsRequired: 80 }, milestone: true },
    
    { id: 11, name: 'Puente Arcoíris', x: 65, y: 22, icon: <Bird className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-purple-400 via-pink-400 to-cyan-400', bgColor: 'bg-gradient-to-br from-purple-400/20 to-cyan-400/20',
      description: 'Conexión universal', rewards: ['Efectos únicos', 'Temas custom'],
      stats: { xpRequired: 3500, missionsRequired: 95 }, milestone: false },
    
    { id: 12, name: 'Volcán Energía', x: 80, y: 18, icon: <Flame className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-red-500 to-orange-600', bgColor: 'bg-gradient-to-br from-red-500/20 to-orange-600/20',
      description: 'Energía infinita', rewards: ['Super poderes', 'Multiplicador x3'],
      stats: { xpRequired: 4000, missionsRequired: 110 }, milestone: false },
    
    { id: 13, name: 'Isla Serenidad', x: 70, y: 14, icon: <Wind className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-teal-400 to-cyan-500', bgColor: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20',
      description: 'Paz absoluta', rewards: ['Retiro premium', 'Soundscapes'],
      stats: { xpRequired: 4500, missionsRequired: 125 }, milestone: false },
    
    { id: 14, name: 'Aurora Celestial', x: 85, y: 10, icon: <Star className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-blue-500 to-purple-600', bgColor: 'bg-gradient-to-br from-blue-500/20 to-purple-600/20',
      description: 'Magia celestial', rewards: ['Aurora effects', 'Badge mítico'],
      stats: { xpRequired: 5000, missionsRequired: 140 }, milestone: false },
    
    { id: 15, name: 'Cumbre Leyenda', x: 75, y: 6, icon: <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-purple-500 to-pink-500', bgColor: 'bg-gradient-to-br from-purple-500/30 to-pink-500/30',
      description: 'HITO: Entre los mejores', rewards: ['Hall de fama', 'Mentor supremo'],
      stats: { xpRequired: 5500, missionsRequired: 160 }, milestone: true },
    
    { id: 16, name: 'Galaxia Infinita', x: 90, y: 3, icon: <Gem className="w-4 h-4 sm:w-6 sm:h-6" />, 
      color: 'from-indigo-500 via-purple-500 to-pink-500', bgColor: 'bg-gradient-to-br from-indigo-500/30 to-pink-500/30',
      description: 'MAESTRÍA ABSOLUTA', rewards: ['Modo Dios', 'Panda Cósmico', 'Leyenda eterna'],
      stats: { xpRequired: 6000, missionsRequired: 200 }, milestone: true }
  ];

  const handleLevelClick = (level) => {
    if (level.id > currentLevel) {
      toast({
        title: "Nivel bloqueado 🔒",
        description: `Alcanza nivel ${level.id} para desbloquear "${level.name}"`,
        variant: "destructive"
      });
      return;
    }
    setSelectedLevel(level);
    if (level.milestone && level.id <= currentLevel) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const calculateProgress = () => {
    const unlocked = levels.filter(l => l.id <= currentLevel).length;
    return (unlocked / levels.length) * 100;
  };

  const getNodeStyle = (level) => {
    const isUnlocked = level.id <= currentLevel;
    const isCurrent = level.id === currentLevel;
    
    if (isCurrent) return 'ring-2 sm:ring-4 ring-yellow-400 shadow-xl shadow-yellow-400/50';
    if (isUnlocked) return 'shadow-lg';
    return 'opacity-50 grayscale';
  };

  // Altura responsive del mapa
  const mapHeight = isMobile ? '600px' : '800px';
  
  // Estrellas reducidas en móvil
  const starCount = isMobile ? 15 : 30;

  return (
    <>
      <Helmet><title>Mapa de Progreso - ConnectONE</title></Helmet>

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-2 sm:p-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header optimizado */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-purple-500/30 mb-3 sm:mb-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full sm:rounded-2xl blur-lg opacity-50" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 p-2 sm:p-4 rounded-xl sm:rounded-2xl">
                    <MapPin className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    Tu Camino
                  </h1>
                  <p className="text-xs sm:text-sm text-purple-200">
                    {levels.length} niveles • {levels.filter(l => l.milestone).length} hitos
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-center">
                {[
                  { icon: <Star className="w-3 h-3 sm:w-5 sm:h-5" />, value: currentLevel, label: 'Nivel', color: 'from-yellow-400 to-orange-400' },
                  { icon: <Trophy className="w-3 h-3 sm:w-5 sm:h-5" />, value: levels.filter(l => l.id <= currentLevel).length, label: 'Completo', color: 'from-green-400 to-emerald-400' },
                  { icon: <Crown className="w-3 h-3 sm:w-5 sm:h-5" />, value: levels.filter(l => l.milestone && l.id <= currentLevel).length, label: 'Hitos', color: 'from-purple-400 to-pink-400' }
                ].map(stat => (
                  <div key={stat.label} className={`bg-gradient-to-br ${stat.color} p-2 sm:p-4 rounded-lg sm:rounded-2xl shadow-lg flex-1 sm:flex-none min-w-[70px] sm:min-w-0`}>
                    <div className="text-white mb-0.5 sm:mb-1 flex justify-center">{stat.icon}</div>
                    <p className="text-xl sm:text-3xl font-bold text-white text-center">{stat.value}</p>
                    <p className="text-[9px] sm:text-xs text-white/80 text-center">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-6">
              <div className="flex justify-between mb-1 sm:mb-2">
                <span className="text-purple-200 font-semibold text-xs sm:text-base">Progreso</span>
                <span className="text-white font-bold text-sm sm:text-lg">{Math.round(calculateProgress())}%</span>
              </div>
              <div className="relative h-2 sm:h-4 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* MAPA OPTIMIZADO */}
          <Card className="relative bg-gradient-to-br from-indigo-950/50 via-purple-950/50 to-slate-950/50 backdrop-blur-xl border-purple-500/20 overflow-hidden">
            <div className="relative w-full" style={{ height: mapHeight }}>
              
              {/* Fondo con estrellas REDUCIDAS */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-purple-950/80 to-slate-950/80">
                {Array.from({ length: starCount }, (_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute text-white text-xs sm:text-base"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.1
                    }}
                    animate={{ opacity: [0.1, 0.6, 0.1] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                  >
                    ✦
                  </motion.div>
                ))}
              </div>

              {/* CAMINO SIMPLIFICADO */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                <defs>
                  <linearGradient id="pathGradient">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                
                {levels.slice(0, -1).map((level, index) => {
                  const nextLevel = levels[index + 1];
                  const isUnlocked = level.id <= currentLevel && nextLevel.id <= currentLevel;
                  
                  return (
                    <motion.path
                      key={`path-${index}`}
                      d={`M ${level.x}% ${level.y}% L ${nextLevel.x}% ${nextLevel.y}%`}
                      stroke={isUnlocked ? "url(#pathGradient)" : "#4C1D95"}
                      strokeWidth={isMobile ? "6" : "10"}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={isUnlocked ? "0" : "10 5"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      opacity={isUnlocked ? 1 : 0.4}
                    />
                  );
                })}
              </svg>

              {/* NODOS OPTIMIZADOS */}
              {levels.map((level, index) => {
                const isUnlocked = level.id <= currentLevel;
                const isCurrent = level.id === currentLevel;
                const isCompleted = level.id < currentLevel;
                
                return (
                  <motion.div
                    key={level.id}
                    className="absolute"
                    style={{
                      left: `${level.x}%`,
                      top: `${level.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isCurrent ? 30 : 20
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onTouchStart={() => setHoveredLevel(level.id)}
                    onTouchEnd={() => setTimeout(() => setHoveredLevel(null), 2000)}
                    onMouseEnter={() => !isMobile && setHoveredLevel(level.id)}
                    onMouseLeave={() => !isMobile && setHoveredLevel(null)}
                  >
                    {/* Aura para hitos */}
                    {level.milestone && isUnlocked && (
                      <motion.div
                        className={`absolute rounded-full bg-gradient-to-r ${level.color}`}
                        style={{
                          width: isMobile ? '60px' : '100px',
                          height: isMobile ? '60px' : '100px',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          filter: 'blur(20px)',
                          opacity: 0.3
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Nodo */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLevelClick(level)}
                      className={`
                        relative rounded-full transition-all duration-300
                        ${isMobile ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-20 h-20'}
                        ${getNodeStyle(level)}
                      `}
                    >
                      <div className={`absolute inset-0 rounded-full ${isUnlocked ? level.bgColor : 'bg-gray-800/50'}`} />
                      
                      <div className={`absolute inset-0 rounded-full p-[2px] ${isUnlocked ? `bg-gradient-to-br ${level.color}` : 'bg-gray-600'}`}>
                        <div className="w-full h-full rounded-full bg-slate-900/80" />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        {isCurrent ? (
                          <motion.div
                            className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1"
                            animate={{ boxShadow: ['0 0 10px rgba(251, 191, 36, 0.5)', '0 0 20px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.5)'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <img src={pandaImage} alt="Tu posición" className="w-full h-full object-contain" />
                          </motion.div>
                        ) : isCompleted ? (
                          <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                        ) : isUnlocked ? (
                          level.icon
                        ) : (
                          <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
                        )}
                      </div>
                      
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[8px] sm:text-xs font-bold whitespace-nowrap
                        ${isUnlocked ? 'bg-gradient-to-r ' + level.color + ' text-white' : 'bg-gray-700 text-gray-400'}`}>
                        {level.id}
                      </div>
                      
                      {level.milestone && <Crown className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />}
                      
                      {isCurrent && (
                        <motion.div
                          className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-2 py-1 rounded-full text-[10px] sm:text-sm font-bold whitespace-nowrap"
                          animate={{ y: [-3, 0, -3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ¡AQUÍ!
                        </motion.div>
                      )}
                    </motion.button>
                    
                    {/* Nombre */}
                    {!isMobile && (
                      <p className={`mt-2 text-center text-[10px] sm:text-xs font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'} ${isCurrent ? 'text-yellow-400' : ''}`}>
                        {level.name}
                      </p>
                    )}
                    
                    {/* Tooltip móvil simplificado */}
                    {hoveredLevel === level.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90vw] max-w-sm"
                      >
                        <Card className={`${level.bgColor} backdrop-blur-xl border-2 border-purple-400/50 p-4`}>
                          <div className="flex items-start gap-3 mb-2">
                            <div className={`p-2 rounded-xl bg-gradient-to-br ${level.color}`}>{level.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-sm truncate">{level.name}</p>
                              <Badge className="mt-1 text-xs">Nivel {level.id} {level.milestone && '• HITO'}</Badge>
                            </div>
                          </div>
                          <p className="text-purple-200 text-xs mb-2">{level.description}</p>
                          <div className="bg-black/20 rounded p-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-purple-200">XP:</span>
                              <span className="text-white font-bold">{level.stats.xpRequired}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-purple-200">Misiones:</span>
                              <span className="text-white font-bold">{level.stats.missionsRequired}</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Modal simplificado */}
          <AnimatePresence>
            {selectedLevel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedLevel(null)}
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className={`${selectedLevel.bgColor} backdrop-blur-xl rounded-t-3xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full border-t-2 sm:border-2 border-white/20 max-h-[90vh] overflow-y-auto`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${selectedLevel.color}`}>{selectedLevel.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">{selectedLevel.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="text-xs sm:text-sm">Nivel {selectedLevel.id}</Badge>
                        {selectedLevel.milestone && <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-xs sm:text-sm">HITO</Badge>}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-sm sm:text-lg mb-4 sm:mb-6">{selectedLevel.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-4">
                      <p className="text-white/70 text-xs sm:text-sm mb-1">XP Requerido</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">{selectedLevel.stats.xpRequired}</p>
                    </div>
                    <div className="bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-4">
                      <p className="text-white/70 text-xs sm:text-sm mb-1">Misiones</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">{selectedLevel.stats.missionsRequired}</p>
                    </div>
                  </div>
                  
                  {selectedLevel.rewards && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-yellow-400 font-bold mb-2 sm:mb-4 flex items-center gap-2 text-sm sm:text-lg">
                        <Gift className="w-4 h-4 sm:w-6 sm:h-6" />Recompensas:
                      </p>
                      <div className="space-y-2">
                        {selectedLevel.rewards.map((reward, i) => (
                          <div key={i} className="flex items-center gap-2 sm:gap-3 bg-white/10 rounded-lg p-2 sm:p-3">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                            <span className="text-white text-xs sm:text-base">{reward}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 sm:gap-3">
                    {selectedLevel.id <= currentLevel ? (
                      <Button className="flex-1 bg-green-500 text-white text-sm sm:text-lg py-4 sm:py-6" disabled>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />Completado
                      </Button>
                    ) : selectedLevel.id === currentLevel + 1 ? (
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-lg py-4 sm:py-6">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />Continuar
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-gray-700 text-gray-300 text-sm sm:text-lg py-4 sm:py-6" disabled>
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />Bloqueado
                      </Button>
                    )}
                    <Button variant="outline" className="border-white/20 text-white text-sm sm:text-base" onClick={() => setSelectedLevel(null)}>Cerrar</Button>
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