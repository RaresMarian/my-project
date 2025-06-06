"use strict";

var jwt = require('jsonwebtoken');

var dotenv = require("dotenv");

function generaToken(utente) {
  try {
    return jwt.sign({
      id: utente.id
    }, // payload
    process.env.jwtPrivateKey, // chiave segreta
    {
      expiresIn: '1d'
    } // scadenza del token
    );
  } catch (_unused) {
    console.log("errore generazione token");
  }
}

module.exports = generaToken;