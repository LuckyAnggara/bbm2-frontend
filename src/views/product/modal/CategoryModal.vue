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
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New Category</h3>
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

            <form class="flex flex-col space-y-6" autocomplete="off">
              <div class="grid gap-2 sm:grid-cols-2 sm:gap-4 duration-300 ease-in-out transition-all">
                <div class="sm:col-span-2">
                  <label for="category-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Name</label
                  >
                  <input
                    placeholder="Enter new category name"
                    :disabled="itemCategoryStore.isStoreLoading"
                    id="category-name"
                    v-model="itemCategoryStore.currentData.name"
                    required
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="description-category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Description</label
                  >
                  <textarea
                    v-model="itemCategoryStore.currentData.description"
                    id="description-category"
                    rows="2"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Category description here"
                  ></textarea>
                </div>
              </div>

              <div class="flex items-center space-x-4 justify-between place-self-end">
                <ButtonLoader @click="submit" :loading="itemCategoryStore.isStoreLoading">
                  <template #title> Submit </template>
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
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { ref, computed, nextTick, watchEffect, onUnmounted } from "vue";

import ButtonLoader from "@/components/buttons/ButtonLoader.vue";
import { useItemCategoryStore } from "@/stores/itemCategory";

import { toast } from "vue3-toastify";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close", "submitTransaction"]);

const itemCategoryStore = useItemCategoryStore();

async function submit() {
  const id = toast.loading("Add new category in process...", {
    position: toast.POSITION.BOTTOM_CENTER,
    type: "info",
    isLoading: true,
  });

  const success = await itemCategoryStore.store();
  if (success.status) {
    toast.update(id, {
      render: "Success !!",
      position: toast.POSITION.BOTTOM_CENTER,
      type: "success",
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
    emit("close");
    itemCategoryStore.$patch({
      currentData: {
        name: null,
        description: null,
      },
    });
  } else {
    toast.update(id, {
      render: "Terjadi kesalahan",
      position: toast.POSITION.BOTTOM_CENTER,
      type: "error",
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
  }
  toast.done(id);
}

onUnmounted(() => {
  itemCategoryStore.$patch({
    currentData: {
      name: null,
      description: null,
    },
  });
});
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
