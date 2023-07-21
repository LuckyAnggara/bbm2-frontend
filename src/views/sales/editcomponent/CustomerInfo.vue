<template>
  <section class="w-full flex flex-col relative justify-between">
    <div class="flex lg:flex-row flex-col lg:space-x-6 space-y-6 lg:space-y-0 ease-in-out transform duration-300">
      <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg h-fit">
        <div class="flex flex-row items-center justify-between p-4 space-y-4">
          <div class="xl:w-96 w-full">
            <Searchbar
              v-model="customerStore.searchName"
              @cari-data="cariData()"
              :width="'w-96'"
              :top-position="'top-40'"
              :left-position="'left-6'"
              :is-loading="customerStore.isLoading"
              :result-items="customerStore.items"
              :placeholder="'Cari Data Pelanggan Tetap'"
              :aria-result="false"
              @add-data="addData"
              :disabled-add="isEdit"
            >
              <template v-slot:button>
                <span class="ml-1">Pilih</span>
              </template>
            </Searchbar>
          </div>
        </div>
      </div>
      <form class="w-full flex flex-col space-y-4" @submit.prevent="emit('next')">
        <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
              <input
                required
                ref="namaLengkap"
                :disabled="formDisabled"
                v-model="salesStore.singleResponses.customer.name"
                type="text"
                :class="[formDisabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Nama Lengkap"
              />
              <div v-if="canSubmit == true || isEdit == true">
                <span v-if="isCustomer" class="text-blue-400 py-2">Pelanggan Tetap</span>
                <span v-else class="text-green-400 py-2">Pelanggan Baru</span>
              </div>
            </div>
            <div>
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon</label>
              <input
                required
                :disabled="formDisabled"
                :class="[formDisabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                v-model="salesStore.singleResponses.customer.phone_number"
                type="text"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Nomor Telepon / Whatsapp"
              />
            </div>

            <div class="sm:col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Lengkap</label>
              <textarea
                required
                :class="[formDisabled == true ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                :disabled="formDisabled"
                v-model="salesStore.singleResponses.customer.address"
                rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Alamat lengkap customer"
              ></textarea>
            </div>
          </div>
          <div class="flex items-center space-x-4 justify-between">
            <div class="flex space-x-4">
              <button
                :disabled="customerStore.isEditLoading"
                :class="[canSubmit == true ? '' : isEdit ? '' : 'hidden', customerStore.isEditLoading ? 'cursor-wait' : '']"
                @click="clearData"
                ref="submit"
                type="button"
                class="text-white-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
              >
                <div>
                  <span v-if="isEdit" class="flex">
                    Cancel
                    <XMarkIcon class="h-5 w-5 ml-2" />
                  </span>
                  <span v-else class="flex">
                    Clear
                    <TrashIcon class="h-5 w-5 ml-2" />
                  </span>
                </div>
              </button>
              <button
                :disabled="customerStore.isEditLoading"
                @click="editData"
                :class="[isCustomer == true ? '' : 'hidden', customerStore.isEditLoading ? 'cursor-wait' : '']"
                ref="submit"
                type="button"
                class="text-white-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
              >
                <div>
                  <span v-if="customerStore.isEditLoading" class="text-center flex items-center">
                    <CircleLoading :size="'w-5 h-5'" :bg-circle="'fill-green-500'" />
                    Prosessing</span
                  >
                  <span v-else class="flex">
                    {{ isEdit ? 'Update' : 'Edit' }}
                    <PencilSquareIcon class="h-5 w-5 ml-2" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 justify-end">
          <button
            type="submit"
            class="text-blue-600 inline-flex items-center hover:text-white border hover:translate-x-2 ease-in-out duration-300 border-blue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600"
          >
            Lanjut
            <PaperAirplaneIcon class="h-5 w-5 ml-2" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { PaperAirplaneIcon, TrashIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { nextTick, ref, computed, watch, onUnmounted } from 'vue'
import { useCustomerStore } from '../../../stores/customer'
import { useSalesStore } from '../../../stores/sales'
import { useAuthStore } from '../../../stores/auth'
import { useToast } from 'vue-toastification'

import Searchbar from '../../../components/input/Searchbar.vue'
import CircleLoading from '../../../components/loading/CircleLoading.vue'

const emit = defineEmits(['next'])

const namaLengkap = ref(null)
const submit = ref(null)
const toast = useToast()
const customerStore = useCustomerStore()
const salesStore = useSalesStore()
const authStore = useAuthStore()
const isCustomer = ref(false)
const isEdit = ref(false)
const canClose = ref(true)

function cariData() {
  customerStore.currentLimit = 5
  customerStore.getData()
}

function clearData() {
  if (isEdit.value) {
    isEdit.value = false
  } else {
    canClose.value = true
    isCustomer.value = false
    isEdit.value = false
    customerStore.searchName = ''
    salesStore.currentData.customerData = {
      id: '',
      name: '',
      address: '',
      phone_number: '',
      saveCustomer: false,
      user: {
        id: authStore.userData.id,
        branchId: authStore.userData.branch_id,
      },
    }

    toast.info('Data pelanggan di hapus', {
      timeout: 2000,
      position: 'bottom-left',
    })
  }
}

async function editData() {
  if (isEdit.value == false) {
    isEdit.value = true
    await nextTick()
    namaLengkap.value.focus()
  } else {
    await customerStore.updateCustomer(salesStore.currentData.customerData)
    isEdit.value = false
  }
}

function addData(item) {
  canClose.value = false
  salesStore.currentData.customerData = item
  salesStore.currentData.customerData.user = {
    id: authStore.userData.id,
    branchId: authStore.userData.branch_id,
  }
  isCustomer.value = true
  toast.success(item.name + ' menjadi pelanggan transaksi ini', {
    timeout: 2000,
    position: 'bottom-left',
  })
}

const canSubmit = computed(() => {
  if (salesStore.currentData.customerData) {
    return (
      salesStore.currentData.customerData.name !== '' &&
      salesStore.currentData.customerData.address !== '' &&
      salesStore.currentData.customerData.phone_number !== ''
    )
  }
  return false
})

const formDisabled = computed(() => {
  if (isCustomer.value == true && isEdit.value == false) return true
  return false
})

watch(
  () => salesStore.currentData.customerData.saveCustomer,
  (newValue, oldValue) => {
    if (newValue == true) {
      toast.info('Data pelanggan akan di simpan!!', {
        timeout: 2000,
        position: 'bottom-right',
      })
    }
  },
  { deep: true }
)

onUnmounted(() => {
  customerStore.$reset()
})
</script>
