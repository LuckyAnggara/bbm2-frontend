<template>
  <div class="flex flex-row space-x-6">
    <!-- Right Section for Table -->
    <section class="w-4/6 flex flex-col relative justify-between">
      <!-- Start coding here -->
      <div class="flex flex-col space-y-5">
        <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div
            class="flex flex-col items-center justify-between p-4 space-y-2 md:flex-row md:space-y-0 md:space-x-4"
          >
            <div>
              <Searchbar
                @cari-data="cariData()"
                v-model="itemStore.searchName"
                :is-loading="itemStore.isLoading"
                :result-items="itemStore.items"
                :placeholder="'Cari Item'"
                @add-data="addItem"
              >
                <template v-slot:button>
                  <span class="ml-1">Add product</span>
                </template>
              </Searchbar>
            </div>

            <div
              class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <button
                @click="showModal = true"
                type="button"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300 ease-in-out transition transform hover:-translate-x-2"
              >
                <UserIcon class="h-5 w-5 mr-1" />
                Pelanggan
              </button>

              <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <CustomerModal
                  :show="showModal"
                  @close="showModal = false"
                  @sendCustomer="updateCustomer"
                >
                </CustomerModal>
              </Teleport>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400 px-2"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="py-3 w-16 text-center">No</th>
                <th scope="col" class="px-2 py-3 w-60">Nama Produk</th>
                <th scope="col" class="px-2 py-3 w-36">Harga</th>
                <th scope="col" class="px-2 py-3 w-20">Qty</th>
                <th scope="col" class="px-2 py-3 w-20">Satuan</th>
                <th scope="col" class="px-2 py-3 w-24">Diskon</th>
                <th scope="col" class="px-2 py-3 w-32">Subtotal</th>
                <th scope="col" class="px-2 py-3 w-16">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="currentCart.length < 1"
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
                v-for="(item, index) in currentCart"
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
                  <input
                    min="0"
                    type="number"
                    class="w-full dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium"
                    v-model="item.price"
                  />
                </td>
                <td class="px-2 py-4">
                  <input
                    min="0"
                    type="number"
                    class="w-full dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium"
                    v-model="item.qty"
                  />
                </td>
                <td
                  class="px-2 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item.unit?.toUpperCase() }}
                </td>
                <td class="px-2 py-4">
                  <input
                    min="0"
                    type="number"
                    class="w-full dark:bg-gray-700 bg-gray-100 text-black dark:text-white border border-gray-800 text-md rounded-lg p-2 font-medium"
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
                    class="h-6 w-6 hover:text-blue-500 cursor-pointer hover:animate-bounce"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Left Section for Detail -->

    <section class="w-2/6">
      <div class="flex flex-col space-y-5">
        <div
          class="relative h-fit bg-white shadow-md dark:bg-gray-800 sm:rounded-lg py-2 px-2"
        >
          <ul class="">
            <li class="px-6 mb">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 pt-6 pb-4 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-xl w-1/3">Pelanggan</span>
                <span
                  class="text-xl font-normal cursor-pointer break-words flex-wrap w-1/3 text-right"
                  @click="showModal = true"
                  >{{ currentCustomer.name?.toUpperCase() }}</span
                >
              </div>
            </li>
            <li class="px-6">
              <div
                class="dark:border-gray-600 border-gray-400 pt-6 pb-2 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-xl">Subtotal</span>
                <span class="text-xl font-normal">{{
                  IDRCurrency.format(subTotal)
                }}</span>
              </div>
            </li>
            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 pb-6 pt-2 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-xl">Diskon</span>
                <span class="text-xl text-red-600 font-normal">{{
                  IDRCurrency.format(discount)
                }}</span>
              </div>
            </li>
            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-xl"></span>
                <span class="text-xl">{{
                  IDRCurrency.format(totalBeforeTax)
                }}</span>
              </div>
            </li>

            <li class="px-6">
              <div
                class="dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <div class="flex items-center">
                  <label class="relative inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      v-model="pajakOn"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="text-xl ml-4"
                      >Pajak ({{ nomPajak * 100 }}%)</span
                    >
                  </label>
                </div>

                <span class="text-red-600 font-normal">{{
                  IDRCurrency.format(tax)
                }}</span>
              </div>
            </li>

            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 pb-6 pt-2 dark:text-white text-black flex justify-between flex-row font-medium items-center"
              >
                <span class="text-xl">Ongkos Kirim</span>
                <InputCurrency
                  :options="{ currency: 'IDR' }"
                  v-model="ongkosKirim"
                  :custom-class="'block p-2.5 w-1/2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                />
              </div>
            </li>

            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-xl">Total</span>
                <span
                  class="text-xl"
                  :class="[total < 0 ? 'text-red-500' : '']"
                  >{{ IDRCurrency.format(total) }}</span
                >
              </div>
            </li>
          </ul>

          <ul>
            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-xl">Metode Pembayaran</span>
                <div class="flex-col space-y-6">
                  <button
                    @click="modalCash"
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <BanknotesIcon class="h-6 w-6 mr-3" />
                    Cash
                  </button>

                  <button
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <CreditCardIcon class="h-6 w-6 mr-3" />
                    Card
                  </button>

                  <button
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <QrCodeIcon class="h-6 w-6 mr-3" />
                    QRis
                  </button>

                  <button
                    v-if="currentCustomer.id"
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <BookOpenIcon class="h-6 w-6 mr-3" />
                    Kredit
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <ul>
            <li class="px-6">
              <div
                class="dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-xl">Opsi</span>
                <div class="flex-col space-y-6">
                  <button
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <BookmarkIcon class="h-6 w-6 mr-3" />
                    Draft
                  </button>

                  <button
                    type="button"
                    class="w-40 flex items-center justify-center px-4 py-2 font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 duration-300 ease-in-out transition transform hover:-translate-y-2"
                  >
                    <XMarkIcon class="h-6 w-6 mr-3" />
                    Reset
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <CashModal
        :show="showCashModal"
        @close="showCashModal = false"
        @submitTransaction="submitTransaction"
      >
      </CashModal>
    </Teleport>

    <!-- Loading Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <LoadingModal :show="salesStore.isStoreLoading"
        >Processing transaction</LoadingModal
      >
    </Teleport>

    <!-- Loading Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <SuccessModal
        :show="salesStore.isTransactionSuccess"
        @submit="salesStore.isTransactionSuccess = false"
        ><template #message> Transaction success </template>
        <template #buttonText> Next </template>
      </SuccessModal>
    </Teleport>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  nextTick,
  defineAsyncComponent,
} from 'vue'
import {
  PlusIcon,
  TrashIcon,
  BanknotesIcon,
  CreditCardIcon,
  QrCodeIcon,
  BookOpenIcon,
  UserIcon,
  BookmarkIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useItemStore } from '../../stores/persediaan'
