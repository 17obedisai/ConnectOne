import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2, Sparkles, Star, ChevronRight } from 'lucide-react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { toast } = useToast();

  // Partículas flotantes animadas
  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['✨', '⭐', '💫', '🌟', '🐼'][Math.floor(Math.random() * 5)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  // Validación de formulario (mantenida exactamente igual)
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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'La contraseña debe tener mayúsculas, minúsculas y números';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
      
      if (!formData.nombre || formData.nombre.length < 2) {
        newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit exactamente igual con animación añadida
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { nombre: formData.nombre, email: formData.email, password: formData.password };
      
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // Guardar token y usuario
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));

      // Animación de éxito
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: isLogin ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!",
        description: isLogin ? "Has iniciado sesión exitosamente" : "Tu cuenta ha sido creada",
      });

      // Redirigir forzando recarga
      window.location.href = '/dashboard';

    } catch (error) {
      const message = error.response?.data?.mensaje || 'Error de conexión con el servidor';
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

  const handleGoogleLogin = () => {
    toast({
      title: "Próximamente",
      description: "La autenticación con Google estará disponible pronto",
    });
  };

  const passwordRequirements = [
    { text: 'Al menos 6 caracteres', valid: formData.password.length >= 6 },
    { text: 'Una letra mayúscula', valid: /[A-Z]/.test(formData.password) },
    { text: 'Una letra minúscula', valid: /[a-z]/.test(formData.password) },
    { text: 'Un número', valid: /[0-9]/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      
      {/* Partículas flotantes de fondo */}
      {floatingElements.map(el => (
        <motion.div
          key={el.id}
          className="absolute text-2xl opacity-20 pointer-events-none"
          initial={{ x: `${el.x}%`, y: `${el.y}%` }}
          animate={{
            x: [`${el.x}%`, `${(el.x + 20) % 100}%`],
            y: [`${el.y}%`, `${(el.y - 20) % 100}%`],
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

      <div className="w-full max-w-md relative z-10">
        {/* Header con EnergikoPanda animado */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [-2, 2, -2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block"
          >
            <EnergikoPanda pandaType="logo" size="large" className="mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white">ConnectONE</h1>
          <p className="text-purple-200">Tu compañero de bienestar</p>
        </motion.div>

        {/* Card principal mejorada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription className="text-purple-200">
                {isLogin 
                  ? 'Ingresa para continuar tu viaje de bienestar' 
                  : 'Únete y comienza tu transformación'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Alert de errores con nuevo estilo */}
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Alert className="mb-4 bg-red-500/20 border-red-500/50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">
                        {errors.general}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Nombre (solo registro) */}
                {!isLogin && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="nombre" className="text-purple-200">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                      <Input
                        id="nombre"
                        type="text"
                        placeholder="Juan Pérez"
                        className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 focus:border-purple-400"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                    {errors.nombre && (
                      <motion.p 
                        className="text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.nombre}
                      </motion.p>
                    )}
                  </motion.div>
                )}
                
                {/* Campo Email */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 focus:border-purple-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={loading}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      className="text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Campo Password */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="password" className="text-purple-200">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 focus:border-purple-400"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      className="text-sm text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                  
                  {/* Indicadores de requisitos de contraseña */}
                  {!isLogin && formData.password && (
                    <motion.div 
                      className="space-y-1 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${req.valid ? 'bg-green-400' : 'bg-purple-600'}`} />
                          <span className={`text-xs ${req.valid ? 'text-green-400' : 'text-purple-300'}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                {/* Confirmar Password (solo registro) */}
                {!isLogin && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="confirmPassword" className="text-purple-200">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 focus:border-purple-400"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <motion.p 
                        className="text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
                
                {/* Botón Submit mejorado */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 h-12 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all" 
                    disabled={loading}
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
                </motion.div>

                {/* Divisor con nuevo estilo */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-purple-500/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-purple-300">
                      O continúa con
                    </span>
                  </div>
                </div>

                {/* Botón Google mejorado */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full bg-purple-900/30 border-purple-500/30 hover:bg-purple-900/50 text-white"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </motion.div>
                
                {/* Toggle Login/Register mejorado */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-purple-300 hover:text-purple-200 hover:bg-purple-900/30"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    disabled={loading}
                  >
                    {isLogin 
                      ? '¿No tienes cuenta? Regístrate' 
                      : '¿Ya tienes cuenta? Inicia sesión'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Link para volver con animación */}
        <motion.p 
          className="text-center text-sm text-purple-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/" className="hover:text-purple-200 transition-colors flex items-center justify-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Volver al inicio
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default LoginPage;