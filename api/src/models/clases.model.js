const clases = {};
const pool = require("../database");

clases.getEstudiante = (id_estudiante, id_profesor) => {

    const query = `SELECT
    u.id_usuario, u.codigo, u.username, u.nombre, u.apellido, u.tipo_documento, u.numero_documento, u.email, f.nombre 'facultad', p.nombre 'programa' 
    FROM usuarios AS u JOIN facultades AS f ON u.facultades_id = f.id_facultad 
    JOIN programas AS p ON u.programas_id = p.id_programa
    JOIN usuarios_cursos AS uc ON uc.usuarios_id = u.id_usuario
    WHERE u.roles_id = 2 AND u.id_usuario = ? AND uc.usuarios_profesor_id = ?;`;
    return pool.query(query, [id_estudiante, id_profesor]);
};

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
    WHERE n.registrada_por='Profesor' AND u.roles_id = 2 AND uc.cursos_id = ? ${filtro_codigo ? 'AND u.codigo = ' + filtro_codigo : ''}`;
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