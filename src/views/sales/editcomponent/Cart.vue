<template>
  <section class="w-full flex flex-col relative justify-between">
    <div class="flex items-center justify-between w-full mb-4">
      <button
        @click="emit('previous')"
        type="button"
        class="text-red-600 inline-flex items-center hover:text-white border hover:scale-105 ease-in-out duration-300 border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        <ArrowUturnLeftIcon class="h-5 w-5 mr-2" />

        Kembali
      </button>

      <button
        v-if="canSubmit"
        @click="emit('next')"
        type="button"
        class="text-blue-600 inline-flex items-center hover:text-white border hover:scale-105 ease-in-out duration-300 border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
      >
        Lanjut
        <PaperAirplaneIcon class="h-5 w-5 ml-2" />
      </button>
    </div>

    <div class="flex flex-col space-y-6">
      <div class="relative bg-white shadow-md dark:bg-gray-800 rounded-lg h-fit w-1/2">
        <Searchbar
          @cari-data="cariData()"
          v-model="itemStore.searchName"
          :is-loading="itemStore.isLoading"
          :result-items="itemStore.items"
          :placeholder="'Cari Nama / SKU / Product / Scan Barcode'"
          :aria-result="true"
          @add-data="addItem"
        >
        </Searchbar>
      </div>

      <div class="flex flex-col space-y-4 items-end w-full">
        <div
          class="overflow-auto shadow-md rounded-lg w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
        >
          <table
            class="w-full text-xs text-left text-gray-500 dark:text-gray-400 xl:table-fixed duration-300 ease-in-out transform"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 w-4 text-center">No</th>
                <th scope="col" class="py-3 w-36">Products / Services</th>
                <th scope="col" class="py-3 w-12">
                  <VTooltip :distance="5" :skidding="32" :placement="'top'" :triggers="['hover']">
                    <div>Price</div>
                    <template #popper>
                      <div class="w-60 text-center">
                        Click dua kali pada kolom harga, untuk melihat daftar harga product/jasa
                      </div>
                    </template>
                  </VTooltip>
                </th>
                <th scope="col" class="py-3 w-12 px-2">Discount</th>
                <th
                  scope="col"
                  :class="salesStore.currentData.useGlobalTax ? 'w-8' : 'w-10'"
                  class="px-2 mx-auto duration-300 ease-in-out"
                >
                  Tax
                </th>
                <th scope="col" class="py-3 w-6">Qty</th>
                <th scope="col" class="py-3 w-10 px-2">Unit</th>
                <th scope="col" class="py-3 w-12 px-2">Subtotal</th>
                <th scope="col" class="py-3 w-1 px-2"></th>
              </tr>
            </thead>
            <tbody class="duration-300 ease-in-out transform">
              <tr
                v-if="salesStore.currentData.currentCart.length < 1"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td colspan="9" class="px-6 text-center py-2">
                  <span class="text-base dark:text-gray-300 text-gray-700">Tambahkan data produk</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in salesStore.currentData.currentCart"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
              >
                <td class="text-center">
                  <span>{{ 1 + index }}</span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.name.toUpperCase() }}
                  </span>
                </td>

                <td class="">
                  <InputCurrency
                    @dblclick="showPrice(item, index)"
                    :options="{ currency: 'IDR' }"
                    v-model="item.price"
                    :custom-class="'text-xs  sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                  />
                </td>
                <td class="px-2">
                  <InputCurrency
                    :options="{ currency: 'IDR' }"
                    :custom-class="'text-xs sm:w-full w-36 dark:bg-gray-700 bg-gray-100 text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                    v-model="item.disc"
                  />
                </td>
                <td
                  :class="salesStore.currentData.useGlobalTax ? 'w-8' : 'w-10'"
                  class="px-2 mx-auto duration-300 ease-in-out"
                >
                  <template v-if="salesStore.currentData.useGlobalTax">
                    <span class="text-xs">{{ IDRCurrency.format(calculateTax(item)) }}</span>
                  </template>
                  <template v-else>
                    <div class="flex flex-row space-x-2 items-center">
                      <input
                        v-model="item.tax_status"
                        :disabled="!item.can_tax"
                        type="checkbox"
                        value=""
                        :class="item.can_tax ? '' : 'invisible'"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span class="text-xs">{{ IDRCurrency.format(calculateTax(item)) }}</span>
                    </div>
                  </template>
                </td>
                <td class="">
                  <VTooltip
                    :disabled="item.stock > item.qty"
                    :distance="5"
                    :placement="'top'"
                    :triggers="['hover', 'click']"
                  >
                    <input
                      min="0"
                      type="number"
                      :class="[item.qty > item.stock ? 'dark:bg-red-400 bg-red-300' : 'dark:bg-gray-700 bg-gray-100']"
                      class="sm:w-full text-xs w-20 text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                      v-model="item.qty"
                    />
                    <template #popper> Persediaan product ini kurang dari 0 </template>
                  </VTooltip>
                </td>
                <td class="text-xs text-gray-900 dark:text-white px-2 w-4">
                  {{ item.unit?.toUpperCase() }}
                </td>
                <td class="text-gray-900 dark:text-white text-xs font-bold px-2">
                  {{ IDRCurrency.format(subTotal(item)) }}
                </td>
                <td class="mx-auto">
                  <TrashIcon
                    @click="removeItem(index)"
                    class="h-6 w-6 hover:text-red-500 cursor-pointer hover:scale-105 duration-300 ease-in-out"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot
              v-if="canSubmit"
              class="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 text-sm"
            >
              <tr class="text-gray-900 dark:text-white">
                <th scope="row" colspan="2" class="px-6 py-3">Total</th>
                <td class="py-3 w-12 px-2">
                  {{ IDRCurrency.format(salesStore.subTotal) }}
                </td>
                <td class="py-3 w-12 px-4">
                  {{ IDRCurrency.format(salesStore.discount) }}
                </td>
                <td
                  :class="salesStore.currentData.useGlobalTax ? 'w-8' : 'w-10'"
                  class="px-2 mx-auto duration-300 ease-in-out"
                >
                  <span>{{ IDRCurrency.format(salesStore.tax) }}</span>
                </td>
                <td scope="row" colspan="2"></td>
                <td class="py-3 w-12 px-2">
                  <span>{{ IDRCurrency.format(salesStore.grandTotal) }}</span>
                </td>
                <td scope="row"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div v-if="canSubmit" class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-4 py-4 max-w-md">
        <div class="flex flex-col items-start space-y-4">
          <div class="flex flex-row justify-center items-center">
            <input
              v-model="salesStore.currentData.useGlobalTax"
              id="checkbox-1"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >use global tax
            </label>
          </div>
          <div class="w-full" v-if="salesStore.currentData.useGlobalTax">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Choose Tax</label
            >
            <DotLoading v-if="taxStore.isLoading" />
            <select
              v-else
              v-model="salesStore.currentData.tax"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="item in taxStore.items" :key="item.id" :value="item">
                {{ item.name.toUpperCase() }} ({{ item.value * 100 }}%)
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <PriceModal :show="showPriceModal" @close="showPriceModal = false" @set-item="setPrice" :item-title="itemTitle" />
    </Teleport>
  </section>
