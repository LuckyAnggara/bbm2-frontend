<template>
  <div class="px-2 sm:px-0 justify-center flex flex-col transition-all duration-300 ease-in-out">
    <template v-if="salesStore.singleResponses">
      <TabGroup @change="changeTab" :selectedIndex="activeTab">
        <div class="flex md:flex-row flex-col-reverse justify-between w-full">
          <TabList
            class="w-full md:max-w-2xl flex flex-grow space-x-1 rounded-md shadow-sm bg-white py-1 px-2 dark:bg-gray-800"
          >
            <Tab v-for="tab in tabs" as="template" :key="tab.id" v-slot="{ selected }">
              <button
                :class="[
                  'w-full rounded-md py-2 text-sm font-medium leading-5 text-black',
                  'ring-white ',
                  selected
                    ? 'bg-gray-700 text-white shadow dark:bg-gray-100 dark:text-gray-700'
                    : 'dark:text-white text-black hover:bg-gray-100 hover:dark:bg-gray-600',
                ]"
              >
                {{ tab.label }}
              </button>
            </Tab>
          </TabList>
          <div
            class="mb-2 md:mb-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <HeadlessMenu :links="actionMenu" />
          </div>
        </div>

        <TabPanels class="mt-2 w-full bg-white py-4 px-6 rounded-md dark:bg-gray-800 dark:text-white shadow-sm">
          <div class="text-2xl font-medium mb-4 flex flex-row justify-between">
            <span class="py-2">{{ tabs[activeTab].label }}</span>
            <div v-if="isEdit" class="flex flex-row space-x-2">
              <button
                @click="cancelEdit"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <XMarkIcon class="h-4 w-4 mr-2" />

                Cancel
              </button>
              <button
                @click="update"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <FolderArrowDownIcon v-if="!salesStore.isUpdateLoading" class="h-4 w-4 mr-2" />
                <ArrowPathIcon v-else class="h-4 w-4 mr-2 animate-spin" />

                Update
              </button>
            </div>
          </div>
          <hr class="py-2" />
          <!-- Sales & Payment Tab -->
          <TabPanel>
            <SalesPaymentDetail :isEdit="isEdit" />
          </TabPanel>
          <!-- Customer Tab -->
          <TabPanel>
            <CustomerDetail :isEdit="isEdit" />
          </TabPanel>

          <TabPanel>
            <CartDetail :isEdit="isEdit" />
          </TabPanel>

          <TabPanel>
            <CreditDetail :isEdit="isEdit" />
          </TabPanel>

          <TabPanel>
            <ShippingDetail :isEdit="isEdit" />
          </TabPanel>
          <hr class="mt-4 py-2" />
          <small class="italic text-right block"
            >Last edit
            {{ moment(salesStore.singleResponses.updated_at).format("DD MMMM YYYY H:mm:ss") }}
          </small>
        </TabPanels>
      </TabGroup>
    </template>
    <template v-else-if="salesStore.isLoading">
      <div class="my-auto mx-auto">
        <CircleLoading> Fetching data ... </CircleLoading>
      </div>
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-green-600 dark:text-green-500">
              Opss!!
            </h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Data yang diminta tidak ada.</p>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <LoadingModal :show="salesStore.isUpdateLoading">Processing transaction</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="salesStore.isTransactionSuccess" :type="'success'"
        ><template #message> Update success </template>
        <template #buttonText>
          <button
            @click="closeModal"
            type="button"
            class="hover:scale-110 duration-300 ease-in-out transform py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900"
          >
            Tutup
          </button>
        </template>
      </SuccessModal>
    </Teleport>

    <Teleport to="body">
      <ReturModal :show="showReturModal" @close="showReturModal = !showReturModal" />
    </Teleport>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, inject, onMounted, reactive, ref, watch } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import CustomerDetail from "./detailcomponent/CustomerDetail.vue";

import HeadlessMenu from "@/components/menu/HeadlessMenu.vue";
import { useTaxDetailStore } from "@/stores/taxDetail";
import { useSalesStore } from "@/stores/sales";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  FolderArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

import LoadingModal from "@/components/modal/LoadingModal.vue";
import SuccessModal from "@/components/modal/SuccessModal.vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import CircleLoading from "@/components/loading/CircleLoading.vue";
import SalesPaymentDetail from "./detailcomponent/SalesPaymentDetail.vue";
import CartDetail from "./detailcomponent/CartDetail.vue";
import CreditDetail from "./detailcomponent/CreditDetail.vue";
import ShippingDetail from "./detailcomponent/ShippingDetail.vue";
import { useSalesReturStore } from "../../stores/salesRetur";

const ReturModal = defineAsyncComponent(() => import("./modal/ReturModal.vue"));

const toast = useToast();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");

const taxStore = useTaxDetailStore();
const salesStore = useSalesStore();
const returStore = useSalesReturStore();

const showReturModal = ref(false);

const activeTab = ref(0);
const isEdit = ref(false);
const tabs = [
  { id: 1, label: "Info" },
  { id: 2, label: "Customer" },
  { id: 3, label: "Cart & Retur" },
  { id: 4, label: "Credit" },
  { id: 5, label: "Shipping" },
];

const actionMenu = reactive([
  {
    function: editMode,
    label: "Edit",
    icon: PencilSquareIcon,
  },
  {
    function: returModal,
    label: "Retur",
    icon: ArchiveBoxIcon,
  },
  {
    function: deleteData,
    label: "Hapus",
    icon: TrashIcon,
  },
]);

