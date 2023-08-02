<template>
  <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div class="w-full md:w-1/2 flex space-x-3">
        <div class="flex items-center">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
          <select
            v-model="salesStore.currentLimit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-16 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
          >
            <option :selected="salesStore.currentLimit == length ? true : false" v-for="length in lengths" :key="length">
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
              @keyup.enter="salesStore.getData()"
              v-model="salesStore.searchName"
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tekan enter untuk mencari"
            />
          </div>
        </form>
      </div>
      <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <div class="flex items-center space-x-4 w-full md:w-auto">
          <router-link
            :to="{ name: 'new-sale', params: {} }"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <PlusIcon class="mr-1 w-4 h-4" />
            Sales
          </router-link>
        </div>

        <div class="flex items-center space-x-4 w-full md:w-auto">
          <button
            @click="filterDraw()"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <FunnelIcon class="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
      <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 xl:table-fixed">
        <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
            <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">
              <div class="flex flex-row justify-between items-center">
                <span> Tanggal </span>
                <button type="button" class="inline-flex items-center p-0.5 ml-2" @click="salesStore.changeSortBy('created_at')">
                  <BarsArrowUpIcon v-if="salesStore.sortBy == 'created_at' && salesStore.isAscending == true" class="h-5 w-5" />
                  <BarsArrowDownIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-4 py-2 w-14 border border-slate-400 dark:border-slate-600">
              <div class="flex flex-row justify-between items-center">
                <span> Invoice </span>
                <button type="button" class="inline-flex items-center p-0.5 ml-2" @click="salesStore.changeSortBy('invoice')">
                  <BarsArrowUpIcon v-if="salesStore.sortBy == 'invoice' && salesStore.isAscending == true" class="h-5 w-5" />
                  <BarsArrowDownIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-4 py-2 w-24 border border-slate-400 dark:border-slate-600">
              <span> Nama Pelanggan </span>
            </th>
            <th scope="col" class="px-4 py-2 w-16 border border-slate-400 dark:border-slate-600">
              <div class="flex flex-row justify-between items-center">
                <span> Grand Total </span>
                <button type="button" class="inline-flex items-center p-0.5 ml-2" @click="salesStore.changeSortBy('grand_total')">
                  <BarsArrowUpIcon v-if="salesStore.sortBy == 'grand_total' && salesStore.isAscending == true" class="h-5 w-5" />
                  <BarsArrowDownIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-4 py-2 w-20 border border-slate-400 dark:border-slate-600">
              <div class="flex flex-row justify-between items-center">
                <span> Payment Status </span>
                <button type="button" class="inline-flex items-center p-0.5 ml-2" @click="salesStore.changeSortBy('payment_status')">
                  <BarsArrowUpIcon v-if="salesStore.sortBy == 'payment_status' && salesStore.isAscending == true" class="h-5 w-5" />
                  <BarsArrowDownIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-4 py-2 w-20 border border-slate-400 dark:border-slate-600">
              <div class="flex flex-row justify-between items-center">
                <span> Delivery Status </span>
                <button type="button" class="inline-flex items-center p-0.5 ml-2" @click="salesStore.changeSortBy('shipping_type')">
                  <BarsArrowUpIcon v-if="salesStore.sortBy == 'shipping_type' && salesStore.isAscending == true" class="h-5 w-5" />
                  <BarsArrowDownIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">Dibuat Oleh</th>
            <th scope="col" class="px-2 py-2 w-8 border border-slate-400 dark:border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="salesStore.isLoading">
            <td colspan="8" class="text-center py-6">
              <CircleLoading>Prosesing ... </CircleLoading>
            </td>
          </tr>
          <tr v-else-if="!salesStore.isLoading && salesStore.items.length < 1">
            <td colspan="8" class="text-center py-6">No Data</td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in salesStore.sortItem"
            :key="item.id"
            :class="
              (index + 1) % 2 !== 0 ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700' : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
            "
          >
            <td class="px-4 py-1 text-center">{{ salesStore.from + index }}</td>
            <td class="px-4 py-1">{{ moment(item.created_at).format('DD MMMM YYYY') }}</td>

            <th class="px-4 py-1">
              {{ item.invoice }}
            </th>
            <td class="px-4 py-1">{{ item.customer?.name ?? '-' }}</td>
            <td class="px-4 py-1">{{ IDRCurrency.format(item.grand_total ?? 0) }}</td>
            <td class="px-4 py-1">
              <div v-if="item.payment_status == 'LUNAS'" class="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0">
                <span
                  @click="paymentCreditView(item.id)"
                  v-if="item.credit == true"
                  class="cursor-pointer bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white"
                  >KREDIT
                </span>
                <span
                  @click="initRightDrawer(index)"
                  class="bg-blue-100 cursor-pointer text-blue-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white"
                  >{{ item.payment_status }}</span
                >
              </div>
              <div v-else class="flex flex-row items-center space-x-2">
                <span
                  @click="paymentCreditView(item.id)"
                  v-if="item.credit == true"
                  class="h-fit cursor-pointer bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white"
                  >KREDIT
                </span>
                <span
                  @click="initRightDrawer(index)"
                  class="h-fit cursor-pointer bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white"
                  >{{ item.payment_status }}</span
                >
              </div>
            </td>
            <td class="px-4 py-1">
              <span class="bg-red-100 text-red-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-300 dark:text-red-600"
                >{{ item.shipping_type }}
              </span>
            </td>
            <td class="px-4 py-1">{{ item.maker?.name ?? '' }}</td>
            <td class="px-2 py-1 text-center">
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
                            @click="initRightDrawer(index)"
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <DocumentIcon class="w-5 h-5 mr-3" />
                            Detail
                          </button>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <button
                            @click="invoice(item.id)"
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <DocumentTextIcon class="w-5 h-5 mr-3" />
                            Invoice
                          </button>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <button
                            @click="editData(item.id)"
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

    <!-- <div class="p-4">
      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white block">Active Filter</label>
      <div v-for="(filter, key) in salesStore.filter" :key="filter" class="space-x-2 flex w-full bg-red-500">
        <span
          v-if="filter.length != 0"
          class="items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
        >
          {{ key }} : {{ filter }}
          <button
            type="button"
            class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          >
            <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">{{ filter }}</span>
          </button>
        </span>
      </div>
    </div> -->

    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">{{ salesStore.from }} - {{ salesStore.to }}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{{ salesStore.totalResp }}</span>
      </span>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <a
            @click="salesStore.currentPage == 1 ? '' : salesStore.getData(previousPage)"
            :disabled="salesStore.currentPage == 1 ? true : false"
            :class="
              salesStore.currentPage == 1
                ? 'cursor-not-allowed'
                : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
            "
            class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >Previous</a
          >
        </li>
        <li>
          <a
            @click="salesStore.lastPage == salesStore.currentPage ? '' : salesStore.getData(nextPage)"
            :class="
              salesStore.lastPage == salesStore.currentPage
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

  <!--Confirmation Modal -->
  <Teleport to="body">
    <ConfirmationModal :show="showConfirmationModal" @close="showConfirmationModal = false" @submit="destroyData" @cancel="showConfirmationModal = false">
      <template #title>Hapus data ?</template>
      <template #submit>Hapus !</template>
      <template #cancel>Cancel</template>
    </ConfirmationModal>
  </Teleport>

  <!-- Loading Modal -->
  <Teleport to="body">
    <LoadingModal :show="salesStore.isDestroyLoading">Processing transaction</LoadingModal>
  </Teleport>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  PlusIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'

