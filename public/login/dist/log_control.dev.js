"use strict";

window.addEventListener("pageshow", function (event) {
  // Se esiste un token salvato, reindirizza
  var token = localStorage.getItem('token');

  if (token) {
    window.location.replace("/");
  }
});

function verificaCredenziali() {
  var email = document.getElementById("id_email").value.trim();
  var password = document.getElementById("password").value;
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    alert("Digita un'email");
    return;
  }

  if (email.length < 4) {
    alert("Email troppo corta");
    return;
  }

  if (!regex.test(email)) {
    alert("Email non valida ❌");
    return;
  }

  if (password.length === 0) {
    alert("Inserisci la password ❌");
    return;
  }

  if (password.length < 5) {
    alert("Inserisci una password valida ❌");
    return;
  }

  connTo(email, password);
}

function connTo(email, password) {
  var response, data, form, pass;
  return regeneratorRuntime.async(function connTo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/authentication", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }));

        case 2:
          response = _context.sent;

          if (!(response.status == 200)) {
            _context.next = 13;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          form = document.getElementById('form');
          localStorage.setItem("token", data.token);
          form.reset();
          setTimeout(function () {
            window.location.href = '/';
          }, 1000);
          _context.next = 16;
          break;

        case 13:
          pass = document.getElementById('password');
          pass.value = "";
          alert("Email o password non valide");

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}