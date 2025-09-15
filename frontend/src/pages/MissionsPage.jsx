import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, Filter, Clock, Award, TrendingUp, BookOpen, 
  Brain, Dumbbell, Heart, Users, Coffee, Moon, Star,
  ChevronRight, Lock, CheckCircle, PlayCircle, Target
} from 'lucide-react';
import MissionDetail from '@/components/missions/MissionDetail';
import { missionService } from '@/services/missionService';
import { useToast } from '@/components/ui/use-toast';

const MissionsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    dailyCompleted: 0,
    weeklyCompleted: 0,
    streak: 0
  });

  const categories = [
    { id: 'todas', name: 'Todas', icon: <Target className="w-4 h-4" /> },
    { id: 'ejercicio', name: 'Ejercicio', icon: <Dumbbell className="w-4 h-4" />, color: 'text-red-500' },
    { id: 'meditacion', name: 'Mindfulness', icon: <Brain className="w-4 h-4" />, color: 'text-purple-500' },
    { id: 'lectura', name: 'Aprendizaje', icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-500' },
    { id: 'nutricion', name: 'Nutrición', icon: <Coffee className="w-4 h-4" />, color: 'text-green-500' },
    { id: 'social', name: 'Social', icon: <Users className="w-4 h-4" />, color: 'text-yellow-500' },
    { id: 'gratitud', name: 'Gratitud', icon: <Heart className="w-4 h-4" />, color: 'text-pink-500' },
    { id: 'sueno', name: 'Sueño', icon: <Moon className="w-4 h-4" />, color: 'text-indigo-500' }
  ];

  useEffect(() => {
    loadMissions();
    loadUserProgress();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await missionService.getAllMissions();
      setMissions(data);
    } catch (error) {
      console.error('Error cargando misiones:', error);
      // Usar datos de ejemplo si el backend no responde
      setMissions(getMockMissions());
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const progress = await missionService.getUserProgress();
      setUserProgress(progress);
    } catch (error) {
      console.error('Error cargando progreso:', error);
    }
  };

  const handleStartMission = async (mission) => {
    try {
      await missionService.startMission(mission._id);
      toast({
        title: "¡Misión iniciada!",
        description: `Has comenzado: ${mission.titulo}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar la misión",
        variant: "destructive"
      });
    }
  };

  const handleCompleteMission = async (mission) => {
    try {
      const result = await missionService.completeMission(mission._id, mission.duracion);
      toast({
        title: "¡Misión completada! 🎉",
        description: `Has ganado ${result.experienciaGanada} XP`,
      });
      loadUserProgress();
      setSelectedMission(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la misión",
        variant: "destructive"
      });
    }
  };

  const filteredMissions = missions.filter(mission => {
    const matchesCategory = activeCategory === 'todas' || mission.categoria === activeCategory;
    const matchesSearch = mission.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mission.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (dificultad) => {
    switch(dificultad) {
      case 'principiante': return 'bg-green-100 text-green-800';
      case 'intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (categoria) => {
    const cat = categories.find(c => c.id === categoria);
    return cat ? cat.icon : <Target className="w-4 h-4" />;
  };

  if (selectedMission) {
    return (
      <div className="container mx-auto p-4">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedMission(null)}
          className="mb-4"
        >
          ← Volver a misiones
        </Button>
        <MissionDetail 
          mission={selectedMission}
          onStart={() => handleStartMission(selectedMission)}
          onComplete={() => handleCompleteMission(selectedMission)}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Misiones - ConnectONE</title>
        <meta name="description" content="Explora misiones diseñadas para transformar tu vida" />
      </Helmet>

      <div className="container mx-auto p-4 space-y-6">
        {/* Header con estadísticas */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-4">Centro de Misiones</h1>
          <p className="text-muted-foreground mb-6">
            Cada misión es un paso hacia tu mejor versión. Aprende, practica y transforma tu vida.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hoy</p>
                    <p className="text-2xl font-bold">{userProgress.dailyCompleted}/5</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Esta semana</p>
                    <p className="text-2xl font-bold">{userProgress.weeklyCompleted}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Racha</p>
                    <p className="text-2xl font-bold">{userProgress.streak} días</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Próximo nivel</p>
                    <Progress value={65} className="mt-2" />
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros avanzados
          </Button>
        </div>

        {/* Categorías */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="flex-shrink-0"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Tabs de misiones */}
        <Tabs defaultValue="recomendadas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recomendadas">Recomendadas</TabsTrigger>
            <TabsTrigger value="diarias">Diarias</TabsTrigger>
            <TabsTrigger value="programas">Programas</TabsTrigger>
            <TabsTrigger value="completadas">Completadas</TabsTrigger>
          </TabsList>

          <TabsContent value="recomendadas" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Cargando misiones...</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMissions.map(mission => (
                  <Card 
                    key={mission._id || mission.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMission(mission)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(mission.categoria)}
                          <Badge variant="outline">{mission.categoria}</Badge>
                        </div>
                        <Badge className={getDifficultyColor(mission.dificultad)}>
                          {mission.dificultad}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{mission.titulo}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {mission.descripcion}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mission.duracion} min
                          </span>
                          <span className="flex items-center gap-1 font-bold text-primary">
                            <Award className="w-4 h-4" />
                            +{mission.experiencia} XP
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="diarias">
            <Card>
              <CardHeader>
                <CardTitle>Misiones Diarias</CardTitle>
                <p className="text-muted-foreground">
                  Completa estas misiones hoy para mantener tu racha
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMissions.slice(0, 5).map((mission, index) => (
                    <div 
                      key={mission._id || mission.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => setSelectedMission(mission)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{mission.titulo}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {mission.duracion} min
                            <span className="mx-2">•</span>
                            <Award className="w-3 h-3" />
                            +{mission.experiencia} XP
                          </div>
                        </div>
                      </div>
                      <Button size="sm">
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programas">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-2 border-primary">
                <CardHeader>
                  <Badge className="w-fit mb-2">Programa de 30 días</Badge>
                  <CardTitle>Transformación Total</CardTitle>
                  <p className="text-muted-foreground">
                    Un programa completo para cambiar tu vida en 30 días
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progreso</span>
                      <span className="font-bold">0/30 días</span>
                    </div>
                    <Progress value={0} />
                    <Button className="w-full">
                      Comenzar programa
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Programa de 7 días</Badge>
                  <CardTitle>Semana de Mindfulness</CardTitle>
                  <p className="text-muted-foreground">
                    Aprende a meditar y reducir el estrés en una semana
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progreso</span>
                      <span className="font-bold">0/7 días</span>
                    </div>
                    <Progress value={0} />
                    <Button className="w-full" variant="outline">
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completadas">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Misiones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Aquí aparecerán las misiones que hayas completado
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// Función para obtener misiones de ejemplo si el backend no responde
const getMockMissions = () => [
  {
    id: '1',
    titulo: 'Rutina Matutina Energizante',
    descripcion: 'Comienza tu día con energía y claridad mental',
    categoria: 'ejercicio',
    duracion: 15,
    experiencia: 50,
    dificultad: 'principiante',
    contenido: {
      introduccion: 'Una rutina matutina establece el tono para todo tu día...',
      ciencia: 'Estudios demuestran que el ejercicio matutino mejora el estado de ánimo...',
      instrucciones: [
        { paso: 1, descripcion: 'Estiramientos suaves', duracion: '3 minutos' },
        { paso: 2, descripcion: 'Ejercicios de activación', duracion: '7 minutos' },
        { paso: 3, descripcion: 'Respiración y gratitud', duracion: '5 minutos' }
      ],
      beneficios: ['Más energía', 'Mejor enfoque', 'Reduce estrés'],
      tips: ['Hazlo a la misma hora cada día', 'Prepara tu espacio la noche anterior']
    }
  },
  // Añade más misiones de ejemplo...
];

export default MissionsPage;