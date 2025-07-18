<template>
  <div class="about-container">
    <h2>Our Exclusive Airfields</h2>
    <p class="subtitle">
      Since 1963, Air Franche Comté has been bringing the joy of flying to everyone — from aspiring pilots to seasoned travelers.
      We combine tradition and luxury with a touch of adventure, offering unforgettable moments in the sky. ✈️✨
    </p>

    <div v-for="(airport, index) in airports" :key="index" class="airport-block">
      <div class="info">
        <img :src="airport.image" alt="" class="airport-image" />
        <div class="text">
          <h3>{{ airport.name }}</h3>
          <p>{{ airport.description }}</p>
        </div>
      </div>
      <div :id="'map-' + index" class="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
/// <reference types="@types/google.maps" />
import { onMounted } from 'vue'

// Déclaration explicite de initMaps pour TypeScript
declare global {
  interface Window {
    initMaps: () => void;
  }
}

const airports = [
  {
    name: 'Greenfield Airfield',
    lat: 41.2231,
    lng: -85.3619,
    description: 'Greenfield Airfield is our flagship location, known for its modern facilities and welcoming atmosphere. Perfect for beginners.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/A%C3%A9rodrome_de_Saint-Cyr-l%27%C3%89cole_en_2013_-_01.jpg/1200px-A%C3%A9rodrome_de_Saint-Cyr-l%27%C3%89cole_en_2013_-_01.jpg'
  },
  {
    name: 'Riverside Airfield',
    lat: 34.0151,
    lng: -117.3257,
    description: 'Located near scenic river banks, Riverside Airfield offers breathtaking flights and excellent training for all levels.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu48gLi2qEftHeER9XYeculG_5wJipnlUIjw&s'
  },
  {
    name: 'Silverstone Airfield',
    lat: 52.0786,
    lng: -1.0169,
    description: 'Silverstone combines heritage and innovation. Famous for airshows and advanced training programs.',
    image: 'https://www.abct.org.uk/media/1546/aerial-1983.jpg'
  },
  {
    name: 'Maplewood Airfield',
    lat: 44.9537,
    lng: -93.0900,
    description: 'Maplewood is a picturesque airfield, ideal for leisure flights and private charters.',
    image: 'https://inflightpilottraining.com/wp-content/uploads/2024/07/21-scaled-2.jpg'
  },
  {
    name: 'Eastgate Airfield',
    lat: 35.2271,
    lng: -80.8431,
    description: 'Eastgate is our eastern hub, offering premium facilities and fast connections for students and professionals.',
    image: 'https://www.visittimbavati.com/assets/img/timbavati-airport-hoedspruit-flight.jpg'
  }
]

onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDETWvIUEz34ZHJ_TsnXmRmCsiQYw2kslc&callback=initMaps`
  script.async = true

  window.initMaps = () => {
    airports.forEach((airport, index) => {
      const element = document.getElementById(`map-${index}`)
      if (!element) return

      const map = new google.maps.Map(element, {
        center: { lat: airport.lat, lng: airport.lng },
        zoom: 14
      })

      new google.maps.Marker({
        position: { lat: airport.lat, lng: airport.lng },
        map,
        title: airport.name
      })
    })
  }

  document.head.appendChild(script)
})
</script>

<style scoped>
.about-container {
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 2rem;
  background-color: #f8f8f8;
  color: #222;
}

.about-container h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 2rem auto;
  color: #666;
  line-height: 1.5;
}

.airport-block {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.airport-image {
  border-radius: 8px;
  width: 300px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.text {
  max-width: 400px;
  text-align: left;
}

.text h3 {
  margin-bottom: 0.5rem;
  color: #222;
  font-size: 1.5rem;
}

.text p {
  color: #555;
  font-size: 0.95rem;
}

.map {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
