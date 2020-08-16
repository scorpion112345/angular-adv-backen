const { response } = require('express')
const Medico = require('../models/Medico')



const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find({})
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async (req, res = response) => {

    const data = {
        nombre: req.body.nombre,
        hospital: req.body.hospital
    }
    const medico = new Medico(data)
    medico.usuario = req.user.id


    try {
        await medico.save()
        return res.json({
            ok: true,
            medico
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

const actualizarMedico = async (req, res = response) => {
    res.json({
        ok: true,
        usuarios: "asda"
    })
}

const borrarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        usuarios: "asda"
    })


}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}