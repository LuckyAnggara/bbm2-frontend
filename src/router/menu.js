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
    name: 'Sales',
    icon: BuildingStorefrontIcon,
    child: [
      {
        id: 0,
        name: 'Daftar Sales',
        to: 'daftar-sales',
      },
      {
        id: 1,
        name: 'New Sales',
        to: 'new-sales',
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
        name: 'Daftar Persediaan',
        to: 'persediaan',
      },
      {
        id: 1,
        name: 'New Sales',
        to: 'new-sales',
      },
    ],
  },
]
