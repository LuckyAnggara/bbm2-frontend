<template>
  <aside
    id="logo-sidebar"
    class="fixed top-2 left-0 z-40 w-64 h-full pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 xl:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
      <ul class="space-y-4">
        <li v-for="menu in listMenu" :key="menu.id">
          <template v-if="menu.child?.length > 0">
            <MenuButton @click="parentMenuClick(menu.id)" :has-child="true" :menu-id="menu.id" :active-id="currentMenu">
              <template v-slot:leftIcon>
                <component :is="menu.icon"></component>
              </template>
              <template v-slot:text>
                {{ menu.name }}
              </template>
            </MenuButton>
            <ul :class="[currentMenu == menu.id ? '' : 'hidden']" class="py-2 space-y-2">
              <li v-for="childMenu in menu.child" :key="childMenu.id">
                <ChildMenuButton :menu-id="childMenu.id" :active-id="currentChildMenu" @click="childMenuClick(menu.id, childMenu.id)" :nav-name="childMenu.to">
                  <template v-slot:leftIcon>
                    <component :is="childMenu.icon"></component>
                  </template>
                  <template v-slot:text>
                    {{ childMenu.name }}
                  </template>
                </ChildMenuButton>
              </li>
            </ul>
          </template>
          <template v-else>
            <MenuButton :has-child="false" :menu-id="menu.id" :active-id="currentMenu" @click="parentMenuClick(menu.id)" :nav-name="menu.to">
              <template v-slot:leftIcon>
                <component :is="menu.icon"></component>
              </template>
              <template v-slot:text>
                {{ menu.name }}
              </template>
            </MenuButton>
          </template>
        </li>
      </ul>
      <Transition name="slide-fade">
        <div id="dropdown-cta" class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-700 mb-4" role="alert" v-show="showTips">
          <div class="flex items-center mb-3">
            <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Info</span>
            <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
              data-dismiss-target="#dropdown-cta"
              aria-label="Close"
              @click="showTips = false"
            >
              <span class="sr-only">Close</span>
              <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <p class="mb-3 text-sm text-blue-800 dark:text-blue-400 text-justify">
            Lakukan <strong>Double Click</strong> pada kolom harga untuk memunculkan semua harga jual untuk barang yang dipilih
          </p>
          <a class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#"
            >Turn new navigation off</a
          >
        </div>
      </Transition>
    </div>
  </aside>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import MenuButton from '../../components/buttons/MenuButton.vue'
import ChildMenuButton from '../../components/buttons/ChildMenuButton.vue'
import { menu } from '../../router/menu'
import { useRoute } from 'vue-router'

import { initDropdowns } from 'flowbite'

const listMenu = reactive(menu)
const route = useRoute()
const openSideBar = JSON.parse(localStorage.getItem('openSideBar'))

const showTips = ref(true)

const currentMenu = ref(0)
const currentChildMenu = ref(99)

function childMenuClick(parentId, childId) {
  currentMenu.value = parentId
  currentChildMenu.value = childId
}

function parentMenuClick(parentId) {
  currentMenu.value = parentId
  currentChildMenu.value = 99
}

onMounted(() => {
  initDropdowns()
})
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
