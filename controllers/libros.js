const { ObjectId } = require("mongodb");
const libros = require("../data/libros");

async function getAllLibros() {
  return libros.getAllLibros();
}

async function getLibro(id) {
  return libros.getLibro(id);
}

async function alquilarLibro(idLibro) {
  return libros.alquilarLibro(idLibro);
}

async function devolverLibro(idLibro) {
  return libros.devolverLibro(idLibro);
}

module.exports = { getAllLibros, getLibro, alquilarLibro, devolverLibro };
