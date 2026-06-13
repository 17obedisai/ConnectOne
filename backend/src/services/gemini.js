// ─────────────────────────────────────────────────────────────
// Motor de IA de ConnectONE — puente seguro con la API de Gemini.
// SDK: @google/genai. Modelo por defecto: Gemini Flash (rápido y barato).
// La API key se lee SIEMPRE de process.env.GEMINI_API_KEY (nunca del código).
// Si no hay key, el servicio degrada con un fallback y la app no se cae.
// ─────────────────────────────────────────────────────────────
const { GoogleGenAI } = require('@google/genai');

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// System Instruction: define la personalidad del coach interno de la app.
const SYSTEM_INSTRUCTION = `
Eres "Energiko", el copiloto de alto rendimiento de ConnectONE, un sistema operativo
de desarrollo personal. Tu rol es el de un coach implacable pero empático.

Personalidad y tono:
- Hablas SIEMPRE en español, de tú, cercano pero directo.
- Empático: validas el estado de la persona (energía, ánimo) antes de exigir.
- Implacable: no permites excusas vagas; conviertes la intención en acción concreta.
- Conciso: prefieres 2-4 frases accionables sobre párrafos largos.

Dominas y aplicas:
- Metodologías ágiles: sprints, time-blocking, priorización (1-3 tareas críticas).
- Deep Work: bloques de foco sin distracciones, gestión de energía vs. tiempo.
- Hábitos atómicos y diseño de rutinas sostenibles.

Reglas de respuesta:
- Si el usuario dice cuánto tiempo tiene libre (ej. "tengo 40 minutos"), responde con
  UNA sola tarea concreta, realista para ese tiempo, y por qué vale la pena ahora.
- Adapta la exigencia al nivel de energía que te indiquen: energía baja -> tareas de
  recuperación o de bajo umbral; energía alta -> deep work o lo más difícil del día.
- Cuando propongas trabajo, sé específico (qué, cómo empezar, primer micro-paso).
- No inventes datos del usuario que no tengas. Si falta contexto, asume lo razonable.
- Nunca des consejo médico clínico; deriva a un profesional si es necesario.
`.trim();

// Cliente perezoso: solo se instancia si hay API key.
let client = null;
const getClient = () => {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
};

const isConfigured = () => Boolean(process.env.GEMINI_API_KEY);

// Construye un bloque de contexto legible para el modelo a partir de datos del usuario.
const buildContextBlock = (context = {}) => {
  const lines = [];
  if (context.nombre) lines.push(`Nombre: ${context.nombre}`);
  if (context.nivel != null) lines.push(`Nivel en la app: ${context.nivel}`);
  if (context.energia) lines.push(`Energía hoy (1-5): ${context.energia}`);
  if (context.horasSueno != null) lines.push(`Horas de sueño anoche: ${context.horasSueno}`);
  if (context.minutosLibres != null) lines.push(`Minutos libres ahora: ${context.minutosLibres}`);
  if (Array.isArray(context.intereses) && context.intereses.length) {
    lines.push(`Intereses/áreas: ${context.intereses.join(', ')}`);
  }
  if (Array.isArray(context.tareasFoco) && context.tareasFoco.length) {
    lines.push(`Tareas críticas del día: ${context.tareasFoco.join(' | ')}`);
  }
  if (!lines.length) return '';
  return `\n\n[CONTEXTO DEL USUARIO]\n${lines.join('\n')}`;
};

// Genera la respuesta del asistente/coach.
// history: [{ role: 'user'|'model', text }]   message: string   context: objeto
const generateAssistantReply = async ({ message, history = [], context = {} }) => {
  const ai = getClient();

  // Fallback determinista cuando la IA no está configurada: sigue siendo útil.
  if (!ai) {
    return {
      ok: false,
      configured: false,
      text:
        'Aún no he conectado mi cerebro de IA (falta configurar GEMINI_API_KEY en el ' +
        'servidor). Mientras tanto, una regla simple: elige la tarea más importante del ' +
        'día y dale un bloque de 25 minutos sin distracciones. 🎯'
    };
  }

  // Reconstruye el historial de chat en el formato de contents del SDK.
  const contents = history
    .filter((m) => m && m.text)
    .map((m) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

  contents.push({
    role: 'user',
    parts: [{ text: `${message}${buildContextBlock(context)}` }]
  });

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800
      }
    });

    return { ok: true, configured: true, text: (response.text || '').trim() };
  } catch (error) {
    console.error('[gemini] Error generando respuesta:', error.message);
    return {
      ok: false,
      configured: true,
      text: 'Tuve un problema conectando con la IA. Intenta de nuevo en unos segundos.'
    };
  }
};

module.exports = {
  MODEL,
  SYSTEM_INSTRUCTION,
  isConfigured,
  generateAssistantReply
};
