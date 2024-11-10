// src/models/almacen.model.js
const pool = require('../config/db');

// Obtener todos los almacenes
function selectAllAlmacenes() {
    return pool.query('SELECT * FROM almacenes;');
}

// Insertar un nuevo almacén
function insertAlmacen(data) {
    const { nombre, localizacion } = data;
    return pool.query(
        'INSERT INTO almacenes (nombre, localizacion) VALUES (?, ?)',
        [nombre, localizacion]
    );
}

// Obtener un almacén por su ID
function selectAlmacenById(id) {
    return pool.query('SELECT * FROM almacenes WHERE id = ?', [id]);
}

// Actualizar un almacén por su ID
function updateAlmacenById(id, data) {
    const { nombre, localizacion } = data;
    return pool.query(
        'UPDATE almacenes SET nombre = ?, localizacion = ? WHERE id = ?',
        [nombre, localizacion, id]
    );
}

// Borrar un almacén por su ID
function deleteAlmacenById(id) {
    return pool.query('DELETE FROM almacenes WHERE id = ?', [id]);
}

module.exports = {
    selectAllAlmacenes,
    insertAlmacen,
    selectAlmacenById,
    updateAlmacenById,
    deleteAlmacenById
};
