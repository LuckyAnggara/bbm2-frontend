<template>
  <div class="min-w-lg px-2 sm:px-0">
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
          <button
            :disabled="!canSubmit"
            :class="!canSubmit ? 'cursor-not-allowed' : 'duration-300 hover:scale-105 transition'"
            @click="store"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <FolderArrowDownIcon class="h-4 w-4 mr-2" />

            Simpan
          </button>
        </div>
        <hr class="py-4" />
        <TabPanel>
          <div class="max-w-lg" autocomplete="off">
            <div class="grid gap-2 sm:grid-cols-2 sm:gap-4 duration-300 ease-in-out transition-all">
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name <span class="text-red-500">*</span></label>
                <input
                  v-model="itemStore.currentData.name"
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter product name"
                />
              </div>
              <div class="sm:col-span-2">
                <label for="kode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode / SKU</label>
                <input
                  v-model="itemStore.currentData.sku"
                  type="text"
                  id="kode"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Auto"
                />
              </div>
              <div class="sm:col-span-2">
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                <input
                  v-model="itemStore.currentData.brand"
                  type="text"
                  id="brand"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter product brand"
                />
              </div>
              <div class="sm:col-span-2">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-500">*</span></label>
                <DotLoading v-if="itemCategoryStore.isLoading" />
                <div v-else class="flex flex-row space-x-2">
                  <select
                    v-model="itemStore.currentData.category_id"
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option v-for="item in itemCategoryStore.items" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="showModalAddCategory = true"
                    class="hover:scale-110 duration-300 ease-in-out text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <PlusIcon class="h-5" />
                  </button>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit <span class="text-red-500">*</span></label>
                <DotLoading v-if="itemUnitStore.isLoading" />
                <div v-else class="flex flex-row space-x-2">
                  <select
                    v-model="itemStore.currentData.unit_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="0" disabled>Pilih satuan product</option>
                    <option v-for="item in itemUnitStore.items" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="showModalAddUnit = true"
                    class="hover:scale-110 duration-300 ease-in-out text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <PlusIcon class="h-5" />
                  </button>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  v-model="itemStore.currentData.description"
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <!-- 
                <div class="sm:col-span-2">
                  <label
                    for="image"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Image</label
                  >
                  <FileUpload
                    v-model="itemStore.currentData.image"
                    :id="'image'"
                  />
                </div> -->
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="max-w-lg" autocomplete="off">
            <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div class="flex flex-col space-y-4 sm:col-span-2">
                <div>
                  <input
                    v-model="itemStore.currentData.iBuy"
                    id="beli-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="beli-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saya Beli Product Ini</label>
                </div>
                <div v-if="itemStore.currentData.iBuy" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4">
                  <div class="md:col-span-2">
                    <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Beli Satuan</label>
                    <InputCurrency
                      v-model="itemStore.currentData.buying_price"
                      id="beli-satuan"
                      :options="{ currency: 'IDR' }"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rp. 0"
                    />
                  </div>
                  <div>
                    <label for="beli-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pajak Beli</label>
                    <DotLoading v-if="taxStore.isLoading" />
                    <select
                      v-model="itemStore.currentData.buying_tax_id"
                      v-else
                      id="beli-pajak"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option v-for="item in taxStore.items" :key="item.id" :value="item.id">{{ item.name }} ({{ item.value * 100 }}%)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-4 sm:col-span-2">
                <div>
                  <input
                    v-model="itemStore.currentData.iSell"
                    id="jual-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="jual-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saya Jual Product Ini</label>
                </div>
                <div v-if="itemStore.currentData.iSell" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4">
                  <div class="md:col-span-2">
                    <label for="jual-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Jual Satuan</label>
                    <InputCurrency
                      v-model="itemStore.currentData.selling_price"
                      id="jual-satuan"
                      :options="{ currency: 'IDR' }"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rp. 0"
                    />
                  </div>
                  <div>
                    <label for="jual-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pajak Jual</label>
                    <DotLoading v-if="taxStore.isLoading" />

                    <select
                      v-else
                      v-model="itemStore.currentData.selling_tax_id"
                      id="jual-pajak"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option v-for="item in taxStore.items" :key="item.id" :value="item.id">{{ item.name }} ({{ item.value * 100 }}%)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- PERSEDIAAN AWAL -->

              <div class="flex flex-col space-y-4 sm:col-span-2">
                <div>
                  <input
                    v-model="itemStore.currentData.beginningStock.value"
                    id="persediaan-awal"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="persediaan-awal" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Atur persediaan awal</label>
                </div>
                <div v-if="itemStore.currentData.beginningStock.value" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-5 sm:gap-4">
                  <div>
                    <label for="persediaan-awal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input
                      v-model="itemStore.currentData.beginningStock.stock"
                      type="text"
                      id="persediaan-awal"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label for="persediaan-price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Perolehan</label>
                    <InputCurrency
                      v-model="itemStore.currentData.beginningStock.price"
                      id="persediaan-price"
                      :options="{ currency: 'IDR' }"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rp. 0"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label for="persediaan-total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input
                      disabled
                      :value="IDRCurrency.format(itemStore.totalBeginningStock)"
                      type="text"
                      id="persediaan-total"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="max-w-lg" autocomplete="off">
            <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div class="flex flex-col space-y-4 sm:col-span-2">
                <div>
                  <input
                    v-model="itemStore.currentData.notification_qty"
                    id="jual-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="jual-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Notifikasi batas minimum</label>
                </div>
                <div v-if="itemStore.currentData.notification_qty" class="duration-300 ease-in-out transition-all">
                  <div>
                    <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batas minimum</label>
                    <input
                      type="text"
                      id="jual-satuan"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Batas minimum persediaan"
                      v-model="itemStore.currentData.qty_minimum"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <Teleport to="body">
      <NewUnitModal :show="showModalAddUnit" @close="showModalAddUnit = false"> </NewUnitModal>
    </Teleport>

    <Teleport to="body">
      <NewCategoryModal :show="showModalAddCategory" @close="showModalAddCategory = false"> </NewCategoryModal>
    </Teleport>
    <Teleport to="body">
      <LoadingModal :show="itemStore.isStoreLoading">Processing ...</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="itemStore.isTransactionSuccess" :type="'success'"
        ><template #message> Product successfull created </template>
        <template #buttonText>
          <button
            @click="toProductPage"
            type="button"
            class="hover:scale-110 duration-300 ease-in-out transform py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Tutup
          </button>
        </template>
      </SuccessModal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, nextTick, onMounted, ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import FileUpload from '../../components/FileUpload.vue'
