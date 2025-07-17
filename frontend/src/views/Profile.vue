<template>
  <h2>My Profile</h2>
  <form id="profile-form">
  <label>First Name <input type="text" name="first_name"></label>
  <label>Last Name <input type="text" name="last_name"></label>
  <label>Email <input type="email" name="email"></label>
  <label>Username <input type="text" name="username" readonly></label>
  <button type="submit">Save Changes</button>
  </form>
  <a href="#" onclick="logout()">Logout</a>
</template>
  <script>
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  if (!sessionUser) {
    window.location.href = 'login.html';
  } else {
    const form = document.getElementById('profile-form');
    form.first_name.value = sessionUser.first_name || "";
    form.last_name.value = sessionUser.last_name || "";
    form.email.value = sessionUser.email || "";
    form.username.value = sessionUser.username;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      sessionUser.first_name = form.first_name.value.trim();
      sessionUser.last_name = form.last_name.value.trim();
      sessionUser.email = form.email.value.trim();
      localStorage.setItem('sessionUser', JSON.stringify(sessionUser));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(u => u.username === sessionUser.username);
      if (index >= 0) {
        users[index] = sessionUser;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Profile updated');
      }
    });
  }

  function logout() {
    localStorage.removeItem('sessionUser');
    window.location.href = 'login.html';
  }
  </script>