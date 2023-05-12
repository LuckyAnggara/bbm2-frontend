<template>
  <div
    :class="show == true ? '' : 'translate-x-full'"
    class="py-20 fixed top-0 right-0 z-40 w-full h-screen max-w-sm p-4 overflow-y-auto transition-transform duration-500 ease-in-out bg-white dark:bg-gray-800 shadow-md"
  >
    <div class="w-full justify-between flex items-start mb-4">
      <h5
        class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        <FunnelIcon class="h-5 w-5 mr-2" />Filter Data
      </h5>
      <button
        @click="emit('close')"
        class="text-black dark:text-white hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
      >
        <XMarkIcon class="h-5 w-5" />
        <span class="sr-only">Close menu</span>
      </button>
    </div>

    <form class="space-y-6 flex flex-col">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Tanggal</label
        >
        <vue-tailwind-datepicker
          :auto-apply="false"
          :shortcuts="false"
          :formatter="formatter"
          v-model="salesStore.filter.date"
          placeholder="Dari tanggal - Hingga tanggal"
          as-single
          use-range
          input-classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Min Grand Total</label
        >
        <InputCurrency
          :options="{ currency: 'IDR' }"
          v-model="salesStore.filter.minTotal"
          :custom-class="'block p-2.5 w-full text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        />
      </div>

      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Status</label
        >
        <ul class="w-full grid grid-flow-row-dense grid-cols-2 gap-2">
          <li v-for="i in salesStore.status" :key="i">
            <input
              type="radio"
              :id="i"
              :value="i"
              v-model="salesStore.filter.status"
              class="hidden peer"
            />
            <label
              :for="i"
              class="inline-flex text-xs text-center items-center justify-between w-full py-2 px-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-white dark:border-gray-700 peer-checked:bg-green-600 hover:text-gray-600 peer-checked:border-green-600 dark:peer-checked:text-white peer-checked:text-white hover:bg-green-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-green-600"
            >
              {{ i }}
            </label>
          </li>
        </ul>
      </div>

      <!-- <div>
        <label
          for="name"
          class="mb-2 text-sm font-medium text-gray-900 dark:text-white block"
          >Active Filter</label
        >
        <div class="space-y-2">
          <span
            v-for="filter in filters"
            :key="filter"
            class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
          >
            {{ filter }}
            <button
              type="button"
              class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
            >
              <svg
                aria-hidden="true"
                class="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
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

      <button
        :disabled="salesStore.isLoading"
        @click="submitFilter()"
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
    </form>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { FunnelIcon } from '@heroicons/vue/24/outline'

import { computed, nextTick, ref, watchEffect } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import InputCurrency from '../../components/input/InputCurrency.vue'
import { useSalesStore } from '../../stores/sales'

const porps = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['submit', 'close'])

const salesStore = useSalesStore()

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM',
})

const filters = computed(() => {
  return salesStore.filter.date.concat(salesStore.filter.status)
})

async function submitFilter() {
  salesStore.getData()
}

watchEffect(() => {
  if (!salesStore.isLoading) emit('close')
})

function getData() {
  salesStore.getData
}
</script>
