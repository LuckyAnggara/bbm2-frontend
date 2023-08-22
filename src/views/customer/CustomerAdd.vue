<template>
  <div
    class="mt-2 w-full bg-white py-4 px-6 rounded-md dark:bg-gray-800 dark:text-white shadow-sm"
  >
    <div class="min-w-lg px-2 sm:px-0">
      <div
        class="text-2xl font-medium mb-4 flex md:flex-row flex-col justify-between duration-300 ease-in-out"
      >
        <span class="py-2">Info</span>
        <button
          :disabled="!canSubmit"
          :class="
            !canSubmit
              ? 'cursor-not-allowed'
              : 'duration-300 hover:scale-105 transition'
          "
          @click="store"
          class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
        >
          <FolderArrowDownIcon class="h-4 w-4 mr-2" />

          Simpan
        </button>
      </div>
      <hr class="py-4" />
      <div
        class="max-w-lg"
        autosave="off"
        aria-autocomplete="off"
        autocomplete="off"
      >
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="customerStore.currentData.name"
            type="text"
            name="customer_name"
            id="customer_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="customer_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Name <span class="text-red-500">*</span></label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="customerStore.currentData.phoneNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="customer_phone_number"
            id="customer_phone_number"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="customer_phone_number"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Customer Phone Number / WhatsApp
            <span class="text-red-500">*</span></label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="customerStore.currentData.email"
            type="email"
            name="customer_email"
            id="customer_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="customer_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email</label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <select
            v-model="customerStore.currentData.type"
            required
            name="customer_type"
            id="customer_type"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option class="dark:bg-gray-700" value="" disabled selected>
              Customer Type
            </option>
            <option class="dark:bg-gray-700" value="personal">Personal</option>
            <option class="dark:bg-gray-700" value="company">Company</option>
          </select>
          <label
            for="customer_type"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Type <span class="text-red-500">*</span></label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <textarea
            v-model="customerStore.currentData.address"
            type="text"
            name="customer_address"
            id="customer_address"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="customer_address"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Address <span class="text-red-500">*</span></label
          >
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <div class="flex space-x-2">
              <div class="w-full">
                <input
                  v-model="customerStore.currentData.postalCode"
                  type="text"
                  name="customer_postal_code"
                  id="customer_postal_code"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="customer_postal_code"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Postal Code</label
                >
              </div>
              <button
                type="button"
                @click="popPostalCodeModal"
                class="h-fit place-self-end text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <MagnifyingGlassIcon class="h-4 w-4" />
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="customerStore.currentData.urban"
              type="text"
              name="customer_urban"
              id="customer_urban"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="customer_urban"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Urban</label
            >
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="customerStore.currentData.subdistrict"
              type="text"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="customer_subdistrict"
              id="customer_subdistrict"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="customer_subdistrict"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Sub District</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="customerStore.currentData.city"
              type="text"
              name="customer_city"
              id="customer_city"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="customer_city"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >City</label
            >
          </div>
        </div>
      </div>

      <Teleport to="body">
        <LoadingModal :show="customerStore.isStoreLoading"
          >Processing ...</LoadingModal
        >
      </Teleport>

      <Teleport to="body">
        <SuccessModal
          :show="customerStore.isTransactionSuccess"
          :type="'success'"
          ><template #message> Customer successfull created </template>
          <template #buttonText>
            <button
              @click="toCustomerPage"
              type="button"
              class="hover:scale-110 duration-300 ease-in-out transform py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Tutup
            </button>
          </template>
        </SuccessModal>
      </Teleport>

      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <PostalCodeModal
          :show="showPostalCodeModal"
          @close="showPostalCodeModal = false"
          @submit="fromPostal"
        >
        </PostalCodeModal>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'

import { FolderArrowDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import LoadingModal from '../../components/modal/LoadingModal.vue'
import SuccessModal from '../../components/modal/SuccessModal.vue'
import { usePostalCodeStore } from '../../stores/postalCode'
import { useCustomerStore } from '../../stores/customer'
import PostalCodeModal from '../../components/modal/PostalCodeModal.vue'

const postalCodeStore = usePostalCodeStore()
const customerStore = useCustomerStore()

const toast = useToast()
const router = useRouter()

const showPostalCodeModal = ref(false)

async function popPostalCodeModal() {
  postalCodeStore.searchName = customerStore.currentData.postalCode
  await nextTick()
  if (postalCodeStore.searchName !== '') {
    postalCodeStore.getData()
  }
  showPostalCodeModal.value = true
}

function fromPostal(item) {
  customerStore.$patch((state) => {
    state.currentData.postalCode = item.postalcode
    state.currentData.urban = item.urban
    state.currentData.subdistrict = item.subdistrict
    state.currentData.city = item.city
  })
}

async function toCustomerPage() {
  customerStore.isTransactionSuccess = false
  await nextTick()
  router.push({ name: 'list-customer' })
}

function store() {
  if (canSubmit.value) {
    customerStore.store()
  } else {
    toast.error('Incomplete Customer Information', {
      timeout: 2000,
      position: 'top-center',
    })
  }
}

const canSubmit = computed(() => {
  const customer = customerStore.currentData
  if (
    customer.name == null ||
    customer.name === '' ||
    customer.type == null ||
    customer.type === '' ||
    customer.address == null ||
    customer.address === 0
  ) {
    return false
  }

  return true
})

onMounted(() => {})
</script>
