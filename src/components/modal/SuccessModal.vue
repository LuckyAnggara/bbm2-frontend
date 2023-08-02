<template>
  <Transition name="modal">
    <!-- Main modal -->
    <div
      v-if="show"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
        >
          <div
            v-if="type == 'success'"
            class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5"
          >
            <CheckCircleIcon
              class="w-8 h-8 text-green-500 dark:text-green-400"
            />
            <!-- <svg
              aria-hidden="true"
            
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg> -->
            <span class="sr-only">Success</span>
          </div>
          <div
            v-else
            class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5"
          >
            <ExclamationCircleIcon class="w-8 h-8 dark:text-white text-black" />
            <!-- <svg
              aria-hidden="true"
            
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg> -->
            <span class="sr-only">Error</span>
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            <slot name="message"></slot>
          </p>
          <button
            @click="emit('submit')"
            type="button"
            class="hover:scale-110 duration-300 ease-in-out transform py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            <slot name="buttonText"></slot>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/outline'
const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    defult: 'success',
  },
})

const emit = defineEmits(['close', 'submit'])

function closeModal() {
  emit('close')
}
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

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
