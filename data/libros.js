const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "tp-final";
const LIBROS = "libros";

async function getAllLibros() {
  const connectiondb = await conn.getConnection();
  const libros = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .find({})
    .toArray();
  return libros;
}

async function getLibro(id) {
  const connectiondb = await conn.getConnection();
  const libro = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .findOne({ _id: new ObjectId(id) });
  return libro;
}

module.exports = { getAllLibros, getLibro };
