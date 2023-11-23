const { ObjectId } = require("mongodb");
const conn = require('./conn');
const DATABASE = 'tp-final';
const USERS = 'users';
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

async function addUser(user){
    user.password = await bcrypt.hash(user.password, 8);
    const connection = await conn.getConnection();
    const result = await connection.db(DATABASE).collection(USERS).insertOne(user);
    
    return result;
}

async function findByCredentials(email, password){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb.db(DATABASE).collection(USERS).findOne({email: email});
    if(!user){
        throw new Error("Datos invalidos.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Datos invalidos.");
    }
    return user
}

async function generateToken(user) {
    
    const token = Jwt.sign({_id: user._id, username: user.userName, email: user.email, rol: user.rol}, "clavesecreta")
    return token; 
}

async function getUsers() {
    const connectiondb = await conn.getConnection();
  const users = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .find({})
    .toArray();
  return users;
}

async function getUser(id) {

 const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(id) });
  return user;
}

async function alquilar(idUsuario, idLibro) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb.db(DATABASE)
    .collection(USERS).findOneAndUpdate(
      { _id: new ObjectId(idUsuario) }, // Buscar al usuario por su ID
      { $addToSet: { libros: idLibro } }, // Agregar el idLibro al array de libros si no está presente
      { returnOriginal: false } // Devolver el documento actualizado
    );
}

module.exports = {addUser, findByCredentials, generateToken, getUsers, getUser, alquilar};