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
    Calendar, Users, Activity
    } from 'lucide-react';
    import { useData } from '@/contexts/DataContext';
    import confetti from 'canvas-confetti';

    const ProgressMapPage = () => {
    const { stats } = useData();
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const mapRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    const currentLevel = stats?.level || 1;
    const userPandaSkin = localStorage.getItem('userPandaSkin') || 1;
    const pandaImage = `/images/panda-level-${userPandaSkin}.png`;

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 16 NIVELES COMPLETOS con posiciones en zigzag para aprovechar el espacio
    const levels = [
        { 
        id: 1, name: 'El Despertar', 
        x: 10, y: 90,
        icon: '🌅', color: 'from-yellow-400 to-orange-500',
        description: 'Tu viaje comienza aquí',
        rewards: ['Primera misión', 'Avatar básico'],
        milestone: false
        },
        { 
        id: 2, name: 'Primeros Pasos', 
        x: 25, y: 85,
        icon: '👣', color: 'from-blue-400 to-cyan-500',
        description: 'Estableciendo rutinas',
        rewards: ['+100 XP', 'Badge iniciado'],
        milestone: false
        },
        { 
        id: 3, name: 'Valle Constancia', 
        x: 40, y: 80,
        icon: '🏞️', color: 'from-green-400 to-emerald-500',
        description: 'La disciplina se forma',
        rewards: ['Modo focus', 'Meditación básica'],
        milestone: false
        },
        { 
        id: 4, name: 'Río Meditación', 
        x: 30, y: 70,
        icon: '💧', color: 'from-cyan-400 to-blue-500',
        description: 'Encuentra tu paz interior',
        rewards: ['Sonidos relajantes', 'Timer meditación'],
        milestone: false
        },
        { 
        id: 5, name: 'Bosque Conocimiento', 
        x: 45, y: 65,
        icon: '🌳', color: 'from-green-500 to-lime-500',
        description: 'Aprende y crece',
        rewards: ['Biblioteca', 'Skin especial'],
        milestone: true // HITO
        },
        { 
        id: 6, name: 'Montaña Desafío', 
        x: 60, y: 60,
        icon: '🏔️', color: 'from-gray-400 to-gray-600',
        description: 'Supera tus límites',
        rewards: ['Rutinas avanzadas', 'Badge montaña'],
        milestone: false
        },
        { 
        id: 7, name: 'Jardín Gratitud', 
        x: 50, y: 50,
        icon: '🌸', color: 'from-pink-400 to-rose-500',
        description: 'Cultiva la felicidad',
        rewards: ['Diario gratitud', 'Emociones tracker'],
        milestone: false
        },
        { 
        id: 8, name: 'Templo Equilibrio', 
        x: 65, y: 45,
        icon: '⛩️', color: 'from-purple-400 to-indigo-500',
        description: 'Balance perfecto',
        rewards: ['Modo zen', 'Personalización total'],
        milestone: false
        },
        { 
        id: 9, name: 'Ciudad Mentor', 
        x: 55, y: 35,
        icon: '🏰', color: 'from-indigo-400 to-purple-500',
        description: 'Guía a otros',
        rewards: ['Modo mentor', 'Comunidad'],
        milestone: false
        },
        { 
        id: 10, name: 'Reino Dorado', 
        x: 70, y: 30,
        icon: '👑', color: 'from-yellow-500 to-amber-600',
        description: '¡Gran logro alcanzado!',
        rewards: ['Corona dorada', 'Título especial', 'Todas las skins'],
        milestone: true // HITO
        },
        { 
        id: 11, name: 'Puente Arcoíris', 
        x: 60, y: 20,
        icon: '🌈', color: 'from-purple-400 via-pink-400 to-cyan-400',
        description: 'Conexión universal',
        rewards: ['Efectos especiales', 'Temas únicos'],
        milestone: false
        },
        { 
        id: 12, name: 'Volcán Energía', 
        x: 75, y: 15,
        icon: '🌋', color: 'from-red-500 to-orange-600',
        description: 'Poder infinito',
        rewards: ['Súper poderes', 'Modo turbo'],
        milestone: false
        },
        { 
        id: 13, name: 'Isla Serenidad', 
        x: 65, y: 10,
        icon: '🏝️', color: 'from-teal-400 to-cyan-500',
        description: 'Paz absoluta',
        rewards: ['Retiro virtual', 'Música exclusiva'],
        milestone: false
        },
        { 
        id: 14, name: 'Aurora Boreal', 
        x: 80, y: 8,
        icon: '🌌', color: 'from-blue-500 to-purple-600',
        description: 'Magia celestial',
        rewards: ['Efectos aurora', 'Badge mítico'],
        milestone: false
        },
        { 
        id: 15, name: 'Cumbre Leyenda', 
        x: 70, y: 5,
        icon: '🏆', color: 'from-purple-500 to-pink-500',
        description: 'Entre los mejores',
        rewards: ['Hall de la fama', 'Reconocimiento'],
        milestone: true // HITO
        },
        { 
        id: 16, name: 'Galaxia Infinita', 
        x: 85, y: 3,
        icon: '🌟', color: 'from-indigo-500 via-purple-500 to-pink-500',
        description: 'Maestría total alcanzada',
        rewards: ['Todo desbloqueado', 'Modo dios', 'Status eterno'],
        milestone: true // HITO FINAL
        }
    ];

    // Elementos decorativos más abundantes
    const decorations = [
        { type: 'tree', x: 15, y: 88, icon: '🌲', size: 'text-3xl' },
        { type: 'tree', x: 35, y: 75, icon: '🌳', size: 'text-2xl' },
        { type: 'flower', x: 45, y: 62, icon: '🌸', size: 'text-xl' },
        { type: 'butterfly', x: 25, y: 55, icon: '🦋', size: 'text-2xl' },
        { type: 'bird', x: 55, y: 40, icon: '🦜', size: 'text-xl' },
        { type: 'waterfall', x: 40, y: 45, icon: '💧', size: 'text-3xl' },
        { type: 'rainbow', x: 65, y: 25, icon: '🌈', size: 'text-4xl' },
        { type: 'star', x: 75, y: 20, icon: '✨', size: 'text-2xl' },
        { type: 'cloud', x: 50, y: 15, icon: '☁️', size: 'text-3xl' },
        { type: 'sun', x: 90, y: 10, icon: '☀️', size: 'text-4xl' },
        { type: 'mountain', x: 20, y: 30, icon: '⛰️', size: 'text-5xl' },
        { type: 'castle', x: 85, y: 35, icon: '🏰', size: 'text-3xl' },
        { type: 'moon', x: 10, y: 20, icon: '🌙', size: 'text-2xl' },
        { type: 'star2', x: 30, y: 10, icon: '⭐', size: 'text-xl' },
        { type: 'gem', x: 60, y: 70, icon: '💎', size: 'text-xl' },
        { type: 'mushroom', x: 25, y: 65, icon: '🍄', size: 'text-xl' }
    ];

    const handleLevelClick = (level) => {
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

    return (
        <>
        <Helmet>
            <title>Mapa de Progreso - ConnectONE</title>
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="max-w-full mx-auto">
            
            {/* Header Mejorado */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30 mb-6"
            >
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-5xl"
                    >
                    <MapPin className="w-10 h-10 text-purple-400" />
                    </motion.div>
                    <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                        Tu Camino de Transformación
                    </h1>
                    <p className="text-purple-200 mt-1">
                        16 niveles épicos te esperan en tu viaje
                    </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    >
                    <p className="text-4xl font-bold text-white">{currentLevel}</p>
                    <p className="text-sm text-purple-200">Nivel Actual</p>
                    </motion.div>
                    
                    <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    >
                    <p className="text-4xl font-bold text-yellow-400">
                        {levels.filter(l => l.id <= currentLevel).length}
                    </p>
                    <p className="text-sm text-purple-200">Completados</p>
                    </motion.div>
                    
                    <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    >
                    <p className="text-4xl font-bold text-green-400">
                        {levels.filter(l => l.milestone && l.id <= currentLevel).length}
                    </p>
                    <p className="text-sm text-purple-200">Hitos</p>
                    </motion.div>
                </div>
                </div>
                
                <div className="mt-4">
                <div className="flex justify-between mb-2">
                    <span className="text-purple-200">Progreso Total</span>
                    <span className="text-white font-bold">{Math.round(calculateProgress())}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-3" />
                </div>
            </motion.div>

            {/* MAPA PRINCIPAL EXPANDIDO */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30 overflow-auto">
                <div 
                ref={mapRef}
                className="relative"
                style={{ 
                    width: isMobile ? '100%' : '100%',
                    height: isMobile ? '800px' : '900px',
                    minWidth: '1200px'
                }}
                >
                {/* Fondo con gradiente y partículas */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
                    {/* Estrellas de fondo */}
                    {Array.from({ length: 50 }, (_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-white opacity-30"
                        style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 10 + 5}px`
                        }}
                        animate={{
                        opacity: [0.3, 0.8, 0.3],
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

                {/* Decoraciones mejoradas */}
                {decorations.map((deco, index) => (
                    <motion.div
                    key={`deco-${index}`}
                    className={`absolute ${deco.size} pointer-events-none`}
                    style={{
                        left: `${deco.x}%`,
                        top: `${deco.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                    }}
                    animate={{
                        y: deco.type === 'butterfly' ? [-5, 5, -5] : [0, -3, 0],
                        rotate: deco.type === 'butterfly' ? [0, 10, -10, 0] : 0,
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4 + index * 0.2,
                        repeat: Infinity
                    }}
                    >
                    {deco.icon}
                    </motion.div>
                ))}

                {/* CAMINO MEJORADO Y MÁS ANCHO */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                    <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                    </defs>
                    
                    {levels.slice(0, -1).map((level, index) => {
                    const nextLevel = levels[index + 1];
                    const isUnlocked = level.id <= currentLevel && nextLevel.id <= currentLevel;
                    
                    return (
                        <motion.path
                        key={`path-${index}`}
                        d={`M ${level.x}% ${level.y}% Q ${(level.x + nextLevel.x) / 2}% ${(level.y + nextLevel.y) / 2 - 5}% ${nextLevel.x}% ${nextLevel.y}%`}
                        stroke={isUnlocked ? "url(#pathGradient)" : "#4C1D95"}
                        strokeWidth={isMobile ? "4" : "6"}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={isUnlocked ? "0" : "10 10"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: index * 0.1 }}
                        style={{ filter: isUnlocked ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none' }}
                        />
                    );
                    })}
                </svg>

                {/* NODOS DEL MAPA MEJORADOS */}
                {levels.map((level, index) => {
                    const isUnlocked = level.id <= currentLevel;
                    const isCurrent = level.id === currentLevel;
                    const isHovered = hoveredLevel === level.id;
                    
                    return (
                    <motion.div
                        key={level.id}
                        className="absolute"
                        style={{
                        left: `${level.x}%`,
                        top: `${level.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: isCurrent ? 20 : isHovered ? 15 : 10
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05, type: "spring" }}
                        onMouseEnter={() => setHoveredLevel(level.id)}
                        onMouseLeave={() => setHoveredLevel(null)}
                    >
                        {/* Aura para hitos */}
                        {level.milestone && isUnlocked && (
                        <motion.div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${level.color}`}
                            style={{
                            width: '120px',
                            height: '120px',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            filter: 'blur(20px)',
                            opacity: 0.5
                            }}
                            animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        )}
                        
                        {/* Nodo principal */}
                        <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLevelClick(level)}
                        className={`
                            relative rounded-2xl transition-all duration-300 cursor-pointer
                            ${isMobile ? 'w-20 h-20' : 'w-24 h-24'}
                            ${isCurrent 
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/50 ring-4 ring-yellow-400' 
                            : isUnlocked
                                ? `bg-gradient-to-br ${level.color} shadow-lg`
                                : 'bg-gray-700/50'}
                            ${level.milestone ? 'ring-2 ring-white/50' : ''}
                        `}
                        >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                            {isCurrent ? (
                            <motion.img
                                src={pandaImage}
                                alt="Tu posición"
                                className="w-14 h-14 object-contain"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            ) : isUnlocked ? (
                            <div className="text-3xl">{level.icon}</div>
                            ) : (
                            <Lock className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        
                        {/* Badge de nivel */}
                        <div className={`
                            absolute -bottom-2 left-1/2 -translate-x-1/2
                            px-2 py-1 rounded-full text-xs font-bold
                            ${isUnlocked ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-300'}
                        `}>
                            Lv.{level.id}
                        </div>
                        
                        {/* Indicador de hito */}
                        {level.milestone && (
                            <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                            <Crown className="w-6 h-6 text-yellow-400" />
                            </motion.div>
                        )}
                        
                        {/* Indicador "Estás aquí" */}
                        {isCurrent && (
                            <motion.div
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            >
                            ¡Estás aquí!
                            </motion.div>
                        )}
                        </motion.button>
                        
                        {/* Nombre del nivel */}
                        <motion.div 
                        className="mt-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                        >
                        <p className={`
                            font-bold ${isMobile ? 'text-xs' : 'text-sm'}
                            ${isUnlocked ? 'text-white' : 'text-gray-500'}
                        `}>
                            {level.name}
                        </p>
                        </motion.div>
                        
                        {/* Tooltip al hover */}
                        <AnimatePresence>
                        {isHovered && (
                            <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30"
                            >
                            <Card className="bg-purple-900/95 backdrop-blur border-purple-500/50 p-3 min-w-[200px]">
                                <p className="text-white font-bold mb-1">{level.name}</p>
                                <p className="text-purple-200 text-xs mb-2">{level.description}</p>
                                {level.rewards && (
                                <div className="space-y-1">
                                    <p className="text-yellow-400 text-xs font-bold">Recompensas:</p>
                                    {level.rewards.map((reward, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                        <Gift className="w-3 h-3 text-purple-300" />
                                        <span className="text-xs text-purple-200">{reward}</span>
                                    </div>
                                    ))}
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

            {/* Modal de detalle mejorado */}
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
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl p-6 max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`text-5xl p-3 rounded-xl bg-gradient-to-br ${selectedLevel.color}`}>
                        {selectedLevel.icon}
                        </div>
                        <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white">{selectedLevel.name}</h3>
                        <Badge className={selectedLevel.milestone ? 'bg-yellow-500' : ''}>
                            Nivel {selectedLevel.id} {selectedLevel.milestone && '- HITO'}
                        </Badge>
                        </div>
                    </div>
                    
                    <p className="text-purple-200 mb-4">{selectedLevel.description}</p>
                    
                    {selectedLevel.rewards && (
                        <div className="mb-4">
                        <p className="text-yellow-400 font-bold mb-2">Recompensas:</p>
                        <div className="grid grid-cols-1 gap-2">
                            {selectedLevel.rewards.map((reward, i) => (
                            <div key={i} className="flex items-center gap-2 bg-purple-800/30 p-2 rounded-lg">
                                <Gift className="w-4 h-4 text-yellow-400" />
                                <span className="text-white">{reward}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                    
                    <div className="flex gap-2">
                        <Button 
                        className="flex-1"
                        onClick={() => setSelectedLevel(null)}
                        variant={selectedLevel.id <= currentLevel ? 'default' : 'secondary'}
                        >
                        {selectedLevel.id <= currentLevel ? '✓ Completado' : `Desbloquea en nivel ${selectedLevel.id}`}
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