import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ArrowLeft, CheckCircle, Play, Pause, RotateCcw, Music, Volume2, VolumeX, Edit } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { activitiesData } from '@/lib/activities.jsx';
import { useAuth } from '@/contexts/AuthContext';
import { levelData } from '@/lib/levels';

const MissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { completedActivities, refreshData, stats } = useData();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const mission = activitiesData[id];

  const [timer, setTimer] = useState(mission?.tools?.timer ? mission.tools.timer : 0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('/assets/relaxing-music.mp3');

  useEffect(() => {
    setIsCompleted(completedActivities.some(actId => actId === id));
  }, [id, completedActivities]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(seconds => seconds - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      toast({ title: "¡Tiempo completado!", description: "¡Gran trabajo de enfoque!" });
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer, toast]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.src = currentTrack;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying, currentTrack]);

  if (!mission) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground">
        Misión no encontrada.
      </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCompleteMission = async () => {
    if (!user || isCompleted || isLoading) return;
    setIsLoading(true);

    try {
        const today = new Date().toISOString().slice(0, 10);
        
        let allActivities = JSON.parse(localStorage.getItem(`activities_${user.id}`)) || {};
        let todayActivities = allActivities[today] || [];
        if (!todayActivities.includes(id)) {
            todayActivities.push(id);
        }
        allActivities[today] = todayActivities;
        localStorage.setItem(`activities_${user.id}`, JSON.stringify(allActivities));
        
        let userStats = stats;
        userStats.xp += mission.xp;
        
        let levelUp = false;
        while (userStats.xp >= userStats.xp_to_next_level) {
          levelUp = true;
          userStats.level += 1;
          userStats.xp -= userStats.xp_to_next_level;
          const currentLevelInfo = levelData.find(l => l.level === userStats.level);
          const nextLevelInfo = levelData.find(l => l.level === userStats.level + 1);
          userStats.xp_to_next_level = nextLevelInfo ? nextLevelInfo.xpThreshold - currentLevelInfo.xpThreshold : userStats.xp_to_next_level;
        }

        const lastDate = userStats.last_activity_date;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (!lastDate || new Date(lastDate).toISOString().slice(0,10) < yesterday.toISOString().slice(0,10)) {
            userStats.streak = 1;
        } else if (new Date(lastDate).toISOString().slice(0,10) === yesterday.toISOString().slice(0,10)) {
            userStats.streak += 1;
        }
        userStats.last_activity_date = today;

        localStorage.setItem(`stats_${user.id}`, JSON.stringify(userStats));

        await refreshData();
        toast({
            title: "¡Misión completada!",
            description: `¡Has ganado ${mission.xp} PXP! ${levelUp ? '¡Y subiste de nivel!' : ''}`,
            className: "bg-green-600/80 border-green-500 text-white"
        });
        navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la misión. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{mission.title} - ConnectONE</title>
        <meta name="description" content={mission.description} />
      </Helmet>
      <audio ref={audioRef} loop />

      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:bg-primary/10 hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="glass-effect border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-primary">{mission.icon}</div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-foreground">{mission.title}</CardTitle>
                    <p className="text-muted-foreground">{mission.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-invert text-muted-foreground max-w-none">
                  {mission.content}
                </div>

                {mission.tools.timer && (
                  <Card className="glass-effect border-border p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-5xl font-bold text-foreground font-mono">{formatTime(timer)}</div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => setIsTimerActive(!isTimerActive)} size="icon" className="bg-primary hover:bg-primary/80 rounded-full w-14 h-14">
                          {isTimerActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                        <Button onClick={() => { setTimer(mission.tools.timer); setIsTimerActive(false); }} variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-full">
                          <RotateCcw className="w-5 h-5" />
                        </Button>
                        <Button onClick={() => toast({title: "Próximamente", description: "Podrás editar la duración."})} variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-full">
                          <Edit className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {mission.tools.music && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2 text-foreground">
                      <Music className="w-5 h-5" />
                      <span>Música de concentración</span>
                    </div>
                    <Button onClick={() => setIsMusicPlaying(!isMusicPlaying)} variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-full">
                      {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </Button>
                  </div>
                )}

                <Button onClick={handleCompleteMission} disabled={isCompleted || isLoading} size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  <CheckCircle className="w-5 h-5 mr-2" /> 
                  {isLoading ? 'Completando...' : isCompleted ? 'Completada' : `Completar Misión (+${mission.xp} PXP)`}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MissionPage;