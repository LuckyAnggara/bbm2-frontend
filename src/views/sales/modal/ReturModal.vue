<template>
  <section>
    <Transition name="modal">
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-6xl h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 rounded-t border-b dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Choose Product to Retur</h3>
              <button
                @click="closeModal"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <XMarkIcon class="h-5 w-5" />

                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->

            <div>
              <div class="flex flex-col space-y-4 items-end w-full p-4">
                <div
                  class="overflow-auto rounded-lg w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
                >
                  <table
                    class="w-full text-xs text-left text-gray-500 dark:text-gray-400 md:table-fixed duration-300 ease-in-out transform"
                  >
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 w-2 text-center">No</th>
                        <th scope="col" class="py-3 w-20">Products / Services</th>

                        <th scope="col" class="py-3 w-3">Qty</th>
                        <th scope="col" class="py-3 w-3">Retur</th>
                        <th scope="col" class="py-3 w-6 px-2">Type</th>
                        <th scope="col" class="py-3 w-16 px-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody class="duration-300 ease-in-out transform">
                      <tr
                        v-if="salesStore.singleResponses.detail.length < 1"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td colspan="5" class="px-6 text-center py-2">
                          <span class="text-base dark:text-gray-300 text-gray-700">Tambahkan data produk</span>
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="(item, index) in returStore.dataRetur"
                        :key="item.id"
                        class="bg-white border-b dark:border-gray-700 text-sm dark:bg-gray-800"
                      >
                        <td class="text-center">
                          <span>{{ 1 + index }}</span>
                        </td>
                        <td class="">
                          <span class="text-ellipsis">
                            {{ item.name.toUpperCase() }}
                          </span>
                        </td>
                        <td class="">
                          <input
                            disabled
                            min="0"
                            type="number"
                            class="dark:bg-gray-700 bg-gray-200 sm:w-full text-xs text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                            v-model="item.qty"
                          />
                        </td>
                        <td class="">
                          <input
                            min="0"
                            v-bind:max="item.qty"
                            type="number"
                            :class="
                              item.retur_qty > item.qty ? 'dark:bg-red-700 bg-red-200' : 'dark:bg-gray-900 bg-gray-50'
                            "
                            class="sm:w-full text-xs text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                            v-model.number="item.retur_qty"
                          />
                        </td>
                        <td class="">
                          <select
                            v-model="item.type"
                            class="dark:bg-gray-900 bg-gray-50 sm:w-full text-xs text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                          >
                            <option value="NORMAL">Normal</option>
                            <option value="DEFECT">Defect</option>
                          </select>
                        </td>
                        <td class="">
                          <input
                            min="0"
                            type="text"
                            :max="item.qty"
                            placeholder="notes"
                            class="dark:bg-gray-900 bg-gray-50 sm:w-full text-sm text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                            v-model="item.notes"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <small
                  v-if="salesStore.singleResponses.retur_status == 1"
                  class="text-blue-500 text-bold place-self-start"
                  >Transaksi ini sudah melakukan retur Product sebelumnya
                </small>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0 px-4">
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
              <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                <button
                  :disabled="returStore.isStoreLoading"
                  @click="emit('close')"
                  type="button"
                  class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <ButtonLoader :loading="returStore.isStoreLoading" @proses="canSubmit">Submit</ButtonLoader>
                <!-- <button @click="canSubmit" type="button">Confirm</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { computed, onActivated, onMounted, ref } from "vue";

import { useSalesStore } from "@/stores/sales";
import { useToast } from "vue-toastification";

import { useSalesReturStore } from "@/stores/salesRetur";
import { useArrayFilter, useArraySome } from "@vueuse/core";
import { useRoute } from "vue-router";

import ButtonLoader from "@/components/buttons/ButtonLoader.vue";

const props = defineProps({
  show: Boolean,
  default: false,
});
const emit = defineEmits(["close", "next"]);

const toast = useToast();
const salesStore = useSalesStore();
const returStore = useSalesReturStore();
const route = useRoute();

const uuid = computed(() => {
  return route.params.uuid ?? null;
});

async function canSubmit() {
  const b = useArraySome(returStore.dataRetur, (i) => i.retur_qty > 0 && i.retur_qty <= i.qty);
  if (b.value == true) {
    returStore.data.dataRetur = useArrayFilter(returStore.dataRetur, (i) => i.retur_qty > 0);
    returStore.data.uuid = uuid.value;
    await returStore.store(uuid.value);
    emit("close");
  } else {
    toast.error("Check your retur quantity", {
      position: "bottom-right",
    });
  }
}

function closeModal() {
  emit("close");
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
