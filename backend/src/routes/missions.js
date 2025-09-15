    const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const User = require('../models/User');
    const Mission = require('../models/Mission');
    const Progress = require('../models/Progress');

    // Obtener todas las misiones
    router.get('/', auth, async (req, res) => {
    try {
        const misiones = await Mission.find({ activa: true });
        res.json(misiones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones' });
    }
    });

    // Obtener misiones diarias recomendadas
    router.get('/daily', auth, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId);
        const questionnaire = await Questionnaire.findOne({ userId: req.userId });
        
        // Personalizar misiones basado en preferencias del usuario
        let query = { activa: true };
        if (questionnaire?.preferencias) {
        const categorias = Object.keys(questionnaire.preferencias)
            .filter(key => questionnaire.preferencias[key]);
        if (categorias.length > 0) {
            query.categoria = { $in: categorias };
        }
        }
        
        // Obtener 5 misiones variadas
        const misiones = await Mission.aggregate([
        { $match: query },
        { $sample: { size: 5 } }
        ]);
        
        // Verificar cuáles ya completó hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const progresoHoy = await Progress.findOne({
        userId: req.userId,
        fecha: { $gte: hoy }
        });
        
        const misionesConEstado = misiones.map(mision => ({
        ...mision,
        completada: progresoHoy?.misionesCompletadas.some(
            m => m.misionId.toString() === mision._id.toString()
        ) || false
        }));
        
        res.json(misionesConEstado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones diarias' });
    }
    });

    // Obtener detalle de una misión
    router.get('/:misionId', auth, async (req, res) => {
    try {
        const mision = await Mission.findById(req.params.misionId);
        if (!mision) {
        return res.status(404).json({ mensaje: 'Misión no encontrada' });
        }
        res.json(mision);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misión' });
    }
    });

    // Iniciar una misión (tracking)
    router.post('/:misionId/start', auth, async (req, res) => {
    try {
        // Registrar inicio de misión para analytics
        const startTime = new Date();
        
        // Guardar en sesión temporal o base de datos
        res.json({ 
        mensaje: 'Misión iniciada',
        iniciadaEn: startTime
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error iniciando misión' });
    }
    });

    // Completar misión con sistema mejorado
    router.post('/:misionId/complete', auth, async (req, res) => {
    try {
        const { tiempoTomado, respuestasReflexion, calificacion } = req.body;
        const { misionId } = req.params;
        
        // Obtener la misión
        const mision = await Mission.findById(misionId);
        if (!mision) {
        return res.status(404).json({ mensaje: 'Misión no encontrada' });
        }
        
        // Buscar o crear progreso de hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        let progreso = await Progress.findOne({
        userId: req.userId,
        fecha: { $gte: hoy }
        });
        
        if (!progreso) {
        progreso = new Progress({
            userId: req.userId,
            fecha: new Date()
        });
        }
        
        // Verificar si ya se completó
        const yaCompletada = progreso.misionesCompletadas.some(
        m => m.misionId.toString() === misionId
        );
        
        if (yaCompletada) {
        return res.status(400).json({ mensaje: 'Misión ya completada hoy' });
        }
        
        // Calcular bonificaciones
        let experienciaTotal = mision.experiencia;
        
        // Bonificación por completar rápido
        if (tiempoTomado <= mision.duracion * 0.8) {
        experienciaTotal *= 1.2; // 20% extra
        }
        
        // Bonificación por reflexión
        if (respuestasReflexion && respuestasReflexion.length > 0) {
        experienciaTotal *= 1.1; // 10% extra
        }
        
        // Agregar misión completada
        progreso.misionesCompletadas.push({
        misionId,
        completadaEn: new Date(),
        tiempoTomado,
        respuestasReflexion,
        calificacion
        });
        
        progreso.experienciaGanada += Math.round(experienciaTotal);
        progreso.minutosActivos += tiempoTomado;
        
        await progreso.save();
        
        // Actualizar usuario
        const usuario = await User.findById(req.userId);
        usuario.experiencia += Math.round(experienciaTotal);
        
        // Calcular nuevo nivel
        const nuevoNivel = Math.floor(usuario.experiencia / 1000) + 1;
        let subisteNivel = false;
        if (nuevoNivel > usuario.nivel) {
        usuario.nivel = nuevoNivel;
        subisteNivel = true;
        }
        
        // Actualizar racha
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        ayer.setHours(0, 0, 0, 0);
        
        const progresoAyer = await Progress.findOne({
        userId: req.userId,
        fecha: { $gte: ayer, $lt: hoy }
        });
        
        if (progresoAyer && progresoAyer.misionesCompletadas.length > 0) {
        usuario.racha += 1;
        } else {
        usuario.racha = 1;
        }
        
        await usuario.save();
        
        // Actualizar estadísticas de la misión
        mision.vecesCompletada += 1;
        if (calificacion) {
        const totalCalificaciones = mision.valoracionPromedio * (mision.vecesCompletada - 1);
        mision.valoracionPromedio = (totalCalificaciones + calificacion) / mision.vecesCompletada;
        }
        await mision.save();
        
        res.json({
        mensaje: 'Misión completada',
        experienciaGanada: Math.round(experienciaTotal),
        nuevoNivel: usuario.nivel,
        nuevaExperiencia: usuario.experiencia,
        racha: usuario.racha,
        subisteNivel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error completando misión' });
    }
    });

    // Obtener progreso del usuario
    router.get('/progress', auth, async (req, res) => {
    try {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const semanaAtras = new Date();
        semanaAtras.setDate(semanaAtras.getDate() - 7);
        
        // Progreso de hoy
        const progresoHoy = await Progress.findOne({
        userId: req.userId,
        fecha: { $gte: hoy }
        });
        
        // Progreso semanal
        const progresoSemana = await Progress.find({
        userId: req.userId,
        fecha: { $gte: semanaAtras }
        });
        
        const usuario = await User.findById(req.userId);
        
        const totalSemanal = progresoSemana.reduce((acc, p) => 
        acc + p.misionesCompletadas.length, 0
        );
        
        res.json({
        dailyCompleted: progresoHoy?.misionesCompletadas.length || 0,
        weeklyCompleted: totalSemanal,
        streak: usuario.racha || 0,
        nivel: usuario.nivel || 1,
        experiencia: usuario.experiencia || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo progreso' });
    }
    });

    module.exports = router;