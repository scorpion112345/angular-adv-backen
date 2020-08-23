const Hospital = require("../models/hospital");
const Medico = require("../models/Medico");
const Usuario = require("../models/usuario");

const getTodo = async (req, res) => {
  const { busqueda } = req.params;

  const regex = new RegExp(busqueda, "i");
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res) => {
  const { busqueda, tabla } = req.params;
  const regex = new RegExp(busqueda, "i");

  let resultados = [];
  switch (tabla) {
    case "medicos":
      resultados = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      resultados = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );

      break;
    case "usuarios":
      resultados = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "Tabla incorrecta",
      });
  }
  res.json({
    ok: true,
    resultados,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
