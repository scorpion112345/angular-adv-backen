const { Router } = require('express')
const { login } = require('../controllers/auth')

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')


const router = Router();

router.post('', [
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos
], login)


module.exports = router
