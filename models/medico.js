const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        requered: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        requered: true
    },
})

MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject()
    return object;
})

module.exports = model("Medico", MedicoSchema)