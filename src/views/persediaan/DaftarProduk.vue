<template>
  <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div class="w-full md:w-1/2 flex space-x-3">
        <div class="flex items-center">
          <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
          <select
            v-model="itemStore.currentLimit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-16 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
          >
            <option :selected="itemStore.currentLimit == length ? true : false" v-for="length in lengths" :key="length">
              {{ length }}
            </option>
          </select>
        </div>

        <form class="flex items-center w-full" autocomplete="off">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              @keyup.enter="itemStore.getData()"
              v-model="itemStore.searchName"
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tekan enter untuk mencari"
            />
          </div>
        </form>
      </div>
      <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <HeadlessMenu :links="actionMenu" />
      </div>
    </div>
    <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
      <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed table-striped">
        <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <!-- <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th> -->
            <th scope="col" class="py-2 w-6 border border-slate-400 dark:border-slate-600">SKU</th>
            <th scope="col" class="py-2 w-24 border border-slate-400 dark:border-slate-600">Nama</th>
            <th scope="col" class="py-2 w-8 border border-slate-400 dark:border-slate-600">Saldo</th>
            <th scope="col" class="py-2 w-8 border border-slate-400 dark:border-slate-600">Batas Minimum</th>
            <th scope="col" class="py-2 w-12 border border-slate-400 dark:border-slate-600">Unit / Satuan</th>
            <th scope="col" class="py-2 w-8 border border-slate-400 dark:border-slate-600">Harga Rata - Rata</th>
            <th scope="col" class="py-2 w-10 border border-slate-400 dark:border-slate-600">Harga Beli Terakhir</th>
            <!-- <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">Merek</th> -->
            <th scope="col" class="py-2 w-10 border border-slate-400 dark:border-slate-600">Harga Jual</th>
            <th scope="col" class="py-2 w-10 border border-slate-400 dark:border-slate-600">Kategory</th>
            <th scope="col" class="py-2 w-6 border border-slate-400 dark:border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="itemStore.isLoading">
            <td colspan="6" class="text-center py-6">
              <CircleLoading>Prosesing ... </CircleLoading>
            </td>
          </tr>
          <tr v-else-if="!itemStore.isLoading && itemStore.items.length < 1">
            <td colspan="6" class="text-center py-6">No Data</td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in itemStore.items"
            :key="item.id"
            :class="
              (index + 1) % 2 !== 0 ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700' : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
            "
          >
            <!-- <td class="px-4 py-1 text-center">{{ itemStore.from + index }}</td> -->
            <td class="px-4 py-1">{{ item.sku ?? '-' }}</td>

            <th class="px-4 py-1">
              {{ item.name }}
            </th>
            <td class="px-4 py-1">{{ item.ending_stock ?? 0 }}</td>
            <td class="px-4 py-1">{{ item.qty_minimum ?? '-' }}</td>
            <td class="px-4 py-1">{{ item.unit?.name ?? '-' }}</td>

            <!-- <td class="px-4 py-1">{{ item.category.name.toUpperCase() ?? '-' }}</td> -->
            <td class="px-4 py-1">{{ IDRCurrency.format(item.price?.price ?? 0) }}</td>
            <td class="px-4 py-1">{{ IDRCurrency.format(item.price?.price ?? 0) }}</td>
            <td class="px-4 py-1">{{ IDRCurrency.format(item.price?.price ?? 0) }}</td>
            <td class="px-4 py-1">{{ item.category.name ?? '-' }}</td>

            <td class="px-4 py-1">
              <div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white">
                      <EllipsisVerticalIcon class="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                    >
                      <div class="px-2 py-1">
                        <MenuItem v-slot="{ active }">
                          <button
                            @click="detail(item.id)"
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <DocumentTextIcon class="w-5 h-5 mr-3" />
                            Detail
                          </button>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <button
                            @click="edit(item.id)"
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <PencilSquareIcon class="w-5 h-5 mr-3" />

                            Edit
                          </button>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <button
                            @click="deleteData(item.id)"
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <TrashIcon class="w-5 h-5 mr-3" />

                            Delete
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">{{ itemStore.from }} - {{ itemStore.to }}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{{ itemStore.total }}</span>
      </span>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <a
            @click="itemStore.currentPage == 1 ? '' : itemStore.getData(previousPage)"
            :disabled="itemStore.currentPage == 1 ? true : false"
            :class="
              itemStore.currentPage == 1
                ? 'cursor-not-allowed'
                : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
            "
            class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >Previous</a
          >
        </li>

        <li>
          <a
            @click="itemStore.lastPage == itemStore.currentPage ? '' : itemStore.getData(nextPage)"
            :class="
              itemStore.lastPage == itemStore.currentPage
                ? 'cursor-not-allowed'
                : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
            "
            class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >Next {{
          }}</a>
        </li>
      </ul>
    </nav>
  </div>

  <CreateDrawer :show="showCreateDrawer" @close="showCreateDrawer = false" />
  <EditDrawer :show="showEditDrawer" @close="showEditDrawer = false" />
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import HeadlessMenu from '../../components/menu/HeadlessMenu.vue'

import { EllipsisVerticalIcon, DocumentTextIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { onMounted, computed, onUnmounted, ref, nextTick, inject } from 'vue'
import TableComplex from '../../components/table/TableComplex.vue'
import { IDRCurrency } from '../../utilities/formatter'
import { useItemStore } from '../../stores/items'
import { useItemBrandStore } from '../../stores/itemBrand'
import { useItemUnitStore } from '../../stores/itemUnit'
import CircleLoading from '../../components/loading/CircleLoading.vue'

import CreateDrawer from './drawer/CreateDrawer.vue'
import EditDrawer from './drawer/EditDrawer.vue'
import { useRouter } from 'vue-router'

const lengths = ref([5, 10, 20, 30, 40, 50])

const swal = inject('$swal')
const router = useRouter()
const itemStore = useItemStore()
const itemBrandStore = useItemBrandStore()
const itemUnitStore = useItemUnitStore()

const showCreateDrawer = ref(false)
const showEditDrawer = ref(false)

const previousPage = computed(() => {
  return '&page=' + (itemStore.currentPage - 1)
})

const nextPage = computed(() => {
  return '&page=' + (itemStore.currentPage + 1)
})

itemStore.$subscribe((mutation, state) => {
  if (mutation.events.key == 'currentLimit') {
    itemStore.getData()
  }
})

async function detail(id) {
  router.push({ name: 'detail-product', params: { id } })
}

async function edit(id) {
  if (!itemBrandStore.items) itemBrandStore.getData()
  if (!itemUnitStore.items) itemUnitStore.getData()
  await nextTick()
  let data = itemStore.items.find((x) => x.id == id)
  itemStore.editCurrentData = data
  await nextTick()
  showEditDrawer.value = true
}

async function newProduct() {
  if (!itemBrandStore.items) itemBrandStore.getData()
  if (!itemUnitStore.items) itemUnitStore.getData()
  await nextTick()
  showCreateDrawer.value = true
}

function deleteData(id) {
  swal.fire({
    title: 'Hapus?',
    text: 'Data tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Cancel!',
    showLoaderOnConfirm: true,
    reverseButtons: true,
    preConfirm: async () => {
      await itemStore.destroy(id)
    },
    allowOutsideClick: () => !itemStore.isDestroyLoading,
    backdrop: true,
  })
}

const actionMenu = [
  {
    function: function tambah() {
      router.push({ name: 'add-product' })
    },
    label: 'Baru',
    icon: PlusIcon,
  },
]

onMounted(() => {
  itemStore.getData()
})

onUnmounted(() => {
  itemStore.$reset()
})
</script>
