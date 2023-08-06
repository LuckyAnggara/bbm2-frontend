import { createRouter, createWebHashHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import DaftarProduk from '../views/persediaan/DaftarProduk.vue'
import DetailProduct from '../views/persediaan/DetailProduct.vue'
import AddProduct from '../views/persediaan/AddProduct.vue'
import MutationProduk from '../views/persediaan/MutationProduk.vue'
import WizardSale from '../views/sales/WizardSale.vue'
import WizardPos from '../views/sales/WizardPos.vue'
import WizardEditSale from '../views/sales/WizardEditSale.vue'
import DaftarPenjualan from '../views/sales/DaftarPenjualan.vue'
import Login from '../views/Login/Login.vue'
import Invoice from '../views/invoice/SaleInvoice.vue'
import PaymentCredit from '../views/sales/PaymentCredit.vue'
import IncomeStatement from '../views/report/IncomeStatement.vue'
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
    path: '/sale/point-of-sales',
    name: 'point-of-sale',
    component: WizardPos,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Point of Sales',
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
      title: 'New Sale',
      layout: 'layout-content',
    },
  },
  {
    path: '/sale/:id/edit-sale',
    name: 'edit-sale',
    component: WizardEditSale,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Edit Sale',
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
      title: 'List of Sales',
      layout: 'layout-content',
    },
  },
  {
    path: '/products/list',
    name: 'list-product',
    component: DaftarProduk,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Daftar Produk',
      layout: 'layout-content',
    },
  },
  {
    path: '/product/new-product',
    name: 'new-product',
    component: AddProduct,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Add Product',
      layout: 'layout-content',
    },
  },
  {
    path: '/product/detail-product/:sku',
    name: 'detail-product',
    component: DetailProduct,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Detail Product',
      layout: 'layout-content',
    },
  },
  {
    path: '/persediaan/mutasi-produk',
    name: 'produk-mutasi',
    component: MutationProduk,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Mutasi Produk',
      layout: 'layout-content',
    },
  },
  {
    path: '/sales/:id/invoice',
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
  {
    path: '/report/income-statement',
    name: 'income-statement',
    component: IncomeStatement,
    meta: {
      transition: 'slide-left',
      requiresAuth: true,
      title: 'Laba Rugi',
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
