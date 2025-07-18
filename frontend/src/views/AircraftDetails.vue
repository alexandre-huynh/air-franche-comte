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

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

[v-cloak] {
  display: none;
}

</style>
