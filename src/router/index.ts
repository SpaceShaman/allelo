import PlanerView from '@/views/PlanerView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'planer',
      component: PlanerView
    }
  ]
})

export default router
