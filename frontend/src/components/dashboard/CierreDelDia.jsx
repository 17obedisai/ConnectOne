import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Moon, Brain, HeartPulse, Sparkles, Save, Loader2 } from 'lucide-react';
import api from '@/services/api';

// Selector 1-5 reutilizable.
const Rating = ({ value, onChange, activeClass }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className={`flex-1 h-8 rounded-lg border text-sm font-bold transition-all
          ${value === n ? `bg-gradient-to-r ${activeClass} text-white border-transparent` : 'bg-white/5 border-white/10 text-purple-300 hover:bg-white/10'}`}
      >
        {n}
      </button>
    ))}
  </div>
);

const empty = { aprendizaje: '', gratitud: '', concentracion: null, calidadSueno: null, nivelEstres: null, reflexionIA: '' };

const CierreDelDia = () => {
  const { toast } = useToast();
  const [j, setJ] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [reflecting, setReflecting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get('/journal/today');
        if (active && data?.data) setJ({ ...empty, ...data.data });
      } catch (e) { /* noop */ }
    })();
    return () => { active = false; };
  }, []);

  const set = (k, v) => setJ((p) => ({ ...p, [k]: v }));

  const guardar = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/journal/today', j);
      setJ({ ...empty, ...data.data });
      toast({ title: '📓 Día cerrado', description: 'Registrado en tu bitácora' });
      window.dispatchEvent(new CustomEvent('connectone:refresh'));
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo guardar.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const reflexion = async () => {
    setReflecting(true);
    try {
      const { data } = await api.post('/ai/reflect', j);
      if (data.reflexion) {
        set('reflexionIA', data.reflexion);
        await api.put('/journal/today', { ...j, reflexionIA: data.reflexion });
      } else if (!data.configured) {
        toast({ title: 'IA no configurada', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo generar.', variant: 'destructive' });
    } finally {
      setReflecting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-300" /> Cierre de Día
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Textarea
            value={j.aprendizaje}
            onChange={(e) => set('aprendizaje', e.target.value)}
            placeholder="¿Qué aprendí hoy?"
            className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[60px]"
          />
          <Textarea
            value={j.gratitud}
            onChange={(e) => set('gratitud', e.target.value)}
            placeholder="¿Qué agradezco hoy?"
            className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[60px]"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> Concentración</p>
            <Rating value={j.concentracion} onChange={(v) => set('concentracion', v)} activeClass="from-blue-500 to-cyan-500" />
          </div>
          <div>
            <p className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> Sueño</p>
            <Rating value={j.calidadSueno} onChange={(v) => set('calidadSueno', v)} activeClass="from-indigo-500 to-purple-500" />
          </div>
          <div>
            <p className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><HeartPulse className="w-3.5 h-3.5" /> Estrés</p>
            <Rating value={j.nivelEstres} onChange={(v) => set('nivelEstres', v)} activeClass="from-orange-500 to-red-500" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={guardar} disabled={saving} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Guardar cierre
          </Button>
          <Button onClick={reflexion} disabled={reflecting} variant="outline" className="border-purple-500/40 text-purple-200 hover:bg-purple-800/40">
            {reflecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span className="ml-1.5">Reflexión IA</span>
          </Button>
        </div>

        <AnimatePresence>
          {j.reflexionIA && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-3">
              <p className="text-purple-200 text-sm flex gap-2">
                <Sparkles className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{j.reflexionIA}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default CierreDelDia;
