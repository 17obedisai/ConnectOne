    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { Progress } from '@/components/ui/progress';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { 
    X, PlayCircle, Clock, Trophy, Brain, Heart, Sparkles, 
    CheckCircle, ChevronRight, Zap, Target, Info, BookOpen,
    Activity, TrendingUp, Timer, Pause, RotateCcw, Volume2
    } from 'lucide-react';
    import confetti from 'canvas-confetti';

    const MissionDetailModal = ({ mission, onClose, onStart, onComplete }) => {
    const [activeTab, setActiveTab] = useState('instrucciones');
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [completedSteps, setCompletedSteps] = useState([]);
    
    useEffect(() => {
        if (isTimerRunning && timerSeconds < (mission?.duracion * 60 || 0)) {
        const interval = setInterval(() => {
            setTimerSeconds(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
        } else if (timerSeconds >= (mission?.duracion * 60 || 0) && isTimerRunning) {
        handleComplete();
        }
    }, [isTimerRunning, timerSeconds]);

    const handleComplete = () => {
        confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
        });
        onComplete();
    };

    const toggleStep = (stepIndex) => {
        if (completedSteps.includes(stepIndex)) {
        setCompletedSteps(prev => prev.filter(i => i !== stepIndex));
        } else {
        setCompletedSteps(prev => [...prev, stepIndex]);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!mission) return null;

    const progress = (timerSeconds / (mission.duracion * 60)) * 100;

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        >
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <Card className="bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-indigo-900/95 backdrop-blur-xl border-purple-500/30">
            <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-gradient-x" />
                
                <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mission.color} 
                        flex items-center justify-center text-4xl shadow-2xl`}
                    >
                    {mission.icono}
                    </motion.div>
                    <div>
                    <CardTitle className="text-2xl text-white mb-1">{mission.titulo}</CardTitle>
                    <p className="text-purple-200">{mission.descripcionCorta}</p>
                    <div className="flex gap-2 mt-2">
                        <Badge className="bg-purple-600/30">{mission.categoria}</Badge>
                        <Badge className="bg-yellow-500/30 text-yellow-300">
                        <Trophy className="w-3 h-3 mr-1" />
                        {mission.experiencia} XP
                        </Badge>
                        <Badge className="bg-blue-500/30 text-blue-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {mission.duracion} min
                        </Badge>
                    </div>
                    </div>
                </div>
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/10"
                >
                    <X className="w-5 h-5" />
                </Button>
                </div>

                {/* Timer integrado */}
                <motion.div 
                className="mt-6 p-4 bg-purple-800/30 rounded-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-200 text-sm">Progreso de la misión</span>
                    <span className="text-white font-mono text-lg">{formatTime(timerSeconds)}</span>
                </div>
                <Progress value={progress} className="h-2 bg-purple-950" />
                <div className="flex gap-2 mt-3 justify-center">
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="text-white border-purple-500 hover:bg-purple-800/30"
                    >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                    </Button>
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                        setTimerSeconds(0);
                        setIsTimerRunning(false);
                    }}
                    className="text-white border-purple-500 hover:bg-purple-800/30"
                    >
                    <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
                </motion.div>
            </CardHeader>
            
            <CardContent className="overflow-y-auto max-h-[50vh] space-y-6">
                {/* Descripción completa */}
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-purple-800/30 rounded-xl"
                >
                <p className="text-purple-100 leading-relaxed">
                    {mission.contenido?.descripcionCompleta || mission.descripcionCorta}
                </p>
                </motion.div>

                {/* Tabs de contenido */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full bg-purple-800/30">
                    <TabsTrigger value="instrucciones">Instrucciones</TabsTrigger>
                    <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
                    <TabsTrigger value="ciencia">Ciencia</TabsTrigger>
                </TabsList>

                <TabsContent value="instrucciones" className="space-y-3 mt-4">
                    {mission.contenido?.instrucciones ? (
                    <div className="space-y-3">
                        {mission.contenido.instrucciones.map((paso, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-all
                            ${completedSteps.includes(index) 
                                ? 'bg-green-500/20 border-l-4 border-green-500' 
                                : 'bg-purple-800/20 hover:bg-purple-800/30'}`}
                            onClick={() => toggleStep(index)}
                        >
                            <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                                ${completedSteps.includes(index) 
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                                : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}
                            >
                            {completedSteps.includes(index) ? <CheckCircle className="w-5 h-5" /> : paso.paso}
                            </motion.div>
                            <div className="flex-1">
                            <h4 className="text-white font-semibold flex items-center gap-2">
                                {paso.titulo}
                                <span className="text-2xl">{paso.icono}</span>
                            </h4>
                            <p className="text-purple-200 text-sm mt-1">{paso.descripcion}</p>
                            <span className="text-xs text-purple-300 mt-1 inline-block">
                                ⏱️ {paso.duracion}
                            </span>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-purple-200">Instrucciones disponibles al iniciar la misión</p>
                    )}
                </TabsContent>

                <TabsContent value="beneficios" className="mt-4">
                    {mission.contenido?.beneficios && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                        >
                        <h4 className="text-white font-semibold flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Beneficios Inmediatos
                        </h4>
                        {mission.contenido.beneficios.inmediatos?.map((beneficio, i) => (
                            <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, x: 10 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg cursor-pointer"
                            >
                            <span className="text-2xl">{beneficio.icono}</span>
                            <span className="text-purple-100 text-sm">{beneficio.texto}</span>
                            </motion.div>
                        ))}
                        </motion.div>
                        
                        <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                        >
                        <h4 className="text-white font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            Largo Plazo
                        </h4>
                        {mission.contenido.beneficios.largoplazo?.map((beneficio, i) => (
                            <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, x: 10 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg cursor-pointer"
                            >
                            <span className="text-2xl">{beneficio.icono}</span>
                            <span className="text-purple-100 text-sm">{beneficio.texto}</span>
                            </motion.div>
                        ))}
                        </motion.div>
                    </div>
                    )}
                </TabsContent>

                <TabsContent value="ciencia" className="mt-4">
                    {mission.contenido?.ciencia && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <h4 className="text-white font-semibold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        {mission.contenido.ciencia.titulo}
                        </h4>
                        <div className="space-y-2">
                        {mission.contenido.ciencia.estudios?.map((estudio, i) => (
                            <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-3 bg-purple-800/20 rounded-lg border-l-4 border-purple-500 hover:bg-purple-800/30"
                            >
                            <p className="text-purple-100 text-sm">{estudio}</p>
                            </motion.div>
                        ))}
                        </div>
                    </motion.div>
                    )}
                </TabsContent>
                </Tabs>

                {/* Tips adicionales */}
                {mission.contenido?.tips && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-xl"
                >
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Tips Pro
                    </h4>
                    <ul className="space-y-2">
                    {mission.contenido.tips.map((tip, i) => (
                        <motion.li 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className="text-purple-200 text-sm flex items-start gap-2"
                        >
                        <span className="text-purple-400 mt-1">•</span>
                        {tip}
                        </motion.li>
                    ))}
                    </ul>
                </motion.div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                    onClick={() => {
                        setIsTimerRunning(true);
                        onStart();
                    }}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Iniciar Misión
                    </Button>
                </motion.div>
                
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                    onClick={handleComplete}
                    size="lg"
                    variant="outline"
                    className="w-full border-purple-500 text-purple-200 hover:bg-purple-800/30"
                    >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completar Ahora
                    </Button>
                </motion.div>
                </div>
            </CardContent>
            </Card>
        </motion.div>
        </motion.div>
    );
    };

    export default MissionDetailModal;