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
  AlertCircle, Camera, LogOut, Heart, Brain, Activity, Target,
  BookOpen, Users, Sparkles, Zap, Globe, ChevronRight, Settings,
  Palette, Languages, Timer
} from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { profile, refreshData } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Estados igual que antes...
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

  // Tabs mejoradas con colores e iconos
  const tabsConfig = [
    { 
      value: 'profile', 
      label: 'Perfil', 
      icon: User,
      color: 'from-purple-500 to-indigo-600',
      emoji: '👤'
    },
    { 
      value: 'preferences', 
      label: 'Preferencias', 
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      emoji: '🎨'
    },
    { 
      value: 'notifications', 
      label: 'Notificaciones', 
      icon: Bell,
      color: 'from-green-500 to-emerald-600',
      emoji: '🔔'
    },
    { 
      value: 'goals', 
      label: 'Objetivos', 
      icon: Target,
      color: 'from-orange-500 to-red-600',
      emoji: '🎯'
    },
    { 
      value: 'privacy', 
      label: 'Privacidad', 
      icon: Shield,
      color: 'from-pink-500 to-rose-600',
      emoji: '🛡️'
    }
  ];

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
        title: "✅ Perfil actualizado",
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
    
    if (preferences.tema === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (preferences.tema === 'light') {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "✨ Preferencias guardadas",
      description: "Tus ajustes han sido aplicados"
    });
  };

  return (
    <>
      <Helmet>
        <title>Configuración - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Animado */}
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
              <div className="flex items-center justify-between">
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
                
                <motion.div 
                  className="hidden md:flex items-center gap-4 bg-purple-900/30 px-4 py-2 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{profile?.level || 1}</p>
                    <p className="text-xs text-purple-300">Nivel</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{profile?.xp || 0}</p>
                    <p className="text-xs text-purple-300">XP</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs Animadas */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full bg-purple-900/30 backdrop-blur p-1">
              {tabsConfig.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <motion.div
                    key={tab.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TabsTrigger 
                      value={tab.value}
                      className={`
                        relative overflow-hidden transition-all duration-300
                        data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.color}
                        data-[state=active]:text-white
                      `}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="text-lg">{tab.emoji}</span>
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                      {activeTab === tab.value && (
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </TabsTrigger>
                  </motion.div>
                );
              })}
            </TabsList>

            {/* Tab: Perfil */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <User className="w-6 h-6 text-purple-400" />
                      Información Personal
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Actualiza tu información y personaliza tu perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar con animación */}
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div className="relative">
                        <motion.div 
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <span className="text-4xl">🐼</span>
                        </motion.div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 rounded-full p-2 shadow-lg"
                        >
                          <Camera className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                      <div>
                        <p className="font-bold text-white text-xl">
                          {profileData.nombre || 'Usuario'}
                        </p>
                        <p className="text-purple-300">
                          Nivel {profile?.level || 1} • {profile?.xp || 0} XP
                        </p>
                      </div>
                    </motion.div>

                    <Separator className="bg-purple-500/30" />

                    {/* Campos del formulario con estilos mejorados */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label className="text-purple-200">Nombre completo</Label>
                        <Input
                          value={profileData.nombre}
                          onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                          className="bg-purple-900/30 border-purple-500/30 text-white focus:border-purple-400"
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label className="text-purple-200">Email</Label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="bg-purple-900/30 border-purple-500/30 text-white focus:border-purple-400"
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                    >
                      <Label className="text-purple-200">Biografía</Label>
                      <textarea
                        className="w-full min-h-[100px] p-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white focus:border-purple-400 transition-colors"
                        placeholder="Cuéntanos sobre ti..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      />
                    </motion.div>

                    <motion.div 
                      className="flex justify-end"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={handleSaveProfile} 
                        disabled={isLoading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar cambios
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Resto de tabs con el mismo estilo... */}
            {/* Por brevedad, aquí muestro el patrón para las demás tabs */}
            
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;