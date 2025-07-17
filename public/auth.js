// Register
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = e.target.username.value.trim();
  const password = e.target.password.value.trim();
  const confirm = e.target.confirm_password.value.trim();
  const first_name = e.target.first_name.value.trim();
  const last_name = e.target.last_name.value.trim();
  const email = e.target.email.value.trim();

  if (password !== confirm) {
    alert('Passwords do not match');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.username === username)) {
    alert('Username already exists');
    return;
  }

  users.push({ username, password, first_name, last_name, email });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful');
});

// Login
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = e.target.username.value.trim();
  const password = e.target.password.value.trim();

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('sessionUser', JSON.stringify(user));
    alert('Login successful');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
});