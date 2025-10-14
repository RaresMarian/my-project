const token = localStorage.getItem("token");

// Funzione per mostrare ogni annuncio
function showAdd(annuncio) {
  const dataInserimento = new Date(annuncio.createdAt);
  const format = dataInserimento.toLocaleString("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const container = document.getElementById("annunci-container");
  container.style.display = "block";
  const card = document.createElement("div");
  card.classList.add("annuncio-card");

  card.innerHTML = `
    <div class="annuncio-top">
      <img class="annuncio-img" src="${annuncio.imageUrl || '/img/default.png'}" alt="Foto annuncio">
      <div class="annuncio-basic-info">
        <div class="annuncio-titolo">${annuncio.titolo}</div>
        <div class="annuncio-prezzo">€ ${annuncio.prezzo}</div>
      </div>
    </div>
    <div class="annuncio-dettagli">
      <div class="annuncio-descrizione">${annuncio.descrizione}</div>
      <div class="annuncio-extra">
        <div class="annuncio-comune">Comune: ${annuncio.comune}</div>
        <div class="annuncio-categoria">Categoria: ${annuncio.categoria}</div>
        <div class="annuncio-condizione">Condizione: ${annuncio.condizione}</div>
        <div class="annuncio-contatto">Contatto: ${annuncio.contatto}</div>
        <div class="dataInserimento">Data inserimento: ${format}</div>
      </div>
    </div>
  `;

  container.appendChild(card);
}

// =========================================
// AUTOCOMPLETE COMUNI ITALIANI
// =========================================
let comuni = [];

fetch('/comuni-italiani/comuni.json')
  .then(res => res.json())
  .then(data => { comuni = data; })
  .catch(err => console.error("Errore nel caricamento comuni:", err));

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById('cityInput');
  const suggestions = document.getElementById('suggestions');

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    suggestions.innerHTML = '';

    if (query.length < 2) return;

    const risultati = comuni
      .filter(c => c.nome.toLowerCase().startsWith(query))
      .slice(0, 10);

    risultati.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c.nome;
      li.addEventListener('click', () => {
        input.value = c.nome;
        suggestions.innerHTML = ''; // chiude i suggerimenti
      });
      suggestions.appendChild(li);
    });

    // Mostra i suggerimenti solo se ci sono risultati
    suggestions.style.display = risultati.length > 0 ? "block" : "none";
  });

  // Chiude i suggerimenti quando si clicca fuori
  document.addEventListener("click", (e) => {
    if (!suggestions.contains(e.target) && e.target !== input) {
      suggestions.innerHTML = '';
    }
  });

  // =========================================
  // GESTIONE LOGIN / MENU UTENTE
  // =========================================
  if (token) {
    fetch('/verify', {
      method: "GET",
      headers: { "x-auth-token": token }
    }).then(res => {
      if (res.status === 400) return;
      console.log('Token valido');
    });

    fetch('/load-info', {
      method: 'GET',
      headers: { "x-auth-token": token }
    })
      .then(res => res.json())
      .then(user => {
        const drop_down_menu = document.querySelector('.dropdown-menu');

        const new_opt = document.createElement('div');
        new_opt.classList.add('dropdown-item');
        const link = document.createElement('a');
        link.innerText = "I miei annunci";
        link.href = '../my-adds/adds.html';
        link.classList.add('menu-link');
        new_opt.appendChild(link);

        const settings_opt = document.createElement('div');
        settings_opt.classList.add('dropdown-item');
        const settings = document.createElement('a');
        settings.innerText = "Impostazioni";
        settings.href = './settings.html';
        settings.classList.add('menu-link');
        settings_opt.appendChild(settings);

        const exit_opt = document.createElement('div');
        exit_opt.classList.add('dropdown-item');

        const exit_link = document.createElement('a');
        exit_link.innerText = "Esci";
        exit_link.href = "#";
        exit_link.classList.add('menu-link');

        exit_link.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('token');
          window.location.reload();
        });

        exit_opt.appendChild(exit_link);
        drop_down_menu.appendChild(new_opt);
        drop_down_menu.appendChild(settings_opt);
        drop_down_menu.appendChild(exit_opt);


      })
      .catch(err => console.error(err));
  } else {
    const drop_down_menu = document.querySelector('.dropdown-menu');
    const new_opt = document.createElement('div');
    new_opt.classList.add('dropdown-item');
    const link = document.createElement('a');
    link.innerText = "Accedi";
    link.href = '/login/login.html';
    link.classList.add('menu-link');
    new_opt.appendChild(link);
    drop_down_menu.appendChild(new_opt);
  }

  // =========================================
  // FUNZIONE DI RICERCA
  // =========================================
  function avviaRicerca() {
    const what = document.getElementById("what").value.trim();
    const categorySelect = document.getElementById("category");
    const category = categorySelect.value === "Tutte le categorie" ? "" : categorySelect.value;
    const where = document.getElementById("cityInput").value.trim();

    const url = `/show-adds?what=${encodeURIComponent(what)}&category=${encodeURIComponent(category)}&where=${encodeURIComponent(where)}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Errore nella risposta del server");
        return res.json();
      })
      .then(data => {
        const container = document.getElementById("annunci-container");
        container.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = "<p>Nessun annuncio trovato.</p>";
          return;
        }

        data.forEach(annuncio => showAdd(annuncio));

        const countContainer = document.querySelector('.online_count');
        countContainer.textContent = `Annunci trovati: ${data.length}`;
      })
      .catch(err => console.error("Errore nel caricamento annunci:", err));

    // Chiude i suggerimenti
    suggestions.innerHTML = '';
  }

  // 🔍 Click sul pulsante Cerca
  document.querySelector(".detect-btn").addEventListener("click", avviaRicerca);

  // 🔹 Invio dentro il campo città
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      avviaRicerca();
    }
  });
});
