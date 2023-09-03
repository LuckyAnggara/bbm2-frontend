<template>
  <div class="flex flex-col">
    <div class="">
      <div v-if="isEdit" class="relative h-fit w-1/2">
        <Searchbar
          @cari-data="cariData"
          v-model="itemStore.searchName"
          :is-loading="itemStore.isLoading"
          :result-items="itemStore.items"
          :placeholder="'Tambah Item cari Nama / SKU / Product / Scan Barcode'"
          :aria-result="true"
          @add-data="addItem"
        >
        </Searchbar>
      </div>

      <div class="flex flex-col space-y-4 items-end w-full p-4">
        <div
          class="overflow-auto rounded-lg w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
        >
          <table
            class="w-full text-xs text-left text-gray-500 dark:text-gray-400 md:table-fixed duration-300 ease-in-out transform"
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
                <th scope="col" class="py-3 w-6">Qty</th>

                <th scope="col" :class="useGlobalTax ? 'w-8' : 'w-10'" class="px-2 mx-auto duration-300 ease-in-out">
                  Tax
                </th>
                <th scope="col" class="py-3 w-10 px-2">Unit</th>
                <th scope="col" class="py-3 w-12 px-2">Subtotal</th>
                <th scope="col" class="py-3 w-1 px-2"></th>
              </tr>
            </thead>
            <tbody class="duration-300 ease-in-out transform">
              <tr
                v-if="salesStore.singleResponses.detail.length < 1"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td colspan="9" class="px-6 text-center py-2">
                  <span class="text-base dark:text-gray-300 text-gray-700">Tambahkan data produk</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in salesStore.singleResponses.detail"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
              >
                <td class="text-center">
                  <span>{{ 1 + index }}</span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.item.name.toUpperCase() }}
                  </span>
                </td>

                <td class="">
                  <InputCurrency
                    v-if="isEdit"
                    :options="{ currency: 'IDR' }"
                    v-model="item.price"
                    :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : ' bg-gray-200 dark:bg-gray-700'"
                    :custom-class="'text-xs sm:w-full w-36  text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                  />
                  <span v-else>
                    {{ IDRCurrency.format(item.price) }}
                  </span>
                </td>
                <td class="px-2">
                  <InputCurrency
                    v-if="isEdit"
                    :options="{ currency: 'IDR' }"
                    :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : ' bg-gray-200 dark:bg-gray-700'"
                    :custom-class="'text-xs sm:w-full w-36  text-black dark:text-white border dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 '"
                    v-model="item.discount"
                  />
                  <span v-else>
                    {{ IDRCurrency.format(item.discount) }}
                  </span>
                </td>

                <td class="">
                  <VTooltip
                    :disabled="item.stock > item.qty"
                    :distance="5"
                    :placement="'top'"
                    :triggers="['hover', 'click']"
                  >
                    <input
                      v-if="isEdit"
                      min="0"
                      type="number"
                      :class="[item.qty > item.stock ? 'dark:bg-red-400 bg-red-300' : 'dark:bg-gray-900 bg-gray-50']"
                      class="sm:w-full text-xs w-20 text-black dark:text-white dark:border-gray-800 border-gray-300 text-md rounded-lg p-2 font-medium"
                      v-model="item.qty"
                    />
                    <span v-else>
                      {{ item.qty }}
                    </span>
                    <template #popper> Persediaan product ini kurang dari 0 </template>
                  </VTooltip>
                </td>
                <td
                  :class="salesStore.singleResponses.global_tax ? 'w-8' : 'w-10'"
                  class="px-2 mx-auto duration-300 ease-in-out"
                >
                  <template v-if="salesStore.singleResponses.global_tax">
                    <span class="text-xs">{{ IDRCurrency.format(calculateTax(item)) }}</span>
                  </template>
                  <template v-else>
                    <div class="flex flex-row space-x-2 items-center">
                      <input
                        v-model="item.item.tax_status"
                        :disabled="!item.item.can_tax"
                        type="checkbox"
                        :class="item.item.can_tax ? 'bg-gray-100 dark:bg-gray-600' : 'bg-gray-400  dark:bg-gray-900'"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span class="text-xs">{{ IDRCurrency.format(calculateTax(item)) }}</span>
                    </div>
                  </template>
                </td>
                <td class="text-xs text-gray-900 dark:text-white px-2 w-4">
                  {{ item.item.unit?.name.toUpperCase() }}
                </td>
                <td class="text-gray-900 dark:text-white text-xs font-bold px-2">
                  {{ IDRCurrency.format(subTotal(item)) }}
                </td>
                <td class="mx-auto">
                  <TrashIcon
                    v-if="isEdit"
                    @click="removeItem(index)"
                    class="h-6 w-6 hover:text-red-500 cursor-pointer hover:scale-105 duration-300 ease-in-out"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot class="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 text-sm">
              <tr class="text-gray-900 dark:text-white">
                <th scope="row" colspan="2" class="px-6 py-3">Total</th>
                <td class="py-3 w-12 px-2">
                  {{ IDRCurrency.format(salesStore.editSubTotal) }}
                </td>
                <td class="py-3 w-12 px-4">
                  {{ IDRCurrency.format(salesStore.editDiscount) }}
                </td>

                <td scope="row"></td>
                <td
                  colspan="2"
                  :class="salesStore.singleResponses.global_tax ? 'w-8' : 'w-10'"
                  class="px-2 mx-auto duration-300 ease-in-out"
                >
                  <span>{{ IDRCurrency.format(salesStore.editTax) }}</span>
                </td>
                <td class="py-3 w-12 px-2">
                  <span>{{ IDRCurrency.format(salesStore.editGrandTotal) }}</span>
                </td>
                <td scope="row"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div v-if="canSubmit" class="px-4 py-4 max-w-md">
        <div class="flex flex-col items-start space-y-4">
          <div class="flex flex-row justify-center items-center">
            <input
              :disabled="!isEdit"
              v-model="salesStore.singleResponses.global_tax"
              :class="
                isEdit ? 'text-blue-600 bg-gray-50 dark:bg-gray-900' : 'text-gray-600 bg-gray-200 dark:bg-gray-700'
              "
              id="checkbox-1"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:border-gray-600"
            />
            <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >use global tax
            </label>
          </div>
          <div class="w-full" v-if="salesStore.singleResponses.global_tax">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Choose Tax</label
            >
            <DotLoading v-if="taxStore.isLoading" />
            <select
              v-else
              :disabled="!isEdit"
              v-model="salesStore.singleResponses.tax_detail"
              :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
              id="countries"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="item in taxStore.items" :key="item.id" :value="item">
                {{ item.name.toUpperCase() }} ({{ item.value * 100 }}%)
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <span>Retur Detail</span>
      <div class="flex flex-col space-y-4 items-end w-full p-4">
        <div
          class="overflow-auto rounded-lg w-full h-fit scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
        >
          <table
            class="w-full text-xs text-left text-gray-500 dark:text-gray-400 md:table-fixed duration-300 ease-in-out transform"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 w-4 text-center">No</th>
                <th scope="col" class="py-3 w-36">Products / Services</th>

                <th scope="col" class="py-3 w-6">Qty</th>
                <th scope="col" class="py-3 w-6">Price</th>

                <th scope="col" :class="useGlobalTax ? 'w-8' : 'w-10'" class="px-2 mx-auto duration-300 ease-in-out">
                  Tax
                </th>
                <th scope="col" class="py-3 w-12 px-2">Subtotal</th>
                <th scope="col" class="py-3 w-12 px-2">Type</th>
                <th scope="col" class="py-3 w-12 px-2">Notes</th>
              </tr>
            </thead>
            <tbody class="duration-300 ease-in-out transform">
              <tr
                v-for="(item, index) in salesStore.singleResponses.detail_retur"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
              >
                <td class="text-center">
                  <span>{{ 1 + index }}</span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.item.name.toUpperCase() }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.qty }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.price }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.tax }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.grand_total }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.type }}
                  </span>
                </td>
                <td class="">
                  <span class="text-ellipsis">
                    {{ item.notes }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useSalesStore } from "../../../stores/sales";
