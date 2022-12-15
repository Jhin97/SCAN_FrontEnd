import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NeuralSTVue from '@/views/NeuralST.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/neural_ST',
    name: 'neuralST',
    component: NeuralSTVue
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
