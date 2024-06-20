// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Menu from '../views/MenuView.vue'
import Home from '../views/HomeView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/menu', component: Menu, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