import HeadlessMenu from '../../components/menu/HeadlessMenu.vue'
import { useTaxDetailStore } from '../../stores/taxDetail'
import { useItemUnitStore } from '../../stores/itemUnit'
import { useItemStore } from '../../stores/items'
import { FolderArrowDownIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import DotLoading from '../../components/loading/DotLoading.vue'
import { useItemCategoryStore } from '../../stores/itemCategory'

import InputCurrency from '../../components/input/InputCurrency.vue'
import { IDRCurrency } from '../../utilities/formatter'
import LoadingModal from '../../components/modal/LoadingModal.vue'
import SuccessModal from '../../components/modal/SuccessModal.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const NewUnitModal = defineAsyncComponent(() => import('./modal/UnitModal.vue'))
const NewCategoryModal = defineAsyncComponent(() => import('./modal/CategoryModal.vue'))

const taxStore = useTaxDetailStore()
const itemStore = useItemStore()
const itemUnitStore = useItemUnitStore()
const itemCategoryStore = useItemCategoryStore()

const showModalAddUnit = ref(false)
const showModalAddCategory = ref(false)
const activeTab = ref(0)

function changeTab(index) {
  activeTab.value = index
}

const tabs = ref([
  { id: 1, label: 'Info' },
  { id: 2, label: 'Price & Stock' },
  { id: 3, label: 'Setting' },
])

const actionMenu = [
  {
    function: itemStore.clearData,
    label: 'Clear',
    icon: XMarkIcon,
  },
]

async function toProductPage() {
  itemStore.isTransactionSuccess = false
  await nextTick()
  router.push({ name: 'list-product' })
}

function store() {
  if (canSubmit.value) {
    itemStore.store()
  } else {
    toast.error('Incomplete Product Information', {
      timeout: 2000,
      position: 'top-center',
    })
  }
}

const canSubmit = computed(() => {
  const item = itemStore.currentData
  if (item.name == null || item.name === '' || item.category_id == null || item.category_id === '' || item.unit_id == null || item.unit_id === 0) {
    return false
  }

  return true
})

onMounted(() => {
  taxStore.getData()
  itemUnitStore.getData()
  itemCategoryStore.getData()
})
</script>
