<template>
  <section>
    <div class="max-w-2xl">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="invoice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invoice</label>
          <input
            v-model="salesStore.singleResponses.invoice"
            disabled
            type="text"
            name="invoice"
            id="invoice"
            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required=""
          />
        </div>
        <div>
          <label for="created_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Transaction Date</label
          >
          <input
            :value="moment(salesStore.singleResponses.created_at).format('DD MMM YYYY')"
            disabled
            type="text"
            name="created_at"
            id="created_at"
            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label for="customer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Customer Name
            <small v-if="isEdit" class="text-blue-600 italic">(Edit customer name in Customer tab)</small>
          </label>

          <input
            disabled
            v-model="salesStore.singleResponses.customer.name"
            type="text"
            name="customer"
            id="customer"
            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required=""
          />
        </div>
        <div>
          <label for="paymentStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Payment Status</label
          >
          <select
            :disabled="!isEdit"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            v-model="salesStore.singleResponses.payment_status"
            id="category"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="LUNAS">LUNAS</option>
            <option value="BELUM LUNAS">BELUM LUNAS</option>
          </select>
        </div>
        <div>
          <label for="creditStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Credit Status</label
          >
          <select
            :disabled="!isEdit"
            v-model="salesStore.singleResponses.credit"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            id="creditStatus"
            class="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="0">FULL PAYMENT</option>
            <option value="1">CREDIT</option>
          </select>
        </div>
        <div>
          <label for="deliveryType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Delivery Type</label
          >
          <select
            :disabled="!isEdit"
            v-model="salesStore.singleResponses.shipping_type"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            id="deliveryType"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="TAKE AWAY">TAKE AWAY</option>
            <option value="DELIVERY">DELIVERY</option>
          </select>
        </div>
        <div>
          <label for="paymentType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Payment Type</label
          >
          <select
            :disabled="!isEdit"
            v-model="salesStore.singleResponses.payment_type"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            id="paymentType"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="CASH">CASH</option>
            <option value="TRANSFER">TRANSFER</option>
            <option value="QR CODE">QR CODE</option>
            <option value="DIGITAL PAYMENT">DIGITAL PAYMENT</option>
          </select>
        </div>

        <div class="sm:col-span-2 border-b-2 pb-5 border-gray-200 dark:border-gray-600">
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Grand Total
            <small v-if="isEdit" class="text-blue-600 italic"
              >(Can be adjust by changing Product Detail in Cart Tab)</small
            ></label
          >
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.editGrandTotal"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
        <div class="sm:col-span-2">
          <span>Detail</span>
        </div>
        <div>
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.editSubTotal"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
        <div>
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.editDiscount"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
        <div>
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tax</label>
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.editTax"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
        <div>
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Shipping Cost</label
          >
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.singleResponses.shipping_cost"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
        <div class="sm:col-span-2">
          <small class="text-green-500 font-medium text-start"
            >Transaksi ini pernah melakukan <i>Retur Product</i></small
          >
        </div>
        <div>
          <label for="grandTotal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Total Retur</label
          >
          <InputCurrency
            disabled
            :options="{ currency: 'IDR' }"
            :custom-class="'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
            v-model="salesStore.editTax"
            name="grandTotal"
            id="grandTotal"
          />
        </div>
      </div>
    </div>
    <DialogModal :isOpen="showDialogModalCredit" @close="showDialogModalCredit = !showDialogModalCredit">
      <template v-slot:header> Information </template>
      <template v-slot:main> Complete the Credit data on the Credit tab </template>
      <template v-slot:footer> Tutup </template>
    </DialogModal>
    <DialogModal :isOpen="showDialogShipping" @close="showDialogShipping = !showDialogShipping">
      <template v-slot:header> Information </template>
      <template v-slot:main> Complete the Shipping data on the Shipping tab </template>
      <template v-slot:footer> Tutup </template>
    </DialogModal>
  </section>
</template>
<script setup>
import { useSalesStore } from "../../../stores/sales";
import InputCurrency from "../../../components/input/InputCurrency.vue";
import DialogModal from "../../../components/modal/DialogModal.vue";
import { computed, ref, watch } from "vue";
import { inRange } from "lodash";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const showDialogModalCredit = ref(false);
const showDialogShipping = ref(false);
const salesStore = useSalesStore();
const shipping = {
  receiverName: "",
  receiverAddress: "",
  receiverPhoneNumber: "",
  receiverKelurahan: "",
  receiverKecamatan: "",
  receiverCity: "",
  receiverPostalCode: "",
  shipping_id: 0,
  shipping_cost: 0,
};

salesStore.$subscribe((mutation, state) => {
  if (mutation.type == "direct") {
    if (state.singleResponses.credit == 1) {
      showDialogModalCredit.value = true;
    }

    if (state.singleResponses.shipping_type == "DELIVERY") {
      showDialogShipping.value = true;
      salesStore.$patch((state) => {
        state.singleResponses.shipping = shipping;
      });
    }
  }
});
</script>
