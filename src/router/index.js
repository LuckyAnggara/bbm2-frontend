import { createRouter, createWebHashHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import Persediaan from '../views/persediaan/Persediaan.vue'
import NewSales from '../views/sales/NewSales.vue'
import Login from '../views/Login/Login.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
      title: 'Login Page',
      layout: 'layout-full',
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: HelloWorld,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Hello World',
      layout: 'layout-content',
    },
  },
  {
    path: '/new-sales',
    name: 'sales',
    component: NewSales,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'New Sales',
      layout: 'layout-content',
    },
  },
  {
    path: '/persediaan',
    name: 'persediaan',
    component: Persediaan,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Persediaan',
      layout: 'layout-content',
    },
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes, // short for `routes: routes`
})

router.beforeResolve(async (to, _, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn()) return next('/login')
  if (to.name == 'login' && auth.isLoggedIn()) return next('/')
  return next()
})

export default router
