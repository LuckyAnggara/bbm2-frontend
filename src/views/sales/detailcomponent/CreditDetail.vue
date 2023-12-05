<template>
  <template v-if="salesStore.singleResponses.credit == 1">
    <div class="flex flex-row space-x-7">
      <div class="w-1/3">
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
            :disable-date="dDate"
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
            :value="IDRCurrency.format(salesStore.editGrandTotal)"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Total Payment</label>
          <input
            :value="IDRCurrency.format(salesStore.singleResponses.total_payment ?? 0)"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Remaining</label>
          <input
            :value="IDRCurrency.format(salesStore.editGrandTotal)"
            disabled
            class="bg-gray-200 dark:bg-gray-900 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-2/3">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Payment Detail</h5>
        <hr class="my-2" />
        <div class="flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 my-2">
          <div
            v-if="!isEdit"
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <div class="flex items-center space-x-4 w-full md:w-auto">
              <button
                :disabled="salesStore.singleResponses.status == 'LUNAS' ? true : false"
                @click="showPembayaranModal = true"
                :class="[
                  salesStore.singleResponses.status == 'LUNAS'
                    ? 'cursor-not-allowed'
                    : 'hover:scale-105 duration-100 ease-in-out',
                ]"
                class="duration-300 hover:scale-105 transition flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button"
              >
                Tambah
                <PlusIcon class="ml-1 w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center space-x-4 w-full md:w-auto">
              <button
                :disabled="salesStore.singleResponses.status == 'LUNAS' ? true : false"
                :class="[
                  salesStore.singleResponses.status == 'LUNAS'
                    ? 'cursor-not-allowed'
                    : 'hover:scale-105 duration-100 ease-in-out',
                ]"
                @click="prosesLunas()"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                Lunas
                <CheckCircleIcon class="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div
          class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 max-h-full h-60"
        >
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 xl:table-fixed">
            <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                <th scope="col" class="px-4 py-2 w-6 border border-slate-400 dark:border-slate-600">Date</th>
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
                  {{ IDRCurrency.format(item.payment) }}
                </th>
                <td class="px-4 py-1">{{ item.notes }}</td>
                <td class="px-2 py-1 justify-center flex flex-row">
                  <a
                    @click="deleteData(item.id)"
                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:scale-105 duration-300 ease-in-out"
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
  <!-- <Teleport to="body">
      <PembayaranModal
        @submit-transaction="prosesTransaction"
        @submit-lunas="prosesLunas"
        :show="showPembayaranModal"
        :max-payment="salesStore.singleResponses?.remaining_credit"
        @close="showPembayaranModal = false"
      />
    </Teleport>

    <Teleport to="body">
      <LoadingModal :show="salesStore.isPaymentLoading">Processing transaction</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="salesStore.isTransactionSuccess" @submit="reload"
        ><template #message> Transaction success </template>
        <template #buttonText> Ok </template>
      </SuccessModal>
    </Teleport> -->
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
} from "@heroicons/vue/24/outline";
import { computed, ref, nextTick, onMounted, defineAsyncComponent, inject, watch } from "vue";
import { useRoute } from "vue-router";
import { IDRCurrency } from "@/utilities/formatter";
import { useSalesStore } from "@/stores/sales";
import CircleLoading from "@/components/loading/CircleLoading.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useDateFormat } from "@vueuse/core";

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
const showPembayaranModal = ref(false);

const formatter = ref({
  date: "YYYY-MM-DD",
});
const dateValue = ref("");
const dDate = (date) => {
  return date < new Date();
};

// const dueDate = computed(() => {
//   if (salesStore.singleResponses.due_date == null || salesStore.singleResponses.due_date == "") {
//     return null;
//   }
//   return useDateFormat(JSON.parse(JSON.stringify(salesStore.singleResponses.due_date)), "DD MMMM YYYY");
// });

watch(dateValue, (v) => {
  salesStore.singleResponses.due_date = v;
});

function deleteData(idPayment) {
  swal
    .fire({
      title: "Are you sure?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Cancel!",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      preConfirm: () => {
        salesStore.destroyCreditData(idPayment);
      },
      allowOutsideClick: () => !salesStore.isDestroyLoading,
    })
    .then((result) => {
      if (result.isConfirmed) {
        salesStore.showData(id.value);
      }
    });
}

function prosesLunas() {
  swal.fire({
    title: "PELUNASAN",
    text: "Data Invoice ini akan di lunasi sejumlah cicilan tersisa! Proses?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Ya!",
    cancelButtonText: "Cancel!",
    showLoaderOnConfirm: salesStore.isPaymentLoading,
    reverseButtons: true,
    preConfirm: async () => {
      const data = {
        sale_id: salesStore.singleResponses.id,
        created_at: this.moment(),
        payment: salesStore.singleResponses.remaining_credit,
        notes: "PELUNASAN",
      };
      salesStore.storeCreditPayment(data);
    },
    allowOutsideClick: () => !salesStore.isPaymentLoading,
    backdrop: true,
  });
}

async function prosesTransaction(data) {
  showPembayaranModal.value = false;
  await nextTick();
  salesStore.storeCreditPayment(data);
}

async function reload() {
  salesStore.isTransactionSuccess = false;
  await nextTick();
  salesStore.showData(id.value);
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
