import React from 'react';
import { BrainCircuit, Flame, BookOpen, Moon, Utensils } from 'lucide-react';

export const activitiesData = {
  meditation: {
    title: 'Meditación Guiada',
    icon: <BrainCircuit className="w-8 h-8" />,
    description: 'Calma tu mente, reduce el estrés y mejora tu enfoque.',
    category: 'mindfulness',
    xp: 50,
    tools: { timer: true, music: true },
    content: (
      <>
        <h3 className="text-xl font-bold text-white mb-2">Fundamentos de la Meditación</h3>
        <p className="mb-4">La meditación de atención plena (mindfulness) consiste en centrar la atención en el momento presente sin juzgar. Ayuda a reducir la ansiedad y mejora la claridad mental.</p>
        <img  className="w-full h-auto rounded-lg my-4" alt="Persona meditando en un ambiente sereno" src="https://images.unsplash.com/photo-1581557568198-15aee95662e8" />
        <h3 className="text-xl font-bold text-white mt-4 mb-2">Guía Paso a Paso con Enérgiko</h3>
        <p className="mb-2">1. **Postura Cómoda:** Enérgiko se sienta con la espalda recta. ¡Imítalo! Siéntate en una silla o en un cojín.</p>
        <p className="mb-2">2. **Cierra los Ojos:** Cierra los ojos suavemente para minimizar distracciones.</p>
        <p className="mb-2">3. **Enfócate en la Respiración:** Siente cómo el aire entra y sale. Nota la sensación en tu nariz o el movimiento de tu abdomen.</p>
        <p className="mb-2">4. **Mente Errante:** Tu mente se distraerá. ¡Es normal! Cuando te des cuenta, simplemente redirige tu atención a la respiración con amabilidad, como lo haría Enérgiko.</p>
      </>
    )
  },
  exercise: {
    title: 'Ejercicio Funcional',
    icon: <Flame className="w-8 h-8" />,
    description: 'Activa tu cuerpo y libera endorfinas sin necesidad de equipo.',
    category: 'fitness',
    xp: 75,
    tools: { timer: true, music: true },
    content: (
      <>
        <h3 className="text-xl font-bold text-white mb-2">Fundamentos del Ejercicio Funcional</h3>
        <p className="mb-4">Este tipo de ejercicio entrena los músculos para ayudarte a hacer actividades cotidianas de forma segura y eficiente. ¡Mejora la fuerza, el equilibrio y la flexibilidad!</p>
        <h3 className="text-xl font-bold text-white mt-4 mb-2">Rutina con Enérgiko</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <img  className="w-full h-auto rounded-lg" alt="Enérgiko haciendo sentadillas" src="https://images.unsplash.com/photo-1637855465921-368df5f548c1" />
            <p className="text-center mt-2 font-semibold">Sentadillas (3x12)</p>
          </div>
          <div>
            <img  className="w-full h-auto rounded-lg" alt="Enérgiko haciendo flexiones" src="https://images.unsplash.com/photo-1637855465921-368df5f548c1" />
            <p className="text-center mt-2 font-semibold">Flexiones (3x10)</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-4 mb-2">Consejo de Enérgiko:</h3>
        <p>¡La forma es más importante que la velocidad! Un movimiento bien hecho vale por diez mal hechos. ¡Escucha a tu cuerpo!</p>
      </>
    )
  },
  reading: {
    title: 'Lectura de Desarrollo',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Expande tu mente, reduce el estrés y mejora tu vocabulario.',
    category: 'learning',
    xp: 40,
    tools: { timer: true, music: true },
    content: (
       <>
        <h3 className="text-xl font-bold text-white mb-2">Fundamentos del Hábito de Lectura</h3>
        <p className="mb-4">Leer regularmente es uno de los mejores ejercicios para el cerebro. Mejora la memoria, la concentración y la empatía.</p>
        <img  className="w-full h-auto rounded-lg my-4" alt="Enérgiko leyendo un libro cómodamente" src="https://images.unsplash.com/photo-1669807521659-6d1965653fb6" />
        <h3 className="text-xl font-bold text-white mt-4 mb-2">Recomendaciones de Enérgiko:</h3>
        <p className="mb-2">**No Ficción:** "Hábitos Atómicos" de James Clear - Una guía práctica para construir buenos hábitos.</p>
        <p className="mb-2">**Ficción:** "El Alquimista" de Paulo Coelho - Una historia inspiradora sobre seguir tus sueños.</p>
      </>
    )
  },
  sleep: {
    title: 'Higiene del Sueño',
    icon: <Moon className="w-8 h-8" />,
    description: 'Asegura un descanso reparador para tu bienestar físico y mental.',
    category: 'sleep',
    xp: 30,
    tools: {},
    content: (
       <>
        <h3 className="text-xl font-bold text-white mb-2">Guía para un Mejor Descanso</h3>
        <img  className="w-full h-auto rounded-lg my-4" alt="Enérgiko durmiendo plácidamente" src="https://images.unsplash.com/photo-1693030856475-2f77023cafd7" />
        <p className="mb-2">1. **Crea un ambiente oscuro y fresco:** Tu habitación debe ser un santuario para el descanso.</p>
        <p className="mb-2">2. **Evita pantallas 1 hora antes de dormir:** La luz azul interfiere con la producción de melatonina.</p>
        <p className="mb-2">3. **Establece un horario regular:** Intenta acostarte y levantarte a la misma hora todos los días.</p>
        <p className="mb-2">4. **Prueba una infusión relajante:** Manzanilla o tila pueden ayudarte a relajarte.</p>
      </>
    )
  },
  nutrition: {
    title: 'Comida Consciente',
    icon: <Utensils className="w-8 h-8" />,
    description: 'Ideas y consejos para snacks deliciosos y nutritivos.',
    category: 'nutrition',
    xp: 40,
    tools: {},
    content: (
       <>
        <h3 className="text-xl font-bold text-white mb-2">Idea de Snack Saludable</h3>
        <img  className="w-full h-auto rounded-lg my-4" alt="Enérgiko preparando un snack saludable" src="https://images.unsplash.com/photo-1697615206035-31406935fd20" />
        <p className="font-semibold mb-2">Yogur Griego con Frutos Rojos y Nueces</p>
        <p className="mb-2">**Ingredientes:** 1 taza de yogur griego natural, un puñado de frutos rojos (fresas, arándanos), un puñado de nueces.</p>
        <p className="mb-2">**Beneficios:** Proteínas del yogur para la saciedad, antioxidantes de los frutos rojos y grasas saludables de las nueces.</p>
        <h3 className="text-xl font-bold text-white mt-4 mb-2">Consejo de Enérgiko:</h3>
        <p>La planificación es clave. Ten siempre a mano opciones saludables para evitar caer en tentaciones poco nutritivas.</p>
      </>
    )
  }
};