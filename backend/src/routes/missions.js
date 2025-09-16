    const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Mission = require('../models/Mission');
    const Progress = require('../models/Progress');

        // Agregar ruta para iniciar misión
    router.post('/:misionId/start', auth, async (req, res) => {
    try {
        const { misionId } = req.params;
        
        res.json({ 
        mensaje: 'Misión iniciada',
        misionId,
        iniciadaEn: new Date()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error iniciando misión' });
    }
    });

    // Agregar ruta para completar misión
    router.post('/:misionId/complete', auth, async (req, res) => {
    try {
        const { misionId } = req.params;
        const { tiempoTomado } = req.body;
        
        // Por ahora devolver respuesta de ejemplo
        res.json({
        mensaje: 'Misión completada',
        experienciaGanada: 50,
        nuevoNivel: 1,
        nuevaExperiencia: 50,
        racha: 1,
        subisteNivel: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error completando misión' });
    }
    });

    // Obtener progreso del usuario (RUTA CORREGIDA)
    router.get('/progress', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId);
        
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        res.json({
        dailyCompleted: 0, // Por ahora valores por defecto
        weeklyCompleted: 0,
        streak: usuario.racha || 0,
        nivel: usuario.nivel || 1,
        experiencia: usuario.experiencia || 0
        });
    } catch (error) {
        console.error('Error en /progress:', error);
        res.status(500).json({ mensaje: 'Error obteniendo progreso' });
    }
    });

    // Obtener todas las misiones (con datos de ejemplo)
    router.get('/', auth, async (req, res) => {
    try {
        // Por ahora devolver misiones de ejemplo
        const misiones = getMockMissions();
        res.json(misiones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones' });
    }
    });

    // Función con misiones de ejemplo completas
    function getMockMissions() {
    return [
        {
        _id: '1',
        titulo: 'Meditación Matutina de Atención Plena',
        descripcion: 'Comienza tu día con claridad mental y calma interior',
        categoria: 'meditacion',
        duracion: 10,
        experiencia: 50,
        dificultad: 'principiante',
        contenido: {
            introduccion: 'La meditación matutina establece el tono para todo tu día. Solo 10 minutos pueden reducir el estrés en un 40% y mejorar tu enfoque durante las próximas 8 horas.',
            ciencia: 'Estudios de Harvard muestran que 8 semanas de meditación aumentan la materia gris en el hipocampo (memoria y aprendizaje) y reducen la amígdala (centro del miedo). La meditación matutina específicamente aumenta los niveles de cortisol de manera saludable, mejorando el estado de alerta.',
            instrucciones: [
            { paso: 1, descripcion: 'Encuentra un lugar tranquilo y siéntate cómodamente con la espalda recta', duracion: '1 minuto' },
            { paso: 2, descripcion: 'Cierra los ojos y toma 3 respiraciones profundas para centrarte', duracion: '1 minuto' },
            { paso: 3, descripcion: 'Enfócate en tu respiración natural, sin controlarla', duracion: '5 minutos' },
            { paso: 4, descripcion: 'Cuando tu mente divague, gentilmente regresa la atención a la respiración', duracion: '2 minutos' },
            { paso: 5, descripcion: 'Termina con gratitud por este momento de paz', duracion: '1 minuto' }
            ],
            tecnicaRespiracion: 'Respiración 4-7-8: Inhala por 4, mantén por 7, exhala por 8',
            beneficios: [
            'Reduce el estrés y ansiedad en un 40%',
            'Mejora la concentración durante todo el día',
            'Aumenta la creatividad y resolución de problemas',
            'Fortalece el sistema inmunológico',
            'Mejora la calidad del sueño'
            ],
            tips: [
            'Hazlo a la misma hora cada día para crear el hábito',
            'No juzgues los pensamientos, solo obsérvalos',
            'Empieza con 5 minutos si 10 te parece mucho',
            'Usa una app de meditación guiada si eres principiante'
            ],
            equipamientoNecesario: ['Un lugar tranquilo', 'Cojín o silla cómoda (opcional)', 'Timer o app de meditación'],
            preguntasReflexion: [
            '¿Cómo se siente tu mente después de meditar?',
            '¿Qué pensamientos surgieron con más frecuencia?',
            '¿Notaste alguna tensión en tu cuerpo?'
            ]
        }
        },
        {
        _id: '2',
        titulo: 'Rutina de Ejercicio Funcional',
        descripcion: 'Fortalece tu cuerpo con movimientos que mejoran tu vida diaria',
        categoria: 'ejercicio',
        duracion: 20,
        experiencia: 75,
        dificultad: 'principiante',
        contenido: {
            introduccion: 'El ejercicio funcional mejora tu capacidad para realizar actividades cotidianas. Esta rutina está diseñada para fortalecer todo tu cuerpo de manera equilibrada.',
            ciencia: 'El entrenamiento funcional activa múltiples grupos musculares simultáneamente, mejorando la coordinación neuromuscular. Aumenta el metabolismo basal en un 15% durante las siguientes 24 horas.',
            instrucciones: [
            { paso: 1, descripcion: 'Calentamiento dinámico con movimientos articulares', duracion: '3 minutos' },
            { paso: 2, descripcion: 'Circuito principal de ejercicios', duracion: '15 minutos' },
            { paso: 3, descripcion: 'Enfriamiento y estiramientos', duracion: '2 minutos' }
            ],
            ejercicios: [
            {
                nombre: 'Sentadillas con peso corporal',
                series: 3,
                repeticiones: '12-15',
                descanso: '30 segundos',
                tecnica: 'Pies al ancho de hombros, baja manteniendo la espalda recta, peso en los talones',
                erroresComunes: ['Rodillas hacia adentro', 'Inclinarse demasiado hacia adelante', 'No bajar lo suficiente']
            },
            {
                nombre: 'Flexiones (modificadas si es necesario)',
                series: 3,
                repeticiones: '10-12',
                descanso: '30 segundos',
                tecnica: 'Manos al ancho de hombros, cuerpo en línea recta, baja hasta que el pecho casi toque el suelo',
                erroresComunes: ['Caderas hundidas', 'Codos muy abiertos', 'Velocidad excesiva']
            },
            {
                nombre: 'Plancha',
                series: 3,
                repeticiones: '30-45 segundos',
                descanso: '30 segundos',
                tecnica: 'Cuerpo en línea recta, core activado, respiración constante',
                erroresComunes: ['Aguantar la respiración', 'Caderas muy altas o bajas']
            }
            ],
            variaciones: {
            casa: 'Usa botellas de agua como pesas ligeras',
            gym: 'Añade mancuernas o bandas de resistencia',
            principiante: 'Reduce repeticiones y aumenta descanso',
            avanzado: 'Añade saltos y reduce tiempo de descanso'
            },
            calentamiento: 'Círculos de brazos, rodillas al pecho, giros de cintura',
            enfriamiento: 'Estiramientos estáticos de 30 segundos por músculo',
            beneficios: [
            'Mejora la fuerza funcional para actividades diarias',
            'Aumenta el metabolismo y quema calorías',
            'Mejora la postura y reduce dolores de espalda',
            'Aumenta la energía y vitalidad',
            'Fortalece huesos y articulaciones'
            ],
            tips: [
            'La técnica es más importante que la velocidad',
            'Hidrátate antes, durante y después',
            'Escucha a tu cuerpo y descansa si es necesario',
            'Progresa gradualmente aumentando repeticiones'
            ],
            equipamientoNecesario: ['Colchoneta o toalla', 'Botella de agua', 'Espacio de 2x2 metros'],
            precauciones: [
            'Consulta con un médico si tienes lesiones previas',
            'Detente si sientes dolor agudo',
            'Mantén la respiración constante'
            ]
        }
        },
        {
        _id: '3',
        titulo: 'Journaling de Gratitud',
        descripcion: 'Cultiva una mentalidad positiva escribiendo tus bendiciones',
        categoria: 'gratitud',
        duracion: 10,
        experiencia: 35,
        dificultad: 'principiante',
        contenido: {
            introduccion: 'La gratitud es una de las prácticas más poderosas para el bienestar mental. Escribir sobre lo que agradeces rewirea literalmente tu cerebro para el optimismo.',
            ciencia: 'Practicar gratitud aumenta los niveles de dopamina y serotonina. Un estudio de UC Davis mostró que el journaling de gratitud mejora el sueño en un 25% y reduce los síntomas de depresión en un 30%.',
            instrucciones: [
            { paso: 1, descripcion: 'Encuentra un momento tranquilo y tu diario', duracion: '1 minuto' },
            { paso: 2, descripcion: 'Escribe 3 cosas específicas por las que estás agradecido hoy', duracion: '5 minutos' },
            { paso: 3, descripcion: 'Para una, describe por qué estás agradecido en detalle', duracion: '3 minutos' },
            { paso: 4, descripcion: 'Cierra con una intención positiva para mañana', duracion: '1 minuto' }
            ],
            beneficios: [
            'Mejora el estado de ánimo y optimismo',
            'Reduce síntomas de ansiedad y depresión',
            'Mejora la calidad del sueño',
            'Fortalece las relaciones personales',
            'Aumenta la resiliencia emocional'
            ],
            tips: [
            'Sé específico: "el café con María" en vez de "mis amigos"',
            'Incluye cosas pequeñas: un día soleado, una sonrisa',
            'Hazlo a la misma hora para crear el hábito',
            'Revisa entradas antiguas cuando te sientas mal'
            ],
            equipamientoNecesario: ['Diario o cuaderno', 'Bolígrafo', 'Lugar tranquilo'],
            preguntasReflexion: [
            '¿Qué patrón ves en tus gratitudes?',
            '¿Hay alguien a quien deberías agradecer directamente?',
            '¿Cómo ha cambiado tu perspectiva desde que empezaste?'
            ]
        }
        }
    ];
    }

    // Obtener misiones diarias
    router.get('/daily', auth, async (req, res) => {
    try {
        const misiones = getMockMissions();
        res.json(misiones.slice(0, 5)); // Devolver 5 misiones diarias
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones diarias' });
    }
    });

    module.exports = router;