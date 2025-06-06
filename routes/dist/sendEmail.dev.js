"use strict";

var nodemailer = require("nodemailer");

require('dotenv').config();

var pendingRegistrations = new Map();

var model = require('../schemas/profileModel');

var express = require('express');

var router = express.Router();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "raresmarian1996@gmail.com",
    pass: process.env.googlePassword
  }
});
router.post('/send-email', function _callee(req, res) {
  var existingUser, email, code, mailOptions;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(model.findOne({
            email: req.body.email
          }));

        case 2:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email già esistente"));

        case 5:
          email = req.body.email;
          code = Math.floor(100000 + Math.random() * 900000).toString();
          mailOptions = {
            from: "raresmarian1996@gmail.com",
            to: email,
            subject: "Il tuo codice di verifica",
            text: "Il tuo codice di verifica \xE8: ".concat(code)
          };
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 11:
          pendingRegistrations.set(email, {
            code: code,
            timestamp: Date.now()
          });
          res.status(200).json({
            "ok": true
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);
          console.error("Errore invio email:", _context.t0);
          throw new Error("Errore invio email");

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 15]]);
});
module.exports = router, pendingRegistrations;