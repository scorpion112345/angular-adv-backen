const { response } = require("express");

const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userExists = await Usuario.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ ok: false, msg: "invalid credentials" });
    }

    if (!bcrypt.compareSync(password, userExists.password)) {
      return res.status(401).json({ ok: false, msg: "invalid credentials" });
    }

    const token = await generarJwt(userExists._id);
    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const googleSignIn = async (req, res) => {
  const { token } = req.body;
  try {
    const { name, email, picture } = await googleVerify(token);

    const usuarioDb = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDb) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      // existe usuario
      usuario = usuarioDb;
      usuario.google = true;
      usuario.password = "@@@";
    }

    await usuario.save();
    const tokenJwt = await generarJwt(usuario._id);

    res.json({
      ok: true,
      token: tokenJwt,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      ok: false,
      msg: "Wrong credentials",
    });
  }
};

const renewToken = async (req, res) => {
  const { id } = req.user;
  const token = await generarJwt(id);

  const usuario = await Usuario.findById(id);
  res.json({
    ok: true,
    token,
    usuario,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
