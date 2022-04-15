const clases = {};
const pool = require("../database");

clases.getEstudiantes = (id_curso) => {
    const query = `SELECT u.id_usuario, u.nombre, u.apellido 
    FROM usuarios AS u JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario 
    WHERE u.roles_id = 2 AND uc.cursos_id = ?`;
    return pool.query(query, id_curso);
};



module.exports = clases;