const authService = require('../services/authService');

function register(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const user = authService.register(username, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const token = authService.login(username, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
