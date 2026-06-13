import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Target, Plus, X, CheckCircle, Circle, BatteryCharging,
  Moon, CalendarClock, Flame, Trash2
} from 'lucide-react';
import api from '@/services/api';

const ENERGY_LEVELS = [
  { v: 1, label: 'Agotado', color: 'from-red-500 to-rose-500' },
  { v: 2, label: 'Bajo', color: 'from-orange-500 to-red-500' },
  { v: 3, label: 'Normal', color: 'from-yellow-500 to-orange-500' },
  { v: 4, label: 'Bien', color: 'from-lime-500 to-green-500' },
  { v: 5, label: 'Imparable', color: 'from-green-500 to-emerald-500' }
];

const HABIT_SUGGESTIONS = ['Meditar', 'Ejercicio', 'Leer 20 min', 'Beber agua', 'Journaling'];
const AGENDA_TIPOS = {
  trabajo: { label: 'Trabajo', color: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  estudio: { label: 'Estudio', color: 'bg-purple-500/20 text-purple-200 border-purple-500/30' },
  descanso: { label: 'Descanso', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
  fitness: { label: 'Fitness', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' }
};

const emptyPlan = { energia: null, horasSueno: null, tareas: [], habitos: [], agenda: [] };

const CommandCenter = ({ onContextChange }) => {
  const [plan, setPlan] = useState(emptyPlan);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [newHabit, setNewHabit] = useState('');
  const [agendaForm, setAgendaForm] = useState({ inicio: '', fin: '', titulo: '', tipo: 'trabajo' });
  const saveTimer = useRef(null);

  // Carga (o recarga) el plan de hoy.
  const loadPlan = async () => {
    try {
      const { data } = await api.get('/dailyfocus/today');
      if (data?.data) setPlan({ ...emptyPlan, ...data.data });
    } catch (error) {
      console.error('No se pudo cargar el plan del día:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
    // El agente de IA emite 'connectone:refresh' tras ejecutar acciones (agregar tarea, agendar...).
    const onRefresh = () => loadPlan();
    window.addEventListener('connectone:refresh', onRefresh);
    return () => window.removeEventListener('connectone:refresh', onRefresh);
  }, []);

  // Propaga el contexto (energía, sueño, tareas pendientes) al asistente de IA.
  useEffect(() => {
    onContextChange?.({
      energia: plan.energia,
      horasSueno: plan.horasSueno,
      tareasFoco: (plan.tareas || []).filter((t) => !t.completada).map((t) => t.texto)
    });
  }, [plan, onContextChange]);

  // Guarda con un pequeño debounce para no saturar la API en cambios rápidos.
  const persist = (next) => {
    setPlan(next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      api.put('/dailyfocus/today', {
        energia: next.energia,
        horasSueno: next.horasSueno,
        tareas: next.tareas,
        habitos: next.habitos,
        agenda: next.agenda
      }).catch((e) => console.error('No se pudo guardar el plan:', e.message));
    }, 400);
  };

  // ── Tareas críticas (máx 3) ──
  const addTask = () => {
    const texto = newTask.trim();
    if (!texto || plan.tareas.length >= 3) return;
    persist({ ...plan, tareas: [...plan.tareas, { texto, completada: false }] });
    setNewTask('');
  };
  const toggleTask = (i) =>
    persist({
      ...plan,
      tareas: plan.tareas.map((t, idx) => (idx === i ? { ...t, completada: !t.completada } : t))
    });
  const removeTask = (i) =>
    persist({ ...plan, tareas: plan.tareas.filter((_, idx) => idx !== i) });

  // ── Hábitos ──
  const addHabit = (nombre) => {
    const n = (nombre ?? newHabit).trim();
    if (!n || plan.habitos.some((h) => h.nombre === n)) return;
    persist({ ...plan, habitos: [...plan.habitos, { nombre: n, completado: false }] });
    setNewHabit('');
  };
  const toggleHabit = (i) =>
    persist({
      ...plan,
      habitos: plan.habitos.map((h, idx) => (idx === i ? { ...h, completado: !h.completado } : h))
    });

  // ── Agenda híbrida ──
  const addAgenda = () => {
    const { inicio, fin, titulo, tipo } = agendaForm;
    if (!inicio || !titulo.trim()) return;
    const bloque = { inicio, fin, titulo: titulo.trim(), tipo };
    const agenda = [...plan.agenda, bloque].sort((a, b) => (a.inicio || '').localeCompare(b.inicio || ''));
    persist({ ...plan, agenda });
    setAgendaForm({ inicio: '', fin: '', titulo: '', tipo: 'trabajo' });
  };
  const removeAgenda = (i) =>
    persist({ ...plan, agenda: plan.agenda.filter((_, idx) => idx !== i) });

  const habitosHechos = plan.habitos.filter((h) => h.completado).length;
  const tareasHechas = plan.tareas.filter((t) => t.completada).length;
  const energyMeta = ENERGY_LEVELS.find((e) => e.v === plan.energia);

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-300" />
          Focus del Día
          {!loading && (
            <span className="ml-auto text-sm font-normal text-purple-300/70">
              {tareasHechas}/{plan.tareas.length || 0} tareas · {habitosHechos}/{plan.habitos.length || 0} hábitos
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Energía + Sueño */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-purple-200 text-sm mb-2 flex items-center gap-2">
              <BatteryCharging className="w-4 h-4" /> ¿Cómo está tu energía?
            </p>
            <div className="flex gap-1.5">
              {ENERGY_LEVELS.map((e) => (
                <button
                  key={e.v}
                  onClick={() => persist({ ...plan, energia: e.v })}
                  title={e.label}
                  className={`flex-1 h-9 rounded-lg border transition-all text-sm font-bold
                    ${plan.energia === e.v
                      ? `bg-gradient-to-r ${e.color} text-white border-transparent scale-105`
                      : 'bg-white/5 border-white/10 text-purple-300 hover:bg-white/10'}`}
                >
                  {e.v}
                </button>
              ))}
            </div>
            {energyMeta && <p className="text-xs text-purple-300/70 mt-1">{energyMeta.label}</p>}
          </div>

          <div>
            <p className="text-purple-200 text-sm mb-2 flex items-center gap-2">
              <Moon className="w-4 h-4" /> Horas de sueño anoche
            </p>
            <Input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={plan.horasSueno ?? ''}
              onChange={(e) =>
                persist({ ...plan, horasSueno: e.target.value === '' ? null : parseFloat(e.target.value) })
              }
              placeholder="Ej. 7.5"
              className="h-9 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
            />
          </div>
        </div>

        {/* 3 Tareas críticas */}
        <div>
          <p className="text-purple-200 text-sm mb-2">Tus 3 tareas críticas</p>
          <div className="space-y-2">
            {plan.tareas.map((t, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <button onClick={() => toggleTask(i)} className="shrink-0">
                  {t.completada
                    ? <CheckCircle className="w-5 h-5 text-green-400" />
                    : <Circle className="w-5 h-5 text-purple-400" />}
                </button>
                <span className={`flex-1 text-sm ${t.completada ? 'text-purple-300/50 line-through' : 'text-white'}`}>
                  {t.texto}
                </span>
                <button onClick={() => removeTask(i)} className="text-purple-300/40 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {plan.tareas.length < 3 && (
              <div className="flex items-center gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder={`Tarea crítica ${plan.tareas.length + 1}...`}
                  className="h-9 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
                />
                <Button onClick={addTask} className="h-9 w-9 p-0 rounded-lg bg-purple-600 hover:bg-purple-500 shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Hábitos */}
        <div>
          <p className="text-purple-200 text-sm mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4" /> Hábitos de hoy
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {plan.habitos.map((h, i) => (
              <button
                key={i}
                onClick={() => toggleHabit(i)}
                className={`text-sm rounded-full px-3 py-1.5 border transition-all flex items-center gap-1.5
                  ${h.completado
                    ? 'bg-green-500/20 border-green-500/40 text-green-200'
                    : 'bg-white/5 border-white/10 text-purple-200 hover:bg-white/10'}`}
              >
                {h.completado ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                {h.nombre}
              </button>
            ))}
          </div>
          {/* Sugerencias / añadir hábito */}
          <div className="flex flex-wrap gap-1.5">
            {HABIT_SUGGESTIONS.filter((s) => !plan.habitos.some((h) => h.nombre === s)).map((s) => (
              <button
                key={s}
                onClick={() => addHabit(s)}
                className="text-xs text-purple-300/70 hover:text-purple-200 border border-dashed border-purple-500/30 rounded-full px-2.5 py-1"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        {/* Agenda híbrida */}
        <div>
          <p className="text-purple-200 text-sm mb-2 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Agenda híbrida
          </p>
          <div className="space-y-2 mb-3">
            {plan.agenda.length === 0 && (
              <p className="text-purple-300/50 text-xs">Bloquea tiempos para trabajo, estudio, fitness y descanso.</p>
            )}
            {plan.agenda.map((b, i) => (
              <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${AGENDA_TIPOS[b.tipo]?.color || AGENDA_TIPOS.trabajo.color}`}>
                <span className="text-xs font-mono tabular-nums">{b.inicio}{b.fin ? `–${b.fin}` : ''}</span>
                <span className="flex-1 text-sm text-white truncate">{b.titulo}</span>
                <span className="text-[10px] uppercase tracking-wide opacity-70">{AGENDA_TIPOS[b.tipo]?.label}</span>
                <button onClick={() => removeAgenda(i)} className="text-white/40 hover:text-red-300">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          {/* Form para añadir bloque */}
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="time"
              value={agendaForm.inicio}
              onChange={(e) => setAgendaForm((f) => ({ ...f, inicio: e.target.value }))}
              className="h-9 w-28 rounded-lg bg-white/5 border-white/10 text-white"
            />
            <Input
              type="time"
              value={agendaForm.fin}
              onChange={(e) => setAgendaForm((f) => ({ ...f, fin: e.target.value }))}
              className="h-9 w-28 rounded-lg bg-white/5 border-white/10 text-white"
            />
            <Input
              value={agendaForm.titulo}
              onChange={(e) => setAgendaForm((f) => ({ ...f, titulo: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && addAgenda()}
              placeholder="Bloque (ej. Deep work contabilidad)"
              className="h-9 flex-1 min-w-[10rem] rounded-lg bg-white/5 border-white/10 text-white placeholder:text-purple-300/40"
            />
            <select
              value={agendaForm.tipo}
              onChange={(e) => setAgendaForm((f) => ({ ...f, tipo: e.target.value }))}
              className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2"
            >
              {Object.entries(AGENDA_TIPOS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <Button onClick={addAgenda} className="h-9 w-9 p-0 rounded-lg bg-purple-600 hover:bg-purple-500 shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandCenter;
