const db = require('../../DB/mysql');

const TABLA = 'registros';

function todos() {
    return db.todos(TABLA);
}

function uno(id) {
    return db.uno(TABLA, id);
}

function agregar(body) {
    return db.agregar(TABLA, body); // Llama al método agregar en mysql.js
}

function eliminar(body) {
    return db.eliminar(TABLA, body); // Llama al método eliminar en mysql.js
}

module.exports = {
    todos,
    uno,
    agregar, // Asegúrate de exportar este método
    eliminar,
};
