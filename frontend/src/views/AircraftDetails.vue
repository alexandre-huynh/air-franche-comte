<template>
  <v-container>
    <h1>Détails de l'avion</h1>
    <div v-if="aircraft">
      <h2>{{ aircraft.name }}</h2>
      <p>Fabricant : {{ aircraft.manufacturer }}</p>
      <p>Modèle : {{ aircraft.model }}</p>
      <p>Année : {{ aircraft.year }}</p>
      <img :src="aircraft.image_url" alt="photo avion" width="400" />
      <p>{{ aircraft.description }}</p>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Plane {
  id: number;
  name: string;
  manufacturer: string;
  model: string;
  year: number;
  image_url: string;
  description: string;
}

const route = useRoute();
const aircraft = ref<Plane | null>(null);

onMounted(async () => {
  const { data } = await axios.get<Plane[]>('/api/aircraft');
  aircraft.value = data.find((p: Plane) => p.id === Number(route.params.id)) || null;
});
</script>
