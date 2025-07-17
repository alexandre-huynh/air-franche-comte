<template>
  <div v-if="user">
    <h2>My Profile</h2>
    <p>First Name: {{ user.firstName }}</p>
    <p>Last Name: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Username: {{ user.username }}</p>
    <button @click="logout">Logout</button>
    <router-link to="/reservation">Make a Reservation</router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref<any>(null)

onMounted(async () => {
  const res = await fetch('/api/profile', { credentials: 'include' })
  if (res.ok) {
    user.value = await res.json()
  } else {
    router.push('/login')
  }
})

function logout() {
  fetch('/api/logout', { method: 'POST', credentials: 'include' })
  .finally(() => router.push('/login'))
}
</script>