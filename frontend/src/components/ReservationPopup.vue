<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { token } from '@/stores/auth'

const props = defineProps<{ reservation: any }>()
const emit = defineEmits(['close', 'updated'])

const selectedStatus = ref(props.reservation.status)

watch(() => props.reservation.status, (newStatus) => {
  selectedStatus.value = newStatus
})

const formattedDate = computed(() => {
  if (!props.reservation.reservation_date) return ''
  const date = new Date(props.reservation.reservation_date)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const updateStatus = async () => {
  if (!token.value) return

  const res = await fetch(`/api/reservations/${props.reservation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ status: selectedStatus.value }),
  })

  if (res.ok) {
    emit('updated', selectedStatus.value)
    close()
  } else {
    alert('Failed to update reservation status.')
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup-card">
      <h3>Reservation Details</h3>
      <p><strong>Date:</strong> {{ formattedDate }}</p>
      <p><strong>Aircraft ID:</strong> {{ reservation.aircraft_id }}</p>
      <p>
        <strong>Status:</strong>
        <span :class="['status-badge', reservation.status]">{{ reservation.status }}</span>
      </p>

      <div v-if="reservation.status !== 'cancelled'" class="status-select">
        <label for="status">Change Status:</label>
        <select v-model="selectedStatus" :disabled="reservation.status === 'cancelled'" class="custom-select">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button @click="updateStatus">Update</button>
      </div>
      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>


<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.popup-card h3 {
  margin-bottom: 1rem;
  color: #222;
}

.status-badge {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: bold;
  text-transform: capitalize;
}

.status-select {
  margin-top: 1rem;
}

.status-select select {
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 120px;
}

.status-select button {
  background: #2f7cff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.close-btn {
  margin-top: 1rem;
  background: #999;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.pending {
  background-color: #fff3cd;
  color: #856404;
}

.confirmed {
  background-color: #d4edda;
  color: #155724;
}

.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.custom-select {
  appearance: none;
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  cursor: pointer;
}

.custom-select:disabled {
  cursor: not-allowed;
  background-color: #f9f9f9;
}

</style>
