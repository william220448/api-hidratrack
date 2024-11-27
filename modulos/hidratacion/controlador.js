const db = require('../../DB/mysql');

const TABLA = 'registros'
function todos (){
    return db.todos(TABLA);
}

module.exports = {
    todos,
}