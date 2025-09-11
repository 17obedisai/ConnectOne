import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { content } from '@/config/content.js';

const ProgressWidget = ({ stats }) => {
  const navigate = useNavigate();
  const xpPercentage = (stats.xp / stats.xp_to_next_level) * 100;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-bold text-foreground">Progreso General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="cursor-pointer" onClick={() => navigate('/levels')}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-foreground">Nivel {stats.level}</span>
            <span className="text-muted-foreground">{stats.xp} / {stats.xp_to_next_level} PXP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2.5 rounded-full" style={{width: `${xpPercentage}%`}}></div>
          </div>
        </div>
        <div className="flex justify-around items-center text-center">
          <div>
            <p className="text-3xl font-bold text-foreground flex items-center justify-center gap-1"><Flame className="w-6 h-6 text-orange-400" /> {stats.streak || 0}</p>
            <p className="text-xs text-muted-foreground">Racha</p>
          </div>
          <div className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/achievements')}>
             <div className="flex items-center justify-center gap-1">
                 <img src={content.icons.reward_trophy} alt="Icono de trofeo" className="w-6 h-6"/>
                <p className="text-3xl font-bold text-foreground">{stats.achievements_unlocked || 0}</p>
             </div>
            <p className="text-xs text-muted-foreground">Logros</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;