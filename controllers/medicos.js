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
    const id = req.params.id
    const usuarioId = req.user.id
    try {
        const medico = await Medico.findById(id)
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: "no medico encontrado"
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: usuarioId
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al crear el medico"
        })
    }
}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id
    try {
        const medico = await Medico.findById(id)
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: "no medico encontrado"
            })
        }

        await Medico.findByIdAndDelete(id)

        res.json({
            ok: true
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: "Error al eliminar medico"
        })
    }



}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}