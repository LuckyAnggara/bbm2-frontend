<template>
  <!-- Start coding here -->
  <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div class="w-full md:w-1/2 flex space-x-3">
        <form class="flex items-center w-full">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <button
          type="button"
          class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <DocumentTextIcon class="mr-1 w-4 h-4" />
          Report
        </button>
        <div class="flex items-center space-x-3 w-full md:w-auto">
          <button
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>
            Filter

            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th scope="col" class="px-4 py-3 w-48 border border-l-0 border-slate-400 dark:border-slate-600" rowspan="2">Nama Akun</th>
            <th scope="col" class="px-4 py-3 w-36 border border-r-0 border-slate-400 dark:border-slate-600" colspan="3">Tanggal</th>
          </tr>
          <tr>
            <th scope="col" class="px-4 py-3 W-12 border border-slate-400 dark:border-slate-600">04 JULI 2023</th>
            <th scope="col" class="px-4 py-3 W-12 border border-slate-400 dark:border-slate-600">05 JULI 2023</th>
            <th scope="col" class="px-4 py-3 W-12 border border-r-0 border-slate-400 dark:border-slate-600">DELTA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="accountStore.isLoading">
            <td colspan="4" class="text-center py-6">
              <CircleLoading>Prosesing ... </CircleLoading>
            </td>
          </tr>
          <tr v-else-if="!accountStore.isLoading && accountStore.items.length < 1">
            <td colspan="4" class="text-center py-6">No Data</td>
          </tr>
          <tr v-else v-for="item in accountStore.items" :key="item.id" class="border-b dark:border-gray-700 text-sm">
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 dark:text-white text-left">
              {{ item.name.toUpperCase() }}
            </th>
            <td class="px-4 py-3">0</td>
            <td class="px-4 py-3">0</td>
            <td class="px-4 py-3">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {} from '@heroicons/vue/24/outline'
import { DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { onMounted, onUnmounted, ref, inject } from 'vue'
import CircleLoading from '../../components/loading/CircleLoading.vue'
import { IDRCurrency } from '../../utilities/formatter'
import { initDropdowns } from 'flowbite'
import { useAccountStore } from '../../stores/account'

const swal = inject('$swal')
const accountStore = useAccountStore()

onMounted(() => {
  accountStore.getData()
})
</script>
