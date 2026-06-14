import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import { Dumbbell, Plus, Trash2, Loader2, TrendingDown, Target, Weight } from 'lucide-react';
import api from '@/services/api';

const OBJETIVOS = {
  perder_grasa: 'Perder grasa',
  ganar_musculo: 'Ganar músculo',
  mantener: 'Mantener',
  rendimiento: 'Rendimiento'
};

// Gráfica de peso (SVG, sin librerías).
const WeightChart = ({ registros }) => {
  if (!registros || registros.length < 2) {
    return <p className="text-purple-300/50 text-sm py-4 text-center">Registra al menos 2 pesos para ver tu evolución.</p>;
  }
  const pesos = registros.map((r) => r.peso);
  const min = Math.min(...pesos), max = Math.max(...pesos), range = max - min || 1;
  const W = 320, H = 90, pad = 6;
  const pts = registros.map((r, i) => {
    const x = pad + (i / (registros.length - 1)) * (W - 2 * pad);
    const y = pad + (1 - (r.peso - min) / range) * (H - 2 * pad);
    return [x, y];
  });
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 90 }}>
        <polyline fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts.map((p) => p.join(',')).join(' ')} />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="#a78bfa" />)}
      </svg>
      <div className="flex justify-between text-[10px] text-purple-300/60">
        <span>{registros[0].peso} kg</span>
        <span>{registros[registros.length - 1].peso} kg</span>
      </div>
    </div>
  );
};

