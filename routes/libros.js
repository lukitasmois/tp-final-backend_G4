var express = require('express');
var router = express.Router();
const controller = require('../controllers/libros');

/* GET libros listing. */
router.get('/', async function(req, res, next) {
  res.json(await controller.getAllLibros());
});

module.exports = router;
