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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, Target, Heart, Brain, Dumbbell, Book, Music, Coffee,
  Edit3, Save, Plus, Trash2, ChevronLeft, ChevronRight,
  Trophy, Flame, Sparkles, X, Check, Zap, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const { stats, profile: savedProfile } = useData();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPanda, setSelectedPanda] = useState(1);
  const [newGoalText, setNewGoalText] = useState('');
  const [showGoalInput, setShowGoalInput] = useState({ corto: false, largo: false });
  
  // Conectar con datos del cuestionario
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
    motivacion: savedProfile?.motivacion || '',
    nivelActividad: savedProfile?.nivelActividad || 'moderado',
    valores: savedProfile?.valores || []
  });

  const level = stats?.level || 1;
  
  // Sistema de pandas con solo los primeros 4 disponibles inicialmente
const pandaVersions = [
    { level: 1, name: 'Iniciado Curioso', image: '/images/panda-profile.png', description: 'Comenzando el viaje', unlocked: true },
    { level: 2, name: 'Explorador Novato', image: '/images/panda-level-2.png', description: 'Primeros pasos', unlocked: true },
    { level: 3, name: 'Aprendiz Dedicado', image: '/images/panda-level-3.png', description: 'Construyendo hábitos', unlocked: true },
    { level: 4, name: 'Practicante Constante', image: '/images/panda-level-4.png', description: 'Disciplina en formación', unlocked: true },
    { level: 5, name: 'Guerrero del Hábito', image: '/images/panda-level-5.png', description: 'Superando obstáculos', unlocked: level >= 5 },
    { level: 6, name: 'Arquitecto del Cambio', image: '/images/panda-level-6.png', description: 'Diseñando tu futuro', unlocked: level >= 6 },
    { level: 7, name: 'Guardián del Bienestar', image: '/images/panda-level-7.png', description: 'Protegiendo progreso', unlocked: level >= 7 },
    { level: 8, name: 'Maestro en Formación', image: '/images/panda-level-13.png', description: 'Dominando las bases', unlocked: level >= 8 },
    { level: 10, name: 'Mentor Inspirador', image: '/images/panda-level-8.png', description: 'Guiando con ejemplo', unlocked: level >= 10 },
    { level: 12, name: 'Campeón Constante', image: '/images/panda-level-15.png', description: 'Perseverancia pura', unlocked: level >= 12 },
    { level: 14, name: 'Leyenda en Ascenso', image: '/images/panda-level-11.png', description: 'Cerca de la cima', unlocked: level >= 14 },
    { level: 16, name: 'Energiko Supremo', image: '/images/panda-level-16.png', description: 'Maestría total alcanzada', unlocked: level >= 16 }
  ];
  // Opciones conectadas al cuestionario
  const interesesOpciones = [
    { value: 'meditacion', label: 'Meditación', icon: '🧘' },
    { value: 'ejercicio', label: 'Ejercicio', icon: '💪' },
    { value: 'lectura', label: 'Lectura', icon: '📚' },
    { value: 'musica', label: 'Música', icon: '🎵' },
    { value: 'naturaleza', label: 'Naturaleza', icon: '🌿' },
    { value: 'cocina', label: 'Cocina', icon: '👨‍🍳' },
    { value: 'arte', label: 'Arte', icon: '🎨' },
    { value: 'viajes', label: 'Viajes', icon: '✈️' }
  ];

  const estilosVida = [
    { value: 'activo', label: 'Activo y Deportivo' },
    { value: 'tranquilo', label: 'Tranquilo y Reflexivo' },
    { value: 'social', label: 'Social y Extrovertido' },
    { value: 'creativo', label: 'Creativo y Artístico' },
    { value: 'equilibrado', label: 'Equilibrado' }
  ];

  const nivelesActividad = [
    { value: 'sedentario', label: 'Sedentario' },
    { value: 'ligero', label: 'Ligeramente activo' },
    { value: 'moderado', label: 'Moderadamente activo' },
    { value: 'activo', label: 'Muy activo' },
    { value: 'atletico', label: 'Atlético' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "¡Perfil actualizado!",
      description: "Tus cambios se han guardado correctamente"
    });
  };

  const handleAddGoal = (type) => {
    if (newGoalText.trim()) {
      setProfileData(prev => ({
        ...prev,
        [type === 'corto' ? 'metasCorto' : 'metasLargo']: [
          ...prev[type === 'corto' ? 'metasCorto' : 'metasLargo'], 
          newGoalText
        ]
      }));
      setNewGoalText('');
      setShowGoalInput({ ...showGoalInput, [type]: false });
    }
  };

  const handleRemoveGoal = (type, index) => {
    setProfileData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const availablePandas = pandaVersions.filter(p => p.unlocked);

  return (
    <>
      <Helmet>
        <title>Mi Perfil - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header Principal con Panda Grande */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-purple-800/40 to-indigo-800/40 backdrop-blur border-purple-500/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  
                  {/* Panda Extra Grande con Selector */}
                  <div className="w-full bg-gradient-to-b from-purple-900/50 to-transparent p-8">
                    <motion.div 
                      className="relative w-80 h-80 mx-auto"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Contenedor del Panda */}
                      <div className="w-full h-full rounded-3xl bg-gradient-to-br from-orange-500/30 to-red-500/30 p-3 shadow-2xl">
                        <div className="w-full h-full bg-gray-900/90 rounded-2xl overflow-hidden relative">
                          <motion.img 
                            key={selectedPanda}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            src={availablePandas[selectedPanda - 1]?.image || '/images/panda-profile.png'} 
                            alt="Tu Energiko" 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Overlay con información */}
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-white text-xl font-bold text-center mb-1">
                              {availablePandas[selectedPanda - 1]?.name}
                            </h3>
                            <p className="text-white/80 text-sm text-center">
                              {availablePandas[selectedPanda - 1]?.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Controles de selección flotantes */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg"
                        onClick={() => setSelectedPanda(Math.max(1, selectedPanda - 1))}
                        disabled={selectedPanda === 1}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg"
                        onClick={() => setSelectedPanda(Math.min(availablePandas.length, selectedPanda + 1))}
                        disabled={selectedPanda === availablePandas.length}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                    
                    {/* Selector visual de pandas */}
                    <div className="flex justify-center gap-2 mt-6">
                      {availablePandas.map((panda, index) => (
                        <motion.button
                          key={panda.level}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedPanda(index + 1)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            selectedPanda === index + 1 
                              ? 'bg-purple-400 w-8' 
                              : 'bg-purple-600/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Información del Usuario Centrada */}
                  <div className="text-center px-8 pb-8">
                    <motion.h1 
                      className="text-5xl font-bold text-white mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {profileData.nombre}
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl text-purple-200 italic max-w-2xl mx-auto mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      "{profileData.bio}"
                    </motion.p>
                    
                    {/* Stats Animados */}
                    <motion.div 
                      className="flex justify-center gap-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-2">
                          <Star className="w-8 h-8 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{level}</p>
                        <p className="text-sm text-purple-200">Nivel</p>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                          <Flame className="w-8 h-8 text-orange-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats?.streak || 1}</p>
                        <p className="text-sm text-purple-200">Racha</p>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                          <Trophy className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats?.achievements || 0}</p>
                        <p className="text-sm text-purple-200">Logros</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs Simplificados */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full bg-purple-800/30">
              <TabsTrigger value="personal">Información Personal</TabsTrigger>
              <TabsTrigger value="objetivos">Objetivos y Metas</TabsTrigger>
            </TabsList>

            {/* Tab: Información Personal + Estilo de Vida */}
            <TabsContent value="personal">
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Mi Información</CardTitle>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="text-white"
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
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      {/* Modo Edición */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-purple-200">Nombre</Label>
                          <Input 
                            value={profileData.nombre}
                            onChange={(e) => setProfileData({...profileData, nombre: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-purple-200">Edad</Label>
                          <Input 
                            type="number"
                            value={profileData.edad}
                            onChange={(e) => setProfileData({...profileData, edad: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-purple-200">Tiempo disponible al día</Label>
                          <Select 
                            value={profileData.tiempoDisponible}
                            onValueChange={(value) => setProfileData({...profileData, tiempoDisponible: value})}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15min">15-30 minutos</SelectItem>
                              <SelectItem value="30min">30-60 minutos</SelectItem>
                              <SelectItem value="1hora">1-2 horas</SelectItem>
                              <SelectItem value="2horas">Más de 2 horas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-purple-200">Nivel de Actividad</Label>
                          <Select 
                            value={profileData.nivelActividad}
                            onValueChange={(value) => setProfileData({...profileData, nivelActividad: value})}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {nivelesActividad.map(nivel => (
                                <SelectItem key={nivel.value} value={nivel.value}>
                                  {nivel.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-purple-200">Biografía</Label>
                        <Textarea 
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label className="text-purple-200">Estilo de Vida</Label>
                        <Select 
                          value={profileData.estiloVida}
                          onValueChange={(value) => setProfileData({...profileData, estiloVida: value})}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Selecciona tu estilo..." />
                          </SelectTrigger>
                          <SelectContent>
                            {estilosVida.map(estilo => (
                              <SelectItem key={estilo.value} value={estilo.value}>
                                {estilo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-purple-200">Intereses</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {interesesOpciones.map(interes => (
                            <motion.label 
                              key={interes.value}
                              whileHover={{ scale: 1.05 }}
                              className={`
                                flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all
                                ${profileData.intereses.includes(interes.value) 
                                  ? 'bg-purple-600/50 border-2 border-purple-400' 
                                  : 'bg-gray-800 border-2 border-gray-700'}
                              `}
                            >
                              <input 
                                type="checkbox"
                                className="sr-only"
                                checked={profileData.intereses.includes(interes.value)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setProfileData({...profileData, intereses: [...profileData.intereses, interes.value]});
                                  } else {
                                    setProfileData({...profileData, intereses: profileData.intereses.filter(i => i !== interes.value)});
                                  }
                                }}
                              />
                              <span className="text-2xl">{interes.icon}</span>
                              <span className="text-white text-sm">{interes.label}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Modo Visualización */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-purple-300 text-sm mb-1">Edad</p>
                          <p className="text-white text-lg">{profileData.edad || 'No especificada'}</p>
                        </div>
                        <div>
                          <p className="text-purple-300 text-sm mb-1">Tiempo disponible</p>
                          <p className="text-white text-lg">
                            {profileData.tiempoDisponible === '15min' && '15-30 minutos'}
                            {profileData.tiempoDisponible === '30min' && '30-60 minutos'}
                            {profileData.tiempoDisponible === '1hora' && '1-2 horas'}
                            {profileData.tiempoDisponible === '2horas' && 'Más de 2 horas'}
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-300 text-sm mb-1">Nivel de Actividad</p>
                          <p className="text-white text-lg">
                            {nivelesActividad.find(n => n.value === profileData.nivelActividad)?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-300 text-sm mb-1">Estilo de Vida</p>
                          <p className="text-white text-lg">
                            {estilosVida.find(e => e.value === profileData.estiloVida)?.label || 'No definido'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-purple-300 text-sm mb-3">Mis Intereses</p>
                        <div className="flex flex-wrap gap-2">
                          {profileData.intereses.length > 0 ? (
                            profileData.intereses.map(interes => {
                              const interesInfo = interesesOpciones.find(i => i.value === interes);
                              return (
                                <motion.div
                                  key={interes}
                                  whileHover={{ scale: 1.05 }}
                                  className="bg-purple-600/30 px-4 py-2 rounded-full flex items-center gap-2"
                                >
                                  <span className="text-xl">{interesInfo?.icon}</span>
                                  <span className="text-white">{interesInfo?.label}</span>
                                </motion.div>
                              );
                            })
                          ) : (
                            <p className="text-gray-400">Añade tus intereses en modo edición</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Objetivos y Metas */}
            <TabsContent value="objetivos">
              <Card className="bg-purple-800/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Mis Objetivos y Metas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-400" />
                      Objetivo Principal
                    </h3>
                    {isEditing ? (
                      <Input 
                        value={profileData.objetivoPrincipal}
                        onChange={(e) => setProfileData({...profileData, objetivoPrincipal: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="¿Cuál es tu objetivo principal?"
                      />
                    ) : (
                      <Card className="bg-purple-900/30">
                        <CardContent className="p-4">
                          <p className="text-white text-lg text-center">
                            {profileData.objetivoPrincipal || 'Define tu objetivo principal'}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Metas a Corto Plazo */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Metas a Corto Plazo
                      </h3>
                      <div className="space-y-2">
                        <AnimatePresence>
                          {profileData.metasCorto.map((meta, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center gap-2 bg-blue-600/30 p-3 rounded-lg"
                            >
                              <span className="flex-1 text-white">{meta}</span>
                              {isEditing && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveGoal('metasCorto', i)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {showGoalInput.corto ? (
                          <div className="flex gap-2">
                            <Input
                              value={newGoalText}
                              onChange={(e) => setNewGoalText(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white"
                              placeholder="Nueva meta..."
                              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('corto')}
                            />
                            <Button size="sm" onClick={() => handleAddGoal('corto')}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setShowGoalInput({ ...showGoalInput, corto: false });
                                setNewGoalText('');
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowGoalInput({ ...showGoalInput, corto: true })}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Añadir meta
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Metas a Largo Plazo */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Metas a Largo Plazo
                      </h3>
                      <div className="space-y-2">
                        <AnimatePresence>
                          {profileData.metasLargo.map((meta, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center gap-2 bg-green-600/30 p-3 rounded-lg"
                            >
                              <span className="flex-1 text-white">{meta}</span>
                              {isEditing && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveGoal('metasLargo', i)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {showGoalInput.largo ? (
                          <div className="flex gap-2">
                            <Input
                              value={newGoalText}
                              onChange={(e) => setNewGoalText(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white"
                              placeholder="Nueva meta..."
                              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal('largo')}
                            />
                            <Button size="sm" onClick={() => handleAddGoal('largo')}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setShowGoalInput({ ...showGoalInput, largo: false });
                                setNewGoalText('');
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowGoalInput({ ...showGoalInput, largo: true })}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Añadir meta
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
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