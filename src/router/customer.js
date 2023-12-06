export const customer = [
  {
    path: "/customer/list",
    name: "list-customer",
    component: () => import("@/views/customer/CustomerList.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "List Customer",
      layout: "layout-content",
    },
  },
  {
    path: "/customer/add",
    name: "new-customer",
    component: () => import("@/views/customer/CustomerAdd.vue"),
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
    component: () => import("@/views/customer/CustomerDetail.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Customer",
      layout: "layout-content",
    },
  },
];
