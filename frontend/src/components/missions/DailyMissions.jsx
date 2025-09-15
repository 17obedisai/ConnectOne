    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Progress } from '@/components/ui/progress';
    import { Badge } from '@/components/ui/badge';
    import { 
    CheckCircle, Circle, Clock, Flame, Award, 
    ChevronRight, PlayCircle, Target, BookOpen,
    Brain, Dumbbell, Heart, Users, Coffee
    } from 'lucide-react';
    import { missionService } from '@/services/missionService';
    import { useToast } from '@/components/ui/use-toast';

    const DailyMissions = ({ onMissionComplete, detailed = false }) => {
    const navigate = useNavigate();
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const categoryIcons = {
        ejercicio: <Dumbbell className="w-4 h-4" />,
        meditacion: <Brain className="w-4 h-4" />,
        lectura: <BookOpen className="w-4 h-4" />,
        nutricion: <Coffee className="w-4 h-4" />,
        social: <Users className="w-4 h-4" />,
        gratitud: <Heart className="w-4 h-4" />
    };

    const categoryColors = {
        ejercicio: 'text-red-500',
        meditacion: 'text-purple-500',
        lectura: 'text-blue-500',
        nutricion: 'text-green-500',
        social: 'text-yellow-500',
        gratitud: 'text-pink-500'
    };

    useEffect(() => {
        loadMissions();
    }, []);

    const loadMissions = async () => {
        try {
        setLoading(true);
        const data = await missionService.getDailyMissions();
        setMissions(data);
        } catch (error) {
        // Si falla, usar misiones de ejemplo
        setMissions(getExampleMissions());
        } finally {
        setLoading(false);
        }
    };

    const getExampleMissions = () => [
        {
        _id: '1',
        titulo: 'Meditación Matutina',
        descripcion: 'Comienza tu día con 10 minutos de mindfulness',
        categoria: 'meditacion',
        duracion: 10,
        experiencia: 50,
        completada: false,
        dificultad: 'principiante'
        },
        {
        _id: '2',
        titulo: 'Ejercicio Energizante',
        descripcion: 'Rutina de 15 minutos para activar tu cuerpo',
        categoria: 'ejercicio',
        duracion: 15,
        experiencia: 75,
        completada: false,
        dificultad: 'principiante'
        },
        {
        _id: '3',
        titulo: 'Lectura Diaria',
        descripcion: 'Lee 20 páginas de un libro inspirador',
        categoria: 'lectura',
        duracion: 20,
        experiencia: 40,
        completada: false,
        dificultad: 'principiante'
        },
        {
        _id: '4',
        titulo: 'Gratitud Nocturna',
        descripcion: 'Escribe 3 cosas por las que estás agradecido',
        categoria: 'gratitud',
        duracion: 5,
        experiencia: 30,
        completada: false,
        dificultad: 'principiante'
        },
        {
        _id: '5',
        titulo: 'Conexión Social',
        descripcion: 'Llama o envía un mensaje a alguien importante',
        categoria: 'social',
        duracion: 10,
        experiencia: 35,
        completada: false,
        dificultad: 'principiante'
        }
    ];

    const handleStartMission = (mission) => {
        navigate(`/missions?selected=${mission._id}`);
    };

    const handleQuickComplete = async (mission) => {
        try {
        const result = await missionService.completeMission(mission._id, mission.duracion);
        
        toast({
            title: "¡Misión completada! 🎉",
            description: `Has ganado ${result.experienciaGanada} XP`,
        });
        
        if (onMissionComplete) {
            onMissionComplete(result.experienciaGanada);
        }
        
        loadMissions();
        } catch (error) {
        toast({
            title: "¡Bien hecho!",
            description: `Has completado: ${mission.titulo}`,
        });
        
        // Actualizar localmente
        setMissions(prev => prev.map(m => 
            m._id === mission._id ? { ...m, completada: true } : m
        ));
        
        if (onMissionComplete) {
            onMissionComplete(mission.experiencia);
        }
        }
    };

    const completedCount = missions.filter(m => m.completada).length;
    const totalXP = missions.filter(m => m.completada).reduce((acc, m) => acc + m.experiencia, 0);

    if (loading) {
        return (
        <Card>
            <CardContent className="p-8 text-center">
            <div className="animate-pulse">Cargando misiones del día...</div>
            </CardContent>
        </Card>
        );
    }

    return (
        <div className="space-y-4">
        <Card>
            <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Misiones del Día
                </CardTitle>
                <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/missions')}
                >
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso diario</span>
                <span className="font-bold">{completedCount}/5 completadas</span>
                </div>
                <Progress value={(completedCount / 5) * 100} className="h-2" />
                <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">XP ganado hoy</span>
                <span className="font-bold text-primary">+{totalXP} XP</span>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-3">
            {missions.map((mission) => (
                <Card 
                key={mission._id}
                className={`transition-all ${
                    mission.completada 
                    ? 'opacity-60 bg-muted' 
                    : 'hover:shadow-md cursor-pointer'
                }`}
                >
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                    <div className={`mt-1 ${mission.completada ? 'text-green-500' : ''}`}>
                        {mission.completada ? (
                        <CheckCircle className="w-5 h-5" />
                        ) : (
                        <Circle className="w-5 h-5" />
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                        <span className={categoryColors[mission.categoria]}>
                            {categoryIcons[mission.categoria]}
                        </span>
                        <h4 className="font-medium text-sm">
                            {mission.titulo}
                        </h4>
                        {mission.completada && (
                            <Badge variant="outline" className="text-xs">
                            Completada
                            </Badge>
                        )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2">
                        {mission.descripcion}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mission.duracion} min
                        </span>
                        <span className="flex items-center gap-1 font-bold text-primary">
                            <Award className="w-3 h-3" />
                            +{mission.experiencia} XP
                        </span>
                        <Badge variant="outline" className="text-xs">
                            {mission.dificultad}
                        </Badge>
                        </div>
                    </div>
                    
                    {!mission.completada && (
                        <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartMission(mission)}
                        >
                            <PlayCircle className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Iniciar</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickComplete(mission)}
                        >
                            <CheckCircle className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Completar</span>
                        </Button>
                        </div>
                    )}
                    </div>
                </CardContent>
                </Card>
            ))}
            
            {completedCount === 5 && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">¡Todas las misiones completadas!</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                    Has ganado {totalXP} XP hoy. ¡Excelente trabajo!
                    </p>
                </CardContent>
                </Card>
            )}
            </CardContent>
        </Card>
        
        {detailed && (
            <Card>
            <CardHeader>
                <CardTitle className="text-sm">Beneficios de completar misiones</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Desarrolla hábitos saludables de forma consistente</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Gana experiencia y sube de nivel más rápido</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Desbloquea nuevas recompensas y personalización</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Mantén tu racha y gana bonificaciones especiales</span>
                </li>
                </ul>
            </CardContent>
            </Card>
        )}
        </div>
    );
    };

    export default DailyMissions;