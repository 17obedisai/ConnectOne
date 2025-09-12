const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Mission = require('../models/Mission');
const Progress = require('../models/Progress');

// Obtener misiones diarias disponibles
    router.get('/daily', auth, async (req, res) => {
    try {
        const misiones = await Mission.find({ 
        tipo: 'diaria', 
        activa: true 
        });
        
        // Verificar cuáles ya completó hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const progresoHoy = await Progress.findOne({
        userId: req.userId,
        fecha: { $gte: hoy }
        });
        
        const misionesConEstado = misiones.map(mision => ({
        ...mision.toObject(),
        completada: progresoHoy?.misionesCompletadas.some(
            m => m.misionId.toString() === mision._id.toString()
        ) || false
        }));
        
        res.json(misionesConEstado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo misiones' });
    }
    });

    // Completar misión
    router.post('/:misionId/complete', auth, async (req, res) => {
    try {
        const { tiempoTomado } = req.body;
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
        
        // Agregar misión completada
        progreso.misionesCompletadas.push({
        misionId,
        completadaEn: new Date(),
        tiempoTomado
        });
        
        progreso.experienciaGanada += mision.experiencia;
        progreso.minutosActivos += tiempoTomado;
        
        await progreso.save();
        
        // Actualizar experiencia del usuario
        const usuario = await User.findById(req.userId);
        usuario.experiencia += mision.experiencia;
        
        // Calcular nuevo nivel
        const nuevoNivel = Math.floor(usuario.experiencia / 1000) + 1;
        if (nuevoNivel > usuario.nivel) {
        usuario.nivel = nuevoNivel;
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
        
        res.json({
        mensaje: 'Misión completada',
        experienciaGanada: mision.experiencia,
        nuevoNivel: usuario.nivel,
        nuevaExperiencia: usuario.experiencia,
        racha: usuario.racha
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error completando misión' });
    }
    });

    module.exports = router;