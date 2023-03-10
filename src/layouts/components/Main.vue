<template>
  <div class="px-8 py-4 sm:ml-64 mt-14 min-h-screen">
    <span
      class="block py-4 text-3xl font-medium dark:text-white text-black mb-4"
      >{{ route.meta.title }}
    </span>

    <router-view> </router-view>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>
