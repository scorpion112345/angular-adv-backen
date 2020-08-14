const { Router } = require('express')
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')


const router = Router();
const { validarJwt } = require('../middlewares/validar-jwt')


router.get('/', validarJwt, getUsuarios)

router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos
], crearUsuario)

router.put('/:id', [
    validarJwt,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    check('role', "El role es obligadorio").not().isEmpty(),
    validarCampos,
], actualizarUsuario)


router.delete('/:id', validarJwt, eliminarUsuario)


module.exports = router