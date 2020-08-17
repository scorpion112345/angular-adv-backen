const { Router } = require('express')
const { login, googleSignIn } = require('../controllers/auth')

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/valida-campos')


const router = Router();

router.post('', [
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos
], login)

router.post('/google', [
    check('token', "El token es obligatorio").not().isEmpty(),
    validarCampos
], googleSignIn)


module.exports = router
