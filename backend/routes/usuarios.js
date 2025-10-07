const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message 
    });
  }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const nuevoUsuario = await usuario.save();
    
    res.status(201).json({
      success: true,
      mensaje: 'Usuario creado exitosamente',
      data: nuevoUsuario
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al crear usuario',
      error: error.message 
    });
  }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener usuario',
      error: error.message 
    });
  }
});

// PUT - Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Usuario actualizado',
      data: usuario
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al actualizar usuario',
      error: error.message 
    });
  }
});

// DELETE - Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al eliminar usuario',
      error: error.message 
    });
  }
});

module.exports = router;
