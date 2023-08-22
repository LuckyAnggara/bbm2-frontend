<template>
  <VTooltip :distance="5" :skidding="32" :placement="'top'" :triggers="['hover']" class="">
    <button
      :disabled="isLoading"
      @click="emit('click')"
      :class="isLoading ? 'cursor-wait' : ''"
      class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      <slot class="mr-2"></slot>
      <ArrowPathIcon
        :class="isLoading ? 'animate-spin ' : ''"
        class="h-5 w-5 text-gray-700 dark:text-gray-300"
        aria-hidden="true"
      />
    </button>
    <template #popper class="bg-gray-100 dark:bg-gray-400">
      <div class="w-fit text-center">Reload data</div>
    </template>
  </VTooltip>
</template>

<script setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits("click");
</script>
