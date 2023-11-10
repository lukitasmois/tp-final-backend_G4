const conn = require('./conn');
const DATABASE = 'tp-final';
const LIBROS = 'libros';


async function getAllLibros(){
  const connectiondb = await conn.getConnection();
  const libros = await connectiondb
    .db(DATABASE)
    .collection(LIBROS)
    .find({})
    .toArray();
  return libros;
}

module.exports = {getAllLibros};