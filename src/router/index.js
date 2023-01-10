import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NeuralPanVue from '@/views/NeuralPan.vue'
import NeuralProVue from '@/views/NeuralPro.vue'
import NeuralTreeVue from '@/views/NeuralTree.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/neuralST',
    name: 'neuralST',
    component: NeuralProVue
  },
  {
    path: '/neuralPan',
    name: 'neuralPan',
    component: NeuralPanVue
  },
  {
    path: '/neuralTree',
    name: 'neuralTree',
    component: NeuralTreeVue
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