const FitnessTab = () => {
  const { toast } = useToast();
  const { updateStats } = useData();
  const [f, setF] = useState(null);
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState({ objetivo: 'mantener', pesoObjetivo: '', altura: '' });
  const [nuevoPeso, setNuevoPeso] = useState('');
  const [entreno, setEntreno] = useState({ tipo: '', duracionMin: '' });

  const load = async () => {
    try {
      const { data } = await api.get('/fitness');
      setF(data.data);
      setPerfil({ objetivo: data.data.objetivo || 'mantener', pesoObjetivo: data.data.pesoObjetivo || '', altura: data.data.altura || '' });
    } catch (e) { console.error(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const guardarPerfil = async () => {
    try {
      const { data } = await api.put('/fitness', { objetivo: perfil.objetivo, pesoObjetivo: perfil.pesoObjetivo ? Number(perfil.pesoObjetivo) : null, altura: perfil.altura ? Number(perfil.altura) : null });
      setF(data.data);
      toast({ title: '✅ Objetivo guardado' });
    } catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  const addPeso = async () => {
    const peso = Number(nuevoPeso);
    if (!peso || peso <= 0) return;
    try { const { data } = await api.post('/fitness/registro', { peso }); setF(data.data); setNuevoPeso(''); }
    catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  const addEntreno = async () => {
    if (!entreno.tipo.trim()) return;
    try {
      const { data } = await api.post('/fitness/entrenamiento', { tipo: entreno.tipo.trim(), duracionMin: Number(entreno.duracionMin) || 0 });
      setF(data.data);
      setEntreno({ tipo: '', duracionMin: '' });
      toast({ title: '+30 XP 💪', description: 'Entrenamiento registrado' });
      if (data.experiencia != null) updateStats({ xp: data.experiencia });
    } catch (e) { toast({ title: 'Error', variant: 'destructive' }); }
  };

  if (loading) return <div className="flex justify-center py-12 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando...</div>;

  const registros = f?.registros || [];
  const pesoActual = registros.length ? registros[registros.length - 1].peso : null;
  const cambio = registros.length >= 2 ? +(pesoActual - registros[0].peso).toFixed(1) : null;
  const imc = pesoActual && f?.altura ? +(pesoActual / Math.pow(f.altura / 100, 2)).toFixed(1) : null;
  const aObjetivo = pesoActual && f?.pesoObjetivo ? +(pesoActual - f.pesoObjetivo).toFixed(1) : null;
  const entrenosSemana = (f?.entrenamientos || []).filter((e) => (Date.now() - new Date(e.fecha)) < 7 * 864e5).length;

  return (
    <div className="space-y-4">
      {/* Objetivo */}
      <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
        <CardContent className="p-4">
          <p className="text-purple-200 text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Tu objetivo</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <select value={perfil.objetivo} onChange={(e) => setPerfil((p) => ({ ...p, objetivo: e.target.value }))} className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2 col-span-2">
              {Object.entries(OBJETIVOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <Input type="number" value={perfil.pesoObjetivo} onChange={(e) => setPerfil((p) => ({ ...p, pesoObjetivo: e.target.value }))} placeholder="Meta kg" className="h-9 bg-white/5 border-white/10 text-white" />
            <Input type="number" value={perfil.altura} onChange={(e) => setPerfil((p) => ({ ...p, altura: e.target.value }))} placeholder="Altura cm" className="h-9 bg-white/5 border-white/10 text-white" />
          </div>
          <Button onClick={guardarPerfil} size="sm" className="mt-2 bg-purple-600 hover:bg-purple-500">Guardar objetivo</Button>
        </CardContent>
      </Card>

      {/* Stats + gráfica */}
      <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="bg-white/5 rounded-xl p-3 text-center"><Weight className="w-4 h-4 mx-auto text-cyan-300 mb-1" /><p className="text-xl font-bold text-white">{pesoActual ?? '—'}</p><p className="text-[10px] text-purple-300/70">kg actual</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><TrendingDown className="w-4 h-4 mx-auto text-green-300 mb-1" /><p className={`text-xl font-bold ${cambio < 0 ? 'text-green-300' : 'text-white'}`}>{cambio != null ? (cambio > 0 ? '+' : '') + cambio : '—'}</p><p className="text-[10px] text-purple-300/70">cambio total</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><Target className="w-4 h-4 mx-auto text-amber-300 mb-1" /><p className="text-xl font-bold text-white">{aObjetivo != null ? aObjetivo : '—'}</p><p className="text-[10px] text-purple-300/70">kg a meta</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><Dumbbell className="w-4 h-4 mx-auto text-purple-300 mb-1" /><p className="text-xl font-bold text-white">{imc ?? '—'}</p><p className="text-[10px] text-purple-300/70">IMC</p></div>
          </div>
          <WeightChart registros={registros} />
          <div className="flex gap-2 mt-3">
            <Input type="number" value={nuevoPeso} onChange={(e) => setNuevoPeso(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPeso()} placeholder="Registrar peso de hoy (kg)" className="h-9 bg-white/5 border-white/10 text-white" />
            <Button onClick={addPeso} className="h-9 bg-gradient-to-r from-cyan-600 to-purple-600 shrink-0"><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Entrenamientos */}
      <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
        <CardContent className="p-4">
          <p className="text-purple-200 text-sm mb-2 flex items-center justify-between"><span className="flex items-center gap-2"><Dumbbell className="w-4 h-4" /> Entrenamientos</span><span className="text-xs text-purple-300/70">{entrenosSemana} esta semana</span></p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Input value={entreno.tipo} onChange={(e) => setEntreno((s) => ({ ...s, tipo: e.target.value }))} placeholder="Tipo (ej. Pierna, Cardio)" className="h-9 flex-1 min-w-[8rem] bg-white/5 border-white/10 text-white" />
            <Input type="number" value={entreno.duracionMin} onChange={(e) => setEntreno((s) => ({ ...s, duracionMin: e.target.value }))} placeholder="Min" className="h-9 w-20 bg-white/5 border-white/10 text-white" />
            <Button onClick={addEntreno} className="h-9 bg-gradient-to-r from-purple-600 to-pink-600 shrink-0"><Plus className="w-4 h-4 mr-1" /> Registrar</Button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {(f?.entrenamientos || []).length === 0 && <p className="text-purple-300/50 text-sm">Aún no registras entrenamientos.</p>}
            {(f?.entrenamientos || []).map((e, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                <Dumbbell className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-white flex-1">{e.tipo}{e.duracionMin ? ` · ${e.duracionMin} min` : ''}</span>
                <span className="text-purple-300/50 text-xs">{new Date(e.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessTab;
