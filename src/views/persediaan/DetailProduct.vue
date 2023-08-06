<template>
  <div class="min-w-lg px-2 sm:px-0 justify-center flex flex-col">
    <template v-if="itemStore.singleResponses">
      <TabGroup>
        <div class="flex md:flex-row flex-col-reverse justify-between w-full">
          <TabList
            class="md:w-96 flex space-x-1 rounded-md shadow-sm bg-white py-1 px-2 dark:bg-gray-800"
          >
            <Tab
              v-for="tab in tabs"
              as="template"
              :key="tab.id"
              v-slot="{ selected }"
            >
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
            ><div
              class="w-full bg-white py-4 px-6 rounded-md dark:bg-gray-800 dark:text-white shadow-sm"
            >
              <div
                class="text-2xl font-medium mb-4 flex flex-row justify-between"
              >
                <span>Info Product</span>
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
              </div>
              <hr class="py-4" />
              <form action="#" class="max-w-lg" autocomplete="off">
                <div
                  class="grid gap-2 sm:grid-cols-2 sm:gap-4 duration-300 ease-in-out transition-all"
                >
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Product Name <span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="itemStore.singleResponses.name"
                      type="text"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="kode"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Kode / SKU</label
                    >
                    <input
                      v-model="itemStore.singleResponses.sku"
                      type="text"
                      id="kode"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Auto"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Brand</label
                    >
                    <input
                      v-model="itemStore.singleResponses.brand"
                      type="text"
                      id="brand"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter product brand"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Category <span class="text-red-500">*</span></label
                    >
                    <DotLoading v-if="itemCategoryStore.isLoading" />
                    <div v-else class="flex flex-row space-x-2">
                      <select
                        v-model="itemStore.singleResponses.category_id"
                        id="category"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option
                          v-for="item in itemCategoryStore.items"
                          :key="item.id"
                          :value="item.id"
                        >
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
                    <label
                      for="unit"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Unit <span class="text-red-500">*</span></label
                    >
                    <DotLoading v-if="itemUnitStore.isLoading" />
                    <div v-else class="flex flex-row space-x-2">
                      <select
                        v-model="itemStore.singleResponses.unit_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="0" disabled>Pilih satuan product</option>
                        <option
                          v-for="item in itemUnitStore.items"
                          :key="item.id"
                          :value="item.id"
                        >
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
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Description</label
                    >
                    <textarea
                      v-model="itemStore.singleResponses.description"
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
              </form>
            </div>
          </TabPanel>
          <TabPanel
            ><div
              class="w-full bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white shadow-sm"
            >
              <div class="text-2xl font-medium mb-4">
                <span>Price & Stock</span>
              </div>
              <hr class="py-4" />
              <form class="max-w-lg" autocomplete="off">
                <div
                  class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4"
                >
                  <div class="flex flex-col space-y-4 sm:col-span-2">
                    <div>
                      <input
                        v-model="itemStore.currentData.iBuy"
                        id="beli-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="beli-checkbox"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Saya Beli Product Ini</label
                      >
                    </div>
                    <div
                      v-if="itemStore.currentData.iBuy"
                      class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4"
                    >
                      <div class="md:col-span-2">
                        <label
                          for="beli-satuan"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Harga Beli Satuan</label
                        >
                        <InputCurrency
                          v-model="itemStore.currentData.buying_price"
                          id="beli-satuan"
                          :options="{ currency: 'IDR' }"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Rp. 0"
                        />
                      </div>
                      <div>
                        <label
                          for="beli-pajak"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Pajak Beli</label
                        >
                        <DotLoading v-if="taxStore.isLoading" />
                        <select
                          v-model="itemStore.currentData.buying_tax_id"
                          v-else
                          id="beli-pajak"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option
                            v-for="item in taxStore.items"
                            :key="item.id"
                            :value="item.id"
                          >
                            {{ item.name }} ({{ item.value * 100 }}%)
                          </option>
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
                      <label
                        for="jual-checkbox"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Saya Jual Product Ini</label
                      >
                    </div>
                    <div
                      v-if="itemStore.currentData.iSell"
                      class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-3 sm:gap-4"
                    >
                      <div class="md:col-span-2">
                        <label
                          for="jual-satuan"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Harga Jual Satuan</label
                        >
                        <InputCurrency
                          v-model="itemStore.currentData.selling_price"
                          id="jual-satuan"
                          :options="{ currency: 'IDR' }"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Rp. 0"
                        />
                      </div>
                      <div>
                        <label
                          for="jual-pajak"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Pajak Jual</label
                        >
                        <DotLoading v-if="taxStore.isLoading" />

                        <select
                          v-else
                          v-model="itemStore.currentData.selling_tax_id"
                          id="jual-pajak"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option
                            v-for="item in taxStore.items"
                            :key="item.id"
                            :value="item.id"
                          >
                            {{ item.name }} ({{ item.value * 100 }}%)
                          </option>
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
                      <label
                        for="persediaan-awal"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Atur persediaan awal</label
                      >
                    </div>
                    <div
                      v-if="itemStore.currentData.beginningStock.value"
                      class="duration-300 ease-in-out transition-all grid gap-2 sm:grid-cols-5 sm:gap-4"
                    >
                      <div>
                        <label
                          for="persediaan-awal"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Stock</label
                        >
                        <input
                          v-model="itemStore.currentData.beginningStock.stock"
                          type="text"
                          id="persediaan-awal"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="0"
                        />
                      </div>
                      <div class="md:col-span-2">
                        <label
                          for="persediaan-price"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Harga Perolehan</label
                        >
                        <InputCurrency
                          v-model="itemStore.currentData.beginningStock.price"
                          id="persediaan-price"
                          :options="{ currency: 'IDR' }"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Rp. 0"
                        />
                      </div>
                      <div class="md:col-span-2">
                        <label
                          for="persediaan-total"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Total</label
                        >
                        <input
                          disabled
                          :value="
                            IDRCurrency.format(itemStore.totalBeginningStock)
                          "
                          type="text"
                          id="persediaan-total"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div
              class="w-full bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white shadow-sm"
            >
              <div class="text-2xl font-medium mb-4">
                <span>Setting</span>
              </div>
              <hr class="py-4" />
              <form class="max-w-lg" autocomplete="off">
                <div
                  class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4"
                >
                  <div class="flex flex-col space-y-4 sm:col-span-2">
                    <div>
                      <input
                        v-model="itemStore.currentData.notification_qty"
                        id="jual-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="jual-checkbox"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Notifikasi batas minimum</label
                      >
                    </div>
                    <div
                      v-if="itemStore.currentData.notification_qty"
                      class="duration-300 ease-in-out transition-all"
                    >
                      <div>
                        <label
                          for="beli-satuan"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Batas minimum</label
                        >
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
              </form>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <Teleport to="body">
        <NewUnitModal
          :show="showModalAddUnit"
          @close="showModalAddUnit = false"
        >
        </NewUnitModal>
      </Teleport>

      <Teleport to="body">
        <NewCategoryModal
          :show="showModalAddCategory"
          @close="showModalAddCategory = false"
        >
        </NewCategoryModal>
      </Teleport>
      <Teleport to="body">
        <LoadingModal :show="itemStore.isStoreLoading"
          >Processing ...</LoadingModal
        >
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
    </template>
    <template v-else-if="itemStore.isLoading">
      <div class="my-auto mx-auto">
        <CircleLoading> Fetching data ... </CircleLoading>
      </div>
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1
              class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-green-600 dark:text-green-500"
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
  </div>
