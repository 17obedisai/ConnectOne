    import React, { useState, useEffect, useRef } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Helmet } from 'react-helmet';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { Progress } from '@/components/ui/progress';
    import { 
    Star, Lock, CheckCircle, Trophy, Zap, Target, TrendingUp,
    Flame, Award, Users, Brain, Heart, BookOpen, Dumbbell,
    Calendar, Clock, ChevronRight, Sparkles, Map
    } from 'lucide-react';
    import { useData } from '@/contexts/DataContext';
    import { useToast } from '@/components/ui/use-toast';
    import confetti from 'canvas-confetti';

    const ProgressPage = () => {
    const { stats, profile } = useData();
    const { toast } = useToast();
    const [selectedNode, setSelectedNode] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const canvasRef = useRef(null);
    const [journeyPosition, setJourneyPosition] = useState(0);

    // Definir el mapa del viaje del usuario
    const journeyNodes = [
        {
        id: 1,
        level: 1,
        title: "El Despertar",
        description: "Tu viaje hacia el bienestar comienza aquí",
        icon: <Sparkles className="w-6 h-6" />,
        color: "from-green-400 to-emerald-500",
        category: "inicio",
        milestone: false,
        rewards: ["Avatar básico", "Primera misión"],
        completed: true
        },
        {
        id: 2,
        level: 2,
        title: "Primeros Pasos",
        description: "Establece tu rutina diaria",
        icon: <Target className="w-6 h-6" />,
        color: "from-blue-400 to-cyan-500",
        category: "habitos",
        milestone: false,
        rewards: ["Badge de Constancia", "+100 XP"],
        completed: stats?.level >= 2
        },
        {
        id: 3,
        level: 3,
        title: "Mente Clara",
        description: "Descubre el poder de la meditación",
        icon: <Brain className="w-6 h-6" />,
        color: "from-purple-400 to-violet-500",
        category: "mindfulness",
        milestone: false,
        rewards: ["Modo Focus desbloqueado", "Sonidos relajantes"],
        completed: stats?.level >= 3
        },
        {
        id: 4,
        level: 5,
        title: "Guardián del Bienestar",
        description: "¡Tu primer gran logro!",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-yellow-400 to-orange-500",
        category: "milestone",
        milestone: true,
        rewards: ["Título especial", "Personalización premium", "+500 XP"],
        completed: stats?.level >= 5
        },
        {
        id: 5,
        level: 7,
        title: "Cuerpo Activo",
        description: "Domina las rutinas de ejercicio",
        icon: <Dumbbell className="w-6 h-6" />,
        color: "from-red-400 to-pink-500",
        category: "ejercicio",
        milestone: false,
        rewards: ["Rutinas avanzadas", "Tracker de progreso"],
        completed: stats?.level >= 7
        },
        {
        id: 6,
        level: 10,
        title: "Maestro del Hábito",
        description: "Has construido una base sólida",
        icon: <Star className="w-6 h-6" />,
        color: "from-indigo-400 to-purple-500",
        category: "milestone",
        milestone: true,
        rewards: ["Corona dorada", "Misiones épicas", "+1000 XP"],
        completed: stats?.level >= 10
        },
        {
        id: 7,
        level: 15,
        title: "Líder Inspirador",
        description: "Ayuda a otros en su viaje",
        icon: <Users className="w-6 h-6" />,
        color: "from-teal-400 to-green-500",
        category: "social",
        milestone: false,
        rewards: ["Modo mentor", "Crear grupos"],
        completed: stats?.level >= 15
        },
        {
        id: 8,
        level: 20,
        title: "Leyenda del Bienestar",
        description: "Has alcanzado la cima",
        icon: <Award className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
        category: "milestone",
        milestone: true,
        rewards: ["Status legendario", "Todas las personalizaciones", "Modo infinito"],
        completed: stats?.level >= 20
        }
    ];

    const categories = [
        { id: 'all', name: 'Todo el viaje', icon: <Map className="w-4 h-4" /> },
        { id: 'milestone', name: 'Hitos principales', icon: <Trophy className="w-4 h-4" /> },
        { id: 'habitos', name: 'Hábitos', icon: <Target className="w-4 h-4" /> },
        { id: 'mindfulness', name: 'Mindfulness', icon: <Brain className="w-4 h-4" /> },
        { id: 'ejercicio', name: 'Ejercicio', icon: <Dumbbell className="w-4 h-4" /> },
        { id: 'social', name: 'Social', icon: <Users className="w-4 h-4" /> }
    ];

    useEffect(() => {
        // Calcular posición actual en el viaje
        const currentLevel = stats?.level || 1;
        const currentNode = journeyNodes.findIndex(node => node.level > currentLevel);
        setJourneyPosition(currentNode === -1 ? journeyNodes.length - 1 : Math.max(0, currentNode - 1));
    }, [stats]);

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        if (node.completed && node.milestone) {
        // Celebración para hitos completados
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        }
    };

    const filteredNodes = activeCategory === 'all' 
        ? journeyNodes 
        : journeyNodes.filter(node => node.category === activeCategory);

    const currentLevel = stats?.level || 1;
    const currentXP = stats?.xp || 0;
    const xpToNext = stats?.xp_to_next_level || 1000;
    const progressPercentage = (currentXP / xpToNext) * 100;

    // Calcular estadísticas del viaje
    const totalNodes = journeyNodes.length;
    const completedNodes = journeyNodes.filter(n => n.completed).length;
    const nextMilestone = journeyNodes.find(n => n.milestone && !n.completed);
    const journeyProgress = (completedNodes / totalNodes) * 100;

    return (
        <>
        <Helmet>
            <title>Mapa de Progreso - ConnectONE</title>
            <meta name="description" content="Visualiza tu viaje de transformación personal" />
        </Helmet>

        <div className="min-h-screen space-y-6">
            {/* Header con estadísticas */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                <h1 className="text-3xl font-bold mb-2">Tu Viaje de Transformación</h1>
                <p className="text-muted-foreground">
                    Cada paso te acerca más a tu mejor versión
                </p>
                </div>
                <div className="flex items-center gap-4">
                <div className="text-center">
                    <p className="text-3xl font-bold">{currentLevel}</p>
                    <p className="text-sm text-muted-foreground">Nivel actual</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                    <p className="text-3xl font-bold">{completedNodes}/{totalNodes}</p>
                    <p className="text-sm text-muted-foreground">Nodos completados</p>
                </div>
                </div>
            </div>

            {/* Barra de progreso general */}
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                <span>Progreso del viaje</span>
                <span className="font-bold">{Math.round(journeyProgress)}%</span>
                </div>
                <Progress value={journeyProgress} className="h-3" />
            </div>
            </div>

            {/* Filtros de categoría */}
            <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
                <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="flex-shrink-0"
                >
                {cat.icon}
                <span className="ml-2">{cat.name}</span>
                </Button>
            ))}
            </div>

            {/* Mapa del viaje - Vista principal */}
            <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-8 min-h-[600px]">
                {/* Línea de conexión animada */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.3" />
                    </linearGradient>
                    </defs>
                    {filteredNodes.map((node, index) => {
                    if (index === 0) return null;
                    const prevNode = filteredNodes[index - 1];
                    const x1 = 100 + (index - 1) * 150;
                    const y1 = 150 + (index - 1) % 2 * 100;
                    const x2 = 100 + index * 150;
                    const y2 = 150 + index % 2 * 100;
                    
                    return (
                        <motion.line
                        key={`line-${node.id}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeDasharray={node.completed ? "0" : "5,5"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        />
                    );
                    })}
                </svg>

                {/* Nodos del viaje */}
                <div className="relative flex flex-wrap gap-8 justify-center">
                    {filteredNodes.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                    >
                        <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNodeClick(node)}
                        className={`
                            relative w-32 h-32 rounded-2xl cursor-pointer
                            ${node.completed 
                            ? `bg-gradient-to-br ${node.color} shadow-lg` 
                            : 'bg-gray-200 dark:bg-gray-700'
                            }
                            ${node.milestone ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
                            transition-all duration-300
                        `}
                        >
                        {/* Contenido del nodo */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
                            <div className={`mb-2 ${!node.completed && 'opacity-50'}`}>
                            {node.completed ? node.icon : <Lock className="w-6 h-6" />}
                            </div>
                            <p className="text-xs font-bold text-center">
                            {node.title}
                            </p>
                            <p className="text-xs opacity-90 mt-1">
                            Nivel {node.level}
                            </p>
                        </div>

                        {/* Indicador de posición actual */}
                        {journeyPosition === index && (
                            <motion.div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            >
                            <div className="bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                                Estás aquí
                            </div>
                            </motion.div>
                        )}

                        {/* Badge de milestone */}
                        {node.milestone && (
                            <div className="absolute -top-2 -right-2">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            </div>
                        )}
                        </motion.div>
                    </motion.div>
                    ))}
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Panel de información del nodo seleccionado */}
            <AnimatePresence>
            {selectedNode && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                >
                <Card className="border-2 border-primary">
                    <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedNode.color}`}>
                            {selectedNode.icon}
                        </div>
                        <div>
                            <CardTitle>{selectedNode.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                            {selectedNode.description}
                            </p>
                        </div>
                        </div>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedNode(null)}
                        >
                        ✕
                        </Button>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        <div>
                        <p className="text-sm font-medium mb-2">Recompensas:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedNode.rewards.map((reward, i) => (
                            <Badge key={i} variant="secondary">
                                <Award className="w-3 h-3 mr-1" />
                                {reward}
                            </Badge>
                            ))}
                        </div>
                        </div>

                        {selectedNode.completed ? (
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">¡Completado!</span>
                        </div>
                        ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                            Requiere nivel {selectedNode.level}
                            </p>
                            <Button className="w-full" disabled={currentLevel < selectedNode.level}>
                            {currentLevel < selectedNode.level 
                                ? `Desbloquea en nivel ${selectedNode.level}`
                                : 'Comenzar desafío'
                            }
                            </Button>
                        </div>
                        )}
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Próximo hito */}
            {nextMilestone && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Próximo Gran Hito
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                    <p className="font-bold text-lg">{nextMilestone.title}</p>
                    <p className="text-sm text-muted-foreground">
                        Alcanza el nivel {nextMilestone.level} para desbloquearlo
                    </p>
                    </div>
                    <div className="text-center">
                    <p className="text-2xl font-bold">
                        {nextMilestone.level - currentLevel}
                    </p>
                    <p className="text-xs text-muted-foreground">niveles restantes</p>
                    </div>
                </div>
                </CardContent>
            </Card>
            )}
        </div>
        </>
    );
    };

    export default ProgressPage;