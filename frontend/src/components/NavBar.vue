<script setup lang="ts">

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/gallery">Gallery</router-link>
    <router-link to="/profile"><img src="../assets/user.png" alt="user" class="profile"></router-link>
  </nav>
</template>


<style scoped>
nav {
  background-color: #007BFF;
  padding: 1.2em 1.5em;
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
  color: #ffffff;
  font-size: 1.2em;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 8px;
  transition: 0.3s ease;
  background-color: rgba(0, 255, 255, 0.05);
  text-shadow: 0 0 3px #0ff;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1;
}

nav a:hover {
  background-color: rgba(0, 255, 255, 0.15);
  transform: scale(1.1);
  box-shadow: 0 0 5px #0ff;
}

nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.29);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

nav a:last-child {
  margin-left: auto;
  padding: 0;
  border-radius: 50%;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
</style>
