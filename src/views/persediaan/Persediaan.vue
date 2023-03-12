<template>
  <div
    v-if="!itemStore.isLoading"
    class="flex items-center justify-between pb-4"
  >
    <div>
      <div class="flex items-center space-x-2">
        <label
          for="years"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Show</label
        >
        <select
          v-model="itemStore.currentLimit"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option
            :selected="itemStore.currentLimit == length ? true : false"
            v-for="length in lengths"
            :key="length"
          >
            {{ length }}
          </option>
        </select>
      </div>
    </div>
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        v-model="itemStore.searchName"
        @keyup.enter="itemStore.getData()"
        type="text"
        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for items"
      />
    </div>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">No</th>
          <th scope="col" class="px-6 py-3">Nama Produk</th>
          <th scope="col" class="px-6 py-3">Merek</th>
          <th scope="col" class="px-6 py-3">Satuan</th>
          <th scope="col" class="px-6 py-3">Saldo</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <tr v-if="itemStore.isLoading">
          <td colspan="6" class="text-center py-12">
            <CircleLoading>Prosesing ... </CircleLoading>
          </td>
        </tr>
        <tr v-else-if="!itemStore.isLoading && itemStore.items?.length < 0">
          <td colspan="6" class="text-center py-12">No Data</td>
        </tr>
        <tr
          v-else
          v-for="(item, index) in itemStore.items"
          :key="item.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">{{ itemStore.from + index }}</td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item?.name.toUpperCase() }}
          </th>
          <td class="px-6 py-4">{{ item.brand?.name.toUpperCase() }}</td>
          <td class="px-6 py-4">{{ item.unit?.name.toUpperCase() }}</td>
          <td class="px-6 py-4">{{ item?.balance }}</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="!itemStore.isLoading" class="flex flex-col items-center mt-4">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        itemStore.from ?? 0
      }}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{{
        itemStore.to ?? 0
      }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        itemStore.total ?? 0
      }}</span>
      Entries
    </span>
    <!-- Buttons -->
    <div class="inline-flex mt-2 xs:mt-0">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li>
            <a
              @click="itemStore.getData(previousPage)"
              :disabled="itemStore.currentPage == 1 ? true : false"
              class="cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Previous</a
            >
          </li>
          <!-- <li v-for="n in itemStore.pageLength" :key="n">
            <a
              @click="itemStore.getData('&' + n)"
              :disabled="itemStore.currentPage == n"
              :class="[
                itemStore.currentPage == n
                  ? 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              ]"
              >{{ n }}</a
            >
          </li> -->
          <li>
            <a
              @click="itemStore.getData(nextPage)"
              :disabled="
                itemStore.lastPage == itemStore.currentPage ? true : false
              "
              class="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useItemStore } from '../../stores/persediaan'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const itemStore = useItemStore()
const lengths = ref([5, 10, 20, 30, 40, 50])

onMounted(() => {
  itemStore.getData()
})

const previousPage = computed(() => {
  return '&page=' + (itemStore.currentPage - 1)
})

const nextPage = computed(() => {
  return '&page=' + (itemStore.currentPage + 1)
})

itemStore.$subscribe((mutation, state) => {
  if (mutation.events.key == 'currentLimit') {
    itemStore.getData()
  }
})

onUnmounted(() => {
  itemStore.$reset()
})
</script>
