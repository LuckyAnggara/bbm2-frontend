<template>
  <section class="w-full flex flex-col relative justify-between space-y-4">
    <div class="flex items-center space-x-4 justify-end">
      <button
        @click="nextStep"
        type="submit"
        class="text-blue-600 inline-flex items-center hover:text-white border hover:scale-105 ease-in-out duration-300 border-blue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600"
      >
        Lanjut
        <PaperAirplaneIcon class="h-5 w-5 ml-2" />
      </button>
    </div>
    <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
      <div class="flex items-center">
        <input
          v-model="salesStore.currentData.customerData.withoutCustomer"
          id="checkbox-1"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Without Customer Data
        </label>
      </div>
    </div>
    <div
      v-if="!salesStore.currentData.customerData.withoutCustomer"
      class="flex lg:flex-row flex-col lg:space-x-6 space-y-6 lg:space-y-0 ease-in-out transform duration-300"
    >
      <div class="relative bg-white shadow-md dark:bg-gray-800 rounded-lg h-fit w-1/2">
        <Searchbar
          @cari-data="cariData()"
          v-model="customerStore.searchName"
          :is-loading="customerStore.isLoading"
          :result-items="customerStore.items"
          :placeholder="'Find existing customer'"
          :aria-result="true"
          @add-data="addData"
          :disabled-add="isEdit"
        >
        </Searchbar>
      </div>
      <form class="w-full flex flex-col space-y-4">
        <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
          <div class="flex flex-col space-y-4">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input
                required
                ref="namaLengkap"
                :disabled="formDisabled"
                v-model="salesStore.currentData.customerData.name"
                type="text"
                :class="[formDisabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Customer Name"
              />
              <div v-if="canSubmit == true || isEdit == true">
                <span v-if="salesStore.currentData.customerData.isCustomer" class="text-blue-400 py-2"
                  >Pelanggan Tetap</span
                >
                <span v-else class="text-green-400 py-2">Pelanggan Baru</span>
              </div>
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <select
                v-model="salesStore.currentData.customerData.type"
                :class="[formDisabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="" disabled selected>Choose Customer Type</option>
                <option value="personal">Personal</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div>
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone Number</label
              >
              <input
                required
                :disabled="formDisabled"
                :class="[formDisabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                v-model="salesStore.currentData.customerData.phone_number"
                type="text"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Phone Number"
              />
            </div>

            <div class="sm:col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Address</label
              >
              <textarea
                required
                :class="[formDisabled == true ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900']"
                :disabled="formDisabled"
                v-model="salesStore.currentData.customerData.address"
                rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Customer Address"
              ></textarea>
            </div>

            <div
              v-if="!salesStore.currentData.customerData.isCustomer && salesStore.currentData.customerData.name !== ''"
              class="flex items-center mb-4"
            >
              <input
                v-model="salesStore.currentData.customerData.saveCustomer"
                id="checkbox-3"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Simpan pelanggan
              </label>
            </div>

            <small class="text-red-500 font-medium text-start" v-if="salesStore.currentData.customerData.saveCustomer"
              >Mohon lengkapi data pelanggan setelah transaksi selesai</small
            >
          </div>
          <div class="flex items-center space-x-4 justify-between mt-8">
            <div class="flex space-x-4">
              <button
                :disabled="customerStore.isEditLoading"
                :class="[
                  canSubmit == true ? '' : isEdit ? '' : 'hidden',
                  customerStore.isEditLoading ? 'cursor-wait' : '',
                ]"
                @click="clearData"
                ref="submit"
                type="button"
                class="text-white-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
              >
                <div>
                  <span v-if="isEdit" class="flex">
                    Cancel
                    <XMarkIcon class="h-5 w-5 ml-2" />
                  </span>
                  <span v-else class="flex">
                    Clear
                    <TrashIcon class="h-5 w-5 ml-2" />
                  </span>
                </div>
              </button>
              <button
                :disabled="customerStore.isEditLoading"
                @click="editData"
                :class="[
                  salesStore.currentData.customerData.isCustomer == true ? '' : 'hidden',
                  customerStore.isEditLoading ? 'cursor-wait' : '',
                ]"
                ref="submit"
                type="button"
                class="text-white-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
              >
                <div>
                  <span v-if="customerStore.isEditLoading" class="text-center flex items-center">
                    <CircleLoading :size="'w-5 h-5'" :bg-circle="'fill-green-500'" />
                    Prosessing</span
                  >
                  <span v-else class="flex">
                    {{ isEdit ? "Update" : "Edit" }}
                    <PencilSquareIcon class="h-5 w-5 ml-2" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { PaperAirplaneIcon, TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { nextTick, ref, computed, watch, onUnmounted } from "vue";
import { useCustomerStore } from "@/stores/customer";
import { useSalesStore } from "@/stores/sales";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

import Searchbar from "@/components/input/Searchbar.vue";
import CircleLoading from "@/components/loading/CircleLoading.vue";

const emit = defineEmits(["next"]);

const namaLengkap = ref(null);
const submit = ref(null);
const toast = useToast();
const customerStore = useCustomerStore();
const salesStore = useSalesStore();
const authStore = useAuthStore();

const isEdit = ref(false);
const canClose = ref(true);

function nextStep() {
  if (salesStore.currentData.customerData.withoutCustomer) {
    emit("next");
  } else if (!canNext.value) {
    toast.error("Lengkapi data customer", {
      timeout: 1000,
      position: "top-center",
    });
  } else {
    emit("next");
  }
}
function cariData() {
  customerStore.currentLimit = 5;
  customerStore.getData();
}

function clearData() {
  if (isEdit.value) {
    isEdit.value = false;
  } else {
    canClose.value = true;
    salesStore.currentData.customerData.isCustomer = false;
    isEdit.value = false;
    customerStore.searchName = "";
    salesStore.currentData.customerData = {
      id: 1,
      name: "",
      address: "",
      phone_number: "",
      saveCustomer: false,
      user: {
        id: authStore.userData.id,
        branchId: authStore.userData.branch_id,
      },
    };

    toast.info("Data pelanggan di hapus", {
      timeout: 2000,
      position: "bottom-center",
    });
  }
}

async function editData() {
  if (isEdit.value == false) {
    isEdit.value = true;
    await nextTick();
    namaLengkap.value.focus();
  } else {
    await customerStore.update(salesStore.currentData.customerData);
    isEdit.value = false;
  }
}

function addData(item) {
  console.info(item);
  canClose.value = false;
  salesStore.$patch((state) => {
    state.currentData.customerData = item;
    state.currentData.customerData.id = item.id;
    state.currentData.customerData.saveCustomer = false;
    state.currentData.customerData.user = {
      id: authStore.userData.id,
      branchId: authStore.userData.branch_id,
    };
  });

  salesStore.currentData.customerData.isCustomer = true;

  toast.success(item.name + " menjadi pelanggan transaksi ini", {
    timeout: 2000,
    position: "bottom-center",
  });
}

const canNext = computed(() => {
  const customer = salesStore.currentData.customerData;
  if (
    customer.name == null ||
    customer.name === "" ||
    customer.type == null ||
    customer.type === "" ||
    customer.address == null ||
    customer.address === "" ||
    customer.phone_number == null ||
    customer.phone_number === 0
  ) {
    return false;
  }

  return true;
});

const canSubmit = computed(() => {
  if (salesStore.currentData.customerData) {
    return (
      salesStore.currentData.customerData.name !== "" &&
      salesStore.currentData.customerData.type !== "" &&
      salesStore.currentData.customerData.address !== "" &&
      salesStore.currentData.customerData.phone_number !== ""
    );
  }
  return false;
});

const formDisabled = computed(() => {
  if (salesStore.currentData.customerData.isCustomer == true && isEdit.value == false) return true;
  return false;
});

watch(
  () => salesStore.currentData.customerData.saveCustomer,
  (newValue, oldValue) => {
    if (newValue == true) {
      toast.info("Data pelanggan akan di simpan!!", {
        timeout: 2000,
        position: "bottom-center",
      });
    }
  },
  { deep: true }
);

watch(
  () => salesStore.currentData.customerData.withoutCustomer,
  (newValue, oldValue) => {
    if (newValue == true) {
      salesStore.currentData.customerData.id = 1;
    } else {
      salesStore.$patch((state) => {
        //   state.currentData.customerData.name = ''
        //   state.currentData.customerData.address = ''
        //   state.currentData.customerData.phone_number = ''
        salesStore.currentData.customerData.id = 0;
      });
    }
  },
  { deep: true }
);

onUnmounted(() => {
  customerStore.$reset();
});
</script>
