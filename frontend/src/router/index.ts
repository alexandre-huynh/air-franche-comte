import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Gallery from '../views/Gallery.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/gallery', name: 'gallery', component: Gallery },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
