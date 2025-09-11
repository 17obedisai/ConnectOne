
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getWeeklyChallenges, getChallengesEndDate, challengeDifficulties, getWeekNumber } from '@/lib/challenges.js';
import { Trophy, Zap, CheckCircle, PlusCircle, MinusCircle, Gift } from 'lucide-react';
import { accessoriesInventory } from '@/config/accessories.js';

const Countdown = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60); // Update every minute

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      <span>Reinicia en:</span>
      {timeLeft.días > 0 && <span>{timeLeft.días}d</span>}
      {timeLeft.horas > 0 && <span>{timeLeft.horas}h</span>}
      <span>{timeLeft.minutos}m</span>
    </div>
  );
};

const ChallengeCard = ({ challenge, onJoin, onLeave, onProgress, progress, isJoined }) => {
  const { id, title, description, difficulty, target, reward } = challenge;
  const { name, color } = challengeDifficulties[difficulty];
  const progressPercentage = Math.min(((progress || 0) / target) * 100, 100);
  const isCompleted = progress >= target;

  const accessory = reward.accessory ? Object.values(accessoriesInventory).flat().find(a => a.id.includes(reward.accessory)) : null;

  return (
    <Card className={`flex flex-col h-full transition-all duration-300 ${isJoined ? 'border-primary/50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${color}`}>{name}</span>
            <CardTitle className="mt-2">{title}</CardTitle>
          </div>
          {isCompleted ? <CheckCircle className="w-8 h-8 text-green-500" /> : <Trophy className="w-8 h-8 text-amber-400" />}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Gift className="w-4 h-4 text-accent"/>
            <span>{reward.coins} Monedas</span>
            {accessory && <span>+ {accessory.name}</span>}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-mono text-muted-foreground">{progress || 0} / {target}</p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="mt-auto flex gap-2">
          {isJoined && !isCompleted && (
            <>
              <Button size="icon" variant="outline" onClick={() => onProgress(id, -1)}><MinusCircle className="w-4 h-4" /></Button>
              <Button size="icon" variant="outline" onClick={() => onProgress(id, 1)}><PlusCircle className="w-4 h-4" /></Button>
            </>
          )}
          {isJoined ? (
            <Button onClick={() => onLeave(id)} variant="destructive" className="w-full">Abandonar</Button>
          ) : (
            <Button onClick={() => onJoin(id)} className="w-full"><Zap className="mr-2 h-4 w-4" /> Unirme</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ChallengesPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [weeklyChallenges, setWeeklyChallenges] = useState([]);
  const [challengesEndDate, setChallengesEndDate] = useState(null);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const challenges = getWeeklyChallenges();
    const endDate = getChallengesEndDate();
    setWeeklyChallenges(challenges);
    setChallengesEndDate(endDate);

    if (user) {
      const savedData = JSON.parse(localStorage.getItem(`challenges_${user.id}`) || '{}');
      if (savedData.week === `${endDate.getFullYear()}-${getWeekNumber(endDate)}`) {
        setJoinedChallenges(savedData.joined || []);
        setProgress(savedData.progress || {});
      }
    }
  }, [user]);

  const saveData = (updatedJoined, updatedProgress) => {
    if (user && challengesEndDate) {
      const weekId = `${challengesEndDate.getFullYear()}-${getWeekNumber(challengesEndDate)}`;
      const dataToSave = {
        week: weekId,
        joined: updatedJoined,
        progress: updatedProgress,
      };
      localStorage.setItem(`challenges_${user.id}`, JSON.stringify(dataToSave));
    }
  };

  const handleJoin = (challengeId) => {
    if (joinedChallenges.includes(challengeId)) return;
    const updatedJoined = [...joinedChallenges, challengeId];
    setJoinedChallenges(updatedJoined);
    saveData(updatedJoined, progress);
    toast({ title: "¡Reto aceptado!", description: "Ya puedes registrar tu progreso." });
  };

  const handleLeave = (challengeId) => {
    const updatedJoined = joinedChallenges.filter(id => id !== challengeId);
    const updatedProgress = { ...progress };
    delete updatedProgress[challengeId];
    setJoinedChallenges(updatedJoined);
    setProgress(updatedProgress);
    saveData(updatedJoined, updatedProgress);
    toast({ title: "Reto abandonado", variant: "destructive" });
  };

  const handleProgress = (challengeId, amount) => {
    const challenge = weeklyChallenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const currentProgress = progress[challengeId] || 0;
    const newProgress = Math.max(0, Math.min(currentProgress + amount, challenge.target));
    
    const updatedProgress = { ...progress, [challengeId]: newProgress };
    setProgress(updatedProgress);
    saveData(joinedChallenges, updatedProgress);

    if (newProgress === challenge.target && currentProgress !== challenge.target) {
      toast({ title: "¡Reto completado!", description: `¡Felicidades por completar "${challenge.title}"!` });
      // Here you would add rewards to user's stats/inventory
    }
  };

  return (
    <>
      <Helmet>
        <title>Retos Semanales - ConnectONE</title>
        <meta name="description" content="Acepta retos semanales y gana recompensas extra en ConnectONE." />
      </Helmet>

      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Trophy className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Retos de la Semana</h1>
                <p className="text-muted-foreground">Nuevos desafíos, nuevas recompensas.</p>
              </div>
            </div>
            {challengesEndDate && <Countdown endDate={challengesEndDate} />}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {weeklyChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onJoin={handleJoin}
              onLeave={handleLeave}
              onProgress={handleProgress}
              progress={progress[challenge.id]}
              isJoined={joinedChallenges.includes(challenge.id)}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ChallengesPage;
