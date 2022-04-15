const { Router } = require("express");
const router = Router();

const ClasesController = require("../controllers/clases.controller");

router
    .route("/estudiantes") //
    .post(ClasesController.getEstudiantes); //


module.exports = router;