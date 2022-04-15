const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model");
const config = require("../config")

const autenticacion = {};
const AuthModels = require("../models/auth.model");

autenticacion.InicioSesionApp = async (req, res) => {
  const resultado = await AuthModels.InicioSesionApp(req, res);
  // console.log(await bcrypt.hash(req.body.password, 10))

  if (resultado.length > 0) {
    //Encontro un usuario
    const { id_usuario, password, roles_id } = resultado[0];
    const hash = password.toString();
    bcrypt.compare(req.body.password, hash).then((result) => {
      console.log(result);
      if (!result) {
        res
          .status(200)
          .send({ message: "La contraseña es incorrecta", code: 2 });
      } else {
        const token = jwt.sign({ id_usuario, roles_id }, config.SECRET);
        res.status(200).send({ roles_id, token, code: 1 });
      }
    });
    //Si no encuentra el usuario
  } else {
    res
      .status(200)
      .send({ message: "El usuario no se encuentra registrado", code: 3 });
  }
};

autenticacion.RegistrarUsuario = async (req, res) => {
  const { contrasena, cedula, ...Datos } = req.body;
  let nroUsuarios = await Auth.BuscarUsuario(cedula);
  nroUsuarios = nroUsuarios[0].Users;
  if (nroUsuarios > 0) {
    res.status(409).send({ message: "El usuario ya se encuentra registrado" });
  } else {
    const hash = await bcrypt.hash(contrasena, 10);
    try {
      const resultado = await AuthModels.RegistrarUsuario({
        ...Datos,
        contrasena: hash,
        cedula,
      });
      if (resultado.affectedRows > 0) {
        res.status(200).send();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = autenticacion;
