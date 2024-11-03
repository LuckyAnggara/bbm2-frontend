<template>
  <template v-if="salesStore.singleResponses.credit == 1">
    <div class="flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 my-2">
      <div
        v-if="!isEdit"
        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <div class="flex items-center space-x-4 w-full md:w-auto">
          <button
            :disabled="salesStore.singleResponses.payment_status == 'LUNAS' ? true : false"
            @click="showPaymentModal = true"
            :class="[salesStore.singleResponses.payment_status == 'LUNAS' ? 'cursor-not-allowed' : '']"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
            New Payment
          </button>
        </div>

        <div class="flex items-center space-x-4 w-full md:w-auto">
          <button
            :disabled="salesStore.singleResponses.payment_status == 'LUNAS' ? true : false"
            :class="[salesStore.singleResponses.payment_status == 'LUNAS' ? 'cursor-not-allowed' : '']"
            @click="pelunasan()"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <CheckCircleIcon class="h-4 w-4 mr-2" />

            Paid off
          </button>
        </div>
      </div>
    </div>
    <div class="sm:col-span-2" v-if="salesStore.singleResponses.payment_status == 'LUNAS'">
      <div
        class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span class="font-medium">Info !</span> This transaction has been <b>Paid off</b>.
      </div>
    </div>

    <div class="flex md:flex-row flex-col md:space-y-0 space-y-7 md:space-x-7">
      <div class="md:w-1/3 w-full">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Credit Info</h5>
        <hr class="my-2" />
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Due Date</label>
          <input
            :value="salesStore.singleResponses.due_date"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div v-if="isEdit" class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
            >Change Due Date</label
          >
          <vue-tailwind-datepicker
            :auto-apply="true"
            :shortcuts="false"
            :formatter="formatter"
            v-model="dateValue"
            placeholder="Change due date"
            as-single
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            input-classes="border border-gray-300 text-gray-700  rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 px-4  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Credit Total</label>
          <input
            :value="IDRCurrency.format(salesStore.singleResponses.grand_total)"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Total Payment</label>
          <input
            :value="
              IDRCurrency.format(salesStore.singleResponses.grand_total - salesStore.singleResponses.remaining_credit)
            "
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Remaining</label>
          <input
            :value="IDRCurrency.format(salesStore.singleResponses.remaining_credit)"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="md:w-2/3 w-full">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Payment Detail</h5>
        <hr class="my-2" />

        <div class="overflow-auto w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 p-1">
          <table
            class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 md:table-fixed table-auto duration-300 ease-in-out transform"
          >
            <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                <th scope="col" class="px-4 py-2 md:w-6 w-fit border border-slate-400 dark:border-slate-600">Date</th>
                <th scope="col" class="px-4 py-2 w-10 border border-slate-400 dark:border-slate-600">Amount</th>
                <th scope="col" class="px-4 py-2 w-24 border border-slate-400 dark:border-slate-600">Notes</th>
                <th scope="col" class="px-2 py-2 w-8 border border-slate-400 dark:border-slate-600 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="salesStore.isLoading">
                <td colspan="5" class="text-center py-6">
                  <CircleLoading>Prosesing ... </CircleLoading>
                </td>
              </tr>
              <tr v-else-if="!salesStore.isLoading && salesStore.singleResponses.payment < 1">
                <td v-if="!isEdit" colspan="5" class="text-center py-6">No Data</td>
                <td v-else colspan="5" class="text-center py-6">Add payment after update data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in salesStore.singleResponses.payment"
                :key="item.id"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <td class="px-4 py-1">{{ ++index }}</td>
                <td class="px-4 py-1">
                  {{ moment(item.created_at).format("DD MMMM YYYY") }}
                </td>

                <th class="px-4 py-1">
                  {{ IDRCurrency.format(item.amount) }}
                </th>
                <td class="px-4 py-1">{{ item.notes }}</td>
                <td class="px-2 py-1 justify-center flex flex-row">
                  <a
                    @click="deleteData(item)"
                    class="cursor-pointer font-medium text-gray-600 dark:text-gray-200 hover:dark:text-white hover:text-red-500 hover:scale-105 duration-300 ease-in-out"
                    ><TrashIcon class="h-5 w-5"
                  /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="mx-auto">
      <p class="mb-4 text-md text-gray-800 dark:text-gray-400">Not Credit Transaction</p>
    </div>
  </template>
  <Teleport to="body">
    <PaymentModal @submitTransaction="submitPayment" :show="showPaymentModal" @close="showPaymentModal = false" />
  </Teleport>
  <Teleport to="body">
    <DeleteConfirmationModal
      :show="showConfirmationModal"
      @close="showConfirmationModal = false"
      @submit="destroyData"
      @cancel="showConfirmationModal = false"
    >
      <template #title>Hapus data ?</template>
      <template #submit>Hapus !</template>
      <template #cancel>Cancel</template>
    </DeleteConfirmationModal>
  </Teleport>
  <Teleport to="body">
    <FullPaidModal
      :icon="InformationCircleIcon"
      :show="showFullPaidModal"
      @close="showFullPaidModal = false"
      @submit="paidOff"
      @cancel="showFullPaidModal = false"
    >
      <template #title>Full Paid ?</template>
      <template #subtitle>Make this transaction full paid of credit</template>
      <template #submit>Process !</template>
      <template #cancel>Cancel</template>
    </FullPaidModal>
  </Teleport>
