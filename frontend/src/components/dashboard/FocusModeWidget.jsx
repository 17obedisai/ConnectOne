import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, PauseCircle, PlayCircle, RefreshCw, Music, VolumeX, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

const musicTracks = [
  { id: 'zen', name: 'Ambiente Zen', src: '/assets/relaxing-music.mp3' },
  { id: 'rain', name: 'Lluvia Relajante', src: '/assets/rain-sounds.mp3' },
  { id: 'forest', name: 'Sonidos del Bosque', src: '/assets/wind-sounds.mp3' },
];

const pomodoroModes = {
    '25/5': { work: 25, break: 5, longBreak: 15 },
    '50/10': { work: 50, break: 10, longBreak: 20 },
    '90/20': { work: 90, break: 20, longBreak: 30 },
};

const FocusModeWidget = () => {
  const { user } = useAuth();
  const { stats, refreshData } = useData();
  const { toast } = useToast();
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [pomodoros, setPomodoros] = useState(0);
  const [selectedMode, setSelectedMode] = useState('25/5');
  const audioRef = useRef(null);
  const [music, setMusic] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleSessionEnd = () => {
    if(mode === 'work') {
        const newPomodoros = pomodoros + 1;
        setPomodoros(newPomodoros);
        const coinsEarned = 5;
        // This is a placeholder for earning coins/XP.
        toast({ title: "¡Ciclo completado!", description: `Has ganado ${coinsEarned} PandoCoins. ¡Tómate un descanso!`});
        
        setMode('break');
        const isLongBreak = newPomodoros % 4 === 0;
        setTimer((isLongBreak ? pomodoroModes[selectedMode].longBreak : pomodoroModes[selectedMode].break) * 60);
    } else {
        setMode('work');
        setTimer(pomodoroModes[selectedMode].work * 60);
    }
    setIsMusicPlaying(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimer(pomodoroModes[selectedMode].work * 60);
  };
  
  useEffect(() => {
    resetTimer();
  }, [selectedMode]);

  useEffect(() => {
    if (audioRef.current) {
        if(music && isMusicPlaying) {
            audioRef.current.src = music;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [music, isMusicPlaying]);

  const toggleTimer = () => setIsActive(!isActive);
  const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying);
  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-bold text-foreground flex items-center gap-2"><BrainCircuit className="text-primary" /> Modo Focus (Pomodoro)</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <audio ref={audioRef} loop />
        <div className={`text-6xl font-bold font-mono ${mode === 'work' ? 'text-foreground' : 'text-green-400'}`}>{formatTime(timer)}</div>
        <p className="text-muted-foreground">{mode === 'work' ? 'A trabajar' : 'Descanso'} | Pomodoros: {pomodoros}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={toggleTimer} size="lg" className="bg-primary hover:bg-primary/80 w-24">
            {isActive ? <PauseCircle /> : <PlayCircle />}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg"><RefreshCw /></Button>
        </div>
         <div className="grid grid-cols-2 gap-4 pt-2">
            <Select value={selectedMode} onValueChange={setSelectedMode}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    {Object.keys(pomodoroModes).map(key => <SelectItem key={key} value={key}>{key}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select onValueChange={setMusic}>
                <SelectTrigger><SelectValue placeholder="Música ambiental"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value={null}>Sin música</SelectItem>
                    {musicTracks.map(track => <SelectItem key={track.id} value={track.src}>{track.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        {music && <Button variant="ghost" onClick={toggleMusic}>{isMusicPlaying ? <Volume2/> : <VolumeX/>} {isMusicPlaying ? 'Pausar' : 'Reproducir'}</Button>}
      </CardContent>
    </Card>
  )
}

export default FocusModeWidget;