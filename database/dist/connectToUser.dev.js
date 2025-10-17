"use strict";

var connect = require('./dbConnect');

var User = require('../schemas/profileModel');

function conToUser(user_email, password) {
  var result;
  return regeneratorRuntime.async(function conToUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: user_email,
            password: password
          }));

        case 2:
          result = _context.sent;

          if (!result) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", result);

        case 7:
          return _context.abrupt("return", false);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = conToUser;