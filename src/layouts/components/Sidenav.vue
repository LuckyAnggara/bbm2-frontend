<template>
  <aside
    id="logo-sidebar"
    :class="
      layoutStore.isSideBarShow == true ? '-translate-x-full sm:translate-x-0' : '-translate-x-full lg:translate-x-0 '
    "
    @mouseleave="layoutStore.isSideBarShow = false"
    class="fixed top-2 left-0 z-40 w-64 h-full pt-20 transition-all bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
      <ul class="space-y-2">
        <li v-for="(menu, index) in listMenu" :key="index">
          <template v-if="!menu.child?.length > 0">
            <router-link
              class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              :to="{ name: menu.to }"
            >
              <div
                class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              >
                <component :is="menu.icon"></component>
              </div>

              <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ menu.name }}</span>
            </router-link>
          </template>
          <template v-else>
            <button
              type="button"
              class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              :data-collapse-toggle="`dropdown-pages-${index}`"
            >
              <div
                class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              >
                <component :is="menu.icon"></component>
              </div>

              <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ menu.name }}</span>
              <ChevronDownIcon class="h-6 w-6" />
            </button>

            <ul :id="`dropdown-pages-${index}`" class="hidden py-2 space-y-2">
              <li v-for="(child, indexChild) in menu.child" :key="indexChild">
                <router-link
                  :to="{ name: child.to }"
                  class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >{{ child.name }}</router-link
                >
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
    <div
      class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700"
    >
      <a
        href="#"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
          ></path>
        </svg>
      </a>
      <a
        href="#"
        data-tooltip-target="tooltip-settings"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
      <div
        id="tooltip-settings"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Settings page
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { initCollapses } from "flowbite";
import { reactive, ref, onMounted } from "vue";
import ChildMenuButton from "../../components/buttons/ChildMenuButton.vue";
import { menu } from "../../router/menu";
import { useRoute } from "vue-router";
import { useLayoutStore } from "../../stores/layout";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const listMenu = reactive(menu);
const route = useRoute();
const layoutStore = useLayoutStore();

// initialize components based on data attribute selectors
onMounted(() => {
  initCollapses();
  initDropdowns();
});
</script>
