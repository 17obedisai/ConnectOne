    import React, { useState } from 'react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Badge } from '@/components/ui/badge';
    import { Progress } from '@/components/ui/progress';
    import { Alert, AlertDescription } from '@/components/ui/alert';
    import {
    Clock, Award, BookOpen, Heart, AlertTriangle, 
    CheckCircle, PlayCircle, Home, Dumbbell, Users,
    Brain, Sparkles, ChevronRight, Star
    } from 'lucide-react';

    const MissionDetail = ({ mission, onStart, onComplete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Validación de misión
  if (!mission || !mission.contenido) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Cargando detalles de la misión...</p>
        </CardContent>
      </Card>
    );
  }

  // Asegurar que contenido tenga valores por defecto
  const contenido = {
    introduccion: mission.contenido?.introduccion || 'Información no disponible',
    ciencia: mission.contenido?.ciencia || 'Información no disponible',
    instrucciones: mission.contenido?.instrucciones || [],
    beneficios: mission.contenido?.beneficios || [],
    tips: mission.contenido?.tips || [],
    equipamientoNecesario: mission.contenido?.equipamientoNecesario || [],
    ejercicios: mission.contenido?.ejercicios || [],
    variaciones: mission.contenido?.variaciones || {},
    precauciones: mission.contenido?.precauciones || [],
    preguntasReflexion: mission.contenido?.preguntasReflexion || []
  };

  // Resto del componente...

    const categoryIcons = {
        ejercicio: <Dumbbell className="w-5 h-5" />,
        meditacion: <Brain className="w-5 h-5" />,
        lectura: <BookOpen className="w-5 h-5" />,
        gratitud: <Heart className="w-5 h-5" />,
        social: <Users className="w-5 h-5" />
    };

    const difficultyColors = {
        principiante: 'bg-green-500',
        intermedio: 'bg-yellow-500',
        avanzado: 'bg-red-500'
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                {categoryIcons[mission.categoria]}
                <Badge variant="outline">{mission.categoria}</Badge>
                <Badge className={difficultyColors[mission.dificultad]}>
                    {mission.dificultad}
                </Badge>
                </div>
                <CardTitle className="text-2xl">{mission.titulo}</CardTitle>
                <p className="text-muted-foreground">{mission.descripcion}</p>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                {mission.duracion} min
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Award className="w-4 h-4" />
                +{mission.experiencia} XP
                </div>
            </div>
            </div>

            {!isActive ? (
            <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                setIsActive(true);
                onStart();
                }}
            >
                <PlayCircle className="mr-2" />
                Comenzar Misión
            </Button>
            ) : (
            <div className="space-y-2">
                <Progress 
                value={(currentStep / (mission.contenido.instrucciones?.length || 1)) * 100} 
                />
                <p className="text-sm text-center text-muted-foreground">
                Paso {currentStep + 1} de {mission.contenido.instrucciones?.length || 1}
                </p>
            </div>
            )}
        </CardHeader>

        <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">General</TabsTrigger>
                <TabsTrigger value="instructions">Guía</TabsTrigger>
                <TabsTrigger value="science">Ciencia</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
                <Card className="bg-muted">
                <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    ¿Por qué es importante?
                    </h3>
                    <p className="text-sm">{mission.contenido.introduccion}</p>
                </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="pt-6">
                    <h4 className="font-bold mb-3 text-green-600">Beneficios</h4>
                    <ul className="space-y-2">
                        {mission.contenido.beneficios?.map((beneficio, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>{beneficio}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                </Card>

                {mission.contenido.equipamientoNecesario && (
                    <Card>
                    <CardContent className="pt-6">
                        <h4 className="font-bold mb-3">Qué necesitas</h4>
                        <ul className="space-y-2">
                        {mission.contenido.equipamientoNecesario.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                            <ChevronRight className="w-4 h-4" />
                            {item}
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    </Card>
                )}
                </div>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-4 mt-4">
                {isActive && mission.contenido.instrucciones ? (
                <div className="space-y-4">
                    <Card className="border-2 border-primary">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {currentStep + 1}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold mb-2">
                            {mission.contenido.instrucciones[currentStep].descripcion}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                            Duración: {mission.contenido.instrucciones[currentStep].duracion}
                            </p>
                            
                            {/* Para ejercicios, mostrar detalles */}
                            {mission.categoria === 'ejercicio' && mission.contenido.ejercicios && (
                            <div className="space-y-4 mt-4">
                                {mission.contenido.ejercicios.map((ejercicio, i) => (
                                <Card key={i} className="bg-muted">
                                    <CardContent className="pt-4">
                                    <h5 className="font-bold mb-2">{ejercicio.nombre}</h5>
                                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                                        <div>
                                        <span className="text-muted-foreground">Series:</span>
                                        <p className="font-bold">{ejercicio.series}</p>
                                        </div>
                                        <div>
                                        <span className="text-muted-foreground">Reps:</span>
                                        <p className="font-bold">{ejercicio.repeticiones}</p>
                                        </div>
                                        <div>
                                        <span className="text-muted-foreground">Descanso:</span>
                                        <p className="font-bold">{ejercicio.descanso}</p>
                                        </div>
                                    </div>
                                    
                                    <Alert>
                                        <AlertDescription>
                                        <strong>Técnica:</strong> {ejercicio.tecnica}
                                        </AlertDescription>
                                    </Alert>
                                    
                                    {ejercicio.erroresComunes && (
                                        <div className="mt-3">
                                        <p className="text-sm font-medium mb-1">Evita estos errores:</p>
                                        <ul className="text-sm text-muted-foreground">
                                            {ejercicio.erroresComunes.map((error, j) => (
                                            <li key={j}>• {error}</li>
                                            ))}
                                        </ul>
                                        </div>
                                    )}
                                    </CardContent>
                                </Card>
                                ))}
                            </div>
                            )}
                        </div>
                        </div>
                        
                        <div className="flex gap-2 mt-6">
                        {currentStep > 0 && (
                            <Button
                            variant="outline"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            >
                            Anterior
                            </Button>
                        )}
                        {currentStep < mission.contenido.instrucciones.length - 1 ? (
                            <Button
                            className="flex-1"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            >
                            Siguiente paso
                            </Button>
                        ) : (
                            <Button
                            className="flex-1"
                            onClick={() => {
                                onComplete();
                                setIsActive(false);
                            }}
                            >
                            <CheckCircle className="mr-2" />
                            Completar misión
                            </Button>
                        )}
                        </div>
                    </CardContent>
                    </Card>

                    {/* Variaciones */}
                    {mission.contenido.variaciones && (
                    <Card>
                        <CardContent className="pt-6">
                        <h4 className="font-bold mb-3">Adapta a tu situación</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                            {mission.contenido.variaciones.casa && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium flex items-center gap-1">
                                <Home className="w-4 h-4" /> En casa
                                </p>
                                <p className="text-sm text-muted-foreground">
                                {mission.contenido.variaciones.casa}
                                </p>
                            </div>
                            )}
                            {mission.contenido.variaciones.gym && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium flex items-center gap-1">
                                <Dumbbell className="w-4 h-4" /> En el gym
                                </p>
                                <p className="text-sm text-muted-foreground">
                                {mission.contenido.variaciones.gym}
                                </p>
                            </div>
                            )}
                        </div>
                        </CardContent>
                    </Card>
                    )}
                </div>
                ) : (
                <Alert>
                    <AlertDescription>
                    Presiona "Comenzar Misión" para ver las instrucciones paso a paso
                    </AlertDescription>
                </Alert>
                )}
            </TabsContent>

            <TabsContent value="science" className="space-y-4 mt-4">
                <Card>
                <CardContent className="pt-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Base Científica
                    </h3>
                    <p className="text-sm leading-relaxed">
                    {mission.contenido.ciencia}
                    </p>
                </CardContent>
                </Card>

                {mission.contenido.precauciones && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                    <strong>Precauciones:</strong>
                    <ul className="mt-2 space-y-1">
                        {mission.contenido.precauciones.map((precaucion, i) => (
                        <li key={i}>• {precaucion}</li>
                        ))}
                    </ul>
                    </AlertDescription>
                </Alert>
                )}
            </TabsContent>

            <TabsContent value="tips" className="space-y-4 mt-4">
                <Card>
                <CardContent className="pt-6">
                    <h3 className="font-bold mb-3">Consejos Pro</h3>
                    <div className="space-y-3">
                    {mission.contenido.tips?.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <p className="text-sm">{tip}</p>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>

                {mission.contenido.preguntasReflexion && (
                <Card>
                    <CardContent className="pt-6">
                    <h3 className="font-bold mb-3">Para reflexionar</h3>
                    <ul className="space-y-2">
                        {mission.contenido.preguntasReflexion.map((pregunta, i) => (
                        <li key={i} className="text-sm">
                            {i + 1}. {pregunta}
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                </Card>
                )}
            </TabsContent>
            </Tabs>
        </CardContent>
        </Card>
    );
    };

    export default MissionDetail;