const misiones = [
  {
    titulo: "Rutina de Fuerza para Principiantes",
    descripcion: "Desarrolla fuerza funcional con ejercicios básicos",
    categoria: "ejercicio",
    contenido: {
      introduccion: "El entrenamiento de fuerza es fundamental para la salud ósea, metabolismo y calidad de vida. Esta rutina está diseñada para principiantes y puede hacerse en casa o gym.",
      
      ciencia: "Estudios demuestran que el entrenamiento de resistencia 2-3 veces por semana aumenta la masa muscular, densidad ósea y sensibilidad a la insulina. También reduce el riesgo de caídas en un 40% y mejora la salud mental.",
      
      instrucciones: [
        {
          paso: 1,
          descripcion: "Calentamiento dinámico: rotaciones articulares y movimientos suaves",
          duracion: "5 minutos"
        },
        {
          paso: 2,
          descripcion: "Circuito principal: realizar cada ejercicio en orden",
          duracion: "20 minutos"
        },
        {
          paso: 3,
          descripcion: "Enfriamiento y estiramientos",
          duracion: "5 minutos"
        }
      ],
      
      ejercicios: [
        {
          nombre: "Sentadillas",
          series: 3,
          repeticiones: "10-12",
          descanso: "60 segundos",
          tecnica: "Pies al ancho de caderas, baja controladamente manteniendo la espalda recta, rodillas alineadas con los pies",
          erroresComunes: [
            "Rodillas hacia adentro",
            "Talones se levantan",
            "Espalda redondeada"
          ],
          imagenUrl: "/images/exercises/squat.png"
        },
        {
          nombre: "Flexiones (modificadas si es necesario)",
          series: 3,
          repeticiones: "8-10",
          descanso: "60 segundos",
          tecnica: "Manos al ancho de hombros, core activado, baja hasta que el pecho casi toque el suelo",
          erroresComunes: [
            "Caderas hundidas",
            "Codos muy abiertos",
            "Cabeza colgando"
          ]
        },
        {
          nombre: "Plancha",
          series: 3,
          repeticiones: "20-30 segundos",
          descanso: "45 segundos",
          tecnica: "Cuerpo en línea recta desde cabeza hasta talones, core activado",
          erroresComunes: [
            "Caderas muy altas o bajas",
            "Aguantar la respiración"
          ]
        }
      ],
      
      variaciones: {
        casa: "Usa botellas de agua como pesas, una silla para triceps dips",
        gym: "Añade mancuernas para las sentadillas, usa banca para flexiones inclinadas",
        principiante: "Flexiones en pared, sentadillas en silla, plancha de rodillas",
        avanzado: "Sentadillas con salto, flexiones diamante, plancha con elevación de pierna"
      },
      
      precauciones: [
        "Si sientes dolor agudo, detente inmediatamente",
        "Mantén la respiración constante, no la aguantes",
        "Si tienes lesiones previas, consulta con un profesional"
      ],
      
      calentamiento: "5 minutos de movimiento suave: círculos de brazos, rodillas al pecho, giros de cintura",
      
      enfriamiento: "Estiramientos estáticos de 30 segundos por músculo trabajado",
      
      tips: [
        "La técnica es más importante que el número de repeticiones",
        "Descansa al menos un día entre sesiones",
        "Hidrátate antes, durante y después",
        "Come proteína dentro de las 2 horas posteriores al ejercicio"
      ],
      
      beneficios: [
        "Aumenta la fuerza funcional",
        "Mejora la postura",
        "Acelera el metabolismo",
        "Reduce el riesgo de lesiones",
        "Mejora la confianza y autoestima"
      ],
      
      equipamientoNecesario: [
        "Colchoneta (opcional)",
        "Botella de agua",
        "Toalla"
      ]
    },
    duracion: 30,
    dificultad: "principiante",
    experiencia: 75
  },
  
  {
    titulo: "Meditación de Atención Plena",
    descripcion: "Cultiva la calma y claridad mental con mindfulness",
    categoria: "meditacion",
    contenido: {
      introduccion: "La meditación mindfulness reduce el estrés, mejora el enfoque y aumenta el bienestar emocional. Solo 10 minutos diarios pueden generar cambios significativos en tu cerebro.",
      
      ciencia: "Estudios de neuroimagen muestran que 8 semanas de meditación aumentan la materia gris en el hipocampo (memoria) y reducen la amígdala (centro del miedo). También mejora la regulación emocional y reduce el cortisol.",
      
      instrucciones: [
        {
          paso: 1,
          descripcion: "Encuentra un lugar tranquilo y siéntate cómodamente",
          duracion: "1 minuto"
        },
        {
          paso: 2,
          descripcion: "Cierra los ojos y enfócate en tu respiración natural",
          duracion: "2 minutos"
        },
        {
          paso: 3,
          descripcion: "Cuando tu mente divague, gentilmente regresa la atención a la respiración",
          duracion: "7 minutos"
        }
      ],
      
      tecnicaRespiracion: "Respiración 4-7-8: Inhala por 4 segundos, mantén por 7, exhala por 8. Esto activa el sistema nervioso parasimpático.",
      
      tips: [
        "No juzgues los pensamientos, solo obsérvalos",
        "La mente divagará - es normal y parte del proceso",
        "Empieza con sesiones cortas y aumenta gradualmente",
        "La consistencia es más importante que la duración"
      ],
      
      beneficios: [
        "Reduce ansiedad y depresión",
        "Mejora la concentración",
        "Aumenta la autoconciencia",
        "Mejora la calidad del sueño",
        "Fortalece el sistema inmune"
      ],
      
      preguntasReflexion: [
        "¿Qué emociones surgieron durante la práctica?",
        "¿Notaste algún patrón en tus pensamientos?",
        "¿Cómo se siente tu cuerpo después de meditar?"
      ]
    },
    duracion: 10,
    dificultad: "principiante",
    experiencia: 50
  },
  
  {
    titulo: "Lectura Activa y Aprendizaje",
    descripcion: "Desarrolla el hábito de aprendizaje continuo",
    categoria: "lectura",
    contenido: {
      introduccion: "Leer 20 minutos al día puede añadir años a tu vida, mejorar tu vocabulario, empatía y capacidad analítica. Es el hábito común entre las personas más exitosas del mundo.",
      
      ciencia: "La lectura regular reduce el deterioro cognitivo en un 32%, mejora la conectividad neuronal y puede reducir el estrés en un 68% en solo 6 minutos.",
      
      instrucciones: [
        {
          paso: 1,
          descripcion: "Elige un libro o artículo sobre un tema que te interese",
          duracion: "2 minutos"
        },
        {
          paso: 2,
          descripcion: "Lee activamente: subraya, toma notas, cuestiona",
          duracion: "15 minutos"
        },
        {
          paso: 3,
          descripcion: "Reflexiona y anota 3 ideas clave",
          duracion: "3 minutos"
        }
      ],
      
      tips: [
        "Ten siempre un libro contigo",
        "Crea un ambiente de lectura agradable",
        "Elimina distracciones (teléfono en silencio)",
        "Únete a un club de lectura para motivación extra",
        "Alterna entre ficción y no ficción"
      ],
      
      beneficios: [
        "Expande tu conocimiento y perspectiva",
        "Mejora habilidades de comunicación",
        "Desarrolla pensamiento crítico",
        "Reduce el estrés",
        "Mejora la memoria y concentración"
      ],
      
      preguntasReflexion: [
        "¿Qué aprendiste hoy que no sabías?",
        "¿Cómo puedes aplicar lo leído a tu vida?",
        "¿Qué preguntas te surgieron?"
      ]
    },
    duracion: 20,
    dificultad: "principiante",
    experiencia: 40
  },
  
  {
    titulo: "Práctica de Gratitud",
    descripcion: "Cultiva una mentalidad positiva a través del agradecimiento",
    categoria: "gratitud",
    contenido: {
      introduccion: "La gratitud es una de las prácticas más poderosas para el bienestar mental. Cambia literalmente la química de tu cerebro y mejora todas las áreas de tu vida.",
      
      ciencia: "Practicar gratitud aumenta la dopamina y serotonina, activa el hipotálamo (regulación del estrés) y puede aumentar la felicidad en un 25% en solo 10 semanas.",
      
      instrucciones: [
        {
          paso: 1,
          descripcion: "Toma tu diario o abre una nota en tu teléfono",
          duracion: "1 minuto"
        },
        {
          paso: 2,
          descripcion: "Escribe 3 cosas por las que estás agradecido hoy (sé específico)",
          duracion: "5 minutos"
        },
        {
          paso: 3,
          descripcion: "Para una, describe por qué estás agradecido y cómo te hace sentir",
          duracion: "4 minutos"
        }
      ],
      
      tips: [
        "Sé específico: en lugar de 'mi familia', escribe 'la llamada de mi madre esta mañana'",
        "Incluye cosas pequeñas: el café de la mañana, un día soleado",
        "Varía tus gratitudes para mantenerlo fresco",
        "Hazlo a la misma hora cada día para crear el hábito"
      ],
      
      beneficios: [
        "Mejora el estado de ánimo y optimismo",
        "Fortalece relaciones",
        "Mejora la calidad del sueño",
        "Reduce síntomas de depresión",
        "Aumenta la resiliencia"
      ],
      
      preguntasReflexion: [
        "¿Qué patrones notas en tus gratitudes?",
        "¿Hay alguien a quien deberías expresar tu gratitud?",
        "¿Cómo ha cambiado tu perspectiva?"
      ]
    },
    duracion: 10,
    dificultad: "principiante",
    experiencia: 35
  }
];