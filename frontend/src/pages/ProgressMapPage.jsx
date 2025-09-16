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
    
    const currentLevel = stats?.level || 1;
    const currentXP = stats?.xp || 80;
    const xpToNext = stats?.xp_to_next_level || 1000;

    // Checkpoints con mejor diseño
    const checkpoints = [
        { 
        id: 1, level: 1, name: 'El Despertar', emoji: '🌅', 
        color: 'from-emerald-400 to-teal-600',
        bgColor: '#065F46',
        description: 'Tu viaje comienza aquí', 
        rewards: ['Avatar básico', 'Primera misión'],
        x: 10, y: 85 
        },
        { 
        id: 2, level: 2, name: 'Primeros Pasos', emoji: '👣', 
        color: 'from-blue-400 to-indigo-600',
        bgColor: '#1E3A8A',
        description: 'Estableciendo hábitos básicos', 
        rewards: ['Badge de Constancia', '+100 XP'],
        x: 20, y: 75 
        },
        { 
        id: 3, level: 4, name: 'Valle de la Constancia', emoji: '🏞️', 
        color: 'from-purple-400 to-violet-600',
        bgColor: '#6B21A8',
        description: 'La disciplina se vuelve natural',
        rewards: ['Modo Focus', 'Personalización'],
        x: 30, y: 70 
        },
        { 
        id: 4, level: 5, name: 'Río de la Meditación', emoji: '💧', 
        color: 'from-cyan-400 to-blue-600',
        bgColor: '#0369A1',
        description: 'Encuentra tu paz interior', 
        milestone: true,
        rewards: ['Corona de bronce', 'Título especial', '+500 XP'],
        x: 40, y: 60 
        },
        { 
        id: 5, level: 7, name: 'Bosque del Conocimiento', emoji: '🌳', 
        color: 'from-green-400 to-emerald-600',
        bgColor: '#047857',
        description: 'Aprende y crece cada día',
        rewards: ['Biblioteca desbloqueada', 'Mentor AI'],
        x: 50, y: 55 
        },
        { 
        id: 6, level: 9, name: 'Montaña del Desafío', emoji: '🏔️', 
        color: 'from-orange-400 to-red-600',
        bgColor: '#DC2626',
        description: 'Supera tus límites',
        rewards: ['Rutinas avanzadas', 'Modo extremo'],
        x: 60, y: 45 
        },
        { 
        id: 7, level: 10, name: 'Templo del Equilibrio', emoji: '⛩️', 
        color: 'from-red-400 to-pink-600',
        bgColor: '#BE185D',
        description: 'Maestría en bienestar', 
        milestone: true,
        rewards: ['Corona de plata', 'Aura especial', '+1000 XP'],
        x: 70, y: 35 
        },
        { 
        id: 8, level: 12, name: 'Jardín de Gratitud', emoji: '🌸', 
        color: 'from-pink-400 to-rose-600',
        bgColor: '#E11D48',
        description: 'Cultiva la felicidad',
        rewards: ['Jardín zen', 'Mascotas virtuales'],
        x: 75, y: 30 
        },
        { 
        id: 9, level: 15, name: 'Ciudadela del Mentor', emoji: '🏰', 
        color: 'from-indigo-400 to-purple-600',
        bgColor: '#7C3AED',
        description: 'Guía a otros', 
        milestone: true,
        rewards: ['Corona de oro', 'Modo mentor', 'Crear grupos'],
        x: 85, y: 20 
        },
        { 
        id: 10, level: 20, name: 'Reino de la Leyenda', emoji: '👑', 
        color: 'from-yellow-400 to-amber-600',
        bgColor: '#F59E0B',
        description: 'Has alcanzado la maestría', 
        milestone: true,
        rewards: ['Corona legendaria', 'Status eterno', 'Modo infinito'],
        x: 95, y: 10 
        }
    ];

    const progressPercentage = (currentLevel / 20) * 100;
    const completedCheckpoints = checkpoints.filter(cp => cp.level <= currentLevel).length;

    const handleCheckpointClick = (checkpoint) => {
        setSelectedCheckpoint(checkpoint);
        
        if (checkpoint.level <= currentLevel && checkpoint.milestone) {
        // Celebración épica para hitos
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']
        });
        }
    };

    // Calcular posición actual del usuario en el mapa
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
            {/* Header con estadísticas */}
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
            >
            <Card className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur border-purple-500/30">
                <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                    <CardTitle className="text-3xl text-white flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-purple-400" />
                        Tu Camino de Transformación
                    </CardTitle>
                    <p className="text-purple-200 mt-2">
                        Cada paso te acerca más a tu mejor versión
                    </p>
                    </div>
                    
                    <div className="flex gap-6">
                    <div className="text-center">
                        <motion.div 
                        className="text-4xl font-bold text-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        >
                        {currentLevel}
                        </motion.div>
                        <p className="text-sm text-purple-200">Nivel Actual</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400">
                        {completedCheckpoints}/10
                        </div>
                        <p className="text-sm text-purple-200">Checkpoints</p>
                    </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                    <span className="text-purple-200 text-sm">Progreso Total</span>
                    <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-4 bg-purple-950" />
                </div>
                </CardHeader>
            </Card>
            </motion.div>

            {/* Mapa principal */}
            <Card className="bg-slate-900/80 backdrop-blur border-purple-500/30 overflow-hidden">
            <CardContent className="p-0">
                <div className="relative h-[700px] bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-8">
                {/* Grid de checkpoints */}
                <div className="absolute inset-0 p-8">
                    {/* Líneas de conexión */}
                    <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="pathGradient">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    
                    {checkpoints.slice(0, -1).map((cp, index) => {
                        const next = checkpoints[index + 1];
                        const isCompleted = cp.level <= currentLevel && next.level <= currentLevel;
                        
                        return (
                        <line
                            key={`line-${cp.id}`}
                            x1={`${cp.x}%`}
                            y1={`${cp.y}%`}
                            x2={`${next.x}%`}
                            y2={`${next.y}%`}
                            stroke={isCompleted ? "url(#pathGradient)" : "#4B5563"}
                            strokeWidth="3"
                            strokeDasharray={isCompleted ? "0" : "10,5"}
                            opacity={isCompleted ? 1 : 0.3}
                        />
                        );
                    })}
                    </svg>

                    {/* Checkpoints */}
                    {checkpoints.map((checkpoint, index) => {
                    const isCompleted = checkpoint.level <= currentLevel;
                    const isCurrent = index === currentPosition;
                    
                    return (
                        <motion.div
                        key={checkpoint.id}
                        className="absolute"
                        style={{ 
                            left: `${checkpoint.x}%`, 
                            top: `${checkpoint.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredCheckpoint(checkpoint)}
                        onMouseLeave={() => setHoveredCheckpoint(null)}
                        onClick={() => handleCheckpointClick(checkpoint)}
                        >
                        {/* Checkpoint círculo */}
                        <motion.div
                            className={`relative cursor-pointer ${checkpoint.milestone ? 'scale-125' : ''}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Aura animada para checkpoint actual */}
                            {isCurrent && (
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-full h-full rounded-full bg-purple-500" />
                            </motion.div>
                            )}

                            {/* Círculo principal */}
                            <div className={`
                            relative w-20 h-20 rounded-full flex items-center justify-center
                            ${isCompleted 
                                ? `bg-gradient-to-br ${checkpoint.color} shadow-2xl` 
                                : 'bg-gray-700 opacity-60'
                            }
                            ${checkpoint.milestone ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-transparent' : ''}
                            `}>
                            <span className="text-3xl">
                                {isCompleted ? checkpoint.emoji : '🔒'}
                            </span>
                            </div>

                            {/* Badge de hito */}
                            {checkpoint.milestone && isCompleted && (
                            <motion.div 
                                className="absolute -top-2 -right-2"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Trophy className="w-6 h-6 text-yellow-400" />
                            </motion.div>
                            )}

                            {/* Indicador "Estás aquí" */}
                            {isCurrent && (
                            <motion.div 
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Badge className="bg-purple-600 text-white">
                                <img src="/images/panda-logo.png" alt="Tu posición" className="w-4 h-4 mr-1" />
                                Aquí
                                </Badge>
                            </motion.div>
                            )}
                        </motion.div>

                        {/* Nombre del checkpoint */}
                        <p className={`
                            text-center mt-2 font-bold text-sm
                            ${isCompleted ? 'text-white' : 'text-gray-400'}
                        `}>
                            {checkpoint.name}
                        </p>
                        <p className="text-center text-xs text-gray-500">
                            Nivel {checkpoint.level}
                        </p>
                        </motion.div>
                    );
                    })}
                </div>

                {/* Tooltip flotante */}
                <AnimatePresence>
                    {hoveredCheckpoint && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-4 left-4 right-4"
                    >
                        <Card className="bg-purple-900/90 border-purple-500/50 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                            <span className="text-4xl">{hoveredCheckpoint.emoji}</span>
                            <div className="flex-1">
                                <p className="text-white font-bold">{hoveredCheckpoint.name}</p>
                                <p className="text-purple-200 text-sm">{hoveredCheckpoint.description}</p>
                                {hoveredCheckpoint.rewards && (
                                <div className="flex gap-2 mt-2">
                                    {hoveredCheckpoint.rewards.map((reward, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                        {reward}
                                    </Badge>
                                    ))}
                                </div>
                                )}
                            </div>
                            {hoveredCheckpoint.level <= currentLevel ? (
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            ) : (
                                <Lock className="w-8 h-8 text-gray-400" />
                            )}
                            </div>
                        </CardContent>
                        </Card>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </CardContent>
            </Card>

            {/* Panel de información detallada */}
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
                        <div className="flex items-center gap-4">
                        <div className={`
                            w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedCheckpoint.color} 
                            flex items-center justify-center shadow-xl
                        `}>
                            <span className="text-4xl">{selectedCheckpoint.emoji}</span>
                        </div>
                        <div>
                            <CardTitle className="text-2xl text-white">
                            {selectedCheckpoint.name}
                            </CardTitle>
                            <p className="text-purple-200">{selectedCheckpoint.description}</p>
                        </div>
                        </div>
                        <Button
                        variant="ghost"
                        onClick={() => setSelectedCheckpoint(null)}
                        className="text-white hover:bg-purple-700"
                        >
                        <ChevronRight className="w-6 h-6 rotate-90" />
                        </Button>
                    </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {/* Recompensas */}
                    <div>
                        <p className="text-purple-200 mb-3 flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        Recompensas al completar:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedCheckpoint.rewards?.map((reward, i) => (
                            <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            >
                            <Badge className="p-3 bg-purple-700/50 text-white border-purple-500">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {reward}
                            </Badge>
                            </motion.div>
                        ))}
                        </div>
                    </div>

                    {/* Estado */}
                    {selectedCheckpoint.level <= currentLevel ? (
                        <motion.div 
                        className="flex items-center gap-3 p-4 bg-green-500/20 rounded-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        >
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div>
                            <p className="text-green-400 font-bold">¡Checkpoint Completado!</p>
                            <p className="text-green-300 text-sm">Has desbloqueado todas las recompensas</p>
                        </div>
                        </motion.div>
                    ) : (
                        <div className="p-4 bg-purple-700/30 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-purple-200">Requiere nivel {selectedCheckpoint.level}</p>
                            <p className="text-purple-300 text-sm mt-1">
                                Te faltan {selectedCheckpoint.level - currentLevel} niveles
                            </p>
                            </div>
                            <Lock className="w-8 h-8 text-purple-400" />
                        </div>
                        </div>
                    )}

                    {/* Milestone especial */}
                    {selectedCheckpoint.milestone && (
                        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-8 h-8 text-yellow-400" />
                            <div>
                            <p className="text-yellow-400 font-bold">¡Hito Principal!</p>
                            <p className="text-yellow-300 text-sm">
                                Este es un logro especial en tu viaje de transformación
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