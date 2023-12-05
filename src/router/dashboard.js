export const dashboard = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/components/HelloWorld.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Dashboard",
      layout: "layout-content",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard-all",
    component: () => import("@/components/HelloWorld.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Dashboard",
      layout: "layout-content",
    },
  },
];
