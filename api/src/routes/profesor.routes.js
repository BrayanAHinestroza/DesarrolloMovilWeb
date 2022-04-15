const { Router } = require("express");
const router = Router();

const ProfesorController = require("../controllers/profesor.controller");

router
    .route("/novedades_clase")
    .post(ProfesorController.getNovedadesClase);

router
    .route("/clases")
    .post(ProfesorController.getClases);

router
    .route("/clase")
    .post(ProfesorController.getClase);



module.exports = router;