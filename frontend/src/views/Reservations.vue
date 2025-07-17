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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
const router = useRouter();

const plane = ref<Plane | null>(null);
const selectedDate = ref<string | null>(null);
const today = new Date().toISOString().split('T')[0];
const price = 500;

onMounted(async () => {
  const { data } = await axios.get<Plane[]>('/api/aircraft');
  plane.value = data.find((p: Plane) => p.id === Number(route.params.id)) || null;
});

const selectDate = ({ date }: { date: string }) => {
  selectedDate.value = date;
};

const confirmReservation = async () => {
  if (!plane.value || !selectedDate.value) return;

  try {
    await axios.post('/api/aircraft/reserve', {
      aircraft_id: plane.value.id,
      start_datetime: selectedDate.value,
      end_datetime: selectedDate.value,
    });
    router.push({ name: 'account' });
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      router.push({ name: 'login' });
    } else {
      console.error(err);
    }
  }
};

const cancel = () => {
  router.push({ name: 'gallery' });
};
</script>

