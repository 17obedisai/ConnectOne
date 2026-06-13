import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import {
  Sparkles, Lock, CheckCircle, Loader2, RefreshCw, Zap, Trophy, Star, GitBranch
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

// Áreas de desarrollo — las claves coinciden con los intereses del cuestionario.
const AREAS = [
  { key: 'software', nombre: 'Desarrollo de Software', descripcion: 'Frontend, backend, Python, MongoDB, Git', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { key: 'music', nombre: 'Producción Musical y Audio', descripcion: 'Logic Pro, Reaper, mezcla y mastering', icon: '🎚️', color: 'from-purple-500 to-pink-500' },
  { key: 'languages', nombre: 'Idiomas y Comunicación', descripcion: 'Vocabulario, inmersión y comunicación', icon: '🌍', color: 'from-green-500 to-emerald-500' },
  { key: 'study', nombre: 'Hábitos de Estudio', descripcion: 'Aprendizaje efectivo y organización', icon: '📚', color: 'from-amber-500 to-orange-500' },
  { key: 'fitness', nombre: 'Fitness y Salud Física', descripcion: 'Rutinas, nutrición y recuperación', icon: '🏋️', color: 'from-red-500 to-rose-500' },
  { key: 'finance', nombre: 'Finanzas Personales', descripcion: 'Ahorro, inversión y libertad financiera', icon: '💰', color: 'from-yellow-500 to-amber-500' }
];

const SkillTreePage = () => {
  const { toast } = useToast();
  const { updateStats, stats } = useData();
  const [treesByArea, setTreesByArea] = useState({});
  const [interests, setInterests] = useState([]);
  const [selectedArea, setSelectedArea] = useState('software');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [treesRes, qRes] = await Promise.allSettled([
          api.get('/skilltree'),
          api.get('/questionnaire/my-questionnaire')
        ]);

        if (active && treesRes.status === 'fulfilled') {
          const map = {};
          (treesRes.value.data?.data || []).forEach((t) => { map[t.area] = t; });
          setTreesByArea(map);
        }
        if (active && qRes.status === 'fulfilled') {
          const ints = qRes.value.data?.data?.interests || [];
          setInterests(ints);
          // Selecciona por defecto el primer interés del usuario que tenga área.
          const firstMatch = AREAS.find((a) => ints.includes(a.key));
          if (firstMatch) setSelectedArea(firstMatch.key);
        }
      } catch (e) {
        console.error('Error cargando árbol de habilidades:', e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const area = AREAS.find((a) => a.key === selectedArea);
  const tree = treesByArea[selectedArea];

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const { data } = await api.post('/skilltree/generate', {
        area: area.key,
        nombre: area.nombre,
        descripcion: area.descripcion
      });
      setTreesByArea((prev) => ({ ...prev, [area.key]: data.data }));
      toast({ title: '🌳 Ruta generada', description: `Tu árbol de "${area.nombre}" está listo` });
    } catch (e) {
      toast({
        title: 'No se pudo generar',
        description: e.response?.data?.message || 'Intenta de nuevo en unos segundos.',
        variant: 'destructive'
      });
    } finally {
      setGenerating(false);
    }
  };

  const completeNode = async (orden) => {
    try {
      const { data } = await api.post(`/skilltree/${area.key}/complete/${orden}`);
      setTreesByArea((prev) => ({ ...prev, [area.key]: data.data.tree }));

      confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: ['#9333EA', '#EC4899', '#F59E0B'] });
      toast({ title: `+${data.data.xpGanado} XP 🎉`, description: 'Nodo desbloqueado. ¡Sigue subiendo!' });

      // Refleja la XP en la barra superior.
      if (data.data.experiencia != null) updateStats({ xp: data.data.experiencia });
    } catch (e) {
      toast({
        title: 'Aún no puedes',
        description: e.response?.data?.message || 'Error completando el nodo.',
        variant: 'destructive'
      });
    }
  };

  // Índice del primer nodo no completado = el "disponible".
  const nextIndex = tree ? tree.nodos.findIndex((n) => !n.completado) : -1;
  const completados = tree ? tree.nodos.filter((n) => n.completado).length : 0;

  return (
    <>
      <Helmet><title>Árbol de Habilidades - ConnectONE</title></Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <GitBranch className="w-7 h-7 text-purple-300" />
            Árbol de Habilidades
          </h1>
          <p className="text-purple-200 mt-2">
            Rutas de progresión tipo RPG generadas por IA según tus intereses. Sube de nivel en la vida real.
          </p>
        </div>

        {/* Selector de áreas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {AREAS.map((a) => {
            const isRecommended = interests.includes(a.key);
            const hasTree = Boolean(treesByArea[a.key]);
            const isActive = selectedArea === a.key;
            return (
              <motion.button
                key={a.key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedArea(a.key)}
                className={`relative rounded-2xl p-4 text-left border transition-all
                  ${isActive
                    ? `bg-gradient-to-br ${a.color} border-transparent shadow-lg`
                    : 'bg-purple-900/30 border-purple-500/20 hover:border-purple-400/50'}`}
              >
                {isRecommended && (
                  <span className="absolute top-2 right-2 text-[10px] bg-yellow-400/90 text-black font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5" /> Tú
                  </span>
                )}
                <div className="text-3xl mb-1">{a.icon}</div>
                <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-purple-100'}`}>{a.nombre}</div>
                {hasTree && (
                  <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-purple-300/70'}`}>
                    {treesByArea[a.key].nodos.filter((n) => n.completado).length}/{treesByArea[a.key].nodos.length} ✓
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Panel del área seleccionada */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-purple-200 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Cargando tus rutas...
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{area.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{area.nombre}</h2>
                      <p className="text-purple-300 text-sm">{area.descripcion}</p>
                    </div>
                  </div>
                  {tree && (
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-700 text-white">
                        <Trophy className="w-3.5 h-3.5 mr-1" />
                        {completados}/{tree.nodos.length} completados
                      </Badge>
                      <Button
                        onClick={generate}
                        disabled={generating}
                        variant="outline"
                        size="sm"
                        className="border-purple-500/40 text-purple-200 hover:bg-purple-800/40"
                      >
                        {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        <span className="ml-1.5">Regenerar</span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sin ruta aún → generar */}
                {!tree ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🌱</div>
                    <p className="text-purple-200 mb-6 max-w-md mx-auto">
                      Aún no tienes una ruta para <span className="font-bold text-white">{area.nombre}</span>.
                      Deja que la IA diseñe tu progresión personalizada de lo básico a lo avanzado.
                    </p>
                    <Button
                      onClick={generate}
                      disabled={generating}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 py-6 rounded-full"
                    >
                      {generating ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generando tu ruta...</>
                      ) : (
                        <><Sparkles className="w-5 h-5 mr-2" /> Generar ruta con IA</>
                      )}
                    </Button>
                  </div>
                ) : (
                  /* Camino de nodos tipo RPG */
                  <div className="relative pl-4">
                    {tree.nodos.map((nodo, i) => {
                      const isDone = nodo.completado;
                      const isAvailable = i === nextIndex;
                      const isLocked = !isDone && !isAvailable;
                      return (
                        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                          {/* Línea conectora */}
                          {i < tree.nodos.length - 1 && (
                            <div className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${isDone ? 'bg-green-500/60' : 'bg-purple-500/20'}`} />
                          )}
                          {/* Nodo */}
                          <div className="relative z-10 shrink-0">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
                                ${isDone ? 'bg-green-500 border-green-400 text-white'
                                  : isAvailable ? `bg-gradient-to-br ${area.color} border-white/40 text-white shadow-lg`
                                  : 'bg-purple-900/50 border-purple-500/30 text-purple-400'}`}
                            >
                              {isDone ? <CheckCircle className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : i + 1}
                            </motion.div>
                          </div>
                          {/* Contenido */}
                          <div className={`flex-1 rounded-xl border p-4 transition-all
                            ${isAvailable ? 'bg-purple-800/30 border-purple-400/50' : 'bg-purple-900/20 border-purple-500/15'}`}>
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-bold ${isLocked ? 'text-purple-300/60' : 'text-white'}`}>{nodo.titulo}</h4>
                                <p className={`text-sm mt-0.5 ${isLocked ? 'text-purple-400/40' : 'text-purple-200'}`}>{nodo.descripcion}</p>
                                {nodo.recurso && !isLocked && (
                                  <p className="text-xs text-purple-300/70 mt-1.5">🔧 {nodo.recurso}</p>
                                )}
                              </div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 shrink-0">
                                <Zap className="w-3 h-3 mr-1" />{nodo.xp} XP
                              </Badge>
                            </div>
                            {isAvailable && (
                              <Button
                                onClick={() => completeNode(i)}
                                size="sm"
                                className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold"
                              >
                                <CheckCircle className="w-4 h-4 mr-1.5" /> Completar nodo
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Ruta completada */}
                    {nextIndex === -1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 text-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4"
                      >
                        <p className="text-green-300 font-bold flex items-center justify-center gap-2">
                          <Trophy className="w-5 h-5" /> ¡Ruta completada! Regenera para un nivel más avanzado.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SkillTreePage;
