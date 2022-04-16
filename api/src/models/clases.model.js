const clases = {};
const pool = require("../database");

clases.getEstudiantes = ({ id_curso, filtro_codigo }) => {
    const query = `SELECT u.codigo, u.id_usuario, u.nombre, u.apellido 
    FROM usuarios AS u JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario 
    WHERE u.roles_id = 2 AND uc.cursos_id = ? ${filtro_codigo ? 'AND u.codigo = ' + filtro_codigo : ''}`;
    return pool.query(query, id_curso);
};



module.exports = clases;