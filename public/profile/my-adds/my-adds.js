
const token = localStorage.getItem("token");


fetch('/show-my-adds', { 
    method: 'GET',
    headers: { "x-auth-token": token }
})
.then(res => res.json())
.then(data => { data.forEach(showAdd); });

function showAdd(annuncio) {
  const container = document.getElementById("annunci-container");

  const card = document.createElement("div");
  card.classList.add("annuncio-card");

  card.innerHTML = `
    <div style="position: relative; height: 30px;">
      <button class="modifica-btn" 
        style="position: absolute; top: 0; right: 0; border: none; background: transparent; cursor: pointer;" 
        title="Modifica">✏️
      </button>
    </div>
    <div class="annuncio-top">
      <img class="annuncio-img" src="${annuncio.imageUrl || '/img/default.png'}" alt="Foto annuncio">
      <div class="annuncio-basic-info">
        <div class="annuncio-titolo">${annuncio.titolo}</div>
        <div class="annuncio-prezzo">€ ${annuncio.prezzo}</div>
      </div>
    </div>
    <div class="annuncio-dettagli">
      <div class="annuncio-descrizione">${annuncio.descrizione}</div>
    </div>
  `;

  container.appendChild(card);

  const btnModifica = card.querySelector(".modifica-btn");
  btnModifica.addEventListener("click", () => {
    startEditing(card, btnModifica);
  });
}

function startEditing(card, btnModifica) {
  const titolo = card.querySelector(".annuncio-titolo");
  const prezzo = card.querySelector(".annuncio-prezzo");
  const descrizione = card.querySelector(".annuncio-descrizione");

  [titolo, prezzo, descrizione].forEach(el => {
    el.contentEditable = "true";
    el.style.border = "1px dashed green";
  });

  btnModifica.style.display = "none";


  const btnSalva = document.createElement("button");
  btnSalva.textContent = "Salva";
  btnSalva.style.marginRight = "5px";

  const btnAnnulla = document.createElement("button");
  btnAnnulla.textContent = "Annulla";


  card.appendChild(btnSalva);
  card.appendChild(btnAnnulla);

 
  const original = {
    titolo: titolo.textContent,
    prezzo: prezzo.textContent,
    descrizione: descrizione.textContent
  };

  btnSalva.addEventListener("click", () => {
    console.log("Salvato:", {
      titolo: titolo.textContent,
      prezzo: prezzo.textContent,
      descrizione: descrizione.textContent
    });

    stopEditing(card, btnModifica, btnSalva, btnAnnulla);
  });

  btnAnnulla.addEventListener("click", () => {
    titolo.textContent = original.titolo;
    prezzo.textContent = original.prezzo;
    descrizione.textContent = original.descrizione;

    stopEditing(card, btnModifica, btnSalva, btnAnnulla);
  });
}

function stopEditing(card, btnModifica, btnSalva, btnAnnulla) {
  const titolo = card.querySelector(".annuncio-titolo");
  const prezzo = card.querySelector(".annuncio-prezzo");
  const descrizione = card.querySelector(".annuncio-descrizione");

  [titolo, prezzo, descrizione].forEach(el => {
    el.contentEditable = "false";
    el.style.border = "none";
  });

  btnSalva.remove();
  btnAnnulla.remove();

  btnModifica.style.display = "inline-block";
}
