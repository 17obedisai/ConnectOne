import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  BookOpen, Moon, Brain, HeartPulse, Sparkles, Loader2, Save,
  Plus, Trash2, CheckCircle, Circle, CalendarClock, AlertTriangle
} from 'lucide-react';
import api from '@/services/api';

// Selector de valoración 1-5 reutilizable.
const Rating = ({ value, onChange, activeClass = 'from-purple-500 to-pink-500' }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className={`flex-1 h-9 rounded-lg border text-sm font-bold transition-all
          ${value === n
            ? `bg-gradient-to-r ${activeClass} text-white border-transparent scale-105`
            : 'bg-white/5 border-white/10 text-purple-300 hover:bg-white/10'}`}
      >
        {n}
      </button>
    ))}
  </div>
);

const CATEGORIAS = {
  moto: { label: 'Moto', emoji: '🏍️' },
  documento: { label: 'Documento', emoji: '📄' },
  salud: { label: 'Salud', emoji: '🩺' },
  finanzas: { label: 'Finanzas', emoji: '💰' },
  hogar: { label: 'Hogar', emoji: '🏠' },
  otro: { label: 'Otro', emoji: '📌' }
};

const emptyJournal = {
  aprendizaje: '', gratitud: '', concentracion: null,
  calidadSueno: null, nivelEstres: null, reflexionIA: ''
};

