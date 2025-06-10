"use strict";

var express = require("express");

var router = express.Router();

var auth = require('../auth/auth');

var annuncio_model = require('../schemas/insert-add-model');

router.get("/show-my-adds", auth, function _callee(req, res) {
  var emailUtente, annunci;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          emailUtente = req.user.email; // o req.query.email

          _context.next = 4;
          return regeneratorRuntime.awrap(annuncio_model.find({
            'author.email': emailUtente
          }));

        case 4:
          annunci = _context.sent;
          console.log(annunci);
          res.send(annunci);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Errore durante il rendering:", _context.t0);
          res.status(500).send("Errore del server");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;