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

// Autocomplete comuni italiani
let comuni = [];

fetch('/comuni-italiani/comuni.json')
  .then(res => res.json())
  .then(data => { comuni = data; });

const input = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase();
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
      suggestions.innerHTML = '';
    });
    suggestions.appendChild(li);
  });
});

// Quando la pagina è pronta
document.addEventListener("DOMContentLoaded", function () {
  if (token) {
    // Verifica token
    fetch('/verify', {
      method: "GET",
      headers: { "x-auth-token": token }
    }).then(res => {
      if (res.status === 400) return;
      console.log('Token valido');
    });

    // Dati utente
    fetch('/load-info', {
      method: 'GET',
      headers: { "x-auth-token": token }
    })
      .then(res => res.json())
      .then(user => {
       document.getElementById('user-name').innerHTML=user.name;
       const drop_down_menu = document.querySelector('.dropdown-menu');
       const new_opt = document.createElement('div');
       new_opt.classList.add('dropdown-item'); // stile del menu
       const link = document.createElement('a');
       link.innerText = "I miei annunci";
       link.href ='../my-adds/adds.html'; 
       link.classList.add('menu-link'); // se vuoi aggiungere uno stile specifico
       new_opt.appendChild(link);
       drop_down_menu.appendChild(new_opt);

        
      })
      .catch(err => console.error(err));

  }

  // Ricerca personalizzata
  document.querySelector(".detect-btn").addEventListener("click", () => {
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
        console.log("Dati ricevuti:", data);

        if (!Array.isArray(data)) throw new Error("La risposta non è un array di annunci");

        const container = document.getElementById("annunci-container");
        container.innerHTML = "";

        if (data.length === 0) {
          container.innerHTML = "<p>Nessun annuncio trovato.</p>";
          return;
        }

        data.forEach(annuncio => showAdd(annuncio));

        const countContainer = document.querySelector('.online_count');
        countContainer.textContent = `Annunci trovati: ${data.length}`;
      })
      .catch(err => console.error("Errore nel caricamento annunci:", err));
  });
});
