import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Wallet, TrendingUp, TrendingDown, Plus, Trash2, Target,
  Loader2, ArrowUpCircle, ArrowDownCircle, PiggyBank, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
    .format(Number(n) || 0);

const GASTO_CATS = ['comida', 'transporte', 'equipos', 'educacion', 'suscripciones', 'ocio', 'salud', 'hogar', 'otro'];
const INGRESO_CATS = ['salario', 'freelance', 'venta', 'otro'];
const GOAL_CATS = { equipo: '🎛️', plugin: '🎚️', hardware: '🖥️', educacion: '🎓', software: '💿', otro: '🎯' };

const FinanzasPage = () => {
  const { toast } = useToast();
  const [summary, setSummary] = useState({ ingresos: 0, gastos: 0, balance: 0, porCategoria: {} });
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txForm, setTxForm] = useState({ tipo: 'gasto', monto: '', categoria: 'comida', descripcion: '' });
  const [goalForm, setGoalForm] = useState({ nombre: '', montoObjetivo: '', categoria: 'equipo', fechaObjetivo: '' });
  const [aportes, setAportes] = useState({});

  const loadFinance = async () => {
    try {
      const [s, t, g] = await Promise.allSettled([
        api.get('/finance/summary'),
        api.get('/finance/transactions'),
        api.get('/finance/goals')
      ]);
      if (s.status === 'fulfilled') setSummary(s.value.data?.data || summary);
      if (t.status === 'fulfilled') setTransactions(t.value.data?.data || []);
      if (g.status === 'fulfilled') setGoals(g.value.data?.data || []);
    } catch (e) {
      console.error('Error cargando finanzas:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFinance(); }, []);

  const addTransaction = async () => {
    const monto = parseFloat(txForm.monto);
    if (!monto || monto <= 0) {
      toast({ title: 'Monto inválido', description: 'Ingresa un monto mayor que 0.', variant: 'destructive' });
      return;
    }
    try {
      await api.post('/finance/transactions', { ...txForm, monto });
      setTxForm((f) => ({ ...f, monto: '', descripcion: '' }));
      await loadFinance();
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo registrar.', variant: 'destructive' });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/finance/transactions/${id}`);
      await loadFinance();
    } catch (e) { /* noop */ }
  };

  const addGoal = async () => {
    const objetivo = parseFloat(goalForm.montoObjetivo);
    if (!goalForm.nombre.trim() || !objetivo || objetivo <= 0) {
      toast({ title: 'Datos incompletos', description: 'Nombre y monto objetivo son obligatorios.', variant: 'destructive' });
      return;
    }
    try {
      const { data } = await api.post('/finance/goals', { ...goalForm, montoObjetivo: objetivo });
      setGoals((prev) => [data.data, ...prev]);
      setGoalForm({ nombre: '', montoObjetivo: '', categoria: 'equipo', fechaObjetivo: '' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo crear la meta.', variant: 'destructive' });
    }
  };

  const aportar = async (goal) => {
    const aporte = parseFloat(aportes[goal._id]);
    if (!aporte || aporte <= 0) return;
    try {
      const { data } = await api.put(`/finance/goals/${goal._id}`, { aporte });
      setGoals((prev) => prev.map((g) => (g._id === goal._id ? data.data : g)));
      setAportes((prev) => ({ ...prev, [goal._id]: '' }));
      if (data.data.montoActual >= data.data.montoObjetivo) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#10B981', '#F59E0B', '#9333EA'] });
        toast({ title: '🎉 ¡Meta alcanzada!', description: `Lograste "${data.data.nombre}"` });
      }
    } catch (e) { /* noop */ }
  };

  const deleteGoal = async (id) => {
    try {
      await api.delete(`/finance/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (e) { /* noop */ }
  };

  const categoriasGasto = Object.entries(summary.porCategoria || {}).sort((a, b) => b[1] - a[1]);
  const catActual = txForm.tipo === 'gasto' ? GASTO_CATS : INGRESO_CATS;

  return (
    <>
      <Helmet><title>Finanzas - ConnectONE</title></Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="w-7 h-7 text-emerald-300" />
            Hub Financiero
          </h1>
          <p className="text-purple-200 mt-2">Ordena tu flujo del mes y proyecta tus metas de inversión.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-purple-200 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Cargando tus finanzas...
          </div>
        ) : (
          <>
            {/* Resumen del mes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-green-300 mb-1"><ArrowUpCircle className="w-4 h-4" /> Ingresos del mes</div>
                  <p className="text-2xl font-bold text-white">{fmt(summary.ingresos)}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-600/20 to-rose-600/20 border-red-500/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-red-300 mb-1"><ArrowDownCircle className="w-4 h-4" /> Gastos del mes</div>
                  <p className="text-2xl font-bold text-white">{fmt(summary.gastos)}</p>
                </CardContent>
              </Card>
              <Card className={`bg-gradient-to-br ${summary.balance >= 0 ? 'from-purple-600/20 to-indigo-600/20 border-purple-500/30' : 'from-orange-600/20 to-red-600/20 border-orange-500/30'}`}>
                <CardContent className="p-5">
                  <div className={`flex items-center gap-2 mb-1 ${summary.balance >= 0 ? 'text-purple-300' : 'text-orange-300'}`}>
                    {summary.balance >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />} Balance
                  </div>
                  <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-white' : 'text-orange-200'}`}>{fmt(summary.balance)}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Control de flujo */}
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-purple-300" /> Control de Flujo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Form */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {['gasto', 'ingreso'].map((tipo) => (
                        <button
                          key={tipo}
                          onClick={() => setTxForm((f) => ({ ...f, tipo, categoria: tipo === 'gasto' ? 'comida' : 'salario' }))}
                          className={`flex-1 h-9 rounded-lg text-sm font-bold border transition-all capitalize
                            ${txForm.tipo === tipo
                              ? tipo === 'gasto' ? 'bg-red-500/20 border-red-500/40 text-red-200' : 'bg-green-500/20 border-green-500/40 text-green-200'
                              : 'bg-white/5 border-white/10 text-purple-300 hover:bg-white/10'}`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number" min="0" inputMode="numeric"
                        value={txForm.monto}
                        onChange={(e) => setTxForm((f) => ({ ...f, monto: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && addTransaction()}
                        placeholder="Monto (COP)"
                        className="h-9 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                      />
                      <select
                        value={txForm.categoria}
                        onChange={(e) => setTxForm((f) => ({ ...f, categoria: e.target.value }))}
                        className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2 capitalize"
                      >
                        {catActual.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={txForm.descripcion}
                        onChange={(e) => setTxForm((f) => ({ ...f, descripcion: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && addTransaction()}
                        placeholder="Descripción (opcional)"
                        className="h-9 flex-1 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                      />
                      <Button onClick={addTransaction} className="h-9 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shrink-0">
                        <Plus className="w-4 h-4 mr-1" /> Registrar
                      </Button>
                    </div>
                  </div>

                  {/* Desglose de gastos por categoría */}
                  {categoriasGasto.length > 0 && (
                    <div className="pt-1">
                      <p className="text-purple-300/70 text-xs mb-2">Gastos por categoría</p>
                      <div className="space-y-1.5">
                        {categoriasGasto.slice(0, 5).map(([cat, monto]) => (
                          <div key={cat}>
                            <div className="flex justify-between text-xs mb-0.5">
                              <span className="text-purple-200 capitalize">{cat}</span>
                              <span className="text-purple-300/70">{fmt(monto)}</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                                style={{ width: `${summary.gastos ? (monto / summary.gastos) * 100 : 0}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Movimientos del mes */}
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {transactions.length === 0 && (
                      <p className="text-purple-300/60 text-sm">Sin movimientos este mes. Registra el primero arriba.</p>
                    )}
                    {transactions.map((t) => (
                      <div key={t._id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        {t.tipo === 'ingreso'
                          ? <ArrowUpCircle className="w-4 h-4 text-green-400 shrink-0" />
                          : <ArrowDownCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate capitalize">{t.descripcion || t.categoria}</p>
                          <p className="text-xs text-purple-300/60 capitalize">{t.categoria} · {new Date(t.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</p>
                        </div>
                        <span className={`text-sm font-bold shrink-0 ${t.tipo === 'ingreso' ? 'text-green-300' : 'text-red-300'}`}>
                          {t.tipo === 'ingreso' ? '+' : '−'}{fmt(t.monto)}
                        </span>
                        <button onClick={() => deleteTransaction(t._id)} className="text-purple-300/40 hover:text-red-400 shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Metas de inversión */}
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-300" /> Metas de Inversión
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Form nueva meta */}
                  <div className="space-y-2 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex gap-2">
                      <Input
                        value={goalForm.nombre}
                        onChange={(e) => setGoalForm((f) => ({ ...f, nombre: e.target.value }))}
                        placeholder="Ej. Interface de audio"
                        className="h-9 flex-1 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                      />
                      <select
                        value={goalForm.categoria}
                        onChange={(e) => setGoalForm((f) => ({ ...f, categoria: e.target.value }))}
                        className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2"
                      >
                        {Object.entries(GOAL_CATS).map(([k, e]) => <option key={k} value={k}>{e} {k}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number" min="0"
                        value={goalForm.montoObjetivo}
                        onChange={(e) => setGoalForm((f) => ({ ...f, montoObjetivo: e.target.value }))}
                        placeholder="Monto objetivo (COP)"
                        className="h-9 flex-1 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                      />
                      <Button onClick={addGoal} className="h-9 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shrink-0">
                        <Plus className="w-4 h-4 mr-1" /> Crear meta
                      </Button>
                    </div>
                  </div>

                  {/* Lista de metas */}
                  <div className="space-y-3 max-h-[26rem] overflow-y-auto pr-1">
                    {goals.length === 0 && (
                      <p className="text-purple-300/60 text-sm">Crea tu primera meta: equipos, plugins, hardware o educación.</p>
                    )}
                    {goals.map((g) => {
                      const pct = Math.min((g.montoActual / g.montoObjetivo) * 100, 100);
                      const completa = g.montoActual >= g.montoObjetivo;
                      return (
                        <div key={g._id} className={`rounded-xl p-4 border ${completa ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xl shrink-0">{GOAL_CATS[g.categoria] || '🎯'}</span>
                              <div className="min-w-0">
                                <p className="text-white font-bold truncate">{g.nombre}</p>
                                <p className="text-xs text-purple-300/70">{fmt(g.montoActual)} / {fmt(g.montoObjetivo)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {completa && <Badge className="bg-green-600 text-white"><Sparkles className="w-3 h-3 mr-1" />Lograda</Badge>}
                              <button onClick={() => deleteGoal(g._id)} className="text-purple-300/40 hover:text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden mb-1">
                            <motion.div
                              className={`h-full rounded-full ${completa ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-purple-300/60">{pct.toFixed(0)}%</span>
                            {!completa && (
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="number" min="0"
                                  value={aportes[g._id] || ''}
                                  onChange={(e) => setAportes((p) => ({ ...p, [g._id]: e.target.value }))}
                                  onKeyDown={(e) => e.key === 'Enter' && aportar(g)}
                                  placeholder="Aporte"
                                  className="h-8 w-24 text-sm bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                                />
                                <Button onClick={() => aportar(g)} size="sm" className="h-8 bg-purple-600 hover:bg-purple-500">
                                  <PiggyBank className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FinanzasPage;
