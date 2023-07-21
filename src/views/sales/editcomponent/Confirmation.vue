<template>
  <section class="flex w-full">
    <div class="sm:w-3/6 w-full mx-auto">
      <div class="flex flex-col space-y-5 w-full">
        <div class="relative h-fit bg-white shadow-md dark:bg-gray-800 md:rounded-lg py-5 px-2">
          <ul class="">
            <li class="px-6 mb">
              <div class="pt-6 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-xl w-1/3">Nama</span>
                <span class="text-xl font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.singleResponses.customer?.name.toUpperCase()
                }}</span>
              </div>
            </li>
            <li class="px-6 mb">
              <div class="pt-3 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-md w-1/3">Alamat</span>
                <span class="text-base font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.singleResponses.customer?.address
                }}</span>
              </div>
            </li>
            <li class="px-6 mb">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 pt-3 pb-4 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-md w-1/3">Nomor Telepon</span>
                <span class="text-xl font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.singleResponses.customer?.phone_number?.toUpperCase()
                }}</span>
              </div>
            </li>
            <li class="px-6">
              <div class="dark:border-gray-600 border-gray-400 pt-6 pb-2 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-xl">Subtotal</span>
                <span class="text-xl font-normal">{{ IDRCurrency.format(subTotal) }}</span>
              </div>
            </li>
            <li class="px-6">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 pb-6 pt-2 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-xl">Diskon</span>
                <span class="text-xl text-red-600 font-normal">{{ IDRCurrency.format(discount) }}</span>
              </div>
            </li>
            <li class="px-6">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium">
                <span class="text-xl"></span>
                <span class="text-xl">{{ IDRCurrency.format(totalBeforeTax) }}</span>
              </div>
            </li>
            <li class="px-6">
              <div class="dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium">
                <div class="flex items-center">
                  <label class="relative inline-flex cursor-pointer">
                    <input type="checkbox" class="sr-only peer" v-model="pajakOn" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="text-xl ml-4">Pajak ({{ nomPajak * 100 }}%)</span>
                  </label>
                </div>

                <span class="text-red-600 font-normal">{{ IDRCurrency.format(salesStore.singleResponses.tax) }}</span>
              </div>
            </li>
            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 pb-6 pt-2 dark:text-white text-black flex justify-between flex-row font-medium items-center"
              >
                <span class="text-xl">Ongkos Kirim</span>
                <InputCurrency
                  :options="{ currency: 'IDR' }"
                  v-model="salesStore.singleResponses.shipping_cost"
                  :custom-class="'block p-2.5 w-1/2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                />
              </div>
            </li>

            <li class="px-6">
              <div class="dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex justify-between flex-row font-medium">
                <span class="text-xl">Total</span>
                <span class="text-3xl" :class="[total < 0 ? 'text-red-500' : '']">{{ IDRCurrency.format(total) }}</span>
              </div>
            </li>
          </ul>

          <!-- <ul
            v-if="
              salesStore.currentData.currentCart.length > 0 &&
              salesStore.currentData.customerData
            "
          >
            <li class="px-6">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 py-6 dark:text-white text-black flex flex-col justify-between font-medium space-y-4"
              >
                <span class="text-xl">Metode Pembayaran</span>
                <div
                  class="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-4"
                >
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
                    v-if="salesStore.currentData.customerData.id"
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

          <ul v-else>
            <li class="px-6">
              <small class="text-red-500">
                Lengkapi data untuk proses transaksi</small
              >
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
                    <ArrowPathIcon class="h-6 w-6 mr-3" />
                    Reset
                  </button>
                </div>
              </div>
            </li>
          </ul> -->
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
            @click="submit()"
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
import { PaperAirplaneIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'

import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'
import InputCurrency from '../../../components/input/InputCurrency.vue'
import { useAuthStore } from '../../../stores/auth'

const emit = defineEmits(['next', 'previous'])

const salesStore = useSalesStore()
const authStore = useAuthStore()

const pajakOn = ref(false)
const nomPajak = ref(11 / 100)
const tax = ref(0)
const ongkosKirim = ref(0)

// Computed
const subTotal = computed(() => {
  let sum = salesStore.singleResponses.detail.reduce((accumulator, item) => {
    return accumulator + item.price * item.qty
  }, 0)
  return sum
})
const discount = computed(() => {
  let sum = salesStore.singleResponses.detail.reduce((accumulator, item) => {
    return accumulator + item.discount
  }, 0)
  return sum
})
const totalBeforeTax = computed(() => {
  return subTotal.value - salesStore.singleResponses.discount
})
const total = computed(() => {
  return totalBeforeTax.value + salesStore.singleResponses.tax + salesStore.singleResponses.shipping_cost
})

onMounted(() => {
  if (salesStore.singleResponses.tax > 0) {
    pajakOn.value = true
  }
})

async function submit() {
  salesStore.currentData.user = {
    id: authStore.userData.id,
    branchId: authStore.userData.branch_id,
  }

  await nextTick()
  emit('next')
}
// Watcher
watch(pajakOn, (value) => {
  if (value == true) salesStore.singleResponses.tax = totalBeforeTax.value * nomPajak.value
  else salesStore.singleResponses.tax = 0
})
</script>
