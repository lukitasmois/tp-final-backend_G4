const libros = require("../data/libros");

async function getAllBooks(pageSize, page) {
  return libros.getAllBooks(pageSize, page);
}

module.exports = { getAllBooks };
