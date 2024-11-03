<template>
  <button
    :disabled="loading"
    @click="emit('proses')"
    class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
    type="button"
  >
    <span v-if="!loading"> <slot name="title"></slot></span>

    <ArrowPathIcon v-else class="h-4 w-4 animate-spin" />
  </button>
</template>

<script setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  loading: Boolean,
});

const emit = defineEmits(["proses"]);
</script>
