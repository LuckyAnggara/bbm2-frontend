<template>
  <section class="flex w-full">
    <div class="lg:w-3/6 w-full mx-auto">
      <div class="flex flex-col space-y-5 w-full">
        <div
          class="relative h-fit bg-white shadow-md dark:bg-gray-800 md:rounded-lg py-5 px-2"
        >
          <div class="flex flex-col space-y-2 px-6">
            <div class="">
              <div
                class="pt-6 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg w-1/3">Nama</span>
                <span
                  class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right"
                  @click="showModal = true"
                  >{{
                    salesStore.currentData.customerData?.name?.toUpperCase()
                  }}</span
                >
              </div>
            </div>
            <div class="">
              <div
                class="dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg w-1/3">Alamat</span>
                <span
                  class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right"
                  @click="showModal = true"
                  >{{ salesStore.currentData.customerData?.address }}</span
                >
              </div>
            </div>
            <div class="">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg w-1/3">Nomor Telepon</span>
                <span
                  class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right"
                  @click="showModal = true"
                  >{{
                    salesStore.currentData.customerData?.phone_number?.toUpperCase()
                  }}</span
                >
              </div>
            </div>
            <div class="">
              <div
                class="dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg">Subtotal</span>
                <span class="text-lg font-normal">{{
                  IDRCurrency.format(salesStore.subTotal)
                }}</span>
              </div>
            </div>
            <div class="">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg">Diskon</span>
                <span class="text-lg text-red-600 font-normal">{{
                  IDRCurrency.format(salesStore.discount)
                }}</span>
              </div>
            </div>
            <div class="">
              <div
                class="border-b-2 dark:border-gray-600 border-gray-400 py-3 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-lg"></span>
                <span class="text-lg">{{
                  IDRCurrency.format(salesStore.totalBeforeTax)
                }}</span>
              </div>
            </div>

            <div class="border-b-2 dark:border-gray-600 border-gray-400 mb-2">
              <div
                class="dark:text-white text-black flex justify-between flex-row font-thin w-full mb-2"
              >
                <div class="flex justify-center items-center space-x-8">
                  <label
                    for="brand"
                    class="block text-lg text-gray-900 dark:text-white py-2.5"
                    >Pajak</label
                  >
                  <DotLoading v-if="taxStore.isLoading" />
                  <div v-else class="flex flex-row">
                    <select
                      v-model="salesStore.currentData.tax"
                      class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option
                        v-for="item in taxStore.items"
                        :key="item.id"
                        :value="item"
                      >
                        {{ item.name.toUpperCase() }} ({{ item.value * 100 }}%)
                      </option>
                    </select>
                  </div>
                </div>
                <span class="text-red-600 font-normal py-2.5">{{
                  IDRCurrency.format(salesStore.tax)
                }}</span>
              </div>
            </div>
            <div class="">
              <div
                class="dark:border-gray-600 border-gray-400 py-3 dark:text-white text-black flex justify-between flex-row font-medium"
              >
                <span class="text-lg">Total</span>
                <span
                  class="text-2xl"
                  :class="[salesStore.grandTotal < 0 ? 'text-red-500' : '']"
                  >{{ IDRCurrency.format(salesStore.grandTotal) }}</span
                >
              </div>
            </div>
            <div class="">
              <div
                class="dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin"
              >
                <span class="text-lg">Pengiriman</span>
              </div>

              <div class="flex flex-row justify-center space-x-6">
                <button
                  @click="chooseShipping('TAKE AWAY')"
                  type="button"
                  class="w-48 flex-col text-blue-700 border border-blue-700 hover:bg-blue-700 dark:bg-blue-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                >
                  <ShoppingBagIcon class="h-24 w-24" />
                  Take Away
                </button>
                <button
                  @click="chooseShipping('DELIVERY')"
                  type="button"
                  class="w-48 flex-col text-red-700 border border-red-700 hover:bg-red-700 dark:bg-red-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                >
                  <TruckIcon class="h-24 w-24" />
                  Delivery
                </button>
              </div>
            </div>
          </div>
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

          <!-- <button
            @click="submit()"
            type="button"
            class="text-blue-600 inline-flex items-center hover:text-white border hover:translate-x-2 ease-in-out duration-300 border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
          >
            Lanjut
            <PaperAirplaneIcon class="h-5 w-5 ml-2" />
          </button> -->
        </div>
      </div>
    </div>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <ShippingModal
        :show="showShippingModal"
        @close="showShippingModal = false"
        @next="emit('next')"
      >
      </ShippingModal>
    </Teleport>
  </section>
</template>

<script setup>
import {
  PaperAirplaneIcon,
  TruckIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/vue/24/outline'

import { ref, nextTick, onMounted } from 'vue'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'
import { useTaxDetailStore } from '../../../stores/taxDetail'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import DotLoading from '../../../components/loading/DotLoading.vue'
import ShippingModal from '../modal/ShippingModal.vue'

const emit = defineEmits(['next', 'previous'])

const salesStore = useSalesStore()
const taxStore = useTaxDetailStore()

const showShippingModal = ref(false)

async function chooseShipping(type) {
  if (type == 'TAKE AWAY') {
    salesStore.$patch((state) => {
      state.currentData.shipping.type = type
      state.currentData.shipping.fee = 0
    })
    await nextTick()
    emit('next')
  } else {
    salesStore.$patch((state) => {
      state.currentData.shipping.type = type
    })
    showShippingModal.value = true
  }
}

onMounted(() => {
  taxStore.getData()
})
</script>
