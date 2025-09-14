import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EnergikoPanda from '@/components/EnergikoPanda';
import { 
  ArrowRight, Zap, Heart, BrainCircuit, ShieldCheck, 
  Trophy, Target, Users, Sparkles, Clock, Calendar,
  Activity, TrendingUp, Star, CheckCircle, PlayCircle,
  Smartphone, Gamepad2, Award, BookOpen, Coffee, Dumbbell,
  Headphones, Moon, Sun, ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  // Auto-rotar testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "10K+", label: "Usuarios activos", icon: <Users /> },
    { value: "500K", label: "Misiones completadas", icon: <Trophy /> },
    { value: "95%", label: "Mejora reportada", icon: <TrendingUp /> },
    { value: "4.8", label: "Calificación", icon: <Star /> }
  ];

  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Sistema de Gamificación",
      description: "Sube de nivel, desbloquea recompensas y personaliza a Enérgiko mientras mejoras tu vida.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Misiones Personalizadas",
      description: "Recibe misiones diarias adaptadas a tus objetivos, tiempo disponible y preferencias.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Seguimiento Inteligente",
      description: "Visualiza tu progreso con estadísticas detalladas y gráficos motivadores.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Herramientas de Productividad",
      description: "Pomodoro, ayuno intermitente y más herramientas integradas para maximizar tu día.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      title: "Cuestionario Inicial",
      description: "Responde preguntas simples sobre tus objetivos y preferencias",
      icon: <BookOpen />
    },
    {
      step: 2,
      title: "Plan Personalizado",
      description: "Recibe un plan de misiones diseñado específicamente para ti",
      icon: <Target />
    },
    {
      step: 3,
      title: "Completa Misiones",
      description: "Realiza actividades diarias que mejoran tu bienestar",
      icon: <CheckCircle />
    },
    {
      step: 4,
      title: "Sube de Nivel",
      description: "Gana experiencia, desbloquea recompensas y celebra tu progreso",
      icon: <Trophy />
    }
  ];

  const categories = [
    { icon: <Dumbbell />, name: "Ejercicio", color: "text-red-500" },
    { icon: <BrainCircuit />, name: "Meditación", color: "text-purple-500" },
    { icon: <BookOpen />, name: "Lectura", color: "text-blue-500" },
    { icon: <Coffee />, name: "Hábitos", color: "text-yellow-500" },
    { icon: <Users />, name: "Social", color: "text-green-500" },
    { icon: <Moon />, name: "Sueño", color: "text-indigo-500" }
  ];

  const testimonials = [
    {
      name: "María G.",
      role: "Emprendedora",
      text: "ConnectONE cambió mi vida. En 3 meses desarrollé hábitos que intenté crear por años.",
      rating: 5
    },
    {
      name: "Carlos R.",
      role: "Estudiante",
      text: "La gamificación hace que mantener buenos hábitos sea divertido. ¡Mi panda ya es nivel 15!",
      rating: 5
    },
    {
      name: "Ana P.",
      role: "Diseñadora",
      text: "El modo Pomodoro y las misiones de mindfulness mejoraron mi productividad un 200%.",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "¿Cómo funciona el sistema de misiones?",
      a: "Cada día recibes 5-7 misiones personalizadas basadas en tus objetivos. Completarlas te da experiencia y mejora tu racha."
    },
    {
      q: "¿Puedo personalizar a Enérgiko?",
      a: "¡Sí! Conforme subes de nivel desbloqueas accesorios y apariencias para tu panda compañero."
    },
    {
      q: "¿Necesito mucho tiempo al día?",
      a: "No, puedes elegir misiones de 5, 15 o 30 minutos según tu disponibilidad."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header mejorado */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
          >
            <EnergikoPanda pandaType="logo" size="small" isStatic={true} />
            <span className="text-xl font-bold">ConnectONE</span>
          </motion.div>
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate('/login')} 
              variant="ghost"
            >
              Iniciar Sesión
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section Mejorada */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 mb-6"
          >
            <Badge variant="outline" className="px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Nuevo: Modo Focus con música
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Award className="w-3 h-3 mr-1" />
              +50 misiones disponibles
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <EnergikoPanda pandaType="landing" size="2xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Transforma tu vida en un
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              juego que sí quieres ganar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Únete a miles de personas que están mejorando su bienestar físico, mental y emocional 
            con la ayuda de Enérgiko, tu panda compañero de aventuras.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              onClick={() => navigate('/login')}
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Comenzar Gratis
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-full"
            >
              <PlayCircle className="mr-2" />
              Ver Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <ChevronDown className="w-8 h-8 animate-bounce text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Todo lo que necesitas para tu bienestar
            </h2>
            <p className="text-xl text-muted-foreground">
              Un ecosistema completo diseñado para tu crecimiento personal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Tu viaje en 4 simples pasos</h2>
            <p className="text-xl text-muted-foreground">
              Comienza hoy y ve resultados desde la primera semana
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  {i < journeySteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary -translate-x-1/2" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Misiones para cada área de tu vida</h2>
            <p className="text-xl text-muted-foreground">
              Mejora de forma integral con actividades variadas y divertidas
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className={`text-4xl mb-2 ${cat.color}`}>{cat.icon}</div>
                  <p className="font-medium">{cat.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Historias de transformación</h2>
            <p className="text-xl text-muted-foreground">
              Miles de usuarios ya cambiaron su vida con ConnectONE
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <Card className="p-8 max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl mb-6 italic">"{testimonials[activeTestimonial].text}"</p>
                <div className="font-bold">{testimonials[activeTestimonial].name}</div>
                <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeTestimonial ? 'w-8 bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Preguntas frecuentes</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-t from-primary/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <EnergikoPanda pandaType="landing" size="large" className="mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu mejor versión te está esperando
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a ConnectONE hoy y comienza a vivir la vida que mereces.
              Sin trucos, sin cobros ocultos, solo resultados reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
              >
                Empezar mi transformación
                <Sparkles className="ml-2" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No requiere tarjeta de crédito • Cancela cuando quieras
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="py-12 px-4 border-t bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <EnergikoPanda pandaType="logo" size="small" isStatic={true}/>
                <span className="text-xl font-bold">ConnectONE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transformando vidas a través de hábitos saludables y gamificación.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Características</a></li>
                <li><a href="#" className="hover:text-foreground">Precios</a></li>
                <li><a href="#" className="hover:text-foreground">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Guías</a></li>
                <li><a href="#" className="hover:text-foreground">Comunidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-foreground">Contacto</a></li>
                <li><a href="#" className="hover:text-foreground">Carreras</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 ConnectONE. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;