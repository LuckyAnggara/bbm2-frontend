<template>
  <div
    :class="show == true ? '' : '-translate-x-full'"
    class="py-20 fixed top-0 left-0 z-40 w-full h-screen max-w-md p-4 overflow-y-auto transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md"
  >
    <div class="w-full justify-between flex items-start mb-4">
      <h5 class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        <CubeIcon class="h-5 w-5 mr-2" />Tambah Data Produk
      </h5>
      <button
        @click="emit('close')"
        class="text-black dark:text-white hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
      >
        <XMarkIcon class="h-5 w-5" />
        <span class="sr-only">Close menu</span>
      </button>
    </div>

    <form>
      <div class="space-y-4">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
          <input
            v-model="itemStore.currentData.name"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ketik nama produk"
            required=""
          />
        </div>
        <div>
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merek</label>
          <DotLoading v-if="itemBrandStore.isLoading" />
          <div v-else class="flex flex-row space-x-2">
            <select
              v-model="itemStore.currentData.brand_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0" disabled>Pilih merek product</option>
              <option v-for="item in itemBrandStore.items" :key="item.id" :value="item.id">
                {{ item.name.toUpperCase() }}
              </option>
            </select>
            <button
              type="button"
              @click="showModalAddMerek = true"
              class="hover:scale-110 duration-300 ease-in-out text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <PlusIcon class="h-5" />
            </button>
          </div>
        </div>
        <div>
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satuan</label>
          <DotLoading v-if="itemUnitStore.isLoading" />
          <div v-else class="flex flex-row space-x-2">
            <select
              v-model="itemStore.currentData.unit_id"
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
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Saldo Persediaan</label
          >
          <input
            v-model="itemStore.currentData.balance"
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Isi dengan saldo awal persediaan"
          />
        </div>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Perolehan</label>
          <InputCurrency
            :options="{ currency: 'IDR' }"
            v-model="itemStore.currentData.modal"
            :custom-class="'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'"
            placeholder="Isi dengan harga perolehan"
          />
        </div>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Jual</label>
          <InputCurrency
            :options="{ currency: 'IDR' }"
            v-model="itemStore.currentData.price"
            :custom-class="'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'"
            placeholder="Isi dengan harga jual"
          />
        </div>
        <div class="bottom-20 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
          <!-- <button
            type="submit"
            @click="prosesRequest()"
            class="hover:scale-105 duration-300 ease-in-out text-white w-full justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Submit
          </button> -->

          <ButtonLoader
            :custom-class="'hover:scale-105 duration-300 ease-in-out text-white w-full justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700'"
            @click="prosesRequest"
            :loading="itemStore.isStoreLoading"
          >
            <template #title> Submit </template>
            <template #titleLoading> Loading... </template>
          </ButtonLoader>
          <button
            @click="cancel()"
            type="reset"
            class="hover:scale-105 duration-300 ease-in-out inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 -ml-1 sm:mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>

  <Teleport to="body">
    <NewUnitModal :show="showModalAddUnit" @close="showModalAddUnit = false"> </NewUnitModal>
  </Teleport>

  <Teleport to="body">
    <NewMerekModal :show="showModalAddMerek" @close="showModalAddMerek = false"> </NewMerekModal>
  </Teleport>
</template>

<script setup>
import { CubeIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";

import DotLoading from "@/components/loading/DotLoading.vue";
import ButtonLoader from "@/components/buttons/ButtonLoader.vue";
import InputCurrency from "@/components/input/InputCurrency.vue";

import { computed, nextTick, ref, watchEffect, defineAsyncComponent } from "vue";

import { useItemBrandStore } from "@/stores/itemBrand";
import { useItemUnitStore } from "@/stores/itemUnit";
import { useItemStore } from "@/stores/items";
import InputCurrencyVue from "@/components/input/InputCurrency.vue";

const porps = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const itemUnitStore = useItemUnitStore();
const itemBrandStore = useItemBrandStore();
const itemStore = useItemStore();
const userData = JSON.parse(localStorage.getItem("userData"));

const showModalAddUnit = ref(false);
const showModalAddMerek = ref(false);

const NewUnitModal = defineAsyncComponent(() => import("../modal/UnitModal.vue"));
const NewMerekModal = defineAsyncComponent(() => import("../modal/MerekModal.vue"));

const emit = defineEmits(["submit", "close"]);

let isActive = false;
let stopWatching = null;

function toggleWatchEffect() {
  if (isActive) {
    // menghentikan pemanggilan watchEffect
    stopWatching();
    isActive = false;
  } else {
    // memanggil kembali watchEffect
    stopWatching = watchEffect(() => {
      if (!itemStore.isStoreLoading) {
        emit("close");
        itemStore.$patch({
          currentData: {
            name: null,
            brand_id: 0,
            unit_id: 0,
            warehouse_id: 0,
            balance: 0,
            created_by: userData.id,
          },
        });
      }
    });
    isActive = true;
  }
}

async function prosesRequest() {
  itemStore.store();
  toggleWatchEffect();
}

function cancel() {
  emit("close");
}
</script>
