<template>
  <TableComplex
    v-model:search-query="itemStore.searchName"
    :columns="column"
    :is-loading="itemStore.isLoading"
    :data="formattedTableData"
    :pagginate="pagginate"
    :item-store="itemStore"
    v-model:current-limit="itemStore.currentLimit"
    @next-page="itemStore.getData(nextPage)"
    @previous-page="itemStore.getData(previousPage)"
    @on-enter="itemStore.getData()"
  >
    <template #action="{ id }">
      <div class="flex space-x-3">
        <a
          @click="invoice(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-red-500 hover:-translate-y-2 duration-300 ease-in-out"
          ><MagnifyingGlassIcon class="h-7 w-7"
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
    <template #extendButton>
      <button
        :disabled="showCreateDrawer"
        :class="
          showCreateDrawer ? '' : 'hover:translate-x-2 duration-300 ease-in-out'
        "
        @click="newProduct()"
        type="button"
        class="shadow-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Tambah Product
      </button>
    </template>
  </TableComplex>

  <CreateDrawer :show="showCreateDrawer" @close="showCreateDrawer = false" />
  <EditDrawer :show="showEditDrawer" @close="showEditDrawer = false" />
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { onMounted, computed, onUnmounted, ref, nextTick, inject } from 'vue'
import TableComplex from '../../components/table/TableComplex.vue'
import { useItemStore } from '../../stores/items'
import { useItemBrandStore } from '../../stores/itemBrand'
import { useItemUnitStore } from '../../stores/itemUnit'

import CreateDrawer from './drawer/CreateDrawer.vue'
import EditDrawer from './drawer/EditDrawer.vue'

const column = [
  { key: 'id', label: 'No', type: 'id' },
  { key: 'name', label: 'Nama Produk', class: 'uppercase' },
  { key: 'brand_name', label: 'Merek', class: 'uppercase' },
  { key: 'unit_name', label: 'Satuan', class: 'uppercase' },
  { key: 'price', label: 'Harga Terakhir', type: 'currency' },
  { key: 'balance', label: 'Saldo', type: 'number' },
  { key: 'action', label: 'Action' },
]
const swal = inject('$swal')
const itemStore = useItemStore()
const itemBrandStore = useItemBrandStore()
const itemUnitStore = useItemUnitStore()

const showCreateDrawer = ref(false)
const showEditDrawer = ref(false)

const pagginate = computed(() => {
  return {
    from: itemStore.from ?? 0,
    to: itemStore.to ?? 0,
    total: itemStore.total ?? 0,
  }
})
const formattedTableData = computed(() => {
  return itemStore.items?.map((item) => {
    return {
      id: item.id,
      brand_name: item.brand?.name ?? '',
      unit_name: item.unit?.name ?? '',
      name: item.name ?? '',
      price: item.price ? item.price.price : 0,
      balance: item.balance ?? 0,
    }
  })
})

const previousPage = computed(() => {
  return '&page=' + (itemStore.currentPage - 1)
})

const nextPage = computed(() => {
  return '&page=' + (itemStore.currentPage + 1)
})

itemStore.$subscribe((mutation, state) => {
  if (mutation.events.key == 'currentLimit') {
    itemStore.getData()
  }
})

async function edit(id) {
  if (!itemBrandStore.items) itemBrandStore.getData()
  if (!itemUnitStore.items) itemUnitStore.getData()
  await nextTick()
  let data = itemStore.items.find((x) => x.id == id)
  itemStore.editCurrentData = data
  await nextTick()
  showEditDrawer.value = true
}

async function newProduct() {
  if (!itemBrandStore.items) itemBrandStore.getData()
  if (!itemUnitStore.items) itemUnitStore.getData()
  await nextTick()
  showCreateDrawer.value = true
}

function deleteData(id) {
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
      await itemStore.destroy(id)
    },
    allowOutsideClick: () => !itemStore.isDestroyLoading,
    backdrop: true,
  })
}

onMounted(() => {
  itemStore.getData()
})

onUnmounted(() => {
  itemStore.$reset()
})
</script>
