import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import { FolderKanban, Plus, Trash2, Loader2, ChevronDown, History } from 'lucide-react';
import api from '@/services/api';

const ESTADOS = { activo: { label: 'Activo', color: 'text-green-300' }, pausado: { label: 'Pausado', color: 'text-amber-300' }, terminado: { label: 'Terminado', color: 'text-purple-300' } };

const ProyectosTab = () => {
  const { toast } = useToast();
  const { updateStats } = useData();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [expandido, setExpandido] = useState(null);
  const [avanceTexto, setAvanceTexto] = useState({});

  const load = async () => {
    try { const { data } = await api.get('/proyectos'); setProyectos(data?.data || []); }
    catch (e) { console.error(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const crear = async () => {
    if (!form.nombre.trim()) return;
    try { const { data } = await api.post('/proyectos', form); setProyectos((p) => [data.data, ...p]); setForm({ nombre: '', descripcion: '' }); }
    catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  const actualizar = async (id, campos) => {
    try { const { data } = await api.put(`/proyectos/${id}`, campos); setProyectos((p) => p.map((x) => (x._id === id ? data.data : x))); }
    catch (e) { /* noop */ }
  };

  const addAvance = async (p) => {
    const texto = (avanceTexto[p._id] || '').trim();
    if (!texto) return;
    try {
      const { data } = await api.post(`/proyectos/${p._id}/avance`, { texto });
      setProyectos((prev) => prev.map((x) => (x._id === p._id ? data.data : x)));
      setAvanceTexto((s) => ({ ...s, [p._id]: '' }));
      toast({ title: '+20 XP 🚀', description: 'Avance registrado' });
      if (data.experiencia != null) updateStats({ xp: data.experiencia });
    } catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  const eliminar = async (id) => {
    try { await api.delete(`/proyectos/${id}`); setProyectos((p) => p.filter((x) => x._id !== id)); } catch (e) { /* noop */ }
  };

  if (loading) return <div className="flex justify-center py-12 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando...</div>;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
        <CardContent className="p-4 space-y-2">
          <Input value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} placeholder="Nombre del proyecto (ej. ConnectONE, Canción nueva)" className="h-10 bg-white/5 border-white/10 text-white" />
          <div className="flex gap-2">
            <Input value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && crear()} placeholder="Descripción (opcional)" className="h-10 flex-1 bg-white/5 border-white/10 text-white" />
            <Button onClick={crear} className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 shrink-0"><Plus className="w-4 h-4 mr-1" /> Crear</Button>
          </div>
        </CardContent>
      </Card>

      {proyectos.length === 0 ? (
        <p className="text-center text-purple-300/60 py-8">Sin proyectos aún. Crea el primero. 🚀</p>
      ) : proyectos.map((p) => {
        const ultimo = p.avances?.[0];
        const abierto = expandido === p._id;
        return (
          <Card key={p._id} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FolderKanban className="w-5 h-5 text-cyan-300 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-white font-bold truncate">{p.nombre}</h3>
                    {p.descripcion && <p className="text-purple-300/70 text-xs">{p.descripcion}</p>}
                  </div>
                </div>
                <button onClick={() => eliminar(p._id)} className="text-purple-300/40 hover:text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>

              {/* Progreso + estado */}
              <div className="flex items-center gap-2 mt-3">
                <input type="range" min="0" max="100" value={p.progreso} onChange={(e) => actualizar(p._id, { progreso: Number(e.target.value) })} className="flex-1 accent-purple-500" />
                <span className="text-white font-bold text-sm w-10 text-right">{p.progreso}%</span>
                <select value={p.estado} onChange={(e) => actualizar(p._id, { estado: e.target.value })} className={`h-8 rounded-lg bg-slate-800 border border-white/10 text-sm px-2 ${ESTADOS[p.estado]?.color}`}>
                  {Object.entries(ESTADOS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>

              {/* Dónde quedé */}
              {ultimo && (
                <div className="mt-3 bg-white/5 border border-white/10 rounded-lg p-2.5">
                  <p className="text-[10px] text-purple-300/60 uppercase tracking-wide">Dónde quedé</p>
                  <p className="text-purple-100 text-sm">{ultimo.texto}</p>
                  <p className="text-purple-400/40 text-[10px] mt-0.5">{new Date(ultimo.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</p>
                </div>
              )}

              {/* Añadir avance */}
              <div className="flex gap-2 mt-3">
                <Input value={avanceTexto[p._id] || ''} onChange={(e) => setAvanceTexto((s) => ({ ...s, [p._id]: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && addAvance(p)} placeholder="¿Qué avanzaste hoy?" className="h-9 flex-1 bg-white/5 border-white/10 text-white" />
                <Button onClick={() => addAvance(p)} className="h-9 bg-purple-600 hover:bg-purple-500 shrink-0"><Plus className="w-4 h-4" /></Button>
              </div>

              {/* Historial de avances */}
              {p.avances?.length > 1 && (
                <>
                  <button onClick={() => setExpandido(abierto ? null : p._id)} className="text-purple-300/70 hover:text-white text-xs flex items-center gap-1 mt-2">
                    <History className="w-3.5 h-3.5" /> {abierto ? 'Ocultar' : 'Ver'} historial ({p.avances.length}) <ChevronDown className={`w-3.5 h-3.5 transition-transform ${abierto ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {abierto && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-1 mt-2 pl-2 border-l border-purple-500/30">
                          {p.avances.map((a, i) => (
                            <div key={i} className="text-sm"><span className="text-purple-400/50 text-[10px] mr-2">{new Date(a.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</span><span className="text-purple-100">{a.texto}</span></div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProyectosTab;
