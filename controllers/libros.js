const libros = require("../data/libros");

async function getAllLibros() {
  return libros.getAllLibros();
}

module.exports = {getAllLibros};