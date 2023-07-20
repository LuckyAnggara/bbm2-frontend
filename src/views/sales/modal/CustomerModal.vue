<template>
  <Transition name="modal">
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Data Pelanggan</h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
            >
              <XMarkIcon class="h-5 w-5" />

              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->

          <div>
            <div class="mb-24">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cari Pelanggan</label>
              <Searchbar
                v-model="customerStore.searchName"
                @cari-data="cariData()"
                :top-position="'top-40'"
                :left-position="'left-6'"
                :is-loading="customerStore.isLoading"
                :result-items="customerStore.items"
                :placeholder="'Cari Data Pelanggan Tetap'"
                @add-data="addData"
                :disabled-add="isEdit"
              >
                <template v-slot:button>
                  <span class="ml-1">Choose</span>
                </template>
              </Searchbar>
            </div>

            <form autocomplete="off">
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                  <input
                    ref="namaLengkap"
                    :disabled="isCustomer == true && isEdit == false"
                    v-model="customerData.name"
                    type="text"
                    :class="[!isEdit == true ? 'bg-gray-200 dark:bg-gray-900' : 'bg-white dark:bg-gray-700']"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    :disabled="isCustomer == true && isEdit == false"
                    :class="[!isEdit ? 'bg-gray-200 dark:bg-gray-900' : 'bg-white dark:bg-gray-700']"
                    v-model="customerData.phone_number"
                    type="text"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nomor Telepon / Whatsapp"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Lengkap</label>
                  <textarea
                    :class="[!isEdit ? 'bg-gray-200 dark:bg-gray-900' : 'bg-white dark:bg-gray-700']"
                    :disabled="isCustomer == true && isEdit == false"
                    v-model="customerData.address"
                    rows="5"
                    class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Alamat lengkap customer"
                  ></textarea>
                </div>

                <div v-if="!isCustomer" class="flex items-center mb-4">
                  <input
                    v-model="customerData.saveCustomer"
                    id="checkbox-1"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Simpan pelanggan </label>
                </div>

                <small class="text-red-500 font-medium" v-if="customerData.saveCustomer">Mohon lengkapi data pelanggan setelah transaksi</small>
              </div>
              <div class="flex items-center space-x-4 justify-between">
                <div class="flex space-x-4">
                  <button
                    :disabled="customerStore.isEditLoading"
                    :class="[canSubmit == true ? '' : isEdit ? '' : 'hidden', customerStore.isEditLoading ? 'cursor-wait' : '']"
                    @click="clearData"
                    ref="submit"
                    type="button"
                    class="text-white-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
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
                    class="text-white-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
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

                <button
                  @click="submitCustomer"
                  :class="[canSubmit == true ? '' : 'hidden']"
                  type="button"
                  class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  Submit
                  <PaperAirplaneIcon class="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { PaperAirplaneIcon, TrashIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { nextTick, onMounted, ref, computed } from 'vue'
import { useCustomerStore } from '../../stores/customer'
import { useAuthStore } from '../../stores/auth'
import { useToast } from 'vue-toastification'

import Searchbar from '../../components/input/Searchbar.vue'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['close', 'sendCustomer'])

const namaLengkap = ref(null)
const submit = ref(null)
const toast = useToast()
const customerStore = useCustomerStore()
const authStore = useAuthStore()
const customerData = ref({
  id: '',
  name: '',
  address: '',
  phone_number: '',
  userId: authStore.userData.id,
  saveCustomer: false,
})
const isCustomer = ref(false)
const isEdit = ref(false)
const canClose = ref(true)

// const canSubmit = ref(false)

function cariData() {
  customerStore.currentLimit = 5
  customerStore.getData()
}

function clearData() {
  if (isEdit.value) {
    isEdit.value = !isEdit.value
  } else {
    canClose.value = true
    isCustomer.value = false
    isEdit.value = false
    customerStore.searchName = ''
    customerData.value = {
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
    emit('sendCustomer', customerData.value)
    toast.info('Data pelanggan di hapus', {
      timeout: 2000,
      position: 'bottom-left',
    })
  }
}

async function editData() {
  if (isEdit.value == false) {
    isEdit.value = true
    nextTick()
    namaLengkap.value.focus()
  } else {
    await customerStore.updateCustomer(customerData.value)
    isEdit.value = false
  }
}

function addData(item) {
  canClose.value = false
  customerData.value = item
  customerData.value.user = {
    id: authStore.userData.id,
    branchId: authStore.userData.branch_id,
  }
  isCustomer.value = true
  toast.success(item.name + ' menjadi pelanggan transaksi ini', {
    timeout: 2000,
    position: 'bottom-left',
  })
}

function closeModal() {
  if (!canClose.value) {
    toast.error('Jangan lupa untuk klik tombol Submit', {
      timeout: 2000,
      position: 'bottom-left',
    })
    nextTick()
    submit.value.focus()
    return
  }
  emit('close')
}

function submitCustomer() {
  canClose.value = true
  emit('sendCustomer', customerData.value)
  toast.success('Pelanggan berhasil ditambahkan', {
    timeout: 2000,
    position: 'top-right',
  })
  nextTick()
  emit('close')
}

// const canSubmit = computed(() => {
//   return customerData.value.name == ''
//     ? false
//     : isEdit.value == false
//     ? true
//     : false
// })

const canSubmit = computed(() => {
  if (customerData.value) {
    return customerData.value.name !== '' && customerData.value.address !== '' && customerData.value.phone_number !== ''
  }
  return false
})

// watch(customerData.name, (x) => {
//   console.info(x.name)
//   if (x.name) canSubmit.value = true
//   else canSubmit.value = false
// })

// onMounted(() => {
//   customerStore.getData()
// })
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
