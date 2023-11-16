const { ObjectId } = require("mongodb");
const libros = require("../data/libros");

async function getAllLibros() {
  return libros.getAllLibros();
}

async function getLibro(id) {
  return libros.getLibro(id);
}

module.exports = { getAllLibros, getLibro };
