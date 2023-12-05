<template>
  <Transition name="modal">
    <div>
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Price List {{ itemName }}</h3>
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

            <div class="flex flex-col space-y-6">
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
                  >
                    <tr>
                      <th scope="col" class="px-4 py-3 border border-slate-400 dark:border-slate-600">No</th>
                      <th scope="col" class="px-4 py-3 border border-slate-400 dark:border-slate-600">Tanggal</th>
                      <th scope="col" class="px-4 py-3 border border-slate-400 dark:border-slate-600">Harga Jual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="itemSellingPriceStore.isLoading">
                      <td colspan="11" class="text-center py-6">
                        <CircleLoading>Prosesing ... </CircleLoading>
                      </td>
                    </tr>
                    <tr v-else-if="!itemSellingPriceStore.isLoading && itemSellingPriceStore.items.length < 1">
                      <td colspan="11" class="text-center py-6">No Data</td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in itemSellingPriceStore.items"
                      :key="item.id"
                      class="border-b dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900"
                    >
                      <td class="px-4 py-3">
                        {{ itemSellingPriceStore.from + index }}
                      </td>
                      <td class="px-4 py-3">
                        {{ moment(item.created_at).format("DD MMMM YYYY") }}
                      </td>
                      <td class="px-4 py-3">
                        {{ IDRCurrency.format(item.price) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav
                class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >{{ itemSellingPriceStore.from }} - {{ itemSellingPriceStore.to }}</span
                  >
                  of
                  <span class="font-semibold text-gray-900 dark:text-white">{{ itemSellingPriceStore.total }}</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                  <li>
                    <a
                      @click="itemSellingPriceStore.getData(previousPage)"
                      :disabled="itemSellingPriceStore.currentPage == 1 ? true : false"
                      :class="
                        itemSellingPriceStore.currentPage == 1
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                      "
                      class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      >Previous</a
                    >
                  </li>

                  <li>
                    <a
                      @click="itemSellingPriceStore.getData(nextPage)"
                      :disabled="itemSellingPriceStore.lastPage == itemSellingPriceStore.currentPage ? true : false"
                      :class="
                        itemSellingPriceStore.lastPage == itemSellingPriceStore.currentPage
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                      "
                      class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      >Next</a
                    >
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useItemSellingPriceStore } from "@/stores/itemSellingPrice";
import { IDRCurrency } from "@/utilities/formatter";
import CircleLoading from "@/components/loading/CircleLoading.vue";

const props = defineProps({
  show: Boolean,
  itemName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "setItem"]);

const itemSellingPriceStore = useItemSellingPriceStore();
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
