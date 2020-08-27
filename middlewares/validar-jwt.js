const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJwt = async (req, res, next) => {
  // Leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await Usuario.findOne({ _id: uid });

    if (!userExists) {
      return res.status(401).json({
        ok: false,
        msg: "Token invalido",
      });
    }
    req.user = userExists;
    return next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }
};

const validarAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === "ADMIN_ROLE") {
    return next();
  }

  return res.status(403).json({
    ok: false,
    msg: "No tiene privilegios para realizar esta accion",
  });
};

const validarAdminRole_o_MismoUsuario = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  if (user.role === "ADMIN_ROLE" || user._id.toString() === id) {
    return next();
  }
  return res.status(403).json({
    ok: false,
    msg: "No tiene privilegios para realizar esta accion",
  });
};

module.exports = {
  validarJwt,
  validarAdminRole,
  validarAdminRole_o_MismoUsuario,
};
