<template>
  <div>
    <template v-if="salesStore.showDrawerData">
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Invoice</label
        >
        <input
          :value="salesStore.showDrawerData.invoice"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Nama Pelanggan</label
        >
        <input
          :value="salesStore.showDrawerData.customer.name"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Nomor Telepon</label
        >
        <input
          :value="salesStore.showDrawerData.customer.phone_number"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Alamat</label
        >
        <textarea
          :value="salesStore.showDrawerData.customer.address"
          disabled
          rows="3"
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        ></textarea>
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Total</label
        >
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.total)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Pajak</label
        >
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.tax)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Ongkos Kirim</label
        >
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.shipping_cost)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Grand Total</label
        >
        <input
          :value="IDRCurrency.format(salesStore.showDrawerData.grand_total)"
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div class="flex flex-col space-y-4 mb-2">
        <div>
          <label
            class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
            >Delivery Status</label
          >
          <div
            :class="
              salesStore.showDrawerData.shipping_type == 'DELIVERY'
                ? 'bg-orange-100 text-orange-400 dark:bg-orange-500 '
                : 'bg-green-100 text-green-400 dark:bg-green-500 '
            "
            class="block text-xs font-medium mr-2 px-2.5 py-2 rounded dark:text-white text-center"
          >
            {{ salesStore.showDrawerData.shipping_type }}
          </div>
        </div>
        <small
          v-if="shippingDetailStore.responses == null"
          @click="showMoreDeliveryInfo"
          class="place-self-center text-blue-500 cursor-pointer"
        >
          <span v-if="shippingDetailStore.isLoading">
            <ArrowPathIcon class="h-5 w-5 animate-spin text-blue-500"
          /></span>
          <span v-else>Click me for more info ..</span></small
        >
        <div v-else class="border-t-2 border-b-2">
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Nama Penerima</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_name"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Nomor Telepon</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_phone_number"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Alamat</label
            >
            <textarea
              :value="shippingDetailStore.responses.receiver_address"
              disabled
              rows="3"
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ></textarea>
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Kelurahan</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_kelurahan"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Kecamatan</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_kecamatan"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Kota</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_kota"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Kode Pos</label
            >
            <input
              :value="shippingDetailStore.responses.receiver_postal_code"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div class="mb-2">
            <label
              class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
              >Ongkos Kirim</label
            >
            <input
              :value="shippingDetailStore.responses.price"
              disabled
              class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <small
            @click="shippingDetailStore.responses = null"
            class="text-blue-500 cursor-pointer block text-center"
          >
            <span>Click to close ..</span></small
          >
        </div>
      </div>

      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Total Pembayaran</label
        >
        <input
          :value="
            IDRCurrency.format(salesStore.showDrawerData.total_payment ?? 0)
          "
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Sisa Kredit</label
        >
        <input
          :value="
            IDRCurrency.format(salesStore.showDrawerData.remaining_credit)
          "
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div v-if="salesStore.showDrawerData.credit == true" class="mb-2">
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Jatuh Tempo</label
        >
        <input
          :value="
            moment(salesStore.showDrawerData.due_date).format('DD MMMM YYYY')
          "
          disabled
          class="text-xs shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <div>
        <label
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >Payment Status</label
        >
        <div
          v-if="salesStore.showDrawerData.credit == true"
          class="block bg-red-100 text-red-600 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-500 dark:text-white text-center mb-4"
        >
          KREDIT
        </div>

        <div
          :class="
            salesStore.showDrawerData.payment_status == 'LUNAS'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-500'
              : 'bg-red-100 text-red-600 dark:bg-red-500'
          "
          class="block text-xs font-medium mr-2 px-2.5 py-2 rounded dark:text-white text-center mb-4"
        >
          {{ salesStore.showDrawerData.payment_status }}
        </div>
      </div>
    </template>

    <template v-else-if="salesStore.isDrawerLoading">
      <CircleLoading class="my-auto mx-auto" />
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
import { useSalesStore } from '../../../stores/sales'
import { useShippingDetailStore } from '../../../stores/shippingDetail'
import { IDRCurrency } from '../../../utilities/formatter'
import CircleLoading from '../../../components/loading/CircleLoading.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const porps = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const salesStore = useSalesStore()
const shippingDetailStore = useShippingDetailStore()

function showMoreDeliveryInfo() {
  shippingDetailStore.showData(salesStore.showDrawerData.id)
}
</script>