import { XMarkIcon } from '@heroicons/vue/24/solid'

import { computed, onUnmounted, onBeforeMount, defineAsyncComponent, ref, nextTick, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { IDRCurrency } from '../../utilities/formatter'
import { useSalesStore } from '../../stores/sales'
import { useLayoutStore } from '../../stores/layout'

const CircleLoading = defineAsyncComponent(() => import('../../components/loading/CircleLoading.vue'))
const ConfirmationModal = defineAsyncComponent(() => import('../../components/modal/ConfirmationModal.vue'))
const LoadingModal = defineAsyncComponent(() => import('../../components/modal/LoadingModal.vue'))
const DetailPenjualanDrawer = defineAsyncComponent(() => import('../../views/sales/drawer/DetailPenjualanDrawer.vue'))
const FilterDrawer = defineAsyncComponent(() => import('./drawer/FilterDrawer.vue'))

const router = useRouter()
const salesStore = useSalesStore()
const layoutStore = useLayoutStore()

const deleteId = ref(null)
const showConfirmationModal = ref(false)
const lengths = ref([5, 10, 20, 30, 40, 50])

const previousPage = computed(() => {
  return '&page=' + (salesStore.currentPage - 1)
})
const nextPage = computed(() => {
  return '&page=' + (salesStore.currentPage + 1)
})

salesStore.$subscribe((mutation, state) => {
  if (mutation.events.key == 'currentLimit') {
    salesStore.getData()
  }
})

async function initRightDrawer(index) {
  layoutStore.title = 'Detail Penjualan'
  layoutStore.component = shallowRef(DetailPenjualanDrawer)
  salesStore.getDrawerData(index)
  await nextTick()
  layoutStore.isRightDrawShow = true
}
async function filterDraw() {
  await nextTick()
  layoutStore.component = shallowRef(FilterDrawer)
  layoutStore.title = 'Filter Data'
  layoutStore.isRightDrawShow = true
}

async function paymentCreditView(id) {
  layoutStore.isRightDrawShow = false
  await nextTick()
  router.push({
    name: 'payment-credit',
    params: { id: id },
  })
}

async function destroyData(id) {
  showConfirmationModal.value = false
  await nextTick()
  await salesStore.destroyData(deleteId.value) // memanggil action deleteData pada store
}

function invoice(id) {
  router.push({ name: 'invoice', params: { id } })
}

function editData(id) {
  router.push({ name: 'edit-sale', params: { id } })
}

function deleteData(id) {
  deleteId.value = id
  showConfirmationModal.value = true
}

onBeforeMount(() => {
  salesStore.getData()
})

onUnmounted(() => {
  salesStore.$reset()
})
</script>
