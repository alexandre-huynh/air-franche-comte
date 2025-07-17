<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const isGallery = computed(() => route.name === 'gallery')
</script>

<template>
  <NavBar />

  <div class="container">
    <v-app v-if="isGallery">
      <router-view />
    </v-app>
    <router-view v-else />
  </div>

  <Footer />
</template>
