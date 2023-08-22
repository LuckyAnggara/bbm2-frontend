<template>
  <template v-if="salesStore.singleResponses.shipping_type == 'DELIVERY'">
    <div class="max-w-2xl">
      <div class="flex flex-col space-y-4 mb-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Shipping Vendor</label>
          <select
            v-model="salesStore.singleResponses.shipping.shipping_id"
            :disabled="!isEdit"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">Default Shipping</option>
          </select>
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Fee Shipping</label>
          <InputCurrency
            v-model="salesStore.singleResponses.shipping.shipping_cost"
            :disabled="!isEdit"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            :options="{ currency: 'IDR' }"
            :custom-class="'block  p-2.5 w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
          />
        </div>
      </div>
      <div class="flex flex-col space-y-4 mb-6">
        <div class="flex items-center">
          <input
            v-model="useCustomerData"
            :disabled="isEdit && salesStore.singleResponses.customer.withoutCustomer"
            :class="
              isEdit && salesStore.singleResponses.customer.withoutCustomer == false
                ? 'text-blue-600 bg-gray-50 dark:bg-gray-900'
                : 'text-gray-600 bg-gray-200 dark:bg-gray-700'
            "
            id="checkbox-2"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >use customer data
            <small v-if="isEdit && salesStore.singleResponses.customer.withoutCustomer" class="text-blue-600 italic"
              >(invoice ini tidak memiliki data customer)</small
            >
          </label>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            v-model="salesStore.singleResponses.shipping.receiverName"
            :disabled="!isEdit"
            type="text"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Receiver Name"
          />
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
          <input
            v-model="salesStore.singleResponses.shipping.receiverPhoneNumber"
            :disabled="!isEdit"
            type="text"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Receiver Phone Number"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <textarea
            v-model="salesStore.singleResponses.shipping.receiverAddress"
            :disabled="!isEdit"
            rows="3"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Receiver Address"
          ></textarea>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="flex space-x-2">
            <div class="w-full">
              <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
              <input
                v-model="salesStore.singleResponses.shipping.receiverPostalCode"
                :disabled="!isEdit"
                type="text"
                :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
                class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Receiver Postal Code"
              />
            </div>
            <button
              :disabled="!isEdit"
              type="button"
              :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
              @click="popPostalCodeModal"
              class="h-fit place-self-end text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <MagnifyingGlassIcon class="h-5 w-5" />
              <span class="sr-only">Icon description</span>
            </button>
          </div>
          <div class="w-full">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Urban</label>
            <input
              v-model="salesStore.singleResponses.shipping.receiverKelurahan"
              :disabled="!isEdit"
              type="text"
              :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
              class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Receiver Urban"
            />
          </div>
          <div class="w-full">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Subdistrict</label>
            <input
              v-model="salesStore.singleResponses.shipping.receiverKecamatan"
              :disabled="!isEdit"
              type="text"
              :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
              class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Receiver Subdistrict"
            />
          </div>
          <div class="w-full">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input
              v-model="salesStore.singleResponses.shipping.receiverKota"
              :disabled="!isEdit"
              type="text"
              :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
              class="w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Receiver City"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="mx-auto">
      <p class="mb-4 text-md text-gray-800 dark:text-gray-400">Product take away by Customer</p>
    </div>
  </template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <PostalCodeModal :show="showPostalCodeModal" @close="showPostalCodeModal = false" @submit="fromPostal">
    </PostalCodeModal>
  </Teleport>
</template>
<script setup>
import { ref, watch } from "vue";
import { useSalesStore } from "../../../stores/sales";
import { useCustomerStore } from "../../../stores/customer";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import PostalCodeModal from "../../../components/modal/PostalCodeModal.vue";
import { usePostalCodeStore } from "../../../stores/postalCode";
import InputCurrency from "../../../components/input/InputCurrency.vue";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const salesStore = useSalesStore();
const postalCodeStore = usePostalCodeStore();

const useCustomerData = ref(false);
const showPostalCodeModal = ref(false);

async function popPostalCodeModal() {
  postalCodeStore.searchName = salesStore.singleResponses.shipping.receiverPostalCode;
  if (postalCodeStore.searchName !== "") {
    postalCodeStore.getData();
  }
  showPostalCodeModal.value = true;
}

function fromPostal(item) {
  salesStore.singleResponses.shipping.receiverKelurahan = item.urban;
  salesStore.singleResponses.shipping.receiverKecamatan = item.subdistrict;
  salesStore.singleResponses.shipping.receiverKota = item.city;
  salesStore.singleResponses.shipping.receiverPostalCode = item.postalcode;
}

watch(useCustomerData, (v) => {
  if (v == true) {
    const data = JSON.parse(JSON.stringify(salesStore.singleResponses.customer));

    salesStore.$patch((state) => {
      state.singleResponses.shipping.receiverName = data.name;
      state.singleResponses.shipping.receiverPhoneNumber = data.phone_number;
      state.singleResponses.shipping.receiverAddress = data.address;
      state.singleResponses.shipping.receiverKelurahan = data.urban;
      state.singleResponses.shipping.receiverKecamatan = data.subdistrict;
      state.singleResponses.shipping.receiverKota = data.city;
      state.singleResponses.shipping.receiverPostalCode = data.postalcode;
    });
  }
});
</script>
