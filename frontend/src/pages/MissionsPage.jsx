import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, Clock, Award, TrendingUp, BookOpen, Brain, Dumbbell, 
  Heart, Users, Coffee, Moon, Star, CheckCircle, PlayCircle, 
  Target, Calendar, Timer, Camera, FileText, Mic
} from 'lucide-react';
import MissionDetail from '@/components/missions/MissionDetail';
import { useToast } from '@/components/ui/use-toast';

const MissionsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [activeTab, setActiveTab] = useState('diarias');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationModal, setVerificationModal] = useState(null);
  const [verificationData, setVerificationData] = useState({});

  // Misiones diarias completas
  const dailyMissions = [
    {
      id: 'd1',
      titulo: 'Despertar Mindful',
      descripcion: 'Comienza el día con 10 minutos de meditación guiada',
      categoria: 'meditacion',
      duracion: 10,
      experiencia: 50,
      dificultad: 'principiante',
      tiempoVerificacion: 600000, // 10 minutos en ms
      contenido: {
        introduccion: 'La meditación matutina establece el tono para todo tu día. Solo 10 minutos pueden reducir el estrés en un 40% y mejorar tu enfoque durante las próximas 8 horas.',
        ciencia: 'Estudios de Harvard muestran que 8 semanas de meditación aumentan la materia gris en el hipocampo (memoria y aprendizaje) y reducen la amígdala (centro del miedo).',
        instrucciones: [
          { paso: 1, descripcion: 'Encuentra un lugar tranquilo y siéntate cómodamente', duracion: '1 min' },
          { paso: 2, descripcion: 'Cierra los ojos y toma 3 respiraciones profundas', duracion: '1 min' },
          { paso: 3, descripcion: 'Enfócate en tu respiración natural', duracion: '5 min' },
          { paso: 4, descripcion: 'Si tu mente divaga, regresa gentilmente a la respiración', duracion: '2 min' },
          { paso: 5, descripcion: 'Termina con gratitud por este momento', duracion: '1 min' }
        ],
        beneficios: [
          'Reduce el cortisol (hormona del estrés) en 23%',
          'Mejora la concentración hasta 8 horas',
          'Aumenta la producción de serotonina',
          'Mejora la calidad del sueño'
        ],
        tips: [
          'Usa la app Headspace o Calm para guiarte',
          'Establece un horario fijo cada día',
          'Empieza con 5 minutos si 10 es mucho',
          'No juzgues los pensamientos que surjan'
        ],
        verificacion: {
          tipo: 'timer',
          preguntas: [
            '¿Cómo te sientes después de meditar?',
            '¿Qué pensamientos surgieron con más frecuencia?'
          ]
        }
      }
    },
    {
      id: 'd2',
      titulo: 'Movimiento Matutino',
      descripcion: '15 minutos de ejercicio para activar tu metabolismo',
      categoria: 'ejercicio',
      duracion: 15,
      experiencia: 75,
      dificultad: 'principiante',
      tiempoVerificacion: 900000,
      contenido: {
        introduccion: 'El ejercicio matutino aumenta tu metabolismo en un 15% durante todo el día y mejora tu estado de ánimo instantáneamente.',
        ciencia: 'El ejercicio libera BDNF (factor neurotrófico), creando nuevas neuronas y mejorando la memoria. También produce endorfinas que actúan como analgésicos naturales.',
        ejercicios: [
          {
            nombre: 'Jumping Jacks',
            series: 3,
            repeticiones: '20',
            descanso: '30 segundos',
            tecnica: 'Salta abriendo piernas y brazos simultáneamente'
          },
          {
            nombre: 'Sentadillas',
            series: 3,
            repeticiones: '15',
            descanso: '30 segundos',
            tecnica: 'Baja manteniendo la espalda recta, peso en talones'
          },
          {
            nombre: 'Flexiones',
            series: 3,
            repeticiones: '10',
            descanso: '30 segundos',
            tecnica: 'Mantén el cuerpo en línea recta'
          }
        ],
        beneficios: [
          'Quema 150 calorías extra durante el día',
          'Aumenta la energía en 65%',
          'Mejora el estado de ánimo por 12 horas',
          'Fortalece el sistema inmunológico'
        ],
        verificacion: {
          tipo: 'checklist',
          items: ['Calentamiento completado', 'Ejercicios realizados', 'Enfriamiento hecho']
        }
      }
    },
    {
      id: 'd3',
      titulo: 'Desayuno Consciente',
      descripcion: 'Prepara y disfruta un desayuno nutritivo sin distracciones',
      categoria: 'nutricion',
      duracion: 20,
      experiencia: 40,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Un desayuno nutritivo y consciente mejora tu concentración en un 30% y reduce los antojos durante el día.',
        ciencia: 'Comer sin distracciones mejora la digestión en un 40% y aumenta la sensación de saciedad, reduciendo el consumo calórico diario en 200-300 calorías.',
        instrucciones: [
          { paso: 1, descripcion: 'Prepara un desayuno con proteínas, grasas saludables y carbohidratos complejos', duracion: '10 min' },
          { paso: 2, descripcion: 'Siéntate en un lugar tranquilo sin dispositivos', duracion: '1 min' },
          { paso: 3, descripcion: 'Come lentamente, masticando bien cada bocado', duracion: '8 min' },
          { paso: 4, descripcion: 'Agradece por tu alimento', duracion: '1 min' }
        ],
        beneficios: [
          'Mejora la digestión y absorción de nutrientes',
          'Reduce el estrés relacionado con la comida',
          'Aumenta la satisfacción con menos cantidad',
          'Estabiliza los niveles de azúcar en sangre'
        ],
        verificacion: {
          tipo: 'photo',
          pregunta: 'Comparte una foto de tu desayuno nutritivo'
        }
      }
    },
    {
      id: 'd4',
      titulo: 'Lectura de Crecimiento',
      descripcion: '20 minutos de lectura que expanda tu mente',
      categoria: 'lectura',
      duracion: 20,
      experiencia: 45,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Leer 20 minutos al día puede añadir 2 años a tu vida y mejorar tu vocabulario en un 15% en solo 3 meses.',
        ciencia: 'La lectura reduce el deterioro cognitivo en un 32% y puede reducir el estrés en un 68% en solo 6 minutos.',
        instrucciones: [
          { paso: 1, descripcion: 'Elige un libro de desarrollo personal o tu género favorito', duracion: '2 min' },
          { paso: 2, descripcion: 'Encuentra un lugar cómodo y sin distracciones', duracion: '1 min' },
          { paso: 3, descripcion: 'Lee activamente, subrayando ideas importantes', duracion: '15 min' },
          { paso: 4, descripcion: 'Reflexiona y anota 3 ideas clave', duracion: '2 min' }
        ],
        beneficios: [
          'Mejora la memoria y concentración',
          'Reduce el estrés más que caminar',
          'Aumenta la empatía y inteligencia emocional',
          'Mejora la calidad del sueño si lees antes de dormir'
        ],
        verificacion: {
          tipo: 'text',
          pregunta: '¿Cuáles fueron las 3 ideas principales que aprendiste hoy?'
        }
      }
    },
    {
      id: 'd5',
      titulo: 'Gratitud Nocturna',
      descripcion: 'Escribe 3 cosas por las que estás agradecido',
      categoria: 'gratitud',
      duracion: 10,
      experiencia: 35,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Practicar gratitud aumenta la felicidad en un 25% y mejora las relaciones personales significativamente.',
        ciencia: 'La gratitud activa el hipotálamo (regula el estrés) y aumenta la dopamina, creando un ciclo positivo en el cerebro.',
        instrucciones: [
          { paso: 1, descripcion: 'Toma tu diario o abre una nota', duracion: '1 min' },
          { paso: 2, descripcion: 'Escribe 3 cosas específicas por las que estás agradecido', duracion: '5 min' },
          { paso: 3, descripcion: 'Describe por qué estás agradecido por cada una', duracion: '3 min' },
          { paso: 4, descripcion: 'Siente la gratitud en tu cuerpo', duracion: '1 min' }
        ],
        beneficios: [
          'Mejora el sueño en un 25%',
          'Reduce síntomas de depresión',
          'Fortalece el sistema inmunológico',
          'Aumenta la generosidad y empatía'
        ],
        verificacion: {
          tipo: 'text',
          pregunta: 'Comparte una cosa por la que estés especialmente agradecido hoy'
        }
      }
    },
    {
      id: 'd6',
      titulo: 'Hidratación Inteligente',
      descripcion: 'Bebe 8 vasos de agua distribuidos durante el día',
      categoria: 'nutricion',
      duracion: 5,
      experiencia: 30,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Mantenerte hidratado mejora tu energía en un 20% y tu capacidad mental en un 14%.',
        ciencia: 'El cerebro es 75% agua. Una deshidratación del 2% reduce la memoria, atención y habilidades motoras.',
        beneficios: [
          'Mejora el rendimiento físico y mental',
          'Ayuda a eliminar toxinas',
          'Mejora la piel y previene dolores de cabeza',
          'Aumenta el metabolismo en un 3%'
        ],
        verificacion: {
          tipo: 'counter',
          meta: 8,
          unidad: 'vasos'
        }
      }
    },
    {
      id: 'd7',
      titulo: 'Conexión Social',
      descripcion: 'Ten una conversación significativa con alguien importante',
      categoria: 'social',
      duracion: 15,
      experiencia: 40,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Las conexiones sociales fuertes pueden aumentar tu esperanza de vida en un 50%.',
        ciencia: 'Las interacciones sociales positivas liberan oxitocina, reduciendo el cortisol y la presión arterial.',
        beneficios: [
          'Reduce el riesgo de depresión en 40%',
          'Mejora el sistema inmunológico',
          'Aumenta la sensación de propósito',
          'Mejora la salud cardiovascular'
        ],
        verificacion: {
          tipo: 'confirm',
          pregunta: '¿Tuviste una conversación significativa hoy?'
        }
      }
    },
    {
      id: 'd8',
      titulo: 'Respiración 4-7-8',
      descripcion: 'Practica la técnica de respiración para reducir el estrés',
      categoria: 'meditacion',
      duracion: 5,
      experiencia: 25,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Esta técnica de respiración puede reducir la ansiedad en un 40% en solo 5 minutos.',
        ciencia: 'La respiración 4-7-8 activa el sistema nervioso parasimpático, reduciendo el cortisol y la frecuencia cardíaca.',
        instrucciones: [
          { paso: 1, descripcion: 'Inhala por la nariz durante 4 segundos', duracion: '4 seg' },
          { paso: 2, descripcion: 'Mantén la respiración por 7 segundos', duracion: '7 seg' },
          { paso: 3, descripcion: 'Exhala por la boca durante 8 segundos', duracion: '8 seg' },
          { paso: 4, descripcion: 'Repite 4 veces', duracion: '4 min' }
        ],
        beneficios: [
          'Reduce la ansiedad instantáneamente',
          'Mejora la calidad del sueño',
          'Baja la presión arterial',
          'Mejora la digestión'
        ],
        verificacion: {
          tipo: 'timer',
          duracion: 5
        }
      }
    },
    {
      id: 'd9',
      titulo: 'Estiramiento Vespertino',
      descripcion: '10 minutos de estiramientos para liberar tensión',
      categoria: 'ejercicio',
      duracion: 10,
      experiencia: 35,
      dificultad: 'principiante',
      contenido: {
        introduccion: 'Los estiramientos nocturnos mejoran la calidad del sueño en un 30% y reducen dolores musculares.',
        ciencia: 'Estirar libera endorfinas y activa el sistema nervioso parasimpático, preparando el cuerpo para el descanso.',
        beneficios: [
          'Mejora la flexibilidad y postura',
          'Reduce el dolor de espalda',
          'Mejora la circulación',
          'Prepara el cuerpo para dormir'
        ],
        verificacion: {
          tipo: 'checklist',
          items: ['Cuello y hombros', 'Espalda', 'Piernas', 'Respiración profunda']
        }
      }
    },
    {
      id: 'd10',
      titulo: 'Digital Detox',
      descripcion: '1 hora sin dispositivos antes de dormir',
      categoria: 'bienestar',
      duracion: 60,
      experiencia: 60,
      dificultad: 'intermedio',
      contenido: {
        introduccion: 'Desconectarse de dispositivos 1 hora antes de dormir mejora la calidad del sueño en un 50%.',
        ciencia: 'La luz azul suprime la melatonina. Evitarla permite que el cuerpo produzca esta hormona del sueño naturalmente.',
        beneficios: [
          'Mejora la calidad del sueño profundo',
          'Reduce la ansiedad nocturna',
          'Mejora la memoria y consolidación del aprendizaje',
          'Reduce la fatiga ocular'
        ],
        verificacion: {
          tipo: 'timer',
          duracion: 60
        }
      }
    }
  ];

  // Misiones semanales (retos más largos)
  const weeklyMissions = [
    {
      id: 'w1',
      titulo: 'Semana de Transformación Mindful',
      descripcion: '7 días de meditación progresiva para cambiar tu mente',
      categoria: 'meditacion',
      duracion: 7,
      experiencia: 500,
      dificultad: 'intermedio',
      tipo: 'semanal',
      contenido: {
        introduccion: 'Una semana de práctica consistente puede crear cambios medibles en la estructura de tu cerebro.',
        ciencia: 'Después de 7 días de meditación, los escáneres cerebrales muestran aumento en la materia gris y reducción en la actividad de la amígdala.',
        programa: [
          { dia: 1, actividad: 'Meditación de respiración - 10 min', enfoque: 'Establecer la base' },
          { dia: 2, actividad: 'Body scan - 15 min', enfoque: 'Consciencia corporal' },
          { dia: 3, actividad: 'Meditación de bondad amorosa - 15 min', enfoque: 'Compasión' },
          { dia: 4, actividad: 'Meditación caminando - 20 min', enfoque: 'Mindfulness en movimiento' },
          { dia: 5, actividad: 'Meditación de visualización - 20 min', enfoque: 'Poder de la mente' },
          { dia: 6, actividad: 'Meditación sin guía - 25 min', enfoque: 'Práctica independiente' },
          { dia: 7, actividad: 'Meditación de gratitud - 30 min', enfoque: 'Integración y celebración' }
        ],
        beneficios: [
          'Reducción del 40% en síntomas de ansiedad',
          'Mejora del 30% en la calidad del sueño',
          'Aumento del 25% en la sensación de bienestar',
          'Mejora significativa en la regulación emocional'
        ],
        verificacion: {
          tipo: 'diario',
          checkpoints: 7
        }
      }
    },
    {
      id: 'w2',
      titulo: 'Reto Fitness de 7 Días',
      descripcion: 'Transforma tu cuerpo y energía en una semana',
      categoria: 'ejercicio',
      duracion: 7,
      experiencia: 600,
      dificultad: 'intermedio',
      tipo: 'semanal',
      contenido: {
        introduccion: 'Una semana de ejercicio consistente puede aumentar tu energía en un 40% y mejorar tu estado de ánimo significativamente.',
        programa: [
          { dia: 1, actividad: 'Cardio HIIT - 20 min', enfoque: 'Activación metabólica' },
          { dia: 2, actividad: 'Fuerza tren superior - 30 min', enfoque: 'Desarrollo muscular' },
          { dia: 3, actividad: 'Yoga restaurativo - 30 min', enfoque: 'Recuperación activa' },
          { dia: 4, actividad: 'Fuerza tren inferior - 30 min', enfoque: 'Piernas y glúteos' },
          { dia: 5, actividad: 'Cardio moderado - 35 min', enfoque: 'Resistencia' },
          { dia: 6, actividad: 'Full body - 40 min', enfoque: 'Integración' },
          { dia: 7, actividad: 'Stretching profundo - 30 min', enfoque: 'Recuperación' }
        ],
        beneficios: [
          'Aumento del 15% en fuerza muscular',
          'Mejora del 20% en resistencia cardiovascular',
          'Pérdida de 1-2 kg de grasa corporal',
          'Aumento significativo en energía diaria'
        ],
        verificacion: {
          tipo: 'checklist_diario',
          items: ['Calentamiento', 'Ejercicio principal', 'Enfriamiento', 'Hidratación']
        }
      }
    },
    {
      id: 'w3',
      titulo: 'Semana de Nutrición Consciente',
      descripcion: 'Transforma tu relación con la comida',
      categoria: 'nutricion',
      duracion: 7,
      experiencia: 450,
      dificultad: 'principiante',
      tipo: 'semanal',
      contenido: {
        introduccion: 'Cambiar tus hábitos alimenticios durante una semana puede resetear tu paladar y mejorar tu energía en un 30%.',
        programa: [
          { dia: 1, actividad: 'Eliminar azúcar procesada', enfoque: 'Desintoxicación' },
          { dia: 2, actividad: 'Añadir 5 porciones de vegetales', enfoque: 'Nutrientes' },
          { dia: 3, actividad: 'Ayuno intermitente 16:8', enfoque: 'Regeneración' },
          { dia: 4, actividad: 'Preparación de comidas', enfoque: 'Planificación' },
          { dia: 5, actividad: 'Mindful eating en cada comida', enfoque: 'Consciencia' },
          { dia: 6, actividad: 'Cocinar una receta nueva saludable', enfoque: 'Exploración' },
          { dia: 7, actividad: 'Reflexión y plan futuro', enfoque: 'Sostenibilidad' }
        ],
        beneficios: [
          'Pérdida de 1-2 kg de peso',
          'Mejora en niveles de energía',
          'Mejor digestión y menos inflamación',
          'Reducción de antojos'
        ],
        verificacion: {
          tipo: 'photo_diario',
          descripcion: 'Comparte fotos de tus comidas saludables'
        }
      }
    },
    {
      id: 'w4',
      titulo: 'Desafío de Productividad',
      descripcion: '7 días para dominar tu tiempo y energía',
      categoria: 'productividad',
      duracion: 7,
      experiencia: 400,
      dificultad: 'intermedio',
      tipo: 'semanal',
      contenido: {
        introduccion: 'Una semana de hábitos de productividad puede aumentar tu eficiencia en un 40% a largo plazo.',
        programa: [
          { dia: 1, actividad: 'Establecer 3 MITs (Most Important Tasks)', enfoque: 'Priorización' },
          { dia: 2, actividad: 'Técnica Pomodoro todo el día', enfoque: 'Gestión del tiempo' },
          { dia: 3, actividad: 'Deep work por 2 horas sin interrupciones', enfoque: 'Concentración' },
          { dia: 4, actividad: 'Organización digital y física', enfoque: 'Ambiente' },
          { dia: 5, actividad: 'Batch processing de tareas similares', enfoque: 'Eficiencia' },
          { dia: 6, actividad: 'Revisión semanal y planificación', enfoque: 'Estrategia' },
          { dia: 7, actividad: 'Día de descanso activo', enfoque: 'Recuperación' }
        ],
        beneficios: [
          'Aumento del 40% en tareas completadas',
          'Reducción del 50% en procrastinación',
          'Mejor balance trabajo-vida',
          'Mayor sensación de control'
        ]
      }
    },
    {
      id: 'w5',
      titulo: 'Semana de Conexión Social',
      descripcion: 'Fortalece tus relaciones y expande tu círculo',
      categoria: 'social',
      duracion: 7,
      experiencia: 350,
      dificultad: 'principiante',
      tipo: 'semanal',
      contenido: {
        introduccion: 'Las conexiones sociales fuertes son el factor #1 para la felicidad y longevidad.',
        programa: [
          { dia: 1, actividad: 'Llamar a un viejo amigo', enfoque: 'Reconexión' },
          { dia: 2, actividad: 'Acto de bondad para un extraño', enfoque: 'Generosidad' },
          { dia: 3, actividad: 'Cena sin dispositivos con familia', enfoque: 'Presencia' },
          { dia: 4, actividad: 'Unirse a una actividad grupal', enfoque: 'Comunidad' },
          { dia: 5, actividad: 'Expresar gratitud a 3 personas', enfoque: 'Apreciación' },
          { dia: 6, actividad: 'Organizar un encuentro social', enfoque: 'Iniciativa' },
          { dia: 7, actividad: 'Reflexión sobre relaciones', enfoque: 'Evaluación' }
        ],
        beneficios: [
          'Reducción del 40% en sensación de soledad',
          'Aumento en felicidad percibida',
          'Mejora en salud mental',
          'Expansión de red de apoyo'
        ]
      }
    }
  ];

  // Sistema de verificación
  const handleVerification = (mission, type, data) => {
    switch(type) {
      case 'timer':
        // Iniciar temporizador
        setTimeout(() => {
          completeMission(mission);
        }, mission.tiempoVerificacion);
        toast({
          title: "Timer iniciado",
          description: `Completa ${mission.duracion} minutos de ${mission.titulo}`
        });
        break;
        
      case 'photo':
        // Solicitar foto
        setVerificationModal({
          type: 'photo',
          mission: mission
        });
        break;
        
      case 'text':
        // Solicitar respuesta escrita
        setVerificationModal({
          type: 'text',
          mission: mission
        });
        break;
        
      case 'checklist':
        // Mostrar checklist
        setVerificationModal({
          type: 'checklist',
          mission: mission
        });
        break;
        
      default:
        completeMission(mission);
    }
  };

  const completeMission = (mission) => {
    toast({
      title: "¡Misión completada! 🎉",
      description: `Has ganado ${mission.experiencia} XP`
    });
    // Actualizar estado y backend
  };

  const allMissions = [...dailyMissions, ...weeklyMissions];
  const filteredMissions = allMissions.filter(mission => {
    const matchesTab = activeTab === 'todas' || 
                       (activeTab === 'diarias' && !mission.tipo) ||
                       (activeTab === 'semanales' && mission.tipo === 'semanal');
    const matchesSearch = mission.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Misiones - ConnectONE</title>
      </Helmet>

      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-4">Centro de Misiones</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="diarias">Misiones Diarias</TabsTrigger>
            <TabsTrigger value="semanales">Retos Semanales</TabsTrigger>
            <TabsTrigger value="todas">Todas</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {selectedMission ? (
              <MissionDetail 
                mission={selectedMission}
                onBack={() => setSelectedMission(null)}
                onStart={() => handleVerification(selectedMission, selectedMission.contenido.verificacion?.tipo)}
                onComplete={() => completeMission(selectedMission)}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMissions.map(mission => (
                  <Card 
                    key={mission.id}
                    className="hover:shadow-lg cursor-pointer"
                    onClick={() => setSelectedMission(mission)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{mission.titulo}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {mission.descripcion}
                          </p>
                        </div>
                        <Badge>{mission.categoria}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mission.tipo === 'semanal' ? `${mission.duracion} días` : `${mission.duracion} min`}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-primary">
                            <Award className="w-4 h-4" />
                            +{mission.experiencia} XP
                          </span>
                        </div>
                        <Button size="sm">
                          <PlayCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal de verificación */}
        {verificationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Verificar Misión</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Contenido del modal según tipo de verificación */}
                <Button onClick={() => {
                  completeMission(verificationModal.mission);
                  setVerificationModal(null);
                }}>
                  Confirmar Completado
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default MissionsPage;