<template>
  <h2>My Profile</h2>
  <form @submit.prevent="saveChanges">
    <label>
      First Name
      <input type="text" v-model="firstName" />
    </label>
    <label>
      Last Name
      <input type="text" v-model="lastName" />
    </label>
    <label>
      Email
      <input type="email" v-model="email" />
    </label>
    <label>
      Username
      <input type="text" v-model="username" readonly />
    </label>
    <button type="submit">Save Changes</button>
  </form>
  <a href="#" @click.prevent="logout">Logout</a>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Types
interface SessionUser {
  username: string
  first_name?: string
  last_name?: string
  email?: string
}

// Router
const router = useRouter()

// Reactive variables
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')

let sessionUser: SessionUser | null = null

onMounted(() => {
  const rawUser = localStorage.getItem('token')
  if (!rawUser) {
    router.push('/login')
    return
  }

  try {
    sessionUser = JSON.parse(rawUser)
    if (!sessionUser || !sessionUser.username) {
      throw new Error()
    }

    // Populate form fields
    /*
    firstName.value = sessionUser.first_name || ''
    lastName.value = sessionUser.last_name || ''
    email.value = sessionUser.email || ''
    username.value = sessionUser.username*/
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
  localStorage.removeItem('sessionUser')
  router.push('/login')
}
</script>
