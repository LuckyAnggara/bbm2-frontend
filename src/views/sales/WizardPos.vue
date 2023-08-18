<template>
  <div class="pr-24">
    <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <!-- <li
        @click="step = 1"
        :class="[
          step == 1 ? 'text-blue-600 dark:text-blue-500' : salesStore.currentData.customerData.name ? 'text-green-600 dark:text-green-500 cursor-pointer' : '',
        ]"
        class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
      >
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <CheckCircleIcon class="w-4 h-4 mr-2 sm:w-5 sm:h-5" v-if="step == 1" />
          <span v-else class="mr-2">1.</span>
          Info <span class="hidden sm:inline-flex sm:ml-2">Pelanggan</span>
        </span>
      </li> -->
      <li
        @click="step = 1"
        :class="[
          step == 1
            ? 'text-blue-600 dark:text-blue-500'
            : salesStore.currentData.currentCart.length > 0
            ? 'text-green-600 dark:text-green-500 cursor-pointer'
            : '',
        ]"
        class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
      >
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <CheckCircleIcon class="w-4 h-4 mr-2 sm:w-5 sm:h-5" v-if="step == 1" />
          <span v-else class="mr-2">1.</span>
          Keranjang <span class="hidden sm:inline-flex sm:ml-2">Belanja</span>
        </span>
      </li>
      <li
        @click="step = 2"
        :class="[
          step == 2
            ? 'text-blue-600 dark:text-blue-500'
            : salesStore.currentData.currentCart.length > 0
            ? 'text-green-600 dark:text-green-500 cursor-pointer'
            : '',
        ]"
        class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
      >
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <CheckCircleIcon class="w-4 h-4 mr-2 sm:w-5 sm:h-5" v-if="step == 2" />
          <span v-else class="mr-2">2.</span>
          Confirmation
        </span>
      </li>
      <li @click="step = 3" :class="[step == 3 ? 'text-blue-600 dark:text-blue-500' : 'cursor-pointer']" class="flex items-center">
        <CheckCircleIcon class="w-4 h-4 mr-2 sm:w-5 sm:h-5" v-if="step == 3" />
        <span v-else class="mr-2">3.</span>
        Pembayaran
      </li>
    </ol>
  </div>
  <Transition :name="transitionName" mode="out-in">
    <div class="mt-8" :key="step">
      <!-- Info Pelanggan -->
      <!-- <CustomerInfo v-show="step == 1" @next="step++" /> -->
      <!-- Keranjang Belanja -->
      <Cart v-show="step == 1" @next="step++" @previous="step--" />
      <!-- Konfirmasi -->
      <Confirmation v-show="step == 2" @next="step++" @previous="step--" />
      <!-- Pembayaran -->
      <Payment v-show="step == 3" @next="step++" @previous="step--" @new="newTransaction" />
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import Cart from './component/Cart.vue'
import CustomerInfo from './component/CustomerInfo.vue'
import Confirmation from './component/Confirmation.vue'
import Payment from './component/Payment.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSalesStore } from '../../stores/sales'

const route = useRoute()
const salesStore = useSalesStore()

const step = ref(1)
const transitionName = ref('slide-right')
watch(step, (val, old) => {
  transitionName.value = val > old ? 'slide-left' : 'slide-right'
})

function newTransaction() {
  salesStore.$reset()
  step.value = 1
}

onUnmounted(() => {
  salesStore.$reset()
})
</script>

<style scoped>
.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-left-enter-to {
  opacity: 1;
}
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.2s;
}
</style>
