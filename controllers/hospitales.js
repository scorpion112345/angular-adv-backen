const { response } = require('express')
const Hospital = require('../models/hospital')



const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find({}, 'nombre img usuario').populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })


}

const crearHospital = async (req, res = response) => {
    const data = {
        nombre: req.body.nombre
    }
    const hospital = new Hospital(data)
    hospital.usuario = req.user.id

    try {
        await hospital.save()
        return res.json({
            ok: true,
            hospital
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

const actualizarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        usuarios: "asda"
    })
}

const borrarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        usuarios: "asda"
    })


}
module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}