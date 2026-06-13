import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { StickyNote, Mic, MicOff, Save, Trash2, Loader2 } from 'lucide-react';
import api from '@/services/api';

const CATEGORIAS = {
  idea: { emoji: '💡', label: 'Idea' },
  proyecto: { emoji: '🛠️', label: 'Proyecto' },
  lectura: { emoji: '📖', label: 'Lectura' },
  personal: { emoji: '🙂', label: 'Personal' },
  tarea: { emoji: '✅', label: 'Tarea' },
  otro: { emoji: '📝', label: 'Otro' }
};

const NotasPage = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('idea');
  const [saving, setSaving] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // ¿El navegador soporta dictado por voz?
  const speechSupported =
    typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get('/notes');
        if (active) setNotes(data?.data || []);
      } catch (e) {
        console.error('Error cargando notas:', e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    // Limpia el reconocimiento de voz al desmontar.
    return () => {
      active = false;
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleMic = () => {
    if (!speechSupported) {
      toast({ title: 'Voz no disponible', description: 'Tu navegador no soporta dictado. Prueba en Chrome.', variant: 'destructive' });
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'es-CO';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let finalText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
      }
      if (finalText) setContenido((prev) => (prev ? prev.trim() + ' ' : '') + finalText.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  const guardar = async () => {
    if (!contenido.trim()) return;
    setSaving(true);
    recognitionRef.current?.stop();
    try {
      const { data } = await api.post('/notes', { contenido: contenido.trim(), categoria });
      setNotes((prev) => [data.data, ...prev]);
      setContenido('');
      toast({ title: '📝 Nota guardada' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo guardar.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const eliminar = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (e) { /* noop */ }
  };

  return (
    <>
      <Helmet><title>Notas - ConnectONE</title></Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <StickyNote className="w-7 h-7 text-amber-300" />
            Notas
          </h1>
          <p className="text-purple-200 mt-2">Captura ideas al instante — escribiendo o por voz. 🎤</p>
        </div>

        {/* Editor de nota */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30">
          <CardContent className="p-5 space-y-3">
            <div className="relative">
              <Textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe tu nota, o toca el micrófono para dictarla..."
                className="bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 min-h-[110px] pr-12"
              />
              {/* Botón de micrófono */}
              <button
                onClick={toggleMic}
                title={listening ? 'Detener dictado' : 'Dictar por voz'}
                className={`absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center transition-all
                  ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
              >
                {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {listening && (
              <p className="text-xs text-red-300 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Escuchando... habla con naturalidad.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="h-9 rounded-lg bg-slate-800 border border-white/10 text-white text-sm px-2"
              >
                {Object.entries(CATEGORIAS).map(([k, v]) => (
                  <option key={k} value={k}>{v.emoji} {v.label}</option>
                ))}
              </select>
              <Button
                onClick={guardar}
                disabled={saving || !contenido.trim()}
                className="h-9 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 ml-auto"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
                Guardar nota
              </Button>
            </div>
            {!speechSupported && (
              <p className="text-xs text-purple-300/50">El dictado por voz funciona mejor en Chrome de escritorio o Android.</p>
            )}
          </CardContent>
        </Card>

        {/* Lista de notas */}
        {loading ? (
          <div className="flex items-center justify-center py-12 text-purple-200 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Cargando notas...
          </div>
        ) : notes.length === 0 ? (
          <p className="text-center text-purple-300/60 py-8">Aún no tienes notas. Crea la primera arriba. ✍️</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {notes.map((n) => (
                <motion.div
                  key={n._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-200">
                      {CATEGORIAS[n.categoria]?.emoji} {CATEGORIAS[n.categoria]?.label}
                    </span>
                    <button onClick={() => eliminar(n._id)} className="text-purple-300/40 hover:text-red-400 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-purple-100 text-sm whitespace-pre-wrap flex-1">{n.contenido}</p>
                  <p className="text-purple-400/40 text-[11px] mt-2">
                    {new Date(n.createdAt).toLocaleString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};

export default NotasPage;
