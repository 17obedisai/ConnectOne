
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Lock, Gift } from 'lucide-react';
import EnergikoPanda from '@/components/EnergikoPanda';
import { useData } from '@/contexts/DataContext';
import { levelData, getLevelRewards } from '@/config/levels.js';
import { getLevelImage } from '@/config/levelImages';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { stats, loading } = useData();

  if (loading || !stats) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Cargando niveles...</div>;
  }
  const userLevel = stats.level;

  const getRewardText = (level) => {
    const rewards = getLevelRewards(level);
    const rewardNames = rewards.map(r => r.name);
    return rewardNames.length > 0 ? rewardNames.join(', ') : 'Recompensa secreta';
  };

  return (
    <>
      <Helmet>
        <title>Niveles y Recompensas - ConnectONE</title>
        <meta name="description" content="Sube de nivel y desbloquea nuevas apariencias para Enérgiko." />
      </Helmet>

      <div className="min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="text-center mb-12">
              <h1 className="text-foreground">La Evolución de Enérgiko</h1>
              <p className="text-muted-foreground mt-2">Sube de nivel completando actividades y mira cómo evoluciona tu compañero.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {levelData.map((levelInfo, index) => (
              <motion.div
                key={levelInfo.level}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`text-center h-full flex flex-col transition-all duration-300 group ${userLevel >= levelInfo.level ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-border opacity-60 hover:opacity-100'}`}>
                  <CardHeader className="flex-grow">
                    {/* Aquí va la imagen del nivel */}
                    <img 
                      src={getLevelImage(levelInfo.level)} 
                      alt={`Nivel ${levelInfo.level}`}
                      className="w-32 h-32 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* O si prefieres usar EnergikoPanda, comenta la imagen de arriba */}
                    {/* <EnergikoPanda 
                        pandaType="level" 
                        level={levelInfo.level}
                        size="large" 
                        isStatic={true} 
                        className="mx-auto group-hover:scale-110 transition-transform duration-300" 
                    /> */}
                    <CardTitle className="text-foreground mt-4 !text-xl">Nivel {levelInfo.level}</CardTitle>
                    <p className="font-semibold text-primary h-12 flex items-center justify-center">{levelInfo.name}</p>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-end space-y-2">
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Gift className="w-4 h-4 text-yellow-400" />
                        <span>{getRewardText(levelInfo.level)}</span>
                    </div>
                    {userLevel >= levelInfo.level ? (
                      <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
                        <Star className="w-5 h-5 fill-current" />
                        <span>Desbloqueado</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Lock className="w-5 h-5" />
                        <span>{levelInfo.xpThreshold} PXP</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelsPage;
