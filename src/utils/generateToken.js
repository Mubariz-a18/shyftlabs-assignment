const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '10h',
  });
  return { token };
};

module.exports = generateToken;