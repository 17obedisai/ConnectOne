import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ArrowRight, Zap, Heart, BrainCircuit, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();

  const principles = [
    { icon: <ShieldCheck className="w-10 h-10 text-green-400" />, title: "Respaldado por la ciencia", text: "Nuestras metodologías se basan en evidencia para asegurar un progreso real y sostenible." },
    { icon: <Zap className="w-10 h-10 text-yellow-400" />, title: "Divertido y motivador", text: "Aprende y crece a través de un sistema gamificado que te mantiene enganchado." },
    { icon: <Heart className="w-10 h-10 text-primary" />, title: "Personalizado para ti", text: "Tu viaje es único. Adaptamos las misiones y retos a tus metas y necesidades." },
  ];

  const mentalWellnessArticles = [
    { icon: <BrainCircuit className="w-8 h-8 text-blue-400" />, title: "Mejora tu enfoque", text: "Descubre técnicas prácticas para construir una mente más clara y productiva." },
    { icon: <BrainCircuit className="w-8 h-8 text-purple-400" />, title: "El poder de los hábitos", text: "Aprende a encontrar y mantener la motivación para alcanzar tus metas más ambiciosas." },
    { icon: <BrainCircuit className="w-8 h-8 text-green-400" />, title: "Crea tu rutina ideal", text: "Integra pequeñas rutinas diarias que tienen un gran impacto en tu bienestar." },
  ];

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <header className="py-4 px-4 sm:px-6 lg:px-8 absolute w-full z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <EnergikoPanda pandaType="logo" size="small" isStatic={true} />
              <span className="text-xl font-bold">ConnectONE</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={() => navigate('/auth')} variant="ghost" className="hover:bg-primary/10">
                Ya tengo una cuenta
              </Button>
            </motion.div>
          </div>
        </header>

        <section className="relative min-h-screen flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <EnergikoPanda pandaType="landing" size="xl" className="mb-8" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 max-w-3xl"
            >
              La forma divertida y efectiva de <span className="animated-text-gradient">construir tu mejor vida.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Conviértete en tu mejor versión con misiones diarias, retos semanales y un compañero que te apoya en cada paso.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Button onClick={() => navigate('/auth')} size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold py-3 px-8 rounded-full primary-glow transition-all duration-300 hover:scale-105">
                Empieza ahora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 bg-card/50">
            <div className="max-w-6xl mx-auto text-center">
                <div className="grid md:grid-cols-3 gap-8">
                    {principles.map((p, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                        <Card className="h-full glass-effect border-transparent p-6 text-center hover:border-primary/50 transition-colors duration-300">
                          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="flex justify-center mb-4">{p.icon}</motion.div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{p.title}</h3>
                          <p className="text-muted-foreground">{p.text}</p>
                        </Card>
                      </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-4 text-center">Bienestar emocional y crecimiento personal</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              Tu salud mental es tan importante como tu salud física. Aquí encontrarás herramientas y conocimientos para fortalecerla.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              {mentalWellnessArticles.map((article, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <Card className="h-full glass-effect border-border hover:border-primary/50 transition-all duration-300 hover:shadow-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        {article.icon}
                        <CardTitle>{article.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{article.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center px-4 bg-gradient-to-t from-primary/10 to-transparent">
            <div className="max-w-3xl mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-foreground mb-4">Esta app no te roba tiempo. Te lo devuelve.</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-muted-foreground mb-8 text-lg">
                    Únete a ConnectONE y empieza a invertir en tu bien más preciado: tú mismo.
                </motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <Button onClick={() => navigate('/auth')} size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-3 rounded-full primary-glow transition-all duration-300 hover:scale-105">
                      Empezar mi transformación <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
            </div>
        </section>

        <footer className="py-12 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <EnergikoPanda pandaType="logo" size="small" isStatic={true}/>
              <span className="text-2xl font-bold gradient-text">ConnectONE</span>
            </div>
            <p className="text-muted-foreground/60">
              © 2025 ConnectONE. Reconéctate contigo, un hábito a la vez.
            </p>
            <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">Términos</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Privacidad</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Contacto</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;