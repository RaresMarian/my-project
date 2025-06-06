"use strict";

var express = require("express");

var router = express.Router();

var auth = require('../auth/auth');

var upload_image = require("../config/multer"); // usa il tuo file upload


var Add = require("../schemas/insert-add-model");

router.post('/insert-add', auth, upload_image.single("image"), function _callee(req, res) {
  var _req$body, titolo, descrizione, prezzo, comune, contatto, tipologia, condizione, details, insertadd;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, titolo = _req$body.titolo, descrizione = _req$body.descrizione, prezzo = _req$body.prezzo, comune = _req$body.comune, contatto = _req$body.contatto, tipologia = _req$body.tipologia, condizione = _req$body.condizione;
          details = {
            titolo: titolo,
            descrizione: descrizione,
            prezzo: prezzo,
            comune: comune,
            contatto: contatto,
            tipologia: tipologia,
            condizione: condizione,
            imageUrl: req.file.path,
            author: {
              email: req.user.email,
              name: req.user.name
            }
          };
          insertadd = new Add(details);
          _context.next = 6;
          return regeneratorRuntime.awrap(insertadd.save());

        case 6:
          res.json({
            ok: true,
            message: 'Annuncio inserito correttamente',
            annuncio: insertadd
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            ok: false,
            error: 'Errore durante il salvataggio dell\'annuncio'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;