<template>
  <div
    class="px-8 py-8 sm:ml-64 mt-14 min-h-screen bg-gray-100 dark:bg-gray-900"
  >
    <span class="block py-1 text-2xl font-bold dark:text-white text-black mb-4"
      >{{ route.meta.title }}
    </span>
    <div class="mt-8">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
