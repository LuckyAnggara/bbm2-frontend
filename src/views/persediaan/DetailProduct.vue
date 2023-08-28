<template>
  <div class="px-2 sm:px-0 justify-center flex flex-col transition-all duration-300 ease-in-out">
    <template v-if="itemStore.singleResponses">
      <TabGroup @change="changeTab">
        <div class="flex md:flex-row flex-col-reverse justify-between w-full">
          <TabList class="md:w-96 flex space-x-1 rounded-md shadow-sm bg-white py-1 px-2 dark:bg-gray-800">
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
                :disabled="!canSubmit"
                :class="!canSubmit ? 'cursor-not-allowed' : 'duration-300 hover:scale-105 transition'"
                @click="update"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <FolderArrowDownIcon class="h-4 w-4 mr-2" />

                Update
              </button>
            </div>
          </div>
          <hr class="py-2" />
          <TabPanel>
            <div class="max-w-lg">
              <div class="grid gap-2 sm:grid-cols-2 sm:gap-4 duration-300 ease-in-out transition-all">
                <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Product Name <span v-if="isEdit" class="text-red-500">*</span></label
                  >
                  <input
                    :disabled="!isEdit"
                    v-model="itemStore.singleResponses.name"
                    type="text"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="kode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Kode / SKU</label
                  >
                  <input
                    :disabled="!isEdit"
                    v-model="itemStore.singleResponses.sku"
                    type="text"
                    id="kode"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Auto"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                  <input
                    :disabled="!isEdit"
                    v-model="itemStore.singleResponses.brand"
                    type="text"
                    id="brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter product brand"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Category <span v-if="isEdit" class="text-red-500">*</span></label
                  >
                  <DotLoading v-if="itemCategoryStore.isLoading" />
                  <div
                    v-else
                    :class="isEdit ? 'flex flex-row space-x-2' : ''"
                    class="duration-300 transition ease-in-out"
                  >
                    <select
                      :disabled="!isEdit"
                      v-model="itemStore.singleResponses.category_id"
                      id="category"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option v-for="item in itemCategoryStore.items" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                    <button
                      v-if="isEdit"
                      type="button"
                      @click="showModalAddCategory = true"
                      class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <PlusIcon class="h-5" />
                    </button>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Unit <span v-if="isEdit" class="text-red-500">*</span></label
                  >
                  <DotLoading v-if="itemUnitStore.isLoading" />
                  <div
                    v-else
                    :class="isEdit ? 'flex flex-row space-x-2' : ''"
                    class="duration-300 transition ease-in-out"
                  >
                    <select
                      :disabled="!isEdit"
                      v-model="itemStore.singleResponses.unit_id"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0" disabled>Pilih satuan product</option>
                      <option v-for="item in itemUnitStore.items" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                    <button
                      v-if="isEdit"
                      type="button"
                      @click="showModalAddUnit = true"
                      class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <PlusIcon class="h-5" />
                    </button>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Description</label
                  >
                  <textarea
                    :disabled="!isEdit"
                    v-model="itemStore.singleResponses.description"
                    id="description"
                    rows="5"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                <!-- 
                <div class="sm:col-span-2">
                  <label
                    for="image"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Image</label
                  >
                  <FileUpload
                    v-model="itemStore.currentData.image"
                    :id="'image'"
                  />
                </div> -->
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="flex flex-col md:flex-row md:space-x-8 md:divide-x-2">
              <div class="md:w-1/2 min-w-md">
                <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
                  <div class="flex flex-col space-y-4 sm:col-span-2">
                    <div>
                      <input
                        :disabled="!isEdit"
                        v-model="itemStore.singleResponses.iBuy"
                        id="beli-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="beli-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Saya Beli Product Ini</label
                      >
                    </div>
                    <div
                      v-if="itemStore.singleResponses.iBuy"
                      class="duration-300 ease-in-out transition-all grid gap-2 md:grid-cols-3 sm:grid-cols-2 md:gap-4 sm:gap-2"
                    >
                      <div class="md:col-span-2">
                        <label for="beli-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Harga Beli Satuan</label
                        >
                        <InputCurrency
                          :disabled="!isEdit"
                          v-model="itemStore.singleResponses.buying_price"
                          id="beli-satuan"
                          :options="{ currency: 'IDR' }"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Rp. 0"
                        />
                      </div>
                      <div>
                        <label for="beli-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Pajak Beli</label
                        >
                        <DotLoading v-if="taxStore.isLoading" />
                        <select
                          :disabled="!isEdit"
                          v-model="itemStore.singleResponses.buying_tax_id"
                          v-else
                          id="beli-pajak"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option v-for="item in taxStore.items" :key="item.id" :value="item.id">
                            {{ item.name }} ({{ item.value * 100 }}%)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-4 sm:col-span-2">
                    <div>
                      <input
                        :disabled="!isEdit"
                        v-model="itemStore.singleResponses.iSell"
                        id="jual-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="jual-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Saya Jual Product Ini</label
                      >
                    </div>
                    <div
                      v-if="itemStore.singleResponses.iSell"
                      class="duration-300 ease-in-out transition-all grid gap-2 md:grid-cols-3 sm:grid-cols-2 md:gap-4 sm:gap-2"
                    >
                      <div class="md:col-span-2">
                        <label for="jual-satuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Harga Jual Satuan</label
                        >
                        <InputCurrency
                          :disabled="!isEdit"
                          v-model="itemStore.singleResponses.selling_price"
                          id="jual-satuan"
                          :options="{ currency: 'IDR' }"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Rp. 0"
                        />
                      </div>
                      <div>
                        <label for="jual-pajak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Pajak Jual</label
                        >
                        <DotLoading v-if="taxStore.isLoading" />

                        <select
                          v-else
                          :disabled="!isEdit"
                          v-model="itemStore.singleResponses.selling_tax_id"
                          id="jual-pajak"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option v-for="item in taxStore.items" :key="item.id" :value="item.id">
                            {{ item.name }} ({{ item.value * 100 }}%)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- PERSEDIAAN AWAL -->

                  <div class="flex flex-col space-y-4 sm:col-span-2"></div>
                </div>
              </div>
              <div class="md:w-1/2 min-w-md md:px-6">
                <div
                  class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
                >
                  <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2">
                      <a
                        @click="priceStateShow = 'sell'"
                        :class="
                          priceStateShow == 'sell'
                            ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                            : ''
                        "
                        class="cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >Daftar Harga Jual</a
                      >
                    </li>
                    <li class="mr-2">
                      <a
                        @click="priceStateShow = 'buy'"
                        :class="
                          priceStateShow == 'buy'
                            ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                            : ''
                        "
                        class="cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >Daftar Harga Beli</a
                      >
                    </li>
                  </ul>
                </div>
                <div v-if="priceStateShow == 'sell'" class="mt-4">
                  <div class="overflow-x-auto">
                    <table
                      class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto table-striped"
                    >
                      <thead
                        class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
                      >
                        <tr>
                          <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                          <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">
                            Tanggal
                          </th>
                          <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">Debit</th>
                          <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">
                            kredit
                          </th>
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
                  <small class="mt-3 text-grey-800 dark:text-gray-500"
                    ><i>Klik link biru untuk melihat Invoice</i></small
                  >
                </div>
                <div v-if="priceStateShow == 'buy'" class="mt-4">
                  <div class="overflow-x-auto">
                    <table
                      class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto table-striped"
                    >
                      <thead
                        class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
                      >
                        <tr>
                          <th scope="col" class="px-2 py-2 w-1 border border-slate-400 dark:border-slate-600">No</th>
                          <th scope="col" class="px-4 py-2 w-12 border border-slate-400 dark:border-slate-600">
                            Tanggal
                          </th>
                          <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">Debit</th>
                          <th scope="col" class="px-4 py-2 w-8 border border-slate-400 dark:border-slate-600">
                            kredit
                          </th>
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
                  <small class="mt-3 text-grey-800 dark:text-gray-500"
                    ><i>Klik link biru untuk melihat Invoice</i></small
                  >
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <form class="max-w-lg" autocomplete="off">
              <div class="items-start mb-4 space-y-4 grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div class="flex flex-col space-y-4 sm:col-span-2">
                  <div>
                    <input
                      :disabled="!isEdit"
                      v-model="itemStore.currentData.notification_qty"
                      id="notification-check"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="notification-check" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Notifikasi batas minimum</label
                    >
                  </div>
                  <div v-if="itemStore.currentData.notification_qty" class="duration-300 ease-in-out transition-all">
                    <div>
                      <label for="notification-qty" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Batas minimum</label
                      >
                      <input
                        :disabled="!isEdit"
                        type="text"
                        id="notification-qty"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Batas minimum persediaan"
                        v-model="itemStore.currentData.qty_minimum"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </TabPanel>

          <hr class="mt-4 py-2" />
          <small class="italic text-right block"
            >Last edit
            {{ moment(itemStore.singleResponses.updated_at).format("DD MMMM YYYY H:mm:ss") }}
          </small>
        </TabPanels>
      </TabGroup>
    </template>
    <template v-else-if="itemStore.isLoading">
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
      <NewUnitModal :show="showModalAddUnit" @close="showModalAddUnit = false"> </NewUnitModal>
    </Teleport>

    <Teleport to="body">
      <NewCategoryModal :show="showModalAddCategory" @close="showModalAddCategory = false"> </NewCategoryModal>
    </Teleport>

    <Teleport to="body">
      <LoadingModal :show="itemStore.isUpdateLoading">Processing transaction</LoadingModal>
    </Teleport>

    <Teleport to="body">
      <SuccessModal :show="itemStore.isTransactionSuccess" :type="'success'"
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
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, inject, nextTick, onMounted, ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import FileUpload from "../../components/FileUpload.vue";
import HeadlessMenu from "../../components/menu/HeadlessMenu.vue";
import { useTaxDetailStore } from "../../stores/taxDetail";
import { useItemUnitStore } from "../../stores/itemUnit";
import { useItemStore } from "../../stores/items";
import {
  ArchiveBoxIcon,
  FolderArrowDownIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

import DotLoading from "../../components/loading/DotLoading.vue";
import { useItemCategoryStore } from "../../stores/itemCategory";

import InputCurrency from "../../components/input/InputCurrency.vue";
import { IDRCurrency } from "../../utilities/formatter";
import LoadingModal from "../../components/modal/LoadingModal.vue";
import SuccessModal from "../../components/modal/SuccessModal.vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import CircleLoading from "../../components/loading/CircleLoading.vue";
import { useItemMutationStore } from "../../stores/itemMutation";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");

const NewUnitModal = defineAsyncComponent(() => import("./modal/UnitModal.vue"));
const NewCategoryModal = defineAsyncComponent(() => import("./modal/CategoryModal.vue"));

const taxStore = useTaxDetailStore();
const itemStore = useItemStore();
const itemUnitStore = useItemUnitStore();
const itemCategoryStore = useItemCategoryStore();
const itemMutationStore = useItemMutationStore();
const priceStateShow = ref("sell");

const showModalAddUnit = ref(false);
const showModalAddCategory = ref(false);
const activeTab = ref(0);
const isEdit = ref(false);
const tabs = ref([
  { id: 1, label: "Info" },
  { id: 2, label: "Price & Stock" },
  { id: 3, label: "Setting" },
]);
const actionMenu = [
  {
    function: editMode,
    label: "Edit",
    icon: PencilSquareIcon,
  },
  {
    function: itemStore.clearData,
    label: "Archive",
    icon: ArchiveBoxIcon,
  },
  {
    function: deleteData,
    label: "Hapus",
    icon: TrashIcon,
  },
];

function changeTab(index) {
  activeTab.value = index;
}
function closeModal() {
  isEdit.value = !isEdit.value;
  itemStore.isTransactionSuccess = false;
}
function editMode() {
  isEdit.value = true;
}
function cancelEdit() {
  itemStore.copyOriginalSingleResponses();
  isEdit.value = !isEdit.value;
}
function deleteData(item) {
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
      await itemStore.destroy(itemStore.singleResponses.id, false);
      router.push({ name: "list-product" });
    },
    allowOutsideClick: () => !itemStore.isDestroyLoading,
    backdrop: true,
  });
}
function update() {
  if (canSubmit.value) {
    itemStore.update(false);
  } else {
    toast.error("Incomplete Product Information", {
      timeout: 2000,
      position: "top-center",
    });
  }
}

const canSubmit = computed(() => {
  const item = itemStore.singleResponses;
  if (
    item.name == null ||
    item.name === "" ||
    item.category_id == null ||
    item.category_id === "" ||
    item.unit_id == null ||
    item.unit_id === 0
  ) {
    return false;
  }
  return true;
});

const sku = computed(() => {
  return route.params.sku ?? null;
});

onMounted(async () => {
  taxStore.getData();
  itemUnitStore.getData();
  itemCategoryStore.getData();

  if (itemStore.singleResponses == null) {
    await itemStore.showData(sku.value);
    await nextTick();
    itemMutationStore.getData(itemStore.singleResponses.id);
  }
});
</script>
