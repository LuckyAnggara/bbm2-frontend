<template>
  <section>
    <Transition name="modal">
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <!-- Modal content -->
          <div
            class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 rounded-t border-b dark:border-gray-600"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Shipping Detail
              </h3>
              <button
                @click="emit('close')"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <XMarkIcon class="h-5 w-5" />

                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->

            <div>
              <!-- TABS HEADER -->
              <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
                <ul
                  class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
                >
                  <li class="mr-2">
                    <a
                      @click="step = 1"
                      :class="
                        step == 1
                          ? 'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group'
                          : 'cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'
                      "
                    >
                      <TruckIcon
                        :class="
                          step == 1
                            ? 'text-blue-600 dark:text-blue-500'
                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                        "
                        class="w-5 h-5 mr-2"
                      />
                      Shipping
                    </a>
                  </li>
                  <li class="mr-2">
                    <a
                      @click="step = 2"
                      :class="
                        step == 2
                          ? 'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group'
                          : 'cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'
                      "
                    >
                      <UserCircleIcon
                        :class="
                          step == 2
                            ? 'text-blue-600 dark:text-blue-500'
                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                        "
                        class="w-5 h-5 mr-2"
                      />
                      Data Receiver
                    </a>
                  </li>
                </ul>
              </div>
              <!-- TABS BODY -->
              <Transition>
                <div v-if="step == 1" class="flex flex-col space-y-4 mb-6">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-900 dark:text-white mb-1"
                      >Shipping Vendor</label
                    >
                    <select
                      v-model="salesStore.currentData.shipping.vendor"
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0">Default Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-900 dark:text-white mb-1"
                      >Fee Shipping</label
                    >
                    <InputCurrency
                      :options="{ currency: 'IDR' }"
                      v-model="salesStore.currentData.shipping.fee"
                      :custom-class="'block p-2.5 w-full text-md bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                    />
                  </div>
                </div>
                <div v-else class="flex flex-col space-y-4 mb-6">
                  <div class="flex items-center">
                    <input
                      v-model="useCustomer"
                      id="checkbox-2"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="checkbox-2"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Sama dengan data costumer
                    </label>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-900 dark:text-white"
                      >Nama Penerima</label
                    >
                    <input
                      v-model="salesStore.currentData.shipping.receiverName"
                      type="text"
                      class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-900 dark:text-white"
                      >Nomor Telepon Penerima</label
                    >
                    <input
                      v-model="
                        salesStore.currentData.shipping.receiverPhoneNumber
                      "
                      type="text"
                      class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Nomor telepon"
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block text-sm font-medium text-gray-900 dark:text-white"
                      >Alamat Penerima</label
                    >
                    <textarea
                      v-model="salesStore.currentData.shipping.receiverAddress"
                      rows="3"
                      class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Alamat lengkap customer"
                    ></textarea>
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="flex space-x-2">
                      <div class="w-full">
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-900 dark:text-white"
                          >Kode Pos</label
                        >
                        <input
                          v-model="
                            salesStore.currentData.shipping.receiverPostalCode
                          "
                          type="text"
                          class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Kode Pos"
                        />
                      </div>
                      <button
                        type="button"
                        @click="popPostalCodeModal"
                        class="h-fit place-self-end text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                      >
                        <MagnifyingGlassIcon class="h-5 w-5" />
                        <span class="sr-only">Icon description</span>
                      </button>
                    </div>
                    <div class="w-full">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Kelurahan</label
                      >
                      <input
                        v-model="
                          salesStore.currentData.shipping.receiverKelurahan
                        "
                        type="text"
                        class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Kelurahan"
                      />
                    </div>
                    <div class="w-full">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Kecamatan</label
                      >
                      <input
                        v-model="
                          salesStore.currentData.shipping.receiverKecamatan
                        "
                        type="text"
                        class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Kecamatan"
                      />
                    </div>
                    <div class="w-full">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Kota/Kabupaten</label
                      >
                      <input
                        v-model="salesStore.currentData.shipping.receiverKota"
                        type="text"
                        class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Kota / Kabupaten"
                      />
                    </div>
                  </div>
                </div>
              </Transition>
              <div class="flex items-center space-x-4 justify-between">
                <div>
                  <button
                    v-if="step == 1"
                    @click="emit('close')"
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <div>
                      <span class="flex">
                        <XMarkIcon class="h-5 w-5 mr-2" />
                        Cancel
                      </span>
                    </div>
                  </button>
                  <button
                    v-else
                    @click="step--"
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <div>
                      <span class="flex">
                        <ArrowLeftIcon class="h-5 w-5 mr-2" />
                        Back
                      </span>
                    </div>
                  </button>
                </div>

                <div>
                  <button
                    v-if="step == 1"
                    @click="step++"
                    type="button"
                    class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                  >
                    Lanjut
                    <ArrowRightIcon class="h-5 w-5 ml-2" />
                  </button>
                  <button
                    v-else
                    @click="submit"
                    type="button"
                    class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                  >
                    Submit
                    <PaperAirplaneIcon class="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <PostalCodeModal
        :show="showPostalCodeModal"
        @close="showPostalCodeModal = false"
        @submit="fromPostal"
      >
      </PostalCodeModal>
    </Teleport>
  </section>
</template>

<script setup>
import {
  PaperAirplaneIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  TruckIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { nextTick, onMounted, ref, computed, watch } from 'vue'

import CircleLoading from '../../../components/loading/CircleLoading.vue'
import { IDRCurrency } from '../../../utilities/formatter'
import InputCurrency from '../../../components/input/InputCurrency.vue'

import { useSalesStore } from '../../../stores/sales'
import { usePostalCodeStore } from '../../../stores/postalCode'
import PostalCodeModal from '../../../components/modal/PostalCodeModal.vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['close', 'next'])

const useCustomer = ref(false)
const toast = useToast()
const showPostalCodeModal = ref(false)
const shippingData = ref({
  vendor: 0,
  fee: 0,
})
const salesStore = useSalesStore()
const postalCodeStore = usePostalCodeStore()

async function submit() {
  // salesStore.$patch((state) => {
  //   const b = state.currentData.shipping
  //   state.currentData.shipping = { ...b, ...shippingData.value }
  // })

  await nextTick()
  emit('next')
}
const step = ref(1)

function fromPostal(item) {
  salesStore.currentData.shipping.receiverKelurahan = item.urban
  salesStore.currentData.shipping.receiverKecamatan = item.subdistrict
  salesStore.currentData.shipping.receiverKota = item.city
  salesStore.currentData.shipping.receiverPostalCode = item.postalcode
}

async function popPostalCodeModal() {
  postalCodeStore.searchName =
    salesStore.currentData.shipping.receiverPostalCode
  await nextTick()
  if (postalCodeStore.searchName !== '') {
    postalCodeStore.getData()
  }
  showPostalCodeModal.value = true
}

watch(
  () => useCustomer.value,
  (newValue, oldValue) => {
    if (newValue == true) {
      if (salesStore.currentData.customerData.withoutCustomer == true) {
        toast.info('Data pelanggan tidak ada', {
          timeout: 2000,
          position: 'bottom-center',
        })
      } else {
        salesStore.currentData.shipping.receiverName =
          salesStore.currentData.customerData.name
        salesStore.currentData.shipping.receiverAddress =
          salesStore.currentData.customerData.address
        salesStore.currentData.shipping.receiverPhoneNumber =
          salesStore.currentData.customerData.phone_number
      }
    }
  },
  { deep: true }
)
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
