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
          <v-img :src="plane.image_url" height="200px" />
          <v-card-title>{{ plane.name }}</v-card-title>
          <v-card-subtitle>
            {{ plane.manufacturer }} {{ plane.model }}
          </v-card-subtitle>
          <v-card-text>
            {{ plane.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">
              Reserve
            </v-btn>
            <v-btn text @click="goToDetails(plane.id)">
              Info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Plane {
  id: number
  name: string
  manufacturer: string
  model: string
  description: string
  image_url: string
}

const planes = ref<Plane[]>([])
const router = useRouter()

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/aircraft')
    planes.value = data
  } catch (err) {
    console.error('Failed to load planes:', err)
  }
})

const goToDetails = (id: number) => {
  router.push({ name: 'aircraft-details', params: { id } })
}
</script>
