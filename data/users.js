const conn = require('./conn');
const DATABASE = 'tp-final';
const USERS = 'users';
const bcrypt = require('bcrypt');

async function addUser(user){
    user.password = await bcrypt.hash(user.password, 8);
    const connection = await conn.getConnection();
    const result = await connection.db(DATABASE).collection(USERS).insertOne(user);
    
    return result;
}

module.exports = {addUser};