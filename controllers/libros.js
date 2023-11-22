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

async function alquilarLibro(idLibro) {
  return libros.alquilarLibro(idLibro);
}

async function devolverLibro(idLibro) {
  return libros.devolverLibro(idLibro);
}
module.exports = { getAllLibros, getLibro, alquilarLibro, devolverLibro, addLibro, deleteLibro, updateLibro  };
