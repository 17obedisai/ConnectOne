import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, ChevronRight, Heart, Brain, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Frases motivacionales rotativas bajo el título.
  const phrases = isLogin
    ? ['Tu mejor versión te espera ✨', 'Pequeños hábitos, grandes cambios', 'Cada día suma XP a tu vida']
    : ['Comienza tu transformación 🚀', 'Gamifica tu bienestar', 'Sube de nivel en la vida real'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhraseIndex((p) => p + 1), 3500);
    return () => clearInterval(id);
  }, []);

  // Partículas flotantes de fondo (estables entre renders).
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 6,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]
    }))
  );

  // Estilo base reutilizable para inputs: padding amplio, bordes sutiles, glassmorphism.
  const inputClass =
    'h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-purple-300/40 ' +
    'focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20 transition-all';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!isLogin) {
      if (!formData.nombre || formData.nombre.length < 2) {
        newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'La contraseña debe tener mayúsculas, minúsculas y números';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = isLogin
        ? await login({ email: formData.email, password: formData.password })
        : await register({
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password
          });

      if (result.success) {
        confetti({
          particleCount: isLogin ? 100 : 150,
          spread: isLogin ? 70 : 80,
          origin: { y: 0.6 }
        });

        toast({
          title: isLogin ? '¡Bienvenido de vuelta!' : '¡Cuenta creada!',
          description: isLogin
            ? 'Has iniciado sesión exitosamente'
            : 'Bienvenido a ConnectONE 🎉'
        });

        // Nuevo usuario o quien no completó el cuestionario va al onboarding.
        if (isLogin && result.hasCompletedQuestionnaire) {
          navigate('/dashboard');
        } else {
          navigate('/questionnaire');
        }
      } else {
        // Error de negocio devuelto por el backend (ej. credenciales, correo duplicado).
        // result.error ya contiene el message EXACTO del servidor.
        setErrors({ general: result.error, ...(result.fieldErrors || {}) });
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    } catch (error) {
      // Fallo inesperado de red / cold-start. Mostramos la causa real, nunca un texto genérico.
      const message =
        error.response?.data?.message ||
        error.message ||
        'No se pudo conectar con el servidor. Intenta de nuevo.';
      setErrors({ general: message });
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'} - ConnectONE</title>
        <meta name="description" content="Únete a ConnectONE y transforma tu vida" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Fondo animado: auroras en movimiento + partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.25, 1], x: [0, 30, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute select-none"
              style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: `${p.size}px` }}
              initial={{ opacity: 0 }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md relative z-10"
        >
          {/* Glow animado detrás de la tarjeta */}
          <motion.div
            aria-hidden
            className="absolute -inset-1 rounded-[1.7rem] bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-500/40 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Tarjeta glassmorphism: fondo translúcido, borde sutil, sombra difusa con glow violeta */}
          <Card className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_40px_rgba(124,58,237,0.25)]">
            <CardHeader className="space-y-5 pt-8">
              {/* Mascota: la cara del oso/panda Energiko en marco circular elegante */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    scale: { type: 'spring', stiffness: 200, damping: 15 },
                    opacity: { duration: 0.4 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 blur-xl" />
                  <img
                    src="/images/panda-profile.png"
                    alt="Energiko"
                    className="relative w-24 h-24 rounded-full object-cover ring-2 ring-white/20 shadow-lg bg-white/5"
                  />
                </motion.div>
              </div>

              <div className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  {isLogin ? '¡Bienvenido de vuelta!' : '¡Únete a ConnectONE!'}
                </CardTitle>
                <CardDescription className="text-purple-200/80 mt-2">
                  {isLogin
                    ? 'Continúa tu viaje de transformación'
                    : 'Comienza tu aventura hacia el bienestar'}
                </CardDescription>
                {/* Frase motivacional rotativa */}
                <div className="h-5 mt-2 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="text-xs text-purple-300/70 flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400/80" />
                      {phrases[phraseIndex % phrases.length]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Chips de características (solo en registro) */}
              {!isLogin && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { icon: <Heart className="w-4 h-4" />, text: 'Bienestar' },
                    { icon: <Brain className="w-4 h-4" />, text: 'Mindfulness' },
                    { icon: <Zap className="w-4 h-4" />, text: 'Energía' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-xl border border-white/5"
                    >
                      <div className="text-purple-300">{item.icon}</div>
                      <span className="text-xs text-purple-200/80">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="pb-8">
              {/* Recuadro de error: muestra el mensaje EXACTO del backend */}
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-sm"
                  >
                    {errors.general}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="nombre" className="text-purple-200/90">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`${inputClass} mt-1.5`}
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="text-sm text-red-400 mt-1">{errors.nombre}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <Label htmlFor="email" className="text-purple-200/90">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClass} mt-1.5`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-purple-200/90">Contraseña</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`${inputClass} pr-11`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="confirmPassword" className="text-purple-200/90">Confirmar contraseña</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`${inputClass} pr-11`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Botón principal con gradiente, brillo que barre y estado de carga */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="relative overflow-hidden w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold h-12 rounded-xl shadow-lg shadow-purple-900/30 transition-all disabled:opacity-70"
                >
                  {!isLoading && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      animate={{ x: ['0%', '450%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Conectando al servidor...
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-purple-200/80 text-sm">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="text-purple-300 hover:text-purple-200 font-semibold"
                >
                  {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
