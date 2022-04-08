const mysql = require('mysql');
const config = require('./config');

const { promisify } = require('util')
const configurations = {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_DATABASE,
    multipleStatements: true,
    typeCast: function castField(field, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }
        return (useDefaultTypeCasting());
    }
}

const pool = mysql.createPool(configurations);
try {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            console.log('Error al conectarse a la Base de Datos');
        }

        if (connection) {
            connection.release();
            console.log('DB conectada');
        }
        return;
    })

    //Convierte cadena en Promesa
    pool.query = promisify(pool.query);
} catch (error) {
    console.error(error)
}

module.exports = pool;
