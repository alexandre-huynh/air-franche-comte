<template>
  <div class="home">
    <!-- Hero section -->
    <section class="hero">
      <img src="../assets/img/lgo_air_franche_comte.png" alt="Air Franche-Comté Logo" class="logo" />
      <h1>Welcome to Air Franche-Comté</h1>
      <p>Your gateway to the skies — book your next flight now!</p>
      <router-link to="/gallery" class="book-btn">Book Now!</router-link>
    </section>

    <!-- Intro section -->
    <section class="intro">
      <p>
        At <strong>Air Franche-Comté</strong>, we offer you a unique opportunity to discover aviation like never before.
        Whether you're training, flying for leisure, or just curious to explore our diverse fleet,
        our modern platform allows you to book easily and enjoy a safe, comfortable experience.
      </p>
    </section>

    <!-- Fleet section -->
    <section class="fleet">
      <h2>Our Fleet</h2>
      <p>Discover our wide range of aircraft for all needs and budgets.</p>
      <router-link to="/register" class="fleet-link">Register now to rent!</router-link>
      <div class="fleet-gallery">
        <div class="aircraft-card" v-for="aircraft in sampleAircraft" :key="aircraft.name">
          <img :src="aircraft.image" :alt="aircraft.name" />
          <h3>{{ aircraft.name }}</h3>
          <p>{{ aircraft.description }}</p>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="why">
      <h2>Why Choose Us?</h2>
      <ul>
        <li>✔ Modern and varied fleet</li>
        <li>✔ Easy and fast booking</li>
        <li>✔ Best prices guaranteed</li>
        <li>✔ Friendly and professional service</li>
      </ul>
    </section>

    <!-- Contact / Promotions -->
    <section class="promo">
      <h2>Current Promotions</h2>
      <p>🎉 Book today and get <strong>30% tax</strong> on your first flight!</p>
    </section>
  </div>
</template>

<script setup lang="ts">
const sampleAircraft = [
  {
    name: "Jabiru J430",
    description: "Australian single-engine, economical and efficient.",
    image: "src/assets/img/Jabiru_J430.jpg"
  },
  {
    name: "Scylax GmbH",
    description: "German electric aircraft for regional flights.",
    image: "src/assets/img/Scylax_GmbH.jpg"
  },
  {
    name: "BISSAP Aircraft",
    description: "Buy one, get one for free!",
    image: "src/assets/img/bissap.jpg"
  }
];
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f2f7ff;
  border-radius: 8px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.book-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.book-btn:hover {
  background-color: #0056b3;
}

.intro {
  margin: 2rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
}

.fleet {
  margin-top: 3rem;
}

.fleet h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.fleet-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: none;
}

.fleet-gallery {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.aircraft-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  width: calc(33% - 1rem);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.aircraft-card img {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.why {
  margin-top: 3rem;
}

.why h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.why ul {
  list-style: none;
  padding-left: 0;
  text-align: center;
}

.why li {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.promo {
  margin-top: 3rem;
  text-align: center;
  background-color: #fffbe6;
  padding: 2rem;
  border-radius: 8px;
}

.promo h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.contact-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}

.hero .logo {
  width: 200px;
  height: auto;
  margin-bottom: 1rem;
}

</style>
