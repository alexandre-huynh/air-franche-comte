<template>
  <v-container>
    <v-row>
      <v-col v-for="plane in planes" :key="plane.id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="plane.image_url" height="200px"></v-img>
          <v-card-title>{{ plane.name }}</v-card-title>
          <v-card-subtitle>{{ plane.manufacturer }} {{ plane.model }}</v-card-subtitle>
          <v-card-text>
            {{ plane.description }}
            <br/>
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

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const planes = ref([]);
const router = useRouter();

onMounted(async () => {
  const { data } = await axios.get('/api/aircraft');
  planes.value = data;
});

const goToReservation = (plane) => {
  router.push({ name: 'reservation', params: { id: plane.id } });
};

const goToDetails = (plane) => {
  router.push({ name: 'aircraft-details', params: { id: plane.id } });
};

const parseReservations = (str) => {
  if (!str) return ['Aucune réservation'];
  return str.split(',').map(r => {
    const [start, end] = r.split('|');
    return `${start} → ${end}`;
  });
};
</script>
