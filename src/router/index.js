import { createRouter, createWebHashHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import DaftarPersediaan from '../views/persediaan/DaftarPersediaan.vue'
import WizardSale from '../views/sales/WizardSale.vue'
import DaftarPenjualan from '../views/sales/DaftarPenjualan.vue'
import Login from '../views/Login/Login.vue'
import Invoice from '../views/invoice/SaleInvoice.vue'
import PaymentCredit from '../views/sales/PaymentCredit.vue'
import { useAuthStore } from '../stores/auth'
import { useVersionStore } from '../stores/version'

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
    path: '/sale/new-sale',
    name: 'new-sale',
    component: WizardSale,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Penjualan Baru',
      layout: 'layout-content',
    },
  },
  {
    path: '/sales/daftar-sale',
    name: 'daftar-sale',
    component: DaftarPenjualan,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Daftar Penjualan',
      layout: 'layout-content',
    },
  },
  {
    path: '/persediaan',
    name: 'persediaan',
    component: DaftarPersediaan,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Daftar Persediaan',
      layout: 'layout-content',
    },
  },
  {
    path: '/sales/invoice/:id',
    name: 'invoice',
    component: Invoice,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Detail Penjualan',
      layout: 'layout-content',
    },
  },
  {
    path: '/sales/detail/:id/payment-credit',
    name: 'payment-credit',
    component: PaymentCredit,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Detail Pembayaran Kredit',
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
