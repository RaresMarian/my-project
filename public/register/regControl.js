let credential;
const getId = id => document.getElementById(id);

// Primo click: registrazione
getId("register-btn").addEventListener("click", async (event) => {
  event.preventDefault();

  const form = getId("register-form");
  if (form && !form.checkValidity()) {
    return form.reportValidity();
  }

  const sex = getId("sex-male").checked
    ? getId("sex-male").value
    : getId("sex-female").checked
    ? getId("sex-female").value
    : null;

  credential = {
    name: getId("name").value.trim(),
    surname: getId("surname").value.trim(),
    sex,
    birth_date: getId("birth_date").value,
    email: getId("email").value.trim().toLowerCase(),
    password: getId("password").value
  };

  try {
    const res = await fetch('/send-email', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credential)
    });

    if (res.status === 400) {
      alert("Email già esistente");
      return;
    }

    const data = await res.json();
    if (data) {
      const codeSection = getId("code-section");
      codeSection.style.display = "block";
      codeSection.style.opacity = 0;
      setTimeout(() => codeSection.style.opacity = 1, 100); // effetto fade-in
    }

  } catch (err) {
    console.error("Errore durante la registrazione:", err);
    alert("Errore di rete durante la registrazione");
  }
});

// Verifica codice
getId("verify-btn").addEventListener("click", async () => {
  const form = getId("register-form");
  const code = getId("verification-code").value.trim();

  if (!code) {
    alert("Inserisci il codice di verifica");
    return;
  }

  try {
    const res = await fetch('/verify-code', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...credential, code })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token || '');
      form.reset();

      // Mostra il toast
      const toast = getId("success-toast");
      toast.classList.add("show"); // fade-in

      // Dopo 2.5s fai fade-out e redirect
      setTimeout(() => {
        toast.classList.remove("show"); // fade-out
        setTimeout(() => {
          window.location.href = '/profile/main/profile_page.html';
        }, 600); // durata della transizione
      }, 2500);

    } else {
      alert("Errore: " + (data.error || "Codice errato"));
    }

  } catch {
    alert("Errore di rete durante la verifica");
  }
});

    
