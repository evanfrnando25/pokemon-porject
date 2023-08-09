import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:pokemonName',
      name: 'DetailPage',
      component: () => import('../views/Detail.vue'),
      props: true
    }
  ]
})

export default router
