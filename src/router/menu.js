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
    name: 'Point of Sales',
    icon: BuildingStorefrontIcon,
    to: 'dashboard',
  },
  {
    id: 2,
    name: 'Persediaan',
    icon: BriefcaseIcon,
    to: 'persediaan',
  },
]