</template>

<script setup>
import { TrashIcon, PaperAirplaneIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

import { ref, reactive, computed, onUnmounted, defineAsyncComponent, onMounted, watch } from "vue";
import { useItemStore } from "@/stores/items";
import { IDRCurrency } from "@/utilities/formatter";
import { useToast } from "vue-toastification";

import Searchbar from "@/components/input/Searchbar.vue";
import InputCurrency from "@/components/input/InputCurrency.vue";
import { useSalesStore } from "@/stores/sales";
import { useItemSellingPriceStore } from "@/stores/itemSellingPrice";
import DotLoading from "@/components/loading/DotLoading.vue";
import { useTaxDetailStore } from "@/stores/taxDetail";

const emit = defineEmits(["next", "previous"]);

const toast = useToast();
const itemStore = useItemStore();
const salesStore = useSalesStore();
const itemSellingPriceStore = useItemSellingPriceStore();
const taxStore = useTaxDetailStore();
const showPriceModal = ref(false);
const itemTitle = ref("");
const itemIndex = ref(0);

const canSubmit = computed(() => {
  if (salesStore.currentData.currentCart.length > 0) {
    return true;
  }
  return false;
});
const PriceModal = defineAsyncComponent(() => import("../modal/PriceModal.vue"));

// Function
function cariData() {
  itemStore.currentLimit = 5;
  itemStore.getData();
}
function subTotal(item) {
  const dasarPajak = item.price - item.disc;
  const value =
    salesStore.currentData.useGlobalTax == false
      ? item.tax_status
        ? item.tax_value
        : 0
      : salesStore.currentData.tax.value;
  const a = dasarPajak * value + dasarPajak;
  return a * item.qty;
}
function calculateTax(item) {
  const dasarPajak = item.price - item.disc;
  var a;
  if (salesStore.currentData.useGlobalTax == true) {
    const value = salesStore.currentData.tax.value;
    a = dasarPajak * value;
  } else {
    const value = item.tax_status ? item.tax_value : 0;
    a = dasarPajak * value;
  }
  const result = a * item.qty;
  item.tax = result;

  return result;
}
function addItem(item) {
  if (!checkItem(item.id)) {
    salesStore.currentData.currentCart.push({
      id: item.id,
      name: item.name,
      unit: item.unit.name,
      price: item.selling_price ? item.selling_price : 0,
      stock: item.ending_stock,
      tax_value: item.sell_tax?.value ?? 0,
      tax_status: item.sell_tax.id == 1 ? false : true,
      can_tax: item.sell_tax.id == 1 ? false : true,
      tax: item.sell_tax.id == 1 ? false : true,
      qty: 1,
      disc: 0,
    });
    toast.success("Item baru di tambahkan", {
      timeout: 1000,
      position: "bottom-left",
    });
  } else {
    toast.error("Item sudah ada", {
      timeout: 1000,
      position: "bottom-left",
    });
  }
}
function removeItem(index) {
  salesStore.currentData.currentCart.splice(index, 1);
  toast.info("Item dihapus", {
    timeout: 1000,
    position: "bottom-right",
  });
}
function checkItem(id) {
  const b = salesStore.currentData.currentCart.find((e) => e.id == id);
  if (b) {
    return true;
  }
  return false;
}
function setPrice(x) {
  salesStore.currentData.currentCart[itemIndex.value].price = x;
  showPriceModal.value = false;
}
function showPrice(item, index) {
  showPriceModal.value = true;
  itemSellingPriceStore.getData(item.id);
  itemTitle.value = item.name;
  itemIndex.value = index;
}
watch(
  () => salesStore.currentData.useGlobalTax,
  (newValue, oldValue) => {
    if (newValue == false) {
      salesStore.currentData.tax = { id: 1, name: "Tanpa Pajak", value: 0 };
    }
  }
);

onMounted(() => {
  itemStore.$patch((state) => {
    state.filter.type = "sell";
  });
  if (taxStore.items.length == 0 || taxStore.items.length == null) {
    taxStore.getData();
  }
});
onUnmounted(() => {
  itemStore.$reset();
});
</script>
