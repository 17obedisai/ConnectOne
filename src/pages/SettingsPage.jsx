import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ArrowLeft, User, Bell, Shield, Save, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { profile, refreshData } = useData();
  const [formData, setFormData] = useState({
    fullName: '',
    notifications: true,
    carbCycling: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && profile) {
        setFormData({
            fullName: user.fullName || '',
            notifications: profile.notifications ?? true,
            carbCycling: profile.carbCycling ?? false,
        });
    }
  }, [user, profile]);

  const handleSave = async () => {
    setIsLoading(true);
    if (user) {
        try {
            updateUser({ fullName: formData.fullName });
            const profileData = JSON.parse(localStorage.getItem(`profile_${user.id}`)) || {};
            const updatedProfile = {
                ...profileData,
                notifications: formData.notifications,
                carbCycling: formData.carbCycling,
            };
            localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
            await refreshData();
            toast({ title: "¡Ajustes guardados!", description: "Tus preferencias han sido actualizadas." });
        } catch (error) {
            toast({ title: "Error", description: "No se pudieron guardar los cambios.", variant: "destructive" });
        }
    }
    setIsLoading(false);
  };

  if (!user || !profile) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Ajustes - ConnectONE</title>
        <meta name="description" content="Gestiona los ajustes de tu cuenta y preferencias en ConnectONE." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:bg-primary/10 hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
            </Button>
            <div className="flex items-center gap-4 mb-8">
              <EnergikoPanda mood="thoughtful" size="medium" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Ajustes</h1>
                <p className="text-muted-foreground">Personaliza tu experiencia en ConnectONE.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-8">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground"><User className="text-primary" /> Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-muted-foreground">Nombre Completo</Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="bg-muted border-border text-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground"><Bell className="text-primary" /> Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-muted-foreground">Alertas de misiones personalizadas</Label>
                  <Switch id="notifications" checked={formData.notifications} onCheckedChange={(val) => setFormData(prev => ({ ...prev, notifications: val }))} />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground"><RefreshCw className="text-primary" /> Funciones Avanzadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="carbCycling" className="text-muted-foreground">Activar Ciclado de Carbohidratos</Label>
                  <Switch id="carbCycling" checked={formData.carbCycling} onCheckedChange={(val) => setFormData(prev => ({ ...prev, carbCycling: val }))} />
                </div>
                <CardDescription>Esta función añadirá un planificador visual en tu dashboard para días de carbohidratos altos, medios y bajos.</CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground"><Shield className="text-primary" /> Privacidad</CardTitle>
                <CardDescription>Gestiona tu contraseña y datos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="text-foreground border-border hover:bg-primary/10" onClick={() => toast({title: "🚧 Próximamente", description: "Podrás cambiar tu contraseña desde aquí."})}>Cambiar Contraseña</Button>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-6 rounded-lg primary-glow">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;