const bcrypt = require('bcryptjs');

// In-memory user store, seeded with 3 users.
// Plaintext passwords (for README/testing purposes) are hashed below.
const users = [
  { id: 1, username: 'alice', password: bcrypt.hashSync('alice123', 8) },
  { id: 2, username: 'bob', password: bcrypt.hashSync('bob123', 8) },
  { id: 3, username: 'carol', password: bcrypt.hashSync('carol123', 8) },
];

let nextId = users.length + 1;

function findByUsername(username) {
  return users.find((u) => u.username === username);
}

function findById(id) {
  return users.find((u) => u.id === id);
}

function createUser(username, hashedPassword) {
  const user = { id: nextId++, username, password: hashedPassword };
  users.push(user);
  return user;
}

module.exports = { users, findByUsername, findById, createUser };
