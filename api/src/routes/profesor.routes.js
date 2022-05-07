const { Router } = require("express");
const router = Router();

const ProfesorController = require("../controllers/profesor.controller");

router
    .route("/novedades_clase")
    .post(ProfesorController.getNovedadesClase);

router
    .route("/novedades_clase/add")
    .post(ProfesorController.createNovedadesClase);

router
    .route("/novedades_estudiante")
    .post(ProfesorController.getNovedadesEstudiante);

router
    .route("/novedades_estudiante/add")
    .post(ProfesorController.createNovedadesEstudiante);

router
    .route("/clases")
    .post(ProfesorController.getClases);

router
    .route("/clase")
    .post(ProfesorController.getClase);



module.exports = router;