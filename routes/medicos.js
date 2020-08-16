const { Router } = require('express')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/Medicos')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')

const router = Router();
const { validarJwt } = require('../middlewares/validar-jwt')


router.get('/', getMedicos)

router.post('/', [
    validarJwt,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('hospital', "El hospital es obligatorio").not().isEmpty().isMongoId(),

    validarCampos
], crearMedico)

router.put('/:id', actualizarMedico)


router.delete('/:id', borrarMedico)


module.exports = router