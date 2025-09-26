import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Clock, Star, Zap, Trophy, Gift, 
  CheckCircle, PlayCircle, X, ChevronRight,
  Sparkles, Heart, Brain, Dumbbell, Users,
  Book, Coffee, Moon
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const MissionsPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { stats, completedMissions = [], updateMissionProgress } = useData();
  const [selectedMission, setSelectedMission] = useState(location.state?.selectedMission || null);
  const [activeMissions, setActiveMissions] = useState([]);
  const [missionProgress, setMissionProgress] = useState({});

  // TODAS LAS MISIONES CON ESTILO DEL DASHBOARD
  const allMissions = [
    {
      id: 'm1',
      titulo: 'Meditación Matutina',
      descripcion: '10 minutos de mindfulness para empezar el día',
      duracion: '10 min',
      xp: 50,
      categoria: 'meditacion',
      emoji: '🧘',
      color: 'from-purple-500 to-violet-600',
      instrucciones: [
        'Encuentra un lugar tranquilo y cómodo',
        'Siéntate con la espalda recta',
        'Cierra los ojos y respira profundamente',
        'Sigue la respiración guiada durante 10 minutos',
        'Termina con gratitud por el nuevo día'
      ],
      beneficios: ['Reduce estrés', 'Mejora concentración', 'Aumenta bienestar', 'Claridad mental'],
      dificultad: 'Fácil'
    },
    {
      id: 'm2',
      titulo: 'HIIT Express',
      descripcion: 'Entrenamiento intenso de 7 minutos',
      duracion: '7 min',
      xp: 100,
      categoria: 'ejercicio',
      emoji: '⚡',
      color: 'from-orange-500 to-red-600',
      instrucciones: [
        '30 segundos de jumping jacks',
        '30 segundos de sentadillas',
        '30 segundos de flexiones',
        '30 segundos de mountain climbers',
        '10 segundos de descanso entre ejercicios',
        'Repite el circuito 2 veces'
      ],
      beneficios: ['Quema calorías', 'Mejora resistencia', 'Fortalece músculos', 'Acelera metabolismo'],
      dificultad: 'Media'
    },
    {
      id: 'm3',
      titulo: 'Lectura Reflexiva',
      descripcion: '20 minutos de lectura consciente',
      duracion: '20 min',
      xp: 60,
      categoria: 'desarrollo',
      emoji: '📚',
      color: 'from-blue-500 to-cyan-600',
      instrucciones: [
        'Elige un libro inspirador o educativo',
        'Encuentra un lugar sin distracciones',
        'Lee durante 20 minutos sin interrupciones',
        'Toma notas de ideas importantes',
        'Reflexiona 5 minutos sobre lo aprendido'
      ],
      beneficios: ['Expande conocimiento', 'Mejora vocabulario', 'Estimula creatividad', 'Reduce estrés'],
      dificultad: 'Fácil'
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
      instrucciones: [
        'Piensa en alguien importante para ti',
        'Llámale sin esperar nada a cambio',
        'Pregunta genuinamente cómo está',
        'Escucha activamente sus respuestas',
        'Comparte algo positivo de tu día'
      ],
      beneficios: ['Fortalece vínculos', 'Reduce soledad', 'Aumenta felicidad', 'Mejora empatía'],
      dificultad: 'Fácil'
    },
    {
      id: 'm5',
      titulo: 'Gratitud Nocturna',
      descripcion: 'Escribe 3 cosas por las que estás agradecido',
      duracion: '5 min',
      xp: 30,
      categoria: 'bienestar',
      emoji: '🙏',
      color: 'from-green-500 to-emerald-600',
      instrucciones: [
        'Toma un diario o libreta especial',
        'Reflexiona sobre tu día',
        'Escribe 3 cosas por las que estás agradecido',
        'Sé específico y detallado',
        'Siente la gratitud en tu corazón'
      ],
      beneficios: ['Mejora positividad', 'Reduce ansiedad', 'Mejor sueño', 'Aumenta satisfacción'],
      dificultad: 'Fácil'
    },
    {
      id: 'm6',
      titulo: 'Desafío de Hidratación',
      descripcion: 'Bebe 8 vasos de agua durante el día',
      duracion: 'Todo el día',
      xp: 45,
      categoria: 'salud',
      emoji: '💧',
      color: 'from-cyan-500 to-blue-600',
      instrucciones: [
        'Comienza con un vaso al despertar',
        'Bebe un vaso antes de cada comida',
        'Mantén una botella de agua contigo',
        'Establece recordatorios cada 2 horas',
        'Termina con un vaso antes de dormir'
      ],
      beneficios: ['Mejora energía', 'Piel saludable', 'Mejor digestión', 'Elimina toxinas'],
      dificultad: 'Media'
    }
  ];

  useEffect(() => {
    // Si viene una misión seleccionada desde el dashboard
    if (location.state?.selectedMission) {
      const mission = allMissions.find(m => m.id === location.state.selectedMission.id);
      if (mission) {
        setSelectedMission(mission);
      }
    }

    // Simular misiones activas del día
    const todayMissions = allMissions.slice(0, 5);
    setActiveMissions(todayMissions);
    
    // Cargar progreso
    const savedProgress = localStorage.getItem('missionProgress');
    if (savedProgress) {
      setMissionProgress(JSON.parse(savedProgress));
    }
  }, [location]);

  const handleStartMission = (mission) => {
    setSelectedMission(mission);
    toast({
      title: "¡Misión iniciada!",
      description: `${mission.titulo} - ${mission.duracion}`
    });
  };

  const handleCompleteMission = (mission) => {
    const newProgress = { ...missionProgress, [mission.id]: true };
    setMissionProgress(newProgress);
    localStorage.setItem('missionProgress', JSON.stringify(newProgress));
    
    updateMissionProgress(mission.id, true);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "¡Misión completada!",
      description: `Has ganado ${mission.xp} XP`
    });
    
    setSelectedMission(null);
  };

  const completedToday = Object.keys(missionProgress).filter(id => missionProgress[id]).length;
  const progressPercentage = (completedToday / activeMissions.length) * 100;

  return (
    <>
      <Helmet>
        <title>Misiones - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header con estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Target className="w-8 h-8 text-purple-400" />
                  Misiones del Día
                </h1>
                <p className="text-purple-200 mt-1">
                  Completa misiones para ganar XP y subir de nivel
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{completedToday}</p>
                  <p className="text-sm text-purple-200">Completadas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{activeMissions.length}</p>
                  <p className="text-sm text-purple-200">Disponibles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {activeMissions.reduce((sum, m) => sum + (missionProgress[m.id] ? m.xp : 0), 0)}
                  </p>
                  <p className="text-sm text-purple-200">XP Ganado</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-purple-200">Progreso diario</span>
                <span className="text-white font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </motion.div>

          {/* Grid de misiones con estilo del dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allMissions.map((mision, index) => {
              const isCompleted = missionProgress[mision.id];
              
              return (
                <motion.div
                  key={mision.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => !isCompleted && setSelectedMission(mision)}
                  className="cursor-pointer"
                >
                  <Card className={`
                    bg-gradient-to-br ${mision.color} border-0 hover:shadow-xl transition-all
                    ${isCompleted ? 'opacity-70 ring-2 ring-green-400' : ''}
                  `}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl">{mision.emoji}</span>
                        <Badge className="bg-white/20 text-white">
                          +{mision.xp} XP
                        </Badge>
                      </div>
                      
                      <h3 className="text-white font-bold text-lg mb-1">
                        {mision.titulo}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        {mision.descripcion}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-white/60" />
                          <span className="text-white/60 text-sm">{mision.duracion}</span>
                        </div>
                        
                        {isCompleted ? (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completada
                          </Badge>
                        ) : (
                          <Badge className="bg-white/20 text-white">
                            {mision.dificultad}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de detalle de misión */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
            onClick={() => setSelectedMission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className={`bg-gradient-to-br ${selectedMission.color} border-0`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{selectedMission.emoji}</span>
                      <div>
                        <CardTitle className="text-2xl text-white">
                          {selectedMission.titulo}
                        </CardTitle>
                        <p className="text-white/80 mt-1">{selectedMission.descripcion}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedMission(null)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Instrucciones
                    </h4>
                    <ol className="space-y-2">
                      {selectedMission.instrucciones.map((paso, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-2 text-white/90 text-sm"
                        >
                          <span className="text-white/60">{i + 1}.</span>
                          {paso}
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Beneficios
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMission.beneficios.map((beneficio, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-white/90 text-sm">{beneficio}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-white/60 text-xs">Duración</p>
                        <p className="text-white font-bold">{selectedMission.duracion}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Recompensa</p>
                        <p className="text-white font-bold">+{selectedMission.xp} XP</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Dificultad</p>
                        <p className="text-white font-bold">{selectedMission.dificultad}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {missionProgress[selectedMission.id] ? (
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        disabled
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Misión Completada
                      </Button>
                    ) : (
                      <>
                        <Button 
                          className="flex-1 bg-white text-purple-600 hover:bg-purple-50"
                          onClick={() => handleStartMission(selectedMission)}
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Comenzar Misión
                        </Button>
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleCompleteMission(selectedMission)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Marcar Completada
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MissionsPage;