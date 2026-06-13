import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star, Sparkles, Brain, Users,
  ChevronRight, CheckCircle, Trophy, Shield,
  Activity, Mail, MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './LandingPage.module.css';

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

  // Áreas del Árbol de Habilidades (alineadas con el producto real)
  const missionCategories = [
    {
      id: 'software',
      icon: '💻',
      title: 'Desarrollo de Software',
      description: 'De la lógica básica a arquitecturas con Python, MongoDB y Git',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Frontend', 'Backend', 'Git'],
      missions: ['Tu primer componente', 'Una API REST', 'Control de versiones']
    },
    {
      id: 'audio',
      icon: '🎚️',
      title: 'Producción Musical y Audio',
      description: 'Ruteos, ecualización y mezcla en Logic Pro o Reaper',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Mezcla', 'EQ', 'Mastering'],
      missions: ['Graba tu primera idea', 'Efectos esenciales', 'Exporta tu track']
    },
    {
      id: 'idiomas',
      icon: '🌍',
      title: 'Idiomas y Comunicación',
      description: 'Vocabulario e inmersión diaria, auditados por la IA',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Vocabulario', 'Inmersión', 'Fluidez'],
      missions: ['10 palabras al día', 'Inmersión 15 min', 'Conversación']
    },
    {
      id: 'fitness',
      icon: '🏋️',
      title: 'Fitness y Salud',
      description: 'Rutinas, nutrición y tiempos de recuperación muscular',
      color: 'from-red-500 to-orange-500',
      benefits: ['Fuerza', 'Energía', 'Descanso'],
      missions: ['Rutina base', 'Hidratación', 'Sueño reparador']
    },
    {
      id: 'estudio',
      icon: '📚',
      title: 'Hábitos de Estudio',
      description: 'Aprendizaje efectivo, lectura y organización del tiempo',
      color: 'from-amber-500 to-yellow-500',
      benefits: ['Foco', 'Memoria', 'Constancia'],
      missions: ['Deep work 25 min', 'Toma de notas', 'Repaso espaciado']
    },
    {
      id: 'finanzas',
      icon: '💰',
      title: 'Finanzas Personales',
      description: 'Ahorro, control de gastos y metas de inversión',
      color: 'from-emerald-500 to-green-600',
      benefits: ['Ahorro', 'Orden', 'Metas'],
      missions: ['Registra gastos', 'Define una meta', 'Revisa tu balance']
    }
  ];

  // Características principales — el Ultimate OS, cada una con Energiko en su rol.
  const features = [
    {
      image: '/images/panda-level-9.png',
      title: 'Energiko, tu copiloto con IA',
      description: 'Un asistente Gemini que no solo conversa: agenda tus bloques, crea recordatorios, registra tus gastos y organiza tu día por ti.',
      gradient: 'from-purple-500 to-pink-500',
      details: ['Agenda y recuerda por ti', 'Entiende lenguaje natural', 'Conectado a toda la app']
    },
    {
      image: '/images/panda-level-7.png',
      title: 'Centro de Comando',
      description: 'Tu día en una sola vista: las 3 tareas críticas, tu energía, la agenda híbrida y un calendario interno que conecta todo.',
      gradient: 'from-cyan-500 to-blue-500',
      details: ['Focus del día', 'Agenda y calendario', 'Resumen ejecutivo del mes']
    },
    {
      image: '/images/panda-level-16.png',
      title: 'Árbol de Habilidades',
      description: 'Rutas de progresión tipo RPG generadas por IA según tus intereses: software, audio, idiomas, fitness y más. Sube de nivel en la vida real.',
      gradient: 'from-fuchsia-500 to-purple-600',
      details: ['Rutas creadas por IA', 'Desbloqueo por niveles', 'XP por avanzar de verdad']
    },
    {
      image: '/images/panda-dashboard.png',
      title: 'Fitness, hábitos y vitalidad',
      description: 'Registra ejercicio, sueño y energía. Mide tu constancia día a día y cierra cada jornada con una reflexión de tu coach.',
      gradient: 'from-orange-500 to-red-500',
      details: ['Tracker de hábitos', 'Vitalidad y descanso', 'Cierre de día con IA']
    },
    {
      image: '/images/panda-level-11.png',
      title: 'Notas por voz',
      description: 'Captura ideas al instante hablando. Tus notas, proyectos y lecturas quedan guardados y conectados con tu día.',
      gradient: 'from-amber-500 to-yellow-500',
      details: ['Dictado por voz', 'Ideas y proyectos', 'Todo en un lugar']
    },
    {
      image: '/images/panda-level-13.png',
      title: 'Hub Financiero',
      description: 'Controla ingresos y gastos del mes y proyecta tus metas de inversión: equipos, plugins o educación. Tus números, claros.',
      gradient: 'from-green-500 to-emerald-500',
      details: ['Flujo de ingresos/gastos', 'Metas de inversión', 'Balance del mes']
    }
  ];

  // Testimonios
  const testimonios = [
    {
      nombre: 'María González',
      edad: 28,
      avatar: '👩‍💼',
      testimonio: 'ConnectONE cambió mi vida. En 3 meses desarrollé hábitos que nunca pude mantener antes.',
      logros: ['50 días de racha', 'Nivel 12', '6 hábitos diarios'],
      rating: 5
    },
    {
      nombre: 'Carlos Rodríguez',
      edad: 35,
      avatar: '👨‍💻',
      testimonio: 'La gamificación hace que cada día sea emocionante. ¡Ya llegué al nivel 15!',
      logros: ['75 días de racha', 'Nivel 15', 'Rutas IA completas'],
      rating: 5
    },
    {
      nombre: 'Ana Martínez',
      edad: 24,
      avatar: '👩‍🎨',
      testimonio: 'Nunca pensé que meditar podría ser tan divertido. Las misiones son increíbles.',
      logros: ['30 días de racha', 'Nivel 8', 'Agenda al día'],
      rating: 5
    },
    {
      nombre: 'Luis Pérez',
      edad: 42,
      avatar: '👨‍⚕️',
      testimonio: 'Como médico, recomiendo ConnectONE a todos mis pacientes. Es revolucionario.',
      logros: ['120 días de racha', 'Nivel 16', 'Maestría'],
      rating: 5
    }
  ];

  // FAQs actualizadas al producto real
  const faqs = [
    {
      pregunta: '¿Qué es ConnectONE?',
      respuesta: 'Tu sistema operativo personal: un gestor diario donde organizas tu tiempo, hábitos, proyectos y finanzas, con la ayuda de Energiko, un asistente con inteligencia artificial que agenda y registra cosas por ti.'
    },
    {
      pregunta: '¿Qué puede hacer la IA (Energiko)?',
      respuesta: 'Mucho más que chatear: le hablas con naturalidad ("agéndame el domingo 2h de piano", "recuérdame renovar el SOAT", "registra un gasto de 20.000") y lo ejecuta dentro de la app. También genera tus rutas de aprendizaje y te da una reflexión de tu día.'
    },
    {
      pregunta: '¿Qué es el Árbol de Habilidades?',
      respuesta: 'Rutas de progresión tipo videojuego que la IA crea según tus intereses (software, audio, idiomas, fitness, finanzas...). Avanzas nodo a nodo, de lo básico a lo avanzado, y ganas XP por progresar de verdad.'
    },
    {
      pregunta: '¿Cómo me ayuda a organizar mi día?',
      respuesta: 'En el Centro de Comando defines tus 3 tareas críticas, bloqueas tu tiempo en una agenda híbrida y lo ves todo en un calendario interno. Una vista ejecutiva te resume qué hiciste hoy y cómo va tu mes.'
    },
    {
      pregunta: '¿Es realmente gratis?',
      respuesta: 'Sí. Acceso gratuito por lanzamiento. Más adelante habrá planes premium, pero el núcleo seguirá siendo accesible.'
    },
    {
      pregunta: '¿Puedo usarlo en mi móvil?',
      respuesta: '¡Claro! Funciona en móvil, tablet y computadora. El dictado por voz de las notas funciona mejor en Chrome.'
    },
    {
      pregunta: '¿Mis datos están seguros?',
      respuesta: 'Sí. Autenticación con sesión cifrada, tus datos siempre ligados a tu cuenta y sin compartirlos con terceros. Tu privacidad es prioridad.'
    }
  ];


  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden ${styles.pageEnter}`}>
      
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
  {/* Auroras de color para un inicio más vibrante */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-24 -left-16 w-[28rem] h-[28rem] bg-fuchsia-500/30 rounded-full blur-3xl"
      animate={{ scale: [1, 1.25, 1], x: [0, 40, 0], opacity: [0.3, 0.55, 0.3] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-10 -right-16 w-[26rem] h-[26rem] bg-cyan-500/25 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], y: [0, 40, 0], opacity: [0.25, 0.5, 0.25] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-amber-500/20 rounded-full blur-3xl"
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
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
        {/* Gradiente de fondo multicolor - DETRÁS de la imagen */}
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-fuchsia-500 via-orange-400 to-cyan-500 rounded-full blur-3xl opacity-50 -z-10"
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

        {/* Imagen principal — animación CSS nativa */}
        <img
          src="/images/panda-landing.png"
          alt="Energiko"
          className={`w-64 h-64 md:w-80 md:h-80 mx-auto object-contain relative z-10 ${styles.mascotaHero}`}
        />
      </div>
    </motion.div>

    <h1
      className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 ${styles.heroItem}`}
      style={{ animationDelay: '0.2s' }}
    >
      Transforma tu vida en una
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
        Aventura Épica
      </span>
    </h1>

    <p
      className={`text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto ${styles.heroItem}`}
      style={{ animationDelay: '0.38s' }}
    >
      Tu sistema operativo personal: organiza tu día, tus hábitos y tus metas con la ayuda de Energiko y la inteligencia artificial.
    </p>

    <div
      className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${styles.heroItem}`}
      style={{ animationDelay: '0.56s' }}
    >
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            navigate('/register');
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 ${styles.ctaButton}`}
        >
          <Sparkles className="w-5 h-5 mr-2" />
                Comenzar mi Aventura
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className={`border-purple-500 text-white hover:bg-purple-500/20 text-lg px-10 py-6 rounded-full ${styles.ctaButton}`}
              >
                Ya tengo cuenta
              </Button>
            </motion.div>
          </div>

          {/* Estadísticas animadas */}
          <motion.div
            className="grid grid-cols-2 gap-6 mt-20 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
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
                  relative overflow-hidden h-full
                  bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30
                  ${styles.featureCard}
                `}>
                  {/* Franja de color superior */}
                  <div className={`h-1.5 bg-gradient-to-r ${feature.gradient}`} />
                  <CardContent className="p-6">
                    {/* Energiko en su rol, con glow de color */}
                    <div className="relative flex justify-center mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-25 blur-2xl rounded-full`} />
                      <motion.img
                        src={feature.image}
                        alt={feature.title}
                        className="relative w-28 h-28 object-contain drop-shadow-xl"
                        animate={hoveredCard === feature.title ? { y: [0, -8, 0], rotate: [0, -4, 4, 0] } : {}}
                        transition={{ duration: 0.8 }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 text-center">{feature.title}</h3>
                    <p className="text-purple-200 mb-4 text-center text-sm">{feature.description}</p>
                    
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

      {/* GALERÍA: ENERGIKO EN SUS DISTINTOS ROLES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Energiko <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-400">evoluciona contigo</span>
            </h2>
            <p className="text-xl text-purple-200">Tu mascota cambia de forma a medida que dominas nuevas áreas de tu vida.</p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { img: 'panda-level-3', label: 'Disciplina', color: 'from-red-500 to-orange-500' },
              { img: 'panda-level-5', label: 'Nutrición', color: 'from-amber-500 to-yellow-500' },
              { img: 'panda-level-7', label: 'Exploración', color: 'from-cyan-500 to-blue-500' },
              { img: 'panda-level-9', label: 'Conocimiento', color: 'from-blue-500 to-indigo-500' },
              { img: 'panda-level-11', label: 'Creatividad', color: 'from-fuchsia-500 to-pink-500' },
              { img: 'panda-level-13', label: 'Ambición', color: 'from-purple-500 to-violet-500' },
              { img: 'panda-level-16', label: 'Maestría', color: 'from-yellow-500 to-amber-500' }
            ].map((e, i) => (
              <motion.div
                key={e.img}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${e.color} opacity-25 blur-2xl rounded-full`} />
                  <img src={`/images/${e.img}.png`} alt={e.label} className="relative w-full aspect-square object-contain drop-shadow-lg" />
                </div>
                <p className="text-purple-200 text-sm font-semibold mt-1">{e.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HERRAMIENTA DEFINITIVA — METODOLOGÍA */}
      <section id="metodologia" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-600/30 text-purple-200 border border-purple-500/40 mb-4">
              No es otra app de hábitos
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              La herramienta definitiva para
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                volverte una mejor persona
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              ConnectONE no te da una lista de tareas más. Combina tres disciplinas probadas
              en un solo sistema que se adapta a ti y evoluciona con tu progreso.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Activity className="w-8 h-8" />,
                title: 'Metodologías Ágiles',
                gradient: 'from-cyan-500 to-blue-500',
                description: 'Avanzas en ciclos cortos y medibles. Cada semana es un "sprint" con objetivos concretos, retrospectiva de tu progreso y ajuste continuo — el mismo marco que usan los equipos de alto rendimiento, aplicado a tu vida.'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Enfoque Profundo (Deep Work)',
                gradient: 'from-purple-500 to-indigo-500',
                description: 'Sesiones de concentración sin distracciones con temporizador Pomodoro integrado. Entrenas tu capacidad de foco como un músculo y proteges tu energía mental para lo que de verdad importa.'
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Rutinas Personalizadas con IA',
                gradient: 'from-pink-500 to-rose-500',
                description: 'A partir de tu cuestionario inicial, la IA genera misiones y retos a tu medida según tus objetivos, nivel e intereses. Tu plan no es genérico: se construye —y se recalcula— alrededor de ti.'
              }
            ].map((pilar, index) => (
              <motion.div
                key={pilar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${pilar.gradient} text-white mb-5`}>
                      {pilar.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{pilar.title}</h3>
                    <p className="text-purple-200 leading-relaxed">{pilar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-8 text-center"
          >
            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto">
              <span className="font-bold text-white">El resultado:</span> un sistema que cruza
              la constancia de las metodologías ágiles, la profundidad del deep work y la
              inteligencia de las rutinas adaptativas. Pequeñas acciones diarias que,
              acumuladas, transforman quién eres.
            </p>
          </motion.div>
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
              <img
                src="/images/panda-level-16.png"
                alt="Panda supremo"
                className={`w-32 h-32 mx-auto mb-6 ${styles.pandaCTA}`}
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

      {/* FOOTER */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/panda-profile.png"
                  alt="ConnectONE"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/40"
                />
                <span className="text-xl font-bold text-white">
                  Connect<span className="text-purple-400">ONE</span>
                </span>
              </div>
              <p className="text-purple-200 text-sm">
                Tu compañero de bienestar personal gamificado. Producto independiente desarrollado con pasión.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><a href="#caracteristicas" className="text-purple-200 hover:text-purple-400 transition">Características</a></li>
                <li><a href="#como-funciona" className="text-purple-200 hover:text-purple-400 transition">Cómo Funciona</a></li>
                <li><a href="#misiones" className="text-purple-200 hover:text-purple-400 transition">Misiones</a></li>
                <li>
                  <span className="text-purple-300 text-sm leading-relaxed">
                    Acceso gratuito por lanzamiento<br />
                    <span className="text-purple-400/70 text-xs">(Planes premium en el futuro)</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#faq" className="text-purple-200 hover:text-purple-400 transition">FAQ</a></li>
                <li><a href="#" className="text-purple-200 hover:text-purple-400 transition">Términos</a></li>
                <li><a href="#" className="text-purple-200 hover:text-purple-400 transition">Privacidad</a></li>
                <li>
                  <span className="text-purple-300 text-sm leading-relaxed">
                    Acceso gratuito por lanzamiento<br />
                    <span className="text-purple-400/70 text-xs">(Planes premium en el futuro)</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-200">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="text-sm">obedisairodriguezome12@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm">Garzón — Huila, Colombia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-purple-200 text-sm">
                © 2026 ConnectONE — Desarrollado por Obed Rodriguez. Todos los derechos reservados.
              </p>
              <p className="text-purple-400/60 text-xs">
                Producto independiente · Hecho con ❤️ desde Colombia
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;