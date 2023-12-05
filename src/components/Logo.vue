<template>
  <div>
    <!-- <img v-if="isDark" src="../assets/logo_dark.png" alt="Logo" :class="[size, animated ? 'animate-pulse' : '']" /> -->
    <img src="@/assets/logo.png" alt="Logo" :class="[size, animated ? 'animate-pulse' : '']" />
  </div>
</template>

<script setup>
import { BoltIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  size: {
    type: String,
    default: "w-24 h-24",
  },
  animated: {
    type: Boolean,
    default: false,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
