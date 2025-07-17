<template>
  <h2 id="welcome"></h2>
  <a href="#" onclick="logout()">Logout</a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Define the user type
interface SessionUser {
  username: string;
}

// Utility to get session user safely
function getSessionUser(): SessionUser | null {
  const raw = localStorage.getItem('sessionUser')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

// Redirect or show welcome message
onMounted(() => {
  const sessionUser = getSessionUser()
  if (!sessionUser) {
    window.location.href = 'login.html'
    return
  }

  const welcomeElement = document.getElementById('welcome')
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${sessionUser.username}!`
  }
})

// Logout function
function logout() {
  localStorage.removeItem('sessionUser')
  window.location.href = 'login.html'
}
</script>

