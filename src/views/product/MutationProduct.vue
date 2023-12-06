<template>
  <!-- Start coding here -->
  <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div class="w-full md:w-1/2 flex space-x-3">
        <div class="flex items-center">
          <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
          <select
            v-model="itemStore.currentLimit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-16 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
          >
            <option :selected="itemStore.currentLimit == length ? true : false" v-for="length in lengths" :key="length">
              {{ length }}
            </option>
          </select>
        </div>

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
      <div
        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="h-4 w-4 mr-2 text-gray-400"
              viewbox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>
            Filter

            <svg
              class="-mr-1 ml-1.5 w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
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
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th scope="col" class="px-4 py-1 w-32 border border-slate-400 dark:border-slate-600" rowspan="2">Nama</th>
            <th scope="col" class="px-4 py-1 w-6 border border-slate-400 dark:border-slate-600" rowspan="2">Satuan</th>
            <th scope="col" class="px-4 py-1 w-24 border border-slate-400 dark:border-slate-600" colspan="4">Stok</th>
            <!-- <th scope="col" class="px-4 py-1 border border-slate-400 dark:border-slate-600" colspan="4">Saldo</th> -->
            <th scope="col" class="px-4 py-1 w-6 border border-slate-400 dark:border-slate-600" rowspan="2">Actions</th>
          </tr>
          <tr>
            <th scope="col" class="px-4 py-1 border border-slate-400 dark:border-slate-600">Awal</th>
            <th scope="col" class="px-4 py-1 border border-slate-400 dark:border-slate-600">Masuk</th>
            <th scope="col" class="px-4 py-1 border border-slate-400 dark:border-slate-600">Keluar</th>
            <th scope="col" class="px-4 py-1 border border-slate-400 dark:border-slate-600">Akhir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="itemStore.isLoading">
            <td colspan="7" class="text-center py-6">
              <CircleLoading>Prosesing ... </CircleLoading>
            </td>
          </tr>
          <tr v-else-if="!itemStore.isLoading && itemStore.items.length < 1">
            <td colspan="7" class="text-center py-6">No Data</td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in itemStore.items"
            :key="item.id"
            :class="
              (index + 1) % 2 !== 0
                ? 'bg-white dark:bg-gray-900 dark:border-gray-700'
                : 'bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
            "
            class="border-b text-sm"
          >
            <th scope="row" class="px-4 py-1 font-medium text-gray-900 dark:text-white">
              {{ item.name.toUpperCase() }}
            </th>
            <td class="px-4 py-1">{{ item.unit.name.toUpperCase() }}</td>
            <td class="px-4 py-1">{{ item.beg_balance.stock }}</td>
            <td class="px-4 py-1">{{ item.in_stock }}</td>
            <td class="px-4 py-1">{{ item.out_stock }}</td>
            <td class="px-4 py-1">{{ item.ending_stock }}</td>
            <td class="px-4 py-1">
              <a
                @click="invoice(id)"
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
                ><MagnifyingGlassIcon class="h-7 w-7"
              /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">{{ itemStore.from }} - {{ itemStore.to }}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{{ itemStore.total }}</span>
      </span>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <a
            @click="itemStore.getData(previousPage)"
            :disabled="itemStore.currentPage == 1 ? true : false"
            :class="
              itemStore.currentPage == 1
                ? 'cursor-not-allowed'
                : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
            "
            class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >Previous</a
          >
        </li>

        <li>
          <a
            @click="itemStore.getData(nextPage)"
            :disabled="itemStore.lastPage == itemStore.currentPage ? true : false"
            :class="
              itemStore.lastPage == itemStore.currentPage
                ? 'cursor-not-allowed'
                : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
            "
            class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { DocumentTextIcon, PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { onMounted, computed, onUnmounted, ref, nextTick, inject } from "vue";
import TableComplex from "@/components/table/TableComplex.vue";
import CircleLoading from "@/components/loading/CircleLoading.vue";
import { IDRCurrency } from "@/utilities/formatter";
import { useItemStore } from "@/stores/items";
import { initDropdowns } from "flowbite";

const swal = inject("$swal");
const itemStore = useItemStore();
const lengths = ref([5, 10, 20, 30, 40, 50]);

itemStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "currentLimit") {
    itemStore.getData();
  }
});

const previousPage = computed(() => {
  return "&page=" + (itemStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (itemStore.currentPage + 1);
});

onMounted(() => {
  itemStore.getData();
  initDropdowns();
});

onUnmounted(() => {
  itemStore.$reset();
});
</script>
