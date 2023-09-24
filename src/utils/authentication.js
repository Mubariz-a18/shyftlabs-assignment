const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function createContext(req) {
  const context = {};

  // Extract the JWT token from the request headers
  const token = req.headers.token || '';

  // Verify the token and extract the user ID
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.id;
      const user = await User.findByPk(userId);

      // Add the authenticated user to the context
      context.user = user;
    }
  } catch (error) {
    console.error('JWT verification error:', error.message);
  }

  return context;
}

module.exports = createContext;
