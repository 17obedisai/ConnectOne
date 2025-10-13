// missionsData.js - Base completa de misiones transformadoras basadas en ciencia
// Inspirado en: Atomic Habits, Why We Sleep, The Power of Now, Deep Work, etc.

export const transformativeMissions = [
  {
    id: 'tm1',
    titulo: 'Protocolo de Sueño Profundo',
    descripcionCorta: 'Optimización científica del sueño para máximo rendimiento',
    categoria: 'salud-fundamental',
    duracion: 30,
    experiencia: 150,
    dificultad: 'intermedio',
    icono: '🌙',
    color: 'from-indigo-600 to-purple-700',
    bgColor: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    shadowColor: 'shadow-indigo-500/50',
    impactoVida: 95, // Porcentaje de impacto en la vida
    prioridad: 1,
    contenido: {
      descripcionCompleta: `El sueño es la base fundamental de toda salud física y mental. Matthew Walker (UC Berkeley) demuestra que dormir menos de 7 horas reduce expectativa de vida, aumenta riesgo de Alzheimer 40%, diabetes tipo 2 en 30%, y deteriora función inmune 70%. Este protocolo optimiza las 4 fases del sueño para máxima restauración.`,
      
      ciencia: {
        titulo: 'Neurociencia del Sueño Reparador',
        estudios: [
          'Matthew Walker - UC Berkeley: 7-9 horas esenciales para limpieza cerebral de beta-amiloide',
          'Nature Medicine 2021: Sistema glinfático elimina toxinas 60% más eficiente durante sueño profundo',
          'Harvard Medical School: Consolidación memoria aumenta 40% con sueño REM óptimo',
          'Stanford Sleep Lab: Temperatura corporal 1-2°C menor mejora sueño profundo 28%',
          'Journal of Neuroscience: Hormona crecimiento se libera 70% durante sueño profundo',
          'Cell Metabolism: Regulación metabólica y pérdida peso optimizada con 8 horas sueño',
          'PNAS: Sistema inmune adaptativo se recalibra durante sueño, mejora respuesta 3x',
          'Science: Creatividad y resolución problemas aumenta 33% post-REM'
        ],
        mecanismos: [
          'Adenosina: Se acumula durante vigilia, el café la bloquea temporalmente',
          'Melatonina: Hormona del sueño, pico a las 2-3 AM',
          'Cortisol: Debe bajar por la noche, sube al amanecer',
          'Temperatura corporal: Descenso de 1-2°C facilita sueño',
          'Ondas cerebrales: De Beta (vigilia) a Delta (sueño profundo)',
          'Sistema glinfático: Limpieza cerebral activa durante sueño'
        ]
      },
      
      protocolo: {
        preparacion: [
          { 
            hora: '2 horas antes', 
            accion: 'Última comida pesada', 
            razon: 'Digestión interfiere con sueño profundo',
            tips: ['Carbohidratos complejos ayudan', 'Evita azúcar y alcohol', 'Magnesio y triptófano benefician']
          },
          { 
            hora: '90 min antes', 
            accion: 'Apagar pantallas principales', 
            razon: 'Luz azul suprime melatonina 50%',
            tips: ['Usa modo nocturno', 'Luz roja/ámbar OK', 'Kindle sin backlight aceptable']
          },
          { 
            hora: '60 min antes', 
            accion: 'Ducha/baño caliente', 
            razon: 'Vasodilatación periférica baja temperatura core',
            tips: ['Agua 40-42°C ideal', '10-15 minutos suficiente', 'Termina con agua tibia']
          },
          { 
            hora: '30 min antes', 
            accion: 'Rutina relajación', 
            razon: 'Activa sistema parasimpático',
            tips: ['Yoga nidra', 'Respiración 4-7-8', 'Journaling gratitud', 'Música 60 BPM']
          },
          { 
            hora: 'Al acostarse', 
            accion: 'Ambiente óptimo', 
            razon: 'Señales ambientales para sueño',
            tips: ['Temperatura 18-20°C', 'Oscuridad total', 'Silencio o ruido blanco', 'Colchón firme']
          }
        ],
        
        fasesOptimizadas: [
          {
            fase: 'N1 - Transición',
            duracion: '5-10 min',
            funcion: 'Desconexión consciente',
            optimizacion: 'Relajación muscular progresiva'
          },
          {
            fase: 'N2 - Sueño ligero',
            duracion: '45% total',
            funcion: 'Consolidación memoria procedimental',
            optimizacion: 'Temperatura fresca constante'
          },
          {
            fase: 'N3 - Sueño profundo',
            duracion: '15-20%',
            funcion: 'Restauración física, limpieza cerebral',
            optimizacion: 'Primera mitad noche, sin interrupciones'
          },
          {
            fase: 'REM',
            duracion: '20-25%',
            funcion: 'Procesamiento emocional, creatividad',
            optimizacion: 'Última parte noche, temperatura estable'
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Horario consistente', 
          descripcion: 'Misma hora dormir/despertar ±30min', 
          duracion: 'Continuo', 
          icono: '⏰',
          detalles: 'Sincroniza ritmo circadiano. Incluye fines de semana. Ajusta gradualmente 15 min/día si necesario.',
          tips: ['Usa alarma para ir a dormir', 'No snooze al despertar', 'Exposición luz matutina']
        },
        { 
          paso: 2, 
          titulo: 'Sanctuary del sueño', 
          descripcion: 'Optimiza tu dormitorio', 
          duracion: 'Setup inicial', 
          icono: '🛏️',
          detalles: 'Ambiente = 50% calidad sueño. Inversión en salud.',
          tips: ['Blackout curtains', 'Aire purificado', 'Plantas que liberan O2 nocturno', 'Aromaterapia lavanda']
        },
        { 
          paso: 3, 
          titulo: 'Wind-down ritual', 
          descripcion: 'Rutina pre-sueño sagrada', 
          duracion: '60-90 min', 
          icono: '🕯️',
          detalles: 'Transición neurológica de Beta a Theta waves',
          tips: ['Dim lights progresivamente', 'Té camomila o pasiflora', 'Stretching suave', 'Gratitude journal']
        },
        { 
          paso: 4, 
          titulo: 'Técnica 10-3-2-1-0', 
          descripcion: 'Cuenta regresiva para sueño perfecto', 
          duracion: 'Todo el día', 
          icono: '🎯',
          detalles: '10h antes: No más cafeína. 3h: No comida/alcohol. 2h: No trabajo. 1h: No pantallas. 0: No snooze mañana',
          tips: ['Café máximo 14:00', 'Cena ligera', 'Work shutdown ritual', 'Modo avión']
        },
        { 
          paso: 5, 
          titulo: 'Morning light exposure', 
          descripcion: 'Luz solar primeros 30 min', 
          duracion: '10-30 min', 
          icono: '☀️',
          detalles: 'Reset circadiano, suprime melatonina, inicia cortisol',
          tips: ['Salir afuera ideal', 'Ventana abierta OK', 'Lámpara 10,000 lux si necesario', 'Sin gafas sol']
        },
        { 
          paso: 6, 
          titulo: 'Track & optimize', 
          descripcion: 'Mide y ajusta', 
          duracion: 'Continuo', 
          icono: '📊',
          detalles: 'Lo que no se mide no se mejora. Identifica patrones.',
          tips: ['Sleep diary básico', 'Wearables para datos', 'Nota energía 1-10', 'Ajusta basado en datos']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Energía aumenta 40% día siguiente', icono: '⚡', detalle: 'ATP mitocondrial optimizado' },
          { texto: 'Claridad mental y focus', icono: '🧠', detalle: 'Prefrontal cortex restaurado' },
          { texto: 'Humor estable', icono: '😊', detalle: 'Regulación emocional amígdala' },
          { texto: 'Menos hambre/antojos', icono: '🍎', detalle: 'Leptina/ghrelina balanceadas' },
          { texto: 'Recuperación muscular', icono: '💪', detalle: 'HGH y síntesis proteica' }
        ],
        largoplazo: [
          { texto: 'Prevención Alzheimer', icono: '🛡️', detalle: 'Limpieza beta-amiloide y tau' },
          { texto: '10 años más de vida', icono: '🌟', detalle: 'Telómeros preservados' },
          { texto: 'Sistema inmune robusto', icono: '💊', detalle: '70% menos infecciones' },
          { texto: 'Peso corporal ideal', icono: '⚖️', detalle: 'Metabolismo optimizado' },
          { texto: 'Creatividad multiplicada', icono: '🎨', detalle: 'Conectividad neuronal aumentada' },
          { texto: 'Rendimiento elite', icono: '🏆', detalle: 'Top 1% productividad' },
          { texto: 'Relaciones mejoradas', icono: '❤️', detalle: 'Regulación emocional superior' },
          { texto: 'Prevención depresión', icono: '🌈', detalle: 'Neurotransmisores balanceados' }
        ]
      },
      
      troubleshooting: {
        problemas: [
          {
            problema: 'No puedo dormirme',
            soluciones: [
              'Cognitive shuffle: Palabras aleatorias A-Z',
              'Body scan meditation 10 min',
              'Sal de la cama después 20 min, actividad tranquila',
              'Suplemento magnesio glicinato 200-400mg'
            ]
          },
          {
            problema: 'Me despierto a media noche',
            soluciones: [
              'No mires la hora',
              'Respiración 4-7-8',
              'Evita líquidos 2h antes dormir',
              'Check temperatura - muy caliente común'
            ]
          },
          {
            problema: 'Despierto muy temprano',
            soluciones: [
              'Blackout curtains para luz matutina',
              'Melatonina 0.5-1mg (no más)',
              'Cena con triptófano',
              'Evalúa estrés/ansiedad'
            ]
          }
        ]
      },
      
      suplementacion: {
        basicos: [
          { nombre: 'Magnesio Glicinato', dosis: '200-400mg', cuando: '30-60 min antes', efecto: 'Relaja músculos y mente' },
          { nombre: 'L-Teanina', dosis: '100-200mg', cuando: '30-60 min antes', efecto: 'Calma sin sedación' },
          { nombre: 'Glicina', dosis: '3g', cuando: 'Con cena', efecto: 'Baja temperatura corporal' }
        ],
        avanzados: [
          { nombre: 'Ashwagandha', dosis: '300-600mg', cuando: 'Mañana/tarde', efecto: 'Reduce cortisol' },
          { nombre: 'CBD', dosis: '25-75mg', cuando: '1h antes', efecto: 'Reduce ansiedad, mejora sueño profundo' },
          { nombre: 'Melatonina', dosis: '0.5-1mg MAX', cuando: '2-3h antes', efecto: 'Induce sueño - usar ocasional' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'Why We Sleep - Matthew Walker',
          'The Sleep Solution - Chris Winter',
          'The Promise of Sleep - William Dement'
        ],
        apps: [
          'Sleep Cycle - Tracking inteligente',
          'Insight Timer - Meditaciones sueño',
          'Brain.fm - Música optimizada sueño'
        ],
        herramientas: [
          'Oura Ring - Mejor tracker sueño',
          'ChiliPad - Control temperatura cama',
          'Philips Wake-up Light - Despertar natural'
        ]
      },
      
      notas: 'El sueño es la base de todo rendimiento humano. Sin sueño optimizado, ningún otro hábito puede compensar. Prioriza esto sobre todo lo demás. Tu vida literalmente depende de ello.',
      
      frecuenciaRecomendada: 'DIARIA - No negociable',
      compromiso: 'Mínimo 30 días para ver cambios, 90 días para transformación',
      dificultadReal: 7, // del 1-10
      retornoInversion: 1000 // % de retorno en calidad de vida
    }
  },

  {
    id: 'tm2',
    titulo: 'Deep Work - Enfoque Profundo',
    descripcionCorta: 'Desarrolla capacidad de concentración elite nivel Cal Newport',
    categoria: 'productividad-mental',
    duracion: 90,
    experiencia: 200,
    dificultad: 'avanzado',
    icono: '🎯',
    color: 'from-blue-600 to-indigo-700',
    bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    shadowColor: 'shadow-blue-500/50',
    impactoVida: 90,
    prioridad: 2,
    contenido: {
      descripcionCompleta: `En la economía del conocimiento, la capacidad de concentración profunda es la habilidad más valiosa y escasa. Cal Newport (MIT/Georgetown) demuestra que 4 horas de deep work equivalen a 3 días de trabajo superficial. Esta misión desarrolla tu capacidad de enfoque al nivel del 1% superior de performers.`,
      
      ciencia: {
        titulo: 'Neuroplasticidad del Focus Extremo',
        estudios: [
          'MIT Neuroscience: Mielinización aumenta 50% con práctica deliberada concentrada',
          'Stanford Psychology: Flow state aumenta productividad 500% y felicidad 600%',
          'Nature Neuroscience: Red neuronal por defecto se reorganiza con práctica deep work',
          'Journal of Cognitive Enhancement: Memoria trabajo aumenta 40% después 8 semanas',
          'UC Irvine: Cada interrupción cuesta 23 minutos recuperar focus profundo',
          'Microsoft Research: Attention span cayó de 12 a 8 segundos desde 2000',
          'Neuron Journal: Neuroplasticidad prefrontal mejora control ejecutivo 35%',
          'PNAS: Estado flow activa mismas áreas que meditación avanzada'
        ],
        mecanismos: [
          'Red Atencional Dorsal: Enfoque sostenido top-down',
          'Corteza Prefrontal: Control ejecutivo y resistencia distracción',
          'Mielinización: Velocidad procesamiento neural aumentada',
          'Neurotransmisores: Dopamina y norepinefrina optimizados en flow',
          'Ondas cerebrales: Transición de Beta a Gamma en focus profundo',
          'Default Mode Network: Desactivación para máxima concentración'
        ]
      },
      
      protocolo: {
        estructura: [
          {
            fase: 'Prime Time Identification',
            descripcion: 'Identifica tus 2-4 horas de máxima energía cognitiva',
            metodo: 'Track energía/focus cada hora por 1 semana',
            tipico: 'Mayoría: 9-11 AM y 4-6 PM'
          },
          {
            fase: 'Environment Design',
            descripcion: 'Crea tu "cueva de concentración"',
            elementos: [
              'Espacio dedicado solo para deep work',
              'Todos los recursos necesarios a mano',
              'Señal visual de "no molestar"',
              'Ambiente minimalista, sin distracciones'
            ]
          },
          {
            fase: 'Digital Minimalism',
            descripcion: 'Elimina todas las distracciones digitales',
            tacticas: [
              'Teléfono en otra habitación',
              'Bloqueadores de sitios web',
              'Modo focus en computadora',
              'Notificaciones = 0'
            ]
          },
          {
            fase: 'Ritual de Entrada',
            descripcion: 'Secuencia exacta para entrar en flow',
            pasos: [
              'Misma bebida/snack cada vez',
              'Música específica o silencio',
              'Revisión objetivos sesión',
              'Afirmación de compromiso'
            ]
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Time Boxing Sagrado', 
          descripcion: 'Bloquea 90-120 min sin excepciones', 
          duracion: 'Setup: 5 min', 
          icono: '⏰',
          detalles: 'Ultradian rhythms: Cerebro mantiene focus máximo 90-120 min',
          tips: ['Calendario bloqueado', 'Comunica a todos', 'Emergencias pueden esperar', 'Timer visible']
        },
        { 
          paso: 2, 
          titulo: 'Objetivos Ultra-Claros', 
          descripcion: 'Define exactamente qué completarás', 
          duracion: '5 min pre-sesión', 
          icono: '🎯',
          detalles: 'Ambigüedad = enemigo del focus. Especificidad = poder.',
          tips: ['Output medible', 'Una sola tarea principal', 'Escríbelo antes de empezar', 'Divide en subtareas']
        },
        { 
          paso: 3, 
          titulo: 'Protocolo Pomodoro Modificado', 
          descripcion: '50 min focus + 10 min descanso activo', 
          duracion: '60 min ciclos', 
          icono: '🍅',
          detalles: 'Más largo que Pomodoro tradicional para alcanzar flow state',
          tips: ['Timer no negociable', 'Descanso = movimiento', 'Sin pantallas en descanso', 'Hidratación']
        },
        { 
          paso: 4, 
          titulo: 'Técnica del Batching', 
          descripcion: 'Agrupa tareas similares', 
          duracion: 'Variable', 
          icono: '📦',
          detalles: 'Context switching reduce eficiencia 40%. Batch = momentum.',
          tips: ['Emails 2x día máximo', 'Llamadas en bloque', 'Escritura sin editar', 'Decisiones juntas']
        },
        { 
          paso: 5, 
          titulo: 'Productive Meditation', 
          descripcion: 'Camina pensando en UN problema', 
          duracion: '20-30 min', 
          icono: '🚶',
          detalles: 'Movimiento + focus = insights creativos',
          tips: ['Sin dispositivos', 'Pregunta específica', 'No fuerces respuesta', 'Lleva libreta']
        },
        { 
          paso: 6, 
          titulo: 'Shutdown Ritual', 
          descripcion: 'Cierre formal del trabajo profundo', 
          duracion: '10 min', 
          icono: '🔐',
          detalles: 'Señal cerebral de completitud. Evita rumination nocturna.',
          tips: ['Review logros día', 'Plan mañana', 'Frase cierre', 'Cambio de ambiente']
        }
      ],
      
      niveles: {
        principiante: {
          duracion: '25 min',
          frecuencia: '1x día',
          meta: 'Construir hábito básico',
          progresion: '5 min más cada semana'
        },
        intermedio: {
          duracion: '50 min',
          frecuencia: '2x día',
          meta: 'Flow state consistente',
          progresion: 'Aumentar complejidad tareas'
        },
        avanzado: {
          duracion: '90-120 min',
          frecuencia: '2-3x día',
          meta: 'Elite performer',
          progresion: 'Proyectos nivel experto'
        },
        maestro: {
          duracion: '4 horas continuas',
          frecuencia: 'Diaria',
          meta: 'Top 0.1% mundial',
          progresion: 'Innovación constante'
        }
      },
      
      beneficios: {
        inmediatos: [
          { texto: 'Productividad 3-5x', icono: '📈', detalle: 'Output medible aumenta drásticamente' },
          { texto: 'Satisfacción profunda', icono: '😌', detalle: 'Flow state = felicidad intrínseca' },
          { texto: 'Menos estrés', icono: '🧘', detalle: 'Claridad elimina ansiedad' },
          { texto: 'Mejor calidad trabajo', icono: '💎', detalle: 'Excelencia vs mediocridad' },
          { texto: 'Tiempo libre real', icono: '🏖️', detalle: 'Terminas antes, sin culpa' }
        ],
        largoplazo: [
          { texto: 'Carrera extraordinaria', icono: '🚀', detalle: 'Top performer en tu campo' },
          { texto: 'Maestría acelerada', icono: '🏆', detalle: '10,000 horas en 5 años vs 10' },
          { texto: 'Ingresos multiplicados', icono: '💰', detalle: 'Valor escaso = compensación alta' },
          { texto: 'Libertad temporal', icono: '⏳', detalle: '4 horas > 12 horas superficial' },
          { texto: 'Legado significativo', icono: '🌟', detalle: 'Trabajo que importa y perdura' },
          { texto: 'Neuroplasticidad aumentada', icono: '🧠', detalle: 'Cerebro más adaptable y capaz' },
          { texto: 'Resiliencia mental', icono: '💪', detalle: 'Capacidad enfrentar complejidad' },
          { texto: 'Creatividad exponencial', icono: '🎨', detalle: 'Insights y innovación constante' }
        ]
      },
      
      enemigos: {
        distracciones: [
          { tipo: 'Notificaciones', solucion: 'Modo avión o Forest app', impacto: '-50% productividad' },
          { tipo: 'Multitasking', solucion: 'Una pestaña, una tarea', impacto: '-40% calidad' },
          { tipo: 'Reuniones innecesarias', solucion: 'Bloques protegidos, decir NO', impacto: '-3 horas/día' },
          { tipo: 'Email constante', solucion: 'Check 2x día máximo', impacto: '-25% focus' },
          { tipo: 'Redes sociales', solucion: 'Elimina apps del teléfono', impacto: '-2 horas/día' },
          { tipo: 'Perfeccionismo', solucion: 'Done > Perfect', impacto: '-60% output' }
        ]
      },
      
      herramientas: {
        apps: [
          'Freedom - Bloqueo total distracciones',
          'Forest - Gamifica focus',
          'Brain.fm - Música científica para concentración',
          'Toggl - Track deep work hours'
        ],
        analogicas: [
          'Notebook para capturar ideas',
          'Timer físico Pomodoro',
          'Cartel "Deep Work - No Molestar"',
          'Noise-cancelling headphones'
        ],
        metodologias: [
          'GTD - Getting Things Done',
          'Time Blocking - Cal Newport',
          'Flowtime Technique',
          'Ivy Lee Method - 6 tareas prioritarias'
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'Deep Work - Cal Newport',
          'Flow - Mihaly Csikszentmihalyi',
          'The One Thing - Gary Keller',
          'Peak Performance - Brad Stulberg'
        ],
        cursos: [
          'Learning How to Learn - Coursera',
          'Productivity Masterclass - Thomas Frank',
          'Focus Toolkit - Huberman Lab'
        ]
      },
      
      desafios: {
        semanal: 'Completa proyecto significativo en 10 horas deep work',
        mensual: 'Desarrolla nueva habilidad con 30 horas focus',
        trimestral: 'Crea algo extraordinario con 100 horas deep work'
      },
      
      notas: 'Deep Work es la superpotencia del siglo 21. Mientras otros se distraen, tú creas valor extraordinario. Es difícil, incómodo al principio, pero absolutamente transformador. Tu carrera y satisfacción personal dependen de dominar esto.',
      
      frecuenciaRecomendada: 'DIARIA - Mínimo 2 horas',
      compromiso: '30 días para hábito, 90 días para maestría básica',
      dificultadReal: 8,
      retornoInversion: 500
    }
  },

  {
    id: 'tm3',
    titulo: 'Terapia Cognitiva Diaria',
    descripcionCorta: 'Reentrena tu mente para eliminar patrones destructivos',
    categoria: 'salud-mental',
    duracion: 20,
    experiencia: 120,
    dificultad: 'intermedio',
    icono: '🧠',
    color: 'from-purple-600 to-pink-700',
    bgColor: 'bg-gradient-to-br from-purple-600 to-pink-700',
    shadowColor: 'shadow-purple-500/50',
    impactoVida: 85,
    prioridad: 3,
    contenido: {
      descripcionCompleta: `La Terapia Cognitivo-Conductual (CBT) es el gold standard en psicología con 50+ años de evidencia. Este protocolo diario reprograma patrones de pensamiento destructivos, reduce ansiedad/depresión 70%, y desarrolla resiliencia mental elite. Basado en Beck, Ellis, y los últimos avances en neuroplasticidad.`,
      
      ciencia: {
        titulo: 'Neuroplasticidad y Reestructuración Cognitiva',
        estudios: [
          'American Psychological Association: CBT tan efectiva como medicación para depresión/ansiedad',
          'Nature Human Behaviour: Cambios cerebrales medibles en 8 semanas de práctica CBT',
          'Lancet Psychiatry: 70% reducción síntomas ansiedad con práctica diaria',
          'Journal of Consulting Psychology: Previene recaídas depresivas 60% mejor que medicación sola',
          'Psychological Medicine: Mejora autoestima y resiliencia permanentemente',
          'Clinical Psychology Review: Cambia activación amígdala y corteza prefrontal',
          'JAMA Psychiatry: Reduce rumiación 80% y preocupación crónica 65%',
          'Behaviour Research and Therapy: Mejora regulación emocional equivalente a 10 años terapia'
        ],
        mecanismos: [
          'Neuroplasticidad: Rewiring literal de conexiones sinápticas',
          'Corteza prefrontal: Fortalecimiento control ejecutivo sobre amígdala',
          'Hipocampo: Mejora memoria y contextualización de experiencias',
          'Sistema serotoninérgico: Regulación natural sin medicación',
          'Red de modo predeterminado: Reduce rumiación y autocrítica',
          'Cortisol: Normalización respuesta al estrés'
        ]
      },
      
      tecnicasPrincipales: {
        abc: {
          nombre: 'Modelo ABC de Ellis',
          descripcion: 'Identifica y cambia pensamientos irracionales',
          pasos: [
            'A - Activating Event: Identifica el trigger',
            'B - Beliefs: Reconoce creencias/pensamientos',
            'C - Consequences: Nota emociones/comportamientos',
            'D - Dispute: Cuestiona creencias irracionales',
            'E - Effective new belief: Reemplaza con pensamiento racional'
          ],
          ejemplo: {
            a: 'Jefe no responde email',
            b: 'Debe estar enojado conmigo, voy a ser despedido',
            c: 'Ansiedad extrema, evitación',
            d: '¿Evidencia real? ¿Otras explicaciones? ¿Es catastrofización?',
            e: 'Probablemente está ocupado, no hay evidencia de problema'
          }
        },
        
        distorsionesCognitivas: {
          nombre: 'Las 10 Distorsiones de Beck',
          descripcion: 'Identifica y corrige patrones de pensamiento tóxico',
          tipos: [
            { 
              distorsion: 'Pensamiento todo-o-nada',
              ejemplo: 'Si no soy perfecto, soy un fracaso total',
              correccion: 'Existe un espectro, puedo ser bueno sin ser perfecto'
            },
            { 
              distorsion: 'Sobregeneralización',
              ejemplo: 'Siempre me pasa esto',
              correccion: 'A veces pasa, a veces no. Busco excepciones'
            },
            { 
              distorsion: 'Filtro mental',
              ejemplo: 'Solo veo lo negativo',
              correccion: 'Lista 3 cosas positivas por cada negativa'
            },
            { 
              distorsion: 'Descalificar lo positivo',
              ejemplo: 'Eso no cuenta, fue suerte',
              correccion: 'Reconozco mi rol en resultados positivos'
            },
            { 
              distorsion: 'Lectura mental',
              ejemplo: 'Sé que piensan mal de mí',
              correccion: 'No puedo leer mentes, necesito evidencia'
            },
            { 
              distorsion: 'Catastrofización',
              ejemplo: 'Esto será terrible, lo peor pasará',
              correccion: '¿Probabilidad real? ¿Qué es lo más probable?'
            },
            { 
              distorsion: 'Minimización/Magnificación',
              ejemplo: 'Mis logros no importan, mis errores son enormes',
              correccion: 'Evalúo objetivamente importancia real'
            },
            { 
              distorsion: 'Razonamiento emocional',
              ejemplo: 'Me siento ansioso, algo malo pasará',
              correccion: 'Sentimientos no son hechos'
            },
            { 
              distorsion: 'Deberías',
              ejemplo: 'Debería ser mejor/diferente',
              correccion: 'Cambio "debería" por "me gustaría" o "elijo"'
            },
            { 
              distorsion: 'Personalización',
              ejemplo: 'Todo es mi culpa',
              correccion: 'Identifico todos los factores, no solo yo'
            }
          ]
        }
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Morning Check-In', 
          descripcion: 'Escaneo emocional y cognitivo', 
          duracion: '3 min', 
          icono: '🌅',
          detalles: 'Identifica estado base antes de que el día te arrastre',
          tips: ['Rate mood 1-10', 'Identifica emoción principal', 'Nota tensión física', 'Sin juzgar, solo observar']
        },
        { 
          paso: 2, 
          titulo: 'Thought Record', 
          descripcion: 'Captura pensamientos automáticos negativos', 
          duracion: '5 min', 
          icono: '📝',
          detalles: 'Awareness es 50% de la solución. No puedes cambiar lo que no ves.',
          tips: ['Momento exacto', 'Pensamiento literal', 'Emoción asociada', 'Intensidad 0-100%']
        },
        { 
          paso: 3, 
          titulo: 'Cognitive Restructuring', 
          descripcion: 'Cuestiona y reemplaza pensamientos tóxicos', 
          duracion: '7 min', 
          icono: '🔄',
          detalles: 'Usa evidencia y lógica, no positive thinking vacío',
          preguntas: [
            '¿Cuál es la evidencia a favor/contra?',
            '¿Qué le diría a un amigo?',
            '¿Importará en 5 años?',
            '¿Cuál es la probabilidad real?',
            '¿Qué es lo peor/mejor/más probable?',
            '¿Estoy usando alguna distorsión cognitiva?',
            '¿Qué pensamiento es más útil/realista?'
          ]
        },
        { 
          paso: 4, 
          titulo: 'Behavioral Activation', 
          descripcion: 'Acción pequeña alineada con valores', 
          duracion: '3 min', 
          icono: '🎯',
          detalles: 'Acción cambia emoción más rápido que pensamiento',
          tips: ['Opuesto a impulso', 'Aunque sea 2 minutos', 'Celebra pequeñas victorias', 'Construye momentum']
        },
        { 
          paso: 5, 
          titulo: 'Evening Review', 
          descripcion: 'Consolida aprendizajes del día', 
          duracion: '2 min', 
          icono: '🌙',
          detalles: 'Refuerza nuevos patrones neuronales',
          tips: ['¿Qué distorsiones noté?', '¿Qué pensamientos cambié?', '¿Qué funcionó?', 'Compasión por errores']
        }
      ],
      
      ejerciciosAvanzados: {
        experimentosConductuales: {
          descripcion: 'Prueba tus predicciones catastróficas',
          ejemplos: [
            'Si predices rechazo, inicia conversación',
            'Si temes fracaso, intenta algo nuevo',
            'Si evitas, enfrenta gradualmente'
          ],
          protocolo: [
            'Predice específicamente qué pasará',
            'Rate probabilidad 0-100%',
            'Haz el experimento',
            'Registra qué pasó realmente',
            'Compara predicción vs realidad',
            'Actualiza creencias basado en evidencia'
          ]
        },
        
        desafioCreencias: {
          descripcion: 'Identifica y cambia creencias core limitantes',
          proceso: [
            'Identifica creencia central (ej: "No soy suficiente")',
            'Rastrea origen (¿Cuándo empezó?)',
            'Lista evidencia en contra',
            'Crea creencia alternativa',
            'Busca evidencia nueva creencia',
            'Practica nueva creencia diariamente'
          ]
        },
        
        mindfulnessCBT: {
          descripcion: 'Combina awareness con reestructuración',
          tecnica: [
            'Observa pensamientos sin engancharte',
            'Etiqueta: "Estoy teniendo el pensamiento de que..."',
            'Nota que eres el observador, no el pensamiento',
            'Deja pasar como nubes en el cielo',
            'Si es recurrente, aplica CBT'
          ]
        }
      },
      
      beneficios: {
        inmediatos: [
          { texto: 'Ansiedad reducida 30-50%', icono: '😌', detalle: 'Desde primera semana' },
          { texto: 'Mejor toma decisiones', icono: '🎯', detalle: 'Menos sesgo emocional' },
          { texto: 'Sueño mejorado', icono: '😴', detalle: 'Menos rumiación nocturna' },
          { texto: 'Relaciones más sanas', icono: '❤️', detalle: 'Menos reactividad' },
          { texto: 'Autocompasión aumentada', icono: '🤗', detalle: 'Crítico interno silenciado' }
        ],
        largoplazo: [
          { texto: 'Depresión prevenida/eliminada', icono: '🌈', detalle: 'Mejor que medicación sola' },
          { texto: 'Resiliencia inquebrantable', icono: '💪', detalle: 'Bounce back rápido' },
          { texto: 'Autoestima sólida', icono: '⭐', detalle: 'Basada en realidad, no fantasía' },
          { texto: 'Inteligencia emocional elite', icono: '🧠', detalle: 'Top 10% regulación' },
          { texto: 'Paz mental duradera', icono: '☮️', detalle: 'Libertad de mente' },
          { texto: 'Prevención recaídas', icono: '🛡️', detalle: '60% menos probabilidad' },
          { texto: 'Crecimiento postraumático', icono: '🌱', detalle: 'Adversidad = fortaleza' },
          { texto: 'Maestría emocional', icono: '👑', detalle: 'Control no supresión' }
        ]
      },
      
      apps: [
        'MindShift - CBT exercises',
        'Youper - AI therapy assistant',
        'Sanvello - Mood tracking + CBT',
        'Quirk - Simple CBT journal'
      ],
      
      cuandoBuscarAyuda: [
        'Pensamientos suicidas',
        'Incapacidad funcionar diariamente',
        'Abuso substancias',
        'Trauma severo no procesado',
        'Sin mejora después 6-8 semanas'
      ],
      
      recursosAdicionales: {
        libros: [
          'Feeling Good - David Burns (CBT biblia)',
          'Mind Over Mood - Greenberger & Padesky',
          'The Happiness Trap - Russ Harris (ACT)',
          'Cognitive Behavioral Therapy Made Simple'
        ],
        workbooks: [
          'The Anxiety and Worry Workbook',
          'The Depression Workbook',
          'The Self-Compassion Workbook'
        ],
        profesionales: 'Busca psicólogo especializado en CBT si necesitas apoyo adicional'
      },
      
      notas: 'Tu mente puede ser tu peor enemigo o tu mejor aliado. CBT te da las herramientas para elegir. No es positive thinking superficial, es reestructuración basada en evidencia. Transformarás tu realidad cambiando tu percepción.',
      
      frecuenciaRecomendada: 'DIARIA - 20 minutos mínimo',
      compromiso: '8 semanas para cambios significativos',
      dificultadReal: 6,
      retornoInversion: 800
    }
  },

  {
    id: 'tm4',
    titulo: 'Protocolo de Ejercicio Óptimo',
    descripcionCorta: 'Entrenamiento científico para longevidad y rendimiento peak',
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
      descripcionCompleta: `Protocolo basado en Peter Attia (longevidad), Andrew Huberman (neurociencia), y Brad Schoenfeld (hipertrofia). Combina Zone 2 cardio, VO2max, fuerza, y movilidad para máxima healthspan. Reduce mortalidad 45%, previene 90% enfermedades crónicas, y optimiza cognición.`,
      
      ciencia: {
        titulo: 'Exercise as Medicine - La Intervención Más Poderosa',
        estudios: [
          'Lancet 2023: Ejercicio reduce mortalidad all-cause 45% más que cualquier intervención',
          'JAMA: VO2max es el predictor #1 de longevidad, más que fumar o diabetes',
          'Cell Metabolism: Zone 2 mejora función mitocondrial 100% en 12 semanas',
          'Nature Medicine: Fuerza muscular reduce riesgo demencia 40%',
          'Science: BDNF aumenta 200% post-ejercicio, equivalente a antidepresivos',
          'Journal of Physiology: Ejercicio activa 4000+ genes beneficiosos',
          'Nature Aging: Telómeros 9% más largos en activos vs sedentarios',
          'NEJM: Reduce riesgo 13 tipos cáncer hasta 42%'
        ],
        mecanismos: [
          'Mitocondrias: Biogénesis y eficiencia aumentada',
          'BDNF: Factor neurotrófico = neuroplasticidad',
          'Mioquinas: Músculos secretan factores anti-inflamatorios',
          'HGH/IGF-1: Hormona crecimiento natural',
          'Telomerasa: Preserva telómeros',
          'Autofagia: Limpieza celular activada',
          'Angiogénesis: Nuevos vasos sanguíneos',
          'Sensibilidad insulina: Mejora 50%+'
        ]
      },
      
      protocoloSemanal: {
        estructura: [
          {
            tipo: 'Zone 2 Cardio',
            frecuencia: '3-4x semana',
            duracion: '45-60 min',
            intensidad: 'Puedes hablar pero no cantar',
            hr: '180 - edad = HR máximo',
            beneficio: 'Base aeróbica, salud mitocondrial',
            opciones: ['Caminar rápido', 'Bici', 'Nadar', 'Remo']
          },
          {
            tipo: 'VO2 Max',
            frecuencia: '1x semana',
            duracion: '4x4 minutos',
            intensidad: '85-95% HR max',
            protocolo: '4 min duro, 3 min recovery, repite 4x',
            beneficio: 'Capacidad aeróbica máxima, longevidad',
            opciones: ['Sprint', 'Bici intervals', 'Remo HIIT']
          },
          {
            tipo: 'Fuerza',
            frecuencia: '2-3x semana',
            duracion: '45-60 min',
            split: 'Upper/Lower o Push/Pull/Legs',
            sets: '3-4 per músculo',
            reps: '6-12 para hipertrofia, 1-5 para fuerza',
            beneficio: 'Masa muscular, densidad ósea, metabolismo'
          },
          {
            tipo: 'Estabilidad/Movilidad',
            frecuencia: 'Diaria',
            duracion: '10-15 min',
            focus: 'Core, caderas, hombros',
            beneficio: 'Prevención lesiones, functional fitness',
            ejercicios: ['Dead bugs', 'Bird dogs', 'Hip CARs', 'Shoulder dislocates']
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Assessment Inicial', 
          descripcion: 'Mide tu baseline', 
          duracion: '30 min', 
          icono: '📊',
          tests: [
            'VO2max estimado: 12 min Cooper test',
            'Fuerza: 1RM o 5RM principales lifts',
            'Movilidad: Overhead squat assessment',
            'Core: Plank time',
            'Balance: Single leg stand eyes closed'
          ],
          tips: ['Registra todo', 'Re-test cada 8 semanas', 'Fotos progreso', 'Medidas corporales']
        },
        { 
          paso: 2, 
          titulo: 'Calentamiento Dinámico', 
          descripcion: 'Prepara cuerpo y mente', 
          duracion: '10 min', 
          icono: '🔥',
          secuencia: [
            '2 min cardio ligero',
            'Activación: Band walks, clamshells',
            'Movilidad dinámica: Leg swings, arm circles',
            'Patrones movimiento: Bodyweight squats, pushups'
          ],
          tips: ['Gradual intensidad', 'Focus en áreas trabajar', 'Respiración profunda', 'Visualiza sesión']
        },
        { 
          paso: 3, 
          titulo: 'Trabajo Principal', 
          descripcion: 'Ejecuta protocolo del día', 
          duracion: '30-45 min', 
          icono: '💪',
          principios: [
            'Progressive overload: +2.5-5% carga semanal',
            'Forma > Peso siempre',
            'Tempo controlado: 2-0-2',
            'Rest periods: 2-3 min fuerza, 60-90s hipertrofia',
            'RPE 7-9 (1-3 reps en reserva)'
          ],
          tips: ['Track cada set', 'Video form checks', 'Partner para spots', 'Música 140+ BPM']
        },
        { 
          paso: 4, 
          titulo: 'Cool Down & Recovery', 
          descripcion: 'Optimiza adaptación', 
          duracion: '10 min', 
          icono: '🧘',
          protocolo: [
            '5 min walk fácil',
            'Stretching estático 30s holds',
            'Respiración parasimpática 4-7-8',
            'Foam rolling áreas tensas'
          ],
          tips: ['No skipees esto', 'Hidratación inmediata', 'Proteína dentro 2 horas', 'Registra sensaciones']
        },
        { 
          paso: 5, 
          titulo: 'Recovery Nutrition', 
          descripcion: 'Alimenta la adaptación', 
          duracion: 'Post-workout', 
          icono: '🥤',
          macros: [
            'Proteína: 0.25-0.4g/kg peso corporal',
            'Carbs: 0.5-1g/kg si fue intenso',
            'Fluidos: 150% pérdida sudor',
            'Electrolitos si >60 min'
          ],
          timing: ['Ventana anabólica: Mito mostly', 'Importante: Total diario', 'Prioridad: Comida real', 'Suplementos: Creatina 5g/día']
        }
      ],
      
      programasPorObjetivo: {
        principiante: {
          objetivo: 'Construir base y hábito',
          semana: [
            'Lunes: Fuerza full body',
            'Martes: Zone 2 walk 30 min',
            'Miércoles: Yoga/Movilidad',
            'Jueves: Fuerza full body',
            'Viernes: Zone 2 30 min',
            'Weekend: Actividad recreativa'
          ]
        },
        perdidaGrasa: {
          objetivo: 'Optimizar composición corporal',
          semana: [
            'Lunes: Fuerza upper + HIIT 10 min',
            'Martes: Zone 2 45 min',
            'Miércoles: Fuerza lower + abs',
            'Jueves: Zone 2 45 min',
            'Viernes: Full body circuit',
            'Sábado: VO2max intervals',
            'Domingo: Active recovery'
          ]
        },
        musculo: {
          objetivo: 'Máxima hipertrofia',
          semana: [
            'Lunes: Push (pecho, hombros, tríceps)',
            'Martes: Pull (espalda, bíceps)',
            'Miércoles: Zone 2 30 min',
            'Jueves: Legs + core',
            'Viernes: Upper power',
            'Sábado: Zone 2 45 min',
            'Domingo: Movilidad'
          ]
        },
        longevidad: {
          objetivo: 'Healthspan máximo',
          semana: [
            'Lunes: Fuerza full body',
            'Martes: Zone 2 60 min',
            'Miércoles: Fuerza upper + movilidad',
            'Jueves: Zone 2 45 min',
            'Viernes: Fuerza lower + balance',
            'Sábado: VO2max protocol',
            'Domingo: Zone 2 90 min o hiking'
          ]
        }
      },
      
      beneficios: {
        inmediatos: [
          { texto: 'Energía +50% mismo día', icono: '⚡', detalle: 'Endorfinas y mejor circulación' },
          { texto: 'Mood mejorado 6-8 horas', icono: '😊', detalle: 'Neurotransmisores optimizados' },
          { texto: 'Sueño profundo esa noche', icono: '😴', detalle: 'Presión sueño aumentada' },
          { texto: 'Focus mental mejorado', icono: '🧠', detalle: 'BDNF y flujo sanguíneo cerebral' },
          { texto: 'Confianza instantánea', icono: '💪', detalle: 'Logro y testosterona' }
        ],
        largoplazo: [
          { texto: '10-20 años más vida', icono: '🌟', detalle: 'Compresión morbilidad' },
          { texto: 'Previene 90% enfermedades', icono: '🛡️', detalle: 'Cardio, diabetes, cáncer, demencia' },
          { texto: 'Cerebro 10 años más joven', icono: '🧠', detalle: 'Volumen hipocampo preservado' },
          { texto: 'Independencia hasta 90+', icono: '🚶', detalle: 'Fuerza y balance' },
          { texto: 'Atractivo físico peak', icono: '✨', detalle: 'Composición corporal óptima' },
          { texto: 'Resiliencia al estrés', icono: '🏔️', detalle: 'Adaptación hormética' },
          { texto: 'Testosterona/hormonas óptimas', icono: '🔥', detalle: 'Sistema endocrino joven' },
          { texto: 'Cero medicamentos', icono: '💊', detalle: 'Prevención > tratamiento' }
        ]
      },
      
      equipamientoMinimo: [
        'Bandas resistencia set completo',
        'Mancuernas ajustables o kettlebell',
        'Pull-up bar puerta',
        'Mat yoga',
        'Foam roller',
        'Jump rope'
      ],
      
      suplementacionDeportiva: {
        esenciales: [
          { nombre: 'Creatina Monohidrato', dosis: '5g/día', cuando: 'Cualquier momento', beneficio: 'Fuerza +10%, cognición' },
          { nombre: 'Proteína Whey', dosis: '25-40g', cuando: 'Post-workout', beneficio: 'Recuperación, síntesis muscular' },
          { nombre: 'Vitamina D3', dosis: '2000-4000 IU', cuando: 'Mañana', beneficio: 'Testosterona, inmunidad' },
          { nombre: 'Omega 3', dosis: '2-3g EPA/DHA', cuando: 'Con comidas', beneficio: 'Anti-inflamatorio' }
        ],
        avanzados: [
          { nombre: 'Beta-Alanina', dosis: '3-5g/día', cuando: 'Dividido', beneficio: 'Resistencia muscular' },
          { nombre: 'Citrulina', dosis: '6-8g', cuando: 'Pre-workout', beneficio: 'Pump, NO production' },
          { nombre: 'Ashwagandha', dosis: '600mg', cuando: 'Noche', beneficio: 'Reduce cortisol, aumenta testo' }
        ]
      },
      
      tracking: {
        metricas: [
          'Fuerza: 1RM principales lifts',
          'Cardio: VO2max, resting HR',
          'Composición: % grasa, músculo',
          'Bienestar: Energía, mood, libido',
          'Performance: PRs, volume total'
        ],
        apps: [
          'Strong - Mejor tracking fuerza',
          'Strava - Cardio y community',
          'MyFitnessPal - Nutrición',
          'Whoop - Recovery y strain'
        ]
      },
      
      evitarLesiones: [
        'Calentamiento SIEMPRE',
        'Forma perfecta > ego lifting',
        'Deload week cada 4-6 semanas',
        'Escucha tu cuerpo',
        'Duerme 8+ horas',
        'No entrenes con dolor',
        'Varía ejercicios regularmente'
      ],
      
      recursosAdicionales: {
        libros: [
          'Outlive - Peter Attia',
          'Starting Strength - Mark Rippetoe',
          'Bigger Leaner Stronger - Michael Matthews',
          'Becoming a Supple Leopard - Kelly Starrett'
        ],
        canales: [
          'Jeff Nippard - Science-based',
          'Athlean-X - Form y prevención',
          'Renaissance Periodization - Hipertrofia',
          'Peter Attia - Longevidad'
        ]
      },
      
      notas: 'El ejercicio es literalmente la píldora mágica que todos buscan. No hay fármaco, suplemento o intervención que se acerque a sus beneficios. Si ejercicio fuera una pastilla, sería obligatorio tomarla. Tu cuerpo está diseñado para moverse - honra ese diseño.',
      
      frecuenciaRecomendada: 'DIARIA - Algo de movimiento cada día',
      compromiso: '12 semanas para transformación visible',
      dificultadReal: 7,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm5',
    titulo: 'Meditación Vipassana Profunda',
    descripcionCorta: 'Desarrolla consciencia y ecuanimidad inquebrantable',
    categoria: 'consciencia-espiritual',
    duracion: 45,
    experiencia: 150,
    dificultad: 'avanzado',
    icono: '🧘‍♂️',
    color: 'from-teal-600 to-cyan-700',
    bgColor: 'bg-gradient-to-br from-teal-600 to-cyan-700',
    shadowColor: 'shadow-teal-500/50',
    impactoVida: 88,
    prioridad: 5,
    contenido: {
      descripcionCompleta: `Vipassana es la técnica de meditación más antigua (2500 años) y científicamente validada. Desarrolla meta-consciencia, disuelve sufrimiento en su raíz, y genera ecuanimidad inquebrantable. Basado en neurociencia contemplativa moderna y tradición birmana de S.N. Goenka.`,
      
      ciencia: {
        titulo: 'Neurociencia de la Iluminación',
        estudios: [
          'Nature Neuroscience: Meditadores vipassana muestran reduced default mode network activity',
          'PNAS: Cambios estructurales cerebro en 8 semanas - más materia gris prefrontal/hipocampo',
          'Current Biology: Reducción 50% en reactividad amígdala a estímulos negativos',
          'Psychological Science: Aumenta metacognición y reduce sesgo cognitivo 60%',
          'JAMA: Reduce marcadores inflamación (IL-6, TNF-α) equivalente a medicación',
          'NeuroImage: Aumenta coherencia gamma waves asociada con consciencia elevada',
          'Biological Psychiatry: Preserva telómeros y reduce edad biológica',
          'Science Advances: Desacoplamiento del self narrative = reducción sufrimiento'
        ],
        mecanismos: [
          'Default Mode Network: Reducción rumiación y self-referential thinking',
          'Interoception: Mejora consciencia corporal vía ínsula',
          'Attention Networks: Fortalece control ejecutivo y sustained attention',
          'Emotional Regulation: Desidentificación con emociones',
          'Neuroplasticity: Rewiring fundamental de respuesta a estímulos',
          'Epigenética: Cambios expresión genes relacionados con estrés'
        ]
      },
      
      fundamentosFilosoficos: {
        cuatroNoblesVerdades: [
          'Dukkha: La vida contiene sufrimiento inevitable',
          'Samudaya: El sufrimiento surge del apego/aversión',
          'Nirodha: Es posible cesar el sufrimiento',
          'Magga: Existe un camino para lograrlo'
        ],
        tresCaracteristicas: [
          'Anicca: Impermanencia - todo cambia constantemente',
          'Dukkha: Insatisfacción - nada proporciona satisfacción duradera',
          'Anatta: No-self - no existe un yo fijo o permanente'
        ],
        objetivo: 'Experimentar directamente la naturaleza de la realidad para liberarse del sufrimiento'
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Postura Digna', 
          descripcion: 'Establece base física estable', 
          duracion: '2 min', 
          icono: '🪷',
          detalles: 'Columna erecta pero relajada, como cuerda tirando desde coronilla',
          posturas: [
            'Lotus/half-lotus si flexible',
            'Burmese position (piernas cruzadas simple)',
            'Silla con pies planos',
            'Espalda sin apoyo para mantener alerta'
          ],
          tips: ['Caderas más altas que rodillas', 'Barbilla ligeramente hacia dentro', 'Manos en mudra cósmico', 'Ojos cerrados o entreabiertos']
        },
        { 
          paso: 2, 
          titulo: 'Anapana - Respiración', 
          descripcion: 'Concentración inicial en respiración natural', 
          duracion: '10 min', 
          icono: '💨',
          detalles: 'Construye samadhi (concentración) necesaria para insight',
          tecnica: [
            'Atención en entrada/salida aire en fosas nasales',
            'NO controles respiración, solo observa',
            'Nota temperatura, textura, duración',
            'Cuando mente divague, regresa gentilmente',
            'Área triángulo: nariz y labio superior'
          ],
          tips: ['Paciencia infinita', 'No frustración con divagación', 'Es normal divagar 100+ veces', 'Celebra cada return']
        },
        { 
          paso: 3, 
          titulo: 'Body Scan Sistemático', 
          descripcion: 'Observa sensaciones en todo el cuerpo', 
          duracion: '20 min', 
          icono: '👁️',
          detalles: 'Desarrolla consciencia de impermanencia de sensaciones',
          secuencia: [
            'Comienza coronilla',
            'Baja por cara, cuello',
            'Hombros, brazos, manos',
            'Pecho, espalda, abdomen',
            'Caderas, muslos, rodillas',
            'Pantorrillas, pies, dedos',
            'Regresa arriba',
            'Eventualmente: todo simultáneo'
          ],
          observar: ['Temperatura', 'Presión', 'Vibración', 'Dolor', 'Placer', 'Cosquilleo', 'Pulsación', 'Nada (también es sensación)'],
          actitud: 'Ecuanimidad - no apego a placentero, no aversión a desagradable'
        },
        { 
          paso: 4, 
          titulo: 'Vipassana - Insight', 
          descripcion: 'Observa surgir y pasar de fenómenos', 
          duracion: '10 min', 
          icono: '✨',
          detalles: 'Experiencia directa de anicca (impermanencia)',
          practica: [
            'Nota cómo TODA sensación surge y pasa',
            'Incluso dolor "sólido" tiene micro-cambios',
            'Observa sin reaccionar',
            'Desarrolla ecuanimidad perfecta',
            'Realiza: todo es proceso, no cosa'
          ],
          insights: ['Nada es permanente', 'Apego causa sufrimiento', 'No hay self fijo observando', 'Solo procesos observando procesos']
        },
        { 
          paso: 5, 
          titulo: 'Metta - Loving Kindness', 
          descripcion: 'Cierra con compasión universal', 
          duracion: '3 min', 
          icono: '❤️',
          detalles: 'Balancea wisdom con compasión',
          frases: [
            'Que todos los seres estén libres de sufrimiento',
            'Que todos los seres encuentren felicidad',
            'Que todos los seres vivan con paz',
            'Que todos los seres alcancen liberación'
          ],
          orden: ['Yo mismo', 'Seres queridos', 'Neutrales', 'Difíciles', 'Todos los seres']
        }
      ],
      
      etapasProgreso: {
        principiante: {
          duracion: '1-3 meses',
          señales: ['Mente muy agitada', 'Dolor físico intenso', 'Dudas constantes'],
          consejo: 'Normal y necesario. No te rindas. Construyendo fundación.'
        },
        establecimiento: {
          duracion: '3-12 meses',
          señales: ['Concentración mejora', 'Dolor disminuye', 'Glimpses de paz'],
          consejo: 'Progreso real ocurriendo. Mantén práctica consistente.'
        },
        profundizacion: {
          duracion: '1-3 años',
          señales: ['Experiencias de disolución', 'Surgir y pasar rápido', 'Miedo/éxtasis'],
          consejo: 'Territorio insight profundo. Busca teacher si posible.'
        },
        maduracion: {
          duracion: '3+ años',
          señales: ['Ecuanimidad estable', 'No-self experiencial', 'Paz inquebrantable'],
          consejo: 'Integra realización en vida diaria. Sirve a otros.'
        }
      },
      
      beneficios: {
        inmediatos: [
          { texto: 'Calma mental profunda', icono: '🕊️', detalle: 'Silencio interno' },
          { texto: 'Claridad perceptual', icono: '🔍', detalle: 'Ves con más detalle' },
          { texto: 'Reducción ansiedad 40%', icono: '😌', detalle: 'Desde primera sesión' },
          { texto: 'Presencia aumentada', icono: '👁️', detalle: 'Más aquí y ahora' },
          { texto: 'Mejor regulación emocional', icono: '⚖️', detalle: 'Menos reactividad' }
        ],
        largoplazo: [
          { texto: 'Liberación del sufrimiento', icono: '🗽', detalle: 'Libertad fundamental' },
          { texto: 'Sabiduría experiencial', icono: '📿', detalle: 'Comprensión directa realidad' },
          { texto: 'Compasión incondicional', icono: '💗', detalle: 'Amor sin límites' },
          { texto: 'Ecuanimidad inquebrantable', icono: '⛰️', detalle: 'Paz en cualquier circunstancia' },
          { texto: 'Creatividad multiplicada', icono: '🎨', detalle: 'Mente no-conceptual' },
          { texto: 'Intuición desarrollada', icono: '🔮', detalle: 'Conocimiento directo' },
          { texto: 'Fearlessness', icono: '🦁', detalle: 'Muerte del miedo existencial' },
          { texto: 'Felicidad sin causa', icono: '🌟', detalle: 'Gozo intrínseco del ser' }
        ]
      },
      
      obstaculos: {
        cinco_hindrances: [
          { 
            nombre: 'Deseo sensual',
            manifestacion: 'Fantasías, antojos durante meditación',
            antidoto: 'Contempla impermanencia del placer'
          },
          { 
            nombre: 'Aversión/Ira',
            manifestacion: 'Irritación, resistencia, querer parar',
            antidoto: 'Metta hacia ti mismo y otros'
          },
          { 
            nombre: 'Letargo/Somnolencia',
            manifestacion: 'Sueño, mente nublada',
            antidoto: 'Abre ojos, respira profundo, cambia postura'
          },
          { 
            nombre: 'Inquietud/Preocupación',
            manifestacion: 'Mente hiperactiva, ansiedad',
            antidoto: 'Relaja cuerpo, alarga exhalación'
          },
          { 
            nombre: 'Duda',
            manifestacion: '¿Funciona? ¿Lo hago bien?',
            antidoto: 'Fe en proceso, continúa pese a duda'
          }
        ]
      },
      
      retiros: {
        importancia: 'Retiros son aceleradores exponenciales de progreso',
        tipos: [
          { duracion: '1 día', beneficio: 'Reset mental, introducción' },
          { duracion: '3 días', beneficio: 'Breakthrough inicial común' },
          { duracion: '7 días', beneficio: 'Cambios profundos, insights' },
          { duracion: '10 días', beneficio: 'Transformación fundamental (Goenka standard)' },
          { duracion: '30+ días', beneficio: 'Realizaciones permanentes posibles' }
        ],
        donde: [
          'Dhamma.org - Centros Goenka worldwide gratuitos',
          'IMS - Insight Meditation Society',
          'Spirit Rock - California',
          'Plum Village - Thich Nhat Hanh tradition'
        ]
      },
      
      integracionVidaDiaria: [
        'Micro-momentos: 30 segundos awareness varias veces al día',
        'Mindful eating: Una comida completa en silencio consciente',
        'Walking meditation: 10 minutos caminata consciente',
        'Mindful listening: Conversaciones con presencia total',
        'Pain practice: Usa dolor menor como objeto meditación',
        'Emotion surfing: Observa emociones sin ser arrastrado'
      ],
      
      recursosAdicionales: {
        libros: [
          'The Mind Illuminated - Culadasa (mejor guía técnica)',
          'Mindfulness in Plain English - Bhante G',
          'The Art of Living - William Hart (Vipassana Goenka)',
          'Waking Up - Sam Harris'
        ],
        apps: [
          'Waking Up - Sam Harris guiadas',
          'Ten Percent Happier - Variedad teachers',
          'Brightmind - Algoritmo personalizado'
        ],
        maestros: [
          'S.N. Goenka - Vipassana tradicional',
          'Joseph Goldstein - IMS founder',
          'Jack Kornfield - Psicología + dharma',
          'Shinzen Young - Técnico moderno'
        ]
      },
      
      advertencias: [
        'Puede surgir material psicológico difícil',
        'Dark night of soul es fase común',
        'No reemplazo para terapia si trauma severo',
        'Integración gradual importante',
        'Busca guía experimentada si surgen dificultades'
      ],
      
      notas: 'Vipassana no es escapismo o bypassing espiritual. Es confrontación radical con la realidad tal como es. Preparate para ver través de todas tus ilusiones. El premio es libertad total del sufrimiento innecesario. Worth it.',
      
      frecuenciaRecomendada: 'DIARIA - 45 min mínimo, idealmente 2x día',
      compromiso: '90 días mínimo para cambios notables',
      dificultadReal: 9,
      retornoInversion: 1000
    }
  },   
  
  {
    id: 'tm6',
    titulo: 'Nutrición Optimizada & Ayuno',
    descripcionCorta: 'Alimentación científica para máxima energía y longevidad',
    categoria: 'salud-fundamental',
    duracion: 30,
    experiencia: 140,
    dificultad: 'intermedio',
    icono: '🥗',
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-600 to-emerald-700',
    shadowColor: 'shadow-green-500/50',
    impactoVida: 90,
    prioridad: 6,
    contenido: {
      descripcionCompleta: `La nutrición es medicina preventiva. Este protocolo combina ayuno intermitente 16:8, alimentación basada en plantas + proteína de calidad, y eliminación de alimentos inflamatorios. Basado en investigación de Valter Longo (USC), Rhonda Patrick, y David Sinclair. Reduce marcadores inflamatorios 60%, aumenta autofagia, y optimiza composición corporal sin contar calorías obsesivamente.`,
      
      ciencia: {
        titulo: 'Nutrición Basada en Evidencia',
        estudios: [
          'Cell Metabolism: Ayuno 16:8 mejora sensibilidad insulina 31% y reduce inflamación',
          'NEJM: Dieta mediterránea reduce eventos cardiovasculares 30% vs dieta baja grasa',
          'Nature: Autofagia activada por ayuno limpia células dañadas - anti-envejecimiento',
          'The Lancet: Fibra dietética reduce mortalidad 25% por todas las causas',
          'JAMA: Reducción azúcares añadidos mejora marcadores metabólicos 40%',
          'Nutrients Journal: Omega-3 reduce riesgo demencia 28%',
          'American Journal Clinical Nutrition: Proteína 1.6g/kg preserva músculo en déficit',
          'Science: Restricción calórica moderada extiende lifespan hasta 40% en mamíferos'
        ],
        mecanismos: [
          'Autofagia: Reciclaje celular activado por ayuno',
          'Cetosis leve: Combustible alternativo eficiente',
          'AMPK: Sensor energía celular - anti-aging',
          'mTOR: Balance crecimiento/reparación',
          'Microbioma: Diversidad bacteriana = salud',
          'Glicación: Reducción AGEs = menos envejecimiento'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Ventana de alimentación 16:8', 
          descripcion: 'Come solo en ventana de 8 horas', 
          duracion: 'Diario', 
          icono: '⏰',
          detalles: 'Ej: 12pm-8pm. Ayuno 16h activa autofagia y cetosis leve.',
          tips: ['Empieza 12:8 si es difícil', 'Café/té negro OK en ayuno', 'Agua con sal/limón permitido', 'Consistencia > perfección']
        },
        { 
          paso: 2, 
          titulo: 'Prioriza alimentos densos en nutrientes', 
          descripcion: 'Vegetales, frutas, proteína magra, grasas saludables', 
          duracion: 'Cada comida', 
          icono: '🥦',
          detalles: 'Regla del plato: 50% vegetales, 25% proteína, 25% carbohidratos complejos',
          tips: ['Come arcoíris de colores', 'Proteína en cada comida', 'Grasas: aguacate, nueces, EVOO', 'Carbohidratos integrales']
        },
        { 
          paso: 3, 
          titulo: 'Elimina los 3 grandes', 
          descripcion: 'Azúcar refinado, aceites vegetales procesados, ultra-procesados', 
          duracion: 'Continuo', 
          icono: '🚫',
          detalles: 'Estos 3 causan 80% inflamación crónica moderna',
          tips: ['Lee etiquetas', 'Cocina más en casa', 'Snacks: nueces, frutas', 'Regla: Si abuela no lo reconoce, no comas']
        },
        { 
          paso: 4, 
          titulo: 'Hidratación inteligente', 
          descripcion: '2-3L agua + electrolitos', 
          duracion: 'Todo el día', 
          icono: '💧',
          detalles: 'Agua con minerales > agua pura. Especialmente en ayuno.',
          tips: ['30-40ml por kg peso', 'Añade pizca sal marina', 'Limón/lima para sabor', 'Evita durante comidas']
        },
        { 
          paso: 5, 
          titulo: 'Timing estratégico', 
          descripcion: 'Nutrientes correctos en momento correcto', 
          duracion: 'Variable', 
          icono: '⚡',
          detalles: 'Carbohidratos post-ejercicio, proteína distribuida, grasas noche',
          tips: ['Desayuno rico proteína', 'Carbohidratos después entrenar', 'Cena ligera 3h antes dormir', 'No snacking constante']
        },
        { 
          paso: 6, 
          titulo: 'Tracking simplificado', 
          descripcion: 'Foto del plato y sensaciones', 
          duracion: '2 min/comida', 
          icono: '📸',
          detalles: 'No obsesión con calorías, pero awareness de lo que comes',
          tips: ['MyFitnessPal 1 semana para calibrar', 'Nota energía post-comidas', 'Peso estable = calorías correctas', 'Hambre real vs emocional']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Energía estable sin crashes', icono: '⚡', detalle: 'Glucosa estable todo el día' },
          { texto: 'Claridad mental aumentada', icono: '🧠', detalle: 'Cetosis leve optimiza cognición' },
          { texto: 'Mejor digestión', icono: '✨', detalle: 'Dar descanso al sistema digestivo' },
          { texto: 'Menos inflamación', icono: '🔥', detalle: 'Notorio en articulaciones y piel' },
          { texto: 'Control de hambre', icono: '🎯', detalle: 'Ghrelina regulada' }
        ],
        largoplazo: [
          { texto: 'Composición corporal óptima', icono: '⚖️', detalle: 'Grasa baja, músculo preservado' },
          { texto: 'Prevención diabetes', icono: '🛡️', detalle: 'Sensibilidad insulina mejorada' },
          { texto: 'Longevidad aumentada', icono: '🌟', detalle: 'Autofagia y reducción inflamación' },
          { texto: 'Salud cardiovascular', icono: '❤️', detalle: 'Perfil lipídico mejorado' },
          { texto: 'Cerebro protegido', icono: '🧠', detalle: 'Reducción riesgo Alzheimer' },
          { texto: 'Microbioma saludable', icono: '🦠', detalle: 'Diversidad bacteriana óptima' },
          { texto: 'Piel radiante', icono: '✨', detalle: 'Colágeno preservado' },
          { texto: 'Energía ilimitada', icono: '🔋', detalle: 'Flexibilidad metabólica' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Longevity Diet - Valter Longo',
          'How Not to Die - Michael Greger',
          'The Obesity Code - Jason Fung',
          'Deep Nutrition - Catherine Shanahan'
        ],
        apps: [
          'Zero - Ayuno intermitente tracking',
          'Cronometer - Micronutrientes',
          'MyFitnessPal - Calorías/macros'
        ],
        herramientas: [
          'Glucómetro continuo (CGM)',
          'Balanza de cocina',
          'Meal prep containers'
        ]
      },
      
      notas: 'La nutrición es inversión diaria en tu futuro. Cada comida es oportunidad de nutrir o intoxicar tu cuerpo. No necesitas dieta perfecta, necesitas consistencia en principios correctos.',
      
      frecuenciaRecomendada: 'DIARIA - Cada comida cuenta',
      compromiso: '30 días para adaptación, 90 para transformación',
      dificultadReal: 6,
      retornoInversion: 900
    }
  },

  {
    id: 'tm7',
    titulo: 'Cold Exposure - Método Wim Hof',
    descripcionCorta: 'Hormesis por frío para sistema inmune y resiliencia mental',
    categoria: 'fitness-longevidad',
    duracion: 15,
    experiencia: 100,
    dificultad: 'avanzado',
    icono: '❄️',
    color: 'from-cyan-600 to-blue-700',
    bgColor: 'bg-gradient-to-br from-cyan-600 to-blue-700',
    shadowColor: 'shadow-cyan-500/50',
    impactoVida: 80,
    prioridad: 7,
    contenido: {
      descripcionCompleta: `La exposición al frío es hormesis - estrés beneficioso que fortalece. Wim Hof Method combina respiración, frío y mindset para activar sistema inmune voluntariamente. Estudios demuestran aumento glóbulos blancos 300%, mejora estado ánimo 60%, y reduce inflamación crónica. El frío es tu aliado para fortaleza física y mental.`,
      
      ciencia: {
        titulo: 'Ciencia del Cold Thermogenesis',
        estudios: [
          'PNAS: Wim Hof method aumenta epinefrina y reduce citokinas inflamatorias',
          'Nature Immunology: Cold exposure activa grasa marrón - quema 300 cal extra/día',
          'Neuroscience: Duchas frías aumentan norepinefrina 530% - antidepresivo natural',
          'Journal of Applied Physiology: Adaptación al frío mejora metabolismo 15%',
          'Brain Behavior Immunity: Reduce síntomas depresión 25% consistentemente',
          'European Journal Applied Physiology: Mejora recuperación muscular post-ejercicio',
          'Cryobiology: Cold shock proteins protegen contra neurodegeneración',
          'Medicine & Science Sports: Reduce dolor muscular 35% vs control'
        ],
        mecanismos: [
          'Grasa marrón: Termogénesis sin temblor',
          'Norepinefrina: Neurotransmisor focus y mood',
          'Shock proteins: Protección celular',
          'Vagal tone: Activación parasimpático',
          'Mitocondrias: Biogénesis aumentada',
          'Inflamación: IL-6 y TNF-α reducidos'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Respiración Wim Hof', 
          descripcion: '30-40 respiraciones profundas + retención', 
          duracion: '10 min', 
          icono: '💨',
          detalles: 'Hiperventilación controlada alcaliniza sangre temporalmente',
          tips: ['Inhala profundo, exhala relajado', 'Después de 30, exhala y aguanta', 'Cuando necesites aire, inhala y aguanta 15s', 'Repite 3 rondas']
        },
        { 
          paso: 2, 
          titulo: 'Progresión gradual al frío', 
          descripcion: 'Semana 1: 30s fría al final ducha', 
          duracion: '2-5 min eventual', 
          icono: '🚿',
          detalles: 'Adaptación progresiva es clave. No forzar.',
          tips: ['Empieza tibio → frío', 'Respira calmado en frío', 'Aumenta 10s cada 2 días', 'Meta: 2-3 min completamente fría']
        },
        { 
          paso: 3, 
          titulo: 'Mindset: Abraza la incomodidad', 
          descripcion: 'El frío es maestro de voluntad', 
          duracion: 'Durante exposición', 
          icono: '🧠',
          detalles: 'Tu reacción al frío refleja tu reacción a desafíos de vida',
          tips: ['No es peligroso, es incómodo', 'Sonríe en el frío', 'Respira para calmarte', 'Celebra cada sesión']
        },
        { 
          paso: 4, 
          titulo: 'Timing óptimo', 
          descripcion: 'Mejor mañana o post-workout', 
          duracion: 'Variable', 
          icono: '⏰',
          detalles: 'Mañana: Norepinefrina para energía. Post-ejercicio: Recuperación',
          tips: ['Mañana antes café', 'No antes dormir', 'Post-gym excepcional', 'Consistencia diaria']
        },
        { 
          paso: 5, 
          titulo: 'Seguridad primero', 
          descripcion: 'Escucha tu cuerpo siempre', 
          duracion: 'N/A', 
          icono: '⚠️',
          detalles: 'Nunca combines hiperventilación con agua (riesgo blackout)',
          tips: ['Respiración fuera del agua', 'Empieza gradual', 'Si mareo, para', 'Consulta médico si condiciones']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Energía explosiva', icono: '⚡', detalle: 'Norepinefrina 530% aumentada' },
          { texto: 'Mood boost instantáneo', icono: '😊', detalle: 'Endorfinas y dopamina' },
          { texto: 'Alerta mental extrema', icono: '🧠', detalle: 'Claridad por 3-4 horas' },
          { texto: 'Voluntad fortalecida', icono: '💪', detalle: 'Venciste la resistencia' },
          { texto: 'Recuperación acelerada', icono: '🏃', detalle: 'Inflamación reducida' }
        ],
        largoplazo: [
          { texto: 'Sistema inmune potenciado', icono: '🛡️', detalle: 'Menos enfermedades 40%' },
          { texto: 'Metabolismo acelerado', icono: '🔥', detalle: 'Grasa marrón activa' },
          { texto: 'Resiliencia mental', icono: '🧠', detalle: 'Tolerancia estrés aumentada' },
          { texto: 'Prevención depresión', icono: '🌈', detalle: 'Reducción síntomas 25%' },
          { texto: 'Longevidad celular', icono: '🌟', detalle: 'Cold shock proteins' },
          { texto: 'Piel y pelo mejorados', icono: '✨', detalle: 'Circulación optimizada' },
          { texto: 'Testosterona aumentada', icono: '💪', detalle: 'Especialmente en hombres' },
          { texto: 'Autoconfianza extrema', icono: '🦁', detalle: 'Haces lo que otros no' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Wim Hof Method - Wim Hof',
          'What Doesn\'t Kill Us - Scott Carney',
          'The Wedge - Scott Carney'
        ],
        apps: [
          'Wim Hof Method App - Oficial',
          'Othership - Breathwork + cold'
        ],
        herramientas: [
          'Termómetro ducha',
          'Ice bath (eventual)',
          'Timer waterproof'
        ]
      },
      
      notas: 'El frío es incómodo pero no peligroso para personas sanas. Es práctica de voluntad pura. Si puedes hacer 2 minutos de ducha fría diario, puedes hacer cualquier cosa que te propongas en vida. NUNCA hagas respiración dentro del agua.',
      
      frecuenciaRecomendada: 'DIARIA - Preferible mañanas',
      compromiso: '30 días para adaptación, resultados desde día 1',
      dificultadReal: 8,
      retornoInversion: 700
    }
  },

  {
    id: 'tm8',
    titulo: 'Journaling Profundo & Auto-Reflexión',
    descripcionCorta: 'Escritura terapéutica para claridad mental y auto-conocimiento',
    categoria: 'salud-mental',
    duracion: 20,
    experiencia: 110,
    dificultad: 'principiante',
    icono: '✍️',
    color: 'from-amber-600 to-yellow-700',
    bgColor: 'bg-gradient-to-br from-amber-600 to-yellow-700',
    shadowColor: 'shadow-amber-500/50',
    impactoVida: 82,
    prioridad: 8,
    contenido: {
      descripcionCompleta: `El journaling es terapia de auto-administración. Morning Pages (Julia Cameron), Gratitude Journaling, y técnicas de CBT escritas reducen ansiedad 28%, clarifican objetivos, procesan emociones, y documentan crecimiento. James Pennebaker (UT Austin) demuestra que escribir sobre traumas mejora salud física y mental mediblemente. Tu diario es espejo y mapa de tu evolución.`,
      
      ciencia: {
        titulo: 'Psicología de la Escritura Expresiva',
        estudios: [
          'JAMA: Journaling sobre estrés reduce síntomas físicos 47% en 4 meses',
          'Journal of Experimental Psychology: Escribir metas aumenta probabilidad cumplirlas 42%',
          'Psychosomatic Medicine: Escritura expresiva mejora función inmune mediblemente',
          'Anxiety, Stress & Coping: Gratitude journaling reduce ansiedad 25% en 8 semanas',
          'Advances in Psychiatric Treatment: Escritura terapéutica = resultados similares a terapia',
          'Cognitive Therapy Research: CBT escrita reduce rumiación 60%',
          'Personality & Social Psychology: Expresar gratitud aumenta felicidad 12% sostenido',
          'Psychology & Health: Journaling mejora memoria trabajo y reduce estrés percibido'
        ],
        mecanismos: [
          'Externalización: Sacar pensamientos de cabeza a papel',
          'Procesamiento emocional: Dar sentido a experiencias',
          'Claridad cognitiva: Organizar pensamientos caóticos',
          'Tracking progreso: Ver crecimiento en tiempo',
          'Catarsis: Liberación emocional segura',
          'Self-awareness: Patrones revelados'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Morning Pages - Stream of Consciousness', 
          descripcion: '3 páginas escritura libre cada mañana', 
          duracion: '15 min', 
          icono: '🌅',
          detalles: 'Julia Cameron: Escribe lo que sea, sin filtro, sin editar, sin juzgar',
          tips: ['Primera actividad mañana', 'No releer inmediatamente', 'Cualquier cosa vale', 'Deja fluir sin censura']
        },
        { 
          paso: 2, 
          titulo: 'Gratitude Triple', 
          descripcion: 'Escribe 3 cosas específicas agradeces', 
          duracion: '3 min', 
          icono: '🙏',
          detalles: 'Especificidad es clave. "Café caliente" > "estoy vivo"',
          tips: ['Diferentes cada día', 'Detalles sensoriales', 'Personas específicas', 'Pequeñas cosas']
        },
        { 
          paso: 3, 
          titulo: 'Reflexión guiada', 
          descripcion: 'Responde 2-3 preguntas profundas', 
          duracion: '5 min', 
          icono: '💭',
          detalles: 'Usa prompts como: ¿Qué me desafió hoy? ¿Qué aprendí? ¿Cómo puedo mejorar?',
          preguntas: [
            '¿Qué evento significativo ocurrió hoy?',
            '¿Cómo me sentí realmente al respecto?',
            '¿Qué patrón noto en mi comportamiento?',
            '¿Qué quiero diferente mañana?',
            '¿De qué estoy evitando hablar?'
          ]
        },
        { 
          paso: 4, 
          titulo: 'Goal Setting & Tracking', 
          descripcion: 'Documenta objetivos y progreso', 
          duracion: '2 min', 
          icono: '🎯',
          detalles: 'Revisar objetivos diariamente aumenta probabilidad éxito 42%',
          tips: ['Top 3 prioridades del día', 'Progreso semanal', 'Wins celebrar', 'Ajustes necesarios']
        },
        { 
          paso: 5, 
          titulo: 'Evening Review', 
          descripcion: 'Reflexión nocturna 5 min', 
          duracion: '5 min opcional', 
          icono: '🌙',
          detalles: 'Cierre del día con awareness completo',
          tips: ['¿Qué salió bien?', '¿Qué aprendí?', '¿Qué mejorar mañana?', 'Perdóname y libera']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Claridad mental', icono: '🧠', detalle: 'Mente despejada post-escritura' },
          { texto: 'Reducción ansiedad', icono: '😌', detalle: 'Externalizar preocupaciones' },
          { texto: 'Mejor toma decisiones', icono: '🎯', detalle: 'Ver situación objetivamente' },
          { texto: 'Catarsis emocional', icono: '💙', detalle: 'Procesamiento seguro' },
          { texto: 'Perspectiva ganada', icono: '👁️', detalle: 'Distancia de problemas' }
        ],
        largoplazo: [
          { texto: 'Auto-conocimiento profundo', icono: '🔍', detalle: 'Patrones revelados en tiempo' },
          { texto: 'Crecimiento documentado', icono: '📈', detalle: 'Ver evolución claramente' },
          { texto: 'Metas alcanzadas', icono: '🏆', detalle: 'Tracking aumenta éxito 42%' },
          { texto: 'Traumas procesados', icono: '🩹', detalle: 'Sanación emocional' },
          { texto: 'Creatividad desbloqueada', icono: '🎨', detalle: 'Flujo de ideas' },
          { texto: 'Resiliencia aumentada', icono: '💪', detalle: 'Perspectiva sobre desafíos' },
          { texto: 'Relaciones mejoradas', icono: '❤️', detalle: 'Awareness de patrones' },
          { texto: 'Legado personal', icono: '📖', detalle: 'Historia de tu vida' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Artist\'s Way - Julia Cameron',
          'Opening Up - James Pennebaker',
          'The Miracle Morning - Hal Elrod',
          'The 5 Minute Journal'
        ],
        apps: [
          'Day One - Best digital journal',
          'Five Minute Journal App',
          'Journey - Cross-platform'
        ],
        herramientas: [
          'Notebook físico de calidad',
          'Pluma que disfrutes usar',
          'Espacio privado sin interrupciones'
        ]
      },
      
      notas: 'Tu diario es espacio 100% seguro, privado, sin juicio. Escribe con honestidad brutal. Nadie más lo leerá (a menos que elijas compartir). La magia está en el proceso de escribir, no en releer. Consistencia > perfección.',
      
      frecuenciaRecomendada: 'DIARIA - Preferible mañanas',
      compromiso: '30 días para hábito, beneficios desde día 1',
      dificultadReal: 3,
      retornoInversion: 800
    }
  },

  {
    id: 'tm9',
    titulo: 'Conexión Social Profunda',
    descripcionCorta: 'Relaciones auténticas como pilar de salud y felicidad',
    categoria: 'relaciones-sociales',
    duracion: 60,
    experiencia: 130,
    dificultad: 'intermedio',
    icono: '🤝',
    color: 'from-pink-600 to-rose-700',
    bgColor: 'bg-gradient-to-br from-pink-600 to-rose-700',
    shadowColor: 'shadow-pink-500/50',
    impactoVida: 87,
    prioridad: 9,
    contenido: {
      descripcionCompleta: `Harvard Study of Adult Development (85 años corriendo) concluye: Relaciones de calidad son el predictor #1 de felicidad y longevidad - más que dinero, fama o salud. Vivir conectado reduce mortalidad 50%, equivalente a dejar de fumar. Este protocolo cultiva conexiones auténticas mediante vulnerabilidad, presencia, y conversaciones significativas. Soledad es epidemia silenciosa - la conexión es cura.`,
      
      ciencia: {
        titulo: 'Neurobiología de la Conexión Humana',
        estudios: [
          'Harvard Study 85 años: Relaciones de calidad predicen longevidad más que cualquier factor',
          'PLOS Medicine: Aislamiento social aumenta mortalidad 50% - equivalente fumar 15 cig/día',
          'Nature: Oxitocina de conexión social reduce estrés y mejora salud cardiovascular',
          'Science: Conversaciones profundas aumentan felicidad 2x más que small talk',
          'JAMA: Apoyo social fuerte reduce riesgo demencia 35%',
          'Psychological Science: Gratitud expresada fortalece relaciones mediblemente',
          'Journal of Social Psychology: Vulnerabilidad recíproca genera intimidad rápidamente',
          'American Psychologist: Capital social es predictor salud mental más fuerte'
        ],
        mecanismos: [
          'Oxitocina: Hormona del vínculo social',
          'Vagal tone: Activado por conexión genuina',
          'Cortisol: Reducido por apoyo social',
          'Sistema inmune: Fortalecido por conexión',
          'Sentido de pertenencia: Necesidad fundamental',
          'Co-regulación: Sistemas nerviosos se sincronizan'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Quality over Quantity', 
          descripcion: 'Prioriza pocas relaciones profundas', 
          duracion: 'Filosofía continua', 
          icono: '💎',
          detalles: '5 amigos cercanos > 500 conocidos superficiales',
          tips: ['Identifica tu "core 5"', 'Invierte tiempo en ellos', 'Deja ir relaciones tóxicas', 'Profundidad > amplitud']
        },
        { 
          paso: 2, 
          titulo: 'Conversaciones significativas', 
          descripcion: 'Evita small talk, profundiza', 
          duracion: '30-60 min', 
          icono: '💬',
          detalles: 'Arthur Aron: 36 preguntas crean intimidad rápidamente',
          preguntas: [
            '¿Qué te apasiona realmente?',
            '¿Cuál ha sido tu mayor desafío?',
            '¿Qué te asusta?',
            '¿De qué estás orgulloso?',
            '¿Qué quieres lograr antes de morir?',
            '¿Cuándo te has sentido más vivo?'
          ]
        },
        { 
          paso: 3, 
          titulo: 'Presencia total', 
          descripcion: 'Atención 100% sin dispositivos', 
          duracion: 'Durante conversación', 
          icono: '👁️',
          detalles: 'Teléfono guardado, contacto visual, escucha activa',
          tips: ['Modo avión', 'Parafrasea lo que oyes', 'Empatía sin solucionar', 'Silencio cómodo OK']
        },
        { 
          paso: 4, 
          titulo: 'Vulnerabilidad recíproca', 
          descripcion: 'Comparte auténticamente', 
          duracion: 'Gradual', 
          icono: '💙',
          detalles: 'Brené Brown: Vulnerabilidad es birthplace de conexión',
          tips: ['Empieza tú compartiendo', 'Sin agenda', 'Honestidad > impresionar', 'Respeta reciprocidad']
        },
        { 
          paso: 5, 
          titulo: 'Gratitud expresada', 
          descripcion: 'Di apreciación específica', 
          duracion: '2 min', 
          icono: '🙏',
          detalles: 'Estudios: Expresar gratitud fortalece vínculos más que sentirla',
          tips: ['Específico > genérico', 'Impacto en ti', 'Sincero', 'Escrito o verbal']
        },
        { 
          paso: 6, 
          titulo: 'Rituales compartidos', 
          descripcion: 'Crea tradiciones juntos', 
          duracion: 'Recurrente', 
          icono: '🎭',
          detalles: 'Rituales predicen satisfacción relacional mejor que tiempo total',
          tips: ['Cena semanal', 'Aventura mensual', 'Check-in diario', 'Celebraciones únicas']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Felicidad aumentada', icono: '😊', detalle: 'Oxitocina y dopamina elevadas' },
          { texto: 'Estrés reducido', icono: '😌', detalle: 'Cortisol disminuido 40%' },
          { texto: 'Sentido de pertenencia', icono: '🏠', detalle: 'Necesidad fundamental satisfecha' },
          { texto: 'Perspectiva ganada', icono: '💡', detalle: 'Otros espejos de ti' },
          { texto: 'Apoyo emocional', icono: '❤️', detalle: 'No estás solo en desafíos' }
        ],
        largoplazo: [
          { texto: 'Longevidad aumentada', icono: '🌟', detalle: 'Mortalidad reducida 50%' },
          { texto: 'Salud mental robusta', icono: '🧠', detalle: 'Depresión prevención 40%' },
          { texto: 'Resiliencia extrema', icono: '💪', detalle: 'Apoyo en crisis crucial' },
          { texto: 'Propósito de vida', icono: '🎯', detalle: 'Significado en conexión' },
          { texto: 'Salud física mejor', icono: '❤️', detalle: 'Cardiovascular optimizado' },
          { texto: 'Éxito profesional', icono: '📈', detalle: 'Network de calidad' },
          { texto: 'Felicidad sostenida', icono: '🌈', detalle: 'Predictor #1 felicidad' },
          { texto: 'Legado significativo', icono: '👥', detalle: 'Impacto en otros' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Good Life - Robert Waldinger (Harvard Study)',
          'Daring Greatly - Brené Brown',
          'The Relationship Cure - John Gottman',
          'How to Win Friends - Dale Carnegie'
        ],
        herramientas: [
          '36 Questions That Lead to Love (Aron)',
          'Essentialism - Greg McKeown',
          'Difíciles conversaciones - Stone et al'
        ]
      },
      
      notas: 'Vivimos en era más "conectada" digitalmente pero más aislada humanamente. Relaciones superficiales no satisfacen necesidad fundamental de pertenencia. Calidad > cantidad siempre. Una conversación profunda mensual > 100 likes diarios. Invierte en relaciones como inviertes en salud.',
      
      frecuenciaRecomendada: 'SEMANAL - Mínimo 1 conexión profunda',
      compromiso: 'Toda la vida - relaciones son marathon',
      dificultadReal: 7,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm10',
    titulo: 'Lectura Transformadora Diaria',
    descripcionCorta: 'Aprendizaje acelerado mediante lectura estratégica',
    categoria: 'aprendizaje-crecimiento',
    duracion: 30,
    experiencia: 100,
    dificultad: 'principiante',
    icono: '📚',
    color: 'from-indigo-600 to-purple-700',
    bgColor: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    shadowColor: 'shadow-indigo-500/50',
    impactoVida: 85,
    prioridad: 10,
    contenido: {
      descripcionCompleta: `Líderes leen promedio 60 libros/año mientras persona promedio lee 0-1. Warren Buffett lee 500+ páginas diarias. Bill Gates 50 libros/año. La lectura no es pasatiempo, es inversión más alta ROI posible. 30 min diarios = 25-30 libros anuales = expertise en cualquier campo. Este protocolo optimiza comprensión, retención y aplicación de conocimiento.`,
      
      ciencia: {
        titulo: 'Neurociencia del Aprendizaje por Lectura',
        estudios: [
          'Nature Neuroscience: Lectura aumenta conectividad neuronal y reserva cognitiva',
          'Neurology: 30 min lectura diaria reduce riesgo demencia 35%',
          'Psychology & Aging: Lectores activos mantienen cognición 32% mejor que no-lectores',
          'Journal of Research in Reading: Lectura mejora vocabulario y pensamiento crítico',
          'Science: Lectura ficción aumenta empatía y teoría de la mente',
          'Learning & Memory: Espaciado y revisión aumenta retención 200%',
          'Cognitive Psychology: Enseñar lo aprendido solidifica conocimiento 90%',
          'Mind, Brain & Education: Note-taking mejora comprensión 34%'
        ],
        mecanismos: [
          'Neuroplasticidad: Nuevas conexiones neuronales',
          'Vocabulario expandido: Pensamiento complejo mejorado',
          'Memoria trabajo: Capacidad aumentada',
          'Concentración: Atención sostenida entrenada',
          'Empatía: Perspectivas múltiples integradas',
          'Conocimiento acumulativo: Compound interest mental'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Selección estratégica', 
          descripcion: 'Elige libros de alto impacto', 
          duracion: '5 min', 
          icono: '🎯',
          detalles: 'Prioriza: biografías, ciencia, filosofía, clásicos, skills relevantes',
          tips: ['Recomendaciones de mentores', 'Bestsellers perennes', 'Tu campo + adjacent', 'Mix ficción/no-ficción']
        },
        { 
          paso: 2, 
          titulo: 'Método SQ3R', 
          descripcion: 'Survey, Question, Read, Recite, Review', 
          duracion: '25 min lectura', 
          icono: '📖',
          detalles: 'Técnica probada aumenta comprensión 40%',
          pasos: [
            'Survey: Hojea capítulo, headers, resumen',
            'Question: ¿Qué quiero aprender?',
            'Read: Lee activamente, subraya',
            'Recite: Parafrasea en tus palabras',
            'Review: Repasa highlights mañana'
          ]
        },
        { 
          paso: 3, 
          titulo: 'Note-taking inteligente', 
          descripcion: 'Captura insights, no copias', 
          duracion: 'Durante lectura', 
          icono: '✍️',
          detalles: 'Tus palabras > citas directas para retención',
          tips: ['Kindle highlights', 'Notebook físico', 'Conexiones entre ideas', 'Aplicación práctica']
        },
        { 
          paso: 4, 
          titulo: 'Implement within 24h', 
          descripcion: 'Aplica 1 idea antes de 24 horas', 
          duracion: 'Variable', 
          icono: '⚡',
          detalles: 'Conocimiento sin acción es entretenimiento',
          tips: ['Una acción pequeña', 'Experimento', 'Conversación sobre idea', 'Enseña a alguien']
        },
        { 
          paso: 5, 
          titulo: 'Spaced Repetition Review', 
          descripcion: 'Revisa notas: 1 día, 1 semana, 1 mes', 
          duracion: '5 min', 
          icono: '🔄',
          detalles: 'Repetición espaciada = retención permanente',
          tips: ['Calendario recordatorios', 'Revisión dominical', 'Zettelkasten method', 'Teach to solidify']
        },
        { 
          paso: 6, 
          titulo: 'Ambiente optimal', 
          descripcion: 'Sin distracciones, comfortable', 
          duracion: 'Setup', 
          icono: '🛋️',
          detalles: 'Mismo lugar/hora = ritual poderoso',
          tips: ['Teléfono modo avión', 'Bebida caliente', 'Luz buena', 'Silencio o música clásica']
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Vocabulario expandido', icono: '📝', detalle: 'Expresión más sofisticada' },
          { texto: 'Conocimiento práctico', icono: '💡', detalle: 'Ideas aplicables hoy' },
          { texto: 'Perspectivas nuevas', icono: '👁️', detalle: 'Ver mundo diferente' },
          { texto: 'Concentración mejorada', icono: '🎯', detalle: 'Focus muscle entrenado' },
          { texto: 'Stress reducido', icono: '😌', detalle: 'Escape saludable' }
        ],
        largoplazo: [
          { texto: 'Expertise desarrollada', icono: '🎓', detalle: 'Top 1% en campo en 3 años' },
          { texto: 'Demencia prevenida', icono: '🧠', detalle: '35% reducción riesgo' },
          { texto: 'Pensamiento crítico', icono: '🤔', detalle: 'Análisis sofisticado' },
          { texto: 'Empatía aumentada', icono: '❤️', detalle: 'Múltiples perspectivas' },
          { texto: 'Sabiduría acumulada', icono: '📿', detalle: 'Aprender de gigantes' },
          { texto: 'Conversaciones profundas', icono: '💬', detalle: 'Temas interesantes' },
          { texto: 'Carrera acelerada', icono: '📈', detalle: 'Conocimiento = poder' },
          { texto: 'Legado intelectual', icono: '🌟', detalle: 'Mente cultivada' }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'How to Read a Book - Mortimer Adler',
          'Make It Stick - Peter Brown',
          'Ultralearning - Scott Young',
          'The Art of Reading - Damon Young'
        ],
        apps: [
          'Kindle - Highlights & notes',
          'Readwise - Spaced repetition',
          'Blinkist - Resúmenes rápidos',
          'Goodreads - Tracking y reviews'
        ],
        recursos: [
          'Lists: Bill Gates, Naval, Patrick Collison',
          'Podcast: The Knowledge Project',
          'Blog: Farnam Street'
        ]
      },
      
      notas: 'Libros son conversaciones con las mentes más brillantes de la historia. Por $20 compras décadas de experiencia comprimida. Es el arbitrage más grande que existe. Si lees 30 min diarios, en 10 años habrás leído 200-300 libros - estarás en top 1% de conocimiento en tu campo. Read to lead.',
      
      frecuenciaRecomendada: 'DIARIA - 30 min mínimo',
      compromiso: 'Hábito de por vida',
      dificultadReal: 2,
      retornoInversion: 1000
    }
  },
  {
    id: 'tm11',
    titulo: 'Protocolo de Luz Natural Óptima',
    descripcionCorta: 'Sincronización circadiana mediante exposición estratégica a luz',
    categoria: 'salud-fundamental',
    duracion: 25,
    experiencia: 140,
    dificultad: 'principiante',
    icono: '☀️',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    shadowColor: 'shadow-yellow-500/50',
    impactoVida: 88,
    prioridad: 3,
    contenido: {
      descripcionCompleta: `La luz es el sincronizador #1 de tu ritmo circadiano. Andrew Huberman (Stanford) demuestra que 10-30 min de luz matutina mejora sueño 40%, estado ánimo 35%, y metabolismo 25%. La exposición incorrecta a luz causa desincronización que afecta TODO: sueño, hormonas, cognición, metabolismo, inmunidad. Este protocolo optimiza tu exposición lumínica durante 24 horas para máximo rendimiento biológico.`,
      
      ciencia: {
        titulo: 'Fotobiología del Ritmo Circadiano',
        estudios: [
          'Stanford Neuroscience: Luz matutina aumenta cortisol AM 50% y adelanta fase circadiana',
          'Current Biology: 10,000 lux primeros 30 min post-despertar optimiza sueño nocturno',
          'Nature: Células ganglionares ipRGC detectan luz azul y sincronizan reloj maestro (SCN)',
          'PNAS: Luz artificial nocturna suprime melatonina 85% incluso a baja intensidad',
          'Sleep Medicine Reviews: Exposición luz correcta reduce depresión estacional 70%',
          'Journal of Clinical Endocrinology: Luz matutina mejora sensibilidad insulina 31%',
          'Chronobiology International: Timing de luz más importante que intensidad total',
          'Science Advances: Luz roja/ámbar nocturna no suprime melatonina vs azul/verde'
        ],
        mecanismos: [
          'Núcleo Supraquiasmático (SCN): Reloj maestro del cerebro sincronizado por luz',
          'Células ipRGC: Receptores especiales retina detectan azul 460-480nm',
          'Melatonina: Hormona sueño suprimida por luz, pico 2-4 AM',
          'Cortisol: Hormona energía, debe subir con sol matutino',
          'Opsinas: Fotorreceptores no visuales regulan ciclo circadiano',
          'Expresión génica: 15-20% genes regulados por ritmo circadiano'
        ]
      },
      
      protocoloDiario: {
        fases: [
          {
            momento: 'Despertar (Primeros 30 min)',
            objetivo: 'Activar cortisol y suprimir melatonina residual',
            accion: 'Exposición 10-30 min luz natural exterior',
            luz: '10,000+ lux (sol directo) o 5,000 lux (nublado)',
            temperatura: 'Luz azul dominante del sol matutino',
            efectos: 'Reset circadiano, energía, estado ánimo optimizados'
          },
          {
            momento: 'Media mañana (9-12)',
            objetivo: 'Mantener alerta y productividad',
            accion: 'Iluminación brillante ambiente trabajo',
            luz: '1,000-2,000 lux mínimo',
            temperatura: 'Luz fría 5000-6500K',
            efectos: 'Focus sostenido, supresión somnolencia'
          },
          {
            momento: 'Tarde (12-17)',
            objetivo: 'Luz natural abundante',
            accion: 'Breaks outdoors cada 2 horas',
            luz: 'Máxima exposición posible',
            temperatura: 'Espectro completo solar',
            efectos: 'Vitamina D, serotonina, dopamina'
          },
          {
            momento: 'Ocaso (-2h antes dormir)',
            objetivo: 'Transición gradual a modo nocturno',
            accion: 'Dim lights progresivamente',
            luz: 'Reducir a <300 lux',
            temperatura: 'Cambiar a luces cálidas <3000K',
            efectos: 'Inicio producción melatonina'
          },
          {
            momento: 'Noche (-1h antes dormir)',
            objetivo: 'Minimizar supresión melatonina',
            accion: 'Luces tenues, filtros azul pantallas',
            luz: '<50 lux, luz roja/ámbar ideal',
            temperatura: '1800-2200K máximo',
            efectos: 'Melatonina sube naturalmente'
          },
          {
            momento: 'Sueño (Toda la noche)',
            objetivo: 'Oscuridad total para sueño profundo',
            accion: 'Blackout completo, 0 lux',
            luz: 'Oscuridad absoluta',
            temperatura: 'N/A',
            efectos: 'Sueño REM/profundo maximizado'
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Ritual Matutino de Luz', 
          descripcion: 'Sal afuera primeros 10-30 min post-despertar', 
          duracion: '10-30 min', 
          icono: '🌅',
          detalles: 'Crítico: Hazlo ANTES de café. La luz matutina adelanta tu fase circadiana.',
          tips: [
            'Nublado = necesitas 20-30 min',
            'Sol directo = 10 min suficiente',
            'Sin gafas sol para máximo efecto',
            'Caminar mientras = bonus ejercicio',
            'Antes de 10 AM = ventana óptima',
            'No a través de ventanas = bloquea UVB'
          ],
          ciencia: 'Células ipRGC retina necesitan ~10,000 lux para señal robusta al SCN. Ventanas filtran 50% luz efectiva.',
          erroresComunes: [
            'Hacerlo a través de ventana (pierde 50% efectividad)',
            'Usar gafas de sol (bloquea señal)',
            'Hacerlo después de 10 AM (menos efectivo)',
            'Reemplazar con luz artificial (necesitas 100,000+ lux)'
          ]
        },
        { 
          paso: 2, 
          titulo: 'Optimización Espacio Trabajo', 
          descripcion: 'Máxima luz natural o artificial brillante', 
          duracion: 'Setup único', 
          icono: '💡',
          detalles: 'Tu ambiente de trabajo debe simular exterior: brillante, luz fría',
          tips: [
            'Escritorio cerca ventana ideal',
            'Luz artificial: 1000+ lux desk level',
            'Temperatura color: 5000-6500K',
            'Light box 10,000 lux si no hay ventanas',
            'Apps f.lux/Night Shift para pantallas',
            'Medir con lux meter app'
          ],
          productosRecomendados: [
            'Philips SmartSleep Wake-up Light',
            'Northern Light Technologies Boxelite',
            'Carex Day-Light Classic Plus',
            'Lux meter app para smartphone'
          ]
        },
        { 
          paso: 3, 
          titulo: 'View Sunset Ritual', 
          descripcion: 'Observa atardecer para señalar transición', 
          duracion: '10-15 min', 
          icono: '🌅',
          detalles: 'Luz roja/naranja del ocaso señala a tu cerebro prepararse para dormir',
          tips: [
            'Opcional pero beneficioso',
            'Refuerza cambio de fase',
            'Momento mindfulness natural',
            'Especialmente útil si trabajas hasta tarde'
          ],
          ciencia: 'Luz roja/naranja espectro (600-700nm) no suprime melatonina pero señala fin del día.'
        },
        { 
          paso: 4, 
          titulo: 'Transición Nocturna Gradual', 
          descripcion: 'Dim lights 2-3 horas antes dormir', 
          duracion: '2-3 horas', 
          icono: '🕯️',
          detalles: 'Reduce intensidad Y cambia temperatura color progresivamente',
          protocolo: [
            '3h antes: Reduce a 500 lux, 3000K',
            '2h antes: Reduce a 300 lux, 2500K',
            '1h antes: Reduce a 100 lux, 2000K',
            '30 min antes: Reduce a 50 lux, luces rojas/ámbar'
          ],
          tips: [
            'Smart bulbs Philips Hue automatizar',
            'Dimmer switches en toda casa',
            'Velas/luces sal = perfecto',
            'Blue blockers glasses última opción'
          ]
        },
        { 
          paso: 5, 
          titulo: 'Screen Hygiene Nocturna', 
          descripcion: 'Filtros azul y brillo mínimo post-ocaso', 
          duracion: 'Noche completa', 
          icono: '📱',
          detalles: 'Pantallas son la disrupción #1 del ritmo circadiano moderno',
          jerarquíaSoluciones: [
            '1. Mejor: Cero pantallas 2h antes dormir',
            '2. Muy bueno: E-readers sin backlight (Kindle Paperwhite luz mínima)',
            '3. Bueno: Night Shift máximo + brillo mínimo',
            '4. Aceptable: Blue blocker glasses (Swannies, TrueDark)',
            '5. Mínimo: Modo oscuro + f.lux'
          ],
          realidadCheck: 'Si DEBES usar pantallas, al menos aplica todos los filtros posibles.'
        },
        { 
          paso: 6, 
          titulo: 'Blackout Sleeping Environment', 
          descripcion: 'Oscuridad TOTAL durante sueño', 
          duracion: '7-9 horas', 
          icono: '🌑',
          detalles: 'Incluso 5 lux puede suprimir melatonina 50%. Meta: 0 lux.',
          tips: [
            'Blackout curtains grado hospitalario',
            'Tape sobre LEDs dispositivos',
            'Sleep mask si viajas',
            'Noche bathroom: luz roja <10 lux',
            'Desconecta todo lo que brilla',
            'Test: No deberías ver tu mano'
          ]
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Energía matutina 2x', icono: '⚡', detalle: 'Cortisol timing optimizado' },
          { texto: 'Estado ánimo elevado', icono: '😊', detalle: 'Serotonina y dopamina aumentadas' },
          { texto: 'Alerta mental sostenida', icono: '🧠', detalle: 'Menos crashes energéticos' },
          { texto: 'Sueño profundo esa noche', icono: '😴', detalle: 'Melatonina producida naturalmente' },
          { texto: 'Apetito regulado', icono: '🍽️', detalle: 'Grelina/leptina sincronizadas' }
        ],
        largoplazo: [
          { texto: 'Sueño optimizado permanente', icono: '🌙', detalle: 'Ciclo circadiano robusto' },
          { texto: 'Prevención depresión', icono: '🌈', detalle: 'Especialmente SAD' },
          { texto: 'Metabolismo acelerado', icono: '🔥', detalle: 'Sensibilidad insulina mejorada' },
          { texto: 'Sistema inmune fuerte', icono: '🛡️', detalle: 'Ritmo circadiano inmunológico' },
          { texto: 'Hormonas balanceadas', icono: '⚖️', detalle: 'Cortisol, melatonina, testosterona' },
          { texto: 'Envejecimiento ralentizado', icono: '🧬', detalle: 'Expresión génica optimizada' },
          { texto: 'Rendimiento cognitivo peak', icono: '🎯', detalle: 'Alerta en momentos correctos' },
          { texto: 'Vitamina D optimizada', icono: '☀️', detalle: 'Exposición UVB suficiente' }
        ]
      },
      
      troubleshooting: {
        situaciones: [
          {
            problema: 'Vivo en lugar con poco sol',
            soluciones: [
              'Light box 10,000 lux 20-30 min AM',
              'Caminar afuera incluso nublado',
              'Ventanas máximas en casa/trabajo',
              'Considerar vitamina D suplemento'
            ]
          },
          {
            problema: 'Trabajo nocturno/turnos',
            soluciones: [
              'Blackout total durante "tu noche"',
              'Light box cuando "despiertes"',
              'Blue blockers durante turno si necesario',
              'Consulta especialista si problemas severos'
            ]
          },
          {
            problema: 'Viajo frecuentemente (jet lag)',
            soluciones: [
              'Ajusta horario luz 2-3 días antes',
              'Primer día destino: max luz a "mañana" local',
              'Melatonina 0.5mg timing estratégico',
              'Evita luz durante "noche" destino'
            ]
          }
        ]
      },
      
      equipamiento: {
        esencial: [
          { item: 'Acceso exterior matutino', costo: 'Gratis', prioridad: 1 },
          { item: 'Blackout curtains', costo: '$50-150', prioridad: 2 },
          { item: 'Smart bulbs warm/cool', costo: '$100-300', prioridad: 3 }
        ],
        opcional: [
          { item: 'Light box 10,000 lux', costo: '$50-200', uso: 'Días nublados o sin ventanas' },
          { item: 'Blue blocker glasses', costo: '$50-100', uso: 'Si debes usar pantallas noche' },
          { item: 'Lux meter', costo: '$30', uso: 'Medir ambiente trabajo' },
          { item: 'Dawn simulator alarm', costo: '$50-150', uso: 'Despertar más natural' }
        ]
      },
      
      integracionOtrasMisiones: [
        'Sueño Profundo: La luz es la base del sueño óptimo',
        'Exercise: Hazlo con luz natural para dopamina 2x',
        'Cold Exposure: Ducha fría post-luz matutina = combo poderoso',
        'Ayuno: Ventana alimentación alineada con luz (8 AM - 6 PM ideal)'
      ],
      
      recursosAdicionales: {
        libros: [
          'Why We Sleep - Matthew Walker (capítulo circadiano)',
          'The Circadian Code - Satchin Panda',
          'The Body Clock Guide to Better Health - Michael Smolensky'
        ],
        podcasts: [
          'Huberman Lab - Optimizing Light podcast',
          'Found My Fitness - Satchin Panda on circadian rhythm'
        ],
        apps: [
          'Lux Meter - Medir luz ambiente',
          'f.lux - Filtro azul computadora',
          'Twilight - Filtro azul Android'
        ]
      },
      
      notas: 'La luz es gratis, ubicua, y el regulador más poderoso de tu biología circadiana. 99.9% de la historia humana vivimos con sol AM, oscuridad PM. Tu cuerpo ESPERA esto. Luz artificial mal usada = jet lag permanente. 30 min luz natural matutina es el hack de salud con mejor ROI que existe.',
      
      frecuenciaRecomendada: 'DIARIA - No negociable si valoras tu salud',
      compromiso: 'Inmediato - Resultados desde día 1',
      dificultadReal: 2,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm12',
    titulo: 'Forest Bathing - Shinrin-yoku',
    descripcionCorta: 'Inmersión terapéutica en naturaleza respaldada por ciencia japonesa',
    categoria: 'salud-mental',
    duracion: 90,
    experiencia: 160,
    dificultad: 'principiante',
    icono: '🌲',
    color: 'from-green-600 to-teal-700',
    bgColor: 'bg-gradient-to-br from-green-600 to-teal-700',
    shadowColor: 'shadow-green-500/50',
    impactoVida: 86,
    prioridad: 7,
    contenido: {
      descripcionCompleta: `Shinrin-yoku ("baño de bosque") es práctica terapéutica japonesa respaldada por 40+ años de investigación. Qing Li (Nippon Medical School) demuestra que 2 horas en bosque reducen cortisol 16%, presión arterial 2%, y aumentan células NK (anticáncer) 50% por 30 días. No es hiking - es inmersión sensorial lenta y consciente. La naturaleza no es lujo, es necesidad biológica.`,
      
      ciencia: {
        titulo: 'Biología de la Conexión con Naturaleza',
        estudios: [
          'Environmental Health Perspectives: 2h bosque/semana reduce mortalidad 16%',
          'Qing Li Research: Fitoncidas de árboles aumentan células NK 50% por 30 días',
          'Nature Neuroscience: Naturaleza reduce actividad corteza prefrontal (reduce rumiación)',
          'PNAS: 90 min caminata naturaleza reduce rumiación y actividad subgenual prefrontal',
          'Journal of Environmental Psychology: Naturaleza restaura atención dirigida agotada',
          'International Journal of Environmental Research: Reduce ansiedad 25%, depresión 30%',
          'Landscape and Urban Planning: Vista árboles desde hospital acelera recuperación 20%',
          'Frontiers in Psychology: Biodiversidad correlaciona con bienestar más que abundancia'
        ],
        mecanismos: [
          'Fitoncidas: Compuestos volátiles árboles activan células NK',
          'Sistema parasimpático: Activado por naturaleza vs urbano',
          'Cortisol: Reducido 16% promedio post-bosque',
          'Microbioma: Exposición bacterias suelo beneficiosas',
          'Atención restaurada: ART - Attention Restoration Theory',
          'Fractales naturales: Reducen estrés visual 60%',
          'Iones negativos: Cascadas/bosque generan iones que mejoran mood',
          'Sonidos naturales: 432 Hz y frecuencias reducen ansiedad'
        ]
      },
      
      protocolo: {
        preparacion: [
          'Encuentra bosque, parque arbolado, o espacio verde (mínimo 15% cobertura arbórea)',
          'Deja teléfono en modo avión (música natural OK)',
          'Ropa cómoda, layers por temperatura',
          'Botella agua, snack opcional',
          'No agenda, no destino, no prisa',
          'Mindset: Eres invitado del bosque'
        ],
        
        fases: [
          {
            fase: 'Arrival - Transición (10 min)',
            descripcion: 'Del modo urbano al modo naturaleza',
            acciones: [
              'Para en entrada bosque/parque',
              'Respiraciones profundas 10x',
              'Nota diferencia aire vs ciudad',
              'Activa todos sentidos consciente',
              'Set intention: "Estoy aquí para recibir"'
            ]
          },
          {
            fase: 'Slow Walking - Caminar Consciente (40 min)',
            descripcion: 'Camina 50% velocidad normal o menos',
            acciones: [
              'Velocidad: ~1 km/hora (muy lento)',
              'Para frecuentemente sin razón',
              'Nota texturas, colores, sombras',
              'Toca cortezas, hojas, musgo',
              'Respira profundo al parar',
              'No headphones - escucha bosque'
            ],
            recordatorio: 'No es ejercicio. Puedes ir más lento. Menos es más.'
          },
          {
            fase: 'Sensory Awakening - 5 Sentidos (20 min)',
            descripcion: 'Dedica tiempo específico a cada sentido',
            protocolo: [
              'Vista (4 min): Observa sin nombrar. Colores, movimiento, luz',
              'Oído (4 min): Cierra ojos. Capas de sonido. Cerca y lejos',
              'Tacto (4 min): Texturas. Temperatura. Brisa en piel',
              'Olfato (4 min): Inhala profundo. Notas tierra, pino, humedad',
              'Gusto (4 min): Si seguro, prueba (hoja comestible, agua arroyo)'
            ]
          },
          {
            fase: 'Sitting Spot - Punto Fijo (15 min)',
            descripcion: 'Encuentra lugar y solo SÉ',
            acciones: [
              'Encuentra spot que te llame',
              'Siéntate cómodo (log, piedra, suelo)',
              'No hagas nada excepto estar presente',
              'Observa sin esfuerzo',
              'Permite pensamientos pasar',
              'Siente pertenencia a algo mayor'
            ]
          },
          {
            fase: 'Gratitude & Integration (5 min)',
            descripcion: 'Cierre y transición de regreso',
            acciones: [
              'Gratitud silenciosa al bosque',
              'Nota cómo te sientes vs llegada',
              'Toma foto mental (no necesitas cámara)',
              'Compromiso de regresar',
              'Transición gradual a mundo humano'
            ]
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'No es Hiking - Es Inmersión', 
          descripcion: 'Cambia tu mindset desde el principio', 
          duracion: 'Antes de ir', 
          icono: '🚶',
          detalles: 'Shinrin-yoku ≠ ejercicio. No hay destino. No hay objetivo kilometraje.',
          diferencias: {
            hiking: 'Meta, velocidad, distancia, achievement',
            shinrinyoku: 'Presencia, lentitud, sensorialidad, recepción'
          },
          tips: [
            'Velocidad: Lo más lento posible',
            'Distancia: Irrelevante, puedes quedarte en 100m²',
            'Postura: Relajada, no atlética',
            'Compañía: Solo ideal, silencio si con otros',
            'Documentación: Mínima, vive el momento'
          ]
        },
        { 
          paso: 2, 
          titulo: 'Activación de los 5 Sentidos', 
          descripcion: 'Usa todos tus sentidos deliberadamente', 
          duracion: '20 min dedicados', 
          icono: '👁️',
          detalles: 'Urbanización atrofia sentidos. Naturaleza los reactiva.',
          ejercicios: [
            {
              sentido: 'Vista',
              ejercicio: 'Soft gaze sin enfocar. Visión periférica. Nota movimiento.',
              duración: '4 min'
            },
            {
              sentido: 'Oído',
              ejercicio: 'Cierra ojos. Cuenta capas sonoras. Identifica origen.',
              duración: '4 min'
            },
            {
              sentido: 'Tacto',
              ejercicio: 'Texturas diversas. Musgo, corteza, tierra, agua.',
              duración: '4 min'
            },
            {
              sentido: 'Olfato',
              ejercicio: 'Inhala profundo. Notas de bosque. Estaciones afectan.',
              duración: '4 min'
            },
            {
              sentido: 'Gusto',
              ejercicio: 'Seguro solo: bayas conocidas, agua pura, aire fresco.',
              duración: '4 min'
            }
          ]
        },
        { 
          paso: 3, 
          titulo: 'Grounding & Earthing', 
          descripcion: 'Contacto piel-tierra directo', 
          duracion: '10-15 min', 
          icono: '🦶',
          detalles: 'Electrones libres de tierra tienen efectos antiinflamatorios medibles',
          práctica: [
            'Descalzo en tierra, pasto, arena',
            'Si frío: manos en tierra/árbol suficiente',
            'Siéntate/acuéstate en suelo',
            'Siente conexión eléctrica literal',
            'Mínimo 10 min para absorción'
          ],
          ciencia: 'Journal of Environmental and Public Health: Earthing reduce inflamación, mejora sueño, reduce dolor.',
          seguridad: 'Verifica área sin vidrios, espinas, contaminantes'
        },
        { 
          paso: 4, 
          titulo: 'Tree Hugging (en serio)', 
          descripcion: 'Conexión física con árboles centenarios', 
          duracion: '5 min por árbol', 
          icono: '🤗',
          detalles: 'No es hippie - árboles emiten fitoncidas que benefician sistema inmune',
          protocolo: [
            'Encuentra árbol grande, viejo, saludable',
            'Pide permiso mentalmente (serio)',
            'Abraza o apoya espalda en tronco',
            'Respira profundo 5 min mínimo',
            'Nota texturas, olor, temperatura',
            'Siente estabilidad y permanencia',
            'Gratitud al árbol al terminar'
          ],
          cienciaSoporte: 'Fitoncidas son absorbidas por piel y pulmones. Peak concentración cerca de árboles.',
          mejoresÁrboles: [
            'Cedro: Fitoncidas más potentes',
            'Pino: Aroma terapéutico fuerte',
            'Roble: Presencia y estabilidad',
            'Cualquier árbol viejo: Sabiduría y conexión'
          ]
        },
        { 
          paso: 5, 
          titulo: 'Mindful Observation', 
          descripcion: 'Observación sin juicio ni nombrar', 
          duracion: '15 min', 
          icono: '🔍',
          detalles: 'Mente siempre quiere nombrar, categorizar. Practica solo observar.',
          técnica: [
            'Encuentra spot cómodo',
            'Observa sin etiquetar mentalmente',
            'Cuando aparezca palabra, vuelve a observar',
            'Nota impulso de nombrar y suéltalo',
            'Aprecia sin necesitar entender',
            'Deja que naturaleza sea maestra'
          ],
          benefits: 'Reduce Default Mode Network, mismo que meditación'
        },
        { 
          paso: 6, 
          titulo: 'Contemplación & Integración', 
          descripcion: 'Reflexión final antes de salir', 
          duracion: '10 min', 
          icono: '💭',
          detalles: 'No salgas abrupto. Transición consciente',
          preguntas: [
            '¿Cómo llegué vs cómo me siento ahora?',
            '¿Qué me sorprendió o llamó atención?',
            '¿Qué mensaje/insight recibí?',
            '¿Qué llevaré conmigo?',
            '¿Cuándo volveré?'
          ],
          journal: 'Opcional pero valioso: nota 3 cosas en journal después'
        }
      ],
      
      variaciones: {
        urbano: {
          título: 'Shinrin-yoku Urbano',
          descripción: 'Si no hay bosque cerca',
          opciones: [
            'Parque con 20+ árboles',
            'Jardín botánico',
            'Cementerio arbolado',
            'Campus universitario',
            'Jardín comunitario',
            'Incluso un árbol grande en calle'
          ],
          nota: 'Menos ideal pero significativamente mejor que cero naturaleza'
        },
        
        estaciones: {
          primavera: 'Brotes, flores, renacimiento. Energía elevada.',
          verano: 'Plenitud, verde intenso, calor. Vitalidad.',
          otoño: 'Colores, cambio, dejar ir. Reflexión.',
          invierno: 'Silencio, desnudez, esencia. Introspección.'
        },
        
        social: {
          solo: 'Ideal para principio. Máxima introspección.',
          pareja: 'Silencio o conversación minimal. Mismo ritmo.',
          grupo: 'Guía entrenado ideal. Silencio compartido.',
          familia: 'Niños natural en bosque. Déjalos explorar.'
        }
      },
      
      beneficios: {
        inmediatos: [
          { texto: 'Cortisol reducido 16%', icono: '😌', detalle: 'Medible en saliva post-sesión' },
          { texto: 'Presión arterial baja', icono: '❤️', detalle: 'Reducción 2-3% sistólica/diastólica' },
          { texto: 'Mente tranquila', icono: '🧠', detalle: 'Rumiación reducida dramáticamente' },
          { texto: 'Energía restaurada', icono: '⚡', detalle: 'Atención dirigida recuperada' },
          { texto: 'Creatividad desbloqueada', icono: '💡', detalle: 'Default mode network optimizado' }
        ],
        largoplazo: [
          { texto: 'Sistema inmune potenciado', icono: '🛡️', detalle: 'Células NK +50% por 30 días' },
          { texto: 'Ansiedad reducida 25%', icono: '🕊️', detalle: 'Con práctica semanal' },
          { texto: 'Depresión prevenida', icono: '🌈', detalle: '30% reducción síntomas' },
          { texto: 'Sueño profundo mejorado', icono: '😴', detalle: 'Parasimpático activado' },
          { texto: 'Inflamación reducida', icono: '🔥', detalle: 'Marcadores inflamatorios bajos' },
          { texto: 'Conexión existencial', icono: '🌍', detalle: 'Sentido pertenencia biosfera' },
          { texto: 'Resiliencia aumentada', icono: '💪', detalle: 'Recuperación estrés acelerada' },
          { texto: 'Longevidad', icono: '⏳', detalle: '16% reducción mortalidad' }
        ]
      },
      
      cienciaFitoncidas: {
        qué: 'Compuestos orgánicos volátiles emitidos por plantas como defensa',
        ejemplos: ['α-pineno', 'β-pineno', 'Limoneno', 'Isopreno'],
        mecanismo: 'Absorbidos vía respiratoria y dérmica → sistema inmune estimulado',
        concentración: 'Máxima en bosques densos, días cálidos, cerca de árboles',
        duración: 'Efectos inmunes persisten 30 días post-exposición',
        mejoresÁrboles: 'Coníferas (pinos, cedros) emiten más que caducifolios'
      },
      
      implementación: {
        frecuenciaÓptima: '2-4 horas/semana en naturaleza',
        mínimo: '90 min/semana para beneficios medibles',
        ideal: '2 horas continuas > 4 sesiones de 30 min',
        constancia: 'Semanal mejor que mensual intenso',
        
        progresión: [
          'Semana 1-4: 60 min/semana (construir hábito)',
          'Mes 2-3: 90 min/semana (profundizar práctica)',
          'Mes 4+: 2-4h/semana (mantenimiento óptimo)'
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'Forest Bathing - Dr. Qing Li (el experto #1 mundial)',
          'The Nature Fix - Florence Williams',
          'Braiding Sweetgrass - Robin Wall Kimmerer',
          'The Hidden Life of Trees - Peter Wohlleben'
        ],
        certificación: [
          'ANFT - Association of Nature and Forest Therapy (guías entrenados)',
          'Forest Therapy Hub - Directorio global guías',
        ],
        apps: [
          'Seek by iNaturalist - Identifica plantas/animales',
          'Merlin Bird ID - Identifica cantos pájaros',
          'AllTrails - Encuentra senderos cerca'
        ]
      },
      
      paraQuiénEs: [
        'Cualquiera con estrés crónico',
        'Personas urbanas desconectadas naturaleza',
        'Recuperación burnout',
        'Ansiedad/depresión leve-moderada',
        'Creativos buscando inspiración',
        'Personas enfrentando decisiones importantes',
        'Todos - es prevención universal'
      ],
      
      notas: 'Evolucionamos en sabana, no cubículos. Tu cuerpo/mente NECESITA naturaleza - no es preferencia, es requisito biológico. 2 horas bosque/semana = dosis terapéutica. Es prescripción médica en Japón y Corea. Bosque es farmacia gratuita más poderosa del planeta. Humanos son naturaleza, no separados de ella.',
      
      frecuenciaRecomendada: '2-4 horas/semana - Semanal mínimo',
      compromiso: 'Beneficios inmediatos, efectos inmunes por 30 días',
      dificultadReal: 1,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm13',
    titulo: 'Gestión de Energía Vital',
    descripcionCorta: 'Optimiza energía física, emocional, mental y espiritual',
    categoria: 'productividad-mental',
    duracion: 40,
    experiencia: 170,
    dificultad: 'intermedio',
    icono: '🔋',
    color: 'from-orange-600 to-red-700',
    bgColor: 'bg-gradient-to-br from-orange-600 to-red-700',
    shadowColor: 'shadow-orange-500/50',
    impactoVida: 93,
    prioridad: 2,
    contenido: {
      descripcionCompleta: `Tiempo es finito, energía es renovable. Jim Loehr y Tony Schwartz (The Power of Full Engagement) demuestran que alto performers no gestionan tiempo - gestionan energía. 4 dimensiones: Física, Emocional, Mental, Espiritual. Optimizando las 4 simultáneamente, duplicas productividad Y bienestar. No se trata de trabajar más horas, sino de trabajar con máxima energía en momentos correctos.`,
      
      ciencia: {
        titulo: 'Bioenergética del Alto Rendimiento',
        estudios: [
          'Harvard Business Review: Gestión energía > gestión tiempo para productividad sostenible',
          'Journal of Applied Psychology: Breaks estratégicos aumentan productividad 13%',
          'Energy Project Research: 90% ejecutivos reportan más energía con gestión sistemática',
          'Sports Psychology: Oscilación energía (stress-recovery) = crecimiento',
          'Organizational Behavior: Recuperación activa supera descanso pasivo en restauración',
          'Nature Neuroscience: Variabilidad ritmo cardíaco predice capacidad recuperación',
          'Psychosomatic Medicine: Depleción energía afecta toma decisiones y autocontrol',
          'Annual Review of Psychology: Energía limitada diaria = willpower como músculo'
        ],
        mecanismos: [
          'ATP celular: Moneda energética universal del cuerpo',
          'Mitocondrias: Producción energía celular - mejora con ejercicio',
          'Glucosa cerebral: Limitada, se agota con esfuerzo cognitivo',
          'Cortisol: Patrón diario afecta energía disponible',
          'Ritmos ultradianos: Ciclos naturales 90-120 min',
          'Variabilidad ritmo cardíaco: Indicador reserva energética',
          'Alostasis: Carga acumulativa estrés sin recuperación',
          'Hormesis: Estrés + recuperación = crecimiento'
        ]
      },
      
      cuatroDimensiones: {
        fisica: {
          titulo: '1. Energía Física - La Fundamental',
          descripcion: 'Base de todas las demás. Sin energía física, todo colapsa.',
          optimizadores: [
            {
              práctica: 'Ciclos Ultradianos',
              detalle: 'Trabaja 90 min, recupera 15-20 min. Repite.',
              implementación: 'Timer 90 min → Break obligatorio → Repite 3-4 ciclos/día máximo',
              ciencia: 'Peretz Lavie: Ciclos 90-120 min naturales de alerta-fatiga'
            },
            {
              práctica: 'Micro-Recuperaciones',
              detalle: 'Breaks 5 min cada hora para reset nervioso',
              implementación: 'Hora :55 → Stand, stretch, respira, hidrata',
              ciencia: 'Previene depleción acumulativa de recursos'
            },
            {
              práctica: 'Ejercicio Estratégico',
              detalle: 'Ejercicio restaura energía más que descansa',
              implementación: 'AM: High intensity. PM slump: 15 min caminata. Post-trabajo: Moderado',
              ciencia: 'BDNF, endorfinas, mitocondrias aumentadas'
            },
            {
              práctica: 'Nutrición Energética',
              detalle: 'Comidas que sostienen vs crashes',
              implementación: 'Bajo índice glicémico + proteína + grasas buenas. Evita azúcar/procesados.',
              ciencia: 'Glucosa estable = energía mental sostenida'
            },
            {
              práctica: 'Hidratación Consciente',
              detalle: '2% deshidratación = 20% menos energía',
              implementación: '30ml/kg peso corporal. Electrolitos si ejercitas.',
              ciencia: 'ATP producción requiere agua como reactivo'
            },
            {
              práctica: 'Sueño No-Negociable',
              detalle: 'Dormir bien recarga TODO',
              implementación: '7-9h consistentes. Ver misión Sueño Profundo.',
              ciencia: 'Restauración física, mental, emocional, inmune'
            }
          ],
          señalesDepleción: [
            'Fatiga persistente no resuelta con sueño',
            'Necesitas café para funcionar',
            'Crashes post-comida',
            'Enfermarse frecuentemente',
            'Recuperación lenta post-ejercicio'
          ]
        },
        
        emocional: {
          titulo: '2. Energía Emocional - La Calidad',
          descripcion: 'Cómo te SIENTES afecta más que cuánto sabes/puedes',
          optimizadores: [
            {
              práctica: 'Gratitud Activa',
              detalle: '3 cosas específicas agradeces',
              implementación: 'AM al despertar + PM antes dormir. En journal.',
              ciencia: 'Aumenta dopamina y serotonina 25% sostenido'
            },
            {
              práctica: 'Conexión Profunda',
              detalle: 'Conversación significativa diaria',
              implementación: '15 min sin dispositivos con ser querido',
              ciencia: 'Oxitocina reduce cortisol, recarga emocional'
            },
            {
              práctica: 'Experiencias Positivas',
              detalle: 'Algo que disfrutes genuinamente',
              implementación: 'Diario: música, naturaleza, hobby, juego',
              ciencia: 'Positive psychology: ratio 3:1 positivo:negativo óptimo'
            },
            {
              práctica: 'Límites Saludables',
              detalle: 'Decir NO protege energía emocional',
              implementación: 'Evalúa cada compromiso: ¿Me da o quita energía?',
              ciencia: 'Depleción del ego: energía finita para regular/suprimir'
            },
            {
              práctica: 'Procesamiento Emocional',
              detalle: 'No suprimir, procesar conscientemente',
              implementación: 'Naming emotions + journaling + conversación',
              ciencia: 'Supresión consume energía, procesamiento libera'
            },
            {
              práctica: 'Risa & Juego',
              detalle: 'Diversión no es lujo, es necesidad',
              implementación: 'Algo que te haga reír genuino diario',
              ciencia: 'Endorfinas, reduce cortisol, conecta socialmente'
            }
          ],
          señalesDepleción: [
            'Irritabilidad fácil',
            'Cinismo o negatividad',
            'Falta de paciencia',
            'Relaciones tensas',
            'Pérdida de interés cosas disfrutabas'
          ]
        },
        
        mental: {
          titulo: '3. Energía Mental - El Focus',
          descripcion: 'Capacidad de concentrar, aprender, decidir, crear',
          optimizadores: [
            {
              práctica: 'Single-Tasking Radical',
              detalle: 'Una cosa a la vez, período',
              implementación: 'Bloque tiempo, una pestaña, una tarea, timer',
              ciencia: 'Task switching cuesta 40% productividad'
            },
            {
              práctica: 'Priorización Despiadada',
              detalle: 'Identifica top 3 tareas críticas diario',
              implementación: 'AM: Define 3 must-dos. Todo demás es secundario.',
              ciencia: 'Ley Pareto: 20% actividades = 80% resultados'
            },
            {
              práctica: 'Deep Work Blocks',
              detalle: 'Períodos intensos sin interrupciones',
              implementación: '90-120 min máximo focus. Ver misión Deep Work.',
              ciencia: 'Cal Newport: trabajo profundo = valor exponencial'
            },
            {
              práctica: 'Información Dieta',
              detalle: 'Limita input para proteger capacidad procesamiento',
              implementación: 'Email 2x día, news 1x día, social 20 min total',
              ciencia: 'Information overload depleta glucosa cerebral'
            },
            {
              práctica: 'Pensamiento vs Acción',
              detalle: 'Separa creatividad de ejecución',
              implementación: 'AM: Creatividad/estrategia. PM: Ejecución/tareas',
              ciencia: 'Diferentes sistemas neuronales, no simultáneos'
            },
            {
              práctica: 'Descansos Activos Mentales',
              detalle: 'Cambio de modo, no colapso',
              implementación: 'Post-focus: Caminar, música, conversación ligera',
              ciencia: 'Recovered attention más efectivo que forzar'
            }
          ],
          señalesDepleción: [
            'Incapacidad concentrar >20 min',
            'Procrastinación crónica',
            'Decisiones pobres',
            'Olvidos frecuentes',
            'Necesitas re-leer para entender'
          ]
        },
        
        espiritual: {
          titulo: '4. Energía Espiritual - El Propósito',
          descripcion: 'Por qué haces lo que haces. Significado y valores.',
          optimizadores: [
            {
              práctica: 'Claridad de Valores',
              detalle: 'Define tus 3-5 valores core',
              implementación: 'Ejercicio escrito: ¿Qué importa más en mi vida?',
              ciencia: 'Values-aligned behavior = wellbeing aumentado'
            },
            {
              práctica: 'Propósito Definido',
              detalle: 'Tu "why" personal',
              implementación: 'Ikigai: Pasión + Misión + Vocación + Profesión',
              ciencia: 'Sense of purpose reduce mortalidad 20%'
            },
            {
              práctica: 'Contribución Significativa',
              detalle: 'Impacto más allá de ti mismo',
              implementación: 'Servicio, mentoría, caridad, crear valor otros',
              ciencia: 'Helper\'s high: ayudar libera oxitocina y serotonina'
            },
            {
              práctica: 'Alineación Comportamiento-Valores',
              detalle: 'Actúa según lo que predicas',
              implementación: 'Audit semanal: ¿Mis acciones reflejan mis valores?',
              ciencia: 'Cognitive dissonance depleta energía'
            },
            {
              práctica: 'Práctica Contemplativa',
              detalle: 'Conexión con algo mayor',
              implementación: 'Meditación, oración, naturaleza, arte',
              ciencia: 'Self-transcendence mejora bienestar y salud'
            },
            {
              práctica: 'Legacy Thinking',
              detalle: '¿Qué quiero dejar?',
              implementación: 'Reflexión: ¿Cómo quiero ser recordado?',
              ciencia: 'Mortality salience enfoca en significativo'
            }
          ],
          señalesDepleción: [
            'Sentimiento vacío o sin sentido',
            'Cinismo sobre trabajo/vida',
            'Falta de motivación intrínseca',
            'Solo haces por dinero/obligación',
            'Desconexión de valores'
          ]
        }
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Energy Audit - Diagnóstico Inicial', 
          descripcion: 'Identifica tu perfil energético actual', 
          duracion: '30 min', 
          icono: '📊',
          proceso: [
            'Descarga plantilla Energy Audit',
            'Rate cada dimensión 1-10 (actual)',
            'Identifica patrones: ¿Qué depleta? ¿Qué recarga?',
            'Momentos peak energía vs valleys',
            'Blockers principales energía',
            'Oportunidades rápidas mejora'
          ],
          preguntas: [
            'Física: ¿Nivel energía promedio 1-10? ¿Cuándo crashes?',
            'Emocional: ¿Cómo te sientes mayoría del tiempo?',
            'Mental: ¿Capacidad focus cuántas horas reales?',
            'Espiritual: ¿Tu trabajo está alineado con propósito?'
          ]
        },
        { 
          paso: 2, 
          titulo: 'Diseña Tu Energy Architecture', 
          descripcion: 'Crea estructura diaria que soporte energía', 
          duracion: '1 hora planning', 
          icono: '🏗️',
          componentes: [
            {
              elemento: 'Morning Ritual',
              objetivo: 'Start día con tanque lleno',
              duración: '60-90 min',
              incluye: ['Luz natural', 'Movimiento', 'Hydration', 'Nutrición quality', 'Mindfulness']
            },
            {
              elemento: 'Peak Hours',
              objetivo: 'Trabajo más importante en energía peak',
              duración: '2-4 horas',
              incluye: ['Deep work', 'Decisiones importantes', 'Creatividad', 'Estrategia']
            },
            {
              elemento: 'Recovery Blocks',
              objetivo: 'Prevenir depleción acumulativa',
              duración: '15-20 min cada 90 min',
              incluye: ['Movement', 'Hydration', 'Breathing', 'Social brief', 'Nature glimpse']
            },
            {
              elemento: 'Afternoon Slump Strategy',
              objetivo: 'Navigate 2-4 PM naturally bajo',
              duración: 'Variable',
              incluye: ['Power nap 20 min', 'Caminata 15 min', 'Tareas fáciles', 'No decisiones importantes']
            },
            {
              elemento: 'Evening Wind-Down',
              objetivo: 'Transición a recovery mode',
              duración: '2-3 horas pre-sueño',
              incluye: ['Exercise ligero', 'Connection social', 'Hobby disfrutes', 'Digital sunset']
            }
          ]
        },
        { 
          paso: 3, 
          titulo: 'Implementa Rituales Energéticos', 
          descripcion: 'Hábitos micro que protegen/recargan energía', 
          duracion: 'Diario', 
          icono: '⚡',
          rituales: [
            {
              nombre: 'Energy Check-In',
              frecuencia: '3x día (AM, mediodía, PM)',
              qué: 'Rate energía 1-10 cada dimensión',
              porqué: 'Awareness es primer paso control'
            },
            {
              nombre: 'Hydration Pulse',
              frecuencia: 'Cada hora',
              qué: '200ml agua + respiraciones profundas 3x',
              porqué: 'Previene depleción física gradual'
            },
            {
              nombre: 'Movement Snacks',
              frecuencia: 'Cada 60-90 min',
              qué: '5 min movimiento (stretch, stairs, pushups)',
              porqué: 'Rompe sedentarismo, recircula energía'
            },
            {
              nombre: 'Gratitude Moments',
              frecuencia: '3x día',
              qué: 'Pausa, nota algo agradeces',
              porqué: 'Shift estado emocional instantáneo'
            },
            {
              nombre: 'Connection Touchpoints',
              frecuencia: 'Diario',
              qué: '15 min conversación real con humano',
              porqué: 'Recarga emocional profunda'
            }
          ]
        },
        { 
          paso: 4, 
          titulo: 'Master Recovery Strategies', 
          descripcion: 'Recuperación activa supera pasiva', 
          duracion: 'Continuo', 
          icono: '🔄',
          estrategias: [
            {
              tipo: 'Micro-Recovery',
              duración: '30 segundos - 5 min',
              ejemplos: ['Respiración 4-7-8', 'Stretch', 'Window gaze', 'Cold water face', 'Music 1 song'],
              cuándo: 'Entre tareas, transiciones'
            },
            {
              tipo: 'Mini-Recovery',
              duración: '15-20 min',
              ejemplos: ['Power nap', 'Caminata', 'Meditación', 'Shower', 'Conversación'],
              cuándo: 'Post ciclo 90 min, lunch, mid-afternoon'
            },
            {
              tipo: 'Maxi-Recovery',
              duración: '2-4 horas',
              ejemplos: ['Exercise completo', 'Naturaleza', 'Hobby profundo', 'Social quality', 'Cultural'],
              cuándo: 'Evenings, weekends'
            },
            {
              tipo: 'Mega-Recovery',
              duración: '24+ horas',
              ejemplos: ['Retiro', 'Viaje', 'Digital detox completo', 'Solo time extended'],
              cuándo: 'Quarterly, preventivo'
            }
          ],
          principio: 'Recuperación es ENTRENAMIENTO. No es perder tiempo, es invertir en capacidad.'
        },
        { 
          paso: 5, 
          titulo: 'Energy Boundaries & Saying No', 
          descripcion: 'Protege tu energía como vida depende de ello', 
          duracion: 'Diario', 
          icono: '🛡️',
          práctica: [
            'Evalúa cada request: ¿Da o quita energía?',
            'Si quita y no obligatorio → Decline',
            'Si obligatorio que quita → Minimize/delega',
            'Tiempo bloqueado = sagrado',
            'Interrupciones = vampiros energía',
            'Email/Slack = no real-time unless emergencia'
          ],
          scripts: [
            '"Aprecio la invitación, pero necesito declinar para cuidar mis compromisos actuales"',
            '"Mi calendario está completo este período, pero puedo [alternativa]"',
            '"No es mi área de fortaleza, [persona X] sería mejor opción"',
            '"Necesito enfocarme en prioridades core este mes"'
          ]
        },
        { 
          paso: 6, 
          titulo: 'Weekly Energy Review', 
          descripcion: 'Retrospectiva y ajuste semanal', 
          duracion: '30 min domingo', 
          icono: '📋',
          preguntas: [
            '¿Rating promedio energía esta semana cada dimensión?',
            '¿Momentos mayor energía? ¿Por qué?',
            '¿Momentos depleción? ¿Qué causó?',
            '¿Rituales que funcionaron vs no?',
            '¿Qué actividades quitaron más energía?',
            '¿Qué me recargó más efectivamente?',
            '¿Necesito ajustar estructura semana próxima?'
          ],
          output: 'Plan ajustado próxima semana basado en data'
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Productividad 2x sin más horas', icono: '📈', detalle: 'Energía alta en momentos correctos' },
          { texto: 'Menos fatiga crónica', icono: '⚡', detalle: 'Recovery sistemática previene depleción' },
          { texto: 'Decisiones mejores', icono: '🎯', detalle: 'Glucosa cerebral disponible cuando importa' },
          { texto: 'Mood estable y positivo', icono: '😊', detalle: 'Emocional recargada regularmente' },
          { texto: 'Focus sostenido', icono: '🧠', detalle: 'Mental protegida de distracciones' }
        ],
        largoplazo: [
          { texto: 'Carrera sostenible 30+ años', icono: '🏆', detalle: 'Sin burnout, con crecimiento continuo' },
          { texto: 'Salud robusta', icono: '💪', detalle: 'Física optimizada = prevención enfermedad' },
          { texto: 'Relaciones florecientes', icono: '❤️', detalle: 'Energía emocional para conexión' },
          { texto: 'Creatividad multiplicada', icono: '🎨', detalle: 'Mental fresca genera insights' },
          { texto: 'Vida con significado', icono: '🌟', detalle: 'Espiritual alineada con propósito' },
          { texto: 'Resiliencia extrema', icono: '🛡️', detalle: 'Capacidad enfrentar adversidad' },
          { texto: 'Impacto amplificado', icono: '🚀', detalle: 'Energía para contribuir grandemente' },
          { texto: 'Felicidad sostenida', icono: '😄', detalle: '4 dimensiones balanceadas = wellbeing' }
        ]
      },
      
      herramientas: {
        tracking: [
          'Energy Journal - Manual diario',
          'HRV tracking (Whoop, Oura) - Autonomic',
          'Mood tracking apps - Emocional',
          'Time blocking - Estructura',
          'Weekly review template - Retrospectiva'
        ],
        apps: [
          'Whoop / Oura Ring - Recovery metrics',
          'RescueTime - Mental focus tracking',
          'Daylio - Mood tracking',
          'Toggl - Time/energy correlation',
          'Notion - Energy architecture template'
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Power of Full Engagement - Loehr & Schwartz (BIBLIA)',
          'When - Daniel Pink (timing energía)',
          'Rest - Alex Soojung-Kim Pang',
          'The Way We\'re Working Isn\'t Working - Tony Schwartz'
        ],
        cursos: [
          'Energy Project - Corporate training (Google, Apple usan)',
          'High Performance Academy - Brendon Burchard'
        ]
      },
      
      notas: 'Tiempo es limitado e inflexible - 24h todos. Energía es renovable, expandible, optimizable. Elite performers no tienen más tiempo, tienen más energía. Gestión energía > gestión tiempo para resultados sostenibles. No puedes hacer TODO, pero puedes hacer lo IMPORTANTE con energía MÁXIMA. Eso cambia todo.',
      
      frecuenciaRecomendada: 'SISTEMA - Estructura diaria + review semanal',
      compromiso: '4 semanas para instalar sistema, efectos inmediatos',
      dificultadReal: 7,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm14',
    titulo: 'Creativity & Flow State Engineering',
    descripcionCorta: 'Diseña condiciones para creatividad peak y estados de flow',
    categoria: 'productividad-mental',
    duracion: 60,
    experiencia: 190,
    dificultad: 'avanzado',
    icono: '🎨',
    color: 'from-purple-600 to-pink-700',
    bgColor: 'bg-gradient-to-br from-purple-600 to-pink-700',
    shadowColor: 'shadow-purple-500/50',
    impactoVida: 89,
    prioridad: 5,
    contenido: {
      descripcionCompleta: `Flow state es el estado óptimo de consciencia donde productividad aumenta 500%, aprendizaje 490%, y creatividad 700% (McKinsey). Steven Kotler (Flow Research Collective) ha descifrado la neurobiología y triggers para inducir flow sistemáticamente. No es suerte o talento - es ciencia aplicada. Este protocolo te enseña a diseñar tu día, entorno y tareas para entrar en flow a voluntad y desatar tu máximo potencial creativo.`,
      
      ciencia: {
        titulo: 'Neurobiología del Flow y Creatividad',
        estudios: [
          'McKinsey: Ejecutivos en flow son 5x más productivos que baseline',
          'Advanced Brain Monitoring: Flow aumenta norepinefrina, dopamina, endorfinas, anandamida, serotonina',
          'Nature Neuroscience: Transient hypofrontality - PFC se desactiva parcialmente en flow',
          'Creativity Research Journal: Incubación + insight = creativity breakthrough 43% más',
          'Psychological Science: Constraints creativos aumentan output quality 35%',
          'PNAS: Default mode network activa durante mind-wandering creativo',
          'Cognitive Psychology: Flow state mejora aprendizaje 490% según DARPA',
          'Journal of Consciousness: Ondas theta aumentan en flow = insights creativos'
        ],
        mecanismos: [
          'Transient Hypofrontality: Corteza prefrontal baja actividad = menos crítica interna',
          'Neurochemical Cascade: 5 químicos placer liberados simultáneamente',
          'Time Dilation: Percepción tiempo alterada, enfoque presente absoluto',
          'Pattern Recognition: Conexiones distantes más visibles',
          'Risk/Reward: Sistema dopaminérgico optimizado para motivación',
          'Ondas Cerebrales: Transición Beta → Alpha → Theta durante flow',
          'DMN Quieting: Red neuronal por defecto silenciada = ego disuelto',
          'Embodied Cognition: Cuerpo-mente integración en flow'
        ]
      },
      
      anatomiaFlow: {
        fases: [
          {
            fase: '1. Struggle (Lucha)',
            duración: '5-45 min',
            descripción: 'Sobrecarga cognitiva intencional',
            neuroquímica: 'Norepinefrina y cortisol suben',
            sensación: 'Frustración, dificultad, esfuerzo intenso',
            objetivo: 'Cargar sistema con información/desafío',
            tips: ['No evites esta fase', 'Es necesaria', 'Más lucha = mejor flow después']
          },
          {
            fase: '2. Release (Liberación)',
            duración: '5-30 min',
            descripción: 'Distancia psicológica del problema',
            neuroquímica: 'Cortisol baja, óxido nítrico sube',
            sensación: 'Relajación, distracción placentera',
            objetivo: 'Dejar incubación subconsciente trabajar',
            tips: ['Caminata naturaleza', 'Shower', 'Música', 'Conversación ligera', 'Cambio ambiente']
          },
          {
            fase: '3. Flow (Flujo)',
            duración: '30-240 min',
            descripción: 'Estado óptimo de rendimiento',
            neuroquímica: 'Dopamina, endorfinas, anandamida, serotonina peak',
            sensación: 'Effortless, timelessness, selflessness, richness',
            objetivo: 'Máxima productividad y creatividad',
            tips: ['No interrumpas', 'Monta la ola', 'Sigue el flujo', 'Produce masivamente']
          },
          {
            fase: '4. Recovery (Recuperación)',
            duración: '2-24 horas',
            descripción: 'Consolidación aprendizajes',
            neuroquímica: 'Serotonina alta, otros rebalanceándose',
            sensación: 'Satisfacción profunda, fatiga física/mental',
            objetivo: 'Integrar y restaurar para próximo ciclo',
            tips: ['No fuerces nuevo flow', 'Descansa activamente', 'Sleep quality crucial', 'Nutrition recovery']
          }
        ]
      },
      
      flowTriggers: {
        externos: [
          {
            trigger: 'Rich Environment',
            descripción: 'Entorno con novedad, complejidad, impredecibilidad',
            implementación: 'Cambia espacios, añade estímulos visuales/auditivos, naturaleza',
            potencia: '⭐⭐⭐'
          },
          {
            trigger: 'High Consequences',
            descripción: 'Riesgo percibido (físico, social, intelectual, emocional)',
            implementación: 'Deadlines reales, accountability público, stakes aumentados',
            potencia: '⭐⭐⭐⭐⭐'
          },
          {
            trigger: 'Deep Embodiment',
            descripción: 'Múltiples sistemas sensoriales activados',
            implementación: 'Movimiento físico, trabajo manual, actividades full-body',
            potencia: '⭐⭐⭐⭐'
          }
        ],
        
        internos: [
          {
            trigger: 'Clear Goals',
            descripción: 'Objetivos específicos, medibles, alcanzables',
            implementación: 'Define exactamente qué completarás esta sesión',
            potencia: '⭐⭐⭐⭐'
          },
          {
            trigger: 'Immediate Feedback',
            descripción: 'Señales claras si estás progresando',
            implementación: 'Métricas visibles, checkpoints frecuentes, resultados tangibles',
            potencia: '⭐⭐⭐⭐'
          },
          {
            trigger: 'Challenge-Skills Balance',
            descripción: 'Tarea 4% más difícil que habilidad actual',
            implementación: 'Goldilocks zone: no fácil, no imposible, justo correcto',
            potencia: '⭐⭐⭐⭐⭐'
          }
        ],
        
        creativos: [
          {
            trigger: 'Pattern Recognition',
            descripción: 'Buscar conexiones entre conceptos dispares',
            implementación: 'Analogías, metáforas, cross-domain thinking',
            potencia: '⭐⭐⭐⭐'
          },
          {
            trigger: 'Risk Taking',
            descripción: 'Voluntad experimentar y fallar',
            implementación: 'Prototype rápido, fail fast, iterate',
            potencia: '⭐⭐⭐⭐'
          },
          {
            trigger: 'Autonomy',
            descripción: 'Control sobre qué, cómo, cuándo trabajas',
            implementación: 'Self-directed projects, flexibilidad métodos',
            potencia: '⭐⭐⭐'
          }
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Design Flow-Friendly Environment', 
          descripcion: 'Optimiza espacio físico para flow', 
          duracion: 'Setup inicial', 
          icono: '🏛️',
          elementos: [
            {
              aspecto: 'Distracción Zero',
              setup: ['Phone modo avión otra habitación', 'Notificaciones OFF todo', 'Do Not Disturb señal visible', 'Una pestaña browser', 'Music o silencio - no podcast/lyrics'],
              porqué: 'Una distracción = 23 min recuperar flow'
            },
            {
              aspecto: 'Visual Stimulation',
              setup: ['Ventana con vista naturaleza ideal', 'Arte inspirador paredes', 'Colores energizantes si creativo', 'Limpio, minimalista, organizado', 'Lighting ajustable'],
              porqué: 'Rich environment trigger flow'
            },
            {
              aspecto: 'Ergonomía & Comfort',
              setup: ['Silla cómoda pero alerta', 'Escritorio altura correcta', 'Temperatura fresca 65-68°F', 'Todo al alcance no buscar', 'Agua y snacks pre-posicionados'],
              porqué: 'Discomfort físico saca de flow'
            },
            {
              aspecto: 'Auditory Environment',
              setup: ['Brain.fm / Focus@Will / Binaural beats', 'White/Brown noise si necesario', 'Noise-cancelling headphones', 'Playlist pre-curada', 'Silencio OK si prefieres'],
              porqué: 'Audio puede inducir estados específicos'
            }
          ]
        },
        { 
          paso: 2, 
          titulo: 'Pre-Flow Ritual (Struggle Phase)', 
          descripcion: 'Sobrecarga cognitiva para cargar sistema', 
          duracion: '15-30 min', 
          icono: '🔥',
          secuencia: [
            '1. Define objetivo ultra-claro (qué lograrás específicamente)',
            '2. Review material relevante rápido (notas, research, context)',
            '3. Set timer visible (crea presión temporal)',
            '4. Immerse totalmente en problema/tarea más difícil',
            '5. Push through frustration inicial (normal y necesario)',
            '6. Nota sobrecarga cognitiva (señal que estás cargando)'
          ],
          tips: [
            'Esta fase SE SIENTE mal - es correcto',
            'No evites dificultad - busca',
            'Cuanto más struggles, mejor flow después',
            'Si demasiado fácil, no habrá flow'
          ]
        },
        { 
          paso: 3, 
          titulo: 'Release Ritual (Transición a Flow)', 
          descripcion: 'Distancia psicológica para permitir insight', 
          duracion: '5-20 min', 
          icono: '🌊',
          opciones: [
            {
              actividad: 'Nature Walk',
              duración: '15 min',
              porqué: 'Restored attention + dopamine',
              ideal: 'Si disponible cerca'
            },
            {
              actividad: 'Shower/Cold Water',
              duración: '5-10 min',
              porqué: 'Reset fisiológico + insights comunes',
              ideal: 'En casa'
            },
            {
              actividad: 'Music + Movement',
              duración: '5-10 min',
              porqué: 'Cambio estado sin salir espacio',
              ideal: 'Always available'
            },
            {
              actividad: 'Conversación Ligera',
              duración: '10 min',
              porqué: 'Social + cambio perspectiva',
              ideal: 'Si colega disponible'
            },
            {
              actividad: 'Juggling / Meditation',
              duración: '5 min',
              porqué: 'Embodiment + quieting mind',
              ideal: 'Si practicas'
            }
          ],
          crítico: 'NO revises email, social, news - destruye transición'
        },
        { 
          paso: 4, 
          titulo: 'Enter & Ride Flow State', 
          descripcion: 'Reconoce entrada y maximiza duración', 
          duracion: '30-180 min', 
          icono: '🏄',
          señalesFlow: [
            'Tiempo desaparece (time dilation)',
            'Ego disuelto (selflessness)',
            'Acción y awareness merged (effortlessness)',
            'Información procesamiento instantáneo (richness)',
            'Feedback loop fluido y claro'
          ],
          mejoresPrácticas: [
            'No interrumpas por NADA (baño antes)',
            'Si atascas, no fuerces - explora lateral',
            'Momentum is everything - sigue',
            'Captura ideas margin pero sigue',
            'No edites, no juzgues - CREA',
            'Cuando empieces sentir fatiga, wrap up gracefully'
          ],
          duración: 'Principiantes: 30-60 min. Avanzados: 90-180 min. No fuerces más allá.'
        },
        { 
          paso: 5, 
          titulo: 'Optimize Recovery Phase', 
          descripcion: 'Consolidación y preparación próximo ciclo', 
          duracion: '2-24 horas post', 
          icono: '💤',
          protocol: [
            {
              timeframe: 'Inmediatamente post-flow',
              acciones: ['Documenta insights clave', 'Gratitude momento', 'Gentle movement', 'Hydrate & nutrición recovery'],
              evita: ['Inmediato próximo flow', 'Task switching abrupto', 'Stimulants']
            },
            {
              timeframe: 'Próximas 4 horas',
              acciones: ['Tareas light/mecánicas', 'Social tiempo', 'Nature si posible', 'Nap OK si necesario'],
              evita: ['Nuevo trabajo pesado', 'Decisiones importantes', 'Más estimulación intensa']
            },
            {
              timeframe: 'Siguiente 24h',
              acciones: ['Sleep prioritario 8h+', 'Exercise ligero', 'Nutrition quality', 'Review trabajo producido en flow'],
              evita: ['Forzar nuevo flow inmediato', 'Critique harsh trabajo flow', 'Depleción adicional']
            }
          ]
        },
        { 
          paso: 6, 
          titulo: 'Creativity Practices Complementarias', 
          descripcion: 'Hábitos que alimentan creatividad continua', 
          duracion: 'Ongoing', 
          icono: '🌱',
          prácticas: [
            {
              práctica: 'Morning Pages',
              descripción: '3 páginas escritura libre sin censura',
              frecuencia: 'Diario AM',
              beneficio: 'Drena ruido mental, activa creatividad subconsciente'
            },
            {
              práctica: 'Divergent Thinking',
              descripción: 'Genera 20+ ideas sin juzgar',
              frecuencia: '3x semana',
              beneficio: 'Fortalece fluido ideation muscle'
            },
            {
              práctica: 'Consume Cross-Domain',
              descripción: 'Lee/aprende fuera tu campo',
              frecuencia: 'Semanal',
              beneficio: 'Conexiones inesperadas = breakthrough ideas'
            },
            {
              práctica: 'Physical Creativity',
              descripción: 'Dibujo, música, baile, cooking',
              frecuencia: 'Semanal',
              beneficio: 'Embodied cognition unlocks new pathways'
            },
            {
              práctica: 'Solitude Blocks',
              descripción: 'Tiempo solo sin input externo',
              frecuencia: '2-4h semanal',
              beneficio: 'Permite procesamiento profundo y synthesis'
            },
            {
              práctica: 'Idea Sex',
              descripción: 'Combina 2+ conceptos dispares',
              frecuencia: 'Continuo',
              beneficio: 'Innovation = combinación inesperada'
            }
          ]
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: 'Productividad 5x en flow', icono: '📈', detalle: 'McKinsey research verified' },
          { texto: 'Creatividad 7x aumentada', icono: '💡', detalle: 'Breakthrough ideas fluyen' },
          { texto: 'Aprendizaje 4.9x acelerado', icono: '🧠', detalle: 'DARPA estudios' },
          { texto: 'Satisfacción profunda', icono: '😊', detalle: 'Neurochemicals optimizados' },
          { texto: 'Time distortion', icono: '⏰', detalle: '2 horas sienten 20 minutos' }
        ],
        largoplazo: [
          { texto: 'Carrera extraordinaria', icono: '🚀', detalle: 'Peak performers viven en flow' },
          { texto: 'Innovación constante', icono: '🔬', detalle: 'Breakthroughs regulares vs raros' },
          { texto: 'Maestría acelerada', icono: '🎓', detalle: 'Aprendizaje 490% más rápido' },
          { texto: 'Felicidad intrínseca', icono: '🌟', detalle: 'Flow = optimal experience' },
          { texto: 'Impacto amplificado', icono: '🌍', detalle: 'Output quality excepcional' },
          { texto: 'Meaning & Purpose', icono: '🎯', detalle: 'Flow = alineación con propósito' },
          { texto: 'Peak Performance default', icono: '👑', detalle: 'Excelencia se vuelve normal' },
          { texto: 'Legacy creation', icono: '📚', detalle: 'Trabajo que perdura generaciones' }
        ]
      },
      
      flowProfilePersonal: {
        description: 'Identifica tu perfil flow único para optimizar',
        pasos: [
          'Track 10 flow experiences pasadas',
          'Nota patrones: hora día, actividad, duración pre-flow, entorno',
          'Identifica triggers más efectivos para ti',
          'Nota actividades que NUNCA producen flow (evitar)',
          'Diseña día around tu peak flow windows',
          'Experimenta modificar variables sistemáticamente'
        ]
      },
      
      troubleshooting: {
        problemas: [
          {
            issue: 'No puedo entrar en flow',
            causas: ['Tarea muy fácil/difícil', 'Distracciones', 'Ansiedad alta', 'Fatiga'],
            soluciones: ['Ajusta challenge 4% más', 'Elimina interrupciones', 'Release ritual más largo', 'Descansa primero']
          },
          {
            issue: 'Flow muy corto (<30 min)',
            causas: ['Interrupción', 'Tarea completada muy rápido', 'Recovery inadecuada previa'],
            soluciones: ['Protege tiempo bloqueado', 'Chunk tareas más grandes', 'Better recovery protocolo']
          },
          {
            issue: 'Post-flow crash severo',
            causas: ['Flow muy largo (>3h)', 'Recovery inadecuada', 'Nutrición pobre'],
            soluciones: ['Limit sessions 90-120 min', 'Recovery protocol estricto', 'Electrolytes & protein post']
          }
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'The Rise of Superman - Steven Kotler (flow en deportes extremos)',
          'Stealing Fire - Kotler & Wheal (flow en líderes)',
          'Flow - Mihaly Csikszentmihalyi (original research)',
          'The Art of Impossible - Steven Kotler (flow + peak performance)'
        ],
        cursos: [
          'Zero to Dangerous - Flow Research Collective',
          'Flow Fundamentals - Steven Kotler online'
        ],
        organizaciones: [
          'Flow Research Collective - Leading edge research',
          'Flow Genome Project - Mapping flow triggers'
        ]
      },
      
      notas: 'Flow no es lujo de artistas o atletas extremos - es birthright biológico de todo humano. Ancestros vivían en flow cazando, creando, conectando. Mundo moderno con distracciones infinitas hace flow raro. Pero neurobiología no ha cambiado. Triggers correctos + disciplina = flow on demand. Tu mayor obra requiere flow. No lo dejes al azar.',
      
      frecuenciaRecomendada: '3-5 sesiones flow/semana para transformación',
      compromiso: '8 semanas práctica deliberada para dominar',
      dificultadReal: 8,
      retornoInversion: 1000
    }
  },

  {
    id: 'tm15',
    titulo: 'Digital Detox & Minimalismo Tecnológico',
    descripcionCorta: 'Recupera tu atención y tiempo de adicción digital',
    categoria: 'salud-mental',
    duracion: 45,
    experiencia: 150,
    dificultad: 'intermedio',
    icono: '📵',
    color: 'from-slate-600 to-gray-800',
    bgColor: 'bg-gradient-to-br from-slate-600 to-gray-800',
    shadowColor: 'shadow-slate-500/50',
    impactoVida: 91,
    prioridad: 4,
    contenido: {
      descripcionCompleta: `Promedio persona revisa teléfono 150+ veces/día, pasa 4-6 horas en pantallas. Cal Newport (Digital Minimalism) y Tristan Harris (ex-Google) exponen cómo tecnología está diseñada para adicción. No es falta de willpower - es neuroscience weaponizada contra ti. Este protocolo te libera del secuestro atencional mediante minimalismo digital: uso intencional de tech que sirve TUS valores, eliminación de todo lo demás. Recupera 20-30h/semana y tu mente.`,
      
      ciencia: {
        titulo: 'Psicología de la Adicción Digital',
        estudios: [
          'Journal of Behavioral Addictions: Smartphone addiction active mismos circuitos que cocaína',
          'Nature Communications: Cada notificación spike dopamina similar gambling',
          'PNAS: Social media uso correlaciona con soledad aumentada paradójicamente',
          'Cyberpsychology: Phantom vibration syndrome afecta 90% usuarios',
          'Computers in Human Behavior: Heavy social media uso reduce gray matter similar depresión',
          'Psychological Science: Mera presencia smartphone reduce capacidad cognitiva 20%',
          'JAMA Pediatrics: Adolescentes 3+h pantallas diarias tienen 35% más riesgo depresión',
          'Sleep Medicine: Blue light nocturna suprime melatonina y retrasa sueño 90 min'
        ],
        mecanismos: [
          'Variable Reward Schedule: Igual que slot machines - más adictivo que predecible',
          'Dopamine Loops: Anticipación recompensa > recompensa actual',
          'FOMO: Fear of missing out activa ansiedad social primitiva',
          'Attention Residue: Cambio apps deja "residuo" 23 min para re-focus',
          'Social Validation: Likes/comments activan sistema reward',
          'Infinite Scroll: Elimina stopping cues naturales',
          'Push Notifications: Interrupciones diseñadas para re-engagement',
          'Algoritmos: Optimizados para tiempo pantalla, no bienestar'
        ]
      },
      
      estadísticasAlarma: {
        tiempo: [
          'Promedio 4-6 horas diarias en smartphones',
          '150+ veces/día checking phone',
          '28% tiempo trabajo en distracciones',
          '2,617 veces/año promedio toca teléfono'
        ],
        impacto: [
          '23 minutos recuperar focus post-interrupción',
          '40% productividad perdida a multitasking',
          '50% incremento ansiedad usuarios heavy social',
          '71% personas duermen junto teléfono'
        ],
        costo: [
          '20-30 horas/semana potencialmente recuperables',
          '$1,000+ valor horas perdidas semanalmente',
          'Décadas de vida acumuladas mirando pantallas',
          'Relationships deterioradas por phubbing'
        ]
      },
      
      filosofiaMinimalismo: {
        principio: 'Technological minimalism: Adopt tech only if benefits substantially outweigh costs',
        noEs: [
          'Luddism - no es anti-tecnología',
          'Ascetismo - no es sufrimiento innecesario',
          'All-or-nothing - no necesitas eliminar todo',
          'Juicio otros - cada quien decide valores'
        ],
        'sí Es': [
          'Intencionalidad - tech sirve TUS objetivos',
          'Optimización - máximo beneficio, mínimo costo',
          'Valores-driven - decisiones basadas en lo que importa',
          'Satisficing - suficientemente bueno vs óptimo',
          'Agency - tú controlas tech, no tech controla a ti'
        ]
      },
      
      instrucciones: [
        { 
          paso: 1, 
          titulo: 'Digital Declutter - 30 Días Reset', 
          descripcion: 'Break intenso para resetear relación con tech', 
          duracion: '30 días', 
          icono: '🗑️',
          proceso: [
            {
              fase: 'Pre-Declutter (Semana antes)',
              acciones: [
                'Lista TODAS tech/apps usas',
                'Identifica cuáles son realmente necesarias vs hábito',
                'Define valores personales claramente',
                'Comunica a círculo cercano tu detox',
                'Prepara actividades alternativas'
              ]
            },
            {
              fase: 'Declutter Intensivo (30 días)',
              reglas: [
                'Elimina uso OPCIONAL de tech',
                'Mantén solo absolutamente necesario (trabajo, pagos, comunicación esencial)',
                'Delete apps social media de phone',
                'No news/youtube/streaming excepto pre-planeado',
                'Usa este espacio temporal para actividades high-quality',
                'Journal experiencia diariamente'
              ],
              esperaExperimentar: [
                'Semana 1: Ansiedad, FOMO, aburrimiento',
                'Semana 2: Curiosidad sobre vida sin distracción',
                'Semana 3: Actividades más satisfactorias emergen',
                'Semana 4: Claridad sobre qué tech realmente valoras'
              ]
            },
            {
              fase: 'Post-Declutter',
              acciones: [
                'Re-introduce tech SELECTIVAMENTE',
                'Solo si pasa test: ¿Sirve mis valores?',
                'Con Operating Procedures claros',
                'Observa cómo afecta bienestar'
              ]
            }
          ],
          crítico: 'No rompas abstinencia primeros 30 días. Reset completo necesario para perspectiva.'
        },
        { 
          paso: 2, 
          titulo: 'Define Tech Operating Procedures', 
          descripcion: 'Reglas específicas para cada tech que mantienes', 
          duracion: '2 horas planning', 
          icono: '⚙️',
          ejemplos: [
            {
              tech: 'Email',
              procedure: 'Check solo 10 AM y 3 PM. Máx 20 min cada. Desktop only, no phone. Inbox zero cada sesión. Respuestas <2 min inmediato, >2 min schedule.',
              porqué: 'Previene reactive mode, mantiene control'
            },
            {
              tech: 'Social Media',
              procedure: 'Web only (no apps phone). Domingos 2-3 PM, 30 min máximo. Post cuando tengas algo sustancial. No scrolling, solo intencional check.',
              porqué: 'Maximiza valor, elimina adicción'
            },
            {
              tech: 'Smartphone',
              procedure: 'Modo avión default. Checking windows: AM después routine, lunch, PM después work. No bedroom, no meals, no conversaciones.',
              porqué: 'Phone sirve a ti, no tú a phone'
            },
            {
              tech: 'News',
              procedure: 'Newsletter curado semanal. 20 min domingo AM. No real-time news, no doomscrolling.',
              porqué: 'Informado sin ansiedad constante'
            },
            {
              tech: 'Streaming',
              procedure: 'Solo con otra persona. Pre-selecciona qué ver. No autoplay. Max 2 episodios/noche. Apaga device después.',
              porqué: 'Entretenimiento intencional vs escape'
            },
            {
              tech: 'Messaging',
              procedure: 'Respond batches 3x día. No notificaciones. Async por defecto. Call si urgente REAL.',
              porqué: 'Comunicación efectiva sin interrupción constante'
            }
          ],
          template: 'Para cada tech: CUÁNDO, DÓNDE, CÓMO EXACTAMENTE, LÍMITES CLAROS'
        },
        { 
          paso: 3, 
          titulo: 'Phone Decluttering & Setup', 
          descripcion: 'Convierte smartphone en dumb phone potente', 
          duracion: '1 hora setup', 
          icono: '📱',
          checklist: [
            {
              categoría: 'Apps - Eliminación',
              acciones: [
                '❌ Delete: Social media, news, games, shopping',
                '❌ Delete: Cualquier app que checkeas compulsivamente',
                '❌ Delete: Apps que no usaste últimos 30 días',
                'Resultado: <30 apps idealmente'
              ]
            },
            {
              categoría: 'Apps - Organización',
              acciones: [
                '📁 Folder "Tools": Mapas, cámara, calculadora, notas',
                '📁 Folder "Communication": Solo apps necesarias trabajo',
                '🏠 Home screen: Vacío o 4-6 apps esenciales MAX',
                '👆 Acceso por búsqueda, no browsing'
              ]
            },
            {
              categoría: 'Notificaciones',
              acciones: [
                '🔕 Desactiva TODAS excepto calls/SMS personas importantes',
                '🔕 No email push',
                '🔕 No badge counts',
                '🔕 No sounds/vibrations excepto alarmas'
              ]
            },
            {
              categoría: 'Visual',
              acciones: [
                '⚫ Grayscale mode (Settings > Accessibility)',
                '🌗 Reduce white point',
                '📵 Screen time limits apps restantes',
                '🔒 Use Focus modes agresivamente'
              ]
            },
            {
              categoría: 'Acceso Físico',
              acciones: [
                '🚪 Phone charging station lejos de cama',
                '⏰ Alarm clock físico (no phone)',
                '👜 Bolsillo difícil acceso cuando sales',
                '🚗 Glove compartment en carro, no vista'
              ]
            }
          ]
        },
        { 
          paso: 4, 
          titulo: 'Replace Digital con High-Quality Leisure', 
          descripcion: 'Llena vacío con actividades satisfactorias', 
          duracion: 'Continuo', 
          icono: '🎨',
          principio: 'Naturaleza odia vacío. Si no reemplazas tech con mejor, volverás.',
          categorías: [
            {
              tipo: 'Craft & Making',
              ejemplos: ['Woodworking', 'Cocina gourmet', 'Jardinería', 'Art/drawing', 'Música instrumento'],
              beneficio: 'Embodied cognition, flow, tangible output'
            },
            {
              tipo: 'Physical Demanding',
              ejemplos: ['Rock climbing', 'Martial arts', 'Running trails', 'Cycling', 'Swimming'],
              beneficio: 'Embodiment total, presente forzado, health'
            },
            {
              tipo: 'Social Real',
              ejemplos: ['Board game nights', 'Book clubs', 'Dinner parties', 'Sport teams', 'Volunteering'],
              beneficio: 'Connection real vs virtual'
            },
            {
              tipo: 'Analog Learning',
              ejemplos: ['Reading books', 'Cursos presenciales', 'Mentorship', 'Language exchange', 'Instrumento musical'],
              beneficio: 'Deep learning vs shallow scrolling'
            },
            {
              tipo: 'Contemplation',
              ejemplos: ['Journaling', 'Meditation', 'Nature walks', 'Philosophy', 'Prayer'],
              beneficio: 'Self-knowledge, claridad, paz'
            }
          ],
          implementación: 'Identifica 2-3 actividades cada categoría. Commit 30 días trial serio.'
        },
        { 
          paso: 5, 
          titulo: 'Social Media Philosophy', 
          descripcion: 'Si decides mantener, usa extremadamente limitado', 
          duracion: 'Setup + ongoing', 
          icono: '🔗',
          preguntas: [
            '¿Por qué EXACTAMENTE uso cada plataforma?',
            '¿Puedo lograr mismo beneficio de otra forma?',
            '¿El valor supera SUSTANCIALMENTE los costos?',
            '¿Cómo sería mi vida sin esto?'
          ],
          estrategias: [
            {
              estrategia: 'Delete Apps, Browser Only',
              implementación: 'No apps en phone. Solo desktop browser scheduled times.',
              beneficio: 'Elimina impulsividad, añade fricción saludable'
            },
            {
              estrategia: 'Producer > Consumer',
              implementación: 'Post/create > consume/scroll. Ratio mínimo 1:1.',
              beneficio: 'Creador mindset vs pasivo consumer'
            },
            {
              estrategia: 'Unfollow Agresivamente',
              implementación: 'Solo cuentas que aportan valor real. <50 ideal.',
              beneficio: 'Feed intencional vs algorithmic manipulation'
            },
            {
              estrategia: 'Zero Tolerance Toxicity',
              implementación: 'First sign negatividad/comparison/FOMO = unfollow.',
              beneficio: 'Protege salud mental'
            },
            {
              estrategia: 'Time-boxed Strictly',
              implementación: 'Timer físico. 20 min max. Sale cuando suena.',
              beneficio: 'Previene black hole scrolling'
            }
          ],
          mejorOpción: 'Para mayoría: Eliminar completamente y usar alternativas targeted (WhatsApp grupos, email newsletters, phone calls)'
        },
        { 
          paso: 6, 
          titulo: 'Analog Alternatives Setup', 
          descripcion: 'Reemplaza funciones útiles de tech con analog', 
          duracion: 'Gradual', 
          icono: '📓',
          reemplazos: [
            {
              digital: 'Smartphone alarm',
              analog: 'Alarm clock físico + sunrise simulator',
              beneficio: 'No phone in bedroom = mejor sueño'
            },
            {
              digital: 'Calendar app constantemente',
              analog: 'Paper planner + weekly review',
              beneficio: 'Menos checking compulsivo, más mindful planning'
            },
            {
              digital: 'Notes app',
              analog: 'Moleskine o similar notebook',
              beneficio: 'Writing mejora memoria y procesamiento'
            },
            {
              digital: 'GPS everywhere',
              analog: 'Learn routes, paper maps ocasional',
              beneficio: 'Spatial awareness, discovery, adventure'
            },
            {
              digital: 'Digital camera',
              analog: 'Film camera o solo memory',
              beneficio: 'Presente vs capturing everything'
            },
            {
              digital: 'Music streaming constant',
              analog: 'Vinyl/CD collection, live music, silence',
              beneficio: 'Intentional listening vs background noise'
            },
            {
              digital: 'Ebook reader backlit',
              analog: 'Physical books',
              beneficio: 'No blue light, tactile experience, collection visible'
            }
          ]
        }
      ],
      
      beneficios: {
        inmediatos: [
          { texto: '20-30h/semana recuperadas', icono: '⏰', detalle: 'Tiempo para cosas que importan' },
          { texto: 'Ansiedad reducida 40%', icono: '😌', detalle: 'Sin FOMO y comparison constante' },
          { texto: 'Sueño profundo mejorado', icono: '😴', detalle: 'Blue light eliminado, menos activación' },
          { texto: 'Concentración 3x', icono: '🎯', detalle: 'Atención no fragmentada constantemente' },
          { texto: 'Presencia en relaciones', icono: '❤️', detalle: 'No phubbing, conexión real' }
        ],
        largoplazo: [
          { texto: 'Deep Work capacity restored', icono: '🧠', detalle: 'Attention muscle reconstruido' },
          { texto: 'Salud mental robusta', icono: '🌈', detalle: 'Depresión/ansiedad prevención' },
          { texto: 'Relationships florecientes', icono: '👥', detalle: 'Conexión real vs superficial' },
          { texto: 'Creatividad desbloqueada', icono: '💡', detalle: 'Boredom = birthplace ideas' },
          { texto: 'Autonomía recuperada', icono: '🦅', detalle: 'Tú decides vida, no algoritmos' },
          { texto: 'Skills profundas desarrolladas', icono: '🏆', detalle: 'Tiempo para maestría real' },
          { texto: 'Vida intencional', icono: '🎯', detalle: 'Agency sobre cada momento' },
          { texto: 'Legacy significativo', icono: '📚', detalle: 'Creación > consumo' }
        ]
      },
      
      redesSocialesEspecíficas: {
        instagram: {
          problemas: ['Comparison constante', 'Realidad distorsionada', 'Validation externa addiction'],
          alternativas: ['Photo albums físicos', 'Emails con fotos a seres queridos', 'Blog personal']
        },
        facebook: {
          problemas: ['News feed tóxico', 'Outrage engineering', 'Time sink masivo'],
          alternativas: ['Direct contact personas importantes', 'Event sites específicos', 'Email grupos']
        },
        twitter: {
          problemas: ['Outrage dopamine', 'Tribalism', 'Fake urgency'],
          alternativas: ['RSS feed curado', 'Newsletters calidad', 'Books/podcasts para insights']
        },
        tiktok: {
          problemas: ['Infinite scroll ultimate', 'Attention destruction', 'Passive consumption extremo'],
          alternativas: ['YouTube pre-selected videos', 'Learn skill activamente', 'Create vs consume']
        },
        linkedin: {
          problemas: ['Humble bragging', 'Performative professionalism', 'Comparison career'],
          alternativas: ['Real networking events', 'Mentors directos', 'Portfolio propio site']
        }
      },
      
      troubleshooting: {
        desafíos: [
          {
            problema: 'FOMO intenso primeras semanas',
            solución: [
              'Normal - parte de withdrawal',
              'Journal sentimientos',
              'Recuerda: No te pierdes nada importante',
              'Lo que importa llega a ti offline',
              'FOMO es ilusión creada por algoritmos'
            ]
          },
          {
            problema: 'Aburrimiento abrumador',
            solución: [
              'EXCELENTE señal - boredom es donde creativity nace',
              'Lean into it',
              'No llenes inmediatamente con distracción',
              'Lista actividades high-quality pre-preparada',
              'Give it time - brain re-wiring toma semanas'
            ]
          },
          {
            problema: 'Presión social usar plataformas',
            solución: [
              'Real friends respetarán boundaries',
              'Ofrece alternativas (calls, meet ups)',
              'Explica beneficios notando en ti',
              'Lead by example',
              'True connection > virtual presence'
            ]
          },
          {
            problema: 'Trabajo requiere uso',
            solución: [
              'Separa work/personal accounts strictly',
              'Time-box professional usage',
              'Browser only, scheduled times',
              'Communicate boundaries con team',
              'Propose alternative workflows'
            ]
          }
        ]
      },
      
      metricas: {
        track: [
          'Screen time diario (meta: <2h total)',
          'Pickups diarios (meta: <50)',
          'Hours recovered semanal (meta: 20+)',
          'Books read mensual (antes vs después)',
          'Anxiety self-rating (1-10 diario)',
          'Quality time relationships (horas/semana)',
          'Deep work hours (meta: 15+/semana)'
        ],
        apps: [
          'iOS Screen Time / Android Digital Wellbeing',
          'Moment - Tracking detallado',
          'Freedom - Blocker apps/sites',
          'Forest - Gamifica stay off phone'
        ]
      },
      
      recursosAdicionales: {
        libros: [
          'Digital Minimalism - Cal Newport (BIBLIA)',
          'Irresistible - Adam Alter',
          'The Shallows - Nicholas Carr',
          'Deep Work - Cal Newport',
          'How to Break Up With Your Phone - Catherine Price'
        ],
        documentales: [
          'The Social Dilemma - Expone manipulation',
          'Screened Out - Youth mental health impact'
        ],
        organizaciones: [
          'Center for Humane Technology - Tristan Harris',
          'Digital Detox - Retreats y recursos'
        ]
      },
      
      declaracionPhilosophical: `La tecnología es herramienta, no master. Smartphone es computadora más poderosa de la historia en tu bolsillo - pero diseñada por PhDs en persuasión para adicción. Tu atención es recurso más valioso. Life vivida para likes es vida sin vivir. FOMO es ilusión. Lo importante llega a ti sin scrolling. Boredom no es enemigo - es donde vive creatividad. Conexión real > followers. Presencia > documentación. Agency > algoritmos. Tu vida merece ser vivida, no livestreamed.`,
      
      challenge30Días: {
        nombre: '30-Day Digital Detox Challenge',
        reglas: [
          'Delete social media apps phone',
          'No news excepto newsletter domingo',
          'Email 2x día solo',
          'Phone modo avión default',
          'No screens 2h antes dormir',
          'Replace cada hora digital con actividad high-quality',
          'Journal diariamente experiencia'
        ],
        premio: 'Tu vida de regreso'
      },
      
      notas: 'Tu abuelo no tenía smartphone y vivió vida plena. Tienes permiso desconectar. Real urgencias llegan por phone call. Todo demás puede esperar. Tu atención determina tu vida. Si Big Tech controla atención, controla tu vida. Digital minimalism no es privación - es liberación. Tiempo es finito. Attention es finita. Life pasa en mundo real, no pantallas. Desconectar es acto revolucionario en 2025.',
      
      frecuenciaRecomendada: 'Detox inicial 30 días, luego minimalismo continuo',
      compromiso: '30 días reset, lifetime benefits',
      dificultadReal: 8,
      retornoInversion: 1000
    }
  }
];

// ============================================
// CATEGORÍAS
// ============================================
export const missionCategories = [
  { 
    id: 'salud-fundamental',  // ← Cambié 'sueño-longevidad' por consistencia
    nombre: 'Salud Fundamental', 
    descripcion: 'Los pilares básicos de salud física',
    icono: '😴', 
    color: 'from-indigo-500 to-purple-500' 
  },
  { 
    id: 'nutricion-energia',  // ← Cambié 'nutrición-energía' (sin tildes)
    nombre: 'Nutrición Óptima', 
    descripcion: 'Alimentación para máximo rendimiento',
    icono: '🥗', 
    color: 'from-green-500 to-emerald-500' 
  },
  { 
    id: 'salud-mental', 
    nombre: 'Salud Mental', 
    descripcion: 'Bienestar psicológico y emocional',
    icono: '🧠', 
    color: 'from-blue-500 to-cyan-500' 
  },
  { 
    id: 'fitness-longevidad', 
    nombre: 'Fitness & Longevidad', 
    descripcion: 'Ejercicio para vivir más y mejor',
    icono: '💪', 
    color: 'from-red-500 to-orange-500' 
  },
  { 
    id: 'consciencia-espiritual',  // ← Cambié 'meditación-mindfulness'
    nombre: 'Consciencia Espiritual', 
    descripcion: 'Desarrollo de consciencia y paz interior',
    icono: '🧘', 
    color: 'from-purple-500 to-pink-500' 
  },
  { 
    id: 'relaciones-sociales',  // ← Cambié 'social-conexión'
    nombre: 'Relaciones Sociales', 
    descripcion: 'Conexiones humanas profundas',
    icono: '🤝', 
    color: 'from-pink-500 to-rose-500' 
  },
  { 
    id: 'biohacking', 
    nombre: 'Biohacking', 
    descripcion: 'Optimización extrema del cuerpo',
    icono: '⚡', 
    color: 'from-yellow-500 to-orange-500' 
  },
  { 
    id: 'aprendizaje-crecimiento',  // ← Cambié 'desarrollo-personal'
    nombre: 'Desarrollo Personal', 
    descripcion: 'Crecimiento continuo y reflexión',
    icono: '📝', 
    color: 'from-amber-500 to-yellow-500' 
  },
  {
    id: 'productividad-mental',  // ← AÑADIDA - faltaba esta categoría
    nombre: 'Productividad Mental',
    descripcion: 'Optimización del rendimiento cognitivo',
    icono: '🎯',
    color: 'from-blue-600 to-indigo-700'
  }
];

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Calcula la racha de días consecutivos
 */
export const calculateStreak = (missionId, previousProgress) => {
  if (!previousProgress || !previousProgress.lastUpdated) return 1;
  
  const lastDate = new Date(previousProgress.lastUpdated);
  const today = new Date();
  
  lastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return (previousProgress.streak || 0) + 1;
  } else if (diffDays === 0) {
    return previousProgress.streak || 1;
  } else {
    return 1;
  }
};

/**
 * Guarda el progreso de una misión
 */
export const saveMissionProgress = (missionId, progressData) => {
  try {
    const allProgress = JSON.parse(localStorage.getItem('missionProgress') || '{}');
    
    allProgress[missionId] = {
      ...progressData,
      lastUpdated: new Date().toISOString(),
      streak: calculateStreak(missionId, allProgress[missionId])
    };
    
    localStorage.setItem('missionProgress', JSON.stringify(allProgress));
    sessionStorage.setItem('missionProgress_backup', JSON.stringify(allProgress));
    
    if (typeof window !== 'undefined' && window.syncWithBackend) {
      window.syncWithBackend(allProgress);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving mission progress:', error);
    return false;
  }
};

/**
 * Obtiene misiones recomendadas basadas en hora del día
 */
export const getRecommendedMissions = (userContext = {}, completedMissions = []) => {
  const hour = new Date().getHours();
  let priorityCategories = [];

  if (hour >= 5 && hour < 9) {
    priorityCategories = ['salud-fundamental', 'consciencia-espiritual', 'fitness-longevidad'];
  } else if (hour >= 9 && hour < 17) {
    priorityCategories = ['aprendizaje-crecimiento', 'nutricion-energia', 'salud-mental'];
  } else {
    priorityCategories = ['relaciones-sociales', 'consciencia-espiritual', 'aprendizaje-crecimiento'];
  }

  let recommended = transformativeMissions
    .filter(m => !completedMissions.includes(m.id))
    .filter(m => priorityCategories.includes(m.categoria))
    .sort((a, b) => a.prioridad - b.prioridad)
    .slice(0, 6);

  if (recommended.length < 6) {
    const additional = transformativeMissions
      .filter(m => !completedMissions.includes(m.id))
      .filter(m => !recommended.some(r => r.id === m.id))
      .sort((a, b) => b.impactoVida - a.impactoVida)
      .slice(0, 6 - recommended.length);
    
    recommended = [...recommended, ...additional];
  }

  return recommended.map(m => m.id);
};

/**
 * Obtiene todo el progreso guardado
 */
export const getAllMissionProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('missionProgress') || '{}');
  } catch (error) {
    console.error('Error loading mission progress:', error);
    return {};
  }
};

/**
 * Limpia el progreso (para debugging)
 */
export const clearMissionProgress = () => {
  try {
    localStorage.removeItem('missionProgress');
    sessionStorage.removeItem('missionProgress_backup');
    return true;
  } catch (error) {
    console.error('Error clearing mission progress:', error);
    return false;
  }
};

// Export por defecto
export default transformativeMissions;