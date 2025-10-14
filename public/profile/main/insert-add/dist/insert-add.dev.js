"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var titolo = document.getElementById("titolo").value;
    var descrizione = document.getElementById("descrizione").value;
    var prezzo = document.getElementById("prezzo").value;
    var comune = document.getElementById("comune").value;
    var contatto = document.getElementById("contatto").value;
    var categoria = document.getElementById("categoria").value;
    var condizioni = document.getElementById("condizioni").value;
    var fileInput = document.getElementById("immagine");
    var file = fileInput.files[0];

    if (!file) {
      alert("Per favore seleziona un'immagine.");
      return;
    }

    var formData = new FormData();
    formData.append("image", file);
    formData.append("titolo", titolo);
    formData.append("descrizione", descrizione);
    formData.append("prezzo", prezzo);
    formData.append("comune", comune);
    formData.append("contatto", contatto);
    formData.append("categoria", categoria);
    formData.append("condizione", condizioni);
    var token = localStorage.getItem("token");

    if (!token) {
      showMessage("Accesso non autorizzato. Effettua il login.");
      return;
    }

    fetch("/insert-add", {
      method: "POST",
      headers: {
        "x-auth-token": token
      },
      body: formData
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log("✅ Annuncio salvato:", data); // Mostra anteprima

      var reader = new FileReader();

      reader.onload = function (event) {
        var card = document.createElement("div");
        card.className = "annuncio-card";
        card.innerHTML = "\n            <img src=\"".concat(event.target.result, "\" class=\"annuncio-img\" alt=\"Anteprima immagine\">\n            <div class=\"annuncio-info\">\n              <h3>").concat(titolo, "</h3>\n              <p><strong>Descrizione:</strong> ").concat(descrizione, "</p>\n              <p><strong>Prezzo:</strong> \u20AC").concat(prezzo, "</p>\n              <p><strong>Comune:</strong> ").concat(comune, "</p>\n            </div>\n          ");
        document.getElementById("annunciPreview").appendChild(card);
        document.getElementById("immaginePreview").style.display = "none";
        form.reset();
      };

      reader.readAsDataURL(file);
    })["catch"](function (err) {
      showMessage("Errore nel salvataggio dell'annuncio.");
    });
  });
});

function showMessage(text) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var box = document.getElementById('message-box');
  box.textContent = text;
  box.style.display = 'block'; // Reset animazione

  box.style.animation = 'none';
  box.offsetHeight; // forza reflow

  box.style.animation = "fadein 0.3s ease, fadeout 0.3s ease ".concat(duration / 1000, "s forwards"); // Nascondi dopo la durata

  setTimeout(function () {
    box.style.display = 'none';
  }, duration + 300);
}