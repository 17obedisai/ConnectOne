import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Music, Volume2, VolumeX } from 'lucide-react';

const FocusModeWidget = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('pomodoroTimeLeft');
    return saved ? parseInt(saved) : 25 * 60;
  });
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem('pomodoroActive') === 'true';
  });
  const [sessionType, setSessionType] = useState(() => {
    return localStorage.getItem('pomodoroSession') || 'work';
  });
  const [selectedMusic, setSelectedMusic] = useState('focus');
  const [isMuted, setIsMuted] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(() => {
    const saved = localStorage.getItem('pomodorosCompleted');
    return saved ? parseInt(saved) : 0;
  });
  
  const audioRef = useRef(null);

  const musicTracks = {
    focus: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lofi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    nature: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    silence: null
  };

  const sessions = {
    work: { duration: 25 * 60, name: 'Trabajo', color: 'text-blue-500' },
    shortBreak: { duration: 5 * 60, name: 'Descanso corto', color: 'text-green-500' },
    longBreak: { duration: 15 * 60, name: 'Descanso largo', color: 'text-purple-500' }
  };

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          const newTime = time - 1;
          localStorage.setItem('pomodoroTimeLeft', newTime.toString());
          
          if (newTime === 0) {
            handleSessionComplete();
          }
          
          return newTime;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    localStorage.setItem('pomodoroActive', isActive.toString());
    localStorage.setItem('pomodoroSession', sessionType);
    
    // Control de música
    if (audioRef.current) {
      if (isActive && !isMuted && musicTracks[selectedMusic]) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isActive, selectedMusic, isMuted, sessionType]);

  const handleSessionComplete = () => {
    // Notificación
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Sesión completada!', {
        body: `Has completado una sesión de ${sessions[sessionType].name}`,
        icon: '/images/panda-logo.png'
      });
    }
    
    // Actualizar contadores
    if (sessionType === 'work') {
      const newCount = pomodorosCompleted + 1;
      setPomodorosCompleted(newCount);
      localStorage.setItem('pomodorosCompleted', newCount.toString());
      
      // Enviar al backend
      fetch('http://localhost:5000/api/missions/pomodoro/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ duration: 25 })
      });
    }
    
    // Cambiar a la siguiente sesión
    setIsActive(false);
    if (sessionType === 'work') {
      const nextSession = pomodorosCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
      setSessionType(nextSession);
      setTimeLeft(sessions[nextSession].duration);
    } else {
      setSessionType('work');
      setTimeLeft(sessions.work.duration);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessions[sessionType].duration);
    localStorage.removeItem('pomodoroTimeLeft');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pedir permisos de notificación
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Modo Focus (Pomodoro)</span>
          <span className="text-sm font-normal">
            🍅 {pomodorosCompleted} completados hoy
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selector de sesión */}
        <Select value={sessionType} onValueChange={(value) => {
          setSessionType(value);
          setTimeLeft(sessions[value].duration);
          setIsActive(false);
        }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Trabajo (25 min)</SelectItem>
            <SelectItem value="shortBreak">Descanso corto (5 min)</SelectItem>
            <SelectItem value="longBreak">Descanso largo (15 min)</SelectItem>
          </SelectContent>
        </Select>

        {/* Timer */}
        <div className="text-center py-8">
          <div className={`text-6xl font-bold ${sessions[sessionType].color}`}>
            {formatTime(timeLeft)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {sessions[sessionType].name}
          </p>
        </div>

        {/* Controles del timer */}
        <div className="flex gap-2 justify-center">
          <Button onClick={toggleTimer} size="lg">
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="mr-2" />
            Reiniciar
          </Button>
        </div>

        {/* Control de música */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Música ambiental</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
          </div>
          <Select value={selectedMusic} onValueChange={setSelectedMusic}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="focus">Concentración</SelectItem>
              <SelectItem value="lofi">Lo-Fi</SelectItem>
              <SelectItem value="nature">Naturaleza</SelectItem>
              <SelectItem value="silence">Silencio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audio element */}
        {musicTracks[selectedMusic] && (
          <audio
            ref={audioRef}
            src={musicTracks[selectedMusic]}
            loop
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FocusModeWidget;