const users = require("../data/users");

async function addUser(newUser) {
  return users.addUser(newUser);
}

async function findByCredentials(email, password) {
  return users.findByCredentials(email, password);
}

async function generateToken(user) {
  return users.generateToken(user);
}

module.exports = { findByCredentials, generateToken, addUser };