function showSection(id, element) {
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  element.classList.add('active');
}

document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

// Popola i campi del form con i dati dell'utente
function loadUserData() {
  const token = localStorage.getItem('token');
  if (!token) return; // se non loggato, esce

  fetch('/load-info', {
    method: 'GET',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Errore nel caricamento dati: ' + res.status);
    return res.json();
  })
  .then(data => {
    // Inserisce i dati negli input
    console.log(data);
    document.getElementById('nome').value = data.name || '';
    document.getElementById('cognome').value = data.surname || '';
    document.getElementById('dataNascita').value = data.birth_date ? data.birth_date.split('T')[0] : '';
    document.getElementById('email').value = data.email || '';

    
  })
  .catch(err => console.error(err));
}

// Esegui quando la pagina è pronta
window.addEventListener('DOMContentLoaded', () => {
  loadUserData();
});

function deleteAccount() {
  const popup = document.getElementById('confirm-popup');
  popup.style.display = 'flex';

  document.getElementById('cancel-btn').onclick = () => {
    popup.style.display = 'none';
  };

  document.getElementById('confirm-btn').onclick = () => {
    popup.style.display = 'none';
    proceedDeleteAccount();
  };
}

function proceedDeleteAccount() {
  const token = localStorage.getItem('token');

  fetch('/delete-user', {
    method: 'DELETE',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Errore HTTP ' + res.status);
    return res.json();
  })
  .then(data => {
    if (data.success) {
      showMessage('Account eliminato con successo', true);
      localStorage.removeItem('token');
      setTimeout(() => window.location.href = '/', 1500);
    } else {
      showMessage('Errore: ' + data.error, false);
    }
  })
  .catch(err => console.error(err));
}

function showMessage(msg, success = true) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = msg;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '20px';
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translateX(-50%)';
  messageDiv.style.padding = '10px 20px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.color = '#fff';
  messageDiv.style.background = success ? '#2ecc71' : '#e74c3c';
  messageDiv.style.zIndex = 10000;
  document.body.appendChild(messageDiv);

  setTimeout(() => messageDiv.remove(), 2000);
}