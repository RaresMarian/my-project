const token = localStorage.getItem("token");

fetch('/show-my-adds', {
    method: 'GET',
    headers: { "x-auth-token": token }
})
.then(res => res.json())
.then(data => { data.forEach(showAdd); });


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

