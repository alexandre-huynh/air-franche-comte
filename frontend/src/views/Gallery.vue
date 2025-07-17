<template>
  <v-container>
    <v-row>
      <v-col v-for="plane in planes" :key="plane.id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="plane.image_url" height="200px" />
          <v-card-title>{{ plane.name }}</v-card-title>
          <v-card-subtitle>{{ plane.manufacturer }} {{ plane.model }}</v-card-subtitle>
          <v-card-text>
            {{ plane.description }}<br />
            <strong>Disponibilités :</strong>
            <div v-for="(res, index) in parseReservations(plane.reservations)" :key="index">
              {{ res }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToReservation(plane)">Réserver</v-btn>
            <v-btn text @click="goToDetails(plane)">Caractéristiques</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Plane {
  id: number
  image_url: string
  name: string
  manufacturer: string
  model: string
  description: string
  reservations?: string
}

const planes = ref<Plane[]>([])
const router = useRouter()

onMounted(async () => {
  const { data } = await axios.get('/api/aircraft')
  planes.value = data
})

const goToReservation = (plane: Plane) => {
  router.push({ name: 'reservation', params: { id: plane.id } })
}

const goToDetails = (plane: Plane) => {
  router.push({ name: 'aircraft-details', params: { id: plane.id } })
}

const parseReservations = (str: string | undefined): string[] => {
  if (!str) return ['Aucune réservation']
  return str.split(',').map((r: string) => {
    const [start, end] = r.split('|')
    return `${start} → ${end}`
  })
}
</script>
