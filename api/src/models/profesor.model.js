const profesor = {};
const pool = require("../database");

profesor.getNovedadesClase = async (idUsuario) => {
    const query =
        `SELECT 
            c.nombre 'nombre_curso',
            u.username,
            u.nombre 'nombre_usuario',
            u.apellido,
            u.email,
            u.roles_id,
            nc.tipo_novedad,
            nc.fecha_novedad,
            nc.observaciones
        FROM
            novedades_cursos AS nc
        JOIN
            usuarios_cursos AS uc ON nc.usuarios_cursos_id = uc.id_usuario_curso
        JOIN
            usuarios AS u ON u.id_usuario = uc.usuarios_id
        JOIN
            cursos AS c ON c.id_curso = uc.cursos_id WHERE u.id_usuario = ? ORDER BY fecha_novedad DESC;`;

    return await pool.query(query, idUsuario);
};

profesor.createNovedadesClase = async (tipoNovedad, comentariosNovedad, claseNovedad, id_usuario) => {
    const pre_query = "(SELECT id_usuario_curso FROM usuarios_cursos WHERE usuarios_id = ? AND cursos_id = ?)";

    const resultado = await pool.query(pre_query, [id_usuario, claseNovedad]);

    if (resultado.length > 0) {
        const query =
            `INSERT INTO novedades_cursos
            (tipo_novedad,
            observaciones,
            usuarios_cursos_id)
        VALUES
        (?,?,${resultado[0].id_usuario_curso});`;

        return await pool.query(query, [tipoNovedad, comentariosNovedad,]);
    } else {
        return { message: "No se encuentro ningún curso asociado" };
    }
};

profesor.getClases = async (idUsuario) => {
    const query =
        `SELECT 
        c.nombre, c.id_curso
    FROM
        usuarios_cursos AS uc
            JOIN
        cursos AS c ON c.id_curso = uc.cursos_id WHERE uc.usuarios_id = ? ORDER BY c.fecha_inicio DESC;`;

    return await pool.query(query, idUsuario);
};

profesor.getClase = async (idUsuario, idCurso) => {
    const query =
        `SELECT 
        c.*, 
        COUNT(u.roles_id) 'nro_usuarios', 
        u.roles_id,
        (SELECT CONCAT(nombre, " ", apellido) FROM usuarios WHERE id_usuario = ?) 'nombre_profesor'
    FROM
        usuarios_cursos AS uc
            JOIN
        cursos AS c ON uc.cursos_id = c.id_curso
            JOIN
        usuarios AS u ON uc.usuarios_id = u.id_usuario
    WHERE
        uc.usuarios_profesor_id = ?
        AND
        u.roles_id = 2
        AND 
        uc.cursos_id = ?
    GROUP BY u.roles_id;`;

    return await pool.query(query, [idUsuario, idUsuario, idCurso]);
};

module.exports = profesor;
