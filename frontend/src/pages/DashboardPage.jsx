import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, Target, Flame, Clock, Calendar, TrendingUp, 
  Activity, Brain, Heart, Users, ChevronRight, Star,
  Zap, Award, CheckCircle2
} from 'lucide-react';
import EnergikoPanda from '@/components/EnergikoPanda';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import IntermittentFastingWidget from '@/components/dashboard/IntermittentFastingWidget';
import FocusModeWidget from '@/components/dashboard/FocusModeWidget';
import DailyMissions from '@/components/missions/DailyMissions';
import ProgressWidget from '@/components/dashboard/ProgressWidget';
import Confetti from 'react-confetti';

const DashboardPage = () => {
  const { profile, stats, loading, customization, refreshData } = useData();
  const { toast } = useToast();
  const { user } = useAuth();
  const [celebrating, setCelebrating] = useState(false);
  const [pandaJump, setPandaJump] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const prevLevelRef = useRef(stats?.level);

  // Estado para estadísticas en tiempo real
  const [todayStats, setTodayStats] = useState({
    missionsCompleted: 0,
    minutesActive: 0,
    caloriesBurned: 0,
    focusTime: 0
  });

  useEffect(() => {
    if (stats && prevLevelRef.current && stats.level > prevLevelRef.current) {
      setCelebrating(true);
      setPandaJump(true);
      toast({
        title: "🎉 ¡Subiste de Nivel!",
        description: `Has alcanzado el nivel ${stats.level}. ¡Nuevas recompensas desbloqueadas!`,
        duration: 5000,
      });
      setTimeout(() => setCelebrating(false), 6000);
      setTimeout(() => setPandaJump(false), 800);
    }
    prevLevelRef.current = stats?.level;
  }, [stats, toast]);

  // Calcular progreso semanal
  useEffect(() => {
    // Simulación - conectar con backend real
    const progress = Math.min((todayStats.missionsCompleted / 5) * 100, 100);
    setWeeklyProgress(progress);
  }, [todayStats]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = profile?.full_name?.split(' ')[0] || 'Explorador';
    
    if (hour < 5) return `¡Descansa bien, ${name}!`;
    if (hour < 12) return `¡Buenos días, ${name}!`;
    if (hour < 18) return `¡Buenas tardes, ${name}!`;
    if (hour < 22) return `¡Buenas noches, ${name}!`;
    return `¡Es tarde, ${name}!`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Cada paso cuenta en tu viaje",
      "Tu consistencia está dando frutos",
      "Enérgiko está orgulloso de ti",
      "¡Sigue construyendo mejores hábitos!",
      "Tu bienestar es la prioridad"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <EnergikoPanda pandaType="logo" size="large" />
          <p className="mt-4 text-muted-foreground">Cargando tu espacio...</p>
        </div>
      </div>
    );
  }

  // Quick Stats Cards
  const QuickStatCard = ({ icon: Icon, label, value, trend, color }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - ConnectONE</title>
        <meta name="description" content="Tu centro de comando personal para el bienestar" />
      </Helmet>
      
      {celebrating && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header mejorado */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className={pandaJump ? 'animate-bounce' : ''}
                whileHover={{ scale: 1.1 }}
              >
                <EnergikoPanda 
                  pandaType="dashboard" 
                  size="large" 
                  equippedItems={customization?.items} 
                />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {getGreeting()}
                </h1>
                <p className="text-muted-foreground mt-1">{getMotivationalMessage()}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-sm">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Racha: {stats?.streak || 0} días
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Nivel {stats?.level || 1}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    {stats?.achievements_unlocked || 0} logros
                  </span>
                </div>
              </div>
            </div>
            
            {/* Acciones rápidas */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
                <Award className="w-4 h-4 mr-2" />
                Mi Perfil
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Zap className="w-4 h-4 mr-2" />
                Misión Rápida
              </Button>
            </div>
          </div>
          
          {/* Barra de progreso del día */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso del día</span>
              <span>{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard 
            icon={CheckCircle2} 
            label="Misiones Hoy" 
            value={`${todayStats.missionsCompleted}/5`}
            trend="+20% vs ayer"
            color="bg-green-500"
          />
          <QuickStatCard 
            icon={Activity} 
            label="Minutos Activos" 
            value={todayStats.minutesActive}
            color="bg-blue-500"
          />
          <QuickStatCard 
            icon={Brain} 
            label="Tiempo Focus" 
            value={`${todayStats.focusTime}m`}
            color="bg-purple-500"
          />
          <QuickStatCard 
            icon={Heart} 
            label="Bienestar" 
            value="85%"
            trend="+5%"
            color="bg-red-500"
          />
        </div>

        {/* Contenido principal con tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="missions">Misiones</TabsTrigger>
            <TabsTrigger value="tools">Herramientas</TabsTrigger>
            <TabsTrigger value="progress">Progreso</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <DailyMissions onMissionComplete={(xp) => {
                  setTodayStats(prev => ({
                    ...prev,
                    missionsCompleted: prev.missionsCompleted + 1
                  }));
                }} />
                
                {/* Actividad reciente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">Meditación completada</p>
                            <p className="text-sm text-muted-foreground">Hace {i * 30} minutos</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-green-500">+50 XP</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <ProgressWidget stats={stats} />
                
                {/* Sugerencias personalizadas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Recomendado para ti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Establecer meta semanal
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Unirse a un reto grupal
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planificar rutina matutina
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <DailyMissions detailed={true} />
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <FocusModeWidget onSessionComplete={(minutes) => {
                setTodayStats(prev => ({
                  ...prev,
                  focusTime: prev.focusTime + minutes
                }));
              }} />
              <IntermittentFastingWidget />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressWidget stats={stats} detailed={true} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardPage;