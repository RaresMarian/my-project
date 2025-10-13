"use strict";

var token = localStorage.getItem("token"); // Funzione per mostrare ogni annuncio

function showAdd(annuncio) {
  var dataInserimento = new Date(annuncio.createdAt);
  var format = dataInserimento.toLocaleString("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  var container = document.getElementById("annunci-container");
  container.style.display = "block";
  var card = document.createElement("div");
  card.classList.add("annuncio-card");
  card.innerHTML = "\n    <div class=\"annuncio-top\">\n      <img class=\"annuncio-img\" src=\"".concat(annuncio.imageUrl || '/img/default.png', "\" alt=\"Foto annuncio\">\n      <div class=\"annuncio-basic-info\">\n        <div class=\"annuncio-titolo\">").concat(annuncio.titolo, "</div>\n        <div class=\"annuncio-prezzo\">\u20AC ").concat(annuncio.prezzo, "</div>\n      </div>\n    </div>\n    <div class=\"annuncio-dettagli\">\n      <div class=\"annuncio-descrizione\">").concat(annuncio.descrizione, "</div>\n      <div class=\"annuncio-extra\">\n        <div class=\"annuncio-comune\">Comune: ").concat(annuncio.comune, "</div>\n        <div class=\"annuncio-categoria\">Categoria: ").concat(annuncio.categoria, "</div>\n        <div class=\"annuncio-condizione\">Condizione: ").concat(annuncio.condizione, "</div>\n        <div class=\"annuncio-contatto\">Contatto: ").concat(annuncio.contatto, "</div>\n        <div class=\"dataInserimento\">Data inserimento: ").concat(format, "</div>\n      </div>\n    </div>\n  ");
  container.appendChild(card);
} // Autocomplete comuni italiani


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
}); // Quando la pagina è pronta

document.addEventListener("DOMContentLoaded", function () {
  if (token) {
    // Verifica token
    fetch('/verify', {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    }).then(function (res) {
      if (res.status === 400) return;
      console.log('Token valido');
    }); // Dati utente

    fetch('/load-info', {
      method: 'GET',
      headers: {
        "x-auth-token": token
      }
    }).then(function (res) {
      return res.json();
    }).then(function (user) {
      document.getElementById('user-name').innerHTML = user.name;
      var drop_down_menu = document.querySelector('.dropdown-menu');
      var new_opt = document.createElement('div');
      new_opt.classList.add('dropdown-item'); // stile del menu

      var link = document.createElement('a');
      link.innerText = "I miei annunci";
      link.href = '../my-adds/adds.html';
      link.classList.add('menu-link'); // se vuoi aggiungere uno stile specifico

      new_opt.appendChild(link);
      drop_down_menu.appendChild(new_opt);
    })["catch"](function (err) {
      return console.error(err);
    });
  } else {
    var drop_down_menu = document.querySelector('.dropdown-menu');
    var new_opt = document.createElement('div');
    var link = document.createElement('a');
    link.innerText = "Accedi";
    link.href = '/login/login.html';
    new_opt.appendChild(link);
    drop_down_menu.appendChild(new_opt);
  } // Ricerca personalizzata


  document.querySelector(".detect-btn").addEventListener("click", function () {
    var what = document.getElementById("what").value.trim();
    var categorySelect = document.getElementById("category");
    var category = categorySelect.value === "Tutte le categorie" ? "" : categorySelect.value;
    var where = document.getElementById("cityInput").value.trim();
    var url = "/show-adds?what=".concat(encodeURIComponent(what), "&category=").concat(encodeURIComponent(category), "&where=").concat(encodeURIComponent(where));
    fetch(url).then(function (res) {
      if (!res.ok) throw new Error("Errore nella risposta del server");
      return res.json();
    }).then(function (data) {
      console.log("Dati ricevuti:", data);
      if (!Array.isArray(data)) throw new Error("La risposta non è un array di annunci");
      var container = document.getElementById("annunci-container");
      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = "<p>Nessun annuncio trovato.</p>";
        return;
      }

      data.forEach(function (annuncio) {
        return showAdd(annuncio);
      });
      var countContainer = document.querySelector('.online_count');
      countContainer.textContent = "Annunci trovati: ".concat(data.length);
    })["catch"](function (err) {
      return console.error("Errore nel caricamento annunci:", err);
    });
  });
});