document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titolo = document.getElementById("titolo").value;
    const descrizione = document.getElementById("descrizione").value;
    const prezzo = document.getElementById("prezzo").value;
    const comune = document.getElementById("comune").value;
    const contatto = document.getElementById("contatto").value;
    const categoria = document.getElementById("categoria").value;
    const condizioni = document.getElementById("condizioni").value;

    const fileInput = document.getElementById("immagine");
    const file = fileInput.files[0];
    if (!file) {
      alert("Per favore seleziona un'immagine.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("titolo", titolo);
    formData.append("descrizione", descrizione);
    formData.append("prezzo", prezzo);
    formData.append("comune", comune);
    formData.append("contatto", contatto);
    formData.append("categoria", categoria);
    formData.append("condizione", condizioni);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Accesso non autorizzato. Effettua il login.");
      return;
    }

    fetch("/insert-add", {
      method: "POST",
      headers: {
        "x-auth-token": token},
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Annuncio salvato:", data);

        // Mostra anteprima
        const reader = new FileReader();
        reader.onload = function (event) {
          const card = document.createElement("div");
          card.className = "annuncio-card";
          card.innerHTML = `
            <img src="${event.target.result}" class="annuncio-img" alt="Anteprima immagine">
            <div class="annuncio-info">
              <h3>${titolo}</h3>
              <p><strong>Descrizione:</strong> ${descrizione}</p>
              <p><strong>Prezzo:</strong> €${prezzo}</p>
              <p><strong>Comune:</strong> ${comune}</p>
            </div>
          `;
          document.getElementById("annunciPreview").appendChild(card);
          document.getElementById("immaginePreview").style.display = "none";
          form.reset();
        };
        reader.readAsDataURL(file);
      })
      .catch(err => {
        console.error("❌ Errore salvataggio annuncio:", err);
        alert("Errore nel salvataggio dell'annuncio.");
      });
  });
});

