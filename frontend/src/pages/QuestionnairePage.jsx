import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import {
  ArrowLeft, ArrowRight, Trophy, Sparkles,
  Heart, Brain, Zap, Activity, Coffee, Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const QuestionnairePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const autoAdvanceRef = useRef(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateQuestionnaireStatus } = useAuth();

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
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
      question: '¿Cómo llegas hoy?',
      subtitle: 'Tu estado de ánimo define el punto de partida de tu aventura',
      type: 'emoji',
      pandaMood: 'curious',
      gradient: 'from-yellow-500 to-orange-500',
      options: [
        {
          value: 5,
          emoji: '🔥',
          label: 'Súper motivado',
          subtitle: 'Listo para comerme el mundo',
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          selectedBorder: 'border-green-400'
        },
        {
          value: 3,
          emoji: '😌',
          label: 'Tranquilo',
          subtitle: 'Aquí estoy, vamos paso a paso',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20',
          selectedBorder: 'border-yellow-400'
        },
        {
          value: 1,
          emoji: '😮‍💨',
          label: 'Necesito ayuda',
          subtitle: 'Quiero orden y disciplina paso a paso',
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          selectedBorder: 'border-red-400'
        }
      ]
    },
    {
      id: 'main_goal',
      question: '¿Qué aventura te emociona más?',
      subtitle: 'Elige tu camino principal — personalizaremos cada misión a tu objetivo',
      type: 'single',
      pandaMood: 'excited',
      gradient: 'from-purple-500 to-pink-500',
      options: [
        {
          value: 'physical_wellness',
          label: 'Conquistar mi Bienestar Físico',
          icon: <Heart className="w-6 h-6" />,
          description: 'Ejercicio, nutrición y energía diaria',
          color: 'from-red-500 to-pink-500'
        },
        {
          value: 'mental_wellness',
          label: 'Dominar mi Mente',
          icon: <Brain className="w-6 h-6" />,
          description: 'Meditación, focus y claridad mental',
          color: 'from-purple-500 to-indigo-500'
        },
        {
          value: 'productivity',
          label: 'Maximizar mi Productividad',
          icon: <Zap className="w-6 h-6" />,
          description: 'Hábitos, rutinas y metas claras',
          color: 'from-yellow-500 to-orange-500'
        }
      ]
    },
    {
      id: 'challenges',
      question: '¿Qué monstruos quieres derrotar?',
      subtitle: 'Selecciona todos los que apliquen — cuantos más elijas, más relevantes serán tus misiones',
      type: 'multiple',
      pandaMood: 'determined',
      gradient: 'from-blue-500 to-cyan-500',
      options: [
        { value: 'procrastination', label: 'Procrastinación', icon: '⏰', description: 'El ladrón silencioso del tiempo' },
        { value: 'social_media', label: 'Redes Sociales', icon: '📱', description: 'La trampa del scroll infinito' },
        { value: 'low_energy', label: 'Baja Energía', icon: '🔋', description: 'El drenador de poder' },
        { value: 'stress', label: 'Estrés', icon: '😰', description: 'El peso que carga el cuerpo y la mente' },
        { value: 'planning', label: 'Desorganización', icon: '📋', description: 'El caos que frena el progreso' }
      ]
    },
    {
      id: 'activity_level',
      question: '¿Cuál es tu nivel de poder actual?',
      subtitle: 'Tu actividad física determina las misiones iniciales y el XP de arranque',
      type: 'single',
      pandaMood: 'athletic',
      gradient: 'from-green-500 to-emerald-500',
      options: [
        {
          value: 'sedentary',
          label: 'Nivel 1: Principiante',
          icon: <Coffee className="w-6 h-6" />,
          description: 'Poco o ningún ejercicio',
          xp: '+0 XP',
          color: 'from-gray-500 to-slate-500'
        },
        {
          value: 'lightly_active',
          label: 'Nivel 2: Aprendiz',
          icon: <Sun className="w-6 h-6" />,
          description: '1-2 días de ejercicio por semana',
          xp: '+100 XP',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          value: 'active',
          label: 'Nivel 3: Guerrero',
          icon: <Activity className="w-6 h-6" />,
          description: '3-5 días de ejercicio por semana',
          xp: '+300 XP',
          color: 'from-green-500 to-emerald-500'
        },
        {
          value: 'very_active',
          label: 'Nivel 4: Maestro',
          icon: <Trophy className="w-6 h-6" />,
          description: '6-7 días de ejercicio por semana',
          xp: '+500 XP',
          color: 'from-yellow-500 to-orange-500'
        }
      ]
    },
    {
      id: 'nutrition_rating',
      question: '¿Cómo está tu barra de salud?',
      subtitle: 'Tu alimentación es tu combustible — sé honesto para obtener las misiones correctas',
      type: 'nutrition',
      pandaMood: 'happy',
      gradient: 'from-orange-500 to-red-500',
      options: [
        {
          value: 'needs_work',
          label: 'Necesita mejorar',
          icon: '🍔',
          description: 'Muchas comidas rápidas y procesadas',
          bar: '25%',
          barColor: 'bg-red-500'
        },
        {
          value: 'inconsistent',
          label: 'Inconsistente',
          icon: '🥗',
          description: 'Depende del día y el estado de ánimo',
          bar: '50%',
          barColor: 'bg-yellow-500'
        },
        {
          value: 'good',
          label: 'Bastante buena',
          icon: '🥑',
          description: 'Balanceada la mayoría del tiempo',
          bar: '75%',
          barColor: 'bg-blue-500'
        },
        {
          value: 'excellent',
          label: 'Excelente',
          icon: '🌟',
          description: 'Consistente, planificada y nutritiva',
          bar: '100%',
          barColor: 'bg-green-500'
        }
      ]
    },
    {
      id: 'interests',
      question: '¿Cuáles son tus intereses y habilidades?',
      subtitle: 'Elige todos los que apliquen — personalizaremos tus misiones con lo que te apasiona',
      type: 'multiple',
      pandaMood: 'cool',
      gradient: 'from-indigo-500 to-purple-500',
      options: [
        { value: 'software', label: 'Desarrollo de Software', icon: '💻', description: 'Programación, tecnología y sistemas' },
        { value: 'music', label: 'Música / Instrumentos', icon: '🎵', description: 'Tocar, crear o apreciar música' },
        { value: 'languages', label: 'Idiomas', icon: '🌍', description: 'Aprender nuevas lenguas y culturas' },
        { value: 'reading', label: 'Lectura', icon: '📚', description: 'Libros, artículos y conocimiento' },
        { value: 'fitness', label: 'Fitness / Salud', icon: '🏋️', description: 'Ejercicio, nutrición y bienestar físico' },
        { value: 'finance', label: 'Finanzas Personales', icon: '💰', description: 'Ahorro, inversiones y libertad financiera' }
      ]
    }
  ];

  // Auto-avance para preguntas de selección única (emoji, single, nutrition)
  const handleSingleAnswer = (questionId, value) => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);

    setAnswers(prev => ({ ...prev, [questionId]: value }));

    autoAdvanceRef.current = setTimeout(() => {
      setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
    }, 300);
  };

  // Toggle de checkbox para preguntas de selección múltiple
  const handleMultiAnswerChange = (questionId, value, checked) => {
    const current = answers[questionId] || [];
    const updated = checked
      ? [...current, value]
      : current.filter(v => v !== value);
    setAnswers(prev => ({ ...prev, [questionId]: updated }));
  };

  // Botón "Continuar/Comenzar Aventura" — solo para preguntas múltiples
  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    const answer = answers[currentQ.id];

    if (currentQ.id === 'challenges' && (!answer || answer.length === 0)) {
      toast({
        title: '¡Un momento!',
        description: 'Selecciona al menos un desafío para personalizar tu aventura 🐼'
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.post('/questionnaire/submit', {
        ...answers,
        completedAt: new Date().toISOString()
      });

      updateQuestionnaireStatus(true);

      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      storedUser.questionnaire_completed = true;
      localStorage.setItem('user', JSON.stringify(storedUser));

      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#9333EA', '#EC4899', '#10B981', '#F59E0B']
      });

      toast({ title: '¡Perfecto! 🎉', description: 'Tu aventura personalizada está lista' });

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error('❌ Error guardando cuestionario:', error);
      toast({
        title: 'Error de conexión',
        description: error.response?.data?.message || 'No se pudo guardar. Intenta de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isMultiple = currentQ.type === 'multiple';

  return (
    <>
      <Helmet>
        <title>Personaliza tu Aventura - ConnectONE</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">

        {floatingElements.map(el => (
          <motion.div
            key={el.id}
            className="absolute text-2xl opacity-20 pointer-events-none"
            initial={{ x: `${el.x}%`, y: `${el.y}%` }}
            animate={{
              x: [`${el.x}%`, `${(el.x + 20) % 100}%`],
              y: [`${el.y}%`, `${(el.y - 20 + 100) % 100}%`]
            }}
            transition={{ duration: el.duration, delay: el.delay, repeat: Infinity, ease: 'linear' }}
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
                transition={{ type: 'spring' }}
              >
                <EnergikoPanda mood={currentQ.pandaMood} size="medium" className="mx-auto mb-4" />
              </motion.div>

              <CardTitle className="text-3xl font-bold text-white">
                Personalización Épica
              </CardTitle>
              <p className="text-purple-200">
                Paso {currentQuestion + 1} de {questions.length}
              </p>

              {/* Barra de progreso */}
              <div className="relative w-full h-3 bg-purple-900/50 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentQ.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, type: 'spring' }}
                />
                <motion.div
                  className="absolute top-0 left-0 right-0 h-full bg-white opacity-20"
                  animate={{ x: [-300, 300] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-[350px]"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">
                    {currentQ.question}
                  </h3>
                  <p className="text-purple-300 text-center mb-8 text-sm">
                    {currentQ.subtitle}
                  </p>

                  {/* ── EMOJI (sentimiento) ── */}
                  {currentQ.type === 'emoji' && (
                    <div className="flex flex-col sm:flex-row justify-around items-stretch gap-4">
                      {currentQ.options.map((option, index) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSingleAnswer(currentQ.id, option.value)}
                          className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl cursor-pointer transition-all border-2
                            ${answers[currentQ.id] === option.value
                              ? `${option.bg} ${option.selectedBorder} shadow-lg`
                              : 'bg-purple-900/30 border-transparent hover:border-purple-500/50 hover:bg-purple-800/30'}`}
                        >
                          <span className="text-6xl leading-none">{option.emoji}</span>
                          <span className={`font-bold text-lg ${option.color}`}>{option.label}</span>
                          <span className="text-purple-300/80 text-sm text-center leading-tight">
                            {option.subtitle}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* ── SINGLE (objetivo, nivel actividad) ── */}
                  {currentQ.type === 'single' && (
                    <RadioGroup
                      value={answers[currentQ.id] || ''}
                      onValueChange={(value) => handleSingleAnswer(currentQ.id, value)}
                      className="space-y-3"
                    >
                      {currentQ.options.map((option, index) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          <Label
                            htmlFor={option.value}
                            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2
                              ${answers[currentQ.id] === option.value
                                ? 'bg-purple-600/30 border-purple-400 shadow-lg scale-[1.02]'
                                : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="border-purple-400 text-purple-400"
                            />
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color || 'from-purple-500 to-pink-500'} text-white shrink-0`}>
                              {option.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-white font-bold">{option.label}</span>
                                {option.xp && (
                                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full shrink-0">
                                    {option.xp}
                                  </span>
                                )}
                              </div>
                              {option.description && (
                                <span className="text-purple-300 text-sm">{option.description}</span>
                              )}
                            </div>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* ── NUTRITION (barras de progreso) ── */}
                  {currentQ.type === 'nutrition' && (
                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          onClick={() => handleSingleAnswer(currentQ.id, option.value)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border-2
                            ${answers[currentQ.id] === option.value
                              ? 'bg-purple-600/30 border-purple-400 shadow-lg'
                              : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div>
                                <span className="text-white font-bold block">{option.label}</span>
                                <span className="text-purple-300 text-xs">{option.description}</span>
                              </div>
                            </div>
                            <span className="text-purple-200 text-sm font-mono">{option.bar}</span>
                          </div>
                          <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden mt-2">
                            <motion.div
                              className={`h-full rounded-full ${option.barColor}`}
                              initial={{ width: 0 }}
                              animate={{ width: option.bar }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* ── MULTIPLE (desafíos, intereses) ── */}
                  {currentQ.type === 'multiple' && (
                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.07 }}
                        >
                          <Label
                            htmlFor={`multi-${option.value}`}
                            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2
                              ${(answers[currentQ.id] || []).includes(option.value)
                                ? 'bg-purple-600/30 border-purple-400 shadow-lg'
                                : 'bg-purple-900/30 border-transparent hover:border-purple-500/50'}`}
                          >
                            <Checkbox
                              id={`multi-${option.value}`}
                              checked={(answers[currentQ.id] || []).includes(option.value)}
                              onCheckedChange={(checked) =>
                                handleMultiAnswerChange(currentQ.id, option.value, checked)
                              }
                              className="border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-400 shrink-0"
                            />
                            <span className="text-2xl shrink-0">{option.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-bold block">{option.label}</span>
                              {option.description && (
                                <span className="text-purple-300 text-sm">{option.description}</span>
                              )}
                            </div>
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── NAVEGACIÓN ── */}
              <div className="flex justify-between items-center mt-8">
                {/* Botón Anterior */}
                {currentQuestion > 0 ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="border-purple-500/50 text-white hover:bg-purple-800/30"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>
                  </motion.div>
                ) : (
                  <div />
                )}

                {/* Indicadores de paso */}
                <div className="flex gap-1">
                  {questions.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300
                        ${index === currentQuestion
                          ? 'bg-purple-400 w-8'
                          : index < currentQuestion
                            ? 'bg-purple-600 w-2'
                            : 'bg-purple-800 w-2'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    />
                  ))}
                </div>

                {/* Botón Continuar — solo para preguntas múltiples */}
                {isMultiple ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleNext}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Guardando...
                        </div>
                      ) : currentQuestion === questions.length - 1 ? (
                        <>
                          Comenzar Aventura
                          <Trophy className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <p className="text-purple-400/60 text-sm">Toca para continuar</p>
                )}
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="text-center mt-4 text-purple-200/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Personalización en progreso
            <Sparkles className="w-4 h-4 inline ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default QuestionnairePage;
