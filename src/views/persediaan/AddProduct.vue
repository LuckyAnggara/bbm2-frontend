<template>
  <div class="min-w-lg px-2 sm:px-0">
    <TabGroup>
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

      <TabPanels class="mt-2">
        <TabPanel
          ><div class="w-full bg-white py-4 px-6 rounded-md dark:bg-gray-800 dark:text-white shadow-sm">
            <div class="text-2xl font-medium mb-4">Info Product</div>
            <hr class="py-4" />
            <form action="#" class="max-w-lg" autocomplete="off">
              <div class="grid gap-2 sm:grid-cols-2 sm:gap-4 duration-300 ease-in-out transition-all">
                <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="kode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode / SKU</label>
                  <input
                    type="text"
                    id="kode"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                  <DotLoading v-if="itemUnitStore.isLoading" />
                  <div v-else class="flex flex-row space-x-2">
                    <select
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
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>

                <div class="sm:col-span-2">
                  <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                  <FileUpload :id="'image'" />
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel
          ><div class="w-full bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white shadow-sm">
            <div class="text-2xl font-medium mb-4">Price & Stock</div>
            <hr class="py-4" />
            <form class="max-w-lg">
              <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div class="flex flex-col space-y-4 sm:col-span-2">
                  <div>
                    <input
                      v-model="beli"
                      id="beli-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="beli-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saya Beli Product Ini</label>
                  </div>
                  <div v-if="beli" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4">
                    <div class="md:col-span-2">
                      <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Beli Satuan</label>
                      <input
                        type="text"
                        id="beli-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Rp. 0"
                      />
                    </div>
                    <div>
                      <label for="beli-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pajak Beli</label>
                      <DotLoading v-if="taxStore.isLoading" />
                      <select
                        v-else
                        id="beli-pajak"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option v-for="item in taxStore.items" :key="item.id" :value="item">{{ item.name }} ({{ item.value * 100 }}%)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col space-y-4 sm:col-span-2">
                  <div>
                    <input
                      v-model="jual"
                      id="jual-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="jual-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saya Jual Product Ini</label>
                  </div>
                  <div v-if="jual" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4">
                    <div class="md:col-span-2">
                      <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Jual Satuan</label>
                      <input
                        type="text"
                        id="jual-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Rp. 0"
                      />
                    </div>
                    <div>
                      <label for="jual-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pajak Jual</label>
                      <DotLoading v-if="taxStore.isLoading" />

                      <select
                        v-else
                        id="jual-pajak"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option v-for="item in taxStore.items" :key="item.id" :value="item">{{ item.name }} ({{ item.value * 100 }}%)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- PERSEDIAAN AWAL -->

                <div class="flex flex-col space-y-4 sm:col-span-2">
                  <div>
                    <input
                      v-model="persediaanAwal"
                      id="persediaan-awal"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="persediaan-awal" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Atur persediaan awal</label>
                  </div>
                  <div v-if="persediaanAwal" class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-5 sm:gap-4">
                    <div>
                      <label for="persediaan-awal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                      <input
                        type="text"
                        id="jual-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="0"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="persediaan-awal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Perolehan</label>
                      <input
                        type="text"
                        id="jual-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Rp. 0"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="persediaan-awal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                      <input
                        disabled
                        type="text"
                        id="jual-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Rp. 0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="w-full bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white shadow-sm">
            <div class="text-2xl font-medium mb-4">Setting</div>
            <hr class="py-4" />
            <form class="max-w-lg">
              <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div class="flex flex-col space-y-4 sm:col-span-2">
                  <div>
                    <input
                      v-model="minimumStock.isNotification"
                      id="jual-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="jual-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Notifikasi batas minimum</label>
                  </div>
                  <div v-if="minimumStock.isNotification" class="duration-300 ease-in-out transition-all">
                    <div>
                      <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batas minimum</label>
                      <input
                        type="text"
                        id="jual-satuan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Batas minimum persediaan"
                        v-model="minimumStock.value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <Teleport to="body">
      <NewUnitModal :show="showModalAddUnit" @close="showModalAddUnit = false"> </NewUnitModal>
    </Teleport>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import FileUpload from '../../components/FileUpload.vue'
import HeadlessMenu from '../../components/menu/HeadlessMenu.vue'
import { useTaxDetailStore } from '../../stores/taxDetail'
import { useItemUnitStore } from '../../stores/itemUnit'
import { FolderArrowDownIcon, PlusIcon } from '@heroicons/vue/24/outline'
import DotLoading from '../../components/loading/DotLoading.vue'

const NewUnitModal = defineAsyncComponent(() => import('./modal/unitmodal.vue'))

const taxStore = useTaxDetailStore()
const itemUnitStore = useItemUnitStore()

const showModalAddUnit = ref(false)

const tabs = ref([
  { id: 1, label: 'Info' },
  { id: 2, label: 'Price & Stock' },
  { id: 3, label: 'Setting' },
])

const actionMenu = [
  {
    function: function simpan() {},
    label: 'Simpan',
    icon: FolderArrowDownIcon,
  },
]

const beli = ref(true)
const jual = ref(true)
const persediaanAwal = ref(true)
const minimumStock = ref({
  isNotification: true,
  value: 0,
})

onMounted(() => {
  taxStore.getData()
  itemUnitStore.getData()
})
</script>
