var express = require("express");
var router = express.Router();
const controller = require("../controllers/libros");
const libros = require("../data/libros");

/* GET libros listing. */
router.get("/", async function (req, res, next) {
  try {
    const libros = await controller.getAllLibros();
    res.json(libros);
  } catch {
    console.error(error);
    res.status(500).send("Error al obtener libros");
  }
});

/* GET libro por id */
router.get("/:id", async (req, res) => {
  try {
    const libro = await controller.getLibro(req.params.id);
    console.log(libro);
    res.json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener libro");
  }
});

/* POST libro */
router.post("/addLibro", async (req, res) => {
  try {
    const newLibro = req.body;
    const result = await controller.addLibro(newLibro);
    res.status(201).json("Libro agregado con éxito");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al crear libro");
  }
});

/* DELETE libro */
router.delete("/deleteLibro/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await controller.deleteLibro(id);
    if (result.deletedCount === 0) {
      return res.status(400).json({ message: "Libro no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al eliminar libro");
  }
});

/* PUT libro */
router.put("/updateLibro/:id", async (req, res) => {
  const libroUpdate = req.body;
  libroUpdate._id = req.params.id;

  try {
    const result = await controller.updateLibro(libroUpdate);
    if (result.modifiedCount > 0) {
      res.json({ message: "Libro actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al actualizar libro");
  }
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


