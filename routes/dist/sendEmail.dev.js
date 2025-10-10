"use strict";

var express = require("express");

var router = express.Router();

require("dotenv").config();

var model = require("../schemas/profileModel");

var pendingRegistrations = {}; // Importa la libreria ufficiale di Brevo

var Brevo = require("@getbrevo/brevo"); // Configurazione API Brevo


var client = new Brevo.TransactionalEmailsApi();
client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
router.post("/send-email", function _callee(req, res) {
  var existingUser, email, code, sendSmtpEmail;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(model.findOne({
            email: req.body.email
          }));

        case 3:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email già esistente"));

        case 6:
          email = req.body.email;
          code = Math.floor(100000 + Math.random() * 900000).toString();
          sendSmtpEmail = {
            sender: {
              email: "raresmarian1996@gmail.com",
              name: "Verifica account"
            },
            // deve essere verificata su Brevo
            to: [{
              email: email
            }],
            subject: "Il tuo codice di verifica",
            textContent: "Il tuo codice di verifica \xE8: ".concat(code)
          }; // Invia email con l’API

          _context.next = 11;
          return regeneratorRuntime.awrap(client.sendTransacEmail(sendSmtpEmail));

        case 11:
          pendingRegistrations.code = code;
          res.status(200).json({
            ok: true
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Errore invio email:", _context.t0);
          res.status(500).json({
            ok: false,
            message: "Errore invio email"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
module.exports = {
  router: router,
  pendingRegistrations: pendingRegistrations
};