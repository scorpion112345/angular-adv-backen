const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJwt = async (req, res, next) => {

    // Leer el token
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        const userExists = await Usuario.findOne({ _id: uid })
        if (!userExists) {
            return res.status(401).json({
                ok: false,
                msg: "Token invalido"
            })
        }
        req.user = userExists
        return next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
}

module.exports = {
    validarJwt
}