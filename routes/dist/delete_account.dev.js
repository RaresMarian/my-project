"use strict";

var express = require('express');

var router = express.Router();

var User = require('../schemas/profileModel');

var verifyToken = require('../auth/auth'); // 🔹 Cancellazione utente loggato (con token)


router["delete"]('/delete-user', verifyToken, function _callee(req, res) {
  var userId, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id; // viene dal token JWT

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 4:
          result = _context.sent;

          if (result) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            error: 'Utente non trovato'
          }));

        case 7:
          console.log("Utente ".concat(userId, " eliminato"));
          res.json({
            success: true
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Errore nella cancellazione:', _context.t0);
          res.json({
            success: false,
            error: 'Errore durante la cancellazione'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;