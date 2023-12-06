export const sales = [
  {
    path: "/sales/list",
    name: "list-sale",
    component: () => import("@/views/sales/DaftarPenjualan.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "List of Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/new",
    name: "new-sale",
    component: () => import("@/views/sales/WizardSale.vue"),
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
    component: () => import("@/views/sales/SaleDetail.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/:id/edit",
    name: "edit-sale",
    component: () => import("@/views/sales/WizardEditSale.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Edit Sale",
      layout: "layout-content",
    },
  },
  {
    path: "/sales/:id/invoice",
    name: "invoice",
    component: () => import("@/views/invoice/SaleInvoice.vue"),
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
    component: () => import("@/views/sales/PaymentCredit.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Pembayaran Kredit",
      layout: "layout-content",
    },
  },
];
