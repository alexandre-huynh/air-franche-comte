<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Create Account</h2>
      <p class="subtitle">Welcome to <i>Air Franche Comté ! </i><br>Please fill in the form to register</p>

      <form @submit.prevent="register">
        <label for="firstName">First Name</label>
        <input
          v-model="firstName"
          placeholder="First Name"
          type="text"
          required
        />
        <label for="lastName">Last Name</label>
        <input
          v-model="lastName"
          placeholder="Last Name"
          type="text"
          required
        />
        <label for="email">Email</label>
        <input
          v-model="email"
          placeholder="Email"
          type="email"
          required
        />
        <label for="username">Username</label>
        <input
          v-model="username"
          placeholder="Username"
          type="text"
          required
        />
        <label for="password">Password</label>
        <input
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Register</button>
      </form>

      <hr>

      <p class="register-link">
        Already have an account?
        <button @click="goToLogin">Login</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const router = useRouter()

async function register() {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value
    })
  })

  if (res.ok) {
    alert('Registration successful! Please login.')
    await router.push('/login')
  } else {
    alert('Registration failed. Please try again.')
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f6f9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.login-container::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("../assets/img/Scylax_GmbH.jpg"); 
  background-position: center;
  background-size: cover; 
  background-repeat: no-repeat; 
  filter: blur(2.5px);
  z-index: -1;
}

.login-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 420px;
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
}

.login-card label {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
  text-align: left;
}

.login-card input {
  margin-bottom: 1rem;
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

.login-card button {
  background: #2F7CFF;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-card button:hover {
  background: #255FCC;
}

.register-link {
  color: #666;
  font-size: 0.9rem;
}

.register-link button {
  background: none !important;
  border: none;
  color: #2F7CFF;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}

.register-link button:hover {
  color: #255FCC;
}

hr {
  margin: 1.5rem 0 0.5rem;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
