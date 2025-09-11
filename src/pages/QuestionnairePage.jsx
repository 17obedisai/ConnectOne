import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ArrowLeft, ArrowRight, CheckCircle, Heart, Brain, Zap, Smile, Meh, Frown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const QuestionnairePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const questions = [
    {
      id: 'feeling',
      question: 'Primero, lo más importante. ¿Cómo te sientes hoy?',
      type: 'emoji',
      options: [
        { value: 5, icon: <Smile className="w-10 h-10 text-green-400" />, label: 'Genial' },
        { value: 3, icon: <Meh className="w-10 h-10 text-yellow-400" />, label: 'Más o menos' },
        { value: 1, icon: <Frown className="w-10 h-10 text-red-400" />, label: 'No muy bien' }
      ]
    },
    {
      id: 'main_goal',
      question: '¿Qué ruta principal te gustaría explorar?',
      type: 'single',
      options: [
        { value: 'physical_wellness', label: 'Ruta Bienestar Físico', icon: <Heart className="w-5 h-5 mr-2" /> },
        { value: 'mental_wellness', label: 'Ruta Bienestar Mental', icon: <Brain className="w-5 h-5 mr-2" /> },
        { value: 'productivity', label: 'Ruta Productividad y Hábitos', icon: <Zap className="w-5 h-5 mr-2" /> }
      ]
    },
    {
      id: 'challenges',
      question: '¿Cuáles son tus mayores distracciones o bloqueos? (Puedes elegir varios)',
      type: 'multiple',
      options: [
        { value: 'procrastination', label: 'Procrastinación' },
        { value: 'social_media', label: 'Redes sociales' },
        { value: 'low_energy', label: 'Baja energía' },
        { value: 'stress', label: 'Estrés o ansiedad' },
        { value: 'planning', label: 'Falta de planificación' }
      ]
    },
    {
      id: 'activity_level',
      question: '¿Cuál es tu nivel de actividad física actual?',
      type: 'single',
      options: [
        { value: 'sedentary', label: 'Sedentario (poco o ningún ejercicio)' },
        { value: 'lightly_active', label: 'Ligero (1-2 días/semana)' },
        { value: 'active', label: 'Activo (3-5 días/semana)' },
        { value: 'very_active', label: 'Deportista (6-7 días/semana)' }
      ]
    },
    {
      id: 'nutrition_rating',
      question: '¿Cómo calificarías tu alimentación actual?',
      type: 'single',
      options: [
        { value: 'needs_work', label: 'Necesita mejorar bastante' },
        { value: 'inconsistent', label: 'A veces bien, a veces mal' },
        { value: 'good', label: 'Bastante buena y equilibrada' },
        { value: 'excellent', label: 'Excelente, muy consciente de lo que como' }
      ]
    },
    {
      id: 'advanced_options',
      question: '¿Te interesan estas técnicas avanzadas? (Opcional)',
      type: 'multiple',
      options: [
        { value: 'intermittent_fasting', label: 'Ayuno Intermitente' },
        { value: 'carb_cycling', label: 'Ciclado de Carbohidratos' },
        { value: 'pomodoro', label: 'Técnica Pomodoro para enfoque' }
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
    
    if (currentQ.id !== 'advanced_options' && ((currentQ.type !== 'multiple' && !answer) || (currentQ.type === 'multiple' && (!answer || answer.length === 0)))) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor selecciona una opción para que Enérgiko te conozca mejor.",
        variant: "destructive"
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
        ...answers
      };
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
      
      toast({
        title: "¡Cuestionario completado!",
        description: "Enérgiko ya está preparando tu experiencia personalizada."
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar tus respuestas. Intenta de nuevo.",
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
        <title>Cuestionario Inicial - ConnectONE</title>
        <meta name="description" content="Completa tu cuestionario inicial para que Enérgiko pueda personalizar tu experiencia en ConnectONE" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <Card className="glass-effect border-border">
            <CardHeader className="text-center pb-4">
              <EnergikoPanda mood="thoughtful" size="medium" className="mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                Conociéndote mejor
              </CardTitle>
              <p className="text-muted-foreground">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
              
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <motion.div
                  className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </CardHeader>

            <CardContent>
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-[250px]"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  {currentQ.question}
                </h3>

                {currentQ.type === 'single' && (
                  <RadioGroup
                    value={answers[currentQ.id] || ''}
                    onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                    className="space-y-3"
                  >
                    {currentQ.options.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={option.value}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${answers[currentQ.id] === option.value ? 'bg-primary/20 border-primary' : 'bg-muted border-transparent hover:border-primary/50'}`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="border-foreground/30 text-primary"
                        />
                        <span className="text-foreground flex-1 flex items-center">{option.icon}{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                
                {currentQ.type === 'multiple' && (
                   <div className="space-y-3">
                    {currentQ.options.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={option.value}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${(answers[currentQ.id] || []).includes(option.value) ? 'bg-primary/20 border-primary' : 'bg-muted border-transparent hover:border-primary/50'}`}
                      >
                        <Checkbox
                          id={option.value}
                          checked={(answers[currentQ.id] || []).includes(option.value)}
                          onCheckedChange={(checked) => handleMultiAnswerChange(currentQ.id, option.value, checked)}
                          className="border-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-foreground flex-1">{option.label}</span>
                      </Label>
                    ))}
                  </div>
                )}

                {currentQ.type === 'emoji' && (
                  <div className="flex justify-around items-center">
                    {currentQ.options.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswerChange(currentQ.id, option.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-all ${answers[currentQ.id] === option.value ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
                      >
                        {option.icon}
                        <span className="font-semibold text-foreground">{option.label}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="glass-effect text-foreground border-border hover:bg-primary/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold primary-glow"
                >
                  {isLoading ? (
                    'Guardando...'
                  ) : currentQuestion === questions.length - 1 ? (
                    <>
                      Finalizar
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default QuestionnairePage;