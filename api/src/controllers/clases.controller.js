const jwt = require("jsonwebtoken");
const ClasesModels = require("../models/clases.model");
const config = require("../config")

const clases = {};

clases.getEstudiantes = async (req, res) => {
    const { id_curso } = req.body;

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

module.exports = clases;