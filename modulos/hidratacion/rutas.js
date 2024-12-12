const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

// Rutas
router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar); 
router.put('/', eliminar);

async function todos(req, res) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function uno(req, res, next) {
    try {
        const item = await controlador.uno(req.params.id);
        respuesta.success(req, res, item, 200);
    } catch (err) {
        next(err);
    }
}

async function agregar(req, res, next) {
    try {
        const result = await controlador.agregar(req.body);
        const mensaje = req.body.id == 0 
            ? 'Registro guardado exitosamente' 
            : 'Registro actualizado exitosamente';
        respuesta.success(req, res, { mensaje, result }, 201);
    } catch (err) {
        next(err);
    }
}

async function eliminar(req, res, next) {
    try {
        const result = await controlador.eliminar(req.body);
        respuesta.success(req, res, { mensaje: 'Registro eliminado exitosamente', result }, 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
