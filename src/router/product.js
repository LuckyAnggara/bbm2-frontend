export const product = [
  {
    path: "/product/list",
    name: "list-product",
    component: () => import("@/views/product/ProductList.vue"),
    meta: {
      breadcumb: [
        {
          name: "Product",
          to: "/product/list",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/new",
    name: "new-product",
    component: () => import("@/views/product/ProductAdd.vue"),
    meta: {
      breadcumb: [
        {
          name: "Product",
          to: "/product/list",
        },
        {
          name: "New",
          to: "/product/new",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/:sku/detail",
    name: "detail-product",
    component: () => import("@/views/product/ProductDetail.vue"),
    meta: {
      breadcumb: [
        {
          name: "Product",
          to: "/product/list",
        },
        {
          name: "Detail",
          to: "",
        },
      ],
      transition: "slide-left",
      requiresAuth: true,
      title: "Product / Service",
      layout: "layout-content",
    },
  },
  {
    path: "/product/mutation",
    name: "mutation-product",
    component: () => import("@/views/product/MutationProduct.vue"),
    meta: {
      transition: "slide-left",
      requiresAuth: true,
      title: "Product Mutation",
      layout: "layout-content",
    },
  },
];
