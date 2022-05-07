const jwt = require("jsonwebtoken");
const ProfesorModels = require("../models/profesor.model");
const ClasesModels = require("../models/clases.model");
const config = require("../config")
const admin = require("../firebase")

const profesor = {};

profesor.getNovedadesClase = async (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.getNovedadesClase(id_usuario);

        return res
            .status(200)
            .send(JSON.stringify(resultado));
    });
};

profesor.createNovedadesClase = async (req, res) => {
    const { tipoNovedad, comentariosNovedad, claseNovedad, token } = req.body;

    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.createNovedadesClase(tipoNovedad, comentariosNovedad, claseNovedad, id_usuario);

        if (resultado.affectedRows > 0) {
            notificarUsuarios(tipoNovedad, claseNovedad, res);
        } else {
            return res.status(400).send(JSON.stringify(resultado));
        }
    });
};

profesor.getNovedadesEstudiante = async (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.getNovedadesEstudiante(id_usuario);

        return res
            .status(200)
            .send(JSON.stringify(resultado));
    });
};

profesor.createNovedadesEstudiante = async (req, res) => {
    const { tipoNovedad, comentariosNovedad, id_estudiante, token } = req.body;

    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.createNovedadesEstudiante(tipoNovedad, comentariosNovedad, id_estudiante, id_usuario);

        if (resultado.affectedRows > 0) {
            return res.status(201).send();
        } else {
            return res.status(400).send(JSON.stringify(resultado));
        }
    });
};

profesor.getClases = async (req, res) => {
    const { token } = req.body;

    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.getClases(id_usuario);

        return res
            .status(200)
            .send(JSON.stringify(resultado));
    });
};

profesor.getClase = async (req, res) => {
    const { id_curso, token } = req.body;

    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario } = response;
        const resultado = await ProfesorModels.getClase(id_usuario, id_curso);

        if (resultado.length > 0) {
            return res
                .status(200)
                .send(JSON.stringify(resultado[0]));

        } else {
            res
                .status(200)
                .send({ message: "No se encontro la clase", code: 1 });
        }
    });
};


async function notificarUsuarios(tipoNovedad, id_curso, res) {
    try {
        const resultado = await ClasesModels.getEstudiantes({ id_curso });

        if (resultado.length > 0) {
            //Array of Tokens
            const registrationTokens = [];
            resultado.forEach(estudiante => {
                if (estudiante.firebase_token) {
                    registrationTokens.push(estudiante.firebase_token);
                }
            });

            const message = {
                notification: {
                    title: 'Notificacion Nueva',
                    body: tipoNovedad
                },
                tokens: registrationTokens
            };

            admin.messaging().sendMulticast(message)
                .then(response => {
                    console.log("Exito: ", response);
                }).catch(error => {
                    console.log("Error: ", error);
                })

            res.status(201).send()
        }
    } catch (error) {
        console.log({ message: "Error desconocido", error });
    }
}

module.exports = profesor;