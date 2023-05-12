import {
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
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
    name: 'Penjualan',
    icon: BuildingStorefrontIcon,
    child: [
      {
        id: 0,
        name: 'Daftar Penjualan',
        to: 'daftar-sale',
      },
      {
        id: 1,
        name: 'Penjualan Baru',
        to: 'new-sale',
      },
    ],
  },
  {
    id: 2,
    name: 'Persediaan',
    icon: BriefcaseIcon,
    // to: 'persediaan',
    child: [
      {
        id: 0,
        name: 'Daftar Produk',
        to: 'produk',
      },
      {
        id: 1,
        name: 'Mutasi Produk',
        to: 'produk-mutasi',
      },
    ],
  },
  // {
  //   id: 3,
  //   name: 'Invoice',
  //   // icon: BriefcaseIcon,
  //   to: 'invoice',
  // },
]
