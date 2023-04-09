<template>
  <div class="w-full flex flex-col justify-center">
    <template v-if="salesStore.singleResponses">
      <div class="flex">
        <div class="w-1/3 h-96">
          <form>
            <div
              class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6"
            >
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                Detail
              </h5>
              <hr class="my-5" />
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Invoice</label
                >
                <input
                  :value="salesStore.singleResponses.invoice"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Nama Pelanggan</label
                >
                <input
                  :value="salesStore.singleResponses.customer.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Nomor Telepon</label
                >
                <input
                  :value="salesStore.singleResponses.customer.phone_number"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Alamat</label
                >
                <textarea
                  :value="salesStore.singleResponses.customer.address"
                  disabled
                  rows="3"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                ></textarea>
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Grand Total</label
                >
                <input
                  :value="
                    IDRCurrency.format(salesStore.singleResponses.grand_total)
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Total Pembayaran</label
                >
                <input
                  :value="
                    IDRCurrency.format(
                      salesStore.singleResponses.total_payment ?? 0
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Sisa Kredit</label
                >
                <input
                  :value="
                    IDRCurrency.format(
                      salesStore.singleResponses.remaining_receivable
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label
                  for="email"
                  class="block mb-2 font-medium text-gray-900 dark:text-white"
                  >Jatuh Tempo</label
                >
                <input
                  :value="
                    moment(salesStore.singleResponses.due_date).format(
                      'DD MMMM YYYY'
                    )
                  "
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
            </div>
          </form>
        </div>
        <div
          class="bg-white shadow-md dark:bg-gray-800 w-2/3 ml-10 rounded-lg px-6 py-6"
        >
          <div class="justify-between flex">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Rincian Pembayaran
            </h5>
            <button
              type="button"
              class="hover:translate-x-2 duration-300 ease-in-out flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <PlusIcon class="w-5 h-5 mr-1" />

              Tambah Pembayaran
            </button>
          </div>

          <hr class="my-5" />
          <TableComplex
            :columns="column"
            :is-loading="salesStore.isLoading"
            :data="formattedTableData"
            :use-filter="false"
            :use-search="false"
            :use-limit="false"
            :use-pagginate="false"
          >
            <template #action="{ id }">
              <div class="flex space-x-3">
                <a
                  @click="deleteData(id)"
                  class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
                  ><TrashIcon class="h-7 w-7"
                /></a>
              </div>
            </template>
          </TableComplex>
        </div>
      </div>
    </template>

    <template v-else-if="salesStore.isLoading">
      <CircleLoading class="my-auto mx-auto" />
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1
              class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500"
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

  <div class="text-center m-5">
    <button
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      type="button"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      Create product
    </button>
  </div>
</template>

<script setup>
import { TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { computed, ref, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IDRCurrency } from '../../utilities/formatter'
import TableComplex from '../../components/table/TableComplex.vue'
import { useSalesStore } from '../../stores/sales'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const route = useRoute()
const salesStore = useSalesStore()
const deleteId = ref(null)
const show = ref(false)

const column = [
  { key: 'id', label: 'No', type: 'number', type: 'id' },
  { key: 'created_at', label: 'Tanggal', class: 'uppercase', type: 'date' },
  { key: 'payment', label: 'Pembayaran', class: 'uppercase', type: 'currency' },
  { key: 'notes', label: 'Catatan', class: 'uppercase' },
  { key: 'action', label: 'Action' },
]

const formattedTableData = computed(() => {
  return salesStore.singleResponses?.payment?.map((item) => {
    return {
      id: item.id,
      payment: item.payment,
      created_at: item.created_at,
      notes: item.notes ?? '',
    }
  })
})

function deleteData(id) {
  deleteId.value = id
  showConfirmationModal.value = true
}

async function destroyData(id) {
  showConfirmationModal.value = false
  await nextTick()
  await salesStore.destroyData(deleteId.value) // memanggil action deleteData pada store
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(() => {
  console.info(id.value)
  if (salesStore.singleResponses == null) {
    salesStore.showData(id.value)
  }
})
</script>
