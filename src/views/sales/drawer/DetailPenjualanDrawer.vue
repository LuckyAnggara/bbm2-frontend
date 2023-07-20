<template>
  <div>
    <template v-if="salesStore.showDrawerData">
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Invoice</label>
        <input
          :value="salesStore.showDrawerData.invoice"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Nama Pelanggan</label>
        <input
          :value="salesStore.showDrawerData.customer.name"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Nomor Telepon</label>
        <input
          :value="salesStore.showDrawerData.customer.phone_number"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Alamat</label>
        <textarea
          :value="salesStore.showDrawerData.customer.address"
          disabled
          rows="3"
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        ></textarea>
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Total</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.total)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Pajak</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.tax)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Ongkos Kirim</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.shipping_cost)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Grand Total</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.grand_total)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Total Pembayaran</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.total_payment ?? 0)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Sisa Kredit</label>
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.remaining_credit)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Jatuh Tempo</label>
        <input
          :value="moment(salesStore.showDrawerData.due_date).format('DD MMMM YYYY')"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <div>
        <label class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Status</label>
        <div
          v-if="salesStore.showDrawerData.credit == true"
          class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center mb-4"
        >
          KREDIT
        </div>

        <div
          v-if="salesStore.showDrawerData.status == 'LUNAS'"
          class="block bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-blue-500 dark:text-white text-center mb-4"
        >
          LUNAS
        </div>
        <div v-else class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center mb-4">
          BELUM LUNAS
        </div>
      </div>
    </template>

    <template v-else-if="salesStore.isDrawerLoading">
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
  </div>
</template>

<script setup>
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'
import CircleLoading from '../../../components/loading/CircleLoading.vue'

const porps = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const salesStore = useSalesStore()
</script>
