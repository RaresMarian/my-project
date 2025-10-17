"use strict";

var Profile = require('../schemas/profileModel');

function createProfile(data) {
  var _data;

  var credential, newUser;
  return regeneratorRuntime.async(function createProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          credential = (_data = data, name = _data.name, surname = _data.surname, sex = _data.sex, birth_date = _data.birth_date, email = _data.email, password = _data.password, utente = _data.utente, _data);
          newUser = new Profile(credential);
          _context.next = 4;
          return regeneratorRuntime.awrap(newUser.save());

        case 4:
          return _context.abrupt("return", newUser);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = createProfile;