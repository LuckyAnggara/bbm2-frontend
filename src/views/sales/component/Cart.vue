<template>
  <section class="w-full flex flex-col relative justify-between">
    <div class="flex items-center justify-between w-full mb-4">
      <button
        @click="emit('previous')"
        type="button"
        class="text-red-600 inline-flex items-center hover:text-white border hover:-translate-x-2 ease-in-out duration-300 border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
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

    <div class="flex lg:flex-row flex-col lg:space-x-6 space-y-6 lg:space-y-0">
      <div class="relative bg-white shadow-md dark:bg-gray-800 rounded-lg h-fit">
        <div class="flex flex-row items-center justify-between p-4 space-y-4">
          <div class="w-full xl:w-72">
            <Searchbar
              @cari-data="cariData()"
              v-model="itemStore.searchName"
              :is-loading="itemStore.isLoading"
              :result-items="itemStore.items"
              :placeholder="'Cari Item'"
              :aria-result="false"
              @add-data="addItem"
            >
            </Searchbar>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4 items-end w-full">
        <div class="overflow-auto shadow-md rounded-lg w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
          <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400 xl:table-fixed">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 w-4 text-center">No</th>
                <th scope="col" class="py-3 w-36">Nama Produk</th>
                <th scope="col" class="py-3 w-16">Harga</th>
                <th scope="col" class="py-3 w-6">Qty</th>
                <th scope="col" class="py-3 w-6">Satuan</th>
                <th scope="col" class="py-3 w-12">Diskon</th>
                <th scope="col" class="px-2 py-3 w-12">Subtotal</th>
                <th scope="col" class="py-3 w-8">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="salesStore.currentData.currentCart.length < 1" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="8" class="px-6 text-center py-4">
                  <span class="text-lg dark:text-gray-300 text-black">Tidak ada data</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in salesStore.currentData.currentCart"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
              >
                <td class="text-center">
                  <span>{{ 1 + index }}</span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.name.toUpperCase() }}
                  </span>
                </td>

                <td class="">
                  <InputCurrency
                    @dblclick="showPrice(item, index)"
                    :options="{ currency: 'IDR' }"
                    v-model="item.price"
                    :custom-class="'text-xs  sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                  />
                </td>
                <td class="">
                  <input
                    min="0"
                    type="number"
                    :class="[item.qty > item.stock ? 'dark:bg-red-400 bg-red-300' : 'dark:bg-gray-700 bg-gray-100']"
                    class="sm:w-full text-xs w-20 text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                    v-model="item.qty"
                  />
                </td>
                <td class="text-xs text-gray-900 dark:text-white px-2">
                  {{ item.unit?.toUpperCase() }}
                </td>
                <td class="">
                  <InputCurrency
                    :options="{ currency: 'IDR' }"
                    :custom-class="'text-xs sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                    v-model="item.disc"
                  />
                </td>
                <td class="text-gray-900 dark:text-white text-xs font-bold px-2 text-ellipsis">
                  {{ IDRCurrency.format(item.qty * item.price - item.disc) }}
                </td>
                <td class="">
                  <TrashIcon @click="removeItem(index)" class="h-6 w-6 hover:text-red-500 cursor-pointer hover:animate-bounce" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <PriceModal :show="showPriceModal" @close="showPriceModal = false" @set-item="setPrice" :item-title="itemTitle" />
    </Teleport>
  </section>
</template>

<script setup>
import { TrashIcon, PaperAirplaneIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'

import { ref, reactive, computed, onUnmounted, defineAsyncComponent } from 'vue'
import { useItemStore } from '../../../stores/items'
import { IDRCurrency } from '../../../utilities/formatter'
import { useToast } from 'vue-toastification'

import Searchbar from '../../../components/input/Searchbar.vue'
import InputCurrency from '../../../components/input/InputCurrency.vue'
import { useSalesStore } from '../../../stores/sales'
import { useItemPriceStore } from '../../../stores/itemPrice'

const emit = defineEmits(['next', 'previous'])

const toast = useToast()
const itemStore = useItemStore()
const salesStore = useSalesStore()
const itemPriceStore = useItemPriceStore()

const showPriceModal = ref(false)
const itemTitle = ref('')
const itemIndex = ref(0)

const canSubmit = computed(() => {
  if (salesStore.currentData.currentCart.length > 0) {
    return true
  }
  return false
})

const PriceModal = defineAsyncComponent(() => import('../modal/PriceModal.vue'))

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
      price: item.price ? item.price.price : 0,
      stock: item.ending_stock,
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

function setPrice(x) {
  salesStore.currentData.currentCart[itemIndex.value].price = x
  showPriceModal.value = false
}

function showPrice(item, index) {
  showPriceModal.value = true
  itemPriceStore.getData(item.id)
  itemTitle.value = item.name
  itemIndex.value = index
}

onUnmounted(() => {
  itemStore.$reset()
})
</script>
