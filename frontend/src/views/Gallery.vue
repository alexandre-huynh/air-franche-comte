<template>
  <v-container>
    <v-row>
      <v-col
        v-for="plane in planes"
        :key="plane.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="plane.image_url" height="200px" class="fill" />
          <v-card-title>{{ plane.name }}</v-card-title>
          <v-card-subtitle>{{ plane.description }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Located at:</strong> {{ plane.airfield_name }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="openReserveModal(plane)">Reserve</v-btn>
            <v-btn text @click="openInfoModal(plane)">Info</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- INFO MODAL -->
    <v-dialog v-model="isInfoDialogOpen" max-width="600px">
      <v-card v-if="selectedPlane">
        <v-card-title class="d-flex align-center">
          {{ selectedPlane.name }}
          <v-spacer />
          <v-btn icon @click="isInfoDialogOpen = false" class="close-btn" title="Close">×</v-btn>
        </v-card-title>
        <v-card-subtitle>
          Manufacturer: {{ selectedPlane.manufacturer }}
        </v-card-subtitle>
        <v-img :src="selectedPlane.image_url" height="300px" />
        <v-card-text>
          <p><strong>Year:</strong> {{ selectedPlane.year || 'N/A' }}</p>
          <p><strong>Capacity:</strong> {{ selectedPlane.capacity }} passengers</p>
          <p><strong>Range:</strong> {{ selectedPlane.range_km }} km</p>
          <p><strong>Max speed:</strong> {{ selectedPlane.max_speed_kmh }} km/h</p>
          <p><strong>Wi-Fi:</strong> {{ selectedPlane.has_wifi ? 'Yes' : 'No' }}</p>
          <p><strong>Luggage capacity:</strong> {{ selectedPlane.luggage_capacity_kg }} kg</p>
          <p><strong>Description:</strong> {{ selectedPlane.description }}</p>
          <p><strong>Located at:</strong> {{ selectedPlane.airfield_name }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- RESERVE MODAL -->
    <v-dialog v-model="isReserveDialogOpen" max-width="600px">
      <v-card v-if="selectedPlane">
        <v-card-title class="d-flex align-center">
          Reserve: {{ selectedPlane.name }}
          <v-spacer />
          <v-btn icon @click="isReserveDialogOpen = false" class="close-btn" title="Close">×</v-btn>
        </v-card-title>
        <v-card-subtitle>Select your date below</v-card-subtitle>
        <v-card-text>
          <p v-if="sessionUser">
            <strong>You are logged in as:</strong> {{ sessionUser.first_name }} {{ sessionUser.last_name }}
          </p>

          <p><strong>Base price:</strong> ${{ selectedPlane.price }}</p>
          <p><strong>With tax:</strong> ${{ selectedPlane.price_with_tax }}</p>
          <p><strong>Final price with mandatory tips:</strong> ${{ selectedPlane.tips_price }}</p>

          <v-date-picker
            v-model="reservationDate"
            :min="today"
            :allowed-dates="isDateAllowed"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmReservation">Confirm</v-btn>
          <v-btn text @click="isReserveDialogOpen = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { token, sessionUser } from '../stores/auth.ts'
import axios from 'axios'

const router = useRouter()

interface Plane {
  id: number
  name: string
  manufacturer: string
  model: string
  description: string
  image_url: string
  airfield_name: string
  airfield_id: number
  year?: number
  price: number
  price_with_tax: number
  tips_price: number
  capacity: number
  range_km: number
  max_speed_kmh: number
  has_wifi: boolean
  luggage_capacity_kg: number
}

const planes = ref<Plane[]>([])
const selectedPlane = ref<Plane | null>(null)

const isInfoDialogOpen = ref(false)
const isReserveDialogOpen = ref(false)
const reservationDate = ref('')
const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

const reservedDates = ref<string[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/aircraft')
    planes.value = data
  } catch (err) {
    console.error('Failed to load planes:', err)
  }
})

const openInfoModal = (plane: Plane) => {
  selectedPlane.value = plane
  isInfoDialogOpen.value = true
}

const openReserveModal = async (plane: Plane) => {
  if (!token.value) {
    router.push('/login')
    return
  }

  selectedPlane.value = plane
  reservationDate.value = ''
  isReserveDialogOpen.value = true

  try {
    const { data } = await axios.get(`/api/reservations/${plane.id}/dates`)
    reservedDates.value = data
  } catch (err) {
    console.error('Failed to fetch reserved dates', err)
    reservedDates.value = []
  }
}

const isDateAllowed = (date: unknown) => {
  const d = new Date(date as string)
  const dateStr = d.toISOString().split('T')[0]
  return !reservedDates.value.includes(dateStr)
}

const confirmReservation = async () => {
  if (!reservationDate.value) {
    alert('Please select a date!')
    return
  }

  try {
    if (!token.value || !selectedPlane.value || !sessionUser.value) return

    const formattedDate = new Date(reservationDate.value).toISOString().split('T')[0]

    await axios.post('/api/reservations', {
      user_id: sessionUser.value.id,
      aircraft_id: selectedPlane.value.id,
      airfield_id: selectedPlane.value.airfield_id,
      reservation_date: formattedDate
    }, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    alert(`Reservation saved for ${selectedPlane.value?.name} on ${formattedDate}`)
    isReserveDialogOpen.value = false
  } catch (err: any) {
    console.error(err)
    if (err.response?.data?.error) {
      alert(err.response.data.error)
    } else {
      alert("Failed to save reservation!")
    }
  }
}
</script>

<style scoped>
.v-card .v-card-text {
  height: auto;
}

.v-dialog .v-card {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}

.v-dialog .v-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2f2f2f;
  margin-bottom: 0.5rem;
}

.v-dialog .v-card-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.v-dialog .v-card-text {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
}

.v-dialog .v-img {
  border-radius: 12px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  object-fit: contain !important;
}

.v-dialog .v-card-actions {
  justify-content: flex-end;
  margin-top: 1rem;
}

.v-dialog .v-btn {
  font-weight: bold;
  text-transform: none;
}

.close-btn {
  font-size: 1.5rem;
  font-weight: bold;
  color: #444;
}
.close-btn:hover {
  color: #000;
}
</style>
