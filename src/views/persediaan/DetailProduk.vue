<template>
  <div class="w-full flex flex-col justify-center">
    <template v-if="itemStore.singleResponses">
      <div class="flex">
        <div class="w-1/3 h-fit">
          <form>
            <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
              <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-4">Detail</h5>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Nama Produk</label>
                <input
                  :value="itemStore.singleResponses.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Merek</label>
                <input
                  :value="itemStore.singleResponses.brand?.name ?? '-'"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Unit</label>
                <input
                  :value="itemStore.singleResponses.unit.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Harga Jual Terakhir</label>
                <input
                  :value="IDRCurrency.format(itemStore.singleResponses.price?.price ?? 0)"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Harga Perolehan / Modal</label>
                <input
                  :value="itemStore.singleResponses.unit.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Persediaan</label>
                <input
                  :value="itemStore.singleResponses.ending_stock"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>

              <small class="flex justify-between"
                ><span>Date create</span> <span> {{ moment().format('DD MMMM YYYY') }}</span></small
              >
            </div>
          </form>
        </div>
        <div class="bg-white shadow-md dark:bg-gray-800 w-2/3 ml-10 rounded-lg px-6 py-6 h-fit">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Insight</h5>

          <hr class="my-5" />

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Dibawah ini merupakan performance penjualan atas produk ini dalam 3 hari terakhir</p>
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </template>

    <template v-else-if="itemStore.isLoading">
      <CircleLoading class="my-auto mx-auto" />
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500">Opss!!</h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Data yang diminta tidak ada.</p>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <PembayaranModal
        @submit-transaction="prosesTransaction"
        @submit-lunas="prosesLunas"
        :show="showPembayaranModal"
        :max-payment="itemStore.singleResponses?.remaining_credit"
        @close="showPembayaranModal = false"
      />
    </Teleport>

    <Teleport to="body">
      <LoadingModal :show="itemStore.isPaymentLoading">Processing transaction</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="itemStore.isTransactionSuccess" @submit="reload"
        ><template #message> Transaction success </template>
        <template #buttonText> Ok </template>
      </SuccessModal>
    </Teleport>
  </div>
</template>

<script setup>
import moment from 'moment'
import { computed, ref, nextTick, onMounted, defineAsyncComponent, inject } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency } from '../../utilities/formatter'
import { useItemStore } from '../../stores/items'
import CircleLoading from '../../components/loading/CircleLoading.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = {
  responsive: true,
}
const chartData = {
  labels: [moment().format('dd MMMM YYYY'), 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
}

const date = moment()

const swal = inject('$swal')
const route = useRoute()
const itemStore = useItemStore()

const LoadingModal = defineAsyncComponent(() => import('../../components/modal/LoadingModal.vue'))
const SuccessModal = defineAsyncComponent(() => import('../../components/modal/SuccessModal.vue'))

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(() => {
  if (itemStore.singleResponses == null) {
    itemStore.showData(id.value)
  }
})
</script>
