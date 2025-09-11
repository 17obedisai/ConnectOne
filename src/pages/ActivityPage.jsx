import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, CheckCircle, Clock, Play, Pause, RotateCcw, Music, Wind, Leaf, Droplets } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { activitiesData } from '@/lib/activities.jsx';
import { useData } from '@/contexts/DataContext';
import { levelData } from '@/lib/levels';

const Timer = ({ initialTime, onComplete, editable = false }) => {
  const [duration, setDuration] = useState(initialTime);
  const [time, setTime] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, time, onComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
      <div className="text-5xl font-bold text-white mb-4">{formatTime(time)}</div>
      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsActive(!isActive)} className="bg-coral-500 hover:bg-coral-600 text-white">
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button onClick={() => { setTime(duration); setIsActive(false); }} variant="outline" className="text-white border-white/30 hover:bg-white/10">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
      {editable && !isActive && (
        <div className="mt-4">
            <label className="text-sm text-gray-400 mr-2">Duración (min):</label>
            <input 
                type="number"
                value={duration / 60}
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value, 10)) * 60)}
                className="w-20 bg-slate-700 text-white rounded p-1 text-center"
            />
        </div>
      )}
    </div>
  );
};

const musicTracks = [
    { id: 'relax', name: 'Música Relajante', src: '/assets/relaxing-music.mp3' },
    { id: 'focus', name: 'Sonidos de Lluvia', src: '/assets/rain-sounds.mp3' },
    { id: 'energy', name: 'Viento Suave', src: '/assets/wind-sounds.mp3' },
];

const ActivityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { completedActivities, refreshData, stats, profile } = useData();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const activity = activitiesData[id];

  useEffect(() => {
    setIsCompleted(completedActivities.some(actId => actId === id));
  }, [id, completedActivities]);
  
  const toggleMusic = (src) => {
    if (audioRef.current) {
        if (isPlaying && audioRef.current.src.includes(src)) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.src = src;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
  };

  const handleComplete = async () => {
    if (!user || isCompleted || isLoading) return;
    setIsLoading(true);

    try {
        // Simulate backend logic with localStorage
        const today = new Date().toISOString().slice(0, 10);
        
        let allActivities = JSON.parse(localStorage.getItem(`activities_${user.id}`)) || {};
        let todayActivities = allActivities[today] || [];
        if (!todayActivities.includes(id)) {
            todayActivities.push(id);
        }
        allActivities[today] = todayActivities;
        localStorage.setItem(`activities_${user.id}`, JSON.stringify(allActivities));
        
        // Update stats
        let userStats = stats;
        userStats.xp += activity.xp;
        
        if (userStats.xp >= userStats.xp_to_next_level) {
          userStats.level += 1;
          userStats.xp -= userStats.xp_to_next_level;
          const nextLevelInfo = levelData.find(l => l.level === userStats.level + 1);
          userStats.xp_to_next_level = nextLevelInfo ? nextLevelInfo.xpThreshold - levelData.find(l => l.level === userStats.level).xpThreshold : userStats.xp_to_next_level;
        }

        // Streak logic
        const lastDate = userStats.last_activity_date;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (!lastDate || new Date(lastDate) < yesterday) {
            userStats.streak = 1;
        } else if (new Date(lastDate).toISOString().slice(0,10) === yesterday.toISOString().slice(0,10)) {
            userStats.streak += 1;
        }
        userStats.last_activity_date = today;

        localStorage.setItem(`stats_${user.id}`, JSON.stringify(userStats));

        await refreshData();
        toast({
            title: "¡Actividad completada!",
            description: `¡Buen trabajo! Has ganado ${activity.xp} XP. Sigue así.`,
        });
        
        setTimeout(() => navigate('/dashboard'), 1500);

    } catch (error) {
        toast({ title: "Error", description: "No se pudo guardar la actividad. " + error.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  if (!activity) {
    return <div className="flex items-center justify-center min-h-screen">Cargando actividad...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{activity.title} - ConnecFit</title>
        <meta name="description" content={activity.description} />
      </Helmet>
      <audio ref={audioRef} loop />

      <div className="min-h-screen bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-gray-300 hover:bg-white/10 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="glass-effect border-white/10">
              <CardHeader className="text-center">
                <div className="text-coral-400 mx-auto mb-4">{activity.icon}</div>
                <CardTitle className="text-3xl font-bold text-white">{activity.title}</CardTitle>
                <p className="text-gray-300/80 max-w-2xl mx-auto">{activity.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {activity.tools.timer && <Timer initialTime={activity.tools.timer} onComplete={handleComplete} editable={true} />}
                
                {activity.tools.music && (
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-400">Elige tu ambiente sonoro:</p>
                    <div className="flex justify-center gap-2">
                        {musicTracks.map(track => (
                            <Button key={track.id} variant="outline" className="text-white border-white/30 hover:bg-white/10" onClick={() => toggleMusic(track.src)}>
                                {track.name}
                            </Button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="prose prose-invert prose-p:text-gray-300 prose-h3:text-white prose-h3:font-semibold text-left space-y-3 max-w-none">
                  {activity.content.map((item, index) => {
                    return (
                      <div key={index}>
                        {item}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-center">
                  <Button onClick={handleComplete} disabled={isCompleted || isLoading} size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {isLoading ? 'Guardando...' : isCompleted ? 'Completada Hoy' : 'Marcar como Completada'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ActivityPage;