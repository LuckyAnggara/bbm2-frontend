<template>
  <div
    class="w-full flex flex-col justify-center sm:px-56 px-12 py-6 space-y-6"
  >
    <template v-if="salesStore.singleResponses">
      <div
        class="w-full rounded-xl py-20 px-20 shadow-md flex flex-col space-y-12 bg-white dark:bg-gray-800 dark:text-white"
      >
        <!-- Header -->
        <section>
          <div class="flex justify-between mb-4">
            <div class="flex flex-col">
              <span class="dark:text-white text-black text-3xl font-bold"
                >Invoice #{{ salesStore.singleResponses.invoice }}
                <span
                  v-if="salesStore.singleResponses.receivable == true"
                  class="bg-red-100 text-red-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-500 dark:text-white"
                  >BELUM LUNAS</span
                >
                <span
                  v-else
                  class="bg-blue-100 text-blue-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white"
                  >LUNAS</span
                >
              </span>
              <span class="dark:text-gray-400 text-gray-800 mt-2">{{
                moment(salesStore.singleResponses.created_at).format(
                  'DD MMMM YYYY'
                )
              }}</span>
            </div>
            <div class="flex flex-col text-right">
              <span class="dark:text-white text-black text-3xl font-medium mb-2"
                >Berkah Baja Makmur</span
              >
              <span
                class="dark:text-gray-400 text-gray-800 w-96 text-ellipsis break-words italic"
                >Jl Raya Limbangan asdkjaskdjaksd aksjdaksjd askdjaksjd</span
              >
              <span
                class="dark:text-gray-400 text-gray-800 w-96 text-ellipsis italic"
                >Telepon : 0213012030</span
              >
            </div>
          </div>

          <div class="flex justify-between w-72">
            <div class="flex flex-col">
              <span class="dark:text-white text-blacktext-xl font-bold"
                >Kepada
              </span>
              <span
                class="dark:text-gray-400 text-gray-800 mt-2 text-ellipsis break-words italic"
                >{{ salesStore.singleResponses.customer.name }}</span
              >
              <span
                class="dark:text-gray-400 text-gray-800 text-ellipsis break-words italic"
                >{{ salesStore.singleResponses.customer.address }}</span
              >
              <span
                class="dark:text-gray-400 text-gray-800 text-ellipsis break-words italic"
                >{{ salesStore.singleResponses.customer.phone_number }}</span
              >
            </div>
          </div>
        </section>

        <!-- ISI -->

        <section class="border-b-2 py-8 dark:border-gray-100 border-gray-400">
          <div class="relative overflow-x-auto rounded-lg">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-gray-800 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white font-normal"
              >
                <tr>
                  <th scope="col" class="px-6 py-4">Item</th>
                  <th scope="col" class="px-6 py-4">Quantity</th>
                  <th scope="col" class="px-6 py-4">Harga</th>
                  <th scope="col" class="px-6 py-4">Discount</th>
                  <th scope="col" class="px-6 py-4">Total</th>
                </tr>
              </thead>
              <tbody class="mt-2">
                <tr
                  v-for="i in salesStore.singleResponses.detail"
                  :key="i.id"
                  class="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black text-base"
                >
                  <th scope="row" class="px-6 py-6 font-semibold">
                    {{ i.item.name }}
                  </th>
                  <td class="px-6 py-6">
                    {{ i.qty + ' ' + i.item.unit.name }}
                  </td>
                  <td class="px-6 py-6">{{ IDRCurrency.format(i.price) }}</td>
                  <td class="px-6 py-6">
                    {{ IDRCurrency.format(i.discount) }}
                  </td>
                  <td class="px-6 py-6">
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
            <div
              :class="
                salesStore.singleResponses.receivable == true ? 'space-x-5' : ''
              "
              class="flex flex-row"
            >
              <div
                class="flex justify-between dark:text-gray-400 text-gray-600 w-64"
              >
                <ul class="space-y-1 text-left">
                  <li>SUBTOTAL</li>
                  <li v-if="salesStore.singleResponses.discount > 0">DISKON</li>
                  <li v-if="salesStore.singleResponses.tax > 0">PAJAK (11%)</li>
                  <li>ONGKOS KIRIM</li>
                  <li class="dark:text-white text-black text-lg font-medium">
                    TOTAL
                  </li>
                </ul>

                <ul class="space-y-1 text-right">
                  <li class="font-semibold">
                    {{ IDRCurrency.format(salesStore.singleResponses.total) }}
                  </li>
                  <li
                    v-if="salesStore.singleResponses.discount > 0"
                    class="text-red-500"
                  >
                    {{
                      IDRCurrency.format(salesStore.singleResponses.discount)
                    }}
                  </li>
                  <li v-if="salesStore.singleResponses.tax > 0">
                    {{ IDRCurrency.format(salesStore.singleResponses.tax) }}
                  </li>
                  <li>
                    {{
                      IDRCurrency.format(
                        salesStore.singleResponses.shipping_cost
                      )
                    }}
                  </li>

                  <li class="dark:text-white text-black text-lg font-medium">
                    {{
                      IDRCurrency.format(salesStore.singleResponses.grand_total)
                    }}
                  </li>
                </ul>
              </div>
              <div
                v-if="salesStore.singleResponses.receivable == true"
                class="flex justify-between dark:text-gray-400 text-gray-600 w-60"
              >
                <ul class="space-y-1 text-left">
                  <li>JT. TEMPO</li>
                  <li class="dark:text-white text-black text-md font-medium">
                    SISA
                  </li>
                </ul>

                <ul class="space-y-1 text-right">
                  <li class="font-semibold text-md">
                    {{
                      moment(salesStore.singleResponses.due_date).format(
                        'DD MMMM YYYY'
                      )
                    }}
                  </li>

                  <li class="dark:text-white text-black text-lg font-medium">
                    {{
                      IDRCurrency.format(
                        salesStore.singleResponses.remaining_receivable
                      )
                    }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="fixed top-1/2 right-10 transform -translate-y-1/2 z-50">
        <div
          class="bg-white shadow-lg dark:bg-gray-800 dark:text-white py-4 px-4 text-gray-800 rounded-lg flex flex-col space-y-4"
        >
          <span class="px-4 text-center text-lg font-medium"> ACTION </span>
          <hr />
          <a
            href="#"
            class="text-lg flex px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white items-center hover:translate-x-2 duration-300 ease-in-out"
          >
            <PrinterIcon class="w-6 h-6 mr-2" />
            Print
          </a>
          <a
            href="#"
            class="text-lg flex px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white items-center hover:translate-x-2 duration-300 ease-in-out"
          >
            <PrinterIcon class="w-6 h-6 mr-2" />
            LX Print
          </a>
          <a
            href="#"
            class="text-lg flex px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white items-center hover:translate-x-2 duration-300 ease-in-out"
          >
            <PaperAirplaneIcon class="w-6 h-6 mr-2" />
            Whatsapp
          </a>

          <hr />
          <button
            @click="paymentCreditView()"
            v-if="salesStore.singleResponses.receivable == true"
            class="text-lg flex px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white items-center hover:translate-x-2 duration-300 ease-in-out"
          >
            <CreditCardIcon class="w-6 h-6 mr-2" />
            Pembayaran
          </button>
        </div>
      </div>
      <!-- <div class="space-x-2 place-self-end">
        <button
          type="button"
          class="duration-300 ease-in-out hover:-translate-y-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <PrinterIcon class="w-5 h-5 mr-2" />
          Print
        </button>

        <button
          type="button"
          class="duration-300 ease-in-out hover:-translate-y-1 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <PrinterIcon class="w-5 h-5 mr-2" />
          LX Print
        </button>

        <button
          type="button"
          class="duration-300 ease-in-out hover:-translate-y-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <PaperAirplaneIcon class="w-5 h-5 mr-2" />
          Whatsapp
        </button>
      </div> -->
    </template>

    <template v-else-if="salesStore.isLoading">
      <CircleLoading class="h-24 mx-auto" />
    </template>

    <template v-else>
      <div class="mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1
              class="mb-4 text-2xl tracking-tight font-extrabold lg:text-5xl text-blue-600 dark:text-blue-500"
            >
              Opss!!
            </h1>

            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Data yang diminta tidak ada.
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {
  PrinterIcon,
  PaperAirplaneIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/outline'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSalesStore } from '../../stores/sales'
import { IDRCurrency } from '../../utilities/formatter'
import CircleLoading from '../../components/loading/CircleLoading.vue'

const salesStore = useSalesStore()
const router = useRouter()
const route = useRoute()

const isOpen = ref(false)

const id = computed(() => {
  return route.params.id ?? null
})

function paymentCreditView() {
  router.push({
    name: 'payment-credit',
    params: { id: salesStore.singleResponses.id },
  })
}

onMounted(() => {
  salesStore.showData(id.value)
})
</script>
