import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarClock, Plus, CheckCircle, Circle, Trash2, AlertTriangle } from 'lucide-react';
import api from '@/services/api';

const CATEGORIAS = {
  moto: '🏍️', documento: '📄', salud: '🩺', finanzas: '💰', hogar: '🏠', otro: '📌'
};

const Recordatorios = () => {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({ titulo: '', categoria: 'otro', fechaLimite: '' });

  const cargar = async () => {
    try {
      const { data } = await api.get('/reminders');
      setReminders(data?.data || []);
    } catch (e) { /* noop */ }
  };

  useEffect(() => {
    cargar();
    const onRefresh = () => cargar();
    window.addEventListener('connectone:refresh', onRefresh);
    return () => window.removeEventListener('connectone:refresh', onRefresh);
  }, []);

  const add = async () => {
    if (!form.titulo.trim()) return;
    try {
      const { data } = await api.post('/reminders', { titulo: form.titulo.trim(), categoria: form.categoria, fechaLimite: form.fechaLimite || null });
      setReminders((p) => [data.data, ...p]);
      setForm({ titulo: '', categoria: 'otro', fechaLimite: '' });
    } catch (e) { /* noop */ }
  };
  const toggle = async (r) => {
    try {
      const { data } = await api.put(`/reminders/${r._id}`, { completado: !r.completado });
      setReminders((p) => p.map((x) => (x._id === r._id ? data.data : x)));
    } catch (e) { /* noop */ }
  };
  const del = async (id) => {
    try { await api.delete(`/reminders/${id}`); setReminders((p) => p.filter((x) => x._id !== id)); } catch (e) { /* noop */ }
  };

  const dias = (f) => (f ? Math.ceil((new Date(f) - new Date()) / 86400000) : null);

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-amber-300" /> Recordatorios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={form.titulo}
            onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Ej. Cambio de aceite moto"
            className="h-9 flex-1 min-w-[10rem] bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
          />
          <select
            value={form.categoria}
            onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
            className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2"
          >
            {Object.entries(CATEGORIAS).map(([k, e]) => <option key={k} value={k}>{e} {k}</option>)}
          </select>
          <Input
            type="date"
            value={form.fechaLimite}
            onChange={(e) => setForm((f) => ({ ...f, fechaLimite: e.target.value }))}
            className="h-9 w-36 bg-white/5 border-white/10 text-white"
          />
          <Button onClick={add} className="h-9 w-9 p-0 rounded-lg bg-purple-600 hover:bg-purple-500 shrink-0"><Plus className="w-4 h-4" /></Button>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {reminders.length === 0 && <p className="text-purple-300/60 text-sm">Sin recordatorios. Añade el primero arriba.</p>}
          {reminders.map((r) => {
            const d = dias(r.fechaLimite);
            const vencido = d !== null && d < 0 && !r.completado;
            const pronto = d !== null && d >= 0 && d <= 7 && !r.completado;
            return (
              <div key={r._id} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${r.completado ? 'bg-white/5 border-white/5 opacity-60' : vencido ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
                <button onClick={() => toggle(r)} className="shrink-0">
                  {r.completado ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Circle className="w-5 h-5 text-purple-400" />}
                </button>
                <span className="text-lg shrink-0">{CATEGORIAS[r.categoria] || '📌'}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${r.completado ? 'text-purple-300/50 line-through' : 'text-white'}`}>{r.titulo}</p>
                  {r.fechaLimite && (
                    <p className={`text-xs flex items-center gap-1 ${vencido ? 'text-red-300' : pronto ? 'text-amber-300' : 'text-purple-300/60'}`}>
                      {vencido && <AlertTriangle className="w-3 h-3" />}
                      {new Date(r.fechaLimite).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                      {!r.completado && d !== null && (vencido ? ' · vencido' : ` · en ${d}d`)}
                    </p>
                  )}
                </div>
                <button onClick={() => del(r._id)} className="text-purple-300/40 hover:text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recordatorios;
