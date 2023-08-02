<template>
  <div class="mt-12 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 lg:w-3/6 w-full mx-auto">
    <div class="w-full pt-1 pb-5">
      <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
        <i class="mdi mdi-credit-card-outline text-3xl">
          <BanknotesIcon class="h-10" />
        </i>
      </div>
    </div>
    <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">Pilih metode pembayaran</h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Untuk metode kredit dipastikan bahwa pelanggan adalah Pelanggan Tetap</p>
    <div class="my-4" v-if="salesStore.currentData.shipping.type !== 'TAKE AWAY'">
      <h6 class="text-base font-semibold text-gray-900 md:text-xl dark:text-white">Shipping Fee</h6>
      <p class="text-3xl font-normal text-gray-500 dark:text-gray-400">
        {{ IDRCurrency.format(salesStore.currentData.shipping.fee ?? 0) }}
      </p>
    </div>
    <div class="my-4 mb-5">
      <h6 class="text-base font-semibold text-gray-900 md:text-xl dark:text-white">Grand Total</h6>
      <p class="text-3xl font-normal text-gray-500 dark:text-gray-400">
        {{ IDRCurrency.format(salesStore.total.grandTotal ?? 0 + salesStore.currentData.shipping.fee) }}
      </p>
    </div>
    <Transition name="slide-up">
      <ul class="my-4 space-y-4" v-if="stateShow == 'first'">
        <li v-for="item in firstMenu" :key="item.id" @click="item.action" class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer">
          <a
            class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white group hover:bg-gray-600 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span class="flex-1 ml-4 whitespace-nowrap">{{ item.label }}</span>
          </a>
        </li>
      </ul>

      <ul class="my-4 space-y-4" v-else>
        <li @click="stateShow = 'first'">
          <a
            class="hover:scale-105 ease-in-out duration-300 cursor-pointer flex items-center p-2 text-base font-bold rounded-lg bg-gray-700 text-white group hover:bg-gray-600 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white w-fit"
          >
            <ArrowLeftIcon class="h-5" />
          </a>
        </li>
        <li v-for="item in secondMenu" :key="item.id" @click="item.action" class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer">
          <a
            class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white group hover:bg-gray-600 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <component :is="item.icon" class="h-5 w-5 text-white" />
            <span class="flex-1 ml-4 whitespace-nowrap">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </Transition>

    <!-- <ul class="my-4 space-y-4">

      <li v-for="item in menuItems" :key="item.id" @click="item.action" class="hover:-translate-y-2 ease-in-out duration-300 cursor-pointer">
        <a
          class="flex items-center p-3 text-base font-bold rounded-lg bg-gray-700 text-white group hover:bg-gray-600 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <component :is="item.icon" class="h-5" />
          <span class="flex-1 ml-4 whitespace-nowrap">{{ item.label }}</span>
        </a>
      </li>
    </ul> -->
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
      <a class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
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
      <CashModal :show="showCashModal" @close="showCashModal = false" @submitTransaction="submitTransaction(false, 'CASH')"> </CashModal>
    </Teleport>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <TransferModal :show="showTransferModal" @close="showTransferModal = false" @submitTransaction="submitTransaction(false, 'TRANSFER')"> </TransferModal>
    </Teleport>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <CreditModal :show="showCreditModal" @close="showCreditModal = false" @submitTransaction="submitTransaction(false, true)"> </CreditModal>
    </Teleport>

    <Teleport to="body">
      <LoadingModal :show="salesStore.isStoreLoading">Processing transaction</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="salesStore.isTransactionSuccess" @submit="invoicePage"
        ><template #message> Transaction success </template>
        <template #buttonText> Invoice </template>
      </SuccessModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="errorModal" @submit="errorModal = false" :type="'error'">
        <template #message>
          <div class="flex flex-col">
            <span class="text-red-500"> Error</span>
            <span> Bukan pelanggan Tetap </span>
          </div>
        </template>
        <template #buttonText> Close </template>
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
  BuildingLibraryIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'
import { inject, defineAsyncComponent, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useItemStore } from '../../../stores/items'
import { useSalesStore } from '../../../stores/sales'
import { IDRCurrency } from '../../../utilities/formatter'

import ErrorModal from '../../../components/modal/SuccessModal.vue'

const errorModal = ref(false)

const swal = inject('$swal')
const salesStore = useSalesStore()
const itemStore = useItemStore()
const router = useRouter()
const toast = useToast()

const stateShow = ref('first')

function noFeature() {
  swal.fire('Fitur belum dapat digunakan', '', 'info')
}

const showCashModal = ref(false)
const showTransferModal = ref(false)
const showCreditModal = ref(false)

const firstMenu = ref([
  {
    id: 1,
    label: 'Full Payment',
    icon: BanknotesIcon,
    action: () => {
      stateShow.value = 'second'
      salesStore.currentData.transaction.paymentStatus = 'LUNAS'
      // showCashModal.value = true
    },
  },
  {
    id: 2,
    label: 'Credit',
    icon: CreditCardIcon,
    action: () => {
      if (salesStore.currentData.customerData.id == 1) {
        errorModal.value = true
      } else {
        stateShow.value = 'second'
        salesStore.currentData.transaction.paymentStatus = 'CREDIT'
      }

      // showCreditModal.value = true
    },
  },
])

const secondMenu = ref([
  {
    id: 1,
    label: 'Cash',
    icon: BanknotesIcon,
    action: () => {
      showCashModal.value = true
      // showCashModal.value = true
    },
  },
  {
    id: 2,
    label: 'Bank Transfer',
    icon: BuildingLibraryIcon,
    action: () => {
      showTransferModal.value = true
      // showCreditModal.value = true
    },
  },
  {
    id: 3,
    label: 'QRIS',
    icon: CreditCardIcon,
    action: () => {
      noFeature()
    },
  },
  {
    id: 4,
    label: 'Digital Payment',
    icon: QrCodeIcon,
    action: () => {
      noFeature()
    },
  },
])

const CashModal = defineAsyncComponent(() => import('../modal/CashModal.vue'))
const TransferModal = defineAsyncComponent(() => import('../modal/TransferModal.vue'))
const CreditModal = defineAsyncComponent(() => import('../modal/CreditModal.vue'))

const LoadingModal = defineAsyncComponent(() => import('../../../components/modal/LoadingModal.vue'))
const SuccessModal = defineAsyncComponent(() => import('../../../components/modal/SuccessModal.vue'))

async function submitTransaction(isCredit = false, paymentType = 'CASH') {
  if (salesStore.currentData.currentCart.length == 0) {
    toast.error('Transaksi tidak dapat di Proses', {
      timeout: 3000,
      position: 'bottom-center',
    })

    return
  }
  if (isCredit == true) {
    if (salesStore.currentData.credit.due_date == '') {
      toast.error('Tanggal jatuh tempo belum di isi', {
        timeout: 1000,
        position: 'bottom-left',
      })
      return
    }
  }
  await nextTick()
  // UPDATE DATA UNTUK TRANSAKSI KAS MASUK KE PAYLOAD
  salesStore.setData(isCredit, paymentType)

  await nextTick()
  // PROSES TRANSAKSI
  salesStore.store()
  // await nextTick()
  // salesStore.resetData()
  // itemStore.resetData()
}

async function invoicePage() {
  salesStore.isTransactionSuccess = false
  await nextTick()
  router.push({ name: 'invoice', params: { id: salesStore.responses.id } })
}
</script>
