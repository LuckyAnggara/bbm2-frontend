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
    <template #action="{ id }">
      <div class="flex space-x-3">
        <a @click="edit(id)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-black duration-300 ease-in-out"
          ><PencilSquareIcon class="h-7 w-7"
        /></a>

        <a @click="edit(id)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:dark:text-white hover:text-black duration-300 ease-in-out"
          ><TrashIcon class="h-7 w-7"
        /></a>
      </div>
    </template>
  </TableComplex>
</template>

<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed, onUnmounted, onBeforeMount } from 'vue'
import TableComplex from '../../components/table/TableComplex.vue'
import { useSalesStore } from '../../stores/sales'

const column = [
  { key: 'id', label: 'No', type: 'number', type: 'id' },
  { key: 'created_at', label: 'Tanggal', class: 'uppercase', type: 'date' },
  { key: 'invoice', label: 'Invoice', class: 'uppercase' },
  { key: 'customer_name', label: 'Nama Pelanggan', class: 'uppercase' },
  { key: 'grand_total', label: 'Total', class: 'uppercase', type: 'currency' },
  { key: 'maker_name', label: 'Maker' },
  { key: 'action', label: 'Action' },
]

const salesStore = useSalesStore()

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

function edit(id) {
  alert(id)
}

onBeforeMount(() => {
  salesStore.getData()
})

onUnmounted(() => {
  salesStore.$reset()
})
</script>
