<template>
  <div
    @mouseenter="disabledAdd == true ? '' : (showResult = true)"
    class="w-96 space-y-4 relative"
  >
    <form class="flex items-center" autocomplete="off" @submit.prevent>
      <label for="simple-search" class="sr-only">{{ placeholder }}</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
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
          :disabled="disabledAdd"
          :value="modelValue"
          @input="update($event)"
          @keyup.enter="cariData"
          type="text"
          :class="
            disabledAdd
              ? 'bg-gray-200 dark:bg-gray-900'
              : 'bg-gray-50 dark:bg-gray-700'
          "
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :placeholder="placeholder"
        />
      </div>
    </form>
  </div>

  <div
    @mouseleave="showResult = false"
    class="absolute z-500 w-4/6"
    :class="[showResult == true ? '' : 'hidden', topPosition, leftPosition]"
  >
    <div class="h-fit w-full">
      <ul
        class="relative bg-white dark:bg-gray-800 rounded-md shadow-lg h-full w-full p-4 space-y-2"
      >
        <template v-if="isLoading == true">
          <li
            class="group/text px-2 py-3 rounded-md dark:text-white text-center"
          >
            <CircleLoading />
          </li>
        </template>

        <template v-else>
          <li
            v-if="!resultItems || resultItems.length < 1"
            class="group/text px-2 py-3 rounded-md dark:text-white text-center"
          >
            <span> Tidak ada data </span>
          </li>
          <li
            v-else
            v-for="item in resultItems"
            :key="item.id"
            class="group/edit px-2 py-3 flex justify-between hover:bg-slate-500 rounded-md dark:text-white hover:text-white hover:font-bold dark:hover:text-white items-center"
          >
            <span
              class="group-hover/edit:translate-x-2 duration-300 ease-in-out transition"
            >
              {{ item.name?.toUpperCase() }}
            </span>

            <button
              :disabled="disabledAdd"
              @click="add(item)"
              type="button"
              class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300 ease-in-out transition transform hover:-translate-x-2"
            >
              <PlusIcon class="h-5 w-5" />
              <slot name="button"></slot>
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import CircleLoading from '../loading/CircleLoading.vue'
import { ref } from 'vue'

defineProps([
  'modelValue',
  'isLoading',
  'resultItems',
  'placeholder',
  'topPosition',
  'leftPosition',
  'disabledAdd',
])

// const props = defineProps({
//   modelValue: String,
//   isLoading: Boolean,
//   resultItems: Array,
// })

const emit = defineEmits(['cariData', 'update:modelValue', 'addData'])

function cariData() {
  emit('cariData')
}

function add(item) {
  emit('addData', item)
}

function update($event) {
  emit('update:modelValue', $event.target.value)
}

const showResult = ref(false)
</script>
