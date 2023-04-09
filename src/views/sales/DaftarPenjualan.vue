<template>
  <TableComplex
    v-model:search-query="salesStore.searchName"
    :columns="column"
    :is-loading="salesStore.isLoading"
    :data="formattedTableData"
    :pagginate="pagginate"
    :item-store="salesStore"
    :use-filter="true"
    v-model:current-limit="salesStore.currentLimit"
    @next-page="salesStore.getData(nextPage)"
    @previous-page="salesStore.getData(previousPage)"
    @on-enter="salesStore.getData()"
  >
    <template #action="{ id, status }">
      <!-- <div>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
            >
              <EllipsisVerticalIcon
                class="h-5 w-5 text-black dark:text-white"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Edit {{ id }}
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Duplicate
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div> -->
      <div class="flex space-x-3">
        <a
          @click="invoice(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
          ><DocumentTextIcon class="h-7 w-7"
        /></a>

        <a
          v-if="status == 'KREDIT'"
          @click="invoice(id)"
          class="cursor-pointer font-medium text-green-600 dark:text-green-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
          ><CreditCardIcon class="h-7 w-7"
        /></a>

        <a
          @click="edit(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
          ><PencilSquareIcon class="h-7 w-7"
        /></a>

        <a
          @click="deleteData(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
          ><TrashIcon class="h-7 w-7"
        /></a>
      </div>
    </template>

    <template #status="{ label }">
      <span
        v-if="label == 'LUNAS'"
        class="bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white"
        >{{ label }}</span
      >
      <span
        v-else
        class="bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white"
        >{{ label }}</span
      >
    </template>
  </TableComplex>

  <DetailPenjualanDrawer :show="showDrawer" />

  <!--Confirmation Modal -->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ConfirmationModal
      :show="showConfirmationModal"
      @close="showConfirmationModal = false"
      @submit="destroyData"
      @cancel="showConfirmationModal = false"
    >
      <template #title>Hapus data ?</template>
      <template #submit>Hapus !</template>
      <template #cancel>Cancel</template>
    </ConfirmationModal>
  </Teleport>

  <!-- Loading Modal -->
  <Teleport to="body">
    <LoadingModal :show="salesStore.isDestroyLoading"
      >Processing transaction</LoadingModal
    >
  </Teleport>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  CreditCardIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'
import {
  computed,
  onUnmounted,
  onBeforeMount,
  defineAsyncComponent,
  ref,
  nextTick,
} from 'vue'
import { useRouter } from 'vue-router'
import TableComplex from '../../components/table/TableComplex.vue'
import { useSalesStore } from '../../stores/sales'

const ConfirmationModal = defineAsyncComponent(() =>
  import('../../components/modal/ConfirmationModal.vue')
)
const DetailPenjualanDrawer = defineAsyncComponent(() =>
  import('./drawer/DetailPenjualanDrawer.vue')
)
const LoadingModal = defineAsyncComponent(() =>
  import('../../components/modal/LoadingModal.vue')
)

const router = useRouter()
const salesStore = useSalesStore()
const deleteId = ref(null)

const showDrawer = ref(false)

const column = [
  { key: 'id', label: 'No', type: 'number', type: 'id' },
  { key: 'created_at', label: 'Tanggal', class: 'uppercase', type: 'date' },
  { key: 'invoice', label: 'Invoice', class: 'uppercase' },
  { key: 'customer_name', label: 'Nama Pelanggan', class: 'uppercase' },
  { key: 'grand_total', label: 'Total', class: 'uppercase', type: 'currency' },
  { key: 'status', label: 'Status', type: 'slot' },
  { key: 'maker_name', label: 'Maker' },
  { key: 'action', label: 'Action' },
]

const showConfirmationModal = ref(false)

const pagginate = computed(() => {
  return {
    from: salesStore.from ?? 0,
    to: salesStore.to ?? 0,
    total: salesStore.total ?? 0,
  }
})
const formattedTableData = computed(() => {
  return salesStore.items?.map((item) => {
    return {
      id: item.id,
      invoice: item.invoice,
      created_at: item.created_at,
      customer_name: item.customer?.name ?? '',
      maker_name: item.maker?.name ?? '',
      status: item.receivable ? 'KREDIT' : 'LUNAS',
      grand_total: item.grand_total ?? 0,
    }
  })
})

const previousPage = computed(() => {
  return '&page=' + (salesStore.currentPage - 1)
})

const nextPage = computed(() => {
  return '&page=' + (salesStore.currentPage + 1)
})

salesStore.$subscribe((mutation, state) => {
  if (mutation.events.key == 'currentLimit') {
    salesStore.getData()
  }
})

function deleteData(id) {
  deleteId.value = id
  showConfirmationModal.value = true
}

function edit(id) {}

async function destroyData(id) {
  showConfirmationModal.value = false
  await nextTick()
  await salesStore.destroyData(deleteId.value) // memanggil action deleteData pada store
}

function invoice(id) {
  router.push({ name: 'invoice', params: { id } })
}

onBeforeMount(() => {
  salesStore.getData()
})

onUnmounted(() => {
  salesStore.$reset()
})
</script>
