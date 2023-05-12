<template>
  <Transition name="modal">
    <div>
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
          <!-- Modal content -->
          <div
            class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Tambah Merek
              </h3>
              <button
                @click="emit('close')"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->

            <form class="flex flex-col space-y-6">
              <div class="flex items-center justify-between">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/3"
                  >Nama</label
                >
                <input
                  :disabled="brandStore.isStoreLoading"
                  required
                  v-model="brandStore.currentData.name"
                  type="text"
                  class="bg-white dark:bg-gray-900 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ketik Nama Merek"
                />
              </div>

              <div
                class="flex items-center space-x-4 justify-between place-self-end"
              >
                <ButtonLoader
                  @click="prosesRequest"
                  :loading="brandStore.isStoreLoading"
                >
                  <template #title> Submit </template>
                  <template #titleLoading> Loading... </template>
                </ButtonLoader>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { ref, computed, nextTick, watchEffect, onUnmounted } from 'vue'
import { useItemBrandStore } from '../../../stores/itemBrand'

import ButtonLoader from '../../../components/buttons/ButtonLoader.vue'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['close', 'submitTransaction'])

let isActive = false
let stopWatching = null

const brandStore = useItemBrandStore()

function toggleWatchEffect() {
  if (isActive) {
    // menghentikan pemanggilan watchEffect
    stopWatching()
    isActive = false
  } else {
    // memanggil kembali watchEffect
    stopWatching = watchEffect(() => {
      if (!brandStore.isStoreLoading) {
        emit('close')
        brandStore.$patch({
          currentData: {
            name: null,
          },
        })
      }
    })
    isActive = true
  }
}

async function prosesRequest() {
  brandStore.store()
  toggleWatchEffect()
}

onUnmounted(() => {
  brandStore.$patch({
    currentData: {
      name: null,
    },
  })
})
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
