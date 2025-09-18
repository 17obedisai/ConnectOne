    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Helmet } from 'react-helmet';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { Progress } from '@/components/ui/progress';
    import { 
    Star, Lock, CheckCircle, Trophy, Target, Flame,
    Award, Sparkles, ChevronRight, Zap, Gift, MapPin
    } from 'lucide-react';
    import { useData } from '@/contexts/DataContext';
    import confetti from 'canvas-confetti';

    const ProgressMapPage = () => {
    const { stats } = useData();
    const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
    const [hoveredCheckpoint, setHoveredCheckpoint] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    
    const currentLevel = stats?.level || 1;
    const currentXP = stats?.xp || 80;
    const xpToNext = stats?.xp_to_next_level || 1000;

    useEffect(() => {
        const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Checkpoints con posiciones para curvas (responsive)
    const checkpoints = [
        { 
        id: 1, level: 1, name: 'El Despertar', emoji: '🌅', 
        color: 'from-emerald-400 to-teal-600',
        description: 'Tu viaje comienza aquí', 
        rewards: ['Avatar básico', 'Primera misión'],
        // Desktop positions
        x: 15, y: 85,
        // Mobile positions
        mx: 20, my: 90
        },
        { 
        id: 2, level: 2, name: 'Primeros Pasos', emoji: '👣', 
        color: 'from-blue-400 to-indigo-600',
        description: 'Estableciendo hábitos', 
        rewards: ['Badge de Constancia', '+100 XP'],
        x: 35, y: 75,
        mx: 80, my: 85
        },
        { 
        id: 3, level: 4, name: 'Valle Constancia', emoji: '🏞️', 
        color: 'from-purple-400 to-violet-600',
        description: 'La disciplina se forma',
        rewards: ['Modo Focus', 'Personalización'],
        x: 50, y: 80,
        mx: 20, my: 75
        },
        { 
        id: 4, level: 5, name: 'Río Meditación', emoji: '💧', 
        color: 'from-cyan-400 to-blue-600',
        description: 'Encuentra tu paz', 
        milestone: true,
        rewards: ['Corona bronce', 'Título', '+500 XP'],
        x: 65, y: 65,
        mx: 80, my: 65
        },
        { 
        id: 5, level: 7, name: 'Bosque Conocimiento', emoji: '🌳', 
        color: 'from-green-400 to-emerald-600',
        description: 'Aprende y crece',
        rewards: ['Biblioteca', 'Mentor AI'],
        x: 45, y: 50,
        mx: 20, my: 55
        },
        { 
        id: 6, level: 9, name: 'Montaña Desafío', emoji: '🏔️', 
        color: 'from-orange-400 to-red-600',
        description: 'Supera límites',
        rewards: ['Rutinas avanzadas', 'Modo extremo'],
        x: 30, y: 40,
        mx: 80, my: 45
        },
        { 
        id: 7, level: 10, name: 'Templo Equilibrio', emoji: '⛩️', 
        color: 'from-red-400 to-pink-600',
        description: 'Maestría bienestar', 
        milestone: true,
        rewards: ['Corona plata', 'Aura', '+1000 XP'],
        x: 50, y: 30,
        mx: 20, my: 35
        },
        { 
        id: 8, level: 12, name: 'Jardín Gratitud', emoji: '🌸', 
        color: 'from-pink-400 to-rose-600',
        description: 'Cultiva felicidad',
        rewards: ['Jardín zen', 'Mascotas'],
        x: 70, y: 25,
        mx: 80, my: 25
        },
        { 
        id: 9, level: 15, name: 'Ciudadela Mentor', emoji: '🏰', 
        color: 'from-indigo-400 to-purple-600',
        description: 'Guía a otros', 
        milestone: true,
        rewards: ['Corona oro', 'Modo mentor'],
        x: 85, y: 15,
        mx: 20, my: 15
        },
        { 
        id: 10, level: 20, name: 'Reino Leyenda', emoji: '👑', 
        color: 'from-yellow-400 to-amber-600',
        description: 'Maestría total', 
        milestone: true,
        rewards: ['Corona legendaria', 'Status eterno'],
        x: 50, y: 5,
        mx: 50, my: 5
        }
    ];

    const progressPercentage = (currentLevel / 20) * 100;
    const completedCheckpoints = checkpoints.filter(cp => cp.level <= currentLevel).length;

    const handleCheckpointClick = (checkpoint) => {
        setSelectedCheckpoint(checkpoint);
        
        if (checkpoint.level <= currentLevel && checkpoint.milestone) {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']
        });
        }
    };

    const getCurrentPosition = () => {
        const index = checkpoints.findIndex(cp => cp.level > currentLevel);
        if (index === -1) return checkpoints.length - 1;
        return Math.max(0, index - 1);
    };

    const currentPosition = getCurrentPosition();

    return (
        <>
        <Helmet>
            <title>Mapa de Progreso - ConnectONE</title>
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
            >
            <Card className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur border-purple-500/30">
                <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                    <CardTitle className="text-2xl md:text-3xl text-white flex items-center gap-3">
                        <MapPin className="w-6 md:w-8 h-6 md:h-8 text-purple-400" />
                        Tu Camino de Transformación
                    </CardTitle>
                    <p className="text-purple-200 mt-2 text-sm md:text-base">
                        Cada paso te acerca más a tu mejor versión
                    </p>
                    </div>
                    
                    <div className="flex gap-4 md:gap-6">
                    <div className="text-center">
                        <motion.div 
                        className="text-3xl md:text-4xl font-bold text-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        >
                        {currentLevel}
                        </motion.div>
                        <p className="text-xs md:text-sm text-purple-200">Nivel</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                        {completedCheckpoints}/10
                        </div>
                        <p className="text-xs md:text-sm text-purple-200">Logrados</p>
                    </div>
                    </div>
                </div>

                <div className="mt-4 md:mt-6">
                    <div className="flex justify-between mb-2">
                    <span className="text-purple-200 text-sm">Progreso Total</span>
                    <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 md:h-4 bg-purple-950" />
                </div>
                </CardHeader>
            </Card>
            </motion.div>

            {/* Mapa principal */}
            <Card className="bg-slate-900/80 backdrop-blur border-purple-500/30 overflow-hidden">
            <CardContent className="p-0">
                <div className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-4 md:p-8 overflow-x-auto">
                
                {/* SVG Path Curvo Responsive */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
                    </linearGradient>
                    </defs>
                    
                    {/* Camino curvo serpenteante */}
                    <path
                    d={isMobile ? 
                        // Mobile: zigzag vertical
                        "M 20 90 Q 50 85, 80 85 T 80 75 Q 50 75, 20 75 T 20 65 Q 50 65, 80 65 T 80 55 Q 50 55, 20 55 T 20 45 Q 50 45, 80 45 T 80 35 Q 50 35, 20 35 T 20 25 Q 50 25, 80 25 T 80 15 Q 50 15, 20 15 T 20 5 Q 35 5, 50 5"
                        : 
                        // Desktop: camino curvo más elaborado
                        "M 15 85 Q 25 80, 35 75 T 50 80 Q 60 75, 65 65 T 45 50 Q 35 45, 30 40 T 50 30 Q 65 28, 70 25 T 85 15 Q 75 10, 50 5"
                    }
                    stroke="url(#pathGradient)"
                    strokeWidth={isMobile ? "1" : "0.5"}
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                    />
                    
                    {/* Camino completado */}
                    <path
                    d={isMobile ? 
                        "M 20 90 Q 50 85, 80 85 T 80 75 Q 50 75, 20 75 T 20 65 Q 50 65, 80 65 T 80 55 Q 50 55, 20 55 T 20 45 Q 50 45, 80 45 T 80 35 Q 50 35, 20 35 T 20 25 Q 50 25, 80 25 T 80 15 Q 50 15, 20 15 T 20 5 Q 35 5, 50 5"
                        : 
                        "M 15 85 Q 25 80, 35 75 T 50 80 Q 60 75, 65 65 T 45 50 Q 35 45, 30 40 T 50 30 Q 65 28, 70 25 T 85 15 Q 75 10, 50 5"
                    }
                    stroke="url(#pathGradient)"
                    strokeWidth={isMobile ? "1.5" : "0.8"}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    strokeDashoffset={100 - progressPercentage}
                    />
                </svg>

                {/* Checkpoints */}
                {checkpoints.map((checkpoint, index) => {
                    const isCompleted = checkpoint.level <= currentLevel;
                    const isCurrent = index === currentPosition;
                    const xPos = isMobile ? checkpoint.mx : checkpoint.x;
                    const yPos = isMobile ? checkpoint.my : checkpoint.y;
                    
                    return (
                    <motion.div
                        key={checkpoint.id}
                        className="absolute"
                        style={{ 
                        left: `${xPos}%`, 
                        top: `${yPos}%`,
                        transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => !isMobile && setHoveredCheckpoint(checkpoint)}
                        onMouseLeave={() => !isMobile && setHoveredCheckpoint(null)}
                        onClick={() => handleCheckpointClick(checkpoint)}
                    >
                        <motion.div
                        className={`relative cursor-pointer ${checkpoint.milestone ? 'scale-110 md:scale-125' : ''}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        {/* Aura para checkpoint actual */}
                        {isCurrent && (
                            <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            >
                            <div className="w-full h-full rounded-full bg-purple-500" />
                            </motion.div>
                        )}

                        {/* Círculo del checkpoint */}
                        <div className={`
                            relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                            ${isCompleted 
                            ? `bg-gradient-to-br ${checkpoint.color} shadow-2xl` 
                            : 'bg-gray-700 opacity-60'
                            }
                            ${checkpoint.milestone ? 'ring-2 md:ring-4 ring-yellow-400 ring-offset-2 md:ring-offset-4 ring-offset-transparent' : ''}
                        `}>
                            <span className="text-2xl md:text-3xl">
                            {isCompleted ? checkpoint.emoji : '🔒'}
                            </span>
                        </div>

                        {/* Badge de hito */}
                        {checkpoint.milestone && isCompleted && (
                            <motion.div 
                            className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            >
                            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                            </motion.div>
                        )}

                        {/* Indicador "Estás aquí" con panda más grande */}
                        {isCurrent && (
                            <motion.div 
                            className="absolute -bottom-12 md:-bottom-14 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            >
                            <Badge className="bg-purple-600 text-white px-2 md:px-3 py-1 md:py-2">
                                <img 
                                src="/images/panda-logo.png" 
                                alt="Tu posición" 
                                className="w-6 h-6 md:w-8 md:h-8 mr-1"
                                />
                                <span className="text-xs md:text-sm">Aquí</span>
                            </Badge>
                            </motion.div>
                        )}
                        </motion.div>

                        {/* Nombre del checkpoint */}
                        {(!isMobile || isCurrent) && (
                        <>
                            <p className={`
                            text-center mt-2 font-bold text-xs md:text-sm
                            ${isCompleted ? 'text-white' : 'text-gray-400'}
                            `}>
                            {checkpoint.name}
                            </p>
                            <p className="text-center text-xs text-gray-500">
                            Nivel {checkpoint.level}
                            </p>
                        </>
                        )}
                    </motion.div>
                    );
                })}
                
                {/* Tooltip para desktop */}
                {!isMobile && (
                    <AnimatePresence>
                    {hoveredCheckpoint && (
                        <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
                        >
                        <Card className="bg-purple-900/95 border-purple-500/50 backdrop-blur">
                            <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{hoveredCheckpoint.emoji}</span>
                                <div className="flex-1">
                                <p className="text-white font-bold">{hoveredCheckpoint.name}</p>
                                <p className="text-purple-200 text-sm">{hoveredCheckpoint.description}</p>
                                {hoveredCheckpoint.rewards && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                    {hoveredCheckpoint.rewards.map((reward, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                        {reward}
                                        </Badge>
                                    ))}
                                    </div>
                                )}
                                </div>
                                {hoveredCheckpoint.level <= currentLevel ? (
                                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                                ) : (
                                <Lock className="w-8 h-8 text-gray-400 flex-shrink-0" />
                                )}
                            </div>
                            </CardContent>
                        </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>
                )}
                </div>
            </CardContent>
            </Card>

            {/* Panel de información (solo mobile cuando se selecciona) */}
            <AnimatePresence>
            {selectedCheckpoint && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
                >
                <Card className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur border-purple-500/30">
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                        <div className={`
                            w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${selectedCheckpoint.color} 
                            flex items-center justify-center shadow-xl
                        `}>
                            <span className="text-3xl md:text-4xl">{selectedCheckpoint.emoji}</span>
                        </div>
                        <div>
                            <CardTitle className="text-xl md:text-2xl text-white">
                            {selectedCheckpoint.name}
                            </CardTitle>
                            <p className="text-purple-200 text-sm md:text-base">{selectedCheckpoint.description}</p>
                        </div>
                        </div>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCheckpoint(null)}
                        className="text-white hover:bg-purple-700"
                        >
                        ✕
                        </Button>
                    </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div>
                        <p className="text-purple-200 mb-3 flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        Recompensas:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                        {selectedCheckpoint.rewards?.map((reward, i) => (
                            <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            >
                            <Badge className="p-2 md:p-3 bg-purple-700/50 text-white border-purple-500 w-full">
                                <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                                {reward}
                            </Badge>
                            </motion.div>
                        ))}
                        </div>
                    </div>

                    {selectedCheckpoint.level <= currentLevel ? (
                        <motion.div 
                        className="flex items-center gap-3 p-3 md:p-4 bg-green-500/20 rounded-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        >
                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                        <div>
                            <p className="text-green-400 font-bold">¡Completado!</p>
                            <p className="text-green-300 text-xs md:text-sm">Todas las recompensas desbloqueadas</p>
                        </div>
                        </motion.div>
                    ) : (
                        <div className="p-3 md:p-4 bg-purple-700/30 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-purple-200">Nivel {selectedCheckpoint.level} requerido</p>
                            <p className="text-purple-300 text-xs md:text-sm mt-1">
                                Te faltan {selectedCheckpoint.level - currentLevel} niveles
                            </p>
                            </div>
                            <Lock className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                        </div>
                        </div>
                    )}

                    {selectedCheckpoint.milestone && (
                        <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                            <div>
                            <p className="text-yellow-400 font-bold">¡Hito Principal!</p>
                            <p className="text-yellow-300 text-xs md:text-sm">
                                Logro especial en tu transformación
                            </p>
                            </div>
                        </div>
                        </div>
                    )}
                    </CardContent>
                </Card>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        </>
    );
    };

    export default ProgressMapPage;