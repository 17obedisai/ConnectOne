import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, Sparkles, Loader2, Trash2, Star, BookOpen } from 'lucide-react';
import api from '@/services/api';

const CAT = {
  idioma: { emoji: '🌍', label: 'Idioma' },
  instrumento: { emoji: '🎸', label: 'Instrumento' },
  software: { emoji: '💻', label: 'Software' },
  arte: { emoji: '🎨', label: 'Arte' },
  fitness: { emoji: '🏋️', label: 'Fitness' },
  conocimiento: { emoji: '📚', label: 'Conocimiento' },
  otro: { emoji: '⭐', label: 'Otro' }
};

const SUGERENCIAS = [
  'Inglés desde cero', 'Francés básico', 'Italiano para viajar',
  'Guitarra acústica', 'Piano desde cero', 'Producción en Logic Pro',
  'Hábitos de estudio efectivos', 'Finanzas personales'
];

const AcademiaPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('principiante');
  const [creando, setCreando] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/academia');
      setCursos(data?.data || []);
    } catch (e) { console.error(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const crear = async (temaArg) => {
    const t = (temaArg ?? tema).trim();
    if (!t || creando) return;
    setCreando(true);
    try {
      const { data } = await api.post('/academia/generar', { tema: t, nivel });
      toast({ title: '🎓 Curso creado', description: data.data.titulo });
      setTema('');
      navigate(`/academia/${data.data._id}`);
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo crear.', variant: 'destructive' });
    } finally {
      setCreando(false);
    }
  };

  const eliminar = async (id, e) => {
    e.stopPropagation();
    try { await api.delete(`/academia/${id}`); setCursos((p) => p.filter((c) => c._id !== id)); } catch (err) { /* noop */ }
  };

  return (
    <>
      <Helmet><title>Academia - ConnectONE</title></Helmet>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><GraduationCap className="w-7 h-7 text-cyan-300" /> Academia</h1>
          <p className="text-purple-200 mt-2">Aprende lo que quieras a fondo: idiomas, instrumentos, software… con cursos paso a paso creados por IA.</p>
        </div>

        {/* Crear curso */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
          <CardContent className="p-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input value={tema} onChange={(e) => setTema(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && crear()}
                placeholder="¿Qué quieres aprender? (ej. Guitarra, Inglés, Logic Pro)"
                className="h-11 flex-1 bg-white/5 border-white/10 text-white placeholder:text-purple-300/40" />
              <select value={nivel} onChange={(e) => setNivel(e.target.value)} className="h-11 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-3">
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
              <Button onClick={() => crear()} disabled={creando || !tema.trim()} className="h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                {creando ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} Crear con IA
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGERENCIAS.map((s) => (
                <button key={s} onClick={() => crear(s)} disabled={creando}
                  className="text-xs text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-full px-3 py-1.5 transition-colors">
                  + {s}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de cursos */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando tus cursos...</div>
        ) : cursos.length === 0 ? (
          <p className="text-center text-purple-300/60 py-10">Aún no tienes cursos. Crea el primero arriba o toca una sugerencia. 🎓</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {cursos.map((c) => (
                <motion.div key={c._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => navigate(`/academia/${c._id}`)} className="cursor-pointer">
                  <Card className="h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 hover:border-purple-400/50 transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-3xl">{CAT[c.categoria]?.emoji || '📚'}</span>
                        <div className="flex items-center gap-2">
                          {c.valoracion ? <span className="text-yellow-300 text-sm flex items-center gap-0.5"><Star className="w-3.5 h-3.5 fill-yellow-300" />{c.valoracion}</span> : null}
                          <button onClick={(e) => eliminar(c._id, e)} className="text-purple-300/40 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{c.titulo}</h3>
                      <p className="text-purple-300/70 text-xs mt-0.5 capitalize">{CAT[c.categoria]?.label} · {c.nivel} · {c.modulos} módulos · {c.lecciones} lecciones</p>
                      {c.descripcion && <p className="text-purple-200 text-sm mt-2 line-clamp-2">{c.descripcion}</p>}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-purple-300/70">{c.leccionesHechas}/{c.lecciones} lecciones</span>
                          <span className="text-purple-200 font-semibold">{c.progreso}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: `${c.progreso}%` }} />
                        </div>
                      </div>
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

export default AcademiaPage;
