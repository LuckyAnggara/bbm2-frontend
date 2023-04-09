<template>
  <div
    class="mt-12 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 mx-auto"
  >
    <div class="w-full pt-1 pb-5">
      <div
        class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center"
      >
        <i class="mdi mdi-credit-card-outline text-3xl">
          <BanknotesIcon class="h-10" />
        </i>
      </div>
    </div>
    <h5
      class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
      Pilih metode pembayaran
    </h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Untuk metode kredit dipastikan bahwa pelanggan adalah Pelanggan Tetap
    </p>
    <div class="my-4 mb-5">
      <h6
        class="text-base font-semibold text-gray-900 md:text-xl dark:text-white"
      >
        Total
      </h6>
      <p class="text-3xl font-normal text-gray-500 dark:text-gray-400">
        {{ IDRCurrency.format(salesStore.currentData.total.total ?? 0) }}
      </p>
    </div>

    <ul class="my-4 space-y-4">
      <li
        v-for="item in menuItems"
        :key="item.id"
        @click="item.action"
        class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
      >
        <a
          class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white group hover:bg-gray-600 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <component :is="item.icon" class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap">{{ item.label }}</span>
        </a>
      </li>
    </ul>
    <!-- <ul class="my-4 space-y-4">
      <li
        @click="showCashModal = true"
        class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
      >
        <a
          class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white hover:text-gray-700 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <BanknotesIcon class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap">Cash / Tunai</span>
        </a>
      </li>

      <li
        @click="showCreditModal = true"
        class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
      >
        <a
          class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white hover:text-gray-700 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <CreditCardIcon class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap"
            >Credit / Kredit / Tempo</span
          >
        </a>
      </li>

      <li
        @click="noFeature()"
        class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
      >
        <a
          class="flex items-center p-3 text-base font-bold bg-gray-700 text-white hover:text-gray-700 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <HomeModernIcon class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap">Transfer Bank </span>
        </a>
      </li>

      <li
        @click="noFeature()"
        class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
      >
        <a
          class="flex items-center p-3 text-base font-bold bg-gray-700 text-white hover:text-gray-700 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <QrCodeIcon class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap">QR Code </span>
        </a>
      </li>
    </ul> -->
    <div>
      <a
        class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
      >
        <svg
          class="w-3 h-3 mr-2"
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="question-circle"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
          ></path>
        </svg>
        Pastikan kembali data penjualan sebelum melakukan pembayaran</a
      >
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <CashModal
        :show="showCashModal"
        @close="showCashModal = false"
        @submitTransaction="submitTransaction(true, false)"
      >
      </CashModal>
    </Teleport>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <CreditModal
        :show="showCreditModal"
        @close="showCreditModal = false"
        @submitTransaction="submitTransaction(false, true)"
      >
      </CreditModal>
    </Teleport>

    <Teleport to="body">
      <LoadingModal :show="salesStore.isStoreLoading"
        >Processing transaction</LoadingModal
      >
    </Teleport>

    <Teleport to="body">
      <SuccessModal
        :show="salesStore.isTransactionSuccess"
        @submit="invoicePage"
        ><template #message> Transaction success </template>
        <template #buttonText> Next </template>
      </SuccessModal>
    </Teleport>
  </div>
</template>

<script setup>
import {
  BanknotesIcon,
  CreditCardIcon,
  QrCodeIcon,
  BookOpenIcon,
  HomeModernIcon,
  RocketLaunchIcon,
} from '@heroicons/vue/24/outline'
import { inject, defineAsyncComponent, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useItemStore } from '../../../stores/persediaan'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'

const swal = inject('$swal')
const salesStore = useSalesStore()
const itemStore = useItemStore()
const router = useRouter()
const toast = useToast()

function noFeature() {
  swal.fire('Fitur belum dapat digunakan', '', 'info')
}

const showCashModal = ref(false)
const showCreditModal = ref(false)

const menuItems = ref([
  {
    id: 1,
    label: 'Cash / Tunai',
    icon: 'BanknotesIcon',
    action: () => {
      showCashModal.value = true
    },
  },
  {
    id: 2,
    label: 'Credit / Kredit / Tempo',
    icon: 'CreditCardIcon',
    action: () => {
      showCreditModal.value = true
    },
  },
  {
    id: 3,
    label: 'Transfer Bank',
    icon: 'HomeModernIcon',
    action: () => {
      noFeature()
    },
  },
  {
    id: 4,
    label: 'QR Code',
    icon: 'QrCodeIcon',
    action: () => {
      noFeature()
    },
  },
])

const CashModal = defineAsyncComponent(() => import('../modal/CashModal.vue'))
const CreditModal = defineAsyncComponent(() =>
  import('../modal/CreditModal.vue')
)

const LoadingModal = defineAsyncComponent(() =>
  import('../../../components/modal/LoadingModal.vue')
)
const SuccessModal = defineAsyncComponent(() =>
  import('../../../components/modal/SuccessModal.vue')
)

async function submitTransaction(isCash = false, isCredit = false) {
  if (isCredit == true) {
    if (salesStore.currentData.credit.due_date == '') {
      toast.error('Tanggal jatuh tempo belum di isi', {
        timeout: 1000,
        position: 'bottom-left',
      })
      return
    }
  }

  showCreditModal.value = false
  showCashModal.value = false

  await nextTick()
  // UPDATE DATA UNTUK TRANSAKSI KAS MASUK KE KASIR
  salesStore.currentData.transaction = {
    isCash: isCash,
    isCredit: isCredit,
    amount: isCash
      ? salesStore.currentData.total.total
      : salesStore.currentData.total.dp,
    type: 'IN',
  }

  // PROSES TRANSAKSI
  salesStore.store()
  await nextTick()
  salesStore.$patch({
    currentData: {},
  })
  itemStore.$patch({
    searchName: null,
    responses: null,
  })
}

async function invoicePage() {
  salesStore.isTransactionSuccess = false
  await nextTick()
  router.push({ name: 'invoice', params: { id: salesStore.responses.id } })
}
</script>
