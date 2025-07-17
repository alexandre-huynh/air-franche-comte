<script setup lang="ts">

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/gallery">Gallery</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/profile">Profile</router-link>
  </nav>
</template>


<style scoped>
nav {
  background-color: #007BFF;
  padding: 1.2em 0;
  display: flex;
  justify-content: center;
  gap: 3em;
  box-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
  border-bottom: 2px solid #0ff;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 42px;
  max-height: 42px;
}

nav a {
  color: #00ffff;
  font-size: 1.2em;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 8px;
  transition: 0.3s ease;
  background-color: rgba(0, 255, 255, 0.05);
  text-shadow: 0 0 6px #0ff;
}

nav a:hover {
  background-color: rgba(0, 255, 255, 0.15);
  transform: scale(1.1);
  color: #ffffff;
  box-shadow: 0 0 10px #0ff;
}

nav a.router-link-active {
  color: yellow;
}

nav a.router-link-exact-active {
  color: orange;
}

nav a.router-link-active:hover {
  color: lightyellow;
}

</style>
