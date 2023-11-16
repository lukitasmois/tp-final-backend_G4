var express = require("express");
var router = express.Router();
const controller = require("../controllers/libros");

/* GET libros listing. */
router.get("/", async function (req, res, next) {
  res.json(await controller.getAllLibros());
});

router.get("/:id", async (req, res) => {
  res.json(await controller.getLibro(req.params.id));
});

module.exports = router;
