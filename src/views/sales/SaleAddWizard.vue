<template>
  <div class="pr-24">
    <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <li
        v-for="(item, index) in steps"
        :key="index"
        :class="[index == step ? 'text-blue-600 dark:text-blue-500' : 'text-gray-600 dark:text-gray-500']"
        class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
      >
        <span
          class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
        >
          <span class="mr-2">{{ index + 1 }}.</span>
          {{ item }}
        </span>
      </li>
    </ol>
  </div>

  <div class="flex flex-row space-x-1 mt-10">
    <div>
      <button
        @click="previousPage()"
        :disabled="step == 0"
        :class="step == 0 ? 'cursor-not-allowed' : ''"
        class="flex flex-row space-x-2 w-32 justify-between text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <ChevronLeftIcon class="h-5 w-5 mr-2" />
        Previous
      </button>
    </div>
    <div>
      <button
        @click="nextPage()"
        :disabled="step == steps.length - 2"
        :class="step == steps.length - 2 ? 'cursor-not-allowed' : ''"
        class="flex flex-row space-x-2 w-32 justify-between text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Next <ChevronRightIcon class="h-5 w-5 ml-2" />
      </button>
    </div>
  </div>
  <Transition :name="transitionName" mode="out-in">
    <div class="mt-8" :key="step">
      <!-- Info Pelanggan -->
      <CustomerInfo v-if="step == 0" @next="step++" />
      <!-- Keranjang Belanja -->
      <Cart v-else-if="step == 1" @next="step++" @previous="step--" />
      <!-- Konfirmasi -->
      <Confirmation v-else-if="step == 2" @next="step++" @previous="step--" />
      <!-- Pembayaran -->
      <Payment v-else-if="step == 3" @next="step++" @previous="step--" />
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { useSalesStore } from "@/stores/sales";

const Cart = defineAsyncComponent(() => import("./component/Cart.vue"));
const CustomerInfo = defineAsyncComponent(() => import("./component/CustomerInfo.vue"));
const Confirmation = defineAsyncComponent(() => import("./component/Confirmation.vue"));
const Payment = defineAsyncComponent(() => import("./component/Payment.vue"));

const salesStore = useSalesStore();

const route = useRoute();

const steps = ref(["Customer", "Cart", "Confirmation", "Payment"]);
// Data validasi untuk setiap langkah
const isCustomerValid = ref(false);
const isCartValid = ref(false);
const isConfirmationValid = ref(false);

const emit = defineEmits(["next", "previous"]);

const step = ref(0);
const transitionName = ref("slide-right");

watch(step, (val, old) => {
  transitionName.value = val > old ? "slide-left" : "slide-right";
});

// Validasi langkah berdasarkan `salesStore.currentData`
const validateStep = computed(() => {
  const currentData = salesStore.currentData;

  switch (step.value) {
    case 0: // Customer Step
      if (!currentData.customerData.isCustomer && !currentData.customerData.withoutCustomer) {
        // Validasi data tambahan di step 0
        const { name, address, type } = currentData.customerData;
        return (
          name?.trim().length > 0 && // Nama harus diisi
          address?.trim().length > 0 && // Alamat harus diisi
          type !== null &&
          type !== "" // Tipe tidak boleh kosong
        );
      }
      // Jika isCustomer atau withoutCustomer true, validasi lolos
      return true;
    case 1: // Cart Step
      return currentData.currentCart.length > 0; // Pastikan ada barang di keranjang
    case 2: // Confirmation Step
      return (
        currentData.total.amount > 0 && currentData.transaction.bank.id // Pastikan ada total dan metode pembayaran
      );
    case 3: // Payment Step
      return true; // Anggap langkah terakhir selalu valid
    default:
      return false;
  }
});

// Fungsi untuk pindah ke langkah berikutnya jika validasi lolos
function nextPage() {
  if (validateStep.value) {
    step.value++;
  } else {
    toast("Eits, belum bisa lanjut! Lengkapi dulu ya, biar makin mantap!", {
      position: toast.POSITION.BOTTOM_CENTER,
      type: "warning",
    });
  }
}

// Fungsi untuk kembali ke langkah sebelumnya
function previousPage() {
  step.value = Math.max(0, step.value - 1);
}

onUnmounted(() => {
  salesStore.$reset();
});
</script>

<style scoped>
.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-left-enter-to {
  opacity: 1;
}
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.2s;
}
</style>
