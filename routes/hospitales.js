const { Router } = require('express')
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')
const router = Router();
const { validarJwt } = require('../middlewares/validar-jwt')


router.get('/', getHospitales)

router.post('/', [
    validarJwt,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearHospital)

router.put('/:id', actualizarHospital)


router.delete('/:id', borrarHospital)


module.exports = router