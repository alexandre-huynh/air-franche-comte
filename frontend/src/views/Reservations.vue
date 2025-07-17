<template>
  <v-container>
    <h1>Réserver: {{ plane?.name }}</h1>
    <v-calendar
      ref="calendar"
      :min-date="today"
      @click:date="selectDate"
    ></v-calendar>

    <div v-if="selectedDate">
      <p>Date sélectionnée: {{ selectedDate }}</p>
      <p>Prix: {{ price }} $</p>
      <v-btn color="green" @click="confirmReservation">Confirmer</v-btn>
      <v-btn text @click="cancel">Annuler</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const plane = ref(null);
const selectedDate = ref(null);
const today = new Date().toISOString().split('T')[0];
const price = 500; // ou récupéré dynamiquement

onMounted(async () => {
  const { data } = await axios.get('/api/aircraft');
  plane.value = data.find(p => p.id == route.params.id);
});

const selectDate = ({ date }) => {
  selectedDate.value = date;
};

const confirmReservation = async () => {
  try {
    await axios.post('/api/aircraft/reserve', {
      aircraft_id: plane.value.id,
      start_datetime: selectedDate.value,
      end_datetime: selectedDate.value,
    });
    router.push({ name: 'account' });
  } catch (err) {
    if (err.response?.status === 401) {
      router.push({ name: 'login' });
    }
  }
};

const cancel = () => {
  router.push({ name: 'gallery' });
};
</script>
