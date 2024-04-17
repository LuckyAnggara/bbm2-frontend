<template>
  <aside
    id="logo-sidebar"
    :class="showRightBar == true ? '' : 'translate-x-full '"
    class="fixed py-20 top-0 right-0 z-40 w-full h-screen max-w-md p-4 overflow-auto scroll-smooth scrollbar-thin scrollbar-track-slate-500 scrollbar-thumb-neutral-800 transition-transform duration-500 ease-in-out bg-white dark:bg-gray-800 shadow-md"
    aria-label="Sidebar"
  >
    <div class="w-full justify-between flex items-center mb-2">
      <h5 class="inline-flex items-center text-md font-semibold text-gray-500 uppercase dark:text-gray-400">
        {{ layoutStore.title }}
      </h5>

      <button
        @click="layoutStore.isRightDrawShow = false"
        class="text-black dark:text-white hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
      >
        <XMarkIcon class="h-5 w-5" />
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <hr class="mb-5" />

    <component :is="layoutStore.component"></component>
    <!-- <div class="px-2">
      <template v-if="salesStore.showDrawerData">
        <h5 class="inline-flex items-center mb-6 text-sm font-semibold text-black uppercase dark:text-white">Detail Penjualan</h5>
        <hr class="mb-5" />

        <div
          v-if="salesStore.showDrawerData.status == 'LUNAS'"
          class="block bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-blue-500 dark:text-white text-center mb-4"
        >
          LUNAS
        </div>
        <div v-else class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center mb-4">
          BELUM LUNAS
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Invoice</label>
          <input
            :value="salesStore.showDrawerData.invoice"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Nama Pelanggan</label>
          <input
            :value="salesStore.showDrawerData.customer.name"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Nomor Telepon</label>
          <input
            :value="salesStore.showDrawerData.customer.phone_number"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Alamat</label>
          <textarea
            :value="salesStore.showDrawerData.customer.address"
            disabled
            rows="3"
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></textarea>
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Grand Total</label>
          <input
            :value="IDRCurrency.format(salesStore.showDrawerData.grand_total)"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Total Pembayaran</label>
          <input
            :value="IDRCurrency.format(salesStore.showDrawerData.total_payment ?? 0)"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Sisa Kredit</label>
          <input
            :value="IDRCurrency.format(salesStore.showDrawerData.remaining_credit)"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Jatuh Tempo</label>
          <input
            :value="moment(salesStore.showDrawerData.due_date).format('DD MMMM YYYY')"
            disabled
            class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
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
    </div> -->
  </aside>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

import { useLayoutStore } from "@/stores/layout";

const layoutStore = useLayoutStore();

const showRightBar = computed(() => {
  return layoutStore.isRightDrawShow;
});
</script>

<script setup></script>
