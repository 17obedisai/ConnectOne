import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Star, Lock, Award, Zap, Target, TrendingUp,
  Flame, Heart, Users, Brain, Dumbbell, Calendar,
  CheckCircle, Medal, Crown, Gem, Shield, Sparkles,
  ChevronRight, Info, Gift, MapPin, Clock, Coffee,
  Moon, Sun, Book, Smile
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const AchievementsPage = () => {
  const { 
    stats, 
    profile,
    achievements: dataAchievements,
    getAchievementProgress 
  } = useData();
  const { toast } = useToast();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  
  const unlockedAchievements = dataAchievements?.unlocked || ['welcome'];

  // TODOS LOS LOGROS (simplificado a 20 principales)
  const achievements = [
    // INICIO (5)
    {
      id: 'welcome',
      nombre: 'Bienvenida',
      descripcion: 'Únete a ConnectONE',
      categoria: 'inicio',
      emoji: '🎉',
      puntos: 5,
      color: 'from-green-500 to-emerald-600',
      requisito: { tipo: 'registro', valor: 1 },
      recompensa: { tipo: 'xp', valor: 25 },
      rareza: 'comun',
      progreso: 1
    },
    {
      id: 'first_step',
      nombre: 'Primer Paso',
      descripcion: 'Completa tu primera misión',
      categoria: 'inicio',
      emoji: '👣',
      puntos: 10,
      color: 'from-blue-500 to-cyan-600',
      requisito: { tipo: 'misiones', valor: 1 },
      recompensa: { tipo: 'xp', valor: 50 },
      rareza: 'comun',
      progreso: getAchievementProgress('misiones')
    },
    {
      id: 'profile_complete',
      nombre: 'Identidad',
      descripcion: 'Completa tu perfil',
      categoria: 'inicio',
      emoji: '🆔',
      puntos: 15,
      color: 'from-purple-500 to-indigo-600',
      requisito: { tipo: 'perfil', valor: 100 },
      recompensa: { tipo: 'badge', valor: 'Personalizado' },
      rareza: 'comun',
      progreso: profile?.nombre && profile?.bio ? 100 : 50
    },
    {
      id: 'three_missions',
      nombre: 'Triada',
      descripcion: 'Completa 3 misiones',
      categoria: 'inicio',
      emoji: '3️⃣',
      puntos: 15,
      color: 'from-teal-500 to-cyan-600',
      requisito: { tipo: 'misiones', valor: 3 },
      recompensa: { tipo: 'xp', valor: 75 },
      rareza: 'comun',
      progreso: getAchievementProgress('misiones')
    },
    {
      id: 'first_streak',
      nombre: 'Consistencia Inicial',
      descripcion: 'Mantén una racha de 2 días',
      categoria: 'inicio',
      emoji: '🔗',
      puntos: 20,
      color: 'from-orange-500 to-yellow-600',
      requisito: { tipo: 'racha', valor: 2 },
      recompensa: { tipo: 'xp', valor: 100 },
      rareza: 'comun',
      progreso: getAchievementProgress('racha')
    },

    // CONSTANCIA (4)
    {
      id: 'week_warrior',
      nombre: 'Guerrero Semanal',
      descripcion: 'Racha de 7 días',
      categoria: 'constancia',
      emoji: '🗓️',
      puntos: 30,
      color: 'from-purple-500 to-violet-600',
      requisito: { tipo: 'racha', valor: 7 },
      recompensa: { tipo: 'xp', valor: 200 },
      rareza: 'raro',
      progreso: getAchievementProgress('racha')
    },
    {
      id: 'two_weeks',
      nombre: 'Quincena Poderosa',
      descripcion: 'Racha de 14 días',
      categoria: 'constancia',
      emoji: '💪',
      puntos: 50,
      color: 'from-red-500 to-pink-600',
      requisito: { tipo: 'racha', valor: 14 },
      recompensa: { tipo: 'titulo', valor: 'Constante' },
      rareza: 'raro',
      progreso: getAchievementProgress('racha')
    },
    {
      id: 'month_master',
      nombre: 'Mes Completo',
      descripcion: 'Racha de 30 días',
      categoria: 'constancia',
      emoji: '🔥',
      puntos: 100,
      color: 'from-orange-500 to-red-600',
      requisito: { tipo: 'racha', valor: 30 },
      recompensa: { tipo: 'skin', valor: 'Fuego' },
      rareza: 'epico',
      progreso: getAchievementProgress('racha')
    },
    {
      id: 'comeback_kid',
      nombre: 'El Regreso',
      descripcion: 'Vuelve después de 3 días',
      categoria: 'constancia',
      emoji: '🔄',
      puntos: 10,
      color: 'from-green-500 to-teal-600',
      requisito: { tipo: 'regreso', valor: 3 },
      recompensa: { tipo: 'xp', valor: 50 },
      rareza: 'comun',
      progreso: 0
    },

    // FITNESS (3)
    {
      id: 'first_workout',
      nombre: 'Primera Sudada',
      descripcion: 'Completa tu primer ejercicio',
      categoria: 'fitness',
      emoji: '💦',
      puntos: 10,
      color: 'from-red-500 to-orange-600',
      requisito: { tipo: 'ejercicio', valor: 1 },
      recompensa: { tipo: 'xp', valor: 50 },
      rareza: 'comun',
      progreso: getAchievementProgress('ejercicio')
    },
    {
      id: 'five_workouts',
      nombre: 'En Forma',
      descripcion: '5 entrenamientos completados',
      categoria: 'fitness',
      emoji: '🏋️',
      puntos: 20,
      color: 'from-orange-500 to-red-600',
      requisito: { tipo: 'ejercicio', valor: 5 },
      recompensa: { tipo: 'xp', valor: 100 },
      rareza: 'comun',
      progreso: getAchievementProgress('ejercicio')
    },
    {
      id: 'morning_workout',
      nombre: 'Atleta Matutino',
      descripcion: 'Ejercita 3 días antes de las 9am',
      categoria: 'fitness',
      emoji: '🌄',
      puntos: 30,
      color: 'from-pink-500 to-orange-500',
      requisito: { tipo: 'ejercicio_am', valor: 3 },
      recompensa: { tipo: 'titulo', valor: 'Madrugador' },
      rareza: 'raro',
      progreso: 0
    },

    // SOCIAL (3)
    {
      id: 'first_connection',
      nombre: 'Primera Conexión',
      descripcion: 'Realiza tu primera conexión social',
      categoria: 'social',
      emoji: '🤝',
      puntos: 10,
      color: 'from-blue-500 to-purple-600',
      requisito: { tipo: 'conexion', valor: 1 },
      recompensa: { tipo: 'xp', valor: 50 },
      rareza: 'comun',
      progreso: getAchievementProgress('conexion')
    },
    {
      id: 'social_butterfly',
      nombre: 'Mariposa Social',
      descripcion: '10 conexiones realizadas',
      categoria: 'social',
      emoji: '🦋',
      puntos: 25,
      color: 'from-purple-500 to-pink-600',
      requisito: { tipo: 'conexion', valor: 10 },
      recompensa: { tipo: 'badge', valor: 'Social' },
      rareza: 'comun',
      progreso: getAchievementProgress('conexion')
    },
    {
      id: 'kind_heart',
      nombre: 'Corazón Bondadoso',
      descripcion: '5 actos de bondad',
      categoria: 'social',
      emoji: '💝',
      puntos: 20,
      color: 'from-pink-500 to-rose-600',
      requisito: { tipo: 'bondad', valor: 5 },
      recompensa: { tipo: 'xp', valor: 100 },
      rareza: 'comun',
      progreso: getAchievementProgress('bondad')
    },

    // NIVELES (3)
    {
      id: 'level_5',
      nombre: 'Aprendiz',
      descripcion: 'Alcanza el nivel 5',
      categoria: 'niveles',
      emoji: '5️⃣',
      puntos: 50,
      color: 'from-blue-500 to-purple-600',
      requisito: { tipo: 'nivel', valor: 5 },
      recompensa: { tipo: 'titulo', valor: 'Aprendiz' },
      rareza: 'raro',
      progreso: stats?.level || 1
    },
    {
      id: 'level_10',
      nombre: 'Veterano',
      descripcion: 'Alcanza el nivel 10',
      categoria: 'niveles',
      emoji: '🎖️',
      puntos: 100,
      color: 'from-purple-500 to-pink-600',
      requisito: { tipo: 'nivel', valor: 10 },
      recompensa: { tipo: 'skin', valor: 'Veterano' },
      rareza: 'epico',
      progreso: stats?.level || 1
    },
    {
      id: 'level_20',
      nombre: 'Maestro',
      descripcion: 'Alcanza el nivel 20',
      categoria: 'niveles',
      emoji: '👑',
      puntos: 200,
      color: 'from-yellow-500 to-amber-600',
      requisito: { tipo: 'nivel', valor: 20 },
      recompensa: { tipo: 'titulo', valor: 'Maestro' },
      rareza: 'legendario',
      progreso: stats?.level || 1
    },

    // ESPECIAL (2)
    {
      id: 'perfect_day',
      nombre: 'Día Perfecto',
      descripcion: 'Completa 5+ misiones en un día',
      categoria: 'especial',
      emoji: '💎',
      puntos: 50,
      color: 'from-cyan-500 to-blue-600',
      requisito: { tipo: 'dia_perfecto', valor: 1 },
      recompensa: { tipo: 'titulo', valor: 'Perfeccionista' },
      rareza: 'epico',
      progreso: 0
    },
    {
      id: 'collector',
      nombre: 'Coleccionista',
      descripcion: 'Desbloquea 15 logros',
      categoria: 'especial',
      emoji: '🏅',
      puntos: 100,
      color: 'from-yellow-500 to-orange-600',
      requisito: { tipo: 'logros', valor: 15 },
      recompensa: { tipo: 'skin', valor: 'Coleccionista' },
      rareza: 'epico',
      progreso: unlockedAchievements.length
    }
  ];

  // CATEGORÍAS SIMPLIFICADAS (solo 6)
  const categorias = [
    { id: 'todos', nombre: 'Todos', icono: <Trophy />, color: 'from-purple-500 to-pink-500' },
    { id: 'inicio', nombre: 'Inicio', icono: <Star />, color: 'from-green-500 to-emerald-600' },
    { id: 'constancia', nombre: 'Constancia', icono: <Flame />, color: 'from-orange-500 to-red-600' },
    { id: 'fitness', nombre: 'Fitness', icono: <Dumbbell />, color: 'from-red-500 to-pink-600' },
    { id: 'social', nombre: 'Social', icono: <Users />, color: 'from-blue-500 to-cyan-600' },
    { id: 'niveles', nombre: 'Niveles', icono: <Award />, color: 'from-purple-500 to-indigo-600' },
    { id: 'especial', nombre: 'Especial', icono: <Crown />, color: 'from-yellow-500 to-amber-600' }
  ];

  const getRarezaColor = (rareza) => {
    switch(rareza) {
      case 'comun': return 'text-gray-400';
      case 'raro': return 'text-blue-400';
      case 'epico': return 'text-purple-400';
      case 'legendario': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarezaLabel = (rareza) => {
    switch(rareza) {
      case 'comun': return 'Común';
      case 'raro': return 'Raro';
      case 'epico': return 'Épico';
      case 'legendario': return 'Legendario';
      default: return 'Común';
    }
  };

  const filteredAchievements = activeCategory === 'todos' 
    ? achievements 
    : achievements.filter(a => a.categoria === activeCategory);

  const totalPuntos = achievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.puntos, 0);

  const progressPercentage = (unlockedAchievements.length / achievements.length) * 100;

  const getNextAchievement = () => {
    const locked = achievements.filter(a => !unlockedAchievements.includes(a.id));
    return locked.reduce((closest, current) => {
      const currentProgress = current.progreso || 0;
      const currentPercent = (currentProgress / current.requisito.valor) * 100;
      const closestProgress = closest?.progreso || 0;
      const closestPercent = closest ? (closestProgress / closest.requisito.valor) * 100 : 0;
      return currentPercent > closestPercent ? current : closest;
    }, null);
  };

  const nextAchievement = getNextAchievement();

  return (
    <>
      <Helmet>
        <title>Logros - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header con estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-4 md:p-6 border border-purple-500/30"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                  Sala de Trofeos
                </h1>
                <p className="text-purple-200 text-sm md:text-base">
                  Cada logro cuenta tu historia de transformación
                </p>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6">
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {unlockedAchievements.length}
                  </div>
                  <p className="text-xs md:text-sm text-purple-200">Desbloqueados</p>
                </motion.div>
                
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                    {totalPuntos}
                  </div>
                  <p className="text-xs md:text-sm text-purple-200">Puntos</p>
                </motion.div>
                
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl md:text-4xl font-bold text-green-400">
                    {Math.round(progressPercentage)}%
                  </div>
                  <p className="text-xs md:text-sm text-purple-200">Completado</p>
                </motion.div>
              </div>
            </div>

            {/* Barra de progreso general */}
            <div className="mt-4 md:mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-purple-200 text-xs md:text-sm">Progreso Total</span>
                <span className="text-white font-bold text-sm md:text-base">
                  {unlockedAchievements.length} / {achievements.length} logros
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2 md:h-3 bg-purple-950" />
            </div>

            {/* Próximo logro */}
            {nextAchievement && (
              <motion.div 
                className="mt-4 p-3 bg-purple-900/30 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-purple-200 text-xs md:text-sm mb-2">Próximo logro más cercano:</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl">{nextAchievement.emoji}</span>
                    <span className="text-white font-medium text-sm md:text-base">
                      {nextAchievement.nombre}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(nextAchievement.progreso / nextAchievement.requisito.valor) * 100} 
                      className="w-20 md:w-24 h-2"
                    />
                    <span className="text-purple-300 text-xs md:text-sm">
                      {nextAchievement.progreso}/{nextAchievement.requisito.valor}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Tabs de categorías */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 w-full bg-purple-800/30">
              {categorias.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id} 
                  className="text-xs md:text-sm data-[state=active]:bg-purple-600"
                >
                  {cat.icono}
                  <span className="hidden md:inline ml-1">{cat.nombre}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAchievements.map((achievement, index) => {
                  const isUnlocked = unlockedAchievements.includes(achievement.id);
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                      whileHover={{ y: -5 }}
                      onMouseEnter={() => setHoveredAchievement(achievement.id)}
                      onMouseLeave={() => setHoveredAchievement(null)}
                    >
                      <Card 
                        className={`
                          relative overflow-hidden cursor-pointer transition-all duration-300 h-full
                          ${isUnlocked 
                            ? 'bg-purple-800/30 border-purple-500/30 hover:bg-purple-800/40' 
                            : 'bg-gray-800/30 border-gray-600/30 opacity-70 hover:opacity-90'}
                          ${hoveredAchievement === achievement.id ? 'ring-2 ring-purple-400' : ''}
                        `}
                        onClick={() => setSelectedAchievement(achievement)}
                      >
                        {/* Badge de rareza */}
                        <div className="absolute top-2 right-2 z-10">
                          <Badge className={`${getRarezaColor(achievement.rareza)} bg-black/50 text-xs`}>
                            {getRarezaLabel(achievement.rareza)}
                          </Badge>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className={`
                                text-4xl md:text-5xl p-2 md:p-3 rounded-xl
                                bg-gradient-to-br ${achievement.color}
                                ${!isUnlocked ? 'filter grayscale' : ''}
                                flex-shrink-0
                              `}
                              animate={isUnlocked && hoveredAchievement === achievement.id ? 
                                { rotate: [0, -10, 10, -10, 0] } : {}
                              }
                              transition={{ duration: 0.5 }}
                            >
                              {achievement.emoji}
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-white text-sm md:text-lg truncate">
                                {achievement.nombre}
                              </CardTitle>
                              <p className="text-purple-200 text-xs md:text-sm mt-1 line-clamp-2">
                                {achievement.descripcion}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                              <span className="text-white font-medium text-xs md:text-sm">
                                {achievement.puntos} pts
                              </span>
                            </div>

                            {achievement.recompensa && (
                              <div className="flex items-center gap-1">
                                <Gift className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                                <span className="text-purple-300 text-xs">
                                  +{achievement.recompensa.valor}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-purple-500/20">
                            {isUnlocked ? (
                              <motion.div 
                                className="flex items-center justify-center gap-2 text-green-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm font-medium">Desbloqueado</span>
                              </motion.div>
                            ) : (
                              <div>
                                <Progress 
                                  value={(achievement.progreso / achievement.requisito.valor) * 100}
                                  className="h-1.5 md:h-2 mb-2"
                                />
                                <div className="flex items-center justify-center gap-2 text-gray-400">
                                  <Lock className="w-3 h-3 md:w-4 md:h-4" />
                                  <span className="text-xs md:text-sm">
                                    {achievement.progreso}/{achievement.requisito.valor}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AchievementsPage;