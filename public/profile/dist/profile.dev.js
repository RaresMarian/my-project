"use strict";

var token = localStorage.getItem("token"); // function for check my adds and upload user data

document.addEventListener("DOMContentLoaded", function () {
  fetch('/load-info', {
    method: 'GET',
    headers: {
      "x-auth-token": token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (user) {
    //fetch for update the user name
    document.getElementById('dropdown-item-user').innerText = user.name;
  })["catch"](function (err) {
    return console.error(err);
  }); // fetch for show my adds

  fetch('/show-adds', {
    method: 'GET',
    headers: {
      "x-auth-token": token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    data.forEach(showAdd);
  }); // fetch for update count of adds

  fetch('/find-add', {
    method: 'GET',
    headers: {
      "x-auth-token": token
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.ok) {
      var container = document.querySelector('.online_count');
      container.textContent = "Annunci trovati: ".concat(data.total);
    } else {
      console.error("Errore nella risposta:", data);
    }
  })["catch"](function (error) {
    console.error("Errore fetch:", error);
  });
}); // function for autocomplete

var comuni = [];
fetch('/comuni-italiani/comuni.json').then(function (res) {
  return res.json();
}).then(function (data) {
  comuni = data;
});
var input = document.getElementById('cityInput');
var suggestions = document.getElementById('suggestions');
input.addEventListener('input', function () {
  var query = input.value.toLowerCase();
  suggestions.innerHTML = '';
  if (query.length < 2) return;
  var risultati = comuni.filter(function (c) {
    return c.nome.toLowerCase().startsWith(query);
  }).slice(0, 10);
  risultati.forEach(function (c) {
    var li = document.createElement('li');
    li.textContent = c.nome;
    li.addEventListener('click', function () {
      input.value = c.nome;
      suggestions.innerHTML = '';
    });
    suggestions.appendChild(li);
  });
});

function showAdd(annuncio) {
  var date = new Date(annuncio.dataInserimento);
  var format = date.toLocaleString("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  var container = document.getElementById("annunci-container");
  container.style.display = "block"; // O "flex", "grid", ecc.

  var card = document.createElement("div");
  card.classList.add("annuncio-card");
  card.innerHTML = "\n    <div class=\"annuncio-top\">\n      <img class=\"annuncio-img\" src=\"".concat(annuncio.imageUrl, "\" alt=\"Foto annuncio\">\n      <div class=\"annuncio-basic-info\">\n        <div class=\"annuncio-titolo\">").concat(annuncio.titolo, "</div>\n        <div class=\"annuncio-prezzo\">\u20AC ").concat(annuncio.prezzo, "</div>\n      </div>\n    </div>\n    <div class=\"annuncio-dettagli\">\n      <div class=\"annuncio-descrizione\">").concat(annuncio.descrizione, "</div>\n      <div class=\"annuncio-extra\">\n        <div class=\"annuncio-comune\">Comune: ").concat(annuncio.comune, "</div>\n        <div class=\"annuncio-tipologia\">Tipologia: ").concat(annuncio.tipologia, "</div>\n        <div class=\"annuncio-condizione\">Condizione: ").concat(annuncio.condizione, "</div>\n        <div class=\"annuncio-contatto\">Contatto: ").concat(annuncio.contatto, "</div>\n        <div class=\"dataInserimento\">Data inserimento: ").concat(format, "</div>\n      </div>\n    </div>\n  ");
  container.appendChild(card);
}