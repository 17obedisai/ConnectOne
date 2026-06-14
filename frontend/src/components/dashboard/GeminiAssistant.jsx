import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import api from '@/services/api';

// Sugerencias rápidas que rellenan el input con un toque.
const QUICK_PROMPTS = [
  'Recuérdame cambiar el aceite de la moto el viernes',
  'Agéndame el domingo 2 horas de piano',
  'Registra un gasto de 20.000 en comida',
  'Tengo 40 minutos libres, ¿qué avanzo?'
];

// Metadatos visuales de cada acción que el agente puede ejecutar.
const ACTION_META = {
  crear_recordatorio: { emoji: '📌', label: 'Recordatorio' },
  agendar_bloque: { emoji: '📅', label: 'Agendado' },
  agregar_tarea_critica: { emoji: '🎯', label: 'Tarea del día' },
  registrar_movimiento: { emoji: '💰', label: 'Movimiento' },
  anotar_aprendizaje: { emoji: '📓', label: 'Bitácora' },
  crear_nota: { emoji: '📝', label: 'Nota' },
  crear_reto: { emoji: '🎯', label: 'Reto' }
};
const accionDetalle = (a) =>
  a.args?.titulo || a.args?.texto || a.args?.descripcion ||
  (a.args?.monto ? `$${Number(a.args.monto).toLocaleString('es-CO')}` : '');

// context: { energia, horasSueno, tareasFoco: string[] } — se envía al coach para personalizar.
// prominent: versión grande/protagonista (chat más alto) para el panel principal.
const GeminiAssistant = ({ context = {}, prominent = false }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: '¡Hola! Soy Energiko, tu copiloto de alto rendimiento. Dime cuánto tiempo tienes o cómo te sientes y te doy el siguiente paso exacto. 🎯'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || loading) return;

    const history = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/ai/assistant', { message, history, context });
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data.reply, configured: data.configured, acciones: data.acciones || [] }
      ]);
      // Si el agente ejecutó acciones, avisa a otras vistas (Centro de Comando, etc.) para refrescar.
      if (data.acciones && data.acciones.length) {
        window.dispatchEvent(new CustomEvent('connectone:refresh', { detail: data.acciones }));
      }
    } catch (error) {
      const text =
        error.response?.data?.message ||
        error.message ||
        'No pude conectar con la IA. Intenta de nuevo.';
      setMessages((prev) => [...prev, { role: 'model', text, isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur border-purple-500/30 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <span className="relative">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </span>
          Asistente Gemini
          <span className="ml-auto text-xs font-normal text-purple-300/70 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5" /> Energiko · Flash
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Historial */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto space-y-3 pr-1 ${prominent ? 'max-h-[26rem] min-h-[19rem]' : 'max-h-80 min-h-[12rem]'}`}
        >
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${m.role === 'user' ? '' : 'space-y-1.5'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                      ${m.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                        : m.isError
                          ? 'bg-red-500/15 border border-red-500/30 text-red-200 rounded-bl-sm'
                          : 'bg-white/5 border border-white/10 text-purple-100 rounded-bl-sm'}`}
                  >
                    {m.text}
                  </div>
                  {/* Chips de acciones ejecutadas por el agente */}
                  {m.acciones && m.acciones.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.acciones.map((a, idx) => {
                        const meta = ACTION_META[a.name] || { emoji: '✅', label: 'Hecho' };
                        const ok = a.result?.ok !== false;
                        return (
                          <span
                            key={idx}
                            className={`text-[11px] px-2 py-1 rounded-full border flex items-center gap-1 ${ok ? 'bg-green-500/15 border-green-500/30 text-green-200' : 'bg-amber-500/15 border-amber-500/30 text-amber-200'}`}
                            title={accionDetalle(a)}
                          >
                            <span>{meta.emoji}</span>
                            <span className="font-semibold">{meta.label}</span>
                            {accionDetalle(a) && <span className="opacity-80 truncate max-w-[10rem]">· {accionDetalle(a)}</span>}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-purple-200 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Energiko está pensando...
              </div>
            </div>
          )}
        </div>

        {/* Sugerencias rápidas (solo al inicio de la conversación) */}
        {messages.length <= 1 && !loading && (
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-full px-3 py-1.5 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntale a Energiko..."
            disabled={loading}
            className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-400/60"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-11 w-11 p-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shrink-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeminiAssistant;
