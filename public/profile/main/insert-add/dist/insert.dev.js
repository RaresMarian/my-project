"use strict";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var titolo = document.getElementById("titolo").value;
  var descrizione = document.getElementById("descrizione").value;
  var prezzo = document.getElementById("prezzo").value;
  var comune = document.getElementById("comune").value;
  var contatto = document.getElementById("contatto").value;
  var tipologia = document.getElementById("type").value;
  var condizioni = document.getElementById("condizioni").value;
  var fileInput = document.getElementById("immagine");
  var file = fileInput.files[0];
  if (!file) return; // ✅ CREA FormData

  var formData = new FormData();
  formData.append("image", file); // deve essere "image" perché multer cerca req.file

  formData.append("titolo", titolo);
  formData.append("descrizione", descrizione);
  formData.append("prezzo", prezzo);
  formData.append("comune", comune);
  formData.append("contatto", contatto);
  formData.append("tipologia", tipologia);
  formData.append("condizione", condizioni); // non "condizioni" nel backend!

  var token = localStorage.getItem("token"); // ✅ INVIA al backend

  fetch("http://localhost:3000/insert-add", {
    method: "POST",
    headers: {
      "x-auth-token": token // <-- assicurati che il token sia qui!

    },
    body: formData
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log("✅ Annuncio salvato:", data); // Mostra anteprima solo se risposta ok

    var reader = new FileReader();

    reader.onload = function (event) {
      var card = document.createElement("div");
      card.className = "annuncio-card";
      card.innerHTML = "\n          <img src=\"".concat(event.target.result, "\" class=\"annuncio-img\" alt=\"Anteprima immagine\">\n          <div class=\"annuncio-info\">\n            <h3>").concat(titolo, "</h3>\n            <p><strong>Descrizione:</strong> ").concat(descrizione, "</p>\n            <p><strong>Prezzo:</strong> \u20AC").concat(prezzo, "</p>\n            <p><strong>Comune:</strong> ").concat(comune, "</p>\n          </div>\n        ");
      document.getElementById("annunciPreview").appendChild(card);
      document.getElementById("immaginePreview").style.display = "none";
      e.target.reset();
    };

    reader.readAsDataURL(file);
  })["catch"](function (err) {
    console.error("❌ Errore salvataggio annuncio:", err);
  });
});