var express = require("express");
var router = express.Router();
const controller = require("../controllers/libros");
const data = require('../data/libros');

/* GET libros listing. */
router.get("/", async function (req, res, next) {
  res.json(await controller.getAllLibros());
});

router.get("/:id", async (req, res) => {
  res.json(await controller.getLibro(req.params.id));
});

router.post('/', async (req, res) => {
  try {
    const newLibro = req.body;
    const result = await data.addLibro(newLibro);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await data.deleteLibro(id);
    res.send(result)
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await data.updateLibro(id);
    res.send(result)
  } catch (error) { 
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
