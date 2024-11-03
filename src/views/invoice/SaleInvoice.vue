<template>
  <div
    class="w-full flex flex-col xl:flex-row justify-between xl:justify-center xl:px-32 py-6 space-y-12 transition duration-300 ease-in-out"
  >
    <template v-if="salesStore.singleResponses">
      <div class="xl:relative w-full overflow-x-scroll xl:overflow-hidden">
        <div
          class="xl:w-full w-max rounded-xl py-20 px-20 shadow-md flex flex-col space-y-12 dark:bg-gray-800 bg-white dark:text-white"
        >
          <!-- Header -->
          <section>
            <div class="flex justify-between mb-4">
              <div class="flex flex-col">
                <span class="dark:text-white text-black text-3xl font-bold"
                  >Invoice #{{ salesStore.singleResponses.invoice }}
                </span>
                <span class="dark:text-gray-400 text-gray-800 mt-2">{{
                  moment(salesStore.singleResponses.created_at).format("DD MMMM YYYY")
                }}</span>
              </div>
              <div class="flex flex-col text-right">
                <span class="dark:text-white text-black text-3xl font-medium mb-2">Berkah Baja Makmur</span>
                <span class="dark:text-gray-400 text-gray-800 w-96 text-ellipsis break-words italic"
                  >Jl Raya Limbangan asdkjaskdjaksd aksjdaksjd askdjaksjd</span
                >
                <span class="dark:text-gray-400 text-gray-800 w-96 text-ellipsis italic">Telepon : 0213012030</span>
              </div>
            </div>

            <div class="flex justify-between w-72">
              <div class="flex flex-col">
                <span class="dark:text-white text-blacktext-xl font-bold">Kepada </span>
                <span class="dark:text-gray-400 text-gray-800 mt-2 text-ellipsis break-words italic">{{
                  salesStore.singleResponses.customer.name
                }}</span>
                <span class="dark:text-gray-400 text-gray-800 text-ellipsis break-words italic">{{
                  salesStore.singleResponses.customer.address
                }}</span>
                <span class="dark:text-gray-400 text-gray-800 text-ellipsis break-words italic">{{
                  salesStore.singleResponses.customer.phone_number
                }}</span>
              </div>
            </div>
          </section>

          <!-- ISI -->

          <section class="py-8 dark:border-gray-100 border-gray-400">
            <div class="relative overflow-x-auto rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-gray-800 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white font-normal">
                  <tr>
                    <th scope="col" class="px-6 py-3 w-40">Item</th>
                    <th scope="col" class="px-6 py-3 w-20">Quantity</th>
                    <th scope="col" class="px-6 py-3 w-20">Harga</th>
                    <th scope="col" class="px-6 py-3 w-16">Discount</th>
                    <th scope="col" class="px-6 py-3 w-24">Total</th>
                  </tr>
                </thead>
                <tbody class="mt-2">
                  <tr
                    v-for="i in salesStore.singleResponses.detail"
                    :key="i.id"
                    class="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black text-base border-b"
                  >
                    <th scope="row" class="px-6 py-3 font-semibold">
                      {{ i.item.name }}
                    </th>
                    <td class="px-6 py-3">
                      {{ i.qty + " " + i.item.unit.name }}
                    </td>
                    <td class="px-6 py-3">{{ IDRCurrency.format(i.price) }}</td>
                    <td class="px-6 py-3">
                      {{ IDRCurrency.format(i.discount ?? 0) }}
                    </td>
                    <td class="px-6 py-3">
                      {{ IDRCurrency.format(i.qty * i.price - i.discount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Bottom -->
          <section>
            <div class="flex justify-between">
              <div class="flex flex-col w-96">
                <span class="dark:text-gray-400 text-gray-800 break-words"
                  >asdasdasdasdkasjdka sdkajshdkajhs dkajshd aksjdh askdj</span
                >
              </div>
              <div :class="salesStore.singleResponses.status !== 'LUNAS' ? 'space-x-5' : ''" class="flex flex-row">
                <div class="flex justify-between dark:text-gray-400 text-gray-600 w-64">
                  <ul class="space-y-1 text-left font-semibold">
                    <li>SUBTOTAL</li>
                    <li v-if="salesStore.singleResponses.discount > 0">DISKON</li>
                    <li v-if="salesStore.singleResponses.tax > 0">PAJAK (11%)</li>
                    <li>ONGKOS KIRIM</li>
                    <li class="dark:text-white text-black text-lg font-medium">TOTAL</li>
                  </ul>

                  <ul class="space-y-1 text-right">
                    <li class="font-semibold">
                      {{ IDRCurrency.format(salesStore.singleResponses.total) }}
                    </li>
                    <li v-if="salesStore.singleResponses.discount > 0" class="text-red-500">
                      ({{ IDRCurrency.format(salesStore.singleResponses.discount) }})
                    </li>
                    <li v-if="salesStore.singleResponses.tax > 0">
                      {{ IDRCurrency.format(salesStore.singleResponses.tax) }}
                    </li>
                    <li>
                      {{ IDRCurrency.format(salesStore.singleResponses.shipping_cost) }}
                    </li>

                    <li class="dark:text-white text-black text-lg font-medium">
                      {{ IDRCurrency.format(salesStore.singleResponses.grand_total) }}
                    </li>
                  </ul>
                </div>
                <div
                  v-if="salesStore.singleResponses.credit == 1"
                  class="ml-4 flex justify-between dark:text-gray-400 text-gray-600 w-60"
                >
                  <ul class="space-y-1 text-left">
                    <li class="font-semibold">JT. TEMPO</li>
                    <li class="dark:text-white text-black text-md font-semibold">SISA</li>
                  </ul>

                  <ul class="space-y-1 text-right">
                    <li class="font-semibold text-md">
                      {{ moment(salesStore.singleResponses.due_date).format("DD MMMM YYYY") }}
                    </li>

                    <li class="dark:text-white text-black text-lg font-medium">
                      {{ IDRCurrency.format(salesStore.singleResponses.remaining_credit) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="absolute top-0 right-0 transform rounded-bl-lg">
          <span
            v-if="salesStore.singleResponses.status !== 'LUNAS'"
            class="rounded-tr-xl bg-red-100 text-red-600 font-medium px-2.5 py-0.5 dark:bg-red-500 dark:text-white uppercase text-lg text-center w-60 h-12 flex items-center justify-center"
            >BELUM LUNAS</span
          >
          <span
            v-else
            class="rounded-tr-xl bg-blue-100 text-blue-600 font-medium px-2.5 py-0.5 dark:bg-blue-500 dark:text-white uppercase text-lg text-center w-60 h-12 flex items-center justify-center"
            >LUNAS</span
          >
        </div>
      </div>

      <!-- FLOATING MENU -->
      <div class="xl:fixed xl:top-1/2 xl:right-10 transform xl:-translate-y-1/2 z-50 ring-1 ring-gray-200 rounded-md">
        <div
          class="bg-white shadow-lg dark:bg-gray-700 dark:text-white py-3 px-4 text-gray-800 rounded-lg flex flex-col space-y-2"
        >
          <span class="px-4 text-center text-md font-medium"> Action </span>
          <hr />
          <a
            href="#"
            class="text-md flex px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white items-center hover:scale-105 duration-300 ease-in-out"
          >
            <PrinterIcon class="w-6 h-6 mr-2" />
            Print
          </a>
          <a
            href="#"
            class="text-md flex px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white items-center hover:scale-105 duration-300 ease-in-out"
          >
            <PrinterIcon class="w-6 h-6 mr-2" />
            LX Print
          </a>
          <a
            href="#"
            class="text-md flex px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white items-center hover:scale-105 duration-300 ease-in-out"
          >
            <PaperAirplaneIcon class="w-6 h-6 mr-2" />
            Whatsapp
          </a>

          <hr v-if="salesStore.singleResponses.credit == true" />
          <button
            @click="paymentCreditView()"
            v-if="salesStore.singleResponses.credit == true"
            class="text-md flex px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white items-center hover:scale-105 duration-300 ease-in-out"
          >
            <CreditCardIcon class="w-6 h-6 mr-2" />
            Pembayaran
          </button>
        </div>
      </div>
    </template>

    <template v-else-if="salesStore.isLoading">
      <CircleLoading class="h-24 mx-auto" />
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500">
              Opss!!
            </h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Data yang diminta tidak ada.</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { PrinterIcon, PaperAirplaneIcon, CreditCardIcon } from "@heroicons/vue/24/outline";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSalesStore } from "@/stores/sales";
import { IDRCurrency } from "@/utilities/formatter";
import CircleLoading from "@/components/loading/CircleLoading.vue";

const salesStore = useSalesStore();
const router = useRouter();
const route = useRoute();

const isOpen = ref(false);

const uuid = computed(() => {
  return route.params.uuid ?? null;
});

function paymentCreditView() {
  router.push({
    name: "payment-credit",
    params: { id: salesStore.singleResponses.id },
  });
}

onMounted(() => {
  salesStore.showData(uuid.value);
});
</script>
