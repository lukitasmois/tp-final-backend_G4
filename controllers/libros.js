const { ObjectId } = require("mongodb");
const libros = require("../data/libros");

async function getAllLibros() {
  return libros.getAllLibros();
}

async function getLibro(id) {
  return libros.getLibro(id);
}

async function addLibro(libro) {
  return libros.addLibro(libro);
}

async function deleteLibro(id) {
  return libros.deleteLibro(id);
}

async function updateLibro(libro) {
  return libros.updateLibro(libro);
}

module.exports = { getAllLibros, getLibro, addLibro, deleteLibro, updateLibro };
