"use strict";

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv');

dotenv.config();
var secret = process.env.jwtPrivateKey;

module.exports = function (req, res, next) {
  var token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Bad request');

  try {
    var decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Token non valido.');
  }
};