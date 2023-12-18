<template>
  <!-- Breadcrumb -->
  <nav
    class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <router-link
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
        >
          <RectangleGroupIcon class="w-5 h-5 mr-2" />
          Dashboard
        </router-link>
      </li>
      <li v-for="item in route.meta.breadcumb" :key="item">
        <div class="flex items-center">
          <ChevronRightIcon class="block w-4 h-4 mr-2 text-gray-400" />
          <router-link
            :to="item.to"
            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-300 dark:hover:text-white"
            >{{ item.name }}</router-link
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { RectangleGroupIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