</template>

<script setup>
import moment from "moment";
import {
  TrashIcon,
  PlusIcon,
  CheckIcon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  FunnelIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref, nextTick, onMounted, defineAsyncComponent, inject, watch } from "vue";
import { useRoute } from "vue-router";
import { IDRCurrency } from "@/utilities/formatter";
import { useSalesStore } from "@/stores/sales";
import CircleLoading from "@/components/loading/CircleLoading.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useDateFormat } from "@vueuse/core";
import { toast } from "vue3-toastify";

const PaymentModal = defineAsyncComponent(() => import("../modal/CreditPaymentModal.vue"));
const DeleteConfirmationModal = defineAsyncComponent(() => import("@/components/modal/ConfirmationModal.vue"));
const FullPaidModal = defineAsyncComponent(() => import("@/components/modal/ConfirmationModal.vue"));

const swal = inject("$swal");

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const route = useRoute();
const salesStore = useSalesStore();
const showConfirmationModal = ref(false);
const showFullPaidModal = ref(false);
const showPaymentModal = ref(false);
const paymentItem = ref(null);

const formatter = ref({
  date: "YYYY-MM-DD",
});
const dateValue = ref("");
const dDate = (date) => {
  return date < new Date();
};

watch(dateValue, (v) => {
  salesStore.singleResponses.due_date = v;
});

function deleteData(item) {
  paymentItem.value = item;
  showConfirmationModal.value = true;
  console.info(item);
}

async function destroyData() {
  showConfirmationModal.value = false;
  await nextTick();

  const id = toast.loading("Deleting data...", {
    position: toast.POSITION.BOTTOM_CENTER,
    type: "info",
    isLoading: true,
  });

  const success = await salesStore.destroyCreditData(paymentItem.value);

  if (success) {
    toast.update(id, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: "success",
      render: "Delete data successfully !",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
    toast.done(id);
  } else {
    toast.update(id, {
      render: "There something wrong",
      position: toast.POSITION.BOTTOM_CENTER,
      type: "error",
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
  } // memanggil action deleteData pada store
}

function pelunasan() {
  showFullPaidModal.value = true;
  salesStore.$patch((state) => {
    state.formPaymentCredit.amount = state.singleResponses.remaining_credit;
    state.formPaymentCredit.payment_type = "CASH";
    state.formPaymentCredit.created_at = moment();
    state.formPaymentCredit.notes = "Repayment";
  });
}

async function paidOff() {
  showFullPaidModal.value = false;
  const id = toast.loading("Processing payment ...", {
    position: toast.POSITION.BOTTOM_CENTER,
    type: "info",
    isLoading: true,
  });

  const success = await salesStore.storeCreditPayment();

  if (success) {
    toast.update(id, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: "success",
      render: "Payment successfully !",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
    toast.done(id);
  } else {
    toast.update(id, {
      render: "There something wrong",
      position: toast.POSITION.BOTTOM_CENTER,
      type: "error",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
  }
  // swal.fire({
  //   title: "PELUNASAN",
  //   text: "Data Invoice ini akan di lunasi sejumlah cicilan tersisa! Proses?",
  //   icon: "info",
  //   showCancelButton: true,
  //   confirmButtonText: "Ya!",
  //   cancelButtonText: "Cancel!",
  //   showLoaderOnConfirm: salesStore.isPaymentLoading,
  //   reverseButtons: true,
  //   preConfirm: async () => {
  //     const data = {
  //       sale_id: salesStore.singleResponses.id,
  //       created_at: this.moment(),
  //       payment: salesStore.singleResponses.remaining_credit,
  //       notes: "PELUNASAN",
  //     };
  //     salesStore.storeCreditPayment(data);
  //   },
  //   allowOutsideClick: () => !salesStore.isPaymentLoading,
  //   backdrop: true,
  // });
}

async function submitPayment() {
  showPaymentModal.value = false;
  const id = toast.loading("Processing payment ...", {
    position: toast.POSITION.BOTTOM_CENTER,
    type: "info",
    isLoading: true,
  });

  const success = await salesStore.storeCreditPayment();

  if (success) {
    toast.update(id, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: "success",
      render: "Payment successfully !",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
    toast.done(id);
  } else {
    toast.update(id, {
      render: "There something wrong",
      position: toast.POSITION.BOTTOM_CENTER,
      type: "error",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
  }
}

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(() => {
  if (salesStore.singleResponses == null) {
    salesStore.showData(id.value);
  }
});
</script>
