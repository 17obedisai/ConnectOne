import React from 'react';
import { BrainCircuit, Dumbbell, BookOpen, Moon, Utensils, Coffee, Brush, GitBranch, Users, Pencil, Timer, Zap, Droplets, Footprints, Expand as Stretch, BookCopy } from 'lucide-react';
import EnergikoPanda from '@/components/EnergikoPanda';

export const activitiesData = {
  // Mental Wellness
  meditation: {
    title: 'Meditación Guiada',
    icon: <BrainCircuit className="w-8 h-8" />,
    description: 'Calma tu mente, reduce el estrés y mejora tu enfoque.',
    category: 'mental_wellness',
    xp: 50,
    tools: { timer: 600, music: true },
    content: [
        <h3 key="m1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
        <p key="m2" className="mb-4">La meditación de atención plena (mindfulness) ha demostrado reducir la actividad en la amígdala, el centro del miedo del cerebro, ayudando a disminuir la ansiedad y el estrés.</p>,
        <div key="m3" className="flex justify-center my-4"><EnergikoPanda mood="thoughtful" size="large" accessories={{hat: 'halo'}} /></div>,
        <h3 key="m4" className="text-xl font-bold text-foreground mt-4 mb-2">Guía Paso a Paso con Enérgiko</h3>,
        <p key="m5" className="mb-2">1. <strong>Postura Cómoda:</strong> Enérgiko se sienta con la espalda recta. ¡Imítalo! Siéntate en una silla o en un cojín.</p>,
        <p key="m6" className="mb-2">2. <strong>Enfócate en la Respiración:</strong> Siente cómo el aire entra y sale. Nota la sensación en tu nariz o el movimiento de tu abdomen.</p>,
        <p key="m7" className="mb-2">3. <strong>Mente Errante:</strong> Tu mente se distraerá. ¡Es normal! Cuando te des cuenta, simplemente redirige tu atención a la respiración con amabilidad.</p>
    ]
  },
  journaling: {
    title: 'Journaling de 5 Minutos',
    icon: <Pencil className="w-8 h-8" />,
    description: 'Escribe tus pensamientos y emociones para ganar claridad.',
    category: 'mental_wellness',
    xp: 35,
    tools: { timer: 300, music: true },
    content: [
      <h3 key="j1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
      <p key="j2" className="mb-4">Escribir sobre eventos estresantes puede reducir los síntomas de ansiedad y depresión, ya que ayuda a procesar las emociones de forma estructurada.</p>,
      <h3 key="j3" className="text-xl font-bold text-foreground mt-4 mb-2">Misión de Escritura</h3>,
      <p key="j4" className="mb-2">Dedica 5 minutos a escribir sin parar. No te preocupes por la gramática o el sentido. Simplemente, deja que tus pensamientos fluyan en el papel.</p>
    ]
  },
  reading: {
    title: 'Lectura Enfocada',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Expande tu mente y reduce el estrés con una lectura sin distracciones.',
    category: 'mental_wellness',
    xp: 40,
    tools: { timer: 1800, music: true },
    content: [
       <h3 key="r1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
       <p key="r2" className="mb-4">Leer reduce los niveles de cortisol (la hormona del estrés) hasta en un 68%, siendo más efectivo que escuchar música o caminar.</p>,
       <div key="r3" className="flex justify-center my-4"><EnergikoPanda mood="happy" size="large" accessories={{glasses: 'nerd'}} /></div>,
       <h3 key="r4" className="text-xl font-bold text-foreground mt-4 mb-2">Misión de Lectura</h3>,
       <p key="r5" className="mb-2">1. Elige un libro (físico o digital). No importa cuál, lo importante es empezar.</p>,
       <p key="r6" className="mb-2">2. Pon tu teléfono en modo no molestar.</p>,
       <p key="r7" className="mb-2">3. Usa el cronómetro y sumérgete en la lectura. ¡Disfruta!</p>
    ]
  },
  
  // Physical Wellness
  exercise: {
    title: 'Ejercicio Funcional',
    icon: <Dumbbell className="w-8 h-8" />,
    description: 'Activa tu cuerpo y libera endorfinas sin necesidad de equipo.',
    category: 'physical_wellness',
    xp: 75,
    tools: { timer: 1200, music: true },
    content: [
      <h3 key="e1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
      <p key="e2" className="mb-4">El ejercicio de alta intensidad (HIIT) no solo quema calorías durante el entreno, sino que acelera tu metabolismo durante horas después (efecto EPOC).</p>,
      <div key="e3" className="flex justify-center my-4"><EnergikoPanda mood="excited" size="large" accessories={{hat: 'bandana'}} /></div>,
      <h3 key="e4" className="text-xl font-bold text-foreground mt-4 mb-2">Misión con Enérgiko</h3>,
      <p key="e5" className="mb-2"><strong>Calentamiento (3 min):</strong> Saltos de tijera y rotaciones.</p>,
      <p key="e6" className="mb-2"><strong>Circuito (Repetir 2 veces):</strong> 12 sentadillas, 10 flexiones (en rodillas si es necesario), 15 planchas con toque de hombro.</p>,
      <p key="e7" className="mb-2"><strong>Enfriamiento (2 min):</strong> Estiramientos suaves.</p>
    ]
  },
  stretching: {
    title: 'Estiramiento de 5 Minutos',
    icon: <Stretch className="w-8 h-8" />,
    description: 'Mejora tu flexibilidad y alivia la tensión muscular.',
    category: 'physical_wellness',
    xp: 25,
    tools: { timer: 300 },
    content: [
      <p key="st1">Un estiramiento rápido puede mejorar la circulación y reducir el riesgo de lesiones. ¡Tu cuerpo te lo agradecerá!</p>
    ]
  },
  walking: {
    title: 'Caminata Corta',
    icon: <Footprints className="w-8 h-8" />,
    description: 'Sal a tomar aire fresco y activa tu circulación.',
    category: 'physical_wellness',
    xp: 30,
    tools: { timer: 900 },
    content: [
      <p key="w1">Caminar 15 minutos después de comer puede ayudar a regular los niveles de azúcar en sangre. ¡Un pequeño paseo hace una gran diferencia!</p>
    ]
  },

  // Nutrition
  water: {
    title: 'Beber 2 Vasos de Agua',
    icon: <Droplets className="w-8 h-8" />,
    description: 'Hidrata tu cuerpo para mejorar tu energía y concentración.',
    category: 'nutrition',
    xp: 15,
    tools: {},
    content: [<p key="wa1">La deshidratación leve puede afectar negativamente tu humor y capacidad de concentración. ¡A beber agua!</p>]
  },
  no_sugar: {
    title: 'Evitar Azúcar Añadido',
    icon: <Utensils className="w-8 h-8" />,
    description: 'Elige una comida y evita cualquier alimento con azúcares añadidos.',
    category: 'nutrition',
    xp: 40,
    tools: {},
    content: [<p key="ns1">Reducir el azúcar añadido es uno de los cambios más beneficiosos para tu salud general.</p>]
  },
  
  // Productivity
  pomodoro: {
    title: '1 Bloque Pomodoro',
    icon: <Timer className="w-8 h-8" />,
    description: 'Maximiza tu enfoque con un bloque de trabajo de 25 minutos.',
    category: 'productivity',
    xp: 20,
    tools: { timer: 1500, music: true },
    content: [
      <h3 key="p1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
      <p key="p2" className="mb-4">La técnica Pomodoro funciona porque combate la procrastinación al dividir grandes tareas en bloques manejables, y los descansos regulares previenen el agotamiento mental.</p>
    ]
  },
  review_goals: {
    title: 'Revisar Metas del Día',
    icon: <BookCopy className="w-8 h-8" />,
    description: 'Alinea tus acciones con tus objetivos para un día más efectivo.',
    category: 'productivity',
    xp: 15,
    tools: {},
    content: [
      <p key="rg1">Dedicar 5 minutos a planificar tu día puede ahorrarte horas de trabajo desenfocado.</p>
    ]
  },

  // Fallbacks
  sleep: {
    title: 'Higiene del Sueño',
    icon: <Moon className="w-8 h-8" />,
    description: 'Prepara tu cuerpo y mente para un descanso reparador.',
    category: 'physical_wellness',
    xp: 30,
    tools: {},
    content: [
       <h3 key="s1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
       <p key="s2" className="mb-4">La luz azul de las pantallas suprime la producción de melatonina, la hormona del sueño. Dejar de usarlas 1 hora antes de dormir mejora la calidad del descanso.</p>,
       <div key="s3" className="flex justify-center my-4"><EnergikoPanda mood="happy" size="large" accessories={{hat: 'beanie'}} /></div>,
       <h3 key="s4" className="text-xl font-bold text-foreground mt-4 mb-2">Ritual Nocturno de Enérgiko</h3>,
       <p key="s5" className="mb-2">✅ Prepara la ropa del día siguiente.</p>,
       <p key="s6" className="mb-2">✅ Toma una infusión relajante (manzanilla, tila).</p>,
       <p key="s7" className="mb-2">✅ Anota 3 cosas por las que estás agradecido hoy.</p>
    ]
  },
  nutrition: {
    title: 'Comida Consciente',
    icon: <Utensils className="w-8 h-8" />,
    description: 'Aprende a nutrir tu cuerpo con comida real y deliciosa.',
    category: 'physical_wellness',
    xp: 40,
    tools: {},
    content: [
       <h3 key="n1" className="text-xl font-bold text-foreground mb-2">Consejo Científico</h3>,
       <p key="n2" className="mb-4">Los alimentos ultraprocesados están diseñados para ser hiperpalatables, "secuestrando" los centros de recompensa del cerebro. La comida real restablece esas señales naturales.</p>,
       <div key="n3" className="flex justify-center my-4"><EnergikoPanda mood="happy" size="large" accessories={{hat: 'cowboy'}} /></div>,
       <h3 key="n4" className="text-xl font-bold text-foreground mt-4 mb-2">Misión de Comida Real</h3>,
       <p key="n5" className="mb-2">Intenta que tu próxima comida principal esté compuesta solo por "comida real": alimentos con un solo ingrediente (pollo, brócoli, arroz, aguacate, etc.).</p>
    ]
  },
};