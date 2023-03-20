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
          @click="edit(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-black duration-300 ease-in-out"
          ><PencilSquareIcon class="h-7 w-7"
        /></a>

        <a
          @click="edit(id)"
          class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-black duration-300 ease-in-out"
          ><TrashIcon class="h-7 w-7"
        /></a>
      </div>
    </template>
  </TableComplex>
</template>

<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { onMounted, computed, onUnmounted } from 'vue'
import TableComplex from '../../components/table/TableComplex.vue'
import { useItemStore } from '../../stores/persediaan'

const column = [
  { key: 'id', label: 'No' },
  { key: 'name', label: 'Nama Produk', class: 'uppercase' },
  { key: 'brand_name', label: 'Merek', class: 'uppercase' },
  { key: 'unit_name', label: 'Satuan', class: 'uppercase' },
  { key: 'balance', label: 'Saldo' },
  { key: 'action', label: 'Action' },
]

const itemStore = useItemStore()

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

function edit(id) {
  alert(id)
}

onMounted(() => {
  itemStore.getData()
})

onUnmounted(() => {
  itemStore.$reset()
})
</script>
