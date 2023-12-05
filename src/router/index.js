import { createRouter, createWebHashHistory } from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import DaftarProduk from "@/views/persediaan/DaftarProduk.vue";
import DetailProduct from "@/views/persediaan/DetailProduct.vue";
import AddProduct from "@/views/persediaan/AddProduct.vue";
import MutationProduk from "@/views/persediaan/MutationProduk.vue";
import WizardSale from "@/views/sales/WizardSale.vue";
import SaleDetail from "@/views/sales/SaleDetail.vue";
import WizardEditSale from "@/views/sales/WizardEditSale.vue";
import DaftarPenjualan from "@/views/sales/DaftarPenjualan.vue";
import CustomerList from "@/views/customer/CustomerList.vue";
import CustomerAdd from "@/views/customer/CustomerAdd.vue";
import CustomerDetail from "@/views/customer/CustomerDetail.vue";
import Login from "@/views/login/Login.vue";
import Invoice from "@/views/invoice/SaleInvoice.vue";
import PaymentCredit from "@/views/sales/PaymentCredit.vue";
import IncomeStatement from "@/views/report/IncomeStatement.vue";
import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
      title: "Login Page",
      layout: "layout-full",
    },
  },
  {
    path: "/",
    name: "dashboard",
    component: HelloWorld,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Dashboard",
      layout: "layout-content",
    },
  },

  {
    path: "/sale/new-sale",
    name: "new-sale",
    component: WizardSale,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "New Sale",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/detail/:uuid",
    name: "detail-sale",
    component: SaleDetail,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/new-sale",
    name: "new-sale",
    component: WizardSale,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "New Sale",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/:id/edit-sale",
    name: "edit-sale",
    component: WizardEditSale,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Edit Sale",
      layout: "layout-content",
    },
  },
  {
    path: "/sales/daftar-sale",
    name: "daftar-sale",
    component: DaftarPenjualan,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "List of Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/products/list",
    name: "list-product",
    component: DaftarProduk,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Daftar Produk",
      layout: "layout-content",
    },
  },
  {
    path: "/product/new-product",
    name: "new-product",
    component: AddProduct,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Add Product",
      layout: "layout-content",
    },
  },
  {
    path: "/product/detail-product/:sku",
    name: "detail-product",
    component: DetailProduct,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Product",
      layout: "layout-content",
    },
  },
  {
    path: "/customer/list",
    name: "list-customer",
    component: CustomerList,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Daftar Customer",
      layout: "layout-content",
    },
  },
  {
    path: "/customer/add",
    name: "new-customer",
    component: CustomerAdd,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "New Customer",
      layout: "layout-content",
    },
  },
  {
    path: "/customer/detail/:uuid",
    name: "detail-customer",
    component: CustomerDetail,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Customer",
      layout: "layout-content",
    },
  },
  {
    path: "/persediaan/mutasi-produk",
    name: "produk-mutasi",
    component: MutationProduk,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Mutasi Produk",
      layout: "layout-content",
    },
  },
  {
    path: "/sales/:id/invoice",
    name: "invoice",
    component: Invoice,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Penjualan",
      layout: "layout-content",
    },
  },
  {
    path: "/sales/detail/:id/payment-credit",
    name: "payment-credit",
    component: PaymentCredit,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Pembayaran Kredit",
      layout: "layout-content",
    },
  },
  {
    path: "/report/income-statement",
    name: "income-statement",
    component: IncomeStatement,
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Laba Rugi",
      layout: "layout-content",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeResolve(async (to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth == true && auth.isLoggedIn() == false) {
    return next("/login");
  } else if (to.name == "login" && auth.isLoggedIn() == true) {
    return next("/");
  } else {
    return next();
  }
});

export default router;
