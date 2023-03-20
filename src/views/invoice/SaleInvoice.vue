<template>
  <div
    class="w-full flex flex-col justify-center sm:px-56 px-12 py-6 space-y-6"
  >
    <div
      class="w-full rounded-xl py-20 px-20 shadow-md flex flex-col space-y-12 bg-white dark:bg-gray-800 dark:text-white"
    >
      <!-- Header -->
      <section>
        <div class="flex justify-between mb-4">
          <div class="flex flex-col">
            <span class="dark:text-white text-black text-3xl font-bold"
              >Invoice #04456</span
            >
            <span class="dark:text-gray-400 text-gray-800 mt-2"
              >16 Maret 2023</span
            >
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
              >Pelanggan
            </span>
            <span
              class="dark:text-gray-400 text-gray-800 mt-2 text-ellipsis break-words italic"
              >Jalan Limbangan Timur No 12312312 RT 02 Rw 02</span
            >
            <span
              class="dark:text-gray-400 text-gray-800 text-ellipsis break-words italic"
              >Handphone 239239</span
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
                v-for="i in 3"
                :key="i"
                class="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-black text-base"
              >
                <th scope="row" class="px-6 py-6 font-semibold">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-6">2</td>
                <td class="px-6 py-6">Rp. 50.000</td>
                <td class="px-6 py-6">Rp. 0</td>
                <td class="px-6 py-6">Rp. 100.000</td>
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
            class="flex justify-between dark:text-gray-400 text-gray-600 w-80"
          >
            <ul class="space-y-2 text-left">
              <li>SUBTOTAL</li>
              <li>DISKON</li>
              <li>PAJAK (11%)</li>
              <li>ONGKOS KIRIM</li>
              <li class="dark:text-white text-black text-lg font-medium">
                TOTAL
              </li>
            </ul>

            <ul class="space-y-2 text-right">
              <li>Rp. 100.000,-</li>
              <li>Rp. 100.000,-</li>
              <li>Rp. 100.000,-</li>
              <li>Rp. 100.000,-</li>
              <li class="dark:text-white text-black text-lg font-medium">
                Rp. 100.000.000,-
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="space-x-2 place-self-end">
      <button
        type="button"
        class="duration-300 ease-in-out hover:-translate-y-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <PrinterIcon class="w-5 h-5 mr-2" />
        Print
      </button>

      <button
        type="button"
        class="duration-300 ease-in-out hover:-translate-y-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        <PrinterIcon class="w-5 h-5 mr-2" />
        LX Print
      </button>
    </div>
  </div>
</template>

<script setup>
import { PrinterIcon } from '@heroicons/vue/24/outline'
</script>
