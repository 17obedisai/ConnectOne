import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, Target, Heart, Brain, Dumbbell, Book, Music, Coffee,
  Edit3, Save, Plus, Trash2, ChevronLeft, ChevronRight,
  Trophy, Flame, Sparkles, X, Check, Zap, TrendingUp,
  Lock, Award, Calendar, Clock, MapPin, Gift, Shield,
  Palette, Activity, Users, User, Mountain, Gamepad2,
  Sunrise, Moon, Sun, CloudRain, Wind, Droplets
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const ProfilePage = () => {
  const { user } = useAuth();
  const { stats, profile: savedProfile, updateProfile } = useData();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('avatar');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPanda, setSelectedPanda] = useState(1);
  const [hoveredPanda, setHoveredPanda] = useState(null);
  const [newGoalText, setNewGoalText] = useState('');
  const [showGoalInput, setShowGoalInput] = useState({ corto: false, largo: false });
  const [floatingElements, setFloatingElements] = useState([]);
  
  const [profileData, setProfileData] = useState({
    nombre: user?.nombre || savedProfile?.nombre || 'Usuario',
    bio: savedProfile?.bio || 'Transformándome día a día 🌱',
    edad: savedProfile?.edad || '',
    objetivoPrincipal: savedProfile?.objetivoPrincipal || '',
    metasCorto: savedProfile?.metasCorto || [],
    metasLargo: savedProfile?.metasLargo || [],
    intereses: savedProfile?.intereses || [],
    estiloVida: savedProfile?.estiloVida || '',
    tiempoDisponible: savedProfile?.tiempoDisponible || '30min',
    nivelActividad: savedProfile?.nivelActividad || 'moderado',
    pandaSkin: savedProfile?.pandaSkin || 1,
    // Nuevos campos
    ubicacion: savedProfile?.ubicacion || '',
    horarioPreferido: savedProfile?.horarioPreferido || 'mañana',
    motivacion: savedProfile?.motivacion || '',
    logrosDeseados: savedProfile?.logrosDeseados || []
  });

  const level = stats?.level || 1;
  
  const pandaVersions = [
    { id: 1, level: 1, name: 'Iniciado Curioso', image: '/images/panda-profile.png', description: 'El comienzo de tu aventura', unlocked: true, rarity: 'común' },
    { id: 2, level: 2, name: 'Explorador Novato', image: '/images/panda-level-2.png', description: 'Descubriendo nuevos horizontes', unlocked: true, rarity: 'común' },
    { id: 3, level: 3, name: 'Aprendiz Dedicado', image: '/images/panda-level-3.png', description: 'La constancia es tu poder', unlocked: true, rarity: 'común' },
    { id: 4, level: 4, name: 'Practicante Constante', image: '/images/panda-level-4.png', description: 'Maestría en desarrollo', unlocked: true, rarity: 'raro' },
    { id: 5, level: 5, name: 'Guerrero del Hábito', image: '/images/panda-level-5.png', description: 'Forjando tu voluntad', unlocked: true, rarity: 'raro' },
    { id: 6, level: 6, name: 'Arquitecto del Cambio', image: '/images/panda-level-6.png', description: 'Construyendo tu futuro', unlocked: true, rarity: 'raro' },
    { id: 7, level: 7, name: 'Guardián del Bienestar', image: '/images/panda-level-7.png', description: 'Protector de sueños', unlocked: true, rarity: 'épico' },
    { id: 8, level: 8, name: 'Maestro Zen', image: '/images/panda-level-13.png', description: 'Equilibrio perfecto', unlocked: true, rarity: 'épico' },
    { id: 9, level: 10, name: 'Mentor Inspirador', image: '/images/panda-level-8.png', description: 'Guía de otros', unlocked: level >= 10, rarity: 'épico' },
    { id: 10, level: 12, name: 'Campeón Dorado', image: '/images/panda-level-15.png', description: 'Victoria tras victoria', unlocked: level >= 12, rarity: 'legendario' },
    { id: 11, level: 14, name: 'Leyenda Viviente', image: '/images/panda-level-11.png', description: 'Historia en movimiento', unlocked: level >= 14, rarity: 'legendario' },
    { id: 12, level: 16, name: 'Energiko Supremo', image: '/images/panda-level-16.png', description: 'La perfección alcanzada', unlocked: level >= 16, rarity: 'mítico' }
  ];

  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
      emoji: ['✨', '⭐', '🌟', '💫', '🌙', '☁️', '🦋'][Math.floor(Math.random() * 7)]
    }));
    setFloatingElements(elements);
  }, []);

  const handleSelectPanda = async () => {
    const selectedSkin = pandaVersions[selectedPanda - 1];
    
    localStorage.setItem('userPandaSkin', selectedSkin.id);
    updateProfile({ pandaSkin: selectedSkin.id });
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "¡Skin actualizada!",
      description: `Ahora usas: ${selectedSkin.name}`,
    });
    
    setProfileData({ ...profileData, pandaSkin: selectedSkin.id });
  };

  const handleSaveProfile = async () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    updateProfile(profileData);
    
    setIsEditing(false);
    toast({
      title: "¡Perfil actualizado!",
      description: "Todos tus cambios han sido guardados"
    });
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'común': return 'from-gray-400 to-gray-600';
      case 'raro': return 'from-blue-400 to-blue-600';
      case 'épico': return 'from-purple-400 to-purple-600';
      case 'legendario': return 'from-yellow-400 to-orange-600';
      case 'mítico': return 'from-pink-400 via-purple-400 to-cyan-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const interesesOpciones = [
    { value: 'meditacion', label: 'Meditación', icon: '🧘', color: 'from-purple-500 to-indigo-600' },
    { value: 'ejercicio', label: 'Ejercicio', icon: '💪', color: 'from-red-500 to-orange-600' },
    { value: 'lectura', label: 'Lectura', icon: '📚', color: 'from-blue-500 to-cyan-600' },
    { value: 'musica', label: 'Música', icon: '🎵', color: 'from-pink-500 to-rose-600' },
    { value: 'naturaleza', label: 'Naturaleza', icon: '🌿', color: 'from-green-500 to-emerald-600' },
    { value: 'cocina', label: 'Cocina', icon: '👨‍🍳', color: 'from-orange-500 to-yellow-600' },
    { value: 'arte', label: 'Arte', icon: '🎨', color: 'from-purple-500 to-pink-600' },
    { value: 'viajes', label: 'Viajes', icon: '✈️', color: 'from-cyan-500 to-blue-600' }
  ];

  const addGoal = (type) => {
    if (!newGoalText.trim()) return;
    
    const newGoals = type === 'corto' 
      ? [...profileData.metasCorto, newGoalText]
      : [...profileData.metasLargo, newGoalText];
    
    setProfileData({
      ...profileData,
      [type === 'corto' ? 'metasCorto' : 'metasLargo']: newGoals
    });
    
    setNewGoalText('');
    setShowGoalInput({ ...showGoalInput, [type]: false });
  };

  const removeGoal = (type, index) => {
    const newGoals = type === 'corto'
      ? profileData.metasCorto.filter((_, i) => i !== index)
      : profileData.metasLargo.filter((_, i) => i !== index);
    
    setProfileData({
      ...profileData,
      [type === 'corto' ? 'metasCorto' : 'metasLargo']: newGoals
    });
  };

  const toggleInteres = (interes) => {
    const newIntereses = profileData.intereses.includes(interes)
      ? profileData.intereses.filter(i => i !== interes)
      : [...profileData.intereses, interes];
    
    setProfileData({ ...profileData, intereses: newIntereses });
  };

  return (
    <>
      <Helmet>
        <title>Mi Perfil - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Partículas flotantes */}
        {floatingElements.map(el => (
          <motion.div
            key={el.id}
            className="absolute text-2xl opacity-20 pointer-events-none"
            initial={{ x: `${el.x}%`, y: `${el.y}%` }}
            animate={{
              x: `${(el.x + 20) % 100}%`,
              y: [`${el.y}%`, `${(el.y - 20) % 100}%`, `${el.y}%`],
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

        <div className="max-w-7xl mx-auto p-4 relative z-10">
          
          {/* Header con avatar y stats */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-900/20 backdrop-blur-xl border-purple-500/30 overflow-visible">
              <div className="relative">
                <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                  {/* Avatar del panda */}
                  <motion.div className="relative">
                    <motion.div
                      className={`absolute -inset-8 bg-gradient-to-r ${getRarityColor(pandaVersions[selectedPanda - 1]?.rarity)} rounded-full blur-3xl opacity-50`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <motion.div
                      className="relative w-64 h-64 lg:w-80 lg:h-80"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.img
                        key={selectedPanda}
                        src={pandaVersions[selectedPanda - 1]?.image}
                        alt="Tu Energiko"
                        className="w-full h-full object-contain drop-shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      />
                    </motion.div>

                    <motion.div
                      className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r ${getRarityColor(pandaVersions[selectedPanda - 1]?.rarity)} text-white font-bold text-sm uppercase tracking-wide shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {pandaVersions[selectedPanda - 1]?.rarity}
                    </motion.div>
                  </motion.div>

                  {/* Info y stats */}
                  <div className="flex-1 text-center lg:text-left space-y-6">
                    <div>
                      <motion.h1 
                        className="text-5xl lg:text-6xl font-bold text-white mb-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        {profileData.nombre}
                      </motion.h1>
                      
                      <motion.p 
                        className="text-xl lg:text-2xl text-purple-200 italic"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        "{profileData.bio}"
                      </motion.p>
                    </div>

                    <motion.div 
                      className="grid grid-cols-3 gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {[
                        { icon: Star, value: level, label: 'Nivel', color: 'from-yellow-400 to-orange-500' },
                        { icon: Flame, value: stats?.streak || 0, label: 'Racha', color: 'from-red-400 to-pink-500' },
                        { icon: Trophy, value: stats?.achievements || 0, label: 'Logros', color: 'from-purple-400 to-indigo-500' }
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className={`relative bg-gradient-to-br ${stat.color} p-4 rounded-xl shadow-xl`}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                          >
                            <stat.icon className="w-8 h-8 text-white mb-2" />
                          </motion.div>
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                          <p className="text-sm text-white/80">{stat.label}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs con contenido completo */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full bg-purple-900/30 backdrop-blur p-1">
              <TabsTrigger value="avatar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                <Palette className="w-4 h-4 mr-2" />
                Skins
              </TabsTrigger>
              <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="objetivos" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600">
                <Target className="w-4 h-4 mr-2" />
                Objetivos
              </TabsTrigger>
              <TabsTrigger value="intereses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">
                <Heart className="w-4 h-4 mr-2" />
                Intereses
              </TabsTrigger>
            </TabsList>

            {/* TAB: SKINS */}
            <TabsContent value="avatar">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Colección de Skins</CardTitle>
                  <p className="text-purple-200">Selecciona tu apariencia favorita</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pandaVersions.map((panda, index) => (
                      <motion.div
                        key={panda.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredPanda(panda.id)}
                        onHoverEnd={() => setHoveredPanda(null)}
                        onClick={() => {
                          if (panda.unlocked) {
                            setSelectedPanda(index + 1);
                            handleSelectPanda();
                          }
                        }}
                        className={`relative cursor-pointer ${!panda.unlocked && 'opacity-50'}`}
                      >
                        <Card className={`
                          relative overflow-hidden transition-all duration-300
                          ${selectedPanda === index + 1 ? 'ring-4 ring-purple-400' : ''}
                          ${!panda.unlocked ? 'grayscale' : ''}
                          bg-gradient-to-br ${getRarityColor(panda.rarity)} p-1
                        `}>
                          <div className="bg-gray-900/90 rounded-lg p-4">
                            {!panda.unlocked && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                <Lock className="w-8 h-8 text-white" />
                              </div>
                            )}
                            
                            <img 
                              src={panda.image} 
                              alt={panda.name}
                              className="w-full h-32 object-contain mb-2"
                            />
                            
                            <div className="text-center">
                              <p className="text-white font-bold text-sm">{panda.name}</p>
                              <p className="text-purple-200 text-xs">Nivel {panda.level}</p>
                              <Badge className={`mt-1 text-xs ${!panda.unlocked && 'opacity-50'}`}>
                                {panda.rarity}
                              </Badge>
                            </div>

                            {hoveredPanda === panda.id && panda.unlocked && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/80 flex items-center justify-center"
                              >
                                <p className="text-white text-center px-2">{panda.description}</p>
                              </motion.div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: INFORMACIÓN PERSONAL */}
            <TabsContent value="personal">
              <Card className="bg-gradient-to-br from-blue-800/30 to-cyan-800/30 backdrop-blur border-blue-500/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">Información Personal</CardTitle>
                    <p className="text-blue-200">Personaliza tu perfil</p>
                  </div>
                  <Button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <Label className="text-white">Nombre</Label>
                      <Input
                        value={profileData.nombre}
                        onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                        disabled={!isEditing}
                        className="bg-blue-900/30 border-blue-500/30 text-white"
                      />
                    </div>

                    {/* Edad */}
                    <div className="space-y-2">
                      <Label className="text-white">Edad</Label>
                      <Input
                        type="number"
                        value={profileData.edad}
                        onChange={(e) => setProfileData({...profileData, edad: e.target.value})}
                        disabled={!isEditing}
                        className="bg-blue-900/30 border-blue-500/30 text-white"
                        placeholder="Tu edad"
                      />
                    </div>

                    {/* Ubicación */}
                    <div className="space-y-2">
                      <Label className="text-white">Ubicación</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                        <Input
                          value={profileData.ubicacion}
                          onChange={(e) => setProfileData({...profileData, ubicacion: e.target.value})}
                          disabled={!isEditing}
                          className="bg-blue-900/30 border-blue-500/30 text-white pl-10"
                          placeholder="Ciudad, País"
                        />
                      </div>
                    </div>

                    {/* Horario preferido */}
                    <div className="space-y-2">
                      <Label className="text-white">Horario Preferido</Label>
                      <Select
                        value={profileData.horarioPreferido}
                        onValueChange={(value) => setProfileData({...profileData, horarioPreferido: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mañana">
                            <div className="flex items-center gap-2">
                              <Sunrise className="w-4 h-4" />
                              Mañana (6AM - 12PM)
                            </div>
                          </SelectItem>
                          <SelectItem value="tarde">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4" />
                              Tarde (12PM - 6PM)
                            </div>
                          </SelectItem>
                          <SelectItem value="noche">
                            <div className="flex items-center gap-2">
                              <Moon className="w-4 h-4" />
                              Noche (6PM - 12AM)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label className="text-white">Biografía</Label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      className="bg-blue-900/30 border-blue-500/30 text-white min-h-[100px]"
                      placeholder="Cuéntanos sobre ti..."
                    />
                  </div>

                  {/* Nivel de actividad */}
                  <div className="space-y-2">
                    <Label className="text-white">Nivel de Actividad Física</Label>
                    <Select
                      value={profileData.nivelActividad}
                      onValueChange={(value) => setProfileData({...profileData, nivelActividad: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentario">Sedentario</SelectItem>
                        <SelectItem value="ligero">Actividad Ligera</SelectItem>
                        <SelectItem value="moderado">Moderadamente Activo</SelectItem>
                        <SelectItem value="activo">Muy Activo</SelectItem>
                        <SelectItem value="atleta">Atleta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tiempo disponible */}
                  <div className="space-y-2">
                    <Label className="text-white">Tiempo Disponible Diario</Label>
                    <Select
                      value={profileData.tiempoDisponible}
                      onValueChange={(value) => setProfileData({...profileData, tiempoDisponible: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15min">15 minutos</SelectItem>
                        <SelectItem value="30min">30 minutos</SelectItem>
                        <SelectItem value="1hora">1 hora</SelectItem>
                        <SelectItem value="2horas">2+ horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: OBJETIVOS */}
            <TabsContent value="objetivos">
              <Card className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Mis Objetivos</CardTitle>
                  <p className="text-green-200">Define tus metas y aspiraciones</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Objetivo principal */}
                  <div className="space-y-2">
                    <Label className="text-white">Objetivo Principal</Label>
                    <Select
                      value={profileData.objetivoPrincipal}
                      onValueChange={(value) => setProfileData({...profileData, objetivoPrincipal: value})}
                    >
                      <SelectTrigger className="bg-green-900/30 border-green-500/30 text-white">
                        <SelectValue placeholder="Selecciona tu objetivo principal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perderpeso">Perder Peso</SelectItem>
                        <SelectItem value="ganarmusculo">Ganar Músculo</SelectItem>
                        <SelectItem value="mejorarsalud">Mejorar Salud General</SelectItem>
                        <SelectItem value="reducirstress">Reducir Estrés</SelectItem>
                        <SelectItem value="mejorarsueño">Mejorar Calidad del Sueño</SelectItem>
                        <SelectItem value="productividad">Aumentar Productividad</SelectItem>
                        <SelectItem value="habitos">Desarrollar Buenos Hábitos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Metas a corto plazo */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Metas a Corto Plazo (30 días)</Label>
                      <Button
                        size="sm"
                        onClick={() => setShowGoalInput({...showGoalInput, corto: true})}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showGoalInput.corto && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-2"
                        >
                          <Input
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            placeholder="Nueva meta..."
                            className="bg-green-900/30 border-green-500/30 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && addGoal('corto')}
                          />
                          <Button
                            size="sm"
                            onClick={() => addGoal('corto')}
                            className="bg-green-600"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowGoalInput({...showGoalInput, corto: false})}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      {profileData.metasCorto.map((meta, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30"
                        >
                          <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-green-400" />
                            <span className="text-white">{meta}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeGoal('corto', index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metas a largo plazo */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Metas a Largo Plazo (6 meses)</Label>
                      <Button
                        size="sm"
                        onClick={() => setShowGoalInput({...showGoalInput, largo: true})}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showGoalInput.largo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-2"
                        >
                          <Input
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            placeholder="Nueva meta..."
                            className="bg-green-900/30 border-green-500/30 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && addGoal('largo')}
                          />
                          <Button
                            size="sm"
                            onClick={() => addGoal('largo')}
                            className="bg-green-600"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowGoalInput({...showGoalInput, largo: false})}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      {profileData.metasLargo.map((meta, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30"
                        >
                          <div className="flex items-center gap-3">
                            <Mountain className="w-5 h-5 text-green-400" />
                            <span className="text-white">{meta}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeGoal('largo', index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Motivación */}
                  <div className="space-y-2">
                    <Label className="text-white">¿Qué te motiva?</Label>
                    <Textarea
                      value={profileData.motivacion}
                      onChange={(e) => setProfileData({...profileData, motivacion: e.target.value})}
                      className="bg-green-900/30 border-green-500/30 text-white min-h-[100px]"
                      placeholder="Describe qué te impulsa a mejorar cada día..."
                    />
                  </div>

                  {/* Botón guardar */}
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Objetivos
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: INTERESES */}
            <TabsContent value="intereses">
              <Card className="bg-gradient-to-br from-orange-800/30 to-red-800/30 backdrop-blur border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Mis Intereses</CardTitle>
                  <p className="text-orange-200">Selecciona las actividades que más te gustan</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {interesesOpciones.map((interes) => (
                      <motion.div
                        key={interes.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleInteres(interes.value)}
                        className={`
                          relative cursor-pointer p-4 rounded-xl transition-all
                          ${profileData.intereses.includes(interes.value)
                            ? 'bg-gradient-to-br ' + interes.color + ' shadow-lg'
                            : 'bg-orange-900/30 hover:bg-orange-900/40 border border-orange-500/30'
                          }
                        `}
                      >
                        <div className="text-center">
                          <span className="text-4xl mb-2 block">{interes.icon}</span>
                          <p className="text-white font-semibold">{interes.label}</p>
                        </div>
                        {profileData.intereses.includes(interes.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Estilo de vida */}
                  <div className="space-y-4">
                    <Label className="text-white">Estilo de Vida</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { value: 'activo', label: 'Activo', icon: <Activity className="w-4 h-4" /> },
                        { value: 'social', label: 'Social', icon: <Users className="w-4 h-4" /> },
                        { value: 'creativo', label: 'Creativo', icon: <Palette className="w-4 h-4" /> },
                        { value: 'intelectual', label: 'Intelectual', icon: <Brain className="w-4 h-4" /> },
                        { value: 'relajado', label: 'Relajado', icon: <Coffee className="w-4 h-4" /> },
                        { value: 'aventurero', label: 'Aventurero', icon: <Mountain className="w-4 h-4" /> }
                      ].map(estilo => (
                        <Button
                          key={estilo.value}
                          variant={profileData.estiloVida === estilo.value ? "default" : "outline"}
                          onClick={() => setProfileData({...profileData, estiloVida: estilo.value})}
                          className={profileData.estiloVida === estilo.value 
                            ? "bg-gradient-to-r from-orange-600 to-red-600" 
                            : "border-orange-500/30 text-orange-200 hover:bg-orange-900/30"
                          }
                        >
                          {estilo.icon}
                          {estilo.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Logros deseados */}
                  <div className="space-y-4 mt-6">
                    <Label className="text-white">Logros que quiero alcanzar</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { value: 'marathon', label: 'Correr un maratón', icon: '🏃' },
                        { value: 'meditation100', label: '100 días de meditación', icon: '🧘' },
                        { value: 'book52', label: 'Leer 52 libros al año', icon: '📚' },
                        { value: 'weightloss', label: 'Alcanzar mi peso ideal', icon: '⚖️' },
                        { value: 'muscle', label: 'Ganar masa muscular', icon: '💪' },
                        { value: 'sleep', label: 'Dormir 8 horas diarias', icon: '😴' }
                      ].map(logro => (
                        <motion.div
                          key={logro.value}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => {
                            const newLogros = profileData.logrosDeseados.includes(logro.value)
                              ? profileData.logrosDeseados.filter(l => l !== logro.value)
                              : [...profileData.logrosDeseados, logro.value];
                            setProfileData({...profileData, logrosDeseados: newLogros});
                          }}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                            ${profileData.logrosDeseados.includes(logro.value)
                              ? 'bg-gradient-to-r from-orange-600 to-red-600'
                              : 'bg-orange-900/30 hover:bg-orange-900/40 border border-orange-500/30'
                            }
                          `}
                        >
                          <span className="text-2xl">{logro.icon}</span>
                          <span className="text-white">{logro.label}</span>
                          {profileData.logrosDeseados.includes(logro.value) && (
                            <Check className="w-5 h-5 text-white ml-auto" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Botón guardar */}
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Intereses
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

export default ProfilePage;