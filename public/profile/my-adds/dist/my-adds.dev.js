"use strict";

var token = localStorage.getItem("token");
fetch('/show-my-adds', {
  method: 'GET',
  headers: {
    "x-auth-token": token
  }
}).then(function (res) {
  return res.json();
}).then(function (data) {
  data.forEach(showAdd);
});

function showAdd(annuncio) {
  var container = document.getElementById("annunci-container");
  var card = document.createElement("div");
  card.classList.add("annuncio-card");
  card.innerHTML = "\n    <div style=\"position: relative; height: 30px;\">\n      <button class=\"modifica-btn\" \n        style=\"position: absolute; top: 0; right: 0; border: none; background: transparent; cursor: pointer;\" \n        title=\"Modifica\">\u270F\uFE0F\n      </button>\n    </div>\n    <div class=\"annuncio-top\">\n      <img class=\"annuncio-img\" src=\"".concat(annuncio.imageUrl || '/img/default.png', "\" alt=\"Foto annuncio\">\n      <div class=\"annuncio-basic-info\">\n        <div class=\"annuncio-titolo\">").concat(annuncio.titolo, "</div>\n        <div class=\"annuncio-prezzo\">\u20AC ").concat(annuncio.prezzo, "</div>\n      </div>\n    </div>\n    <div class=\"annuncio-dettagli\">\n      <div class=\"annuncio-descrizione\">").concat(annuncio.descrizione, "</div>\n    </div>\n  ");
  container.appendChild(card);
  var btnModifica = card.querySelector(".modifica-btn");
  btnModifica.addEventListener("click", function () {
    startEditing(card, btnModifica);
  });
}

function startEditing(card, btnModifica) {
  var titolo = card.querySelector(".annuncio-titolo");
  var prezzo = card.querySelector(".annuncio-prezzo");
  var descrizione = card.querySelector(".annuncio-descrizione");
  [titolo, prezzo, descrizione].forEach(function (el) {
    el.contentEditable = "true";
    el.style.border = "1px dashed green";
  });
  btnModifica.style.display = "none";
  var btnSalva = document.createElement("button");
  btnSalva.textContent = "Salva";
  btnSalva.style.marginRight = "5px";
  var btnAnnulla = document.createElement("button");
  btnAnnulla.textContent = "Annulla";
  card.appendChild(btnSalva);
  card.appendChild(btnAnnulla);
  var original = {
    titolo: titolo.textContent,
    prezzo: prezzo.textContent,
    descrizione: descrizione.textContent
  };
  btnSalva.addEventListener("click", function () {
    console.log("Salvato:", {
      titolo: titolo.textContent,
      prezzo: prezzo.textContent,
      descrizione: descrizione.textContent
    });
    stopEditing(card, btnModifica, btnSalva, btnAnnulla);
  });
  btnAnnulla.addEventListener("click", function () {
    titolo.textContent = original.titolo;
    prezzo.textContent = original.prezzo;
    descrizione.textContent = original.descrizione;
    stopEditing(card, btnModifica, btnSalva, btnAnnulla);
  });
}

function stopEditing(card, btnModifica, btnSalva, btnAnnulla) {
  var titolo = card.querySelector(".annuncio-titolo");
  var prezzo = card.querySelector(".annuncio-prezzo");
  var descrizione = card.querySelector(".annuncio-descrizione");
  [titolo, prezzo, descrizione].forEach(function (el) {
    el.contentEditable = "false";
    el.style.border = "none";
  });
  btnSalva.remove();
  btnAnnulla.remove();
  btnModifica.style.display = "inline-block";
}