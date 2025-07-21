<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>My Profile</h2>
      <p class="subtitle">Edit your personal information</p>

      <!-- Section photo de profil -->
      <div class="profile-photo-section">
        <img
          :src="profilePhotoPreview || sessionUser?.avatar_url || defaultPhoto"
          alt="Profile Photo"
          class="profile-photo"
        />
        <input type="file" @change="onPhotoSelected" accept="image/*" />
      </div>

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

      <hr />

      <div class="logout-link">
        <span>Want to log out?</span>
        <button @click="handleLogout">Log Out</button>
      </div>
    </div>

    <!-- Reservation Section -->
    <div class="reservations-card">
      <h2>My Reservations</h2>
      <p class="subtitle">List of your booked aircraft</p>

      <div v-if="reservations.length > 0">
        <ul class="reservation-list">
          <li
            v-for="reservation in reservations"
            :key="reservation.id"
            :class="['reservation-item', reservation.status]"
            @click="selectedReservation = reservation"
          >
            <span><strong>Date:</strong> {{ formatDate(reservation.reservation_date) }}</span>
            <span><strong>Aircraft ID:</strong> {{ reservation.aircraft_id }}</span>
            <span class="status-line">
              <strong>Status:</strong>
              <span class="status-badge" :class="reservation.status">{{ reservation.status }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-reservations">You have no reservations.</p>
      </div>
    </div>

    <!-- Reservation Popup -->
    <ReservationPopup
      v-if="selectedReservation"
      :reservation="selectedReservation"
      @close="selectedReservation = null"
      @updated="onStatusUpdated"
    />
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
  saveUserToLocalStorage,
} from '@/stores/auth'

import ReservationPopup from '@/components/ReservationPopup.vue'
import defaultPhoto from '../assets/user.png'

const router = useRouter()

const _firstName = ref('')
const _lastName = ref('')
const _email = ref('')
const _username = ref('')
const reservations = ref<any[]>([])
const selectedReservation = ref<any | null>(null)

// Pour gérer la photo de profil
const profilePhotoFile = ref<File | null>(null)
const profilePhotoPreview = ref<string>('')

onMounted(async () => {
  loadUserFromLocalStorage()

  if (!token.value || !sessionUser.value) {
    router.push('/login')
    return
  }

  _firstName.value = sessionUser.value.first_name || ''
  _lastName.value = sessionUser.value.last_name || ''
  _email.value = sessionUser.value.email || ''
  _username.value = sessionUser.value.username || ''

  try {
    const res = await fetch('/api/profile/reservations', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (res.ok) {
      reservations.value = await res.json()
    } else {
      reservations.value = []
    }
  } catch (error) {
    console.error('Failed to load reservations:', error)
  }
})

function onPhotoSelected(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    profilePhotoFile.value = target.files[0]

    // Aperçu immédiat
    const reader = new FileReader()
    reader.onload = e => {
      profilePhotoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(profilePhotoFile.value)
  }
}

async function saveChanges() {
  const formData = new FormData()
  formData.append('username', _username.value.trim())
  formData.append('email', _email.value.trim())

  if (profilePhotoFile.value) {
    formData.append('profile_photo', profilePhotoFile.value)
  }

  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token.value}`,
      // Pas de Content-Type, multipart géré automatiquement
    },
    body: formData,
  })

  if (res.ok && sessionUser.value) {
    const updatedUser = await res.json()
    sessionUser.value.email = updatedUser.user.email
    sessionUser.value.username = updatedUser.user.username
    sessionUser.value.avatar_url = updatedUser.user.avatar_url
    saveUserToLocalStorage()
    await router.push('/profile')
  } else {
    alert('Failed to update profile. Please try again.')
  }
}

function handleLogout() {
  logout()
  router.push('/login')
}

function onStatusUpdated(newStatus: string) {
  if (selectedReservation.value) {
    selectedReservation.value.status = newStatus
  }
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  background: #f4f6f9;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.profile-card,
.reservations-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 420px;
}

.profile-card h2,
.reservations-card h2 {
  margin-bottom: 0.5rem;
  color: #222;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #777;
  font-size: 0.9rem;
}

.profile-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid #2f7cff;
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
  border-color: #2f7cff;
  outline: none;
}

.profile-card button {
  background: #2f7cff;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.profile-card button:hover {
  background: #255fcc;
}

.logout-link {
  color: #666;
  font-size: 0.9rem;
}

.logout-link button {
  background: none !important;
  border: none;
  color: #2f7cff;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 0.3rem;
}

.logout-link button:hover {
  color: #255fcc;
}

hr {
  margin: 1.5rem 0 0.5rem;
  border: none;
  border-top: 1px solid #ddd;
}

.reservations-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.reservations-card h2 {
  color: #222;
  margin-bottom: 0.5rem;
  text-align: center;
}

.reservation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reservation-list li {
  background: #f0f4ff;
  border-left: 4px solid #2f7cff;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background 0.3s;
  cursor: pointer;
}

.reservation-list li:hover {
  background: #e7efff;
}

.reservation-list strong {
  color: #2f7cff;
  font-weight: 600;
}

.reservation-list li span {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.95rem;
}

.no-reservations {
  text-align: center;
  font-style: italic;
  color: #999;
  margin-top: 1rem;
}

.status-badge {
  width: 100%;
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: capitalize;
}

.status-line {
  width: 100%;
  display: inline-flex !important;
  align-items: center;
  gap: 0.5rem;
}

.pending {
  color: #856404;
  background-color: #fff3cd;
}

.confirmed {
  color: #155724;
  background-color: #d4edda;
}

.cancelled {
  color: #721c24;
  background-color: #f8d7da;
}
</style>