function returModal() {
  if (isEdit.value) {
    swal.fire("Sedang dalam mode edit");
  } else {
    showReturModal.value = true;
    returStore.fromSalesStore(
      JSON.parse(JSON.stringify(salesStore.singleResponses.detail)),
      JSON.parse(JSON.stringify(salesStore.singleResponses.detail_retur ?? []))
    );
  }
}

function changeTab(index) {
  activeTab.value = index;
}
function closeModal() {
  isEdit.value = !isEdit.value;
  salesStore.isTransactionSuccess = false;
}
function editMode() {
  salesStore.$patch((state) => {
    state.originalSingleResponses = JSON.parse(JSON.stringify(state.singleResponses));
  });
  isEdit.value = true;
}
function cancelEdit() {
  salesStore.copyOriginalSingleResponses();
  isEdit.value = !isEdit.value;
}
function deleteData(item) {
  if (isEdit.value) {
    swal.fire("Sedang dalam mode edit");
  } else {
    swal.fire({
      title: "Hapus?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Cancel!",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      preConfirm: async () => {
        await salesStore.destroy(salesStore.singleResponses.id, false);
        router.push({ name: "list-product" });
      },
      allowOutsideClick: () => !salesStore.isDestroyLoading,
      backdrop: true,
    });
  }
}
function update() {
  if (canUpdate.value) {
    salesStore.update();
  }
}
const canUpdate = computed(() => {
  if (!salesPayment.value) {
    activeTab.value = 0;
    toast.error("Incomplete Sales Information", {
      timeout: 2000,
      position: "top-center",
    });
    return false;
  }

  if (!customer.value) {
    activeTab.value = 1;
    toast.error("Incomplete Customer Information", {
      timeout: 2000,
      position: "top-center",
    });
    return false;
  }

  if (!cart.value) {
    activeTab.value = 2;
    toast.error("Incomplete Cart Information", {
      timeout: 2000,
      position: "top-center",
    });
    return false;
  }

  if (!credit.value) {
    activeTab.value = 3;
    toast.error("Incomplete Credit Information", {
      timeout: 2000,
      position: "top-center",
    });
    return false;
  }

  if (!shipping.value) {
    activeTab.value = 4;
    toast.error("Incomplete Shipping Information", {
      timeout: 2000,
      position: "top-center",
    });
    return false;
  }

  return true;
});

const salesPayment = computed(() => {
  if (salesStore.singleResponses) {
    return (
      salesStore.singleResponses.payment_status !== "" &&
      salesStore.singleResponses.payment_type !== "" &&
      salesStore.singleResponses.shipping_type !== "" &&
      salesStore.singleResponses.credit !== ""
    );
  }
  return false;
});

const customer = computed(() => {
  if (salesStore.singleResponses.customer.withoutCustomer == true) {
    return true;
  }
  if (salesStore.singleResponses.customer.existingCustomer == true) {
    if (salesStore.singleResponses.customer.id !== 1) {
      return true;
    } else {
      return false;
    }
  }

  if (
    salesStore.singleResponses.customer.name !== "" &&
    salesStore.singleResponses.customer.address !== "" &&
    salesStore.singleResponses.customer.type !== "" &&
    salesStore.singleResponses.customer.phone_number !== ""
  ) {
    return true;
  }
  return false;
});

const cart = computed(() => {
  if (salesStore.singleResponses.detail.length > 0) {
    return true;
  }
  return false;
});

const credit = computed(() => {
  if (salesStore.singleResponses.credit == 1) {
    if (salesStore.singleResponses.due_date == "" || salesStore.singleResponses.due_date == null) {
      return false;
    }
  }
  return true;
});

const shipping = computed(() => {
  if (salesStore.singleResponses.shipping_type == "DELIVERY") {
    if (
      salesStore.singleResponses.shipping.shipping_id == "" ||
      salesStore.singleResponses.shipping.shipping_id == null ||
      salesStore.singleResponses.shipping.shipping_cost == "" ||
      salesStore.singleResponses.shipping.shipping_cost == null ||
      salesStore.singleResponses.shipping.receiverName == null ||
      salesStore.singleResponses.shipping.receiverName === "" ||
      salesStore.singleResponses.shipping.receiverAddress == null ||
      salesStore.singleResponses.shipping.receiverAddress === "" ||
      salesStore.singleResponses.shipping.receiverPhoneNumber == null ||
      salesStore.singleResponses.shipping.receiverPhoneNumber === "" ||
      salesStore.singleResponses.shipping.receiverKelurahan == null ||
      salesStore.singleResponses.shipping.receiverKelurahan === "" ||
      salesStore.singleResponses.shipping.receiverKecamatan == null ||
      salesStore.singleResponses.shipping.receiverKecamatan === "" ||
      salesStore.singleResponses.shipping.receiverKota == null ||
      salesStore.singleResponses.shipping.receiverKota === "" ||
      salesStore.singleResponses.shipping.receiverPostalCode == null ||
      salesStore.singleResponses.shipping.receiverPostalCode === ""
    ) {
      return false;
    }
  }
  return true;
});

const uuid = computed(() => {
  return route.params.uuid ?? null;
});

onMounted(async () => {
  if (taxStore.items.length == 0 || taxStore.items.length == null) {
    taxStore.getData();
  }
  if (salesStore.singleResponses == null) {
    await salesStore.showData(uuid.value);
  }
});
</script>