import { useTaxDetailStore } from "../../../stores/taxDetail";
import { useItemStore } from "../../../stores/items";
import { IDRCurrency } from "../../../utilities/formatter";
import InputCurrency from "../../../components/input/InputCurrency.vue";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import DotLoading from "../../../components/loading/DotLoading.vue";
import Searchbar from "../../../components/input/Searchbar.vue";

const salesStore = useSalesStore();
const taxStore = useTaxDetailStore();
const itemStore = useItemStore();

const toast = useToast();
const useGlobalTax = ref(false);
const canSubmit = ref(true);

function cariData() {
  itemStore.currentLimit = 5;
  itemStore.getData();
}
function checkItem(id) {
  const b = salesStore.singleResponses.detail.find((e) => e.item_id == id);
  if (b) {
    return true;
  }
  return false;
}
function addItem(item) {
  if (!checkItem(item.id)) {
    salesStore.singleResponses.detail.push({
      item_id: item.id,
      item: item,
      price: item.selling_price ? item.selling_price : 0,
      stock: item.ending_stock,
      tax_value: item.tax_value,
      tax_status: item.tax_status,
      can_tax: item.can_tax,
      tax: 0,
      qty: 1,
      discount: 0,
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

function subTotal(item) {
  const dasarPajak = item.price - item.discount;
  const value =
    salesStore.singleResponses.global_tax == false
      ? item.item.tax_status
        ? item.item.tax_value
        : 0
      : salesStore.singleResponses.tax_detail.value;
  const a = dasarPajak * value + dasarPajak;
  return a * item.qty;
}
function calculateTax(item) {
  const dasarPajak = item.price - item.discount;
  var a;
  if (salesStore.singleResponses.global_tax == true) {
    const value = salesStore.singleResponses.tax_detail.value;
    a = dasarPajak * value;
  } else {
    const value = item.item.tax_status ? item.item.tax_value : 0;
    a = dasarPajak * value;
  }
  const result = a * item.qty;
  item.tax = result;
  return result;
}
function removeItem(index) {
  salesStore.singleResponses.detail.splice(index, 1);
  toast.info("Item dihapus", {
    timeout: 1000,
    position: "bottom-right",
  });
}

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>
