    import React, { useState, useEffect } from 'react';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, Circle, Clock, Flame } from 'lucide-react';
    import { missionService } from '@/services/missionService';
    import { useToast } from '@/components/ui/use-toast';

    const DailyMissions = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadMissions();
    }, []);

    const loadMissions = async () => {
        try {
        const data = await missionService.getDailyMissions();
        setMissions(data);
        } catch (error) {
        toast({
            title: "Error",
            description: "No se pudieron cargar las misiones",
            variant: "destructive"
        });
        } finally {
        setLoading(false);
        }
    };

    const completeMission = async (missionId, duracion) => {
        try {
        const result = await missionService.completeMission(missionId, duracion);
        toast({
            title: "¡Misión completada!",
            description: `Has ganado ${result.experienciaGanada} PXP`,
        });
        loadMissions(); // Recargar misiones
        } catch (error) {
        toast({
            title: "Error",
            description: error.response?.data?.mensaje || "Error al completar misión",
            variant: "destructive"
        });
        }
    };

    if (loading) return <div>Cargando misiones...</div>;

    return (
        <div className="space-y-4">
        <h2 className="text-2xl font-bold">Misiones del Día</h2>
        <div className="grid gap-4">
            {missions.map((mission) => (
            <Card key={mission._id} className={mission.completada ? 'opacity-60' : ''}>
                <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                    {mission.completada ? (
                        <CheckCircle className="text-green-500" />
                    ) : (
                        <Circle />
                    )}
                    {mission.titulo}
                    </span>
                    <span className="text-sm text-muted-foreground">
                    +{mission.experiencia} PXP
                    </span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    {mission.descripcion}
                </p>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    {mission.duracion} min
                    </span>
                    {!mission.completada && (
                    <Button
                        size="sm"
                        onClick={() => completeMission(mission._id, mission.duracion)}
                    >
                        Completar
                    </Button>
                    )}
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    );
    };

    export default DailyMissions;