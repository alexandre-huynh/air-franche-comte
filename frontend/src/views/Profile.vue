<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>My Profile</h2>
      <p class="subtitle">Edit your personal information</p>

      <form @submit.prevent="saveChanges">
        <label for="firstName">First Name</label>
        <input type="text" v-model="_firstName" readonly placeholder="First Name" />
        <label for="lastName">Last Name</label>
        <input type="text" v-model="_lastName" readonly placeholder="Last Name" />
        <label for="email">Email</label>
        <input type="email" v-model="_email" placeholder="Email" />
        <label for="username">Username</label>
        <input type="text" v-model="_username" placeholder="Username" />
        <button type="submit">Save Changes</button>
      </form>

      <hr>

      <div class="logout-link">
        <span>Want to log out?</span>
        <button @click="handleLogout">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  loadUserFromLocalStorage,
  logout,
  token,
  sessionUser,
  saveUserToLocalStorage
} from '@/stores/auth'


const router = useRouter()

const _firstName = ref('')
const _lastName = ref('')
const _email = ref('')
const _username = ref('')

onMounted(() => {

  loadUserFromLocalStorage();

  if (!token.value || !sessionUser.value) {
    router.push('/login')
    return
  }

  _firstName.value = sessionUser.value.first_name || ''
  _lastName.value = sessionUser.value.last_name || ''
  _email.value = sessionUser.value.email || ''
  _username.value = sessionUser.value.username || ''
})

interface UpdateUser {
  username: string
  email: string
}

async function saveChanges() {
  const updateUser: UpdateUser = {
    username: _username.value.trim(),
    email: _email.value.trim()
  };

  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token.value}` },
    body: JSON.stringify(updateUser)
  });

  if (res.ok && sessionUser.value) {
    sessionUser.value.email = updateUser.email;
    sessionUser.value.username = updateUser.username;
    saveUserToLocalStorage()
    await router.push('/profile')
  } else {
    alert('Failed to update profile. Please try again.');
  }
}

function handleLogout() {
  logout()
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
}

.profile-card label {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
  text-align: left;
}

.profile-card input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.profile-card input[readonly] {
  background: #f9f9f9;
  cursor: not-allowed;
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
