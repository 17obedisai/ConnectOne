import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, ChevronRight, Sparkles, Heart, Brain, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import EnergikoPanda from '@/components/EnergikoPanda';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

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
    
    setLoading(true);
    setErrors({});
    
    try {
      let result;
      
      if (isLogin) {
        // LOGIN - Usuario existente
        result = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          
          toast({
            title: "¡Bienvenido de vuelta!",
            description: "Has iniciado sesión exitosamente",
          });
          
          // Si ya completó el cuestionario, va a dashboard
          // Si no lo ha completado, va al cuestionario
          if (result.hasCompletedQuestionnaire) {
            navigate('/dashboard');
          } else {
            navigate('/questionnaire');
          }
        } else {
          setErrors({ general: result.error });
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive"
          });
        }
      } else {
        // REGISTER - Usuario nuevo
        result = await register({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
          
          toast({
            title: "¡Cuenta creada!",
            description: "Bienvenido a ConnectONE 🎉",
          });
          
          // Nuevo usuario SIEMPRE va al cuestionario
          navigate('/questionnaire');
        } else {
          setErrors({ general: result.error });
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      const message = 'Error de conexión con el servidor';
      setErrors({ general: message });
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'} - ConnectONE</title>
        <meta name="description" content="Únete a ConnectONE y transforma tu vida" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-slate-900/80 backdrop-blur-xl border-purple-500/30 shadow-2xl">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <EnergikoPanda pandaType="logo" size="medium" />
                </motion.div>
              </div>
              
              <div className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {isLogin ? '¡Bienvenido de vuelta!' : '¡Únete a ConnectONE!'}
                </CardTitle>
                <CardDescription className="text-purple-200 mt-2">
                  {isLogin 
                    ? 'Continúa tu viaje de transformación' 
                    : 'Comienza tu aventura hacia el bienestar'}
                </CardDescription>
              </div>

              {/* Características destacadas */}
              {!isLogin && (
                <div className="grid grid-cols-3 gap-2 pt-2">
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
                      className="flex flex-col items-center gap-1 p-2 bg-purple-500/10 rounded-lg"
                    >
                      <div className="text-purple-400">{item.icon}</div>
                      <span className="text-xs text-purple-200">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
                >
                  {errors.general}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="nombre" className="text-purple-200">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="bg-slate-800/50 border-purple-500/30 text-white focus:border-purple-500"
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="text-sm text-red-400 mt-1">{errors.nombre}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-800/50 border-purple-500/30 text-white focus:border-purple-500"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-purple-200">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-slate-800/50 border-purple-500/30 text-white focus:border-purple-500 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
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
                      <Label htmlFor="confirmPassword" className="text-purple-200">Confirmar contraseña</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="bg-slate-800/50 border-purple-500/30 text-white focus:border-purple-500 pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 h-12 rounded-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-purple-200">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
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