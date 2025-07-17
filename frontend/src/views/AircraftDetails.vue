<template>
  <v-container>
    <h1>Détails de l'avion</h1>
    <div v-if="aircraft">
      <h2>{{ aircraft.name }}</h2>
      <p>Fabricant : {{ aircraft.manufacturer }}</p>
      <p>Modèle : {{ aircraft.model }}</p>
      <p>Année : {{ aircraft.year }}</p>
      <img :src="aircraft.image_url" alt="photo avion" width="400">
      <p>{{ aircraft.description }}</p>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const aircraft = ref(null);

onMounted(async () => {
  const { data } = await axios.get('/api/aircraft');
  aircraft.value = data.find(p => p.id == route.params.id);
});
</script>
