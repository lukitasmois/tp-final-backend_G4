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

async function addLibro(libro){
  const connectiondb = await conn.getConnection();
  const result = await connectiondb
                      .db(DATABASE)
                      .collection(LIBROS)
                      .insertOne(libro);
  return result;
}

async function deleteLibro(id){
  const connectiondb = await conn.getConnection();
  const libro = await getLibro(id);
  const result = await connectiondb
                        .db(DATABASE)
                        .collection(LIBROS)
                        .deleteOne(libro);
  return result;
}

async function updateLibro(libro){
  const connectiondb = await conn.getConnection();
  const libroDb = await getLibro(libro._id);
  
  const newLibro = {
    $set: {
      Titulo: libro.Titulo,
      Autor: libro.Autor,
      Genero: libro.Genero,
      Sinopsis: libro.Sinopsis,
      'Fecha-publicacion': libro['Fecha-publicacion'],
      Editorial: libro.Editorial,
      Estado: libro.Estado,
      Imagen: libro.Imagen
    }   
  }

  const result = await connectiondb
                        .db(DATABASE)
                        .collection(LIBROS)
                        .updateOne(libroDb, newLibro);
  return result;
}

module.exports = { getAllLibros, getLibro, addLibro, deleteLibro, updateLibro };
