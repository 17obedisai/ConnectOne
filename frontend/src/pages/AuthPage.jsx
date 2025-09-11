import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();

  useEffect(() => {
    if (user) {
      const profile = JSON.parse(localStorage.getItem(`profile_${user.id}`));
      if (profile?.questionnaire_completed) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast({ title: "Error", description: "Por favor completa todos los campos requeridos", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (!isLogin) {
      if (!formData.fullName) {
        toast({ title: "Error", description: "Por favor ingresa tu nombre completo", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Error", description: "Las contraseñas no coinciden", variant: "destructive" });
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          toast({ title: "¡Bienvenido de vuelta!", description: "Has iniciado sesión exitosamente" });
          const profile = JSON.parse(localStorage.getItem(`profile_${result.user.id}`));
          if (profile?.questionnaire_completed) {
            navigate('/dashboard');
          } else {
            navigate('/onboarding');
          }
        } else {
          toast({ title: "Error al iniciar sesión", description: result.message, variant: "destructive" });
        }
      } else {
        const result = await signUp(formData.email, formData.password, formData.fullName);
        if (result.success) {
          toast({ title: "¡Cuenta creada!", description: "Ahora puedes iniciar sesión.", duration: 9000 });
          setIsLogin(true);
        } else {
          toast({ title: "Error de registro", description: result.message, variant: "destructive" });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Algo salió mal. Por favor intenta de nuevo.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'} - ConnectONE</title>
        <meta name="description" content={isLogin ? 'Inicia sesión en ConnectONE y continúa tu viaje de bienestar personal' : 'Crea tu cuenta en ConnectONE y comienza tu transformación personal'} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-foreground hover:bg-primary/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>

          <Card className="glass-effect border-border">
            <CardHeader className="text-center pb-4">
              <EnergikoPanda mood="happy" size="medium" className="mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                {isLogin ? '¡Hola de nuevo!' : '¡Únete a ConnectONE!'}
              </CardTitle>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'Enérgiko te estaba esperando' 
                  : 'Comienza tu viaje de transformación'
                }
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold py-3 rounded-lg primary-glow transition-all duration-300"
                >
                  {isLoading 
                    ? 'Procesando...' 
                    : isLogin 
                      ? 'Iniciar Sesión' 
                      : 'Crear Cuenta'
                  }
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80 font-semibold"
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