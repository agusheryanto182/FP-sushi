// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Menu from '../views/MenuView.vue'
import Home from '../views/HomeView.vue'
import Order from '../views/OrderView.vue'
import Offer from '../views/OfferView.vue'
import Hero from '../views/HeroView.vue'
import OurService from '../views/OurServiceView.vue'
import Contact from '../views/ContactView.vue'
import OurTeam from '../views/OurTeamView.vue'
import Task from '../views/TaskView.vue'
import axios from '../axios.js';
const baseURL = axios.defaults.baseURL

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/menu', component: Menu, meta: { requiresAuth: true } },
  { path: '/order', component: Order, meta: { requiresAuth: true } },
  { path: '/offer', component: Offer, meta: { requiresAuth: true } },
  { path: '/hero', component: Hero, meta: { requiresAuth: true } },
  { path: '/our-service', component: OurService, meta: { requiresAuth: true } },
  { path: '/contact', component: Contact, meta: { requiresAuth: true } },
  { path: '/our-team', component: OurTeam, meta: { requiresAuth: true } },
  { path: '/task', component: Task, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      console.log("Token not found. Redirecting to login.");
      next('/login');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const response = await axios.get(`${baseURL}/api/v1/get-user/${payload.id}`);

        if (response.status === 404) {
          localStorage.clear()
          sessionStorage.clear()
          next('/login');
        }

        if (payload.exp * 1000 < Date.now()) {
          console.log("Token expired. Clearing storage and redirecting to login.");
          localStorage.clear()
          sessionStorage.clear()
          next('/login');
        } else {
          next();
        }
      } catch (e) {
        console.error("Token is invalid. Clearing storage and redirecting to login.", e);
        localStorage.clear()
        sessionStorage.clear()
        next('/login');
      }
    }
  } else {
    next();
  }
});

export default router;
