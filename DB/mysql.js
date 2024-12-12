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

//Para mostrar por id 
function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tabla} WHERE id=${id}`;
        conexion.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

function agregar(tabla, data) {
    if (data && data.id == 0) {
        // Si el ID es 0 inserto
        return insertar(tabla, data); 
    } else {
        return actualizar(tabla, data);
    }
}

// Insertar
function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tabla} SET ?`;
        conexion.query(query, data, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

// Actualizar
function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET ? WHERE id = ?`;
        conexion.query(query, [data, data.id], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

//Eliminar
function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id= ?`;
        conexion.query(query, data.id, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}