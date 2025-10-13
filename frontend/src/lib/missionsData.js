// src/lib/missionsData.js

export const transformativeMissions = [
  {
    id: 'tm1',
    titulo: 'Protocolo de Sueño Óptimo',
    descripcionCorta: 'Transforma tu descanso en una ventaja competitiva',
    categoria: 'sueño-longevidad',
    duracion: 480,
    experiencia: 200,
    dificultad: 'intermedio',
    icono: '😴',
    color: 'from-indigo-600 to-purple-700',
    bgColor: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    shadowColor: 'shadow-indigo-500/50',
    impactoVida: 95,
    prioridad: 1,
    contenido: {
      descripcionCompleta: 'El sueño es la base de todo rendimiento. Este protocolo te enseña a dormir como un atleta de élite.',
      ciencia: {
        titulo: 'La Ciencia del Sueño',
        estudios: [
          'Dormir menos de 7 horas aumenta el riesgo de obesidad en 55%',
          'El sueño profundo limpia toxinas cerebrales (incluido beta-amiloide)',
          'Una noche de mal sueño reduce la sensibilidad a la insulina en 30%'
        ],
        mecanismos: [
          'Consolidación de memoria',
          'Regulación hormonal',
          'Reparación celular',
          'Limpieza del sistema glinfático'
        ]
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Rutina de Desconexión (2h antes)',
          descripcion: 'Apaga pantallas y baja intensidad lumínica',
          duracion: '30 min',
          icono: '🌅',
          tips: ['Luz cálida', 'Modo noche en dispositivos']
        },
        {
          paso: 2,
          titulo: 'Temperatura Óptima',
          descripcion: 'Habitación entre 18-20°C',
          duracion: '10 min',
          icono: '❄️',
          tips: ['Ducha caliente antes', 'Ventilación']
        },
        {
          paso: 3,
          titulo: 'Oscuridad Total',
          descripcion: 'Elimina toda fuente de luz',
          duracion: '5 min',
          icono: '🌑',
          tips: ['Cortinas blackout', 'Tape LEDs']
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Energía al despertar', icono: '⚡', detalle: 'Sin necesidad de alarma' },
          { texto: 'Claridad mental', icono: '🧠', detalle: 'Concentración mejorada' }
        ],
        largoplazo: [
          { texto: 'Longevidad aumentada', icono: '🌟', detalle: 'Vive más y mejor' },
          { texto: 'Salud metabólica', icono: '💪', detalle: 'Peso y hormonas optimizadas' }
        ]
      }
    }
  },
  {
    id: 'tm2',
    titulo: 'Alimentación Estratégica',
    descripcionCorta: 'Come como un atleta de alto rendimiento',
    categoria: 'nutrición-energía',
    duracion: 60,
    experiencia: 150,
    dificultad: 'principiante',
    icono: '🥗',
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-600 to-emerald-700',
    shadowColor: 'shadow-green-500/50',
    impactoVida: 90,
    prioridad: 2,
    contenido: {
      descripcionCompleta: 'La nutrición óptima es combustible para tu cuerpo y mente.',
      ciencia: {
        titulo: 'Ciencia Nutricional',
        estudios: [
          'Dieta mediterránea reduce mortalidad cardiovascular en 30%',
          'Proteína adecuada preserva masa muscular y metabolismo'
        ],
        mecanismos: ['Nutrición celular', 'Balance hormonal']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Proteína en cada comida',
          descripcion: '1.6-2g por kg de peso corporal',
          duracion: '15 min',
          icono: '🍗'
        },
        {
          paso: 2,
          titulo: 'Vegetales abundantes',
          descripcion: 'Mitad del plato en cada comida',
          duracion: '10 min',
          icono: '🥦'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Energía estable', icono: '⚡', detalle: 'Sin bajones' }
        ],
        largoplazo: [
          { texto: 'Composición corporal óptima', icono: '💪', detalle: 'Músculo, no grasa' }
        ]
      }
    }
  },
  {
    id: 'tm3',
    titulo: 'Terapia Cognitivo-Conductual',
    descripcionCorta: 'Reprograma tu mente para el éxito',
    categoria: 'salud-mental',
    duracion: 30,
    experiencia: 120,
    dificultad: 'intermedio',
    icono: '🧠',
    color: 'from-blue-600 to-cyan-700',
    bgColor: 'bg-gradient-to-br from-blue-600 to-cyan-700',
    shadowColor: 'shadow-blue-500/50',
    impactoVida: 88,
    prioridad: 3,
    contenido: {
      descripcionCompleta: 'La TCC es la terapia más efectiva respaldada por ciencia.',
      ciencia: {
        titulo: 'Neuroplasticidad',
        estudios: ['TCC tan efectiva como antidepresivos pero sin efectos secundarios'],
        mecanismos: ['Reestructuración cognitiva', 'Nuevas conexiones neuronales']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Identifica pensamientos automáticos',
          descripcion: 'Observa tus pensamientos sin juzgar',
          duracion: '10 min',
          icono: '🔍'
        },
        {
          paso: 2,
          titulo: 'Cuestiona la evidencia',
          descripcion: '¿Es este pensamiento 100% cierto?',
          duracion: '10 min',
          icono: '❓'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Claridad mental', icono: '💡', detalle: 'Pensamientos más racionales' }
        ],
        largoplazo: [
          { texto: 'Resiliencia mental', icono: '🛡️', detalle: 'Menos ansiedad y depresión' }
        ]
      }
    }
  },
  {
    id: 'tm4',
    titulo: 'Protocolo de Ejercicio Óptimo',
    descripcionCorta: 'Entrenamiento científico para longevidad',
    categoria: 'fitness-longevidad',
    duracion: 45,
    experiencia: 180,
    dificultad: 'intermedio',
    icono: '💪',
    color: 'from-red-600 to-orange-700',
    bgColor: 'bg-gradient-to-br from-red-600 to-orange-700',
    shadowColor: 'shadow-red-500/50',
    impactoVida: 92,
    prioridad: 4,
    contenido: {
      descripcionCompleta: 'El ejercicio reduce la mortalidad en 45% - más que cualquier medicamento.',
      ciencia: {
        titulo: 'Ejercicio como Medicina',
        estudios: [
          'VO2max es el predictor #1 de longevidad',
          'Entrenamiento en Zona 2 mejora mitocondrias en 100%'
        ],
        mecanismos: ['Mitocondrias nuevas', 'BDNF aumentado', 'Mioquinas anti-inflamatorias']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Lunes - Fuerza Superior',
          descripcion: 'Pecho, espalda, hombros, brazos',
          duracion: '45-60 min',
          icono: '💪'
        },
        {
          paso: 2,
          titulo: 'Martes - Cardio Zona 2',
          descripcion: 'Intensidad conversacional',
          duracion: '45-60 min',
          icono: '🚴'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Energía +50%', icono: '⚡', detalle: 'Endorfinas naturales' }
        ],
        largoplazo: [
          { texto: 'Vives 10-20 años más', icono: '🌟', detalle: 'Compresión de morbilidad' }
        ]
      }
    }
  },
  {
    id: 'tm5',
    titulo: 'Meditación y Mindfulness',
    descripcionCorta: 'Entrena tu atención como un monje',
    categoria: 'meditación-mindfulness',
    duracion: 20,
    experiencia: 100,
    dificultad: 'principiante',
    icono: '🧘',
    color: 'from-purple-600 to-pink-700',
    bgColor: 'bg-gradient-to-br from-purple-600 to-pink-700',
    shadowColor: 'shadow-purple-500/50',
    impactoVida: 85,
    prioridad: 5,
    contenido: {
      descripcionCompleta: 'La meditación cambia físicamente tu cerebro en 8 semanas.',
      ciencia: {
        titulo: 'Neurociencia de la Meditación',
        estudios: ['8 semanas de meditación aumenta materia gris en hipocampo'],
        mecanismos: ['Neuroplasticidad', 'Regulación emocional']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Siéntate cómodamente',
          descripcion: 'Espalda recta, ojos cerrados',
          duracion: '2 min',
          icono: '🪑'
        },
        {
          paso: 2,
          titulo: 'Enfócate en la respiración',
          descripcion: 'Observa cada inhalación y exhalación',
          duracion: '15 min',
          icono: '🌬️'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Calma mental', icono: '☮️', detalle: 'Reducción de estrés' }
        ],
        largoplazo: [
          { texto: 'Cerebro optimizado', icono: '🧠', detalle: 'Mejor atención y memoria' }
        ]
      }
    }
  },
  {
    id: 'tm6',
    titulo: 'Conexiones Sociales',
    descripcionCorta: 'Las relaciones son medicina',
    categoria: 'social-conexión',
    duracion: 30,
    experiencia: 80,
    dificultad: 'principiante',
    icono: '🤝',
    color: 'from-pink-600 to-rose-700',
    bgColor: 'bg-gradient-to-br from-pink-600 to-rose-700',
    shadowColor: 'shadow-pink-500/50',
    impactoVida: 87,
    prioridad: 6,
    contenido: {
      descripcionCompleta: 'Las relaciones sociales fuertes reducen mortalidad en 50%.',
      ciencia: {
        titulo: 'Ciencia de las Conexiones',
        estudios: ['Soledad tan dañina como fumar 15 cigarrillos al día'],
        mecanismos: ['Oxitocina', 'Apoyo emocional', 'Regulación del estrés']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Llamada significativa',
          descripcion: 'Contacta a alguien importante',
          duracion: '15 min',
          icono: '📞'
        },
        {
          paso: 2,
          titulo: 'Escucha activa',
          descripcion: 'Pregunta cómo está realmente',
          duracion: '15 min',
          icono: '👂'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Felicidad aumentada', icono: '😊', detalle: 'Oxitocina liberada' }
        ],
        largoplazo: [
          { texto: 'Longevidad +50%', icono: '❤️', detalle: 'Reducción de mortalidad' }
        ]
      }
    }
  },
  {
    id: 'tm7',
    titulo: 'Exposición a Frío',
    descripcionCorta: 'Hormesis fría para superhumanos',
    categoria: 'biohacking',
    duracion: 15,
    experiencia: 140,
    dificultad: 'avanzado',
    icono: '❄️',
    color: 'from-cyan-600 to-blue-700',
    bgColor: 'bg-gradient-to-br from-cyan-600 to-blue-700',
    shadowColor: 'shadow-cyan-500/50',
    impactoVida: 75,
    prioridad: 7,
    contenido: {
      descripcionCompleta: 'El frío activa grasa parda, aumenta metabolismo y mejora inmunidad.',
      ciencia: {
        titulo: 'Termogénesis y Hormesis',
        estudios: ['Inmersión en frío aumenta norepinefrina en 530%'],
        mecanismos: ['Activación de grasa parda', 'Aumento de dopamina']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: 'Ducha gradual',
          descripcion: 'Termina con 30 segundos de agua fría',
          duracion: '5 min',
          icono: '🚿'
        },
        {
          paso: 2,
          titulo: 'Respiración controlada',
          descripcion: 'Inhala profundo durante el frío',
          duracion: '2 min',
          icono: '🌬️'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Alerta mental', icono: '⚡', detalle: 'Norepinefrina alta' }
        ],
        largoplazo: [
          { texto: 'Metabolismo acelerado', icono: '🔥', detalle: 'Grasa parda activa' }
        ]
      }
    }
  },
  {
    id: 'tm8',
    titulo: 'Journaling Estructurado',
    descripcionCorta: 'Escribe para transformar tu mente',
    categoria: 'desarrollo-personal',
    duracion: 15,
    experiencia: 70,
    dificultad: 'principiante',
    icono: '📝',
    color: 'from-amber-600 to-yellow-700',
    bgColor: 'bg-gradient-to-br from-amber-600 to-yellow-700',
    shadowColor: 'shadow-amber-500/50',
    impactoVida: 80,
    prioridad: 8,
    contenido: {
      descripcionCompleta: 'El journaling reduce ansiedad, aumenta gratitud y clarifica objetivos.',
      ciencia: {
        titulo: 'Psicología del Journaling',
        estudios: ['Escribir sobre gratitud aumenta felicidad en 25%'],
        mecanismos: ['Procesamiento emocional', 'Claridad cognitiva']
      },
      instrucciones: [
        {
          paso: 1,
          titulo: '3 gratitudes',
          descripcion: 'Escribe 3 cosas por las que estás agradecido',
          duracion: '5 min',
          icono: '🙏'
        },
        {
          paso: 2,
          titulo: 'Reflexión del día',
          descripcion: '¿Qué aprendiste hoy?',
          duracion: '5 min',
          icono: '💭'
        }
      ],
      beneficios: {
        inmediatos: [
          { texto: 'Claridad mental', icono: '💡', detalle: 'Pensamientos organizados' }
        ],
        largoplazo: [
          { texto: 'Felicidad +25%', icono: '😊', detalle: 'Gratitud habitual' }
        ]
      }
    }
  }
];

export default transformativeMissions;