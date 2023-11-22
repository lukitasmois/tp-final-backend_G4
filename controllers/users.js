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

async function getUsers() {
  return users.getUsers();
}

async function getUser(id) {
  return users.getUser(id);
}

module.exports = { findByCredentials, generateToken, addUser, getUsers, getUser };