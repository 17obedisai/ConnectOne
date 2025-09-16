import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import axios from 'axios';

// Imports de lucide-react (SIN DUPLICADOS)
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Save, 
  RefreshCw,
  Moon, 
  Sun, 
  Volume2, 
  Globe, 
  Clock, 
  Calendar,
  Smartphone, 
  Mail, 
  Lock, 
  Trash2, 
  Download, 
  Upload,
  AlertCircle, 
  CheckCircle, 
  Camera, 
  Edit, 
  LogOut,
  Heart, 
  Brain, 
  Activity, 
  Target,
  BookOpen, 
  Users, 
  Sparkles
} from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { profile, refreshData } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Estados del formulario
  const [profileData, setProfileData] = useState({
    nombre: '',
    email: '',
    bio: '',
    fechaNacimiento: '',
    genero: '',
    ubicacion: ''
  });
  
  const [preferences, setPreferences] = useState({
    tema: 'system',
    idioma: 'es',
    formato24h: true,
    sonidos: true,
    vibracion: true
  });
  
  const [notifications, setNotifications] = useState({
    misiones: true,
    logros: true,
    recordatorios: true,
    actualizaciones: false,
    emailDigest: 'weekly',
    horarioQuiet: {
      enabled: false,
      inicio: '22:00',
      fin: '08:00'
    }
  });
  
  const [privacy, setPrivacy] = useState({
    perfilPublico: false,
    mostrarRacha: true,
    mostrarLogros: true,
    mostrarNivel: true,
    datosAnonimos: true
  });
  
  const [goals, setGoals] = useState({
    metaDiaria: 5,
    metaSemanal: 30,
    categoriasPrioridad: [],
    tiempoDisponible: '30',
    recordatorioHora: '09:00'
  });

  useEffect(() => {
    if (user && profile) {
      setProfileData({
        nombre: user.nombre || '',
        email: user.email || '',
        bio: profile.bio || '',
        fechaNacimiento: profile.fechaNacimiento || '',
        genero: profile.genero || '',
        ubicacion: profile.ubicacion || ''
      });
      
      // Cargar otras preferencias del localStorage o perfil
      const savedPrefs = localStorage.getItem(`preferences_${user.id}`);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, [user, profile]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(
        'http://localhost:5000/api/users/profile',
        profileData,
        { headers: { 'x-auth-token': token } }
      );
      
      toast({
        title: "Perfil actualizado",
        description: "Tus datos se han guardado correctamente"
      });
      
      await refreshData();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem(`preferences_${user.id}`, JSON.stringify(preferences));
    
    // Aplicar tema
    if (preferences.tema === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (preferences.tema === 'light') {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Preferencias guardadas",
      description: "Tus ajustes han sido aplicados"
    });
  };

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/users/export',
        { headers: { 'x-auth-token': token } }
      );
      
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `connectone-backup-${Date.now()}.json`;
      link.click();
      
      toast({
        title: "Datos exportados",
        description: "Tu backup ha sido descargado"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron exportar los datos",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        'http://localhost:5000/api/users/account',
        { headers: { 'x-auth-token': token } }
      );
      
      logout();
      navigate('/');
      
      toast({
        title: "Cuenta eliminada",
        description: "Tu cuenta ha sido eliminada permanentemente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la cuenta",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Configuración - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <EnergikoPanda pandaType="profile" size="medium" />
                <div>
                  <h1 className="text-4xl font-bold">Configuración</h1>
                  <p className="text-muted-foreground">
                    Personaliza tu experiencia en ConnectONE
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs de configuración */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Sun className="w-4 h-4 mr-2" />
                Preferencias
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="goals">
                <Target className="w-4 h-4 mr-2" />
                Objetivos
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="w-4 h-4 mr-2" />
                Privacidad
              </TabsTrigger>
            </TabsList>

            {/* Tab: Perfil */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información básica y personaliza tu perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <Button 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 rounded-full p-2"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <p className="font-medium">{profileData.nombre || 'Usuario'}</p>
                      <p className="text-sm text-muted-foreground">
                        Nivel {profile?.level || 1} • {profile?.xp || 0} XP
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        value={profileData.nombre}
                        onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                      <Input
                        id="fechaNacimiento"
                        type="date"
                        value={profileData.fechaNacimiento}
                        onChange={(e) => setProfileData({...profileData, fechaNacimiento: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genero">Género</Label>
                      <Select 
                        value={profileData.genero} 
                        onValueChange={(value) => setProfileData({...profileData, genero: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="femenino">Femenino</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                          <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                      placeholder="Cuéntanos sobre ti..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Preferencias */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apariencia y Comportamiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <Select 
                        value={preferences.tema}
                        onValueChange={(value) => setPreferences({...preferences, tema: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <Sun className="w-4 h-4 mr-2 inline" />
                            Claro
                          </SelectItem>
                          <SelectItem value="dark">
                            <Moon className="w-4 h-4 mr-2 inline" />
                            Oscuro
                          </SelectItem>
                          <SelectItem value="system">
                            <Smartphone className="w-4 h-4 mr-2 inline" />
                            Sistema
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select 
                        value={preferences.idioma}
                        onValueChange={(value) => setPreferences({...preferences, idioma: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Formato de 24 horas</p>
                        <p className="text-sm text-muted-foreground">
                          Usar formato de 24h en lugar de AM/PM
                        </p>
                      </div>
                      <Switch
                        checked={preferences.formato24h}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, formato24h: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Efectos de sonido</p>
                        <p className="text-sm text-muted-foreground">
                          Reproducir sonidos al completar acciones
                        </p>
                      </div>
                      <Switch
                        checked={preferences.sonidos}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, sonidos: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Vibración</p>
                        <p className="text-sm text-muted-foreground">
                          Vibrar al completar misiones (móvil)
                        </p>
                      </div>
                      <Switch
                        checked={preferences.vibracion}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, vibracion: checked})
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePreferences}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar preferencias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Notificaciones */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>
                    Controla cómo y cuándo recibir notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          Recordatorios de misiones
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Notificaciones sobre misiones diarias pendientes
                        </p>
                      </div>
                      <Switch
                        checked={notifications.misiones}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, misiones: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          Logros desbloqueados
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Celebra cuando desbloquees nuevos logros
                        </p>
                      </div>
                      <Switch
                        checked={notifications.logros}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, logros: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          Recordatorios personalizados
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Recordatorios de hábitos y rutinas
                        </p>
                      </div>
                      <Switch
                        checked={notifications.recordatorios}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, recordatorios: checked})
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Resumen por email</Label>
                    <Select 
                      value={notifications.emailDigest}
                      onValueChange={(value) => 
                        setNotifications({...notifications, emailDigest: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Nunca</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Horario silencioso
                        </p>
                        <p className="text-sm text-muted-foreground">
                          No recibir notificaciones en ciertos horarios
                        </p>
                      </div>
                      <Switch
                        checked={notifications.horarioQuiet.enabled}
                        onCheckedChange={(checked) => 
                          setNotifications({
                            ...notifications, 
                            horarioQuiet: {...notifications.horarioQuiet, enabled: checked}
                          })
                        }
                      />
                    </div>

                    {notifications.horarioQuiet.enabled && (
                      <div className="grid grid-cols-2 gap-4 ml-6">
                        <div className="space-y-2">
                          <Label>Desde</Label>
                          <Input 
                            type="time" 
                            value={notifications.horarioQuiet.inicio}
                            onChange={(e) => 
                              setNotifications({
                                ...notifications,
                                horarioQuiet: {...notifications.horarioQuiet, inicio: e.target.value}
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hasta</Label>
                          <Input 
                            type="time" 
                            value={notifications.horarioQuiet.fin}
                            onChange={(e) => 
                              setNotifications({
                                ...notifications,
                                horarioQuiet: {...notifications.horarioQuiet, fin: e.target.value}
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar notificaciones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Objetivos */}
            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos y Metas</CardTitle>
                  <CardDescription>
                    Personaliza tus metas diarias y semanales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Misiones diarias objetivo</Label>
                      <Select 
                        value={goals.metaDiaria.toString()}
                        onValueChange={(value) => 
                          setGoals({...goals, metaDiaria: parseInt(value)})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 misiones</SelectItem>
                          <SelectItem value="5">5 misiones</SelectItem>
                          <SelectItem value="7">7 misiones</SelectItem>
                          <SelectItem value="10">10 misiones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tiempo disponible diario</Label>
                      <Select 
                        value={goals.tiempoDisponible}
                        onValueChange={(value) => 
                          setGoals({...goals, tiempoDisponible: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="45">45 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="90">1.5 horas</SelectItem>
                          <SelectItem value="120">2+ horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Categorías de enfoque</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: 'ejercicio', icon: Activity, label: 'Ejercicio' },
                        { id: 'meditacion', icon: Brain, label: 'Meditación' },
                        { id: 'lectura', icon: BookOpen, label: 'Lectura' },
                        { id: 'habitos', icon: Heart, label: 'Hábitos' },
                        { id: 'social', icon: Users, label: 'Social' },
                        { id: 'creatividad', icon: Sparkles, label: 'Creatividad' }
                      ].map((cat) => (
                        <Button
                          key={cat.id}
                          variant={goals.categoriasPrioridad?.includes(cat.id) ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => {
                            const newCats = goals.categoriasPrioridad?.includes(cat.id)
                              ? goals.categoriasPrioridad.filter(c => c !== cat.id)
                              : [...(goals.categoriasPrioridad || []), cat.id];
                            setGoals({...goals, categoriasPrioridad: newCats});
                          }}
                        >
                          <cat.icon className="w-4 h-4 mr-2" />
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hora preferida para recordatorios</Label>
                    <Input 
                      type="time"
                      value={goals.recordatorioHora}
                      onChange={(e) => setGoals({...goals, recordatorioHora: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar objetivos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Privacidad */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacidad y Seguridad</CardTitle>
                  <CardDescription>
                    Controla tu información y cómo se comparte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Perfil público</p>
                        <p className="text-sm text-muted-foreground">
                          Permitir que otros usuarios vean tu perfil
                        </p>
                      </div>
                      <Switch
                        checked={privacy.perfilPublico}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, perfilPublico: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mostrar racha</p>
                        <p className="text-sm text-muted-foreground">
                          Otros pueden ver tu racha de días
                        </p>
                      </div>
                      <Switch
                        checked={privacy.mostrarRacha}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, mostrarRacha: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Datos anónimos</p>
                        <p className="text-sm text-muted-foreground">
                          Ayudar a mejorar la app con datos anónimos
                        </p>
                      </div>
                      <Switch
                        checked={privacy.datosAnonimos}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, datosAnonimos: checked})
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Gestión de cuenta</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" onClick={() => navigate('/change-password')}>
                        <Lock className="w-4 h-4 mr-2" />
                        Cambiar contraseña
                      </Button>
                      
                      <Button variant="outline" onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar datos
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <p className="font-medium mb-2">Zona de peligro</p>
                      <p className="text-sm mb-4">
                        Estas acciones son permanentes y no se pueden deshacer.
                      </p>
                      {showDeleteConfirm && (
                        <p className="text-sm mb-4 font-medium">
                          ¿Estás seguro? Esta acción es irreversible.
                        </p>
                      )}
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {showDeleteConfirm ? 'Confirmar eliminación' : 'Eliminar cuenta'}
                      </Button>
                      {showDeleteConfirm && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-2"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancelar
                        </Button>
                      )}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;