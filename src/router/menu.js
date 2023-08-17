import {
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
} from '@heroicons/vue/24/outline'

export const menu = [
  {
    id: 0,
    name: 'Dashboard',
    icon: RectangleGroupIcon,
    to: 'dashboard',
  },
  {
    id: 1,
    name: 'Point Of Sales (Retail)',
    icon: ShoppingBagIcon,
    to: 'point-of-sale',
  },
  {
    id: 2,
    name: 'Penjualan',
    icon: BuildingStorefrontIcon,
    to: 'daftar-sale',
  },
  {
    id: 3,
    name: 'Products',
    icon: BriefcaseIcon,
    to: 'list-product',
    // to: 'persediaan',
  },
  {
    id: 1,
    name: 'Mutasi Produk',
    to: 'produk-mutasi',
  },
  {
    id: 4,
    name: 'Laba Rugi',
    icon: BriefcaseIcon,
    to: 'income-statement',
  },
  // {
  //   id: 3,
  //   name: 'Invoice',
  //   // icon: BriefcaseIcon,
  //   to: 'invoice',
  // },
]
