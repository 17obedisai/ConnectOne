import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronLeft, ChevronRight, Loader2, CalendarClock } from 'lucide-react';
import api from '@/services/api';

const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const TIPO_COLOR = { trabajo: 'bg-blue-500/20 text-blue-200', estudio: 'bg-purple-500/20 text-purple-200', descanso: 'bg-green-500/20 text-green-200', fitness: 'bg-orange-500/20 text-orange-200' };

const hoyStr = () => new Date().toISOString().slice(0, 10);

const CalendarioMes = () => {
  const [ref, setRef] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; }); // m: 0-11
  const [calendario, setCalendario] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detalle, setDetalle] = useState(null);

  const mesStr = `${ref.y}-${String(ref.m + 1).padStart(2, '0')}`;

  const cargar = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/overview/month?mes=${mesStr}`);
      setCalendario(data?.data?.calendario || {});
    } catch (e) {
      console.error('Error cargando calendario:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    const onRefresh = () => cargar();
    window.addEventListener('connectone:refresh', onRefresh);
    return () => window.removeEventListener('connectone:refresh', onRefresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesStr]);

  const verDia = async (fecha) => {
    setSelected(fecha);
    setDetalle(null);
    try {
      const { data } = await api.get(`/dailyfocus/today?fecha=${fecha}`);
      setDetalle(data?.data || null);
    } catch (e) { /* noop */ }
  };

  const cambiarMes = (delta) => {
    setSelected(null); setDetalle(null);
    setRef((r) => {
      const nm = r.m + delta;
      if (nm < 0) return { y: r.y - 1, m: 11 };
      if (nm > 11) return { y: r.y + 1, m: 0 };
      return { y: r.y, m: nm };
    });
  };

  const primerDia = new Date(ref.y, ref.m, 1).getDay(); // 0=Dom
  const offset = (primerDia + 6) % 7; // semana inicia lunes
  const diasEnMes = new Date(ref.y, ref.m + 1, 0).getDate();
  const celdas = [...Array(offset).fill(null), ...Array.from({ length: diasEnMes }, (_, i) => i + 1)];

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <span className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-cyan-300" /> Calendario</span>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => cambiarMes(-1)} className="p-1 rounded hover:bg-white/10 text-purple-200"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-purple-100 font-medium w-32 text-center">{MESES[ref.m]} {ref.y}</span>
            <button onClick={() => cambiarMes(1)} className="p-1 rounded hover:bg-white/10 text-purple-200"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-10 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando...</div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DIAS.map((d) => <div key={d} className="text-center text-[11px] text-purple-300/60 font-semibold">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {celdas.map((dia, i) => {
                if (dia === null) return <div key={`e${i}`} />;
                const fecha = `${mesStr}-${String(dia).padStart(2, '0')}`;
                const info = calendario[fecha];
                const esHoy = fecha === hoyStr();
                const esSel = fecha === selected;
                return (
                  <button
                    key={fecha}
                    onClick={() => verDia(fecha)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative transition-all border
                      ${esSel ? 'border-purple-400 bg-purple-600/30' : esHoy ? 'border-purple-400/60 bg-white/5' : 'border-transparent hover:bg-white/5'}
                      ${info ? 'text-white' : 'text-purple-300/50'}`}
                  >
                    <span className={esHoy ? 'font-bold text-purple-200' : ''}>{dia}</span>
                    {info && (
                      <div className="flex gap-0.5 mt-0.5">
                        {info.agenda > 0 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                        {info.tareas > 0 && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                        {info.recordatorios > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        {info.journal && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-purple-300/60">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> agenda</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> tareas</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> recordatorio</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> bitácora</span>
            </div>

            {/* Detalle del día seleccionado */}
            {selected && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-purple-200 text-sm font-medium mb-2 flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4" />
                  {new Date(`${selected}T12:00:00`).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                {!detalle ? (
                  <p className="text-purple-300/50 text-sm">Sin actividad registrada ese día.</p>
                ) : (
                  <div className="space-y-2">
                    {(detalle.agenda || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {detalle.agenda.map((b, idx) => (
                          <span key={idx} className={`text-xs rounded-lg px-2 py-1 ${TIPO_COLOR[b.tipo] || TIPO_COLOR.trabajo}`}>
                            {b.inicio}{b.fin ? `–${b.fin}` : ''} · {b.titulo}
                          </span>
                        ))}
                      </div>
                    )}
                    {(detalle.tareas || []).length > 0 && (
                      <div className="space-y-1">
                        {detalle.tareas.map((t, idx) => (
                          <p key={idx} className={`text-sm ${t.completada ? 'text-green-300 line-through' : 'text-purple-100'}`}>
                            {t.completada ? '✓' : '○'} {t.texto}
                          </p>
                        ))}
                      </div>
                    )}
                    {!(detalle.agenda || []).length && !(detalle.tareas || []).length && (
                      <p className="text-purple-300/50 text-sm">Sin agenda ni tareas ese día.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarioMes;
