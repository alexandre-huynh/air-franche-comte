<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <NavBar />

  <div class="container">
    <router-view></router-view>
  </div>

  <Footer />
</template>

<style scoped>

</style>
