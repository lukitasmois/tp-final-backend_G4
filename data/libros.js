const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "tp-final";
const LIBROS = "libros";
const USERS = "users";

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

async function alquilarLibro(idLibro, idUsuario) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(idUsuario) });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .updateOne(
      { _id: new ObjectId(idLibro) },
      { $set: { Estado: "Alquilado" } }
    );

  await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .updateOne(
      { _id: new ObjectId(idUsuario) },
      { $addToSet: { libros: new ObjectId(idLibro) } }
    );
}

async function devolverLibro(idLibro, idUsuario) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(idUsuario) });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .updateOne(
      { _id: new ObjectId(idLibro) },
      { $set: { Estado: "Disponible" } }
    );

  await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .updateOne(
      { _id: new ObjectId(idUsuario) },
      { $pull: { libros: new ObjectId(idLibro) } }
    );
}

async function addLibro(libro) {
  const connectiondb = await conn.getConnection();
  const result = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .insertOne(libro);
  return result;
}

async function deleteLibro(id) {
  const connectiondb = await conn.getConnection();
  const libro = await getLibro(id);
  const result = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .deleteOne(libro);
  return result;
}

async function updateLibro(libro) {
  const connectiondb = await conn.getConnection();
  const libroDb = { _id: new ObjectId(libro._id) };

  const updateValues = {
    $set: {
      Titulo: libro.Titulo,
      Autor: libro.Autor,
      Genero: libro.Genero,
      Sinopsis: libro.Sinopsis,
      "Fecha-publicacion": libro["Fecha-publicacion"],
      Editorial: libro.Editorial,
      Estado: libro.Estado,
      Imagen: libro.Imagen,
    },
  };

  const result = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .updateOne(libroDb, updateValues);
  return result;
}

module.exports = {
  getAllLibros,
  getLibro,
  alquilarLibro,
  devolverLibro,
  addLibro,
  deleteLibro,
  updateLibro,
};
