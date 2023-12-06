import {
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

export const menu = [
  {
    id: 0,
    name: "Dashboard",
    icon: RectangleGroupIcon,
    to: "dashboard",
  },

  {
    id: 2,
    name: "Sales",
    icon: BuildingStorefrontIcon,
    to: "list-sale",
  },
  {
    id: 3,
    name: "Products",
    icon: BriefcaseIcon,
    to: "list-product",
    // to: 'persediaan',
  },
  {
    id: 4,
    name: "Customers",
    icon: UserIcon,
    to: "list-customer",
    // to: 'persediaan',
  },
  {
    id: 6,
    name: "Mutasi Produk",
    to: "mutation-product",
  },
  {
    id: 7,
    name: "Laba Rugi",
    icon: BriefcaseIcon,
    to: "income-statement",
  },
  // {
  //   id: 3,
  //   name: 'Invoice',
  //   // icon: BriefcaseIcon,
  //   to: 'invoice',
  // },
];
