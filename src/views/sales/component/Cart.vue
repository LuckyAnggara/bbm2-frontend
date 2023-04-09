<template>
  <section class="w-full flex flex-col relative justify-between">
    <div class="flex sm:flex-row flex-col sm:space-x-6 space-y-6 sm:space-y-0">
      <div
        class="relative bg-white shadow-md dark:bg-gray-800 rounded-lg h-fit"
      >
        <div class="flex flex-row items-center justify-between p-4 space-y-4">
          <div>
            <Searchbar
              @cari-data="cariData()"
              v-model="itemStore.searchName"
              :is-loading="itemStore.isLoading"
              :result-items="itemStore.items"
              :placeholder="'Cari Item'"
              :aria-result="false"
              @add-data="addItem"
            >
              <template v-slot:button>
                <span class="ml-1">Add product</span>
              </template>
            </Searchbar>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4 items-end w-full">
        <div class="overflow-x-auto shadow-md rounded-lg w-full h-fit">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400 px-2 py-4"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="py-3 w-16 text-center">No</th>
                <th scope="col" class="px-2 py-3 md:w-52 w-full">
                  Nama Produk
                </th>
                <th scope="col" class="px-2 py-3 md:w-48 w-full">Harga</th>
                <th scope="col" class="px-2 py-3 md:w-20 w-full">Qty</th>
                <th scope="col" class="px-2 py-3 md:w-20 w-full">Satuan</th>
                <th scope="col" class="px-2 py-3 md:w-24 w-full">Diskon</th>
                <th scope="col" class="px-2 py-3 md:w-32 w-full">Subtotal</th>
                <th scope="col" class="px-2 py-3 md:w-16 w-full">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="salesStore.currentData.currentCart.length < 1"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td colspan="8" class="px-6 py-4 text-center">
                  <span class="text-xl dark:text-gray-200 text-black"
                    >Tidak ada data</span
                  >
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in salesStore.currentData.currentCart"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-md"
              >
                <td class="px-3 py-4 text-center">{{ 1 + index }}</td>
                <th
                  scope="row"
                  class="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item.name.toUpperCase() }}
                </th>

                <td class="px-2 py-4">
                  <InputCurrency
                    :options="{ currency: 'IDR' }"
                    v-model="item.price"
                    :custom-class="'sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium'"
                  />
                </td>
                <td class="px-2 py-4">
                  <input
                    min="0"
                    type="number"
                    class="sm:w-full w-20 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium"
                    v-model="item.qty"
                  />
                </td>
                <td
                  class="px-2 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item.unit?.toUpperCase() }}
                </td>
                <td class="px-2 py-4">
                  <InputCurrency
                    :options="{ currency: 'IDR' }"
                    :custom-class="'sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium'"
                    v-model="item.disc"
                  />
                </td>
                <td
                  class="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ IDRCurrency.format(item.qty * item.price - item.disc) }}
                </td>
                <td class="px-2 py-4">
                  <TrashIcon
                    @click="removeItem(index)"
                    class="h-6 w-6 hover:text-red-500 cursor-pointer hover:animate-bounce"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between w-full">
          <button
            @click="emit('previous')"
            type="button"
            class="text-red-600 inline-flex items-center hover:text-white border hover:translate-x-2 ease-in-out duration-300 border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <ArrowUturnLeftIcon class="h-5 w-5 mr-2" />

            Kembali
          </button>

          <button
            v-if="canSubmit"
            @click="emit('next')"
            type="button"
            class="text-blue-600 inline-flex items-center hover:text-white border hover:translate-x-2 ease-in-out duration-300 border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
          >
            Lanjut
            <PaperAirplaneIcon class="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  TrashIcon,
  PaperAirplaneIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/vue/24/outline'

import { ref, reactive, computed, onUnmounted } from 'vue'
import { useItemStore } from '../../../stores/persediaan'
import { IDRCurrency } from '../../../utilities/formatter'
import { useToast } from 'vue-toastification'

import Searchbar from '../../../components/input/Searchbar.vue'
import InputCurrency from '../../../components/input/InputCurrency.vue'
import { useSalesStore } from '../../../stores/sales'

const emit = defineEmits(['next', 'previous'])

const toast = useToast()
const itemStore = useItemStore()
const salesStore = useSalesStore()

const canSubmit = computed(() => {
  if (salesStore.currentData.currentCart.length > 0) {
    return true
  }
  return false
})

// Function
function cariData() {
  itemStore.currentLimit = 5
  itemStore.getData()
}

function addItem(item) {
  if (!checkItem(item.id)) {
    salesStore.currentData.currentCart.push({
      id: item.id,
      name: item.name,
      unit: item.unit.name,
      price: 0,
      qty: 1,
      disc: 0,
    })
    toast.success('Item baru di tambahkan', {
      timeout: 1000,
      position: 'bottom-left',
    })
  } else {
    toast.error('Item sudah ada', {
      timeout: 1000,
      position: 'bottom-left',
    })
  }
}

function removeItem(index) {
  salesStore.currentData.currentCart.splice(index, 1)
  toast.info('Item dihapus', {
    timeout: 1000,
    position: 'bottom-right',
  })
}

function checkItem(id) {
  const b = salesStore.currentData.currentCart.find((e) => e.id == id)
  if (b) {
    return true
  }
  return false
}

onUnmounted(() => {
  itemStore.$reset()
})
</script>
