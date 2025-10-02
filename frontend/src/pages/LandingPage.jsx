import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Sparkles, Target, Heart, Brain, Dumbbell, Users, Moon, Book,
  ChevronRight, CheckCircle, Trophy, Zap, Shield, Award, Gift,
  ArrowRight, Calendar, Clock, BarChart, TrendingUp, Activity,
  Menu, X, Play, Pause, Volume2, VolumeX, Mail, Phone, MapPin,
  Github, Linkedin, Instagram, Twitter, Send, MessageCircle,
  Flame, Coffee, Sun, CloudRain, Wind, Sunrise
} from 'lucide-react';
import confetti from 'canvas-confetti';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particlesVisible, setParticlesVisible] = useState(true);
  const [currentMissionCategory, setCurrentMissionCategory] = useState(0);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Partículas flotantes de fondo
  const [floatingElements] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      emoji: ['✨', '⭐', '💫', '🌟', '🌙', '☁️'][Math.floor(Math.random() * 6)]
    }))
  );

  // Auto-rotar testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Categorías de misiones mejoradas
  const missionCategories = [
    {
      id: 'ejercicio',
      icon: '💪',
      title: 'Fitness Energético',
      description: 'Rutinas que transforman tu cuerpo y mente',
      color: 'from-red-500 to-orange-500',
      benefits: ['Fuerza', 'Resistencia', 'Energía'],
      missions: ['HIIT Express', 'Yoga Matutino', 'Caminata Mindful']
    },
    {
      id: 'meditacion',
      icon: '🧘',
      title: 'Meditación Profunda',
      description: 'Paz interior y claridad mental',
      color: 'from-purple-500 to-indigo-500',
      benefits: ['Calma', 'Focus', 'Consciencia'],
      missions: ['Respiración 4-7-8', 'Body Scan', 'Mindfulness']
    },
    {
      id: 'lectura',
      icon: '📚',
      title: 'Lectura Transformadora',
      description: 'Expande tu mente y conocimiento',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Sabiduría', 'Creatividad', 'Vocabulario'],
      missions: ['20 min diarios', 'Toma de notas', 'Reflexión']
    },
    {
      id: 'habitos',
      icon: '🎯',
      title: 'Hábitos Dorados',
      description: 'Construye rutinas que cambian vidas',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Disciplina', 'Constancia', 'Progreso'],
      missions: ['Morning Routine', 'Planificación', 'Journaling']
    },
    {
      id: 'social',
      icon: '🤝',
      title: 'Conexión Humana',
      description: 'Fortalece tus vínculos y relaciones',
      color: 'from-pink-500 to-rose-500',
      benefits: ['Empatía', 'Comunicación', 'Amor'],
      missions: ['Llamada familiar', 'Acto de bondad', 'Gratitud']
    },
    {
      id: 'sueno',
      icon: '😴',
      title: 'Sueño Reparador',
      description: 'Optimiza tu descanso y recuperación',
      color: 'from-indigo-500 to-purple-500',
      benefits: ['Recuperación', 'Memoria', 'Salud'],
      missions: ['Rutina nocturna', 'Sin pantallas', 'Meditación sleep']
    }
  ];

  // Características principales
  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Sistema de Gamificación',
      description: 'Convierte tu desarrollo personal en una aventura épica con niveles, logros y recompensas',
      gradient: 'from-yellow-500 to-amber-500',
      details: ['16 niveles únicos', '100+ logros', 'Skins exclusivas']
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'IA Personalizada',
      description: 'Recomendaciones inteligentes que se adaptan a tu estilo de vida y objetivos',
      gradient: 'from-purple-500 to-pink-500',
      details: ['Misiones personalizadas', 'Análisis de progreso', 'Consejos adaptativos']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comunidad Vibrante',
      description: 'Conecta con miles de personas en tu mismo viaje de transformación',
      gradient: 'from-blue-500 to-cyan-500',
      details: ['Grupos de apoyo', 'Desafíos grupales', 'Mentores']
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Tracking Completo',
      description: 'Visualiza tu progreso con estadísticas detalladas y gráficos interactivos',
      gradient: 'from-green-500 to-emerald-500',
      details: ['Dashboard visual', 'Métricas detalladas', 'Reportes semanales']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacidad Total',
      description: 'Tus datos están seguros y bajo tu completo control siempre',
      gradient: 'from-red-500 to-pink-500',
      details: ['Encriptación total', 'Sin publicidad', 'Control de datos']
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Experiencia Mágica',
      description: 'Interfaz hermosa y fluida que hace del bienestar algo divertido',
      gradient: 'from-indigo-500 to-purple-500',
      details: ['Animaciones fluidas', 'Temas personalizables', 'Modo oscuro/claro']
    }
  ];

  // Testimonios
  const testimonios = [
    {
      nombre: 'María González',
      edad: 28,
      avatar: '👩‍💼',
      testimonio: 'ConnectONE cambió mi vida. En 3 meses desarrollé hábitos que nunca pude mantener antes.',
      logros: ['50 días de racha', 'Nivel 12', '45 logros'],
      rating: 5
    },
    {
      nombre: 'Carlos Rodríguez',
      edad: 35,
      avatar: '👨‍💻',
      testimonio: 'La gamificación hace que cada día sea emocionante. ¡Ya llegué al nivel 15!',
      logros: ['75 días de racha', 'Nivel 15', '62 logros'],
      rating: 5
    },
    {
      nombre: 'Ana Martínez',
      edad: 24,
      avatar: '👩‍🎨',
      testimonio: 'Nunca pensé que meditar podría ser tan divertido. Las misiones son increíbles.',
      logros: ['30 días de racha', 'Nivel 8', '28 logros'],
      rating: 5
    },
    {
      nombre: 'Luis Pérez',
      edad: 42,
      avatar: '👨‍⚕️',
      testimonio: 'Como médico, recomiendo ConnectONE a todos mis pacientes. Es revolucionario.',
      logros: ['120 días de racha', 'Nivel 20', '85 logros'],
      rating: 5
    }
  ];

  // FAQs expandidas
  const faqs = [
    {
      pregunta: '¿Qué es ConnectONE?',
      respuesta: 'ConnectONE es una plataforma revolucionaria de bienestar personal que utiliza gamificación, inteligencia artificial y psicología positiva para ayudarte a desarrollar hábitos saludables de forma divertida y sostenible.'
    },
    {
      pregunta: '¿Cómo funciona el sistema de niveles?',
      respuesta: 'Comenzarás en el nivel 1 y avanzarás completando misiones diarias. Cada nivel desbloquea nuevas funciones, skins de panda, logros especiales y acceso a contenido exclusivo. ¡Hay 16 niveles épicos esperándote!'
    },
    {
      pregunta: '¿Es realmente gratis?',
      respuesta: 'Sí, ConnectONE es completamente gratis durante nuestra fase de lanzamiento. Queremos que todos tengan acceso a herramientas de bienestar de calidad sin barreras económicas.'
    },
    {
      pregunta: '¿Cuánto tiempo necesito dedicarle?',
      respuesta: 'Tan solo 15-30 minutos al día son suficientes para ver resultados significativos. Las misiones están diseñadas para integrarse fácilmente en tu rutina diaria.'
    },
    {
      pregunta: '¿Qué tipo de misiones hay?',
      respuesta: 'Tenemos más de 100 misiones diferentes en 6 categorías: ejercicio, meditación, lectura, hábitos, social y sueño. Cada una adaptada a diferentes niveles y objetivos.'
    },
    {
      pregunta: '¿Puedo usar ConnectONE en mi móvil?',
      respuesta: 'Por supuesto! ConnectONE es totalmente responsive y funciona perfectamente en cualquier dispositivo: móvil, tablet o computadora.'
    },
    {
      pregunta: '¿Hay soporte y ayuda disponible?',
      respuesta: 'Sí, ofrecemos soporte completo a través de chat en vivo, email y nuestra comunidad activa donde otros usuarios y mentores están listos para ayudarte.'
    },
    {
      pregunta: '¿Mis datos están seguros?',
      respuesta: 'Absolutamente. Utilizamos encriptación de grado bancario y nunca compartimos tu información personal con terceros. Tu privacidad es nuestra prioridad.'
    }
  ];

  // Equipo del SENA
  const equipo = [
    {
      nombre: 'Estudiante 1',
      rol: 'Full Stack Developer',
      avatar: '👨‍💻',
      skills: ['React', 'Node.js', 'MongoDB'],
      linkedin: '#',
      github: '#'
    },
    {
      nombre: 'Estudiante 2',
      rol: 'UI/UX Designer',
      avatar: '👩‍🎨',
      skills: ['Figma', 'CSS', 'Animaciones'],
      linkedin: '#',
      github: '#'
    },
    {
      nombre: 'Estudiante 3',
      rol: 'Backend Developer',
      avatar: '👨‍🔧',
      skills: ['Python', 'APIs', 'Databases'],
      linkedin: '#',
      github: '#'
    },
    {
      nombre: 'Estudiante 4',
      rol: 'Project Manager',
      avatar: '👩‍💼',
      skills: ['Scrum', 'Testing', 'Documentación'],
      linkedin: '#',
      github: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      
      {/* Partículas de fondo animadas */}
      {particlesVisible && floatingElements.map(el => (
        <motion.div
          key={el.id}
          className="fixed opacity-20 pointer-events-none"
          style={{
            fontSize: `${el.size}px`,
            zIndex: 0
          }}
          initial={{ x: `${el.x}vw`, y: `${el.y}vh` }}
          animate={{
            x: [`${el.x}vw`, `${(el.x + 30) % 100}vw`],
            y: [`${el.y}vh`, `${(el.y - 30 + 100) % 100}vh`],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {el.emoji}
        </motion.div>
      ))} 

{/* HERO SECTION ÉPICA */}
<section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-4">
  <motion.div 
    style={{ y, opacity }}
    className="max-w-7xl mx-auto text-center relative z-10"
  >
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="inline-block mb-8"
    >
      <div className="relative">
        {/* Gradiente de fondo - MOVIDO DETRÁS de la imagen */}
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50 -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Imagen principal - MÁS GRANDE y por encima del gradiente */}
        <motion.img
          src="/images/panda-level-7.png"
          alt="Energiko"
          className="w-64 h-64 md:w-80 md:h-80 mx-auto object-contain relative z-10"
          animate={{ 
            y: [0, -20, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>

    <motion.h1 
      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Transforma tu vida en una
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
        Aventura Épica
      </span>
    </motion.h1>

    <motion.p 
      className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      Gamifica tu bienestar, desbloquea tu potencial y conviértete en la mejor versión de ti mismo con ConnectONE
    </motion.p>

    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            navigate('/register');
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          <Sparkles className="w-5 h-5 mr-2" />
                Comenzar mi Aventura
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-purple-500 text-white hover:bg-purple-500/20 text-lg px-10 py-6 rounded-full"
              >
                Ya tengo cuenta
              </Button>
            </motion.div>
          </motion.div>

          {/* Estadísticas animadas */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { number: '10K+', label: 'Usuarios Activos', icon: <Users className="w-5 h-5" /> },
              { number: '100+', label: 'Misiones Únicas', icon: <Target className="w-5 h-5" /> },
              { number: '16', label: 'Niveles Épicos', icon: <Trophy className="w-5 h-5" /> },
              { number: '95%', label: 'Satisfacción', icon: <Star className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                whileHover={{ y: -5 }}
                className="bg-purple-800/20 backdrop-blur rounded-2xl p-4 border border-purple-500/30"
              >
                <div className="text-purple-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight className="w-8 h-8 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* CARACTERÍSTICAS PRINCIPALES */}
      <section id="caracteristicas" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Características que 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Transforman</span>
            </h2>
            <p className="text-xl text-purple-200">
              Todo lo que necesitas para tu viaje de bienestar en un solo lugar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(feature.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`
                  relative overflow-hidden h-full transition-all duration-300
                  ${hoveredCard === feature.title 
                    ? 'transform -translate-y-2 shadow-2xl shadow-purple-500/50' 
                    : ''
                  }
                  bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30
                `}>
                  <CardContent className="p-6">
                    <motion.div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}
                      animate={hoveredCard === feature.title ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-purple-200 mb-4">{feature.description}</p>
                    
                    <AnimatePresence>
                      {hoveredCard === feature.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-purple-200">{detail}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA - 4 PASOS */}
      <section id="como-funciona" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Tu Viaje en 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> 4 Simples Pasos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Crea tu Avatar',
                description: 'Personaliza tu panda Energiko y define tus objetivos',
                icon: '🐼',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                step: 2,
                title: 'Elige Misiones',
                description: 'Selecciona misiones diarias adaptadas a tu nivel',
                icon: '🎯',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: 3,
                title: 'Completa y Gana',
                description: 'Gana XP, sube de nivel y desbloquea recompensas',
                icon: '🏆',
                color: 'from-green-500 to-emerald-500'
              },
              {
                step: 4,
                title: 'Evoluciona',
                description: 'Transforma tu vida mientras tu panda evoluciona contigo',
                icon: '✨',
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((paso, index) => (
              <motion.div
                key={paso.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Línea conectora */}
                {index < 3 && (
                  <motion.div
                    className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  />
                )}
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center"
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${paso.color} mb-4`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <span className="text-4xl">{paso.icon}</span>
                  </motion.div>
                  
                  <div className="bg-purple-900/30 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
                    <div className="text-purple-400 text-sm mb-2">Paso {paso.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{paso.title}</h3>
                    <p className="text-purple-200 text-sm">{paso.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS DE MISIONES MEJORADAS */}
      <section id="misiones" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Misiones que 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400"> Inspiran</span>
            </h2>
            <p className="text-xl text-purple-200">
              6 categorías diseñadas para transformar cada aspecto de tu vida
            </p>
          </motion.div>

          {/* Selector de categorías */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {missionCategories.map((cat, index) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentMissionCategory(index)}
                className={`
                  px-6 py-3 rounded-full font-bold transition-all
                  ${currentMissionCategory === index
                    ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg'
                    : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'}
                `}
              >
                <span className="text-2xl mr-2">{cat.icon}</span>
                {cat.title}
              </motion.button>
            ))}
          </div>

          {/* Detalle de categoría seleccionada */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMissionCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${missionCategories[currentMissionCategory].color}`} />
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <motion.div
                      className="text-8xl"
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {missionCategories[currentMissionCategory].icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {missionCategories[currentMissionCategory].title}
                      </h3>
                      <p className="text-purple-200 mb-6">
                        {missionCategories[currentMissionCategory].description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {missionCategories[currentMissionCategory].benefits.map((benefit, i) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-purple-800/30 rounded-lg p-3 text-center"
                          >
                            <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                            <span className="text-white text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div>
                        <p className="text-purple-300 text-sm mb-3">Misiones ejemplo:</p>
                        <div className="space-y-2">
                          {missionCategories[currentMissionCategory].missions.map((mission, i) => (
                            <motion.div
                              key={mission}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-purple-200">{mission}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TESTIMONIOS MEJORADOS */}
      <section id="testimonios" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Historias de 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Transformación</span>
            </h2>
            <p className="text-xl text-purple-200">
              Miles de personas ya están viviendo su mejor vida con ConnectONE
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-3xl p-8 border border-purple-500/30"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-8xl">{testimonios[activeTestimonial].avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex mb-4">
                      {[...Array(testimonios[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-xl text-white mb-4 italic">
                      "{testimonios[activeTestimonial].testimonio}"
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-white font-bold">
                        {testimonios[activeTestimonial].nombre}, {testimonios[activeTestimonial].edad}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {testimonios[activeTestimonial].logros.map((logro, i) => (
                        <Badge key={i} className="bg-purple-700 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          {logro}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-purple-400 w-8' 
                      : 'bg-purple-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS - SENA */}
      <section id="nosotros" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              El Equipo detrás de 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> la Magia</span>
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Somos estudiantes del SENA en Análisis y Desarrollo de Software
            </p>
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              Proyecto de Grado 2025
            </Badge>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {equipo.map((miembro, index) => (
              <motion.div
                key={miembro.nombre}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{miembro.avatar}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{miembro.nombre}</h3>
                    <p className="text-purple-400 mb-4">{miembro.rol}</p>
                    
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {miembro.skills.map(skill => (
                        <Badge key={skill} className="bg-purple-700 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="ghost" className="text-white">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-3xl p-8 border border-green-500/30"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Institución: SENA - Centro de Formación
              </h3>
              <p className="text-purple-200 mb-6 max-w-3xl mx-auto">
                Este proyecto representa la culminación de nuestro tecnólogo en Análisis y Desarrollo de Software. 
                Durante meses hemos trabajado para crear una solución innovadora que combine tecnología, bienestar 
                y gamificación para mejorar la vida de las personas.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Tecnologías', value: 'React, Node.js, MongoDB, AI' },
                  { label: 'Metodología', value: 'Scrum, Design Thinking' },
                  { label: 'Duración', value: '6 meses de desarrollo' }
                ].map(item => (
                  <div key={item.label} className="bg-purple-900/30 rounded-lg p-4">
                    <p className="text-purple-400 text-sm mb-1">{item.label}</p>
                    <p className="text-white font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ EXPANDIDO */}
      <section id="faq" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Preguntas 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400"> Frecuentes</span>
            </h2>
            <p className="text-xl text-purple-200">
              Todo lo que necesitas saber sobre ConnectONE
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className="bg-purple-900/30 border-purple-500/30 cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">{faq.pregunta}</h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5 text-purple-400 rotate-90" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-purple-200 mt-4">{faq.respuesta}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20" />
            <CardContent className="p-12 relative z-10">
              <motion.img
                src="/images/panda-level-16.png"
                alt="Panda supremo"
                className="w-32 h-32 mx-auto mb-6"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ¿Listo para transformar tu vida?
              </h2>
              <p className="text-2xl text-white/90 mb-8">
                Únete a miles de personas que ya están viviendo su mejor versión
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    navigate('/register');
                    confetti({
                      particleCount: 200,
                      spread: 100,
                      origin: { y: 0.6 }
                    });
                  }}
                  className="bg-white text-purple-600 hover:bg-purple-100 text-xl font-bold px-12 py-6 rounded-full shadow-2xl"
                >
                  Comenzar GRATIS Ahora
                  <Sparkles className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
              
              <p className="text-white/70 text-sm mt-6">
                Sin tarjeta de crédito • Sin compromisos • 100% Gratis
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FOOTER MEJORADO */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🐼</div>
                <span className="text-xl font-bold text-white">
                  Connect<span className="text-purple-400">ONE</span>
                </span>
              </div>
              <p className="text-purple-200 text-sm">
                Tu compañero de bienestar personal gamificado.
              </p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" variant="ghost" className="text-purple-400">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-purple-400">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-purple-400">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-purple-400">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><a href="#caracteristicas" className="text-purple-200 hover:text-purple-400 transition">Características</a></li>
                <li><a href="#como-funciona" className="text-purple-200 hover:text-purple-400 transition">Cómo Funciona</a></li>
                <li><a href="#misiones" className="text-purple-200 hover:text-purple-400 transition">Misiones</a></li>
                <li><span className="text-purple-200">Precios: GRATIS</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#faq" className="text-purple-200 hover:text-purple-400 transition">FAQ</a></li>
                <li><a href="#nosotros" className="text-purple-200 hover:text-purple-400 transition">Sobre Nosotros</a></li>
                <li><a href="#" className="text-purple-200 hover:text-purple-400 transition">Términos</a></li>
                <li><a href="#" className="text-purple-200 hover:text-purple-400 transition">Privacidad</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-200">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@connectone.com</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">SENA, Colombia</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Chat en vivo</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-purple-200 text-sm">
                © 2024 ConnectONE - Proyecto de Grado SENA. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">
                  Tecnólogo en Análisis y Desarrollo de Software
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;