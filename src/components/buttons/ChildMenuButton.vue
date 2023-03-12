<template>
  <router-link :to="{ name: navName }">
    <a
      class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:translate-x-2 duration-300 ease-in-out transition justify-between"
      :class="[
        menuId == activeId
          ? 'bg-gray-700 dark:bg-gray-100 dark:text-black text-white font-medium'
          : 'dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-normal',
      ]"
    >
      <div class="flex">
        <div aria-hidden="true" class="w-6 h-6">
          <slot name="leftIcon"></slot>
        </div>
        <span class="ml-3">
          <slot name="text"></slot>
        </span>
      </div>

      <ChevronDownIcon v-if="hasChild" aria-hidden="true" class="w-6 h-6">
      </ChevronDownIcon>
    </a>
  </router-link>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  hasChild: Boolean,
  menuId: Number,
  activeId: Number,
  navName: String,
  params: {
    type: Array,
    required: false,
  },
})
</script>
