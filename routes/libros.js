var express = require("express");
var router = express.Router();
const controller = require("../controllers/libros");
const libros = require("../data/libros");

router.get("/", async function (req, res, next) {
  res.json(await controller.getAllLibros());
});

router.get("/:id", async (req, res) => {
  res.json(await controller.getLibro(req.params.id));
});

router.post("/alquilar/:id", async (req, res) => {
  const idLibro = req.params.id;
  try {
    await libros.alquilarLibro(idLibro);
    res.json({ success: true, message: "Libro alquilado con éxito." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al alquilar el libro." });
  }
});

router.post("/devolver/:id", async (req, res) => {
  const idLibro = req.params.id;
  try {
    await libros.devolverLibro(idLibro);
    res.json({ success: true, message: "Libro devuelto con éxito." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al devolver el libro." });
  }
});

module.exports = router;


