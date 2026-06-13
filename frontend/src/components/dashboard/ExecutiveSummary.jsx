import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LayoutDashboard, CheckCircle, Flame, CalendarClock, StickyNote,
  TrendingUp, Clock, Brain, Loader2
} from 'lucide-react';
import api from '@/services/api';

const fmtCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(n) || 0);

const TIPO_LABEL = { trabajo: 'Trabajo', estudio: 'Estudio', descanso: 'Descanso', fitness: 'Fitness' };
const TIPO_COLOR = { trabajo: 'from-blue-500 to-cyan-500', estudio: 'from-purple-500 to-indigo-500', descanso: 'from-green-500 to-emerald-500', fitness: 'from-orange-500 to-red-500' };

const Stat = ({ icon, valor, label, sub }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
    <div className="flex justify-center text-purple-300 mb-1">{icon}</div>
    <p className="text-2xl font-bold text-white leading-none">{valor}</p>
    <p className="text-[11px] text-purple-300/70 mt-1">{label}</p>
    {sub && <p className="text-[10px] text-purple-400/50">{sub}</p>}
  </div>
);

const ExecutiveSummary = () => {
  const [vista, setVista] = useState('hoy');
  const [hoy, setHoy] = useState(null);
  const [mes, setMes] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      const [t, m] = await Promise.allSettled([api.get('/overview/today'), api.get('/overview/month')]);
      if (t.status === 'fulfilled') setHoy(t.value.data?.data || null);
      if (m.status === 'fulfilled') setMes(m.value.data?.data || null);
    } catch (e) {
      console.error('Error cargando resumen:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    const onRefresh = () => cargar();
    window.addEventListener('connectone:refresh', onRefresh);
    return () => window.removeEventListener('connectone:refresh', onRefresh);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center justify-between flex-wrap gap-2">
          <span className="flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-purple-300" /> Vista Ejecutiva</span>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            {['hoy', 'mes'].map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={`px-3 py-1 rounded-md text-sm font-semibold capitalize transition-all ${vista === v ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'}`}
              >
                {v === 'hoy' ? 'Hoy' : 'Este mes'}
              </button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-10 text-purple-200 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Calculando tu resumen...
          </div>
        ) : vista === 'hoy' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat icon={<CheckCircle className="w-5 h-5" />} valor={`${hoy?.tareas?.hechas ?? 0}/${hoy?.tareas?.total ?? 0}`} label="Tareas críticas" />
              <Stat icon={<Flame className="w-5 h-5" />} valor={`${hoy?.habitos?.hechos ?? 0}/${hoy?.habitos?.total ?? 0}`} label="Hábitos" />
              <Stat icon={<CalendarClock className="w-5 h-5" />} valor={hoy?.agenda?.length ?? 0} label="Bloques agenda" />
              <Stat icon={<StickyNote className="w-5 h-5" />} valor={hoy?.notasHoy ?? 0} label="Notas hoy" />
            </div>

            {/* Qué hiciste hoy */}
            <div>
              <p className="text-purple-200 text-sm mb-2">✅ Lo que completaste hoy</p>
              {(() => {
                const hechas = [
                  ...(hoy?.tareas?.lista || []).filter((t) => t.completada).map((t) => t.texto),
                  ...(hoy?.habitos?.lista || []).filter((h) => h.completado).map((h) => h.nombre)
                ];
                return hechas.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {hechas.map((x, i) => (
                      <span key={i} className="text-xs bg-green-500/15 border border-green-500/30 text-green-200 rounded-full px-2.5 py-1">✓ {x}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-purple-300/50 text-sm">Aún nada marcado. Pídele a Energiko que te organice el día. 🐼</p>
                );
              })()}
            </div>

            {(hoy?.finanzasHoy?.movimientos > 0) && (
              <p className="text-sm text-purple-200">
                💰 Hoy: <span className="text-green-300">+{fmtCOP(hoy.finanzasHoy.ingresos)}</span> · <span className="text-red-300">−{fmtCOP(hoy.finanzasHoy.gastos)}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat icon={<CalendarClock className="w-5 h-5" />} valor={mes?.diasConActividad ?? 0} label="Días activos" />
              <Stat icon={<CheckCircle className="w-5 h-5" />} valor={mes?.tareasCompletadas ?? 0} label="Tareas hechas" />
              <Stat icon={<Clock className="w-5 h-5" />} valor={`${mes?.horasTotales ?? 0}h`} label="Horas registradas" />
              <Stat icon={<Brain className="w-5 h-5" />} valor={mes?.journal?.dias ?? 0} label="Días bitácora" />
            </div>

            {/* Horas por área */}
            {mes && mes.horasTotales > 0 && (
              <div>
                <p className="text-purple-200 text-sm mb-2"><Clock className="w-4 h-4 inline mr-1" /> Horas invertidas por área</p>
                <div className="space-y-1.5">
                  {Object.entries(mes.horasPorTipo).filter(([, h]) => h > 0).map(([tipo, h]) => (
                    <div key={tipo}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-purple-200">{TIPO_LABEL[tipo]}</span>
                        <span className="text-purple-300/70">{h}h</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${TIPO_COLOR[tipo]} rounded-full`} style={{ width: `${(h / mes.horasTotales) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Constancia de hábitos */}
            {mes && Object.keys(mes.habitosPorNombre || {}).length > 0 && (
              <div>
                <p className="text-purple-200 text-sm mb-2"><Flame className="w-4 h-4 inline mr-1" /> Constancia (días en el mes)</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(mes.habitosPorNombre).sort((a, b) => b[1] - a[1]).map(([nombre, dias]) => (
                    <span key={nombre} className="text-xs bg-purple-500/15 border border-purple-500/30 text-purple-200 rounded-full px-2.5 py-1">
                      {nombre}: <span className="font-bold text-white">{dias}d</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Finanzas + bienestar del mes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-purple-300/70 mb-1"><TrendingUp className="w-3.5 h-3.5 inline mr-1" /> Balance del mes</p>
                <p className={`text-lg font-bold ${(mes?.finanzas?.balance ?? 0) >= 0 ? 'text-green-300' : 'text-red-300'}`}>{fmtCOP(mes?.finanzas?.balance)}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-purple-300/70 mb-1"><Brain className="w-3.5 h-3.5 inline mr-1" /> Promedios /5</p>
                <p className="text-sm text-purple-100">
                  😴 {mes?.journal?.calidadSueno ?? '—'} · 🧠 {mes?.journal?.concentracion ?? '—'} · 😰 {mes?.journal?.nivelEstres ?? '—'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
