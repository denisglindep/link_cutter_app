const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    req.user = jwt.verify(token, config.get('jwtSecret'));
    next();

  } catch (error) {
    return res.status(401).json({ message: 'No authentication' });
  }
};