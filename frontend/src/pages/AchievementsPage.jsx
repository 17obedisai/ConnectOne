import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useData } from '@/contexts/DataContext';
import { achievementsList, achievementCategories } from '@/lib/achievements.js';
import { useToast } from '@/components/ui/use-toast';
import { Award, Check, Lock } from 'lucide-react';

const RarityBadge = ({ rarity }) => {
  const config = {
    comun: { text: 'Común', color: 'bg-gray-500' },
    epico: { text: 'Épico', color: 'bg-purple-600' },
    legendario: { text: 'Legendario', color: 'bg-amber-500' },
  };
  const { text, color } = config[rarity] || config.comun;
  return <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${color}`}>{text}</span>;
};

const AchievementCard = ({ achievement, userProgress, onClaim }) => {
  const { id, category, title, description, rarity, target, reward } = achievement;
  const progress = userProgress[id] || 0;
  const isCompleted = progress >= target;
  const isClaimed = userProgress.claimed?.includes(id);

  const progressPercentage = Math.min((progress / target) * 100, 100);

  return (
    <Card className={`flex flex-col h-full transition-all duration-300 ${isCompleted && !isClaimed ? 'border-amber-400 shadow-amber-400/20' : 'border-border'}`}>
      <CardHeader className="flex-row items-start justify-between gap-4 pb-2">
        <div className="flex-grow">
          <p className="text-xs font-semibold text-primary">{achievementCategories[category]?.name || 'General'}</p>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {reward.trophy && <img src={reward.trophy} alt={`Trofeo para el logro ${title}`} className="w-10 h-10" />}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <RarityBadge rarity={rarity} />
            <p className="text-xs font-mono text-muted-foreground">{Math.floor(progress)} / {target}</p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        {isCompleted && !isClaimed && (
          <Button onClick={() => onClaim(id)} className="mt-auto w-full bg-amber-500 hover:bg-amber-600">
            <Award className="mr-2 h-4 w-4" /> Reclamar
          </Button>
        )}
        {isClaimed && (
          <Button variant="ghost" disabled className="mt-auto w-full">
            <Check className="mr-2 h-4 w-4" /> Reclamado
          </Button>
        )}
        {!isCompleted && (
          <Button variant="outline" disabled className="mt-auto w-full">
            <Lock className="mr-2 h-4 w-4" /> Bloqueado
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const AchievementsPage = () => {
  const { stats, refreshData } = useData();
  const { toast } = useToast();
  const [userProgress, setUserProgress] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Mocking user progress fetching
    const storedProgress = JSON.parse(localStorage.getItem('achievement_progress') || '{}');
    const progressData = {
      streak_3: stats.streak,
      streak_7: stats.streak,
      streak_14: stats.streak,
      streak_30: stats.streak,
      level_2: stats.level,
      level_5: stats.level,
      level_10: stats.level,
      level_16: stats.level,
      ...storedProgress,
    };
    setUserProgress(progressData);
  }, [stats]);

  const handleClaim = (achievementId) => {
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (!achievement) return;

    const updatedProgress = {
      ...userProgress,
      claimed: [...(userProgress.claimed || []), achievementId],
    };
    setUserProgress(updatedProgress);
    localStorage.setItem('achievement_progress', JSON.stringify(updatedProgress));

    // Here you would typically update user's inventory/coins
    toast({
      title: "¡Recompensa Reclamada!",
      description: `Has obtenido: ${achievement.reward.coins || ''} monedas ${achievement.reward.accessory ? `y el accesorio ${achievement.reward.accessory}` : ''}`,
    });
    refreshData(); // To update PandoCoins in sidebar
  };

  const filteredAchievements = achievementsList.filter(ach => 
    activeCategory === 'all' || ach.category === activeCategory
  );

  return (
    <>
      <Helmet>
        <title>Mis Logros - ConnectONE</title>
        <meta name="description" content="Consulta todos los logros que has desbloqueado en tu viaje con ConnectONE." />
      </Helmet>

      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-6">
            <Award className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">Mis Logros</h1>
              <p className="text-muted-foreground/80">¡Celebra tu progreso y descubre nuevos desafíos!</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => setActiveCategory('all')}>Todos</Button>
          {Object.entries(achievementCategories).map(([key, { name }]) => (
            <Button key={key} variant={activeCategory === key ? 'default' : 'outline'} onClick={() => setActiveCategory(key)}>{name}</Button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredAchievements.map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} userProgress={userProgress} onClaim={handleClaim} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AchievementsPage;