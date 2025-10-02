import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { 
  Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2, 
  Sparkles, CheckCircle, ChevronRight, ArrowLeft 
} from 'lucide-react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Partículas flotantes
  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['✨', '⭐', '💫', '🌟', '🐼'][Math.floor(Math.random() * 5)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  // Requisitos de contraseña
  const passwordRequirements = [
    { text: 'Al menos 6 caracteres', valid: formData.password.length >= 6 },
    { text: 'Una letra mayúscula', valid: /[A-Z]/.test(formData.password) },
    { text: 'Una letra minúscula', valid: /[a-z]/.test(formData.password) },
    { text: 'Un número', valid: /[0-9]/.test(formData.password) }
  ];

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
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { nombre: formData.nombre, email: formData.email, password: formData.password };
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${endpoint}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      
      // Configurar axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: isLogin ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!",
        description: isLogin ? "Has iniciado sesión exitosamente" : "Bienvenido a ConnectONE",
      });

      // Verificar si completó el cuestionario
      const profile = response.data.usuario.profile;
      if (profile?.questionnaire_completed) {
        navigate('/dashboard');
      } else {
        navigate('/questionnaire');
      }

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

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'} - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
        
        {/* Partículas flotantes */}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-purple-800/30 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>

          {/* Header con Panda */}
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
            <p className="text-purple-200">
              {isLogin ? 'Tu compañero de bienestar' : 'Únete a la aventura'}
            </p>
          </motion.div>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription className="text-purple-200">
                {isLogin 
                  ? 'Enérgiko te estaba esperando' 
                  : 'Comienza tu viaje de transformación'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {errors.general && (
                <Alert className="mb-4 bg-red-500/20 border-red-500/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200">
                    {errors.general}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Label className="text-purple-200">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                      <Input
                        type="text"
                        placeholder="Juan Pérez"
                        className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-400">{errors.nombre}</p>
                    )}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-purple-200">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={loading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-purple-200">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {!isLogin && formData.password && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {req.valid ? (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-purple-500" />
                          )}
                          <span className={`text-xs ${req.valid ? 'text-green-400' : 'text-purple-300'}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label className="text-purple-200">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

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