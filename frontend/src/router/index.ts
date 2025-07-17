import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/gallery', name: 'gallery', component: () => import('@/views/Gallery.vue') },
  { path: '/reservation/:id', name: 'reservation', component: () => import('@/views/Reservations.vue') },
  { path: '/aircraft/:id', name: 'aircraft-details', component: () => import('@/views/AircraftDetails.vue') },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
