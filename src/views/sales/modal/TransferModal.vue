<template>
  <Transition name="modal">
    <div>
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <!-- Modal content -->
          <div
            class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Metode Pembayaran Transfer
              </h3>
              <button
                @click="closeModal"
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

            <div class="flex flex-col space-y-6">
              <div class="flex items-center justify-between">
                <label
                  for="description"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-white w-1/3"
                  >Total Bayar</label
                >
                <span class="text-2xl dark:text-white text-black">{{
                  IDRCurrency.format(
                    salesStore.total.grandTotal ??
                      0 + salesStore.currentData.shipping.fee
                  )
                }}</span>
              </div>

              <div>
                <label
                  for="brand"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Pilih Bank</label
                >
                <div class="flex flex-row space-x-2">
                  <div class="w-full">
                    <DotLoading v-if="bankStore.isLoading" />
                    <select
                      v-else
                      v-model="salesStore.currentData.transaction.bank"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option
                        v-for="item in bankStore.items"
                        :key="item.id"
                        :value="item"
                      >
                        {{ item.name.toUpperCase() }}
                      </option>
                    </select>
                  </div>
                  <button
                    type="button"
                    @click="bankStore.getData()"
                    class="h-fit place-self-end text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                  >
                    <ArrowPathIcon
                      :class="bankStore.isLoading ? 'animate-spin' : ''"
                      class="h-5 w-5"
                    />
                    <span class="sr-only">Icon description</span>
                  </button>
                </div>
              </div>
              <div
                v-if="!isObjectEmpty(salesStore.currentData.transaction.bank)"
              >
                <div class="flex items-center justify-between">
                  <label
                    for="description"
                    class="block mb-2 text-xl font-medium text-gray-900 dark:text-white w-1/3"
                    >Nomor Rekening</label
                  >
                  <span class="text-xl dark:text-white text-black">{{
                    salesStore.currentData.transaction.bank?.number_account ??
                    ''
                  }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <label
                    for="description"
                    class="block mb-2 text-xl font-medium text-gray-900 dark:text-white w-1/3"
                    >Atas Nama</label
                  >
                  <span class="text-xl dark:text-white text-black">{{
                    salesStore.currentData.transaction.bank?.name_account ?? ''
                  }}</span>
                </div>
              </div>

              <div
                v-if="!isObjectEmpty(salesStore.currentData.transaction.bank)"
                class="flex items-center space-x-4 justify-between place-self-end"
              >
                <button
                  @click="prosesRequest"
                  type="button"
                  class="hover:scale-105 duration-300 ease-in-out text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                >
                  Terbayar
                  <CheckIcon class="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ArrowPathIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'
import { useBankStore } from '../../../stores/bank'
import DotLoading from '../../../components/loading/DotLoading.vue'
import { isObjectEmpty } from '../../../utilities/helpper'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close', 'submitTransaction'])

const salesStore = useSalesStore()
const bankStore = useBankStore()

async function prosesRequest() {
  emit('submitTransaction')
}

function closeModal() {
  emit('close')
}

onMounted(() => {
  bankStore.getData()
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
