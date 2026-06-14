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
  if (context.fechaActual) lines.push(`Fecha y hora actual: ${context.fechaActual}`);
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

// Genera una ruta de progresión tipo árbol de habilidades RPG para un área de interés.
// Devuelve { ok, configured, nodos: [{ titulo, descripcion, recurso, xp }] }.
const generateSkillTree = async ({ nombreArea, descripcionArea = '', nivelUsuario = 1 }) => {
  const ai = getClient();
  if (!ai) {
    return { ok: false, configured: false, nodos: [] };
  }

  const prompt = `Diseña una ruta de progresión tipo "árbol de habilidades" de videojuego RPG,
pero aplicada a la vida real, para el área: "${nombreArea}"${descripcionArea ? ` (${descripcionArea})` : ''}.
El usuario está aproximadamente en el nivel ${nivelUsuario} de su viaje.

Reglas:
- Genera entre 6 y 8 nodos ORDENADOS de lo más básico/fundacional a lo más avanzado.
- Cada nodo es una habilidad o reto CONCRETO y accionable (no genérico).
- "recurso" = una herramienta, libro, app o práctica concreta recomendada (o cadena vacía).
- "xp" crece con la dificultad (ej. 100, 150, 200, 300...).

Devuelve EXCLUSIVAMENTE JSON válido con esta forma exacta:
{"nodos":[{"titulo":"string corto","descripcion":"1 frase accionable","recurso":"string","xp":120}]}
Responde en español.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.85,
        // Desactivamos el "thinking" de 2.5 Flash para que TODO el presupuesto de
        // tokens vaya a la salida JSON (si no, el JSON se trunca a medio string).
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 3000
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const nodos = Array.isArray(parsed.nodos)
      ? parsed.nodos
          .filter((n) => n && n.titulo)
          .map((n, i) => ({
            titulo: String(n.titulo).slice(0, 120),
            descripcion: String(n.descripcion || '').slice(0, 300),
            recurso: String(n.recurso || '').slice(0, 160),
            xp: Number.isFinite(n.xp) ? Math.max(50, Math.round(n.xp)) : 100 + i * 50
          }))
      : [];

    return { ok: nodos.length > 0, configured: true, nodos };
  } catch (error) {
    console.error('[gemini] Error generando árbol de habilidades:', error.message);
    return { ok: false, configured: true, nodos: [] };
  }
};

// ─────────────────────────────────────────────────────────────
// AGENTE: Energiko que EJECUTA acciones en la app vía function calling.
// ─────────────────────────────────────────────────────────────
const AGENT_SYSTEM_INSTRUCTION = `
${SYSTEM_INSTRUCTION}

Además de aconsejar, PUEDES ejecutar acciones reales en ConnectONE con las herramientas
disponibles (crear recordatorios, agendar bloques de tiempo, agregar tareas críticas del día,
registrar ingresos/gastos y anotar aprendizajes en la bitácora).

Reglas de uso de herramientas:
- Si el usuario pide crear, agendar, registrar, apuntar o recordar algo, USA la herramienta
  correspondiente en lugar de solo describir lo que haría.
- Usa la "Fecha y hora actual" del contexto para resolver fechas relativas ("hoy", "mañana",
  "el domingo", "el viernes a las 7pm"). Pasa SIEMPRE fecha como YYYY-MM-DD y horas como HH:MM (24h).
- Si falta un dato esencial (p. ej. el monto de un gasto), pregúntalo en una frase corta; no lo inventes.
- Tras ejecutar, confirma en 1-2 frases lo que hiciste, claro y cálido.
- Para dudas o consejo sin acción, responde normal, sin usar herramientas.
`.trim();

// Orquesta un turno del agente: llama al modelo con herramientas, ejecuta las que pida
// (vía executeTool, que vive en la ruta y tiene acceso a la BD) y devuelve la confirmación.
const runAssistantAgent = async ({ message, history = [], context = {}, tools = [], executeTool }) => {
  const ai = getClient();
  if (!ai) {
    return {
      ok: false,
      configured: false,
      text: 'Aún no tengo conectado mi cerebro de IA (falta GEMINI_API_KEY en el servidor). ' +
        'Cuando lo configures podré agendar, recordar y registrar cosas por ti. 🤖',
      acciones: []
    };
  }

  const contents = history
    .filter((m) => m && m.text)
    .map((m) => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: m.text }] }));
  contents.push({ role: 'user', parts: [{ text: `${message}${buildContextBlock(context)}` }] });

  const toolConfig = tools.length ? [{ functionDeclarations: tools }] : undefined;

  try {
    const first = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: AGENT_SYSTEM_INSTRUCTION,
        tools: toolConfig,
        temperature: 0.6,
        maxOutputTokens: 900
      }
    });

    const calls = first.functionCalls || [];

    // Sin acciones: respuesta de chat normal.
    if (!calls.length) {
      return { ok: true, configured: true, text: (first.text || '').trim(), acciones: [] };
    }

    // Ejecuta cada herramienta y arma las respuestas para el segundo turno.
    contents.push({ role: 'model', parts: calls.map((c) => ({ functionCall: { name: c.name, args: c.args } })) });
    const acciones = [];
    const responseParts = [];
    for (const c of calls) {
      let result;
      try {
        result = await executeTool(c.name, c.args || {});
      } catch (e) {
        result = { ok: false, error: e.message };
      }
      acciones.push({ name: c.name, args: c.args || {}, result });
      responseParts.push({ functionResponse: { name: c.name, response: (result && typeof result === 'object') ? result : { result } } });
    }
    contents.push({ role: 'user', parts: responseParts });

    // Segundo turno (sin herramientas) para la confirmación natural.
    const second = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: { systemInstruction: AGENT_SYSTEM_INSTRUCTION, temperature: 0.5, maxOutputTokens: 400 }
    });

    return { ok: true, configured: true, text: (second.text || '').trim(), acciones };
  } catch (error) {
    console.error('[gemini] Error en el agente:', error.message);
    return { ok: false, configured: true, text: 'Tuve un problema ejecutando esa acción. Intenta de nuevo.', acciones: [] };
  }
};

// Genera retos secundarios (para días libres) según lugar e intereses.
const generateRetos = async ({ lugar = '', intereses = [], cantidad = 5 }) => {
  const ai = getClient();
  if (!ai) return { ok: false, configured: false, retos: [] };

  const n = Math.min(Math.max(parseInt(cantidad, 10) || 5, 1), 8);
  const ctx = [];
  if (lugar) ctx.push(`Lugar/contexto del usuario: ${lugar}`);
  if (intereses.length) ctx.push(`Intereses: ${intereses.join(', ')}`);

  const prompt = `Genera ${n} "retos" secundarios para días libres o festivos (cosas opcionales,
sin fecha fija, que la persona hace cuando tiene tiempo). Variados y concretos.
${ctx.join('\n')}

Cada reto: titulo corto, descripcion (1 frase motivadora), categoria (una de: aventura, naturaleza,
fitness, social, creatividad, aprendizaje, hogar, mente, otro), contexto (uno de: aire_libre, casa,
ciudad, cualquiera), dificultad (facil, media, dificil), duracion (ej "30 min", "2 h"), xp (100-350 según dificultad).

Devuelve EXCLUSIVAMENTE JSON:
{"retos":[{"titulo":"","descripcion":"","categoria":"","contexto":"","dificultad":"","duracion":"","xp":150}]}
Responde en español.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION, responseMimeType: 'application/json', temperature: 0.95, thinkingConfig: { thinkingBudget: 0 }, maxOutputTokens: 2000 }
    });
    const parsed = JSON.parse(response.text || '{}');
    const retos = Array.isArray(parsed.retos) ? parsed.retos.filter((r) => r && r.titulo) : [];
    return { ok: retos.length > 0, configured: true, retos };
  } catch (error) {
    console.error('[gemini] Error generando retos:', error.message);
    return { ok: false, configured: true, retos: [] };
  }
};

module.exports = {
  MODEL,
  SYSTEM_INSTRUCTION,
  isConfigured,
  generateAssistantReply,
  generateSkillTree,
  runAssistantAgent,
  generateRetos
};
