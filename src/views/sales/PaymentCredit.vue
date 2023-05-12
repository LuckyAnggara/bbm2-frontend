<template>
  <div class="w-full flex flex-col justify-center">
    <template v-if="salesStore.singleResponses">
      <div class="flex">
        <div class="w-1/3 h-fit">
          <form>
            <div
              class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6"
            >
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                Detail
              </h5>
              <hr class="my-5" />
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Status</label
                >
                <div
                  v-if="salesStore.singleResponses.status == 'LUNAS'"
                  class="block bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-blue-500 dark:text-white text-center mb-4"
                >
                  LUNAS
                </div>
                <div
                  v-else
                  class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center mb-4"
                >
                  BELUM LUNAS
                </div>
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Invoice</label
                >
                <input
                  :value="salesStore.singleResponses.invoice"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Nama Pelanggan</label
                >
                <input
                  :value="salesStore.singleResponses.customer.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Nomor Telepon</label
                >
                <input
                  :value="salesStore.singleResponses.customer.phone_number"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Alamat</label
                >
                <textarea
                  :value="salesStore.singleResponses.customer.address"
                  disabled
                  rows="3"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                ></textarea>
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Grand Total</label
                >
                <input
                  :value="
                    IDRCurrency.format(salesStore.singleResponses.grand_total)
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Total Pembayaran</label
                >
                <input
                  :value="
                    IDRCurrency.format(
                      salesStore.singleResponses.total_payment ?? 0
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Sisa Kredit</label
                >
                <input
                  :value="
                    IDRCurrency.format(
                      salesStore.singleResponses.remaining_credit
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Jatuh Tempo</label
                >
                <input
                  :value="
                    moment(salesStore.singleResponses.due_date).format(
                      'DD MMMM YYYY'
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
            </div>
          </form>
        </div>
        <div
          class="bg-white shadow-md dark:bg-gray-800 w-2/3 ml-10 rounded-lg px-6 py-6 h-fit"
        >
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Rincian Pembayaran
          </h5>

          <hr class="my-5" />
          <TableComplex
            :use-shadow="false"
            :columns="column"
            :is-loading="salesStore.isLoading"
            :data="formattedTableData"
            :use-search="false"
            :use-limit="false"
            :use-pagginate="false"
          >
            <template #action="{ id }">
              <div class="flex space-x-3">
                <a
                  @click="deleteData(id)"
                  class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
                  ><TrashIcon class="h-7 w-7"
                /></a>
              </div>
            </template>

            <template #extendButton>
              <button
                :disabled="
                  salesStore.singleResponses.status == 'LUNAS' ? true : false
                "
                @click="showPembayaranModal = true"
                :class="[
                  salesStore.singleResponses.status == 'LUNAS'
                    ? 'cursor-not-allowed'
                    : 'hover:scale-105 duration-500 ease-in-out',
                ]"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <PlusIcon class="w-5 h-5 mr-1" />
                Tambah Pembayaran
              </button>

              <button
                :disabled="
                  salesStore.singleResponses.status == 'LUNAS' ? true : false
                "
                :class="[
                  salesStore.singleResponses.status == 'LUNAS'
                    ? 'cursor-not-allowed'
                    : 'hover:scale-105 duration-500 ease-in-out',
                ]"
                @click="prosesLunas()"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              >
                <CheckIcon class="w-5 h-5 mr-1" />
                Pelunasan
              </button>
            </template>
          </TableComplex>
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
            <h1
              class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500"
            >
              Opss!!
            </h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Data yang diminta tidak ada.
            </p>
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
      <LoadingModal :show="salesStore.isPaymentLoading"
        >Processing transaction</LoadingModal
      >
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
import moment from 'moment'
import { TrashIcon, PlusIcon, CheckIcon } from '@heroicons/vue/24/outline'
import {
  computed,
  ref,
  nextTick,
  onMounted,
  defineAsyncComponent,
  inject,
} from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency } from '../../utilities/formatter'
import TableComplex from '../../components/table/TableComplex.vue'
import { useSalesStore } from '../../stores/sales'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const swal = inject('$swal')
const route = useRoute()
const salesStore = useSalesStore()
const showPembayaranModal = ref(false)

const column = [
  { key: 'id', label: 'No', type: 'number', type: 'id' },
  { key: 'created_at', label: 'Tanggal', class: 'uppercase', type: 'date' },
  { key: 'payment', label: 'Pembayaran', class: 'uppercase', type: 'currency' },
  { key: 'notes', label: 'Catatan', class: 'uppercase' },
  { key: 'action', label: 'Action' },
]

const PembayaranModal = defineAsyncComponent(() =>
  import('../sales/modal/PembayaranKreditModal.vue')
)

const LoadingModal = defineAsyncComponent(() =>
  import('../../components/modal/LoadingModal.vue')
)
const SuccessModal = defineAsyncComponent(() =>
  import('../../components/modal/SuccessModal.vue')
)

const formattedTableData = computed(() => {
  return salesStore.singleResponses?.payment?.map((item) => {
    return {
      id: item.id,
      payment: item.payment,
      created_at: item.created_at,
      notes: item.notes ?? '',
    }
  })
})

function deleteData(idPayment) {
  swal
    .fire({
      title: 'Are you sure?',
      text: 'Data tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Cancel!',
      showLoaderOnConfirm: true,
      reverseButtons: true,
      preConfirm: () => {
        salesStore.destroyCreditData(idPayment)
      },
      allowOutsideClick: () => !salesStore.isDestroyLoading,
    })
    .then((result) => {
      if (result.isConfirmed) {
        salesStore.showData(id.value)
      }
    })
}

function prosesLunas() {
  swal.fire({
    title: 'PELUNASAN',
    text: 'Data Invoice ini akan di lunasi sejumlah cicilan tersisa! Proses?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Ya!',
    cancelButtonText: 'Cancel!',
    showLoaderOnConfirm: salesStore.isPaymentLoading,
    reverseButtons: true,
    preConfirm: async () => {
      const data = {
        sale_id: salesStore.singleResponses.id,
        created_at: this.moment(),
        payment: salesStore.singleResponses.remaining_credit,
        notes: 'PELUNASAN',
      }
      salesStore.storeCreditPayment(data)
    },
    allowOutsideClick: () => !salesStore.isPaymentLoading,
    backdrop: true,
  })
}

async function prosesTransaction(data) {
  showPembayaranModal.value = false
  await nextTick()
  salesStore.storeCreditPayment(data)
}

async function reload() {
  salesStore.isTransactionSuccess = false
  await nextTick()
  salesStore.showData(id.value)
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(() => {
  if (salesStore.singleResponses == null) {
    salesStore.showData(id.value)
  }
})
</script>
