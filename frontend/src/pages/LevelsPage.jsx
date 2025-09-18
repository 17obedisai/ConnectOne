import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, Lock, Gift, Trophy, Sparkles, ChevronRight, 
  Award, Zap, Crown, Shield, Gem, MapPin
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { levelData, getLevelRewards } from '@/config/levels.js';
import { getLevelImage } from '@/config/levelImages';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { stats, loading } = useData();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
      </div>
    );
  }

  const userLevel = stats.level;
  const currentXP = stats.xp || 0;
  const nextLevelData = levelData.find(l => l.level === userLevel + 1);
  const progressToNext = nextLevelData 
    ? ((currentXP / nextLevelData.xpThreshold) * 100)
    : 100;

  const getRewardDetails = (level) => {
    const rewards = getLevelRewards(level);
    return rewards.map(r => ({
      name: r.name,
      icon: r.type === 'badge' ? '🏅' : 
            r.type === 'theme' ? '🎨' : 
            r.type === 'panda' ? '🐼' : '🎁'
    }));
  };

  const getLevelStatus = (level) => {
    if (level < userLevel) return 'completado';
    if (level === userLevel) return 'actual';
    if (level === userLevel + 1) return 'siguiente';
    return 'bloqueado';
  };

  const getLevelColor = (status) => {
    switch(status) {
      case 'completado': return 'from-green-500 to-emerald-600';
      case 'actual': return 'from-purple-500 to-indigo-600';
      case 'siguiente': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <>
      <Helmet>
        <title>Evolución de Energiko - ConnectONE</title>
        <meta name="description" content="Observa la evolución de tu compañero Energiko" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header con progreso actual */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  La Evolución de Energiko
                </h1>
                <p className="text-purple-200">
                  Tu compañero evoluciona contigo en cada paso del viaje
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <motion.div 
                    className="text-4xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {userLevel}
                  </motion.div>
                  <p className="text-sm text-purple-200">Nivel Actual</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    {currentXP}
                  </div>
                  <p className="text-sm text-purple-200">XP Total</p>
                </div>
              </div>
            </div>

            {/* Barra de progreso al siguiente nivel */}
            {nextLevelData && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-purple-200 text-sm">Progreso al nivel {userLevel + 1}</span>
                  <span className="text-white font-bold">
                    {currentXP} / {nextLevelData.xpThreshold} XP
                  </span>
                </div>
                <Progress value={progressToNext} className="h-3 bg-purple-950" />
                <p className="text-center text-purple-300 text-sm mt-2">
                  Te faltan {nextLevelData.xpThreshold - currentXP} XP para el próximo nivel
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Grid de niveles mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {levelData.map((levelInfo, index) => {
              const status = getLevelStatus(levelInfo.level);
              const isUnlocked = status !== 'bloqueado';
              const rewards = getRewardDetails(levelInfo.level);
              
              return (
                <motion.div
                  key={levelInfo.level}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  onMouseEnter={() => setHoveredLevel(levelInfo.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className={`
                      relative overflow-hidden cursor-pointer transition-all duration-300
                      ${isUnlocked 
                        ? 'bg-purple-800/30 border-purple-500/30 hover:bg-purple-800/40' 
                        : 'bg-gray-800/30 border-gray-600/30 opacity-70'}
                      ${status === 'actual' ? 'ring-2 ring-purple-400 shadow-lg shadow-purple-500/30' : ''}
                    `}
                    onClick={() => setSelectedLevel(levelInfo)}
                  >
                    {/* Efecto de brillo para nivel actual */}
                    {status === 'actual' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-shimmer" />
                    )}

                    {/* Badge de estado */}
                    {status === 'actual' && (
                      <motion.div 
                        className="absolute top-2 right-2 z-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge className="bg-purple-600 text-white">
                          <Zap className="w-3 h-3 mr-1" />
                          Actual
                        </Badge>
                      </motion.div>
                    )}

                    <CardHeader className="text-center pb-2">
                      {/* Imagen del panda con efectos */}
                      <motion.div 
                        className="relative mx-auto"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`
                          w-28 h-28 rounded-full p-2
                          bg-gradient-to-br ${getLevelColor(status)}
                          ${isUnlocked ? 'shadow-lg' : ''}
                        `}>
                          <img
                            src={getLevelImage(levelInfo.level)}
                            alt={`Nivel ${levelInfo.level}`}
                            className={`
                              w-full h-full object-contain
                              ${!isUnlocked ? 'filter grayscale' : ''}
                            `}
                          />
                        </div>
                        
                        {/* Indicador de nivel */}
                        <div className={`
                          absolute -bottom-2 left-1/2 transform -translate-x-1/2
                          px-3 py-1 rounded-full text-white text-sm font-bold
                          bg-gradient-to-r ${getLevelColor(status)}
                        `}>
                          Lv. {levelInfo.level}
                        </div>
                      </motion.div>

                      <CardTitle className="text-white mt-4 text-lg">
                        {levelInfo.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Recompensas */}
                      <div className="space-y-2">
                        {rewards.slice(0, 2).map((reward, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 text-sm text-purple-200"
                          >
                            <span className="text-lg">{reward.icon}</span>
                            <span className="truncate">{reward.name}</span>
                          </div>
                        ))}
                        {rewards.length > 2 && (
                          <p className="text-xs text-purple-300">
                            +{rewards.length - 2} recompensas más
                          </p>
                        )}
                      </div>

                      {/* Estado del nivel */}
                      <div className="pt-2 border-t border-purple-500/20">
                        {status === 'completado' ? (
                          <div className="flex items-center justify-center gap-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Desbloqueado</span>
                          </div>
                        ) : status === 'actual' ? (
                          <div className="flex items-center justify-center gap-2 text-purple-300">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">Nivel Actual</span>
                          </div>
                        ) : status === 'siguiente' ? (
                          <div className="flex items-center justify-center gap-2 text-yellow-400">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Próximo</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-gray-400">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">{levelInfo.xpThreshold} XP</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Modal de detalle del nivel */}
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
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <img
                      src={getLevelImage(selectedLevel.level)}
                      alt={selectedLevel.name}
                      className="w-32 h-32 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedLevel.name}
                    </h3>
                    <Badge className="mb-4">Nivel {selectedLevel.level}</Badge>
                    
                    <div className="space-y-3 mt-6">
                      <h4 className="text-white font-semibold flex items-center justify-center gap-2">
                        <Gift className="w-5 h-5 text-yellow-400" />
                        Recompensas
                      </h4>
                      {getRewardDetails(selectedLevel.level).map((reward, i) => (
                        <div key={i} className="flex items-center justify-center gap-2 text-purple-200">
                          <span className="text-xl">{reward.icon}</span>
                          <span>{reward.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setSelectedLevel(null)}
                      className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default LevelsPage;