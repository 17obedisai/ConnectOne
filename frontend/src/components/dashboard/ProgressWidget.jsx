import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { content } from '@/config/content.js';

const ProgressWidget = ({ stats }) => {
  const navigate = useNavigate();
  
  // Manejar caso cuando stats es null o undefined
  if (!stats) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-bold text-foreground">Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            Cargando estadísticas...
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Valores por defecto si faltan propiedades
  const xp = stats.xp || 0;
  const xpToNext = stats.xp_to_next_level || 1000;
  const level = stats.level || 1;
  const streak = stats.streak || 0;
  const achievements = stats.achievements_unlocked || 0;
  
  const xpPercentage = (xp / xpToNext) * 100;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-bold text-foreground">Progreso General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="cursor-pointer" onClick={() => navigate('/levels')}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-foreground">Nivel {level}</span>
            <span className="text-muted-foreground">{xp} / {xpToNext} PXP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-400 to-cyan-400 h-2.5 rounded-full" 
              style={{width: `${xpPercentage}%`}}
            />
          </div>
        </div>
        
        <div className="flex justify-around items-center text-center">
          <div>
            <p className="text-3xl font-bold text-foreground flex items-center justify-center gap-1">
              <Flame className="w-6 h-6 text-orange-400" /> 
              {streak}
            </p>
            <p className="text-xs text-muted-foreground">Racha</p>
          </div>
          <div className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/achievements')}>
            <div className="flex items-center justify-center gap-1">
              {content?.icons?.reward_trophy && (
                <img src={content.icons.reward_trophy} alt="Icono de trofeo" className="w-6 h-6"/>
              )}
              <p className="text-3xl font-bold text-foreground">{achievements}</p>
            </div>
            <p className="text-xs text-muted-foreground">Logros</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;