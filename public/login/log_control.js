
 window.addEventListener("pageshow", function (event) {
    // Se esiste un token salvato, reindirizza
    const token = localStorage.getItem('token');
    if (token) {
      window.location.replace("/");
    }
  });

function verificaCredenziali() {
  const email = document.getElementById("id_email").value.trim();
  const password = document.getElementById("password").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    alert("Digita un'email");
    return;
  }

  if (email.length < 4) {
    alert("Email troppo corta");
    return;
  }

  if (!regex.test(email)) {
    alert("Email non valida ❌");
    return;
  }

  if (password.length === 0) {
    alert("Inserisci la password ❌");
    return;
  }

  if (password.length < 5) {
    alert("Inserisci una password valida ❌");
    return;
  }
  connTo(email,password);
  

}

async function connTo(email,password){
  const response = await fetch("/authentication",{

    method:"POST",
    headers:{'Content-Type':'application/json'},

    body: JSON.stringify({email,password})

  });
  if (response.status==200){
    const data = await response.json();
    const form = document.getElementById('form');
    localStorage.setItem("token",data.token);
    form.reset();
    setTimeout(()=> {window.location.href='/'},1000);}

    
  else{
    const pass = document.getElementById('password');
    pass.value="";
    alert("Email o password non valide");
  }

}






  





