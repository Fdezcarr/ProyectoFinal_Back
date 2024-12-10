// src/models/pedido.model.js
const pool = require('../config/db');

// Obtener todos los pedidos
function selectAllPedidos() {
    return pool.query('SELECT * FROM pedidos;');

}
// Obtener todos los estatus posibles de pedidos
async function selectAllPedidosEstatus() {
    try {

        const [rows] = await pool.query(
            "SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'pedidos' AND COLUMN_NAME = 'estado' AND TABLE_SCHEMA = 'logistica_almacen'"
        );

        const columnType = rows[0].COLUMN_TYPE;


        const enumOptions = columnType
            .replace("enum(", "")
            .replace(")", "")
            .split(",")
            .map(option => option.replace(/'/g, ""));

        return enumOptions;
    } catch (err) {
        console.error("Error fetching ENUM options:", err.message);
        throw err;
    }
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
    selectAllPedidosEstatus,
    insertPedido,
    selectPedidoById,
    updatePedidoById,
    deletePedidoById
};
