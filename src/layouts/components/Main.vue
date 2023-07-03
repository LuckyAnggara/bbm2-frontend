<template>
  <div
    class="flex flex-col justify-between min-h-screen bg-gray-100 dark:bg-gray-900 scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 overflow-x-hidden"
  >
    <div class="px-8 py-8 xl:ml-64 transform duration-300 ease-in-out">
      <!-- Ngasih Jarak -->
      <div class="h-8 bg-blue-500 mb-8"></div>

      <span
        class="block py-1 text-2xl font-bold dark:text-white text-black mb-4"
        >{{ route.meta.title }}
      </span>
      <div class="mt-8">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import Footer from './Footer.vue'

const route = useRoute()
</script>
