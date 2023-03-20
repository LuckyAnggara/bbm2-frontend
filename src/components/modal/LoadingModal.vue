<template>
  <div>
    <div
      v-if="show"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div
          class="bg-white dark:bg-gray-800 py-2 px-5 rounded-lg flex items-center flex-col"
        >
          <div class="loader-dots block relative w-20 h-5 mt-2">
            <div
              class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
            ></div>
            <div
              class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
            ></div>
            <div
              class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
            ></div>
            <div
              class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
            ></div>
          </div>
          <div class="text-gray-500 text-xs font-medium mt-2 text-center">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<style>
.loader-dots div {
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
