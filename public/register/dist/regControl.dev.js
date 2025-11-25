"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var credential;

var getId = function getId(id) {
  return document.getElementById(id);
}; // Primo click: registrazione


getId("register-btn").addEventListener("click", function _callee(event) {
  var form, sex, email, emailRegex, res, data, codeSection;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          form = getId("register-form");

          if (!(form && !form.checkValidity())) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", form.reportValidity());

        case 4:
          sex = getId("sex-male").checked ? getId("sex-male").value : getId("sex-female").checked ? getId("sex-female").value : null;
          email = getId("email").value.trim().toLowerCase(); // Controllo email valida

          emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (emailRegex.test(email)) {
            _context.next = 10;
            break;
          }

          alert("Inserisci un'email valida");
          return _context.abrupt("return");

        case 10:
          credential = {
            name: getId("name").value.trim(),
            surname: getId("surname").value.trim(),
            sex: sex,
            birth_date: getId("birth_date").value,
            email: email,
            password: getId("password").value
          };
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(fetch('/send-email', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
          }));

        case 14:
          res = _context.sent;

          if (!(res.status === 400)) {
            _context.next = 18;
            break;
          }

          alert("Email già esistente");
          return _context.abrupt("return");

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(res.json());

        case 20:
          data = _context.sent;

          if (data) {
            codeSection = getId("code-section");
            codeSection.style.display = "block";
            codeSection.style.opacity = 0;
            setTimeout(function () {
              return codeSection.style.opacity = 1;
            }, 100); // effetto fade-in
          }

          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](11);
          console.error("Errore durante la registrazione:", _context.t0);
          alert("Errore di rete durante la registrazione");

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 24]]);
}); // Verifica codice

getId("verify-btn").addEventListener("click", function _callee2() {
  var form, code, res, data, toast;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          form = getId("register-form");
          code = getId("verification-code").value.trim();

          if (code) {
            _context2.next = 5;
            break;
          }

          alert("Inserisci il codice di verifica");
          return _context2.abrupt("return");

        case 5:
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetch('/verify-code', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(_objectSpread({}, credential, {
              code: code
            }))
          }));

        case 8:
          res = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(res.json());

        case 11:
          data = _context2.sent;

          if (res.ok) {
            localStorage.setItem("token", data.token || '');
            form.reset(); // Mostra il toast

            toast = getId("success-toast");
            toast.classList.add("show"); // fade-in
            // Dopo 2.5s fai fade-out e redirect

            setTimeout(function () {
              toast.classList.remove("show"); // fade-out

              setTimeout(function () {
                window.location.href = '/profile/main/profile_page.html';
              }, 600); // durata della transizione
            }, 2500);
          } else {
            alert("Errore: " + (data.error || "Codice errato"));
          }

          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](5);
          alert("Errore di rete durante la verifica");

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 15]]);
});