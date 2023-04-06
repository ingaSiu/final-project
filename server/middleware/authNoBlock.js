const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (token) {
    token = token.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return next();
    }
  }

  return next();
};

module.exports = verifyToken;
