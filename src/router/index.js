import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
    ,
    {
      path: '/our-team',
      name: 'our-team',
      component: () => import('../views/OurTeamView.vue')
    }
    ,
    {
      path: '/our-service',
      name: 'our-service',
      component: () => import('../views/OurService.vue')
    }
    ,
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
    ,
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: () => import('../views/ThankYouView.vue')
    }
  ]
})

export default router
