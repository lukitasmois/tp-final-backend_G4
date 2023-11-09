const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "tp-final";
const LIBROS = "libros";

async function getAllBooks(pageSize, page) {
  const connectiondb = await conn.getConnection();
  const libros = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return libros;
}

module.exports = { getAllBooks };
