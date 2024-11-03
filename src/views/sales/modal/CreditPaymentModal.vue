<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <!-- Modal header -->
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Payment</h3>
            <button
              @click="emit('close')"
              class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
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

          <form @submit.prevent="submit()">
            <div class="sm:col-span-2" v-if="!canSubmit">
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Alert!</span> Payment exceed remaining credit. Only
                <b>{{ IDRCurrency.format(salesStore.singleResponses.remaining_credit) }} </b> left.
              </div>
            </div>

            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <vue-tailwind-datepicker
                  required
                  :shortcuts="false"
                  :formatter="formatter"
                  v-model="dateValue"
                  placeholder="Payment Date"
                  as-single
                  input-classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <InputCurrency
                  :placeholder="'Payment Amount'"
                  :is-required="true"
                  :options="{ currency: 'IDR' }"
                  v-model="salesStore.formPaymentCredit.amount"
                  :custom-class="'block p-2.5 w-full text-sm  bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'"
                />
              </div>
            </div>

            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Payment Type</label
                >
                <select
                  v-model="salesStore.formPaymentCredit.payment_type"
                  class="bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="CASH">CASH</option>
                  <option value="BANK">BANK</option>
                </select>
              </div>

              <div v-if="salesStore.formPaymentCredit.payment_type == 'BANK'">
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank</label>
                <select
                  class="bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(bank, index) in bankStore.items" :key="index" :value="bank.id">
                    {{ bank.name }} - {{ bank.number_account }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-2 mb-4">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                required
                v-model="salesStore.formPaymentCredit.notes"
                rows="3"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description payment here"
              ></textarea>
            </div>
            <button
              v-if="canSubmit"
              class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="submit"
            >
              <PaperAirplaneIcon class="h-4 w-4 mr-2" />
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineEmits, computed, watch, reactive, onMounted } from "vue";
import { CheckIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { IDRCurrency } from "@/utilities/formatter";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import InputCurrency from "@/components/input/InputCurrency.vue";
import { useRoute } from "vue-router";
import { useSalesStore } from "@/stores/sales";
import { useBankStore } from "@/stores/bank";

const route = useRoute();
const props = defineProps({
  show: Boolean,
  maxPayment: Number,
});

const emit = defineEmits(["close", "submitTransaction"]);

const dateValue = ref([]);
const canSubmit = ref(true);
const bankStore = useBankStore();
const salesStore = useSalesStore();

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

function submit() {
  emit("submitTransaction");
  dateValue.value = [];
}

onMounted(() => {
  salesStore.$patch((state) => {
    state.formPaymentCredit.sale_id = state.singleResponses.id;
  });

  bankStore.getData();
});

watch(dateValue, async (value) => {
  salesStore.$patch((state) => {
    state.formPaymentCredit.created_at = value[0];
  });
});

watch(
  () => salesStore.formPaymentCredit.amount,
  (newValue) => {
    canSubmit.value = true;
    if (newValue > salesStore.singleResponses.remaining_credit) {
      canSubmit.value = false;
    }
  }
);
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
