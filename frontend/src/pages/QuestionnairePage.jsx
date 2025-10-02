import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Heart, Brain, Zap, 
  Smile, Meh, Frown, Sparkles, Trophy, Target, Star,
  Activity, Coffee, Moon, Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';

const QuestionnairePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Partículas flotantes
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  const questions = [
    {
      id: 'feeling',
      question: '¿Cómo te sientes hoy?',
      subtitle: 'Sé honesto, Energiko está aquí para apoyarte',
      type: 'emoji',
      pandaMood: 'curious',
      gradient: 'from-yellow-500 to-orange-500',
      options: [
        { 
          value: 5, 
          icon: <Smile className="w-16 h-16" />, 
          label: '¡Genial!',
          color: 'text-green-400',
          bg: 'bg-green-500/20'
        },
        { 
          value: 3, 
          icon: <Meh className="w-16 h-16" />, 
          label: 'Regular',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20'
        },
        { 
          value: 1, 
          icon: <Frown className="w-16 h-16" />, 
          label: 'Mal día',
          color: 'text-red-400',
          bg: 'bg-red-500/20'
        }
      ]
    },
    {
      id: 'main_goal',
      question: '¿Qué aventura te emociona más?',
      subtitle: 'Elige tu camino principal en ConnectONE',
      type: 'single',
      pandaMood: 'excited',
      gradient: 'from-purple-500 to-pink-500',
      options: [
        { 
          value: 'physical_wellness', 
          label: 'Conquistar mi Bienestar Físico', 
          icon: <Heart className="w-6 h-6" />,
          description: 'Ejercicio, nutrición y energía',
          color: 'from-red-500 to-pink-500'
        },
        { 
          value: 'mental_wellness', 
          label: 'Dominar mi Mente', 
          icon: <Brain className="w-6 h-6" />,
          description: 'Meditación, focus y claridad',
          color: 'from-purple-500 to-indigo-500'
        },
        { 
          value: 'productivity', 
          label: 'Maximizar mi Productividad', 
          icon: <Zap className="w-6 h-6" />,
          description: 'Hábitos, rutinas y metas',
          color: 'from-yellow-500 to-orange-500'
        }
      ]
    },
    {
      id: 'challenges',
      question: '¿Qué monstruos quieres derrotar?',
      subtitle: 'Selecciona todos tus enemigos actuales',
      type: 'multiple',
      pandaMood: 'determined',
      gradient: 'from-blue-500 to-cyan-500',
      options: [
        { 
          value: 'procrastination', 
          label: 'Procrastinación',
          icon: '⏰',
          description: 'El ladrón del tiempo'
        },
        { 
          value: 'social_media', 
          label: 'Redes Sociales',
          icon: '📱',
          description: 'La trampa infinita'
        },
        { 
          value: 'low_energy', 
          label: 'Baja Energía',
          icon: '🔋',
          description: 'El drenador de poder'
        },
        { 
          value: 'stress', 
          label: 'Estrés',
          icon: '😰',
          description: 'El peso invisible'
        },
        { 
          value: 'planning', 
          label: 'Desorganización',
          icon: '📋',
          description: 'El caos mental'
        }
      ]
    },
    {
      id: 'activity_level',
      question: '¿Cuál es tu nivel de poder actual?',
      subtitle: 'Tu actividad física determina tu energía base',
      type: 'single',
      pandaMood: 'athletic',
      gradient: 'from-green-500 to-emerald-500',
      options: [
        { 
          value: 'sedentary', 
          label: 'Nivel 1: Principiante',
          icon: <Coffee className="w-6 h-6" />,
          description: 'Poco o ningún ejercicio',
          xp: '0 XP'
        },
        { 
          value: 'lightly_active', 
          label: 'Nivel 2: Aprendiz',
          icon: <Sun className="w-6 h-6" />,
          description: '1-2 días por semana',
          xp: '100 XP'
        },
        { 
          value: 'active', 
          label: 'Nivel 3: Guerrero',
          icon: <Activity className="w-6 h-6" />,
          description: '3-5 días por semana',
          xp: '300 XP'
        },
        { 
          value: 'very_active', 
          label: 'Nivel 4: Maestro',
          icon: <Trophy className="w-6 h-6" />,
          description: '6-7 días por semana',
          xp: '500 XP'
        }
      ]
    },
    {
      id: 'nutrition_rating',
      question: '¿Cómo está tu barra de salud?',
      subtitle: 'Tu alimentación es tu combustible',
      type: 'single',
      pandaMood: 'happy',
      gradient: 'from-orange-500 to-red-500',
      options: [
        { 
          value: 'needs_work', 
          label: 'Necesita mejorar',
          icon: '🍔',
          bar: '25%',
          color: 'bg-red-500'
        },
        { 
          value: 'inconsistent', 
          label: 'Inconsistente',
          icon: '🥗',
          bar: '50%',
          color: 'bg-yellow-500'
        },
        { 
          value: 'good', 
          label: 'Bastante buena',
          icon: '🥑',
          bar: '75%',
          color: 'bg-blue-500'
        },
        { 
          value: 'excellent', 
          label: 'Excelente',
          icon: '🌟',
          bar: '100%',
          color: 'bg-green-500'
        }
      ]
    },
    {
      id: 'advanced_options',
      question: '¿Qué superpoderes quieres desbloquear?',
      subtitle: 'Técnicas avanzadas opcionales',
      type: 'multiple',
      pandaMood: 'cool',
      gradient: 'from-indigo-500 to-purple-500',
      options: [
        { 
          value: 'intermittent_fasting', 
          label: 'Ayuno Intermitente',
          icon: '⏱️',
          description: 'Control del tiempo de comida',
          badge: 'PRO'
        },
        { 
          value: 'carb_cycling', 
          label: 'Ciclado de Carbohidratos',
          icon: '🔄',
          description: 'Optimización metabólica',
          badge: 'ADVANCED'
        },
        { 
          value: 'pomodoro', 
          label: 'Técnica Pomodoro',
          icon: '🍅',
          description: 'Máximo enfoque mental',
          badge: 'FOCUS'
        }
      ]
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleMultiAnswerChange = (questionId, value, checked) => {
    const currentAnswers = answers[questionId] || [];
    let newAnswers;
    if (checked) {
      newAnswers = [...currentAnswers, value];
    } else {
      newAnswers = currentAnswers.filter(item => item !== value);
    }
    setAnswers(prev => ({
      ...prev,
      [questionId]: newAnswers
    }));
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    const answer = answers[currentQ.id];
    
    if (currentQ.id !== 'advanced_options' && 
        ((currentQ.type !== 'multiple' && !answer) || 
         (currentQ.type === 'multiple' && (!answer || answer.length === 0)))) {
      toast({
        title: "¡Espera!",
        description: "Necesito esta respuesta para personalizar tu experiencia 🐼",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const profileData = {
        questionnaire_completed: true,
        ...answers,
        completedAt: new Date().toISOString()
      };
      
      // Guardar en localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.id) {
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
      } else {
        localStorage.setItem('profile_temp', JSON.stringify(profileData));
      }
      
      // Celebración
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "¡Perfecto! 🎉",
        description: "Tu aventura personalizada está lista"
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo salió mal. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <>
      <Helmet>
        <title>Personaliza tu Aventura - ConnectONE</title>
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
          className="relative z-10 w-full max-w-3xl"
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-purple-500/30">
            <CardHeader className="text-center pb-4">
              <motion.div
                key={currentQ.pandaMood}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring" }}
              >
                <EnergikoPanda mood={currentQ.pandaMood} size="medium" className="mx-auto mb-4" />
              </motion.div>
              
              <CardTitle className="text-3xl font-bold text-white">
                Personalización Épica
              </CardTitle>
              <p className="text-purple-200">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
              
              {/* Barra de progreso mejorada */}
              <div className="relative w-full h-3 bg-purple-900/50 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentQ.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, type: "spring" }}
                />
                <motion.div
                  className="absolute top-0 left-0 right-0 h-full bg-white opacity-30"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </CardHeader>

            <CardContent>
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[350px]"
              >
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {currentQ.question}
                </h3>
                <p className="text-purple-200 text-center mb-8">
                  {currentQ.subtitle}
                </p>

                {/* Opciones tipo emoji */}
                {currentQ.type === 'emoji' && (
                  <div className="flex justify-around items-center">
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswerChange(currentQ.id, option.value)}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl cursor-pointer transition-all
                          ${answers[currentQ.id] === option.value 
                            ? `${option.bg} border-2 border-purple-400 shadow-lg` 
                            : 'hover:bg-purple-800/30'}`}
                      >
                        <div className={option.color}>
                          {option.icon}
                        </div>
                        <span className="font-bold text-white text-lg">{option.label}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Opciones single con cards mejoradas */}
                {currentQ.type === 'single' && currentQ.id !== 'nutrition_rating' && (
                  <RadioGroup
                    value={answers[currentQ.id] || ''}
                    onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                    className="space-y-3"
                  >
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Label
                          htmlFor={option.value}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2
                            ${answers[currentQ.id] === option.value 
                              ? 'bg-purple-600/30 border-purple-400 shadow-lg scale-105' 
                              : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="border-purple-400 text-purple-400"
                          />
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color || 'from-purple-500 to-pink-500'}`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{option.label}</span>
                              {option.xp && (
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                                  {option.xp}
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <span className="text-purple-200 text-sm">{option.description}</span>
                            )}
                          </div>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                )}

                {/* Nutrición con barras visuales */}
                {currentQ.id === 'nutrition_rating' && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswerChange(currentQ.id, option.value)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border-2
                          ${answers[currentQ.id] === option.value 
                            ? 'bg-purple-600/30 border-purple-400 shadow-lg' 
                            : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <span className="text-white font-bold">{option.label}</span>
                          </div>
                          <span className="text-purple-200">{option.bar}</span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${option.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: option.bar }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Opciones múltiples con badges */}
                {currentQ.type === 'multiple' && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Label
                          htmlFor={option.value}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2
                            ${(answers[currentQ.id] || []).includes(option.value)
                              ? 'bg-purple-600/30 border-purple-400 shadow-lg' 
                              : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                        >
                          <Checkbox
                            id={option.value}
                            checked={(answers[currentQ.id] || []).includes(option.value)}
                            onCheckedChange={(checked) => handleMultiAnswerChange(currentQ.id, option.value, checked)}
                            className="border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-400"
                          />
                          {option.icon && (
                            <span className="text-2xl">{option.icon}</span>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{option.label}</span>
                              {option.badge && (
                                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                                  {option.badge}
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <span className="text-purple-200 text-sm">{option.description}</span>
                            )}
                          </div>
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Botones de navegación */}
              <div className="flex justify-between items-center mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="border-purple-500/50 text-white hover:bg-purple-800/30 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                </motion.div>

                <div className="flex gap-1">
                  {questions.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all
                        ${index === currentQuestion 
                          ? 'bg-purple-400 w-8' 
                          : index < currentQuestion 
                            ? 'bg-purple-600' 
                            : 'bg-purple-800'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    />
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                  >
                    {isLoading ? (
                      'Guardando...'
                    ) : currentQuestion === questions.length - 1 ? (
                      <>
                        Comenzar Aventura
                        <Trophy className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Indicador de paso actual */}
          <motion.div 
            className="text-center mt-4 text-purple-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Personalización en progreso
            <Sparkles className="w-4 h-4 inline ml-2" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default QuestionnairePage;