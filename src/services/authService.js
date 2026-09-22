const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_EXPIRES_IN = '1h';

function register(username, password) {
  if (userModel.findByUsername(username)) {
    const error = new Error('Username already exists');
    error.statusCode = 409;
    throw error;
  }
  const hashed = bcrypt.hashSync(password, 8);
  const user = userModel.createUser(username, hashed);
  return { id: user.id, username: user.username };
}

function login(username, password) {
  const user = userModel.findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new Error('Invalid username or password');
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { register, login, verifyToken, JWT_SECRET };
