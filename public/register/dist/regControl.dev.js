"use strict";

var getId = function getId(id) {
  return document.getElementById(id);
}; // Primo click: registrazione


getId("register-btn").addEventListener("click", function _callee(event) {
  var form, sex, credential, res, data;
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
          if (getId("sex-male").checked) {
            sex = getId("sex-male").value;
          } else if (getId("sex-female").checked) {
            sex = getId("sex-female").value;
          }

          credential = {
            name: getId("name").value,
            surname: getId("surname").value,
            sex: sex,
            birth_date: getId("birth_date").value,
            email: getId("email").value,
            password: getId("password").value
          };
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch('/send-email', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
          }));

        case 9:
          res = _context.sent;

          if (!(res.status == 400)) {
            _context.next = 13;
            break;
          }

          alert("email gia esistente");
          return _context.abrupt("return");

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(res.json());

        case 15:
          data = _context.sent;

          if (data) {
            document.getElementById("code-section").style.display = "block";
          }

          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](6);
          console.error("Errore durante la registrazione:", _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 19]]);
}); // Secondo click: verifica codice

getId("verify-btn").addEventListener("click", function () {
  var code = document.getElementById("verification-code").value;
  fetch("/verify-code?code=".concat(encodeURIComponent(code)), {
    method: "GET"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return console.log("Verifica codice:", data);
  })["catch"](function (err) {
    return console.error("Errore nella verifica:", err);
  });
}); // const data = await response.json();
// localStorage.setItem("token", data.token);
// form.reset();
// const toast = document.getElementById("success-toast");
// toast.style.display = "flex";
// setTimeout(()=>{window.location.href ='/';},3000);