const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        default: 1
    },
    experiencia: {
        type: Number,
        default: 0
    },
    racha: {
        type: Number,
        default: 0
    },
    // Respuestas del cuestionario inicial
    perfilInicial: {
        objetivos: [String],
        intereses: [String],
        nivelActividad: String,
        tiempoDisponible: String
    },
    // Inventario del usuario
    inventario: {
        sombreros: [String],
        gafas: [String],
        collares: [String]
    },
    // Misiones activas
    misionesActivas: [{
        tipo: String,
        descripcion: String,
        progreso: Number,
        objetivo: Number,
        recompensa: Object,
        completada: Boolean
    }],
    // Logros desbloqueados
    logros: [{
        id: String,
        nombre: String,
        descripcion: String,
        fechaObtenido: Date
    }],
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
    });

    // Encriptar contraseña antes de guardar
    userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
    });

    // Método para verificar contraseña
    userSchema.methods.verificarPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
    };

module.exports = mongoose.model('User', userSchema);