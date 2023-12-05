<template>
  <div class="w-full flex flex-col justify-center">
    <template v-if="itemStore.singleResponses">
      <div class="flex">
        <div class="w-1/3 h-fit">
          <form>
            <div class="bg-white shadow-md dark:bg-gray-800 rounded-lg px-6 py-6">
              <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-4">Detail</h5>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Nama Produk</label
                >

                <div class="flex flex-row justify-between space-x-2">
                  <input
                    :value="itemStore.singleResponses.name"
                    disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                  />

                  <button
                    @click="stateShow = 'insight'"
                    type="button"
                    class="w-20 justify-center duration-300 ease-in-out hover:scale-105 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Insight
                    <span class="sr-only">Icon description</span>
                  </button>
                </div>
              </div>

              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Merek</label>
                <input
                  :value="itemStore.singleResponses.brand?.name"
                  disabled
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm">Unit</label>
                <div v-if="!edit">
                  <input
                    :value="itemStore.singleResponses.unit.name"
                    disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                  />
                </div>
                <div v-else>
                  <DotLoading v-if="itemUnitStore.isLoading" />
                  <div v-else class="flex flex-row space-x-2">
                    <select
                      v-model="itemStore.editCurrentData.unit_id"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0" disabled>Pilih satuan product</option>
                      <option v-for="item in itemUnitStore.items" :key="item.id" :value="item.id">
                        {{ item.name.toUpperCase() }}
                      </option>
                    </select>
                    <button
                      type="button"
                      @click="showModalAddUnit = true"
                      class="hover:scale-110 duration-300 ease-in-out text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      <PlusIcon class="h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                @click="edit = !edit"
                type="button"
                class="w-24 mt-2 justify-center duration-300 ease-in-out hover:scale-105 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Data
              </button>
              <hr class="my-5" />

              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Harga Jual Terakhir</label
                >
                <div class="flex flex-row justify-between space-x-2">
                  <input
                    :value="IDRCurrency.format(itemStore.singleResponses.price?.price ?? 0)"
                    disabled
                    class="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                  />
                  <button
                    @click="showItemPriceTable()"
                    type="button"
                    class="w-12 justify-center duration-300 ease-in-out hover:scale-105 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    <span class="sr-only">Icon description</span>
                  </button>
                </div>
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Harga Perolehan / Modal</label
                >
                <div class="flex flex-row justify-between space-x-2">
                  <input
                    :value="IDRCurrency.format(itemStore.singleResponses.price?.price ?? 0)"
                    disabled
                    class="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                  />
                  <button
                    @click="showItemPriceTable()"
                    type="button"
                    class="w-12 justify-center duration-300 ease-in-out hover:scale-105 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    <span class="sr-only">Icon description</span>
                  </button>
                </div>
              </div>
              <div class="mb-2">
                <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
                  >Persediaan</label
                >
                <div class="flex flex-row justify-between space-x-2">
                  <input
                    :value="itemStore.singleResponses.ending_stock"
                    disabled
                    class="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                  />

                  <button
                    @click="showStockItemTable()"
                    type="button"
                    class="w-12 justify-center duration-300 ease-in-out hover:scale-105 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    <span class="sr-only">Icon description</span>
                  </button>
                </div>
              </div>

              <small class="flex justify-end mt-4 text-grey-800 dark:text-gray-500"
                ><i
                  ><span>Last updated</span> <span> {{ moment().format("DD MMMM YYYY") }}</span></i
                ></small
              >
            </div>
          </form>
        </div>
        <div class="flex flex-col w-2/3 ml-10 relative">
          <Transition name="slide-up">
            <div
              v-if="stateShow == 'insight'"
              class="bg-white shadow-md dark:bg-gray-800 w-full rounded-lg px-6 py-6 absolute"
            >
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">Insight</h5>
              <hr class="my-5" />

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Dibawah ini merupakan performance penjualan atas produk ini dalam 3 hari terakhir
              </p>
              <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Read more
                <svg
                  class="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
            <div
              v-else-if="stateShow == 'price'"
              class="bg-white shadow-md dark:bg-gray-800 w-full rounded-lg px-6 py-6"
            >
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">Daftar Harga Jual</h5>

              <hr class="my-5" />

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Dibawah ini merupakan data harga jual</p>
              <div class="flex flex-col justify-between">
                <div class="overflow-x-auto">
                  <table
                    class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed table-striped"
                  >
                    <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                      <tr>
                        <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                        <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">
                          Tanggal
                        </th>
                        <th scope="col" class="px-4 py-2 w-36 border border-slate-400 dark:border-slate-600">
                          Harga Jual
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="itemPriceStore.isLoading">
                        <td colspan="3" class="text-center py-6">
                          <CircleLoading>Prosesing ... </CircleLoading>
                        </td>
                      </tr>
                      <tr v-else-if="!itemPriceStore.isLoading && itemPriceStore.items.length < 1">
                        <td colspan="3" class="text-center py-6">No Data</td>
                      </tr>
                      <tr
                        v-else
                        v-for="(item, index) in itemPriceStore.items"
                        :key="item.id"
                        :class="
                          (index + 1) % 2 !== 0
                            ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                            : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                        "
                      >
                        <td class="px-4 py-2 text-center">
                          {{ itemPriceStore.from + index }}
                        </td>
                        <td class="px-4 py-2">
                          {{ moment(item.created_at).format("DD MMMM YYYY") }}
                        </td>
                        <td class="px-4 py-2">
                          {{ IDRCurrency.format(item.price) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav
                  class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                  aria-label="Table navigation"
                >
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white"
                      >{{ itemPriceStore.from }} - {{ itemPriceStore.to }}</span
                    >
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">{{ itemPriceStore.total }}</span>
                  </span>
                  <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                      <a
                        @click="itemPriceStore.currentPage == 1 ? '' : itemPriceStore.getData(previousPage)"
                        :disabled="itemPriceStore.currentPage == 1 ? true : false"
                        :class="
                          itemPriceStore.currentPage == 1
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer dark:hover:bg-green-700 dark:hover:text-white hover:bg-green-100 hover:text-gray-700'
                        "
                        class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >Previous</a
                      >
                    </li>

                    <li>
                      <a
                        @click="
                          itemPriceStore.lastPage == itemPriceStore.currentPage ? '' : itemPriceStore.getData(nextPage)
                        "
                        :class="
                          itemPriceStore.lastPage == itemPriceStore.currentPage
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer dark:hover:bg-green-700 dark:hover:text-white hover:bg-green-100 hover:text-gray-700'
                        "
                        class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >Next {{
                      }}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div v-else class="bg-white shadow-md dark:bg-gray-800 w-full rounded-lg px-6 py-6 absolute">
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">Data Mutasi Produk</h5>

              <hr class="my-5" />

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Dibawah ini merupakan data mutasi dari produk
              </p>
              <div class="flex flex-col justify-between">
                <div class="overflow-x-auto">
                  <table
                    class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed table-striped"
                  >
                    <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                      <tr>
                        <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                        <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">
                          Tanggal
                        </th>
                        <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">Debit</th>
                        <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">kredit</th>
                        <th scope="col" class="px-4 py-2 w-24 border border-slate-400 dark:border-slate-600">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="itemMutationStore.isLoading">
                        <td colspan="5" class="text-center py-6">
                          <CircleLoading>Prosesing ... </CircleLoading>
                        </td>
                      </tr>
                      <tr v-else-if="!itemMutationStore.isLoading && itemMutationStore.items.length < 1">
                        <td colspan="5" class="text-center py-6">No Data</td>
                      </tr>
                      <tr
                        v-else
                        v-for="(item, index) in itemMutationStore.items"
                        :key="item.id"
                        :class="
                          (index + 1) % 2 !== 0
                            ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                            : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                        "
                      >
                        <td class="px-4 py-2 text-center">
                          {{ itemMutationStore.from + index }}
                        </td>
                        <td class="px-4 py-2">
                          {{ moment(item.created_at).format("DD MMMM YYYY") }}
                        </td>
                        <td class="px-4 py-2">{{ item.debit }}</td>
                        <td class="px-4 py-2">{{ item.credit }}</td>
                        <td class="px-4 py-2">
                          <router-link :to="item.link" v-if="item.link == null ? false : true">
                            <span class="text-blue-700 dark:text-blue-400">
                              {{ item.notes }}
                            </span></router-link
                          >
                          <span v-else>
                            {{ item.notes }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <small class="mt-3 text-grey-800 dark:text-gray-500"><i>Klik link biru untuk melihat Invoice</i></small>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </template>

    <template v-else-if="itemStore.isLoading">
      <CircleLoading class="my-auto mx-auto" />
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

    <Teleport to="body"> </Teleport>

    <!-- 
    <Teleport to="body">
      <SuccessModal :show="itemStore.isTransactionSuccess" @submit="reload"
        ><template #message> Transaction success </template>
        <template #buttonText> Ok </template>
      </SuccessModal>
    </Teleport> -->
  </div>
</template>

<script setup>
import moment from "moment";
import { FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { computed, ref, nextTick, onMounted, defineAsyncComponent, inject } from "vue";
import { useRoute } from "vue-router";
import { IDRCurrency } from "@/utilities/formatter";
import { useItemStore } from "@/stores/items";
import { useItemUnitStore } from "@/stores/itemUnit";
import { useItemMutationStore } from "@/stores/itemMutation";
import CircleLoading from "@/components/loading/CircleLoading.vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useItemSellingPriceStore } from "@/stores/itemSellingPrice";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartOptions = {
  responsive: true,
};
const chartData = {
  labels: [moment().format("dd MMMM YYYY"), "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};

const date = moment();

const swal = inject("$swal");

const stateShow = ref("insight");
const edit = ref(false);
const route = useRoute();
const itemStore = useItemStore();
const itemUnitStore = useItemUnitStore();
const itemPriceStore = useItemSellingPriceStore();
const itemMutationStore = useItemMutationStore();

const LoadingModal = defineAsyncComponent(() => import("@/components/modal/LoadingModal.vue"));
const SuccessModal = defineAsyncComponent(() => import("@/components/modal/SuccessModal.vue"));

const id = computed(() => {
  return route.params.id ?? null;
});

function showItemPriceTable() {
  stateShow.value = "price";
  itemPriceStore.getData(itemStore.singleResponses.id);
}

function showStockItemTable() {
  stateShow.value = "stock";
  itemMutationStore.getData(itemStore.singleResponses.id);
}

onMounted(() => {
  if (itemStore.singleResponses == null) {
    itemStore.showData(id.value);
  }
});
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.15s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
