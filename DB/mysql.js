const mysql = require('mysql');
const index = require('../index');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200)
        }else{
            console.log('Base de datos conectada')
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if(err.code ==='PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tabla}`;
        conexion.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

function uno(){
    
}
function agregar(){
    
}
function eliminar(){
    
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}