const BitacoraPage = () => {
  const { toast } = useToast();
  const [journal, setJournal] = useState(emptyJournal);
  const [recent, setRecent] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reflecting, setReflecting] = useState(false);
  const [form, setForm] = useState({ titulo: '', categoria: 'otro', fechaLimite: '' });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [t, r, rem] = await Promise.allSettled([
          api.get('/journal/today'),
          api.get('/journal/recent?dias=7'),
          api.get('/reminders')
        ]);
        if (active && t.status === 'fulfilled' && t.value.data?.data) {
          setJournal({ ...emptyJournal, ...t.value.data.data });
        }
        if (active && r.status === 'fulfilled') setRecent(r.value.data?.data || []);
        if (active && rem.status === 'fulfilled') setReminders(rem.value.data?.data || []);
      } catch (e) {
        console.error('Error cargando bitácora:', e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const set = (k, v) => setJournal((prev) => ({ ...prev, [k]: v }));

  const guardarCierre = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/journal/today', journal);
      setJournal({ ...emptyJournal, ...data.data });
      toast({ title: '📓 Cierre guardado', description: 'Tu día quedó registrado en la bitácora' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo guardar.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const pedirReflexion = async () => {
    setReflecting(true);
    try {
      const { data } = await api.post('/ai/reflect', journal);
      if (data.reflexion) {
        set('reflexionIA', data.reflexion);
        // Persistimos la reflexión junto al cierre.
        await api.put('/journal/today', { ...journal, reflexionIA: data.reflexion });
      }
      if (!data.configured) {
        toast({ title: 'IA no configurada', description: 'Falta GEMINI_API_KEY en el servidor.', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo generar la reflexión.', variant: 'destructive' });
    } finally {
      setReflecting(false);
    }
  };

  // ── Recordatorios ──
  const addReminder = async () => {
    if (!form.titulo.trim()) return;
    try {
      const { data } = await api.post('/reminders', {
        titulo: form.titulo.trim(),
        categoria: form.categoria,
        fechaLimite: form.fechaLimite || null
      });
      setReminders((prev) => [data.data, ...prev]);
      setForm({ titulo: '', categoria: 'otro', fechaLimite: '' });
    } catch (e) {
      toast({ title: 'Error', description: 'No se pudo crear el recordatorio.', variant: 'destructive' });
    }
  };
  const toggleReminder = async (rem) => {
    try {
      const { data } = await api.put(`/reminders/${rem._id}`, { completado: !rem.completado });
      setReminders((prev) => prev.map((r) => (r._id === rem._id ? data.data : r)));
    } catch (e) { /* noop */ }
  };
  const deleteReminder = async (id) => {
    try {
      await api.delete(`/reminders/${id}`);
      setReminders((prev) => prev.filter((r) => r._id !== id));
    } catch (e) { /* noop */ }
  };

  const diasRestantes = (fecha) => {
    if (!fecha) return null;
    return Math.ceil((new Date(fecha) - new Date()) / (1000 * 60 * 60 * 24));
  };

  // Promedios de vitalidad de la última semana.
  const avg = (key) => {
    const vals = recent.map((e) => e[key]).filter((v) => typeof v === 'number');
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <>
      <Helmet><title>Bitácora - ConnectONE</title></Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-purple-300" />
            Bitácora de Alto Rendimiento
          </h1>
          <p className="text-purple-200 mt-2">
            Cierra tu día, mide tu vitalidad y no olvides lo importante. Lo que se mide, mejora.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-purple-200 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Cargando tu bitácora...
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* ── Cierre de Día ── */}
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Moon className="w-5 h-5 text-purple-300" /> Cierre de Día
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-purple-200 text-sm mb-1.5 block">¿Qué aprendí hoy?</label>
                  <Textarea
                    value={journal.aprendizaje}
                    onChange={(e) => set('aprendizaje', e.target.value)}
                    placeholder="Una idea, lección o avance del día..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[70px]"
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-1.5 block">¿Qué agradezco hoy?</label>
                  <Textarea
                    value={journal.gratitud}
                    onChange={(e) => set('gratitud', e.target.value)}
                    placeholder="Algo, alguien o un momento..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[60px]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> Concentración</label>
                    <Rating value={journal.concentracion} onChange={(v) => set('concentracion', v)} activeClass="from-blue-500 to-cyan-500" />
                  </div>
                  <div>
                    <label className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> Sueño</label>
                    <Rating value={journal.calidadSueno} onChange={(v) => set('calidadSueno', v)} activeClass="from-indigo-500 to-purple-500" />
                  </div>
                  <div>
                    <label className="text-purple-200 text-xs mb-1.5 flex items-center gap-1"><HeartPulse className="w-3.5 h-3.5" /> Estrés</label>
                    <Rating value={journal.nivelEstres} onChange={(v) => set('nivelEstres', v)} activeClass="from-orange-500 to-red-500" />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button onClick={guardarCierre} disabled={saving}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Guardar cierre
                  </Button>
                  <Button onClick={pedirReflexion} disabled={reflecting} variant="outline"
                    className="border-purple-500/40 text-purple-200 hover:bg-purple-800/40">
                    {reflecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span className="ml-1.5">Reflexión IA</span>
                  </Button>
                </div>

                <AnimatePresence>
                  {journal.reflexionIA && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4"
                    >
                      <p className="text-purple-200 text-sm flex gap-2">
                        <Sparkles className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                        <span className="whitespace-pre-wrap">{journal.reflexionIA}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* ── Vitalidad (tendencia 7 días) + Gestión Práctica ── */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-rose-300" /> Vitalidad · últimos 7 días
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recent.length === 0 ? (
                    <p className="text-purple-300/60 text-sm">Registra tu cierre de día para ver tendencias.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { k: 'calidadSueno', label: 'Sueño', color: 'text-indigo-300' },
                        { k: 'concentracion', label: 'Concentración', color: 'text-cyan-300' },
                        { k: 'nivelEstres', label: 'Estrés', color: 'text-orange-300' }
                      ].map((m) => (
                        <div key={m.k} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                          <p className={`text-2xl font-bold ${m.color}`}>{avg(m.k) ?? '—'}</p>
                          <p className="text-purple-300/70 text-xs mt-1">{m.label}</p>
                          <p className="text-purple-400/40 text-[10px]">promedio /5</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <CalendarClock className="w-5 h-5 text-amber-300" /> Gestión Práctica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Form de nuevo recordatorio */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      value={form.titulo}
                      onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && addReminder()}
                      placeholder="Ej. Cambio de aceite moto"
                      className="h-9 flex-1 min-w-[10rem] bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                    />
                    <select
                      value={form.categoria}
                      onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                      className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2"
                    >
                      {Object.entries(CATEGORIAS).map(([k, v]) => (
                        <option key={k} value={k}>{v.emoji} {v.label}</option>
                      ))}
                    </select>
                    <Input
                      type="date"
                      value={form.fechaLimite}
                      onChange={(e) => setForm((f) => ({ ...f, fechaLimite: e.target.value }))}
                      className="h-9 w-36 bg-white/5 border-white/10 text-white"
                    />
                    <Button onClick={addReminder} className="h-9 w-9 p-0 rounded-lg bg-purple-600 hover:bg-purple-500 shrink-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Lista */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {reminders.length === 0 && (
                      <p className="text-purple-300/60 text-sm">Sin recordatorios. Añade el primero arriba.</p>
                    )}
                    {reminders.map((r) => {
                      const dias = diasRestantes(r.fechaLimite);
                      const vencido = dias !== null && dias < 0 && !r.completado;
                      const pronto = dias !== null && dias >= 0 && dias <= 7 && !r.completado;
                      return (
                        <div key={r._id}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 border
                            ${r.completado ? 'bg-white/5 border-white/5 opacity-60'
                              : vencido ? 'bg-red-500/10 border-red-500/30'
                              : 'bg-white/5 border-white/10'}`}>
                          <button onClick={() => toggleReminder(r)} className="shrink-0">
                            {r.completado ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Circle className="w-5 h-5 text-purple-400" />}
                          </button>
                          <span className="text-lg shrink-0">{CATEGORIAS[r.categoria]?.emoji || '📌'}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm truncate ${r.completado ? 'text-purple-300/50 line-through' : 'text-white'}`}>{r.titulo}</p>
                            {r.fechaLimite && (
                              <p className={`text-xs flex items-center gap-1 ${vencido ? 'text-red-300' : pronto ? 'text-amber-300' : 'text-purple-300/60'}`}>
                                {vencido && <AlertTriangle className="w-3 h-3" />}
                                {new Date(r.fechaLimite).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                                {!r.completado && dias !== null && (vencido ? ` · vencido` : ` · en ${dias}d`)}
                              </p>
                            )}
                          </div>
                          <button onClick={() => deleteReminder(r._id)} className="text-purple-300/40 hover:text-red-400 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BitacoraPage;
