const { response } = require('express')

const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJwt } = require('../helpers/jwt')


const login = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const userExists = await Usuario.findOne({ email })
        if (!userExists) {
            return res.status(401).json({ ok: false, msg: 'invalid credentials' })
        }

        if (!bcrypt.compareSync(password, userExists.password)) {
            return res.status(401).json({ ok: false, msg: 'invalid credentials' })
        }

        const token = await generarJwt(userExists._id)
        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    login
}