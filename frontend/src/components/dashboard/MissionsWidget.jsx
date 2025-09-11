import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Plus, Edit, Zap } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AddMissionDialog = ({ onAddMission }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('productivity');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(20);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newMission = {
      id: `custom_${Date.now()}`,
      title,
      description,
      category,
      xp: parseInt(xp, 10),
      icon: <Edit className="w-8 h-8" />,
      completed: false,
      tools: {}
    };
    onAddMission(newMission);
    setTitle('');
    setDescription('');
    setCategory('productivity');
    setXp(20);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-card/50 text-foreground border-border hover:bg-primary/10">
          <Plus className="w-4 h-4 mr-2" /> Añadir Misión Manualmente
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Crear nueva misión</DialogTitle>
          <DialogDescription>
            Añade una tarea personalizada a tu lista de hoy.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título de la misión</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Elige una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical_wellness">Bienestar Físico</SelectItem>
                <SelectItem value="mental_wellness">Bienestar Mental</SelectItem>
                <SelectItem value="nutrition">Alimentación</SelectItem>
                <SelectItem value="productivity">Productividad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="xp">Puntos de Experiencia (PXP)</Label>
            <Input id="xp" type="number" value={xp} onChange={(e) => setXp(e.target.value)} required />
          </div>
          <DialogFooter>
            <Button type="submit">Añadir Misión</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const MissionsWidget = ({ missions, onAddMission }) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="missions" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted mb-4">
        <TabsTrigger value="missions">Misiones del Día</TabsTrigger>
        <TabsTrigger value="weekly" onClick={() => navigate('/challenges')}>Reto Semanal</TabsTrigger>
      </TabsList>
      <TabsContent value="missions" className="mt-4 space-y-4">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className={`relative group flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${mission.completed ? 'bg-green-500/10 border-green-500/20 shadow-lg shadow-green-500/10' : 'bg-card/80 border-border hover:border-primary/50 cursor-pointer'}`}
            onClick={() => !mission.completed && navigate(`/mission/${mission.id}`)}
          >
            <div className="flex items-center gap-4">
              <div className={`text-primary`}>{mission.icon}</div>
              <div>
                <p className="font-semibold text-foreground">{mission.title}</p>
                <p className="text-muted-foreground text-sm flex items-center gap-1"><Zap className="w-3 h-3" />+{mission.xp} PXP</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: mission.completed ? [1, 1.3, 1] : 1,
                  color: mission.completed ? '#4ade80' : '#64748b'
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CheckCircle className={`w-6 h-6 ${mission.completed ? '' : 'text-muted-foreground/50'}`} />
              </motion.div>
            </div>
          </motion.div>
        ))}
        <AddMissionDialog onAddMission={onAddMission} />
      </TabsContent>
    </Tabs>
  );
};

export default MissionsWidget;