const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJwt } = require('../helpers/jwt')


const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email google role');
  res.json({
    ok: true,
    usuarios
  })
}

const crearUsuario = async (req, res = response) => {
  let status = 400
  let response;
  const { email, password } = req.body


  const existingUser = await Usuario.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      ok: false,
      msg: "Usuario existente"
    })

  }
  const usuario = new Usuario(req.body)

  const salt = bcrypt.genSaltSync()
  usuario.password = bcrypt.hashSync(password, salt)
  try {
    await usuario.save()
    const token = await generarJwt(usuario._id)

    response = {
      ok: true,
      usuario,
      token
    }
  } catch (error) {
    status = 500
    response = {
      ok: false,
      msg: "Error inesperado" + error
    }
  }


  res.status(status).json(response)
}


const actualizarUsuario = async (req, res) => {
  // TODO: Validar token y comprobar si es el usuario correcto
  const uid = req.params.id
  try {
    const usuarioDB = await Usuario.findOne({ _id: uid });
    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "Usuario no existe" })
    }

    const { nombre, email } = req.body
    if (usuarioDB.email !== email) {
      // actualizar email si son diferentes
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(404).json({ ok: false, msg: "Usuario con ese email ya existe" })
      }
    }

    usuarioDB.email = email
    usuarioDB.nombre = nombre

    await usuarioDB.save()
    return res.json({ ok: true, usuario: usuarioDB })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error inesperado" })

  }
}

const eliminarUsuario = async (req, res) => {
  const uid = req.params.id

  try {
    const response = await Usuario.deleteOne({ _id: uid })
    if (!response.deletedCount > 0) {
      return res.status(404).json({ ok: false, msg: "Usuario con este id no existe" })
    }

    return res.json({ ok: true, msg: "Usuario eliminado" })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error inesperado" })

  }


}


module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
}