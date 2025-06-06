const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.jwtPrivateKey;

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Bad request');
  try {
    const decoded = jwt.verify(token,secret);
    req.user = decoded;
    res.status(200);
    next();
  } catch (err) {
    res.status(400).send('Token non valido.');
  }
};

