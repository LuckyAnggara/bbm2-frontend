import { createMemoryHistory, createRouter, createWebHashHistory } from "vue-router";
import IncomeStatement from "@/views/report/IncomeStatement.vue";

import { dashboard } from "./dashboard";
import { product } from "./product";
import { customer } from "./customer";
import { sales } from "./sales";

import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      requiresAuth: false,
      title: "Login Page",
      layout: "layout-full",
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
  ...dashboard,
  ...product,
  ...customer,
  ...sales,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

// router.beforeResolve(async (to, _, next) => {
//   const auth = useAuthStore();
//   if (to.meta.requiresAuth == true && auth.isLoggedIn() == false) {
//     return next("/login");
//   } else if (to.name == "login" && auth.isLoggedIn() == true) {
//     return next("/");
//   } else {
//     return next();
//   }
// });

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();

  const authUser = authStore.userData;
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loginQuery = { path: "/login" };
  const dashboardQuery = { path: "/" };

  if (reqAuth && !authUser) {
    const isAuth = await authStore.getAuthUser();
    if (to.fullPath == loginQuery) {
    }
    if (!isAuth) {
      next(loginQuery);
    } else {
      next();
    }
  } else {
    if (to.fullPath == "/login") {
      const isAuth = await authStore.getAuthUser();
      if (isAuth) {
        next(dashboardQuery);
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
