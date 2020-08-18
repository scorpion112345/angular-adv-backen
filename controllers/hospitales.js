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
    const id = req.params.id
    const usuarioId = req.user.id
    try {
        const hospital = await Hospital.findById(id)
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: "no hospital encontrado"
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: usuarioId
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: "Error al crear el hospital"
        })
    }

}

const borrarHospital = async (req, res = response) => {
    const id = req.params.id
    try {
        const hospital = await Hospital.findById(id)
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: "no hospital encontrado"
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok: true
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: "Error al crear el hospital"
        })
    }


}
module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}