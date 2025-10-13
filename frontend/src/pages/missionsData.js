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
  }
];

// Función para guardar progreso en localStorage con persistencia mejorada
export const saveMissionProgress = (missionId, progress) => {
  const currentProgress = JSON.parse(localStorage.getItem('missionProgress') || '{}');
  currentProgress[missionId] = {
    ...progress,
    lastUpdated: new Date().toISOString(),
    streak: calculateStreak(missionId, currentProgress[missionId])
  };
  localStorage.setItem('missionProgress', JSON.stringify(currentProgress));
  
  // Backup en sessionStorage también
  sessionStorage.setItem('missionProgress_backup', JSON.stringify(currentProgress));
  
  // Si hay backend disponible, sincronizar
  if (window.syncWithBackend) {
    window.syncWithBackend(currentProgress);
  }
};

// Función para calcular rachas
export const calculateStreak = (missionId, previousProgress) => {
  if (!previousProgress) return 1;
  
  const lastDate = new Date(previousProgress.lastUpdated);
  const today = new Date();
  const diffTime = Math.abs(today - lastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return (previousProgress.streak || 0) + 1;
  } else if (diffDays === 0) {
    return previousProgress.streak || 1;
  } else {
    return 1; // Reset streak if more than 1 day passed
  }
};

// Función para obtener misiones recomendadas basadas en el usuario
export const getRecommendedMissions = (userProfile, completedMissions) => {
  // Lógica de recomendación basada en:
  // - Misiones completadas previamente
  // - Hora del día
  // - Día de la semana
  // - Objetivos del usuario
  // - Nivel de experiencia
  
  const hour = new Date().getHours();
  const recommendations = [];
  
  // Recomendaciones por hora del día
  if (hour >= 5 && hour < 9) {
    recommendations.push('tm1', 'tm2', 'tm3'); // Mañana: sueño, deep work, terapia
  } else if (hour >= 9 && hour < 12) {
    recommendations.push('tm2', 'tm4'); // Media mañana: deep work, ejercicio
  } else if (hour >= 12 && hour < 14) {
    recommendations.push('tm4'); // Mediodía: ejercicio
  } else if (hour >= 14 && hour < 18) {
    recommendations.push('tm2', 'tm3'); // Tarde: deep work, terapia
  } else if (hour >= 18 && hour < 22) {
    recommendations.push('tm5', 'tm1'); // Noche: meditación, protocolo sueño
  }
  
  return [...new Set(recommendations)]; // Eliminar duplicados
};

// Export categorías mejoradas
export const missionCategories = [
  { 
    id: 'salud-fundamental', 
    nombre: 'Salud Fundamental', 
    descripcion: 'Los pilares básicos de salud física y mental',
    icono: '🏥',
    color: 'from-green-600 to-emerald-700'
  },
  { 
    id: 'productividad-mental', 
    nombre: 'Productividad Mental', 
    descripcion: 'Maximiza tu capacidad cognitiva y output',
    icono: '🧠',
    color: 'from-blue-600 to-indigo-700'
  },
  { 
    id: 'salud-mental', 
    nombre: 'Salud Mental', 
    descripcion: 'Bienestar psicológico y emocional',
    icono: '💚',
    color: 'from-purple-600 to-pink-700'
  },
  { 
    id: 'fitness-longevidad', 
    nombre: 'Fitness & Longevidad', 
    descripcion: 'Ejercicio para vivir más y mejor',
    icono: '💪',
    color: 'from-red-600 to-orange-700'
  },
  { 
    id: 'consciencia-espiritual', 
    nombre: 'Consciencia Espiritual', 
    descripcion: 'Desarrollo de consciencia y paz interior',
    icono: '🧘',
    color: 'from-teal-600 to-cyan-700'
  },
  { 
    id: 'relaciones-sociales', 
    nombre: 'Relaciones Sociales', 
    descripcion: 'Conexiones humanas profundas y significativas',
    icono: '🤝',
    color: 'from-pink-600 to-rose-700'
  },
  { 
    id: 'aprendizaje-crecimiento', 
    nombre: 'Aprendizaje & Crecimiento', 
    descripcion: 'Desarrollo personal y profesional continuo',
    icono: '📚',
    color: 'from-amber-600 to-yellow-700'
  },
  { 
    id: 'proposito-significado', 
    nombre: 'Propósito & Significado', 
    descripcion: 'Encuentra y vive tu misión de vida',
    icono: '🎯',
    color: 'from-indigo-600 to-purple-700'
  }
];

export default transformativeMissions;