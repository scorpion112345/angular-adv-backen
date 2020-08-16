
const path = require('path')
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen');
/* var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads')); */

const fileUpload = async (req, res) => {
    const { tipo, id } = req.params

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({ ok: false, msg: "Tipo invalido" })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ ok: false, msg: "No hay ningun archivo" })
    }

    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({ ok: false, msg: "Extension invalida" })
    }

    // generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`
    file.mv(path, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                ok: false,
                msg: "error al cargar la imagen"
            });
        }
        // actualizar base de datos
        const result = await actualizarImagen(tipo, id, nombreArchivo);
        if (result) {
            return res.json({
                ok: true,
                msg: "archivo subido",
                nombreArchivo
            })
        }
        return res.status(400).send({
            ok: false,
            msg: "error al cargar la imagen"
        });
    });


}


const retornaImagen = (req, res) => {
    const { foto, tipo } = req.params
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)

    if (!fs.existsSync(pathImg)) {
        // imagen por defecto
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`)

    }
    res.sendFile(pathImg)

}
module.exports = {
    fileUpload,
    retornaImagen
}