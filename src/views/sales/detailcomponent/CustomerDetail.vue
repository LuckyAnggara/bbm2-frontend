<template>
  <div class="max-w-2xl">
    <div class="sm:col-span-2 mb-4">
      <input
        :disabled="!isEdit"
        v-model="salesStore.singleResponses.customer.withoutCustomer"
        id="checkbox-1"
        type="checkbox"
        value=""
        :class="isEdit ? 'text-blue-600 bg-gray-50 dark:bg-gray-900' : 'text-gray-600 bg-gray-200 dark:bg-gray-700'"
        class="w-4 h-4 border-gray-300 rounded dark:border-gray-600"
      />
      <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Without Customer Data
      </label>
    </div>

    <div v-if="!salesStore.singleResponses.customer.withoutCustomer" class="grid gap-4 mb-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <input
          v-model="salesStore.singleResponses.customer.existingCustomer"
          :disabled="!isEdit"
          id="existing-customer"
          type="checkbox"
          :class="isEdit ? 'text-blue-600 bg-gray-50 dark:bg-gray-900' : 'text-gray-600 bg-gray-200 dark:bg-gray-700'"
          value=""
          class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:border-gray-600"
        />
        <label for="existing-customer" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Existing Customer
        </label>
      </div>
      <div
        v-if="salesStore.singleResponses.customer.existingCustomer && isEdit"
        class="flex space-x-2 sm:col-span-2 justify-center items-center"
      >
        <div class="w-full">
          <label for="customer_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Existing Customer</label
          >
          <input
            v-model="customerStore.searchName"
            type="text"
            name="searchName"
            id="searchName"
            :class="isEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Find customer by name or member id press find button"
            required=""
          />
        </div>
        <button
          type="button"
          @click="popCustomerExistingModal"
          class="h-fit place-self-end text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <MagnifyingGlassIcon class="h-5 w-5" />
          <span class="sr-only">Icon description</span>
        </button>
      </div>

      <div>
        <label for="customer_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input
          :disabled="!customerCanEdit"
          v-model="salesStore.singleResponses.customer.name"
          type="text"
          name="invoice"
          id="invoice"
          :class="customerCanEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type customer name"
          required=""
        />
      </div>
      <div>
        <label for="customer_phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Phone Number</label
        >
        <input
          :disabled="!customerCanEdit"
          v-model="salesStore.singleResponses.customer.phone_number"
          type="text"
          name="customer_phone_number"
          id="customer_phone_number"
          :class="customerCanEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
          class="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type phone number"
          required=""
        />
      </div>
      <div class="sm:col-span-2">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
        <select
          :disabled="!customerCanEdit"
          v-model="salesStore.singleResponses.customer.type"
          :class="customerCanEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
          class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Choose Customer Type</option>
          <option value="personal">Personal</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
        <textarea
          :disabled="!customerCanEdit"
          v-model="salesStore.singleResponses.customer.address"
          id="description"
          rows="4"
          :class="customerCanEdit ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'"
          class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type customer address"
        ></textarea>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <CustomerFindModal
      :show="showCustomerExistingModal"
      @close="showCustomerExistingModal = false"
      @submit="fromFindCustomer"
    >
    </CustomerFindModal>
  </Teleport>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useSalesStore } from "../../../stores/sales";
import { useCustomerStore } from "../../../stores/customer";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import CustomerFindModal from "../../../components/modal/CustomerFindModal.vue";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const salesStore = useSalesStore();
const customerStore = useCustomerStore();
const showCustomerExistingModal = ref(false);
const customerCanEdit = ref(false);
const savingCustomerData = computed(() => {
  return JSON.parse(JSON.stringify(salesStore.originalSingleResponses.customer));
});
// const existingCustomer = ref(salesStore.singleResponses.customer.id !== 1);

function popCustomerExistingModal() {
  if (customerStore.searchName !== "") {
    customerStore.getData();
  }
  showCustomerExistingModal.value = true;
}

function fromFindCustomer(item) {
  salesStore.$patch((state) => {
    state.singleResponses.customer.name = JSON.parse(JSON.stringify(item.name));
    state.singleResponses.customer.address = JSON.parse(JSON.stringify(item.address));
    state.singleResponses.customer.phone_number = JSON.parse(JSON.stringify(item.phone_number));
    state.singleResponses.customer.id = JSON.parse(JSON.stringify(item.id));
    state.singleResponses.customer.type = JSON.parse(JSON.stringify(item.type));
  });
  customerStore.searchName = "";
}
// watchDeep(salesStore.singleResponses.customer.existingCustomer, () => {
//   // salesStore.$patch((state) => {
//   //   state.singleResponses.customer.id = 1;
//   //   state.singleResponses.customer.name = "";
//   //   state.singleResponses.customer.address = "";
//   //   state.singleResponses.customer.phone_number = "";
//   //   state.singleResponses.customer.type = "personal";
//   // });
//   // customerCanEdit.value = true;
// });

// whenever(
//   () => salesStore.singleResponses.customer.existingCustomer,
//   (value) => {
//     if (salesStore.singleResponses.customer.existingCustomer == true) {
//       customerCanEdit.value = false;
//     } else {
// state.singleResponses.customer.id = 1;
// state.singleResponses.customer.name = "";
// state.singleResponses.customer.address = "";
// state.singleResponses.customer.phone_number = "";
// state.singleResponses.customer.type = "personal";
// customerCanEdit.value = true;
//     }
//     console.info(customerCanEdit.value);
//   }
// );

// salesStore.$subscribe((mutation, state) => {
//   // import { MutationType } from 'pinia'
//   if (mutation.type == "direct") {
//     if (state.singleResponses.customer.existingCustomer == false) {
//     } else {
//     }
//   }
// });

watch(
  () => salesStore.singleResponses?.customer.existingCustomer,
  (newValue, oldValue) => {
    if (newValue == true) {
      customerCanEdit.value = false;
      salesStore.$patch((state) => {
        state.singleResponses.customer.name = savingCustomerData.value.name;
        state.singleResponses.customer.address = savingCustomerData.value.address;
        state.singleResponses.customer.phone_number = savingCustomerData.value.phone_number;
        state.singleResponses.customer.type = savingCustomerData.value.type;
        state.singleResponses.customer.id = savingCustomerData.value.id;
      });
    } else {
      customerCanEdit.value = true;
      salesStore.$patch((state) => {
        state.singleResponses.customer.name = "";
        state.singleResponses.customer.address = "";
        state.singleResponses.customer.phone_number = "";
        state.singleResponses.customer.id = 1;
      });
    }
  },
  { deep: true }
);

watch(
  () => salesStore.singleResponses?.customer.withoutCustomer,
  (newValue, oldValue) => {
    salesStore.$patch((state) => {
      if (newValue == true) {
        state.singleResponses.customer.id = 1;
      } else {
        state.singleResponses.customer.name = "";
        state.singleResponses.customer.address = "";
        state.singleResponses.customer.phone_number = "";
      }
    });
  },
  { deep: true }
);
</script>