</template>

<script setup>
import {
  computed,
  defineAsyncComponent,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import FileUpload from '../../components/FileUpload.vue'
import HeadlessMenu from '../../components/menu/HeadlessMenu.vue'
import { useTaxDetailStore } from '../../stores/taxDetail'
import { useItemUnitStore } from '../../stores/itemUnit'
import { useItemStore } from '../../stores/items'
import {
  ArchiveBoxIcon,
  FolderArrowDownIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import DotLoading from '../../components/loading/DotLoading.vue'
import { useItemCategoryStore } from '../../stores/itemCategory'

import InputCurrency from '../../components/input/InputCurrency.vue'
import { IDRCurrency } from '../../utilities/formatter'
import LoadingModal from '../../components/modal/LoadingModal.vue'
import SuccessModal from '../../components/modal/SuccessModal.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const swal = inject('$swal')

const NewUnitModal = defineAsyncComponent(() => import('./modal/UnitModal.vue'))
const NewCategoryModal = defineAsyncComponent(() =>
  import('./modal/CategoryModal.vue')
)

const taxStore = useTaxDetailStore()
const itemStore = useItemStore()
const itemUnitStore = useItemUnitStore()
const itemCategoryStore = useItemCategoryStore()

const showModalAddUnit = ref(false)
const showModalAddCategory = ref(false)

const isEdit = ref(false)

const tabs = ref([
  { id: 1, label: 'Info' },
  { id: 2, label: 'Price & Stock' },
  { id: 3, label: 'Setting' },
])

const actionMenu = [
  {
    function: editMode,
    label: 'Edit',
    icon: PencilSquareIcon,
  },
  {
    function: itemStore.clearData,
    label: 'Archive',
    icon: ArchiveBoxIcon,
  },
  {
    function: deleteData,
    label: 'Hapus',
    icon: TrashIcon,
  },
]
function editMode() {
  isEdit.value = true
}
function cancelEdit() {
  itemStore.copyOriginalSingleResponses()
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
      await itemStore.destroy(itemStore.singleResponses.id, false)
      router.push({ name: 'list-product' })
    },
    allowOutsideClick: () => !itemStore.isDestroyLoading,
    backdrop: true,
  })
}

const canSubmit = computed(() => {
  const item = itemStore.currentData
  if (
    item.name == null ||
    item.name === '' ||
    item.category_id == null ||
    item.category_id === '' ||
    item.unit_id == null ||
    item.unit_id === 0
  ) {
    return false
  }

  return true
})

const sku = computed(() => {
  return route.params.sku ?? null
})

onMounted(() => {
  taxStore.getData()
  itemUnitStore.getData()
  itemCategoryStore.getData()

  if (itemStore.singleResponses == null) {
    itemStore.showData(sku.value)
  }
})
</script>
