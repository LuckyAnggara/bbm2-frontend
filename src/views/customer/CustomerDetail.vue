<template>
  <div class="px-2 sm:px-0 justify-center flex flex-col transition-all duration-300 ease-in-out">
    <template v-if="customerStore.singleResponses">
      <TabGroup @change="changeTab">
        <div class="flex md:flex-row flex-col-reverse justify-between w-full">
          <TabList class="md:w-96 flex space-x-1 rounded-md shadow-sm bg-white py-1 px-2 dark:bg-gray-800">
            <Tab v-for="tab in tabs" as="template" :key="tab.id" v-slot="{ selected }">
              <button
                :class="[
                  'w-full rounded-md py-2 text-sm font-medium leading-5 text-black',
                  'ring-white ',
                  selected
                    ? 'bg-gray-700 text-white shadow dark:bg-gray-100 dark:text-gray-700'
                    : 'dark:text-white text-black hover:bg-gray-100 hover:dark:bg-gray-600',
                ]"
              >
                {{ tab.label }}
              </button>
            </Tab>
          </TabList>
          <div
            class="mb-2 md:mb-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <HeadlessMenu :links="actionMenu" />
          </div>
        </div>

        <TabPanels class="mt-2 w-full bg-white py-4 px-6 rounded-md dark:bg-gray-800 dark:text-white shadow-sm">
          <div class="text-2xl font-medium mb-4 flex flex-row justify-between">
            <span class="py-2">{{ tabs[activeTab].label }}</span>
            <div v-if="isEdit" class="flex flex-row space-x-2">
              <button
                @click="cancelEdit"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <XMarkIcon class="h-4 w-4 mr-2" />

                Cancel
              </button>
              <button
                :disabled="!canSubmit"
                :class="!canSubmit ? 'cursor-not-allowed' : 'duration-300 hover:scale-105 transition'"
                @click="update"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <FolderArrowDownIcon class="h-4 w-4 mr-2" />

                Update
              </button>
            </div>
          </div>
          <hr class="py-2" />
          <TabPanel>
            <div class="max-w-lg" autosave="off" aria-autocomplete="off" autocomplete="off">
              <div class="relative z-0 w-full mb-6 group">
                <input
                  v-model="customerStore.singleResponses.name"
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
                  v-model="customerStore.singleResponses.phone_number"
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
                  >Customer Phone Number / WhatsApp <span class="text-red-500">*</span></label
                >
              </div>

              <div class="relative z-0 w-full mb-6 group">
                <input
                  v-model="customerStore.singleResponses.email"
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
                  v-model="customerStore.singleResponses.type"
                  required
                  name="customer_type"
                  id="customer_type"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option class="dark:bg-gray-700" value="" disabled selected>Customer Type</option>
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
                  v-model="customerStore.singleResponses.address"
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
                        v-model="customerStore.singleResponses.postalcode"
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
                    v-model="customerStore.singleResponses.urban"
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
                    v-model="customerStore.singleResponses.subdistrict"
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
                    v-model="customerStore.singleResponses.city"
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
          </TabPanel>
          <TabPanel> </TabPanel>
          <TabPanel> </TabPanel>

          <hr class="mt-4 py-2" />
          <small class="italic text-right block"
            >Last edit
            {{ moment(customerStore.singleResponses.updated_at).format('DD MMMM YYYY H:mm:ss') }}
          </small>
        </TabPanels>
      </TabGroup>
    </template>
    <template v-else-if="customerStore.isLoading">
      <div class="my-auto mx-auto">
        <CircleLoading> Fetching data ... </CircleLoading>
      </div>
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-green-600 dark:text-green-500">Opss!!</h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Data yang diminta tidak ada.</p>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <LoadingModal :show="customerStore.isUpdateLoading">Processing ..</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="customerStore.isTransactionSuccess" :type="'success'"
        ><template #message> Update success </template>
        <template #buttonText>
          <button
            @click="closeModal"
            type="button"
            class="hover:scale-110 duration-300 ease-in-out transform py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900"
          >
            Tutup
          </button>
        </template>
      </SuccessModal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, inject, nextTick, onMounted, ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import HeadlessMenu from '../../components/menu/HeadlessMenu.vue'
import { useTaxDetailStore } from '../../stores/taxDetail'
import { ArchiveBoxIcon, FolderArrowDownIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import LoadingModal from '../../components/modal/LoadingModal.vue'
import SuccessModal from '../../components/modal/SuccessModal.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import CircleLoading from '../../components/loading/CircleLoading.vue'
import { useCustomerStore } from '../../stores/customer'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const swal = inject('$swal')

const customerStore = useCustomerStore()

const activeTab = ref(0)
const isEdit = ref(false)
const tabs = ref([
  { id: 1, label: 'Info' },
  { id: 2, label: 'Buying Data' },
  { id: 3, label: 'Informasi Privasi' },
])
const actionMenu = [
  {
    function: editMode,
    label: 'Edit',
    icon: PencilSquareIcon,
  },

  {
    function: deleteData,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function changeTab(index) {
  activeTab.value = index
}
function closeModal() {
  isEdit.value = !isEdit.value
  customerStore.isTransactionSuccess = false
}
function editMode() {
  isEdit.value = true
}
function cancelEdit() {
  customerStore.copyOriginalSingleResponses()
  isEdit.value = !isEdit.value
}
function deleteData(item) {
  swal.fire({
    title: 'Hapus?',
    text: 'Data tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Cancel!',
    showLoaderOnConfirm: true,
    reverseButtons: true,
    preConfirm: async () => {
      await customerStore.destroy(customerStore.singleResponses.id, false)
      router.push({ name: 'list-product' })
    },
    allowOutsideClick: () => !customerStore.isDestroyLoading,
    backdrop: true,
  })
}
function update() {
  if (canSubmit.value) {
    customerStore.update(false)
  } else {
    toast.error('Incomplete Product Information', {
      timeout: 2000,
      position: 'top-center',
    })
  }
}

const canSubmit = computed(() => {
  const item = customerStore.singleResponses
  if (item.name == null || item.name === '' || item.category_id == null || item.category_id === '' || item.unit_id == null || item.unit_id === 0) {
    return false
  }
  return true
})

const uuid = computed(() => {
  return route.params.uuid ?? null
})

onMounted(async () => {
  if (customerStore.singleResponses == null) {
    await customerStore.showData(uuid.value)
  }
})
</script>
