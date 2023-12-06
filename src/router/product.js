export const product = [
  {
    path: "/products/list",
    name: "list-product",
    component: () => import("@/views/persediaan/DaftarProduk.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "List Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/new-product",
    name: "new-product",
    component: () => import("@/views/persediaan/AddProduct.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Add Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/detail-product/:sku",
    name: "detail-product",
    component: () => import("@/views/persediaan/DetailProduct.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Detail Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/mutation",
    name: "mutation-product",
    component: () => import("@/views/persediaan/MutationProduct.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Product Mutation",
      layout: "layout-content",
    },
  },
];
