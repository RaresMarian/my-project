
// Selezioni principali
const elemento = document.querySelector(".Privati");
const apriMenu = document.querySelector(".apri_menu");

window.addEventListener("pageshow", function (event) {
  const token = localStorage.getItem('token');
  let login = document.getElementById('login');
  let register = document.getElementById('register');
  const logoutBtn = document.getElementById('logoutBtn');

  if (token) {
  fetch('/verify', {
    method: "GET",
    headers: { "x-auth-token": token }
  })
  .then(res=>{
    if(res.ok){
      login.style.display = 'none';
      register.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      
    }
    else{
      login.style.display = 'inline-block';
      register.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      localStorage.removeItem("token");


    }
  })
    
} 
else{
      login.style.display = 'inline-block';
      register.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
})

if (elemento) {
  elemento.addEventListener("mouseenter", () => {
    apriMenu.style.display = "grid";
    setTimeout(() => {
      apriMenu.style.opacity = "1";
    }, 10); 
  });
}

// Chiudi menu quando esci dal menu
if (apriMenu) {
  apriMenu.addEventListener("mouseleave", () => {
    apriMenu.style.opacity = "0";
    setTimeout(() => {
      apriMenu.style.display = "none";
    }, 500); 
  });
}

// Logout: rimuove token e ricarica la pagina
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault(); // evita eventuale redirect dal link
  localStorage.removeItem('token');
  window.location.reload();
});

