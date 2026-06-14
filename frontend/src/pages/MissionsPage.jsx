import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import {
  Target, Plus, Sparkles, Loader2, CheckCircle, Trash2, Zap, MapPin, Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

const CAT = {
  aventura: { emoji: '🧭', label: 'Aventura' },
  naturaleza: { emoji: '🌲', label: 'Naturaleza' },
  fitness: { emoji: '🏋️', label: 'Fitness' },
  social: { emoji: '🤝', label: 'Social' },
  creatividad: { emoji: '🎨', label: 'Creatividad' },
  aprendizaje: { emoji: '📚', label: 'Aprendizaje' },
  hogar: { emoji: '🏠', label: 'Hogar' },
  mente: { emoji: '🧠', label: 'Mente' },
  otro: { emoji: '⭐', label: 'Otro' }
};
const CTX = {
  aire_libre: { emoji: '☀️', label: 'Al aire libre' },
  casa: { emoji: '🏠', label: 'En casa' },
  ciudad: { emoji: '🏙️', label: 'En la ciudad' },
  cualquiera: { emoji: '🌍', label: 'Donde sea' }
};
const DIF = {
  facil: { label: 'Fácil', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
  media: { label: 'Media', color: 'bg-amber-500/20 text-amber-200 border-amber-500/30' },
  dificil: { label: 'Difícil', color: 'bg-red-500/20 text-red-200 border-red-500/30' }
};

const emptyForm = { titulo: '', descripcion: '', categoria: 'aventura', contexto: 'aire_libre', dificultad: 'media', duracion: '', distanciaKm: '', xp: 150 };

const MissionsPage = () => {
  const { toast } = useToast();
  const { updateStats } = useData();
  const [retos, setRetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ categoria: 'todas', contexto: 'todos', estado: 'pendientes' });
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [lugar, setLugar] = useState('');
  const [suggesting, setSuggesting] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/retos');
      setRetos(data?.data || []);
    } catch (e) {
      console.error('Error cargando retos:', e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const completar = async (reto) => {
    try {
      const { data } = await api.post(`/retos/${reto._id}/completar`);
      setRetos((p) => p.map((r) => (r._id === reto._id ? data.data.reto : r)));
      confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 }, colors: ['#10B981', '#F59E0B', '#9333EA'] });
      toast({ title: `+${data.data.xpGanado} XP 🎉`, description: `Reto completado: ${reto.titulo}` });
      if (data.data.experiencia != null) updateStats({ xp: data.data.experiencia });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo completar.', variant: 'destructive' });
    }
  };

  const eliminar = async (id) => {
    try { await api.delete(`/retos/${id}`); setRetos((p) => p.filter((r) => r._id !== id)); } catch (e) { /* noop */ }
  };

  const agregar = async () => {
    if (!form.titulo.trim()) return;
    try {
      const { data } = await api.post('/retos', {
        ...form,
        distanciaKm: form.distanciaKm ? Number(form.distanciaKm) : null,
        xp: Number(form.xp) || 100
      });
      setRetos((p) => [data.data, ...p]);
      setForm(emptyForm);
      setShowAdd(false);
      toast({ title: '✅ Reto añadido' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo crear.', variant: 'destructive' });
    }
  };

  const sugerir = async () => {
    setSuggesting(true);
    try {
      const { data } = await api.post('/retos/sugerir', { lugar, cantidad: 5 });
      setRetos((p) => [...data.data, ...p]);
      toast({ title: '✨ Retos sugeridos', description: `${data.data.length} retos nuevos para ti` });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo sugerir.', variant: 'destructive' });
    } finally {
      setSuggesting(false);
    }
  };

  const filtrados = retos.filter((r) => {
    if (filtros.estado === 'pendientes' && r.completado) return false;
    if (filtros.estado === 'completados' && !r.completado) return false;
    if (filtros.categoria !== 'todas' && r.categoria !== filtros.categoria) return false;
    if (filtros.contexto !== 'todos' && r.contexto !== filtros.contexto) return false;
    return true;
  });
  const pendientes = retos.filter((r) => !r.completado).length;
  const completados = retos.filter((r) => r.completado).length;
  const xpTotal = retos.filter((r) => r.completado).reduce((a, r) => a + (r.xp || 0), 0);

  return (
    <>
      <Helmet><title>Retos - ConnectONE</title></Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Target className="w-7 h-7 text-purple-300" /> Retos</h1>
          <p className="text-purple-200 mt-2">Desafíos opcionales para tus días libres. Sin fecha fija — hazlos cuando tengas tiempo.</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-purple-200">🎯 {pendientes} pendientes</span>
            <span className="text-green-300">✓ {completados} completados</span>
            <span className="text-yellow-300">⚡ {xpTotal} XP ganados</span>
          </div>
        </div>

        {/* Acciones: sugerir IA + añadir */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-300 shrink-0" />
              <Input value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="¿Dónde estás? (ej. Garzón, Huila) — opcional"
                className="h-10 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40" />
            </div>
            <Button onClick={sugerir} disabled={suggesting} className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
              {suggesting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} Sugerir con IA
            </Button>
            <Button onClick={() => setShowAdd((s) => !s)} variant="outline" className="h-10 border-purple-500/40 text-purple-200 hover:bg-purple-800/40">
              <Plus className="w-4 h-4 mr-1.5" /> Añadir reto
            </Button>
          </CardContent>

          {/* Form añadir */}
          <AnimatePresence>
            {showAdd && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="p-4 pt-0 space-y-3">
                  <Input value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} placeholder="Título del reto" className="h-10 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40" />
                  <Textarea value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción (opcional)" className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[50px]" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <select value={form.categoria} onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))} className="h-10 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2">
                      {Object.entries(CAT).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
                    </select>
                    <select value={form.contexto} onChange={(e) => setForm((f) => ({ ...f, contexto: e.target.value }))} className="h-10 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2">
                      {Object.entries(CTX).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                    <select value={form.dificultad} onChange={(e) => setForm((f) => ({ ...f, dificultad: e.target.value }))} className="h-10 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2">
                      {Object.entries(DIF).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                    <Input type="number" value={form.xp} onChange={(e) => setForm((f) => ({ ...f, xp: e.target.value }))} placeholder="XP" className="h-10 bg-white/5 border-white/10 text-white" />
                  </div>
                  <Button onClick={agregar} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"><Plus className="w-4 h-4 mr-1.5" /> Crear reto</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-purple-300" />
          {['pendientes', 'completados', 'todos'].map((e) => (
            <button key={e} onClick={() => setFiltros((f) => ({ ...f, estado: e }))}
              className={`text-sm px-3 py-1 rounded-full capitalize transition-all ${filtros.estado === e ? 'bg-purple-600 text-white' : 'bg-white/5 text-purple-300 hover:bg-white/10'}`}>{e}</button>
          ))}
          <span className="w-px h-5 bg-white/10 mx-1" />
          <select value={filtros.categoria} onChange={(e) => setFiltros((f) => ({ ...f, categoria: e.target.value }))} className="h-8 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2">
            <option value="todas">Toda categoría</option>
            {Object.entries(CAT).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
          </select>
          <select value={filtros.contexto} onChange={(e) => setFiltros((f) => ({ ...f, contexto: e.target.value }))} className="h-8 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2">
            <option value="todos">Todo contexto</option>
            {Object.entries(CTX).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        {/* Grid de retos */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando retos...</div>
        ) : filtrados.length === 0 ? (
          <p className="text-center text-purple-300/60 py-10">No hay retos con esos filtros. Prueba "Sugerir con IA" o añade uno. ✨</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtrados.map((r) => (
                <motion.div key={r._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <Card className={`h-full border ${r.completado ? 'bg-green-500/10 border-green-500/30' : 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30'}`}>
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-3xl">{CAT[r.categoria]?.emoji || '⭐'}</span>
                        <div className="flex items-center gap-1.5">
                          <Badge className="bg-yellow-500/20 text-yellow-300"><Zap className="w-3 h-3 mr-1" />{r.xp} XP</Badge>
                          {r.personalizado && (
                            <button onClick={() => eliminar(r._id)} className="text-purple-300/40 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                          )}
                        </div>
                      </div>
                      <h3 className={`font-bold text-white mb-1 ${r.completado ? 'line-through opacity-70' : ''}`}>{r.titulo}</h3>
                      {r.descripcion && <p className="text-purple-200 text-sm mb-3 flex-1">{r.descripcion}</p>}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-200">{CTX[r.contexto]?.emoji} {CTX[r.contexto]?.label}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border ${DIF[r.dificultad]?.color}`}>{DIF[r.dificultad]?.label}</span>
                        {r.distanciaKm ? <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-200">📏 {r.distanciaKm} km</span> : null}
                        {r.duracion ? <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-200">⏱️ {r.duracion}</span> : null}
                      </div>
                      {r.completado ? (
                        <div className="flex items-center gap-1.5 text-green-300 text-sm font-semibold mt-auto"><CheckCircle className="w-4 h-4" /> Completado</div>
                      ) : (
                        <Button onClick={() => completar(r)} className="mt-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold">
                          <CheckCircle className="w-4 h-4 mr-1.5" /> Completar reto
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};

export default MissionsPage;
