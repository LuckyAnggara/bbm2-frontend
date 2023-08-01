<template>
  <section class="flex w-full">
    <div class="lg:w-3/6 w-full mx-auto">
      <div class="flex flex-col space-y-5 w-full">
        <div class="relative h-fit bg-white shadow-md dark:bg-gray-800 md:rounded-lg py-5 px-2">
          <div class="flex flex-col space-y-2 px-6">
            <div class="">
              <div class="pt-6 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-lg w-1/3">Nama</span>
                <span class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.currentData.customerData?.name?.toUpperCase()
                }}</span>
              </div>
            </div>
            <div class="">
              <div class="dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-lg w-1/3">Alamat</span>
                <span class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.currentData.customerData?.address
                }}</span>
              </div>
            </div>
            <div class="">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-lg w-1/3">Nomor Telepon</span>
                <span class="text-lg font-normal cursor-pointer break-words flex-wrap w-2/3 text-right" @click="showModal = true">{{
                  salesStore.currentData.customerData?.phone_number?.toUpperCase()
                }}</span>
              </div>
            </div>
            <div class="">
              <div class="dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-lg">Subtotal</span>
                <span class="text-lg font-normal">{{ IDRCurrency.format(subTotal) }}</span>
              </div>
            </div>
            <div class="">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin">
                <span class="text-lg">Diskon</span>
                <span class="text-lg text-red-600 font-normal">{{ IDRCurrency.format(discount) }}</span>
              </div>
            </div>
            <div class="">
              <div class="border-b-2 dark:border-gray-600 border-gray-400 py-3 dark:text-white text-black flex justify-between flex-row font-medium">
                <span class="text-lg"></span>
                <span class="text-lg">{{ IDRCurrency.format(totalBeforeTax) }}</span>
              </div>
            </div>
            <!-- <div class="">
              <div class="dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-medium">
                <div class="flex items-center">
                  <label class="relative inline-flex cursor-pointer">
                    <input type="checkbox" class="sr-only peer" v-model="pajakOn" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="text-lg ml-4">Pajak ({{ nomPajak * 100 }}%)</span>
                  </label>
                </div>

                <span class="text-red-600 font-normal">{{ IDRCurrency.format(tax) }}</span>
              </div>
            </div> -->
            <div class="border-b-2 dark:border-gray-600 border-gray-400 mb-2">
              <div class="dark:text-white text-black flex justify-between flex-row font-thin w-full">
                <div class="flex justify-center items-center space-x-2">
                  <label for="brand" class="block text-lg text-gray-900 dark:text-white py-2.5">Pajak</label>
                  <DotLoading v-if="taxStore.isLoading" />
                  <div v-else class="flex flex-row space-x-2">
                    <select
                      v-model="nomPajak"
                      class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0" disabled>Pilih Pajak</option>
                      <option v-for="item in taxStore.items" :key="item.id" :value="item.value">{{ item.name.toUpperCase() }} ({{ item.value * 100 }}%)</option>
                    </select>
                  </div>
                </div>
                <span class="text-red-600 font-normal py-2.5">{{ IDRCurrency.format(tax) }}</span>
              </div>
            </div>
            <div class="">
              <div class="dark:border-gray-600 border-gray-400 py-3 dark:text-white text-black flex justify-between flex-row font-medium">
                <span class="text-lg">Total</span>
                <span class="text-2xl" :class="[total < 0 ? 'text-red-500' : '']">{{ IDRCurrency.format(total) }}</span>
              </div>
            </div>
            <div class="">
              <div class="dark:border-gray-600 border-gray-400 dark:text-white text-black flex justify-between flex-row font-thin">
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
      <ShippingModal :show="showShippingModal" @close="showShippingModal = false" @next="emit('next')"> </ShippingModal>
    </Teleport>
  </section>
</template>

<script setup>
import { PaperAirplaneIcon, ArrowUturnLeftIcon, TruckIcon } from '@heroicons/vue/24/outline'

import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'
import { useAuthStore } from '../../../stores/auth'
import { useTaxDetailStore } from '../../../stores/taxDetail'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import DotLoading from '../../../components/loading/DotLoading.vue'
import ShippingModal from '../modal/ShippingModal.vue'

const emit = defineEmits(['next', 'previous'])

const salesStore = useSalesStore()
const authStore = useAuthStore()
const taxStore = useTaxDetailStore()

const pajakOn = ref(false)
const nomPajak = ref(0)
const ongkosKirim = ref(0)
const showShippingModal = ref(false)

// Computed
const subTotal = computed(() => {
  let sum = salesStore.currentData.currentCart.reduce((accumulator, item) => {
    return accumulator + item.price * item.qty
  }, 0)
  return sum
})
const discount = computed(() => {
  let sum = salesStore.currentData.currentCart.reduce((accumulator, item) => {
    return accumulator + item.disc
  }, 0)
  return sum
})
const totalBeforeTax = computed(() => {
  return subTotal.value - discount.value
})
const total = computed(() => {
  return totalBeforeTax.value + tax.value + ongkosKirim.value
})
const tax = computed(() => {
  return totalBeforeTax.value * nomPajak.value
})

async function chooseShipping(type) {
  salesStore.currentData.shipping = {
    type: type,
    fee: 0,
  }
  salesStore.currentData.total = {
    subTotal: subTotal,
    discount: discount,
    tax: tax,
    totalBeforeTax: totalBeforeTax,
    total: total.value,
  }
  salesStore.currentData.user = {
    id: authStore.userData.id,
    branchId: authStore.userData.branch_id,
  }

  if (type == 'TAKE AWAY') {
    await nextTick()
    emit('next')
  } else {
    showShippingModal.value = true
  }
}

// Watcher
watch(pajakOn, (value) => {
  if (value == true) tax.value = totalBeforeTax.value * nomPajak.value
  else tax.value = 0
})

onMounted(() => {
  taxStore.getData()
})
</script>
