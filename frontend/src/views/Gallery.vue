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
          <v-img :src="plane.image_url" height="200px" class="fill"/>
          <v-card-title>{{ plane.name }}</v-card-title>
          <v-card-subtitle>
            {{ plane.manufacturer }} {{ plane.model }}
          </v-card-subtitle>
          <v-card-text>
            {{ plane.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Reserve</v-btn>
            <v-btn text @click="openModal(plane)">Info</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- MODAL DIALOG -->
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <v-card v-if="selectedPlane">
        <v-card-title class="d-flex align-center">
          <span>{{ selectedPlane.model }}</span>
          <v-spacer />
          <v-btn icon @click="isDialogOpen = false" class="close-btn" title="Close">
            ×
          </v-btn>
        </v-card-title>
        <v-card-subtitle>
          Manufacturer: {{ selectedPlane.manufacturer }}
        </v-card-subtitle>
        <v-img :src="selectedPlane.image_url" height="300px" />
        <v-card-text>
          <p><strong>Year:</strong> {{ selectedPlane.year || 'N/A' }}</p>
          <p>{{ selectedPlane.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary">Reserve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Plane {
  id: number
  name: string
  manufacturer: string
  model: string
  description: string
  image_url: string
  year?: number
}

const planes = ref<Plane[]>([])
const selectedPlane = ref<Plane | null>(null)
const isDialogOpen = ref(false)

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/aircraft')
    planes.value = data
  } catch (err) {
    console.error('Failed to load planes:', err)
  }
})

const openModal = (plane: Plane) => {
  selectedPlane.value = plane
  isDialogOpen.value = true
}
</script>

<style scoped>
.v-card .v-card-text {
  height: 5em;
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
