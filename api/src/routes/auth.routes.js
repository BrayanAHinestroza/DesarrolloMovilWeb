const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth.controller");

router
  .route("/Login") //
  .post(AuthController.InicioSesionApp); //


router
  .route("/Registro") //
  .post(AuthController.RegistrarUsuario); //


module.exports = router;
