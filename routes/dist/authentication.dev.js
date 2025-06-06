"use strict";

var genToken = require('../utils/gentoken');

var conToDb = require('../database/connectToUser');

var express = require('express');

var router = express.Router();
router.post("/", function _callee(req, res) {
  var _req$body, email, password, user, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(conToDb(email, password));

        case 4:
          user = _context.sent;

          // conToDb deve restituire l'oggetto utente
          if (user) {
            token = genToken(user);
            res.status(200).send({
              token: token
            });
          } else {
            res.status(401).json({
              auth: false,
              message: "Email o password non validi"
            });
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: "Errore del server"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;