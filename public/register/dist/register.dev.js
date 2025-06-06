"use strict";

var getId = function getId(id) {
  return document.getElementById(id);
};

getId("register-btn").addEventListener("click", function _callee(event) {
  var form, sex, data, response, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault(); // Evita l'invio del form

          form = getId("register-form");

          if (!(form && !form.checkValidity())) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", form.reportValidity());

        case 4:
          if (getId("sex-male").checked) {
            sex = getId("sex-male").value;
          } else if (getId("sex-female").checked) {
            sex = getId("sex-female").value;
          }

          data = {
            name: getId("name").value,
            surname: getId("surname").value,
            sex: sex,
            birth_date: getId("birth_date").value,
            email: getId("email").value,
            password: getId("password").value
          };
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/register/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // invii direttamente i dati dell'utente

          }));

        case 9:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          throw new Error("Errore HTTP: ".concat(response.status));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          result = _context.sent;
          console.log('✅ Risposta del server:', result);
          form.reset(); // resetta i campi

          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](6);
          console.error('❌ Errore durante la registrazione:', _context.t0);
          alert("Registrazione fallita. Riprova più tardi.");

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 19]]);
});