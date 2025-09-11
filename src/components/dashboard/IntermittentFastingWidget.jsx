import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Moon, Settings, Hourglass, PauseCircle, PlayCircle } from 'lucide-react';

const IntermittentFastingWidget = () => {
  const [fastingState, setFastingState] = useState(() => {
    const savedState = localStorage.getItem('fastingState');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        return { ...parsed, startTime: parsed.startTime ? new Date(parsed.startTime) : null };
    }
    return {
      isActive: false,
      startTime: null,
      duration: 16 * 3600,
      type: '16:8'
    };
  });
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('fastingState', JSON.stringify(fastingState));
    
    let interval;
    if (fastingState.isActive && fastingState.startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - fastingState.startTime) / 1000);
        setElapsedTime(elapsed);
        if (elapsed >= fastingState.duration) {
          setFastingState({ ...fastingState, isActive: false, startTime: null });
          toast({ title: "¡Ayuno completado!", description: `¡Felicidades! Has completado tu ayuno de ${fastingState.type}.` });
        }
      }, 1000);
    } else {
        setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [fastingState, toast]);

  const toggleFasting = () => {
    if (fastingState.isActive) {
      setFastingState({ ...fastingState, isActive: false, startTime: null });
    } else {
      setFastingState({ ...fastingState, isActive: true, startTime: new Date() });
    }
  };
  
  const setFastingType = (type, hours) => {
    setFastingState(prev => ({ ...prev, type, duration: hours * 3600}));
    toast({ title: "Tipo de ayuno actualizado", description: `Has seleccionado el ayuno ${type}.` });
  };
  
  const handleTimeChange = (e) => {
    if (!fastingState.startTime) return;
    const [hours, minutes] = e.target.value.split(':');
    const newStartTime = new Date(fastingState.startTime);
    newStartTime.setHours(hours, minutes);
    setFastingState(prev => ({...prev, startTime: newStartTime}));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const progressPercentage = elapsedTime > 0 ? (elapsedTime / fastingState.duration) * 100 : 0;
  const remainingTime = fastingState.duration - elapsedTime;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2"><Moon className="text-primary" /> Ayuno Intermitente</span>
          <Dialog>
             <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><Settings className="w-4 h-4 text-muted-foreground"/></Button>
             </DialogTrigger>
             <DialogContent className="bg-card border-border text-foreground">
                <DialogHeader>
                  <DialogTitle>Configurar Ayuno</DialogTitle>
                  <DialogDescription>
                    Selecciona tu tipo de ayuno y hora de inicio.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tipo de Ayuno</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant={fastingState.type === '16:8' ? 'default' : 'outline'} onClick={() => setFastingType('16:8', 16)}>16:8</Button>
                      <Button variant={fastingState.type === '18:6' ? 'default' : 'outline'} onClick={() => setFastingType('18:6', 18)}>18:6</Button>
                      <Button variant={fastingState.type === '20:4' ? 'default' : 'outline'} onClick={() => setFastingType('20:4', 20)}>20:4</Button>
                    </div>
                  </div>
                   {fastingState.isActive && (
                    <div>
                        <label htmlFor="start-time" className="font-semibold mb-2 block">Hora de inicio</label>
                        <Input 
                            id="start-time"
                            type="time" 
                            className="bg-muted border-border"
                            value={fastingState.startTime ? `${fastingState.startTime.getHours().toString().padStart(2, '0')}:${fastingState.startTime.getMinutes().toString().padStart(2, '0')}` : ''}
                            onChange={handleTimeChange}
                        />
                    </div>
                   )}
                </div>
             </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="relative w-28 h-28 mx-auto">
          <Hourglass className="w-full h-full text-primary opacity-10" />
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            style={{ clipPath: `inset(${100 - progressPercentage}% 0 0 0)`}}
          >
            <Hourglass className="w-full h-full text-primary hourglass-spin" />
          </motion.div>
        </div>
        <div className="text-5xl font-bold text-foreground font-mono">{formatTime(remainingTime > 0 ? remainingTime : 0)}</div>
        <div className="text-sm text-muted-foreground">
          {fastingState.isActive ? `En ayuno (${fastingState.type})` : 'En ventana de alimentación'}
        </div>
        <Button onClick={toggleFasting} size="lg" className={`w-full font-bold ${fastingState.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
          {fastingState.isActive ? <PauseCircle className="mr-2" /> : <PlayCircle className="mr-2" />}
          {fastingState.isActive ? 'Finalizar Ayuno' : 'Comenzar Ayuno'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntermittentFastingWidget;