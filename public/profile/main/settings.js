function showSection(id, element) {
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  element.classList.add('active');
}

function deleteAccount(userId) {
  fetch(`/delete-user/${userId}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Account cancellato!');
        window.location.href = '/';
      } else {
        alert('Errore: ' + data.error);
      }
    })
    .catch(err => console.error(err));
}


