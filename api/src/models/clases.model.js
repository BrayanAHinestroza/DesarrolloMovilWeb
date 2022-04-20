const clases = {};
const pool = require("../database");

clases.getEstudiantes = ({ id_curso, filtro_codigo }) => {
    const query = `SELECT u.codigo, u.id_usuario, u.nombre, u.apellido, u.firebase_token
    FROM usuarios AS u JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario 
    WHERE u.roles_id = 2 AND uc.cursos_id = ? ${filtro_codigo ? 'AND u.codigo = ' + filtro_codigo : ''}`;
    return pool.query(query, id_curso);
};

clases.getEstudiantesNovedades = ({ id_curso, filtro_codigo }) => {
    const query = `SELECT u.codigo, u.id_usuario, u.nombre, u.apellido, 
    n.id_novedad, n.tipo_novedad, n.observaciones, n.fecha_novedad, 
    (SELECT CONCAT(nombre, " ", apellido ) FROM usuarios WHERE id_usuario = n.profesores_id) 'profesor_registra',
    c.nombre 'nombre_curso', c.horarios, c.fecha_inicio, c.fecha_fin
    FROM usuarios AS u JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario 
    JOIN novedades AS n ON n.estudiantes_id = uc.usuarios_id 
    JOIN cursos AS c ON c.id_curso = uc.cursos_id
    WHERE u.roles_id = 2 AND uc.cursos_id = ? ${filtro_codigo ? 'AND u.codigo = ' + filtro_codigo : ''}`;
    return pool.query(query, id_curso);
};

clases.getProfesoresNovedades = ({ id_curso, filtro_codigo }) => {
    const query = `SELECT u.codigo, u.id_usuario, u.nombre, u.apellido, 
    n.id_novedad, n.tipo_novedad, n.observaciones, n.fecha_novedad, 
    (SELECT CONCAT(nombre, " ", apellido ) FROM usuarios WHERE id_usuario = n.profesores_id) 'profesor_registra',
    c.nombre 'nombre_curso', c.horarios, c.fecha_inicio, c.fecha_fin
    FROM usuarios AS u JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario 
    JOIN novedades AS n ON n.estudiantes_id = uc.usuarios_id 
    JOIN cursos AS c ON c.id_curso = uc.cursos_id
    WHERE u.roles_id = 2 AND uc.cursos_id = ? ${filtro_codigo ? 'AND u.codigo = ' + filtro_codigo : ''}`;
    return pool.query(query, id_curso);
};



module.exports = clases;