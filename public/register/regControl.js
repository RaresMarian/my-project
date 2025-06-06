
let credential;
const getId = id => document.getElementById(id);

// Primo click: registrazione
getId("register-btn").addEventListener("click", async (event) => {
  event.preventDefault();

  const form = getId("register-form");
  if (form && !form.checkValidity()) {
    return form.reportValidity();
  }

  let sex;
  if (getId("sex-male").checked) {
    sex = getId("sex-male").value;
  } else if (getId("sex-female").checked) {
    sex = getId("sex-female").value;
  }

  credential = {
    name: getId("name").value,
    surname: getId("surname").value,
    sex: sex,
    birth_date: getId("birth_date").value,
    email: getId("email").value,
    password: getId("password").value
  };

  try {
    // Invia i dati al server
    const res = await fetch('/send-email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credential)
    });
    if (res.status==400){
      alert("email gia esistente")
      return;
    }
    const data= await res.json();
   
    if (data){
      document.getElementById("code-section").style.display = "block";}

  } catch (err) {
    console.error("Errore durante la registrazione:", err);
  }
});


getId("verify-btn").addEventListener("click", () => {
  const form = getId("register-form"); // aggiunto qui
  const code = document.getElementById("verification-code").value;
  
  fetch('/verify-code', {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
  },
     body: JSON.stringify({...credential,code})
  })
  .then(async res => {
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      form.reset();
      const toast = document.getElementById("success-toast");
      toast.style.display = "block";
      setTimeout(()=>{window.location.href ='/';},3000);
    } else {
      alert("Errore: " + data.error); // Mostra "Codice errato"
    }
  })
  .catch(() => alert("Errore di rete"));
})


 
 // const data = await response.json();
    
