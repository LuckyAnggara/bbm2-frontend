<template>
  <div class="flex items-center justify-between pb-4">
    <div>
      <div v-if="useLimit == true" class="flex items-center space-x-2">
        <label
          for="years"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Show</label
        >
        <select
          :value="currentLimit"
          @input="$emit('update:currentLimit', $event.target.value)"
          class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
        >
          <option
            :selected="currentLimit == length ? true : false"
            v-for="length in lengths"
            :key="length"
          >
            {{ length }}
          </option>
        </select>
      </div>
    </div>
    <label for="table-search" class="sr-only">Search</label>
    <div v-if="useSearch == true" class="relative">
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
      <div class="flex space-x-4">
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          @keyup.enter="$emit('onEnter')"
          type="text"
          class="shadow-md block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Press Enter untuk mencari"
        />
        <button
          v-if="useFilter"
          @click="showModal = true"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <AdjustmentsHorizontalIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left">
      <thead
        class="text-md text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="column in props.columns"
            :key="column.key"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black dark:text-gray-400"
      >
        <tr v-if="isLoading">
          <td :colspan="props.columns.length" class="text-center py-12">
            <CircleLoading>Prosesing ... </CircleLoading>
          </td>
        </tr>
        <tr v-else-if="!isLoading && data.length < 1">
          <td :colspan="props.columns.length" class="text-center py-12">
            No Data
          </td>
        </tr>
        <tr
          v-else
          v-auto-animate="{ duration: 300 }"
          v-for="(item, index) in data"
          :key="item.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4" v-for="column in columns" :key="column.key">
            <span v-if="column.key == 'action'" :class="column.class">
              <slot
                name="action"
                :id="item.id"
                :status="item.status ?? null"
              ></slot>
            </span>
            <span v-else-if="column.type == 'id'" :class="column.class">
              {{ ++index }}
            </span>
            <span v-else-if="column.type == 'number'" :class="column.class">
              {{ Intl.NumberFormat('en-US').format(item[column.key]) }}
            </span>
            <span v-else-if="column.type == 'date'" :class="column.class">
              {{ moment(item[column.key]).format('DD MMMM YYYY') }}
            </span>
            <span v-else-if="column.type == 'slot'">
              <slot name="status" :label="item[column.key]"></slot>
            </span>
            <span v-else-if="column.type == 'currency'" :class="column.class">
              {{ IDRCurrency.format(item[column.key]) }}
            </span>
            <span v-else>
              {{ item[column.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-if="usePagginate == true && !isLoading"
    class="flex flex-col items-center mt-4"
  >
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        pagginate.from ?? 0
      }}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{{
        pagginate.to ?? 0
      }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        pagginate.total ?? 0
      }}</span>
      Entries
    </span>
    <!-- Buttons -->
    <div class="inline-flex mt-4">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li>
            <a
              @click="emit('previousPage')"
              :disabled="itemStore.currentPage == 1 ? true : false"
              class="w-32 cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="emit('nextPage')"
              :disabled="
                itemStore.lastPage == itemStore.currentPage ? true : false
              "
              class="w-32 cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <FilterModal :show="showModal" @close="showModal = false" />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
import { useItemStore } from '../../stores/persediaan'
import { IDRCurrency } from '../../utilities/formatter'
import CircleLoading from '../../components/loading/CircleLoading.vue'

import FilterModal from '../../components/modal/FilterModal.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  useFilter: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  currentLimit: {
    type: [String, Number],
  },
  itemStore: {
    type: Object,
    default() {
      return []
    },
  },
  searchQuery: {
    type: String,
  },
  usePagginate: {
    type: Boolean,
    default: true,
  },
  useSearch: {
    type: Boolean,
    default: true,
  },
  useLimit: {
    type: Boolean,
    default: true,
  },
  pagginate: {
    type: Object,
    default() {
      return {
        from: 0,
        to: 0,
        total: 0,
      }
    },
  },
})

const lengths = ref([5, 10, 20, 30, 40, 50])
const showModal = ref(false)
const emit = defineEmits([
  'nextPage',
  'previousPage',
  'update:searchQuery',
  'update:currentLimit',
  'onEnter',
])

// onMounted(() => {
//   itemStore.getData()
// })

// itemStore.$subscribe((mutation, state) => {
//   if (mutation.events.key == 'currentLimit') {
//     itemStore.getData()
//   }
// })
</script>
