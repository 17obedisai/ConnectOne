
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { activitiesData } from '@/lib/activities.jsx';
import IntermittentFastingWidget from '@/components/dashboard/IntermittentFastingWidget';
import FocusModeWidget from '@/components/dashboard/FocusModeWidget';
import MissionsWidget from '@/components/dashboard/MissionsWidget';
import ProgressWidget from '@/components/dashboard/ProgressWidget';
import Confetti from 'react-confetti';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const SkeletonLoader = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-24 bg-card rounded-2xl" />
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="h-80 bg-card rounded-2xl" />
        <div className="h-64 bg-card rounded-2xl" />
      </div>
      <div className="space-y-8">
        <div className="h-56 bg-card rounded-2xl" />
        <div className="h-80 bg-card rounded-2xl" />
      </div>
    </div>
  </div>
);


const DashboardPage = () => {
  const { profile, stats, completedActivities, loading, customization, refreshData } = useData();
  const [missions, setMissions] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const [celebrating, setCelebrating] = useState(false);
  const [pandaJump, setPandaJump] = useState(false);
  const prevLevelRef = useRef(stats?.level);

  useEffect(() => {
    if (stats && prevLevelRef.current && stats.level > prevLevelRef.current) {
      setCelebrating(true);
      setPandaJump(true);
      toast({
        title: "¡Subiste de Nivel!",
        description: `¡Felicidades! Has alcanzado el nivel ${stats.level}.`,
        duration: 5000,
      });
      setTimeout(() => setCelebrating(false), 6000);
      setTimeout(() => setPandaJump(false), 800);
      refreshData();
    }
    prevLevelRef.current = stats?.level;
  }, [stats, toast, refreshData]);

  useEffect(() => {
    if (profile && profile.main_goal) {
      const routeMap = {
        physical_wellness: ['exercise', 'nutrition', 'sleep'],
        mental_wellness: ['meditation', 'reading', 'journaling'],
        productivity: ['pomodoro', 'reading', 'meditation'],
      };

      const missionsForRoute = routeMap[profile.main_goal] || ['meditation', 'exercise', 'reading'];
      const suggestions = missionsForRoute
        .filter(id => activitiesData[id])
        .map(id => ({
          ...activitiesData[id],
          id,
          completed: completedActivities.some(actId => actId === id)
      }));
      setMissions(suggestions);
    } else if (profile) {
       const fallbackSuggestions = ['meditation', 'exercise', 'reading'].map(id => ({
        ...activitiesData[id],
        id,
        completed: completedActivities.some(actId => actId === id)
      }));
      setMissions(fallbackSuggestions);
    }
  }, [profile, completedActivities]);

  const handleAddMission = (newMission) => {
    setMissions(prev => [...prev, newMission]);
    toast({ title: "Nueva misión añadida", description: `Has añadido "${newMission.title}" a tus misiones de hoy.` });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 18) return "¡Buenas tardes";
    return "¡Buenas noches";
  };
  
  if (loading || !profile || !stats || !user) {
    return <SkeletonLoader />;
  }

  const firstName = profile.full_name ? profile.full_name.split(' ')[0] : 'Explorador';

  return (
    <>
      <Helmet>
        <title>Panel - ConnectONE</title>
        <meta name="description" content="Tu panel personalizado en ConnectONE. Revisa tu progreso y gestiona tus misiones con Enérgiko" />
      </Helmet>
      
      {celebrating && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="w-full max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants} 
            initial="hidden" 
            animate="visible"
            className="mb-8 flex items-center gap-4"
          >
            <div className={pandaJump ? 'panda-celebrate-jump' : ''}>
              <EnergikoPanda pandaType="dashboard" size="medium" equippedItems={customization?.items} />
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {getGreeting()}, <span className="animated-text-gradient">{firstName}</span>!
                </h1>
                <p className="text-muted-foreground text-base md:text-lg mt-1">
                    {stats.streak > 0 ? `¡Llevas una racha de ${stats.streak} días! Sigue así.` : "Enérgiko está listo. ¿Qué misiones completaremos hoy?"}
                </p>
            </div>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-6 md:gap-8">
              <MissionsWidget missions={missions} onAddMission={handleAddMission} />
              <ProgressWidget stats={stats} />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6 md:gap-8">
              <FocusModeWidget />
              <IntermittentFastingWidget />
            </motion.div>
          </motion.div>
      </div>
    </>
  );
};

export default DashboardPage;
