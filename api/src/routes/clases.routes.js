const { Router } = require("express");
const router = Router();

const ClasesController = require("../controllers/clases.controller");

router
    .route("/estudiante")
    .post(ClasesController.getEstudiante);


router
    .route("/estudiantes")
    .post(ClasesController.getEstudiantes);

router
    .route("/estudiantes_novedades")
    .post(ClasesController.getEstudiantesNovedades);

router
    .route("/eventos")
    .post(ClasesController.getEventos);

router
    .route("/eventos/asistentes")
    .post(ClasesController.getAsistentesEventos);

module.exports = router;