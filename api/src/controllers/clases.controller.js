const jwt = require("jsonwebtoken");
const ClasesModels = require("../models/clases.model");
const config = require("../config")

const clases = {};

clases.getEstudiante = async (req, res) => {
    const { token, data } = req.body

    jwt.verify(token, config.SECRET, async function (err, response) {
        if (err) {
            console.log(err)
            return res.status(500)
                .send({ message: "Error inesperado", code: err });
        }

        const { id_usuario: id_profesor } = response;
        const { id_usuario: id_estudiante } = JSON.parse(data);
        const resultado = await ClasesModels.getEstudiante(id_estudiante, id_profesor);

        if (resultado.length > 0) {
            return res
                .status(200)
                .send(JSON.stringify(resultado[0]));

        } else {
            res
                .status(200)
                .send({ message: "No se encontró la clase", code: 1 });
        }
    });



    // console.log(id_usuario)
    // console.log(req.body)
    // try {
    //     const resultado = await ClasesModels.getEstudiante(req.body);

    //     if (resultado.length > 0) {
    //         return res
    //             .status(200)
    //             .send(JSON.stringify(resultado));

    //     } else {
    //         res
    //             .status(200)
    //             .send({ message: "No se encontraron estudiantes", code: 1 });
    //     }
    // } catch (error) {
    //     res.status(500).send({ message: "Error desconocido", error });
    // }
};

clases.getEstudiantes = async (req, res) => {
    try {
        const resultado = await ClasesModels.getEstudiantes(req.body);

        if (resultado.length > 0) {
            return res
                .status(200)
                .send(JSON.stringify(resultado));

        } else {
            res
                .status(200)
                .send({ message: "No se encontraron estudiantes", code: 1 });
        }
    } catch (error) {
        res.status(500).send({ message: "Error desconocido", error });
    }
};

clases.getEstudiantesNovedades = async (req, res) => {
    try {
        const resultado = await ClasesModels.getEstudiantesNovedades(req.body);

        if (resultado.length > 0) {
            return res
                .status(200)
                .send(JSON.stringify(resultado));

        } else {
            res
                .status(200)
                .send({ message: "No se encontraron estudiantes con novedades", code: 1 });
        }
    } catch (error) {
        res.status(500).send({ message: "Error desconocido", error });
    }
};

module.exports = clases;