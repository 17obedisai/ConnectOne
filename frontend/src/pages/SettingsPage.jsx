import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import axios from 'axios';
import { 
  ArrowLeft, User, Bell, Shield, Save, Moon, Sun, Volume2,
  Clock, Calendar, Smartphone, Mail, Lock, Trash2, Download,
  AlertCircle, Camera, Heart, Brain, Activity, Target,
  BookOpen, Users, Sparkles, Zap, Palette, Timer, CheckCircle
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
    nombre: user?.nombre || '',
    email: user?.email || '',
    bio: profile?.bio || '',
    fechaNacimiento: profile?.fechaNacimiento || '',
    genero: profile?.genero || '',
    ubicacion: profile?.ubicacion || ''
  });
  
  const [preferences, setPreferences] = useState({
    tema: localStorage.getItem('theme') || 'dark',
    idioma: localStorage.getItem('language') || 'es',
    formato24h: localStorage.getItem('format24h') === 'true',
    sonidos: localStorage.getItem('sounds') !== 'false',
    vibracion: localStorage.getItem('vibration') !== 'false'
  });
  
  const [notifications, setNotifications] = useState({
    misiones: localStorage.getItem('notif_misiones') !== 'false',
    logros: localStorage.getItem('notif_logros') !== 'false',
    recordatorios: localStorage.getItem('notif_recordatorios') !== 'false',
    actualizaciones: localStorage.getItem('notif_updates') === 'true',
    emailDigest: localStorage.getItem('email_digest') || 'weekly',
    horarioQuiet: {
      enabled: localStorage.getItem('quiet_hours') === 'true',
      inicio: localStorage.getItem('quiet_start') || '22:00',
      fin: localStorage.getItem('quiet_end') || '08:00'
    }
  });
  
  const [privacy, setPrivacy] = useState({
    perfilPublico: localStorage.getItem('public_profile') === 'true',
    mostrarRacha: localStorage.getItem('show_streak') !== 'false',
    mostrarLogros: localStorage.getItem('show_achievements') !== 'false',
    mostrarNivel: localStorage.getItem('show_level') !== 'false',
    datosAnonimos: localStorage.getItem('anonymous_data') !== 'false'
  });
  
  const [goals, setGoals] = useState({
    metaDiaria: parseInt(localStorage.getItem('daily_goal')) || 5,
    metaSemanal: parseInt(localStorage.getItem('weekly_goal')) || 30,
    categoriasPrioridad: JSON.parse(localStorage.getItem('priority_categories') || '[]'),
    tiempoDisponible: localStorage.getItem('available_time') || '30',
    recordatorioHora: localStorage.getItem('reminder_time') || '09:00'
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('user_profile', JSON.stringify(profileData));
      
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
    // Guardar cada preferencia
    localStorage.setItem('theme', preferences.tema);
    localStorage.setItem('language', preferences.idioma);
    localStorage.setItem('format24h', preferences.formato24h);
    localStorage.setItem('sounds', preferences.sonidos);
    localStorage.setItem('vibration', preferences.vibracion);
    
    // Aplicar tema
    if (preferences.tema === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Preferencias guardadas",
      description: "Tus ajustes han sido aplicados"
    });
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('notif_misiones', notifications.misiones);
    localStorage.setItem('notif_logros', notifications.logros);
    localStorage.setItem('notif_recordatorios', notifications.recordatorios);
    localStorage.setItem('notif_updates', notifications.actualizaciones);
    localStorage.setItem('email_digest', notifications.emailDigest);
    localStorage.setItem('quiet_hours', notifications.horarioQuiet.enabled);
    localStorage.setItem('quiet_start', notifications.horarioQuiet.inicio);
    localStorage.setItem('quiet_end', notifications.horarioQuiet.fin);
    
    toast({
      title: "Notificaciones actualizadas",
      description: "Tus preferencias han sido guardadas"
    });
  };

  const handleSaveGoals = () => {
    localStorage.setItem('daily_goal', goals.metaDiaria);
    localStorage.setItem('weekly_goal', goals.metaSemanal);
    localStorage.setItem('priority_categories', JSON.stringify(goals.categoriasPrioridad));
    localStorage.setItem('available_time', goals.tiempoDisponible);
    localStorage.setItem('reminder_time', goals.recordatorioHora);
    
    toast({
      title: "Objetivos guardados",
      description: "Tus metas han sido actualizadas"
    });
  };

  const handleSavePrivacy = () => {
    localStorage.setItem('public_profile', privacy.perfilPublico);
    localStorage.setItem('show_streak', privacy.mostrarRacha);
    localStorage.setItem('show_achievements', privacy.mostrarLogros);
    localStorage.setItem('show_level', privacy.mostrarNivel);
    localStorage.setItem('anonymous_data', privacy.datosAnonimos);
    
    toast({
      title: "Privacidad actualizada",
      description: "Tus configuraciones de privacidad han sido guardadas"
    });
  };

  const handleExportData = () => {
    const allData = {
      profile: profileData,
      preferences,
      notifications,
      goals,
      privacy,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
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
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    localStorage.clear();
    logout();
    navigate('/');
    
    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada"
    });
  };

  return (
    <>
      <Helmet>
        <title>Configuración - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Mejorado */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4 text-white hover:bg-purple-700/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            
            <motion.div 
              className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-5xl"
                >
                  ⚙️
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold text-white flex items-center gap-2">
                    Configuración
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  </h1>
                  <p className="text-purple-200">
                    Personaliza tu experiencia en ConnectONE
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs Mejoradas */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full bg-purple-900/30 backdrop-blur p-1">
              <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white">
                <Palette className="w-4 h-4 mr-2" />
                Preferencias
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white">
                <Target className="w-4 h-4 mr-2" />
                Objetivos
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2" />
                Privacidad
              </TabsTrigger>
            </TabsList>

            {/* TAB: PERFIL */}
            <TabsContent value="profile">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Información Personal</CardTitle>
                  <CardDescription className="text-purple-200">
                    Actualiza tu información básica
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src="/images/panda-profile.png" 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 rounded-full p-2">
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">
                        {profileData.nombre || 'Usuario'}
                      </p>
                      <p className="text-purple-300">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-purple-200">Nombre</Label>
                      <Input
                        value={profileData.nombre}
                        onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                        className="bg-purple-900/30 border-purple-500/30 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-purple-200">Email</Label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="bg-purple-900/30 border-purple-500/30 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-purple-200">Biografía</Label>
                    <textarea
                      className="w-full min-h-[100px] p-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Perfil
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: PREFERENCIAS */}
            <TabsContent value="preferences">
              <Card className="bg-gradient-to-br from-blue-800/30 to-cyan-800/30 backdrop-blur border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Apariencia y Comportamiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="text-blue-200">Tema</Label>
                      <Select 
                        value={preferences.tema}
                        onValueChange={(value) => setPreferences({...preferences, tema: value})}
                      >
                        <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Oscuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-200">Idioma</Label>
                      <Select 
                        value={preferences.idioma}
                        onValueChange={(value) => setPreferences({...preferences, idioma: value})}
                      >
                        <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Formato 24 horas</p>
                        <p className="text-sm text-blue-200">Usar 24h en lugar de AM/PM</p>
                      </div>
                      <Switch
                        checked={preferences.formato24h}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, formato24h: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Efectos de sonido</p>
                        <p className="text-sm text-blue-200">Sonidos al completar acciones</p>
                      </div>
                      <Switch
                        checked={preferences.sonidos}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, sonidos: checked})
                        }
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSavePreferences}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: NOTIFICACIONES */}
            <TabsContent value="notifications">
              <Card className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Preferencias de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Recordatorios de misiones</p>
                        <p className="text-sm text-green-200">Notificaciones diarias</p>
                      </div>
                      <Switch
                        checked={notifications.misiones}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, misiones: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Logros desbloqueados</p>
                        <p className="text-sm text-green-200">Celebra tus logros</p>
                      </div>
                      <Switch
                        checked={notifications.logros}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, logros: checked})
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-green-200">Resumen por email</Label>
                    <Select 
                      value={notifications.emailDigest}
                      onValueChange={(value) => 
                        setNotifications({...notifications, emailDigest: value})
                      }
                    >
                      <SelectTrigger className="bg-green-900/30 border-green-500/30 text-white">
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

                  <Button 
                    onClick={handleSaveNotifications}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Notificaciones
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: OBJETIVOS */}
            <TabsContent value="goals">
              <Card className="bg-gradient-to-br from-orange-800/30 to-red-800/30 backdrop-blur border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Objetivos y Metas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="text-orange-200">Misiones diarias</Label>
                      <Select 
                        value={goals.metaDiaria.toString()}
                        onValueChange={(value) => 
                          setGoals({...goals, metaDiaria: parseInt(value)})
                        }
                      >
                        <SelectTrigger className="bg-orange-900/30 border-orange-500/30 text-white">
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

                    <div>
                      <Label className="text-orange-200">Tiempo disponible</Label>
                      <Select 
                        value={goals.tiempoDisponible}
                        onValueChange={(value) => 
                          setGoals({...goals, tiempoDisponible: value})
                        }
                      >
                        <SelectTrigger className="bg-orange-900/30 border-orange-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="120">2+ horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-orange-200 mb-3 block">Categorías de enfoque</Label>
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
                          className={
                            goals.categoriasPrioridad?.includes(cat.id)
                              ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                              : "border-orange-500/30 text-orange-200 hover:bg-orange-900/30"
                          }
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

                  <Button 
                    onClick={handleSaveGoals}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Objetivos
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: PRIVACIDAD */}
            <TabsContent value="privacy">
              <Card className="bg-gradient-to-br from-pink-800/30 to-rose-800/30 backdrop-blur border-pink-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Privacidad y Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-pink-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Perfil público</p>
                        <p className="text-sm text-pink-200">Otros pueden ver tu perfil</p>
                      </div>
                      <Switch
                        checked={privacy.perfilPublico}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, perfilPublico: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-pink-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Mostrar racha</p>
                        <p className="text-sm text-pink-200">Tu racha será visible</p>
                      </div>
                      <Switch
                        checked={privacy.mostrarRacha}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, mostrarRacha: checked})
                        }
                      />
                    </div>
                  </div>

                  <Separator className="bg-pink-500/30" />

                  <div className="space-y-4">
                    <Button variant="outline" onClick={handleExportData} className="w-full border-pink-500/30 text-pink-200 hover:bg-pink-900/30">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar datos
                    </Button>

                    <Alert className="border-red-500/30 bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200">
                        <p className="font-medium mb-2">Zona peligrosa</p>
                        {showDeleteConfirm && (
                          <p className="mb-2">¿Estás seguro? Esta acción es irreversible.</p>
                        )}
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={handleDeleteAccount}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {showDeleteConfirm ? 'Confirmar' : 'Eliminar cuenta'}
                          </Button>
                          {showDeleteConfirm && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowDeleteConfirm(false)}
                              className="border-red-500/30 text-red-200"
                            >
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>

                  <Button 
                    onClick={handleSavePrivacy}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Privacidad
                  </Button>
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