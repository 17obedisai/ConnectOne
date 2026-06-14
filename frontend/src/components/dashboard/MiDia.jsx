import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Sunrise, Sparkles, Loader2, RefreshCw, Clock, Lightbulb } from 'lucide-react';
import api from '@/services/api';

const TIPO = {
  trabajo: { label: 'Trabajo', color: 'border-blue-500/40 bg-blue-500/10', dot: 'bg-blue-400' },
  estudio: { label: 'Estudio', color: 'border-purple-500/40 bg-purple-500/10', dot: 'bg-purple-400' },
  descanso: { label: 'Descanso', color: 'border-green-500/40 bg-green-500/10', dot: 'bg-green-400' },
  fitness: { label: 'Fitness', color: 'border-orange-500/40 bg-orange-500/10', dot: 'bg-orange-400' }
};

const saludoHora = () => {
  const h = new Date().getHours();
  if (h < 12) return { txt: 'Buenos días', emoji: '☀️' };
  if (h < 19) return { txt: 'Buenas tardes', emoji: '🌤️' };
  return { txt: 'Buenas noches', emoji: '🌙' };
};

const MiDia = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [agenda, setAgenda] = useState([]);
  const [resumen, setResumen] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [armando, setArmando] = useState(false);

  const cargar = async () => {
    try {
      const { data } = await api.get('/dailyfocus/today');
      const d = data?.data;
      if (d) {
        setAgenda([...(d.agenda || [])].sort((a, b) => (a.inicio || '').localeCompare(b.inicio || '')));
        setResumen(d.resumenIA || '');
        setRecomendaciones(d.recomendaciones || []);
      }
    } catch (e) { /* noop */ } finally { setLoading(false); }
  };

  useEffect(() => {
    cargar();
    const onRefresh = () => cargar();
    window.addEventListener('connectone:refresh', onRefresh);
    return () => window.removeEventListener('connectone:refresh', onRefresh);
  }, []);

  const armarDia = async () => {
    setArmando(true);
    try {
      const { data } = await api.post('/ai/plan-dia', {});
      setResumen(data.data.resumen || '');
      setRecomendaciones(data.data.recomendaciones || []);
      setAgenda([...(data.data.agenda || data.data.bloques || [])].sort((a, b) => (a.inicio || '').localeCompare(b.inicio || '')));
      toast({ title: '🌅 Tu día está listo', description: 'Energiko armó tu rutina de hoy' });
      window.dispatchEvent(new CustomEvent('connectone:refresh'));
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No pude armar tu día.', variant: 'destructive' });
    } finally {
      setArmando(false);
    }
  };

  const s = saludoHora();
  const tieneDia = agenda.length > 0 || resumen;

  return (
    <Card className="bg-gradient-to-br from-fuchsia-600/20 via-purple-700/20 to-cyan-600/20 backdrop-blur border-purple-500/30 overflow-hidden">
      <CardContent className="p-5 sm:p-6">
        {/* Saludo */}
        <div className="flex items-start gap-3 mb-4">
          <img src="/images/panda-landing.png" alt="Energiko" className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {s.emoji} {s.txt}{user?.nombre ? `, ${user.nombre.split(' ')[0]}` : ''}
            </h2>
            <p className="text-purple-200/80 text-sm capitalize">
              {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando tu día...</div>
        ) : !tieneDia ? (
          // Sin plan: invitar a armar el día
          <div className="text-center py-4">
            <p className="text-purple-100 mb-4 max-w-md mx-auto">
              ¿Listo para hoy? Deja que <span className="font-bold text-white">Energiko</span> arme tu rutina del día con tus tareas, ejercicio, comidas y horarios.
            </p>
            <Button onClick={armarDia} disabled={armando}
              className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-bold px-6 py-6 rounded-2xl text-base">
              {armando ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Armando tu día...</> : <><Sunrise className="w-5 h-5 mr-2" /> Arma mi día con Energiko</>}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resumen && (
              <p className="text-purple-100 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl p-3 leading-relaxed">
                {resumen}
              </p>
            )}

            {/* Rutina del día */}
            {agenda.length > 0 && (
              <div>
                <p className="text-purple-200 text-sm mb-2 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Tu rutina de hoy</p>
                <div className="space-y-1.5">
                  {agenda.map((b, i) => {
                    const t = TIPO[b.tipo] || TIPO.trabajo;
                    return (
                      <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2 border ${t.color}`}>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
                        <span className="text-xs font-mono text-purple-200 tabular-nums shrink-0 w-[5.5rem]">{b.inicio}{b.fin ? `–${b.fin}` : ''}</span>
                        <span className="text-sm text-white flex-1 min-w-0 truncate">{b.titulo}</span>
                        <span className="text-[10px] uppercase tracking-wide text-purple-300/60 shrink-0">{t.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recomendaciones */}
            {recomendaciones.length > 0 && (
              <div>
                <p className="text-purple-200 text-sm mb-2 flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-yellow-300" /> Recomendaciones de Energiko</p>
                <ul className="space-y-1">
                  {recomendaciones.map((r, i) => (
                    <li key={i} className="text-purple-100 text-sm flex gap-2"><span className="text-purple-400">•</span><span>{r}</span></li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={armarDia} disabled={armando} variant="outline" size="sm"
              className="border-purple-500/40 text-purple-200 hover:bg-purple-800/40">
              {armando ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="ml-1.5">Rehacer mi día</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MiDia;
