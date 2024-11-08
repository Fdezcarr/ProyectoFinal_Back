// src/models/pedido.model.js
const pool = require('../config/db');

// Obtener todos los pedidos
function selectAllPedidos() {
    return pool.query('SELECT * FROM pedidos;');
}

// Insertar un nuevo pedido
function insertPedido(data) {
    const { fecha_salida, origen, destino, matricula_camion, estado } = data;
    return pool.query(
        'INSERT INTO pedidos (fecha_salida, origen, destino, matricula_camion, estado) VALUES (?, ?, ?, ?, ?)',
        [fecha_salida, origen, destino, matricula_camion, estado]
    );
}

// Obtener un pedido por su ID
function selectPedidoById(id) {
    return pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
}

// Actualizar un pedido por su ID
function updatePedidoById(id, data) {
    const { fecha_salida, origen, destino, matricula_camion, estado } = data;
    return pool.query(
        'UPDATE pedidos SET fecha_salida = ?, origen = ?, destino = ?, matricula_camion = ?, estado = ? WHERE id = ?',
        [fecha_salida, origen, destino, matricula_camion, estado, id]
    );
}

// Borrar un pedido por su ID
function deletePedidoById(id) {
    return pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
}

module.exports = {
    selectAllPedidos,
    insertPedido,
    selectPedidoById,
    updatePedidoById,
    deletePedidoById
};
