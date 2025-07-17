<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">
        Please login to your <b>Air Franche Compté</b> account
      </p>

      <form @submit.prevent="login">
        <input
          v-model="username"
          placeholder="Username"
          type="text"
          required
        />
        <input
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>

        <button type="button" class="register-btn" @click="goToRegister">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  });

  if (res.ok) {
    router.push('/profile');

    const data = await res.json();
    console.log(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

  } else {
    alert('Invalid credentials');
  }
}

function goToRegister() {
  router.push('/register');
}
</script>

<style scoped>
:global(html, body) {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f4f6f9;
}

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.login-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 380px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 0.5rem;
  color: #222;
}

.subtitle {
  margin-bottom: 2rem;
  color: #777;
  font-size: 0.9rem;
}

.login-card form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-card input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.login-card input:focus {
  border-color: #2F7CFF;
  outline: none;
}

/* bouton Login */
.login-card button[type="submit"] {
  background: #2F7CFF;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-card button[type="submit"]:hover {
  background: #255FCC;
}

/* bouton Register inversé */
.register-btn {
  background: #fff;
  color: #2F7CFF;
  border: 2px solid #2F7CFF;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background: #2F7CFF;
  color: #fff;
}
</style>
