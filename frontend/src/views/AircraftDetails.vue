<template>
  <v-container>
    <h1>Aircraft Details</h1>
    <div v-if="aircraft">
      <h2>{{ aircraft.name }}</h2>
      <p>Manufacturer: {{ aircraft.manufacturer }}</p>
      <p>Model: {{ aircraft.model }}</p>
      <p>Year: {{ aircraft.year }}</p>
      <img :src="getImageUrl(aircraft.image_url)" alt="aircraft photo" width="400" />
      <p>{{ aircraft.description }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Plane {
  id: number
  name: string
  manufacturer: string
  model: string
  year: number
  image_url: string
  description: string
}

const route = useRoute()
const aircraft = ref<Plane | null>(null)

onMounted(async () => {
  try {
    const { data } = await axios.get<Plane>(`/api/aircraft/${route.params.id}`)
    aircraft.value = data
  } catch (err) {
    console.error('Failed to load aircraft:', err)
  }
})

const getImageUrl = (path: string) => {
  return `../${path}`;
}
</script>
