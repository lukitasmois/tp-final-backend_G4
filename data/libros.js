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

async function alquilarLibro(idLibro) {
  const connectiondb = await conn.getConnection();
  await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .updateOne({ _id: new ObjectId(idLibro) }, { $set: { Estado: 'Alquilado' } });
}

async function devolverLibro(idLibro) {
  const connectiondb = await conn.getConnection();
  await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .updateOne({ _id: new ObjectId(idLibro) }, { $set: { Estado: 'Disponible' } });
}

module.exports = { getAllLibros, getLibro, alquilarLibro, devolverLibro };


