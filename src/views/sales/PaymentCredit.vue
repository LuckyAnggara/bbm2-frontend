<template>
  <div class="w-full flex flex-col justify-center">
    <template v-if="salesStore.singleResponses">
      <div class="flex">
        <div class="w-1/3 h-fit">
          <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Detail</h5>
            <hr class="my-2" />
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Status</label>
              <div
                v-if="salesStore.singleResponses.status == 'LUNAS'"
                class="block bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-blue-500 dark:text-white text-center mb-4"
              >
                LUNAS
              </div>
              <div
                v-else
                class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center"
              >
                BELUM LUNAS
              </div>
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Invoice</label>
              <input
                :value="salesStore.singleResponses.invoice"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Nama Pelanggan</label
              >
              <input
                :value="salesStore.singleResponses.customer.name"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Nomor Telepon</label
              >
              <input
                :value="salesStore.singleResponses.customer.phone_number"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Alamat</label>
              <textarea
                :value="salesStore.singleResponses.customer.address"
                disabled
                rows="3"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Grand Total</label
              >
              <input
                :value="IDRCurrency.format(salesStore.singleResponses.grand_total)"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Total Pembayaran</label
              >
              <input
                :value="IDRCurrency.format(salesStore.singleResponses.total_payment ?? 0)"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Sisa Kredit</label
              >
              <input
                :value="IDRCurrency.format(salesStore.singleResponses.remaining_credit)"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                >Jatuh Tempo</label
              >
              <input
                :value="moment(salesStore.singleResponses.due_date).format('DD MMMM YYYY')"
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md dark:bg-gray-800 w-2/3 ml-10 rounded-lg px-6 py-6 min-h-min">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Rincian Pembayaran</h5>
          <hr class="my-2" />
          <div class="flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 my-2">
            <div
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
                  <th scope="col" class="px-4 py-2 w-6 border border-slate-400 dark:border-slate-600">Tanggal</th>
                  <th scope="col" class="px-4 py-2 w-10 border border-slate-400 dark:border-slate-600">Pembayaran</th>
                  <th scope="col" class="px-4 py-2 w-24 border border-slate-400 dark:border-slate-600">Catatan</th>
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
                  <td colspan="5" class="text-center py-6">No Data</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in salesStore.singleResponses.payment"
                  :key="item.id"
                  :class="
                    (index + 1) % 2 !== 0
                      ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                      : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                  "
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

    <template v-else-if="salesStore.isLoading">
      <CircleLoading class="my-auto mx-auto" />
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500">
              Opss!!
            </h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Data yang diminta tidak ada.</p>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
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
    </Teleport>
  </div>
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
import { computed, ref, nextTick, onMounted, defineAsyncComponent, inject } from "vue";
import { useRoute } from "vue-router";
import { IDRCurrency } from "@/utilities/formatter";
import TableComplex from "@/components/table/TableComplex.vue";
import { useSalesStore } from "@/stores/sales";
import CircleLoading from "@/components/loading/CircleLoading.vue";

const swal = inject("$swal");
const route = useRoute();
const salesStore = useSalesStore();
const showPembayaranModal = ref(false);

const column = [
  { key: "id", label: "No", type: "number", type: "id" },
  { key: "created_at", label: "Tanggal", class: "uppercase", type: "date" },
  { key: "payment", label: "Pembayaran", class: "uppercase", type: "currency" },
  { key: "notes", label: "Catatan", class: "uppercase" },
  { key: "action", label: "Action" },
];

const PembayaranModal = defineAsyncComponent(() => import("../sales/modal/PembayaranKreditModal.vue"));

const LoadingModal = defineAsyncComponent(() => import("@/components/modal/LoadingModal.vue"));
const SuccessModal = defineAsyncComponent(() => import("@/components/modal/SuccessModal.vue"));

const formattedTableData = computed(() => {
  return salesStore.singleResponses?.payment?.map((item) => {
    return {
      id: item.id,
      payment: item.payment,
      created_at: item.created_at,
      notes: item.notes ?? "",
    };
  });
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
