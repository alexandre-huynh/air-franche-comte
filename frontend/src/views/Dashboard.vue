<template>
  <h2 id="welcome"></h2>
    <a href="#" onclick="logout()">Logout</a>
</template>
  <script>
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (!sessionUser) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('welcome').textContent = `Welcome, ${sessionUser.username}!`;
  }
  function logout() {
    localStorage.removeItem('sessionUser');
    window.location.href = 'login.html';
  }
  </script>
