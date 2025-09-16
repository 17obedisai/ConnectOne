import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Target, Clock, Award, Users, TrendingUp,
  Calendar, CheckCircle, Star, Zap, Mountain
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ChallengesPage = () => {
  const { toast } = useToast();
  const [weeklyChallenge, setWeeklyChallenge] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Retos semanales con explicación de beneficios
  const weeklyMissions = [
    {
      id: 'w1',
      title: 'Semana de Mindfulness Profundo',
      description: 'Medita 20 minutos diarios durante 7 días consecutivos',
      category: 'mindfulness',
      requirements: [
        { task: 'Meditación matutina (20 min)', dailyRequired: true },
        { task: 'Journaling de reflexión', dailyRequired: true },
        { task: 'Respiración consciente 3 veces al día', dailyRequired: true }
      ],
      rewards: {
        xp: 500,
        badge: 'Maestro Zen',
        unlock: 'Meditaciones avanzadas'
      },
      benefits: {
        shortTerm: [
          'Reducción inmediata del 40% en niveles de cortisol',
          'Mejora del sueño desde la primera noche',
          'Mayor claridad mental y enfoque'
        ],
        longTerm: [
          'Cambios estructurales en el cerebro (más materia gris)',
          'Reducción del 50% en síntomas de ansiedad',
          'Mejora permanente en regulación emocional',
          'Aumento de la creatividad y resolución de problemas'
        ],
        scientific: 'Estudios de Harvard demuestran que 8 semanas de práctica regular cambian físicamente la estructura cerebral, aumentando el hipocampo (memoria) y reduciendo la amígdala (miedo).'
      },
      difficulty: 'intermedio',
      timeCommitment: '30 min/día',
      icon: '🧘'
    },
    {
      id: 'w2',
      title: 'Desafío de Transformación Física',
      description: 'Completa rutinas de ejercicio progresivas durante 7 días',
      category: 'fitness',
      requirements: [
        { task: 'Rutina de fuerza (30 min)', dailyRequired: true },
        { task: 'Cardio o caminata (20 min)', dailyRequired: true },
        { task: 'Estiramientos (10 min)', dailyRequired: true }
      ],
      rewards: {
        xp: 600,
        badge: 'Guerrero Fitness',
        unlock: 'Rutinas avanzadas personalizadas'
      },
      benefits: {
        shortTerm: [
          'Aumento del 25% en energía diaria',
          'Mejora inmediata del estado de ánimo',
          'Mejor calidad de sueño'
        ],
        longTerm: [
          'Aumento de masa muscular y fuerza',
          'Reducción del 30% en riesgo de enfermedades crónicas',
          'Mejora de la densidad ósea',
          'Aumento de la longevidad (hasta 7 años más de vida)'
        ],
        scientific: 'El ejercicio regular aumenta el BDNF (factor neurotrófico), creando nuevas neuronas y mejorando la memoria. También activa la producción de endorfinas, mejorando el estado de ánimo de forma natural.'
      },
      difficulty: 'intermedio',
      timeCommitment: '60 min/día',
      icon: '💪'
    },
    {
      id: 'w3',
      title: 'Conexión Social Profunda',
      description: 'Fortalece tus relaciones durante 7 días',
      category: 'social',
      requirements: [
        { task: 'Conversación significativa (sin dispositivos)', dailyRequired: true },
        { task: 'Acto de bondad aleatorio', dailyRequired: true },
        { task: 'Expresar gratitud a alguien', dailyRequired: true }
      ],
      rewards: {
        xp: 400,
        badge: 'Corazón Conectado',
        unlock: 'Misiones de impacto social'
      },
      benefits: {
        shortTerm: [
          'Aumento inmediato de oxitocina (hormona del amor)',
          'Reducción del estrés y la soledad',
          'Mayor sensación de pertenencia'
        ],
        longTerm: [
          'Las relaciones fuertes aumentan la esperanza de vida en 50%',
          'Mejor sistema inmunológico',
          'Reducción del riesgo de depresión en 40%',
          'Mayor resiliencia ante adversidades'
        ],
        scientific: 'El Harvard Study of Adult Development (80+ años) demostró que la calidad de las relaciones es el factor #1 para la felicidad y salud a largo plazo.'
      },
      difficulty: 'fácil',
      timeCommitment: '30 min/día',
      icon: '❤️'
    }
  ];

  useEffect(() => {
    // Cargar el reto actual de la semana
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyMissions.length;
    setWeeklyChallenge(weeklyMissions[currentWeek]);
    
    // Cargar progreso del usuario
    const savedProgress = localStorage.getItem('weeklyProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleJoinChallenge = () => {
    toast({
      title: "¡Te has unido al reto!",
      description: "Completa las tareas diarias para ganar las recompensas"
    });
    
    const newProgress = {
      challengeId: weeklyChallenge.id,
      startDate: new Date().toISOString(),
      daysCompleted: 0,
      tasksCompleted: {}
    };
    
    setUserProgress(newProgress);
    localStorage.setItem('weeklyProgress', JSON.stringify(newProgress));
  };

  return (
    <>
      <Helmet>
        <title>Retos Semanales - ConnectONE</title>
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-2">Retos Semanales</h1>
          <p className="text-muted-foreground">
            Desafíos diseñados científicamente para crear cambios duraderos en tu vida
          </p>
        </div>

        {/* Reto actual */}
        {weeklyChallenge && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl">{weeklyChallenge.icon}</span>
                    <Badge>{weeklyChallenge.category}</Badge>
                    <Badge variant="outline">{weeklyChallenge.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{weeklyChallenge.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{weeklyChallenge.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">+{weeklyChallenge.rewards.xp} XP</p>
                  <p className="text-sm text-muted-foreground">{weeklyChallenge.timeCommitment}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Requisitos diarios */}
              <div>
                <h3 className="font-semibold mb-3">Tareas Diarias</h3>
                <div className="space-y-2">
                  {weeklyChallenge.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="w-5 h-5 text-muted-foreground" />
                      <span>{req.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Beneficios Inmediatos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {weeklyChallenge.benefits.shortTerm.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Beneficios a Largo Plazo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {weeklyChallenge.benefits.longTerm.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Mountain className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Base científica */}
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      🔬
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Base Científica</h4>
                      <p className="text-sm">{weeklyChallenge.benefits.scientific}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recompensas */}
              <div>
                <h3 className="font-semibold mb-3">Recompensas al Completar</h3>
                <div className="flex gap-4">
                  <Badge className="p-2">
                    <Trophy className="w-4 h-4 mr-1" />
                    {weeklyChallenge.rewards.badge}
                  </Badge>
                  <Badge variant="outline" className="p-2">
                    <Star className="w-4 h-4 mr-1" />
                    {weeklyChallenge.rewards.unlock}
                  </Badge>
                </div>
              </div>

              {/* Botón de acción */}
              {!userProgress.challengeId ? (
                <Button className="w-full" size="lg" onClick={handleJoinChallenge}>
                  Unirse al Reto
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{userProgress.daysCompleted || 0}/7 días</span>
                  </div>
                  <Progress value={(userProgress.daysCompleted || 0) * 14.3} />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Por qué los retos semanales */}
        <Card>
          <CardHeader>
            <CardTitle>¿Por qué Retos Semanales?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Los retos semanales están diseñados basándose en la neurociencia del cambio de hábitos.
              Se necesitan al menos 7 días de práctica consistente para comenzar a formar nuevas conexiones
              neuronales, y 21-66 días para consolidar un hábito.
            </p>
            <p className="mt-3">
              Cada reto semanal es un "sprint" intensivo que te permite experimentar los beneficios
              de un hábito específico, aumentando la probabilidad de que lo integres permanentemente
              en tu vida.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChallengesPage;