import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Calendar, Target, Star, Edit, Save, Info } from 'lucide-react';

const EditProfileForm = ({ profile, user, onSave, onCancel }) => {
    const [profileData, setProfileData] = useState({ fullName: '', mainGoal: '', timezone: '' });

    useEffect(() => {
        setProfileData({
            fullName: profile.full_name || '',
            mainGoal: profile.main_goal || 'productivity',
            timezone: profile.timezone || 'UTC'
        });
    }, [profile]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" value={profileData.fullName} onChange={e => setProfileData(p => ({ ...p, fullName: e.target.value }))} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="mainGoal">Objetivo Principal</Label>
                <Tabs defaultValue={profileData.mainGoal} onValueChange={v => setProfileData(p => ({ ...p, mainGoal: v }))}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="physical_wellness">Físico</TabsTrigger>
                        <TabsTrigger value="mental_wellness">Mental</TabsTrigger>
                        <TabsTrigger value="productivity">Productividad</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Input id="timezone" value={profileData.timezone} onChange={e => setProfileData(p => ({ ...p, timezone: e.target.value }))} placeholder="Ej: America/Mexico_City" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                <Button onClick={() => onSave(profileData)}>Guardar Cambios</Button>
            </div>
        </div>
    );
};

const DisplayProfileInfo = ({ profile, stats, user }) => {
    const pomodoroMinutes = localStorage.getItem('pomodoroMinutesThisWeek') || 0;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground">
            <div className="flex items-center gap-3"><User className="w-5 h-5 text-primary" /> <strong>Nombre:</strong> {profile.full_name}</div>
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> <strong>Email:</strong> {user.email}</div>
            <div className="flex items-center gap-3"><Star className="w-5 h-5 text-yellow-400" /> <strong>Nivel:</strong> {stats.level} ({stats.xp} / {stats.xp_to_next_level} PXP)</div>
            <div className="flex items-center gap-3"><Target className="w-5 h-5 text-green-400" /> <strong>Racha:</strong> {stats.streak} días</div>
            <div className="flex items-center gap-3 text-cyan-400"><Info className="w-5 h-5" /> <strong>Objetivo:</strong> <span className="capitalize">{profile.main_goal?.replace(/_/g, ' ') || 'No definido'}</span></div>
            <div className="flex items-center gap-3 text-orange-400"><Calendar className="w-5 h-5" /> <strong>Minutos Focus:</strong> {pomodoroMinutes} esta semana</div>
        </div>
    );
};

const ProfileInfo = ({ profile, stats, refreshData }) => {
    const { user, updateUser } = useAuth();
    const { toast } = useToast();
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleSaveProfile = async (profileData) => {
        if (user) {
            try {
                updateUser({ fullName: profileData.fullName });
                const existingProfile = JSON.parse(localStorage.getItem(`profile_${user.id}`)) || {};
                const updatedProfile = { ...existingProfile, full_name: profileData.fullName, main_goal: profileData.mainGoal, timezone: profileData.timezone };
                localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
                toast({ title: "¡Perfil actualizado!", description: "Tus datos han sido guardados." });
                await refreshData();
                setIsEditingProfile(false);
            } catch (e) {
                toast({ title: "Error", description: "No se pudieron guardar los cambios.", variant: "destructive" });
            }
        }
    };

    return (
        <Card className="glass-effect border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold text-foreground">Mi Información</CardTitle>
                    <CardDescription>Revisa y actualiza tus datos personales y de progreso.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditingProfile(p => !p)}>
                    {isEditingProfile ? <Save className="w-5 h-5 text-primary" /> : <Edit className="w-5 h-5" />}
                </Button>
            </CardHeader>
            <CardContent>
                {isEditingProfile ? (
                    <EditProfileForm profile={profile} user={user} onSave={handleSaveProfile} onCancel={() => setIsEditingProfile(false)} />
                ) : (
                    <DisplayProfileInfo profile={profile} stats={stats} user={user} />
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileInfo;