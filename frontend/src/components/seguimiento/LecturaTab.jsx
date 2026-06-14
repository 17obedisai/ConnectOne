import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import { BookMarked, Plus, Trash2, Loader2, Check, MessageSquarePlus, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

const LecturaTab = () => {
  const { toast } = useToast();
  const { updateStats } = useData();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ titulo: '', autor: '', paginasTotal: '' });
  const [pagina, setPagina] = useState({});
  const [notaTexto, setNotaTexto] = useState({});
  const [expandido, setExpandido] = useState(null);

  const load = async () => {
    try { const { data } = await api.get('/libros'); setLibros(data?.data || []); }
    catch (e) { console.error(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const crear = async () => {
    if (!form.titulo.trim()) return;
    try {
      const { data } = await api.post('/libros', { ...form, paginasTotal: Number(form.paginasTotal) || 0 });
      setLibros((l) => [data.data, ...l]);
      setForm({ titulo: '', autor: '', paginasTotal: '' });
    } catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  const actualizar = async (id, campos, libro) => {
    try {
      const { data } = await api.put(`/libros/${id}`, campos);
      setLibros((l) => l.map((x) => (x._id === id ? data.data : x)));
      if (data.xpGanado) {
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 }, colors: ['#10B981', '#F59E0B', '#9333EA'] });
        toast({ title: `+${data.xpGanado} XP 📚`, description: `¡Terminaste "${data.data.titulo}"!` });
        if (data.experiencia != null) updateStats({ xp: data.experiencia });
      }
    } catch (e) { /* noop */ }
  };

  const addNota = async (id) => {
    const texto = (notaTexto[id] || '').trim();
    if (!texto) return;
    try { const { data } = await api.post(`/libros/${id}/nota`, { texto }); setLibros((l) => l.map((x) => (x._id === id ? data.data : x))); setNotaTexto((s) => ({ ...s, [id]: '' })); }
    catch (e) { /* noop */ }
  };

  const eliminar = async (id) => {
    try { await api.delete(`/libros/${id}`); setLibros((l) => l.filter((x) => x._id !== id)); } catch (e) { /* noop */ }
  };

  if (loading) return <div className="flex justify-center py-12 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando...</div>;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
        <CardContent className="p-4 space-y-2">
          <Input value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} placeholder="Título del libro" className="h-10 bg-white/5 border-white/10 text-white" />
          <div className="flex gap-2">
            <Input value={form.autor} onChange={(e) => setForm((f) => ({ ...f, autor: e.target.value }))} placeholder="Autor" className="h-10 flex-1 bg-white/5 border-white/10 text-white" />
            <Input type="number" value={form.paginasTotal} onChange={(e) => setForm((f) => ({ ...f, paginasTotal: e.target.value }))} placeholder="Págs." className="h-10 w-24 bg-white/5 border-white/10 text-white" />
            <Button onClick={crear} className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 shrink-0"><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {libros.length === 0 ? (
        <p className="text-center text-purple-300/60 py-8">Sin libros aún. Añade el que estás leyendo. 📖</p>
      ) : libros.map((l) => {
        const pct = l.paginasTotal ? Math.min(Math.round((l.paginaActual / l.paginasTotal) * 100), 100) : 0;
        const abierto = expandido === l._id;
        return (
          <Card key={l._id} className={`border ${l.estado === 'terminado' ? 'bg-green-500/10 border-green-500/30' : 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30'}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <BookMarked className="w-5 h-5 text-amber-300 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-white font-bold truncate">{l.titulo}</h3>
                    {l.autor && <p className="text-purple-300/70 text-xs">{l.autor}</p>}
                  </div>
                </div>
                <button onClick={() => eliminar(l._id)} className="text-purple-300/40 hover:text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>

              {l.paginasTotal > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1"><span className="text-purple-300/70">Pág. {l.paginaActual}/{l.paginasTotal}</span><span className="text-purple-200 font-semibold">{pct}%</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                </div>
              )}

              {/* Actualizar página */}
              <div className="flex items-center gap-2 mt-3">
                <Input type="number" value={pagina[l._id] ?? ''} onChange={(e) => setPagina((s) => ({ ...s, [l._id]: e.target.value }))} placeholder={`Voy en la pág. ${l.paginaActual}`} className="h-9 flex-1 bg-white/5 border-white/10 text-white" />
                <Button onClick={() => { const p = Number(pagina[l._id]); if (p >= 0) actualizar(l._id, { paginaActual: p }, l); setPagina((s) => ({ ...s, [l._id]: '' })); }} className="h-9 bg-amber-600 hover:bg-amber-500 shrink-0">Actualizar</Button>
                {l.estado !== 'terminado' && (
                  <Button onClick={() => actualizar(l._id, { estado: 'terminado' }, l)} variant="outline" className="h-9 border-green-500/40 text-green-300 hover:bg-green-500/10 shrink-0"><Check className="w-4 h-4" /></Button>
                )}
              </div>

              {/* Notas */}
              <div className="flex gap-2 mt-2">
                <Input value={notaTexto[l._id] || ''} onChange={(e) => setNotaTexto((s) => ({ ...s, [l._id]: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && addNota(l._id)} placeholder="Nota o idea del libro..." className="h-9 flex-1 bg-white/5 border-white/10 text-white" />
                <Button onClick={() => addNota(l._id)} className="h-9 bg-purple-600 hover:bg-purple-500 shrink-0"><MessageSquarePlus className="w-4 h-4" /></Button>
              </div>

              {l.notas?.length > 0 && (
                <>
                  <button onClick={() => setExpandido(abierto ? null : l._id)} className="text-purple-300/70 hover:text-white text-xs flex items-center gap-1 mt-2">
                    {abierto ? 'Ocultar' : 'Ver'} notas ({l.notas.length}) <ChevronDown className={`w-3.5 h-3.5 transition-transform ${abierto ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {abierto && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-1 mt-2 pl-2 border-l border-purple-500/30">
                          {l.notas.map((n, i) => <div key={i} className="text-sm"><span className="text-purple-400/50 text-[10px] mr-2">pág {n.pagina}</span><span className="text-purple-100">{n.texto}</span></div>)}
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

export default LecturaTab;
