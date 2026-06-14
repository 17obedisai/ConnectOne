import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import {
  ArrowLeft, CheckCircle, Circle, Loader2, Star, Sparkles, Clock,
  Lightbulb, Target, X, BookOpen, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

const CursoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateStats } = useData();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(null); // { mi, li }
  const [contenido, setContenido] = useState(null);
  const [loadingCont, setLoadingCont] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/academia/${id}`);
        setCurso(data?.data || null);
      } catch (e) {
        toast({ title: 'Error', description: 'No se pudo cargar el curso.', variant: 'destructive' });
      } finally { setLoading(false); }
    })();
  }, [id]);

  const lecciones = curso ? curso.modulos.reduce((a, m) => a + m.lecciones.length, 0) : 0;
  const hechas = curso ? curso.modulos.reduce((a, m) => a + m.lecciones.filter((l) => l.completada).length, 0) : 0;
  const progreso = lecciones ? Math.round((hechas / lecciones) * 100) : 0;

  const abrir = async (mi, li) => {
    setSel({ mi, li });
    setContenido(null);
    setLoadingCont(true);
    try {
      const { data } = await api.post(`/academia/${id}/leccion/${mi}/${li}/contenido`);
      setContenido(data.data);
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No pude abrir la lección.', variant: 'destructive' });
      setSel(null);
    } finally { setLoadingCont(false); }
  };

  const completar = async () => {
    if (!sel) return;
    setCompleting(true);
    try {
      const { data } = await api.post(`/academia/${id}/leccion/${sel.mi}/${sel.li}/completar`);
      setCurso((prev) => {
        const c = JSON.parse(JSON.stringify(prev));
        c.modulos[sel.mi].lecciones[sel.li].completada = true;
        return c;
      });
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 }, colors: ['#06B6D4', '#9333EA', '#F59E0B'] });
      toast({ title: `+${data.data.xpGanado} XP 🎉`, description: 'Lección completada' });
      if (data.data.experiencia != null) updateStats({ xp: data.data.experiencia });
      setSel(null);
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo completar.', variant: 'destructive' });
    } finally { setCompleting(false); }
  };

  const valorar = async (n) => {
    try {
      await api.put(`/academia/${id}/valorar`, { valoracion: n });
      setCurso((p) => ({ ...p, valoracion: n }));
      toast({ title: '¡Gracias por tu valoración!' });
    } catch (e) { /* noop */ }
  };

  if (loading) return <div className="flex items-center justify-center py-20 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando curso...</div>;
  if (!curso) return <div className="text-center py-20 text-purple-300">Curso no encontrado. <button onClick={() => navigate('/academia')} className="underline">Volver</button></div>;

  const leccionSel = sel ? curso.modulos[sel.mi].lecciones[sel.li] : null;

  return (
    <>
      <Helmet><title>{curso.titulo} - ConnectONE</title></Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate('/academia')} className="text-purple-300 hover:text-white flex items-center gap-1.5 text-sm"><ArrowLeft className="w-4 h-4" /> Academia</button>

        {/* Cabecera del curso */}
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{curso.titulo}</h1>
          <p className="text-purple-300/80 text-sm mt-1 capitalize">{curso.categoria} · {curso.nivel}</p>
          {curso.descripcion && <p className="text-purple-200 mt-2">{curso.descripcion}</p>}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-200">{hechas}/{lecciones} lecciones</span>
              <span className="text-white font-bold">{progreso}%</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all" style={{ width: `${progreso}%` }} />
            </div>
          </div>
          {/* Valoración */}
          <div className="flex items-center gap-1 mt-4">
            <span className="text-purple-300/70 text-sm mr-1">Tu valoración:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => valorar(n)}>
                <Star className={`w-5 h-5 ${curso.valoracion >= n ? 'text-yellow-300 fill-yellow-300' : 'text-purple-400/40'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Módulos y lecciones */}
        <div className="space-y-4">
          {curso.modulos.map((m, mi) => (
            <Card key={mi} className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white">{m.titulo}</h3>
                {m.descripcion && <p className="text-purple-300/70 text-sm mb-3">{m.descripcion}</p>}
                <div className="space-y-1.5 mt-2">
                  {m.lecciones.map((l, li) => (
                    <button key={li} onClick={() => abrir(mi, li)}
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all text-left">
                      {l.completada ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-purple-400 shrink-0" />}
                      <span className={`flex-1 text-sm ${l.completada ? 'text-purple-300/60' : 'text-white'}`}>{l.titulo}</span>
                      <span className="text-purple-300/50 text-xs flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" />{l.duracionMin}m</span>
                      <ChevronRight className="w-4 h-4 text-purple-300/40 shrink-0" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lector de lección */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSel(null)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/30 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col">
              {/* Header del lector */}
              <div className="flex items-center justify-between gap-3 p-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-5 h-5 text-cyan-300 shrink-0" />
                  <h3 className="text-white font-bold truncate">{leccionSel?.titulo}</h3>
                </div>
                <button onClick={() => setSel(null)} className="text-purple-300/60 hover:text-white shrink-0"><X className="w-5 h-5" /></button>
              </div>

              {/* Cuerpo */}
              <div className="overflow-y-auto p-5 space-y-5 flex-1">
                {loadingCont ? (
                  <div className="flex flex-col items-center justify-center py-12 text-purple-200 gap-3">
                    <Loader2 className="w-7 h-7 animate-spin" />
                    <p>Energiko está preparando tu lección...</p>
                  </div>
                ) : contenido ? (
                  <>
                    {contenido.introduccion && <p className="text-purple-100 leading-relaxed">{contenido.introduccion}</p>}

                    <div className="space-y-3">
                      {contenido.pasos.map((p, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                            <h4 className="text-white font-semibold">{p.titulo}</h4>
                          </div>
                          <p className="text-purple-200 text-sm leading-relaxed">{p.detalle}</p>
                        </div>
                      ))}
                    </div>

                    {contenido.tips?.length > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                        <p className="text-yellow-200 font-semibold text-sm mb-2 flex items-center gap-1.5"><Lightbulb className="w-4 h-4" /> Tips</p>
                        <ul className="space-y-1">{contenido.tips.map((t, i) => <li key={i} className="text-purple-100 text-sm flex gap-2"><span className="text-yellow-300">•</span>{t}</li>)}</ul>
                      </div>
                    )}

                    {contenido.ejemplo && (
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                        <p className="text-cyan-200 font-semibold text-sm mb-1 flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Ejemplo</p>
                        <p className="text-purple-100 text-sm leading-relaxed whitespace-pre-wrap">{contenido.ejemplo}</p>
                      </div>
                    )}

                    {contenido.practica && (
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                        <p className="text-purple-200 font-semibold text-sm mb-1 flex items-center gap-1.5"><Target className="w-4 h-4" /> Practica ahora</p>
                        <p className="text-purple-100 text-sm leading-relaxed">{contenido.practica}</p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {/* Footer: completar */}
              {!loadingCont && contenido && (
                <div className="p-4 border-t border-white/10 shrink-0">
                  {leccionSel?.completada ? (
                    <div className="flex items-center justify-center gap-2 text-green-300 font-semibold"><CheckCircle className="w-5 h-5" /> Lección completada</div>
                  ) : (
                    <Button onClick={completar} disabled={completing} className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold h-11">
                      {completing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />} Marcar como completada (+50 XP)
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CursoPage;
