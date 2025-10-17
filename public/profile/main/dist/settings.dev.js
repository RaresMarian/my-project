"use strict";

function showSection(id, element) {
  document.querySelectorAll('section').forEach(function (s) {
    return s.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.sidebar li').forEach(function (li) {
    return li.classList.remove('active');
  });
  element.classList.add('active');
}

function deleteAccount(userId) {
  fetch("/delete-user/".concat(userId), {
    method: 'DELETE'
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.success) {
      alert('Account cancellato!');
      window.location.href = '/';
    } else {
      alert('Errore: ' + data.error);
    }
  })["catch"](function (err) {
    return console.error(err);
  });
}