import { useSalesStore } from '../../stores/sales'
import { useToast } from 'vue-toastification'
import { IDRCurrency } from '../../utilities/formatter'
import CustomerModal from './CustomerModal.vue'
import CashModal from './CashModal.vue'

import Searchbar from '../../components/input/Searchbar.vue'
import InputCurrency from '../../components/input/InputCurrency.vue'

const toast = useToast()
const itemStore = useItemStore()
const salesStore = useSalesStore()

// data
const showModal = ref(false)
const showCashModal = ref(false)

const currentCart = reactive([])
const pajakOn = ref(false)
const nomPajak = ref(11 / 100)
const tax = ref(0)
const ongkosKirim = ref(0)
const currentCustomer = ref({})

const LoadingModal = defineAsyncComponent(() =>
  import('../../components/modal/LoadingModal.vue')
)
const SuccessModal = defineAsyncComponent(() =>
  import('../../components/modal/SuccessModal.vue')
)

// Computed
const subTotal = computed(() => {
  let sum = currentCart.reduce((accumulator, item) => {
    return accumulator + item.price * item.qty
  }, 0)
  return sum
})
const discount = computed(() => {
  let sum = currentCart.reduce((accumulator, item) => {
    return accumulator + item.disc
  }, 0)
  return sum
})
const totalBeforeTax = computed(() => {
  return subTotal.value - discount.value
})
const total = computed(() => {
  return totalBeforeTax.value - tax.value + ongkosKirim.value
})

// Watcher
watch(pajakOn, (value) => {
  if (value == true) tax.value = totalBeforeTax.value * nomPajak.value
  else tax.value = 0
})

// Function
function cariData() {
  itemStore.currentLimit = 5
  itemStore.getData()
}

function addItem(item) {
  if (!checkItem(item.id)) {
    currentCart.push({
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

function checkItem(id) {
  const b = currentCart.find((e) => e.id == id)
  if (b) {
    return true
  }
  return false
}

function removeItem(index) {
  currentCart.splice(index, 1)
  toast.info('Item dihapus', {
    timeout: 1000,
    position: 'bottom-right',
  })
}

function updateCustomer(n) {
  currentCustomer.value = n
}

function modalCash() {
  if (updateStore()) {
    nextTick()
    showCashModal.value = true
  }
}

async function submitTransaction() {
  showCashModal.value = false
  await nextTick()
  salesStore.store()
}

function updateStore() {
  if (currentCart.length > 0 && currentCustomer.value.name) {
    salesStore.currentData = {
      customer: currentCustomer.value,
      cart: currentCart,
      total: {
        subTotal: subTotal,
        discount: discount,
        tax: tax,
        totalBeforeTax: totalBeforeTax,
        shipping: ongkosKirim.value,
        total: total.value,
      },
    }
    return true
  } else {
    toast.error('Data belum di lengkapi', {
      timeout: 2000,
      position: 'bottom-right',
    })
    return false
  }
}
</script>
