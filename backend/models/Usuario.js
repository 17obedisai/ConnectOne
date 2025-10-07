const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
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
  edad: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);