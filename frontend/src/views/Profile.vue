<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>My Profile</h2>
      <p class="subtitle">Edit your personal information</p>

      <form @submit.prevent="saveChanges">
        <input type="text" v-model="firstName" placeholder="First Name" />
        <input type="text" v-model="lastName" placeholder="Last Name" />
        <input type="email" v-model="email" placeholder="Email" />
        <input type="text" v-model="username" readonly placeholder="Username" />
        <button type="submit">Save Changes</button>
      </form>

      <hr>

      <div class="logout-link">
        <span>Want to log out?</span>
        <button @click="logout">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface SessionUser {
  username: string
  first_name?: string
  last_name?: string
  email?: string
}

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')

const sessionUser: SessionUser | null = null

onMounted(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || !user) {
    router.push('/login')
    return
  }

  try {
    if (!user || !user.username) throw new Error()

    firstName.value = user.first_name || ''
    lastName.value = user.last_name || ''
    email.value = user.email || ''
    username.value = user.username
  } catch {
    router.push('/login')
  }
})

function saveChanges() {
  if (!sessionUser) return

  sessionUser.first_name = firstName.value.trim()
  sessionUser.last_name = lastName.value.trim()
  sessionUser.email = email.value.trim()

  localStorage.setItem('sessionUser', JSON.stringify(sessionUser))

  const rawUsers = localStorage.getItem('users') || '[]'
  let users: SessionUser[] = []

  try {
    users = JSON.parse(rawUsers)
  } catch {
    users = []
  }

  const index = users.findIndex((u) => u.username === sessionUser?.username)
  if (index >= 0) {
    users[index] = sessionUser
    localStorage.setItem('users', JSON.stringify(users))
    alert('Profile updated')
  }
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.profile-container {
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

.profile-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 420px;
  text-align: center;
}

.profile-card h2 {
  margin-bottom: 0.5rem;
  color: #222;
}

.subtitle {
  margin-bottom: 2rem;
  color: #777;
  font-size: 0.9rem;
}

.profile-card form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-card input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.profile-card input:focus {
  border-color: #2F7CFF;
  outline: none;
}

.profile-card button {
  background: #2F7CFF;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.profile-card button:hover {
  background: #255FCC;
}

.logout-link {
  color: #666;
  font-size: 0.9rem;
}

.logout-link button {
  background: none !important;
  border: none;
  color: #2F7CFF;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 0.3rem;
}

.logout-link button:hover {
  color: #255FCC;
}

hr {
  margin: 1.5rem 0 0.5rem;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
