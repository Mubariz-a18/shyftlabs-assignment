const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function createContext(req) {
  const context = {};

  const token = req.headers.token || '';

  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.id;
      const user = await User.findByPk(userId);

      context.user = user;
    }
  } catch (error) {
    console.error('JWT verification error:', error.message);
  }

  return context;
}

module.exports = createContext;
