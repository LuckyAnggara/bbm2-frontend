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
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Metode Credit</h3>
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

            <div class="flex flex-col space-y-4">
              <div class="flex items-center justify-between">
                <label for="description" class="block text-xl font-medium text-gray-700 dark:text-white w-1/3"
                  >Total</label
                >
                <span class="text-xl dark:text-white text-black">{{
                  IDRCurrency.format(salesStore.total.grandTotal + salesStore.currentData.shipping.fee ?? 0)
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <label for="description" class="block mb-2 text-xl font-medium text-gray-700 dark:text-white w-2/3"
                  >Sisa Pembayaran</label
                >
                <InputCurrency
                  :options="{ currency: 'IDR' }"
                  v-model="salesStore.currentData.credit.amount"
                  :custom-class="'text-end block p-2.5 w-full text-xl bg-gray-50 dark:bg-gray-700 text-gray-700 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                />
              </div>
              <hr />
              <div class="flex items-center justify-between">
                <label for="description" class="block mb-2 text-xl font-medium text-gray-700 dark:text-white w-2/3"
                  >Sisa Pembayaran</label
                >
                <span class="text-xl dark:text-red-500 text-red-500 font-semibold">{{
                  IDRCurrency.format(sisaPembayaran ?? 0)
                }}</span>
              </div>
              <hr />
              <div class="flex items-center justify-between">
                <label for="description" class="block mb-2 text-xl font-medium text-gray-700 dark:text-white"
                  >Tanggal Jatuh Tempo</label
                >
                <div class="w-2/5">
                  <vue-tailwind-datepicker
                    :disable-date="dDate"
                    :auto-apply="true"
                    :shortcuts="false"
                    :formatter="formatter"
                    v-model="dateValue"
                    placeholder="Pilih tanggal"
                    as-single
                    input-classes="bg-gray-50 border border-gray-300 text-gray-700 text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-xl font-medium text-gray-700 dark:text-white"
                  >Keterangan</label
                >
                <textarea
                  v-model="salesStore.currentData.credit.notes"
                  rows="3"
                  class="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Keterangan lainnya, silahkan di tambahkan..."
                ></textarea>
              </div>

              <div class="flex items-center space-x-4 justify-between place-self-end">
                <button
                  @click="nextProcess"
                  type="button"
                  class="hover:scale-105 duration-300 ease-in-out text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  Submit
                  <PaperAirplaneIcon class="h-5 w-5 ml-2" />
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
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { ref, computed } from "vue";
import { useSalesStore } from "@/stores/sales";
import { IDRCurrency } from "@/utilities/formatter";
import InputCurrency from "@/components/input/InputCurrency.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useToast } from "vue-toastification";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "nextProcess"]);

const salesStore = useSalesStore();
const toast = useToast();

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});
const dateValue = ref("");
const dDate = (date) => {
  return date < new Date();
};

const sisaPembayaran = computed(() => {
  return salesStore.total.grandTotal + salesStore.currentData.shipping.fee - salesStore.currentData.credit.amount;
});

async function nextProcess() {
  salesStore.currentData.credit.due_date = dateValue.value;

  if (salesStore.currentData.credit.due_date == "") {
    toast.error("Tanggal jatuh tempo belum di isi", {
      timeout: 1000,
      position: "top-center",
    });
    return;
  }
  emit("nextProcess");
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
