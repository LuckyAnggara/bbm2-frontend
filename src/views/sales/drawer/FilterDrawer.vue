<template>
  <div>
    <div class="space-y-6 flex flex-col mb-8">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
        <vue-tailwind-datepicker
          :auto-apply="true"
          :shortcuts="false"
          :formatter="formatter"
          v-model="salesStore.filter.date"
          placeholder="Dari tanggal - Hingga tanggal"
          as-single
          use-range
          input-classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <!-- <div class="flex flex-row space-x-2">
        <button
          :disabled="salesStore.isLoading"
          @click="setThisDay"
          class="text-white bg-yellow-700 hover:bg-yellow-800 w-full font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 block"
        >
          <template v-if="salesStore.isLoading">
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </template>
          <template v-else> Hari ini </template>
        </button>

        <button
          :disabled="salesStore.isLoading"
          @click="setThisMonth"
          class="text-white bg-yellow-700 hover:bg-yellow-800 w-full font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 block"
        >
          <template v-if="salesStore.isLoading">
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </template>
          <template v-else> Bulan ini </template>
        </button>
      </div> -->

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Grand Total</label>
        <InputCurrency
          :options="{ currency: 'IDR' }"
          v-model="salesStore.filter.minTotal"
          :custom-class="'block p-2.5 w-full text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Status</label>
        <ul class="w-full grid grid-flow-row-dense grid-cols-2 gap-2">
          <li v-for="i in salesStore.paymentStatus" :key="i">
            <input
              name="payment"
              type="radio"
              :id="`payment-${i}`"
              :value="i"
              v-model="salesStore.filter.paymentStatus"
              class="hidden peer"
            />
            <label
              :for="`payment-${i}`"
              class="inline-flex text-xs text-center items-center justify-between w-full py-2 px-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-white dark:border-gray-700 peer-checked:bg-red-500 hover:text-gray-600 peer-checked:border-red-500 dark:peer-checked:text-white peer-checked:text-white hover:bg-green-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-red-500"
            >
              {{ i }}
            </label>
          </li>
        </ul>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Type</label>
        <ul class="w-full grid grid-flow-row-dense grid-cols-2 gap-2">
          <li v-for="x in salesStore.pembayaran" :key="x">
            <input
              name="pembayaran"
              type="radio"
              :id="`pembayaran-${x}`"
              :value="x"
              v-model="salesStore.filter.pembayaran"
              class="hidden peer"
            />
            <label
              :for="`pembayaran-${x}`"
              class="inline-flex text-xs text-center items-center justify-between w-full py-2 px-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-white dark:border-gray-700 peer-checked:bg-red-500 hover:text-gray-600 peer-checked:border-red-500 dark:peer-checked:text-white peer-checked:text-white hover:bg-green-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-red-500"
            >
              {{ x }}
            </label>
          </li>
        </ul>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery Status</label>
        <ul class="w-full grid grid-flow-row-dense grid-cols-2 gap-2">
          <li v-for="d in salesStore.deliveryStatus" :key="d">
            <input
              name="delivery"
              type="radio"
              :id="`delivery-${d}`"
              :value="d"
              v-model="salesStore.filter.deliveryStatus"
              class="hidden peer"
            />
            <label
              :for="`delivery-${d}`"
              class="inline-flex text-xs text-center items-center justify-between w-full py-2 px-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-white dark:border-gray-700 peer-checked:bg-red-500 hover:text-gray-600 peer-checked:border-red-500 dark:peer-checked:text-white peer-checked:text-white hover:bg-green-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-red-500"
            >
              {{ d }}
            </label>
          </li>
        </ul>
      </div>
    </div>

    <button
      :disabled="salesStore.isLoading"
      @click="salesStore.getData()"
      class="text-white bg-blue-700 hover:bg-blue-800 w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 block"
    >
      <template v-if="salesStore.isLoading">
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 mr-3 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Loading...
      </template>
      <template v-else> Filter </template>
    </button>
  </div>
</template>

<script setup>
import { FunnelIcon } from "@heroicons/vue/24/outline";
import { nextTick, ref, watchEffect } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import InputCurrency from "@/components/input/InputCurrency.vue";
import moment from "moment";

import { useSalesStore } from "@/stores/sales";

const salesStore = useSalesStore();

const porps = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

function setThisMonth() {
  const payload = [moment().startOf("month").format("DD MMM YYYY"), moment().endOf("month").format("DD MMM YYYY")];
  salesStore.changeDateFilter(payload);
  salesStore.getData();
}

function setThisDay() {
  const payload = [moment().format("DD MMM YYYY"), moment().format("DD MMM YYYY")];
  salesStore.changeDateFilter(payload);
  salesStore.getData();
}
</script>
