import {
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

export const menu = [
  {
    name: "Dashboard",
    icon: RectangleGroupIcon,
    to: "dashboard",
  },
  {
    name: "-",
  },
  {
    name: "Business",
    icon: BuildingStorefrontIcon,
    child: [
      {
        name: "Sales",
        icon: BriefcaseIcon,
        to: "list-sale",
      },
    ],
  },

  {
    name: "Product & Service",
    icon: BriefcaseIcon,
    child: [
      {
        name: "Products",
        icon: BriefcaseIcon,
        to: "list-product",
      },
      {
        name: "Warehouses",
        icon: BriefcaseIcon,
        to: "list-product",
      },
    ],
    // to: 'persediaan',
  },
  {
    name: "Customers",
    icon: UserIcon,
    to: "list-customer",
    // to: 'persediaan',
  },
  {
    name: "Mutasi Produk",
    to: "mutation-product",
  },
  {
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
