const { Router } = require("express");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedico,
} = require("../controllers/Medicos");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida-campos");

const router = Router();
const { validarJwt } = require("../middlewares/validar-jwt");

router.get("/", validarJwt, getMedicos);

router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital es obligatorio").not().isEmpty().isMongoId(),

    validarCampos,
  ],
  crearMedico
);

router.put("/:id", validarJwt, actualizarMedico);

router.delete("/:id", validarJwt, borrarMedico);

router.get("/:id", validarJwt, getMedico);

module.exports = router;
