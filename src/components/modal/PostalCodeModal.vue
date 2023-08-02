<template>
  <Transition name="modal">
    <div>
      <div
        v-if="show"
        class="h-96 fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-modal modal-mask"
      >
        <div class="relative p-4">
          <!-- Modal content -->
          <div
            class="relative p-4 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Kode Pos
              </h3>
              <button
                @click="close"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->

            <div class="flex flex-col space-y-6">
              <div class="w-full">
                <input
                  v-model="postalCodeStore.searchName"
                  @input="onInput"
                  @keyup.enter="onEnter"
                  type="text"
                  class="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Cari kode pos/kecamatan/kelurahan"
                />
              </div>
              <div class="overflow-x-auto max-h-60">
                <table
                  class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
                  >
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        Kode Pos
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        Kelurahan
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        Kecamatan
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        Kota
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 border border-slate-400 dark:border-slate-600"
                      >
                        Provinsi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="postalCodeStore.isLoading">
                      <td colspan="11" class="text-center py-6">
                        <CircleLoading>Prosesing ... </CircleLoading>
                      </td>
                    </tr>
                    <tr
                      v-else-if="
                        !postalCodeStore.isLoading &&
                        postalCodeStore.items.length < 1
                      "
                    >
                      <td colspan="11" class="text-center py-6">
                        Cari data pada kolom pencarian
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in postalCodeStore.items"
                      :key="item.id"
                      class="border-b dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900"
                      @click="submit(item)"
                    >
                      <td class="px-4 py-3">{{ ++index }}</td>
                      <td class="px-4 py-3">{{ item.postalcode }}</td>
                      <td class="px-4 py-3">{{ item.urban }}</td>
                      <td class="px-4 py-3">{{ item.subdistrict }}</td>
                      <td class="px-4 py-3">{{ item.city }}</td>
                      <td class="px-4 py-3">{{ item.province }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span
                class="text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                <span class="font-semibold text-gray-900 dark:text-white"
                  >{{ postalCodeStore.items.length }} data found</span
                >
              </span>
              <!-- <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span class="font-semibold text-gray-900 dark:text-white">{{ postalCodeStore.from }} - {{ postalCodeStore.to }}</span>
                  of
                  <span class="font-semibold text-gray-900 dark:text-white">{{ postalCodeStore.total }}</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                  <li>
                    <a
                      @click="postalCodeStore.getData(previousPage)"
                      :disabled="postalCodeStore.currentPage == 1 ? true : false"
                      :class="
                        postalCodeStore.currentPage == 1
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                      "
                      class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      >Previous</a
                    >
                  </li>

                  <li>
                    <a
                      @click="postalCodeStore.getData(nextPage)"
                      :disabled="postalCodeStore.lastPage == postalCodeStore.currentPage ? true : false"
                      :class="
                        postalCodeStore.lastPage == postalCodeStore.currentPage
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                      "
                      class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      >Next</a
                    >
                  </li>
                </ul>
              </nav> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostalCodeStore } from '../../stores/postalCode'
import CircleLoading from '../../components/loading/CircleLoading.vue'

import { useDebounceFn } from '@vueuse/core'

const onInput = useDebounceFn(() => {
  postalCodeStore.getData()
}, 1000)

function onEnter() {
  postalCodeStore.getData()
}

const props = defineProps({
  show: Boolean,
  itemName: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'setItem', 'submit'])

function close() {
  postalCodeStore.$patch((state) => {
    state.responses = {}
    state.searchName = ''
  })
  emit('close')
}

function submit(item) {
  emit('submit', item)
  close()
}

const postalCodeStore = usePostalCodeStore()
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

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
