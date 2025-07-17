import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Gallery from '../views/Gallery.vue'
import Reservations from '../views/Reservations.vue'
import AircraftDetails from '../views/AircraftDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/gallery', name: 'gallery', component: Gallery },
  { path: '/reservation/:id', name: 'reservation', component: Reservations },
  { path: '/aircraft/:id', name: 'aircraft-details', component: AircraftDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
