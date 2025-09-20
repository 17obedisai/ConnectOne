import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Lock, CheckCircle, Star, Trophy, Sparkles, 
  ChevronLeft, ChevronRight, Zap, Heart, Brain
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const ProgressMapPage = () => {
  const navigate = useNavigate();
  const { stats } = useData();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [mapScale, setMapScale] = useState(1);
  const mapRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Ajustar escala según tamaño de pantalla
      if (window.innerWidth < 640) {
        setMapScale(0.6);
      } else if (window.innerWidth < 1024) {
        setMapScale(0.8);
      } else {
        setMapScale(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentLevel = stats?.level || 1;
  
  const levels = [
    { id: 1, name: 'El Despertar', x: 50, y: 85, unlocked: true },
    { id: 2, name: 'Primeros Pasos', x: 30, y: 75, unlocked: currentLevel >= 1 },
    { id: 3, name: 'Valle Constancia', x: 60, y: 65, unlocked: currentLevel >= 2 },
    { id: 4, name: 'Río Meditación', x: 40, y: 55, unlocked: currentLevel >= 3 },
    { id: 5, name: 'Bosque Conocimiento', x: 70, y: 45, unlocked: currentLevel >= 4 },
    { id: 6, name: 'Montaña Desafío', x: 35, y: 35, unlocked: currentLevel >= 5 },
    { id: 7, name: 'Jardín Gratitud', x: 65, y: 30, unlocked: currentLevel >= 6 },
    { id: 8, name: 'Templo Equilibrio', x: 45, y: 20, unlocked: currentLevel >= 7 },
    { id: 9, name: 'Ciudad Mentor', x: 25, y: 15, unlocked: currentLevel >= 8 },
    { id: 10, name: 'Reino Leyenda', x: 55, y: 10, unlocked: currentLevel >= 9 }
  ];

  // Elementos decorativos
  const decorations = [
    { type: 'tree', x: 20, y: 80, icon: '🌲' },
    { type: 'tree', x: 75, y: 70, icon: '🌳' },
    { type: 'flower', x: 45, y: 60, icon: '🌸' },
    { type: 'butterfly', x: 35, y: 50, icon: '🦋' },
    { type: 'bird', x: 80, y: 40, icon: '🦜' },
    { type: 'waterfall', x: 50, y: 40, icon: '💧' },
    { type: 'rainbow', x: 60, y: 25, icon: '🌈' },
    { type: 'star', x: 30, y: 25, icon: '✨' },
    { type: 'cloud', x: 70, y: 15, icon: '☁️' },
    { type: 'sun', x: 85, y: 10, icon: '☀️' },
    { type: 'mountain', x: 15, y: 30, icon: '⛰️' },
    { type: 'castle', x: 90, y: 20, icon: '🏰' }
  ];

  // Animación de partículas
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5
  }));

  return (
    <>
      <Helmet>
        <title>Mapa de Progreso - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-4 md:p-6 border border-purple-500/30 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                  Tu Camino de Transformación
                </h1>
                <p className="text-purple-200 text-sm md:text-base mt-1">
                  Cada paso te acerca más a tu mejor versión
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {currentLevel}
                  </p>
                  <p className="text-xs md:text-sm text-purple-200">Nivel</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-yellow-400">
                    {levels.filter(l => l.unlocked).length}/{levels.length}
                  </p>
                  <p className="text-xs md:text-sm text-purple-200">Logrados</p>
                </div>
              </div>
            </div>
            
            <Progress 
              value={(currentLevel / levels.length) * 100} 
              className="h-2 mt-4"
            />
            <p className="text-center text-purple-300 text-xs md:text-sm mt-2">
              Progreso Total: {Math.round((currentLevel / levels.length) * 100)}%
            </p>
          </motion.div>

          {/* Mapa Principal */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30 overflow-hidden">
            <div 
              ref={mapRef}
              className="relative w-full"
              style={{ 
                height: isMobile ? '500px' : '700px',
                transform: `scale(${mapScale})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Fondo con gradiente animado */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-indigo-900/50" />
                
                {/* Partículas animadas */}
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      delay: particle.delay,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>

              {/* Decoraciones del mapa */}
              {decorations.map((deco, index) => (
                <motion.div
                  key={`deco-${index}`}
                  className="absolute text-2xl md:text-3xl"
                  style={{
                    left: `${deco.x}%`,
                    top: `${deco.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: deco.type === 'butterfly' ? [0, 10, -10, 0] : 0
                  }}
                  transition={{
                    duration: 4,
                    delay: index * 0.2,
                    repeat: Infinity
                  }}
                >
                  {deco.icon}
                </motion.div>
              ))}

              {/* Camino SVG */}
              <svg className="absolute inset-0 w-full h-full">
                {levels.slice(0, -1).map((level, index) => {
                  const nextLevel = levels[index + 1];
                  return (
                    <motion.line
                      key={`path-${index}`}
                      x1={`${level.x}%`}
                      y1={`${level.y}%`}
                      x2={`${nextLevel.x}%`}
                      y2={`${nextLevel.y}%`}
                      stroke={level.unlocked && nextLevel.unlocked ? "#a78bfa" : "#4c1d95"}
                      strokeWidth={isMobile ? "2" : "3"}
                      strokeDasharray={level.unlocked && nextLevel.unlocked ? "0" : "5 5"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: index * 0.1 }}
                    />
                  );
                })}
              </svg>

              {/* Nodos del mapa */}
              {levels.map((level, index) => (
                <motion.div
                  key={level.id}
                  className="absolute"
                  style={{
                    left: `${level.x}%`,
                    top: `${level.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLevel(level)}
                    className={`
                      relative w-12 h-12 md:w-16 md:h-16 rounded-full
                      flex items-center justify-center
                      transition-all duration-300 cursor-pointer
                      ${level.id === currentLevel 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50' 
                        : level.unlocked
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                          : 'bg-gray-700/50'}
                    `}
                  >
                    {level.id === currentLevel ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-2xl md:text-3xl">🐼</span>
                      </motion.div>
                    ) : level.unlocked ? (
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <Lock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    )}
                    
                    {level.id === currentLevel && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-yellow-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                  
                  <motion.div 
                    className="mt-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <p className={`
                      text-xs md:text-sm font-bold
                      ${level.unlocked ? 'text-white' : 'text-gray-500'}
                    `}>
                      {level.name}
                    </p>
                    <p className={`
                      text-xs
                      ${level.unlocked ? 'text-purple-300' : 'text-gray-600'}
                    `}>
                      Nivel {level.id}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </Card>

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
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedLevel.name}
                  </h3>
                  <Badge className="mb-4">Nivel {selectedLevel.id}</Badge>
                  
                  <p className="text-purple-200 mb-4">
                    {selectedLevel.unlocked 
                      ? 'Has completado este nivel. ¡Sigue adelante!' 
                      : 'Este nivel aún está bloqueado. ¡Continúa tu progreso para desbloquearlo!'}
                  </p>
                  
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedLevel(null)}
                  >
                    Cerrar
                  </Button>
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