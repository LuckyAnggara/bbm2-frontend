export const sales = [
  {
    path: "/sales/list",
    name: "list-sale",
    component: () => import("@/views/sales/SaleList.vue"),
    meta: {
      breadcumb: [
        {
          name: "Sales",
          to: "/sales/list",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/new",
    name: "new-sale",
    component: () => import("@/views/sales/SaleAddWizard.vue"),
    meta: {
      breadcumb: [
        {
          name: "Sales",
          to: "/sales/list",
        },
        {
          name: "New",
          to: "/sale/new",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/detail/:uuid",
    name: "detail-sale",
    component: () => import("@/views/sales/SaleDetail.vue"),
    meta: {
      breadcumb: [
        {
          name: "Sales",
          to: "/sales/list",
        },
        {
          name: "Detail",
          to: "",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/:id/edit",
    name: "edit-sale",
    component: () => import("@/views/sales/WizardEditSale.vue"),
    meta: {
      breadcumb: [
        {
          name: "Sales",
          to: "/sales/list",
        },
        {
          name: "Edit",
          to: "",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Edit Sales",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/detail/:uuid/invoice",
    name: "invoice",
    component: () => import("@/views/invoice/SaleInvoice.vue"),
    meta: {
      breadcumb: [
        {
          name: "Sales",
          to: "/sales/list",
        },
        {
          name: "uuid",
          to: "/sale/detail",
        },
        {
          name: "Invoice",
          to: "",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Invoice",
      layout: "layout-content",
    },
  },
  {
    path: "/sale/detail/:id/payment-credit",
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
