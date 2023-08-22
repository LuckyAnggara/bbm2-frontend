<template>
  <Menu
    v-slot="{ open }"
    as="div"
    class="text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 h-12"
  >
    <MenuButton @click="getData(open)" as="button" class="relative inline-flex items-center">
      <span class="sr-only">Notification </span>
      <BellIcon class="w-6 h-6" />
      <div
        v-if="notificationStore.unread > 0"
        class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-800"
      >
        {{ notificationStore.unread }}
      </div>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-20 top-16 max-w-sm md:w-full text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-lg"
      >
        <div
          class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded-t-lg"
        >
          Notifications
        </div>
        <template v-if="notificationStore.isLoading">
          <div class="py-4">
            <CircleLoading />
          </div>
        </template>
        <template v-else>
          <MenuItem v-slot="{ active }" v-for="item in notificationStore.items" :key="item.id">
            <a
              :active="active"
              @click="openNotif(item)"
              class="cursor-pointer flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div class="flex-shrink-0">
                <a
                  class="text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800"
                >
                  <UserIcon class="w-5 h-5" />

                  <span class="sr-only">Icon description</span>
                </a>
              </div>
              <div class="pl-3 w-full">
                <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  {{ item.message }}
                </div>
                <div class="text-xs font-medium text-primary-600 dark:text-primary-500">
                  {{ moment(item.created_at).fromNow() }}
                </div>
              </div>

              <span
                v-if="item.status == 'unread'"
                class="bg-red-100 h-5 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-400 border border-red-400 inline-flex items-center justify-center"
                >Unread</span
              >

              <span
                v-else
                class="bg-green-100 h-5 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-green-400 border border-green-400 inline-flex items-center justify-center"
                >Read</span
              >
            </a>
          </MenuItem>
        </template>

        <a
          href="#"
          class="rounded-b-lg block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
        >
          <div class="inline-flex items-center">
            <svg
              aria-hidden="true"
              class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            View all
          </div>
        </a>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { BellIcon, UserIcon } from "@heroicons/vue/24/solid";

import { useNotificationStore } from "../../stores/notification";
import { onMounted, ref } from "vue";
import CircleLoading from "../../components/loading/CircleLoading.vue";
import _ from "lodash";
import { useRouter } from "vue-router";

const notificationStore = useNotificationStore();
const router = useRouter();

// Throttle pemanggilan data setiap 10 detik
async function openNotif(item) {
  console.info(item.link);
  await router.push({ path: item.link });

  if (item.status == "unread") {
    await notificationStore.update(item);
  }
}

function getData(x) {
  if (x == false) {
    notificationStore.getData();
  }
}

onMounted(() => {
  notificationStore.getUnread();
  // setInterval(() => {
  // }, 1000)
});
</script>
