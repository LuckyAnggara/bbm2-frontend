<template>
  <aside
    id="logo-sidebar"
    :class="layoutStore.isSideBarShow == true ? '' : '-translate-x-full xl:translate-x-0 '"
    @mouseleave="layoutStore.isSideBarShow = false"
    class="fixed top-2 left-0 z-40 sm:w-64 w-16 h-full pt-20 transition-all bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
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
              <template v-slot:text> {{ menu.name }} </template>
            </MenuButton>
            <ul :class="[currentMenu == menu.id ? '' : 'hidden']" class="py-2 space-y-2">
              <li v-for="childMenu in menu.child" :key="childMenu.id">
                <ChildMenuButton
                  :menu-id="childMenu.id"
                  :active-id="currentChildMenu"
                  @click="childMenuClick(menu.id, childMenu.id)"
                  :nav-name="childMenu.to"
                >
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
            <div v-if="menu.name == '-'">
              <hr />
            </div>
            <div v-else>
              <MenuButton
                :has-child="false"
                :menu-id="menu.id"
                :active-id="currentMenu"
                @click="parentMenuClick(menu.id)"
                :nav-name="menu.to"
              >
                <template v-slot:leftIcon>
                  <component :is="menu.icon"></component>
                </template>
                <template v-slot:text>
                  {{ menu.name }}
                </template>
              </MenuButton>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import MenuButton from "@/components/buttons/MenuButton.vue";
import ChildMenuButton from "@/components/buttons/ChildMenuButton.vue";
import { menu } from "@/router/menu";
import { useRoute } from "vue-router";

import { initDropdowns } from "flowbite";
import { useLayoutStore } from "@/stores/layout";

const listMenu = reactive(menu);
const route = useRoute();
const openSideBar = JSON.parse(localStorage.getItem("openSideBar"));
const layoutStore = useLayoutStore();

const showTips = ref(true);

function cek() {
  console.info("aa");
}

const currentMenu = ref(0);
const currentChildMenu = ref(99);

function childMenuClick(parentId, childId) {
  currentMenu.value = parentId;
  currentChildMenu.value = childId;
}

function parentMenuClick(parentId) {
  currentMenu.value = parentId;
  currentChildMenu.value = 99;
}

onMounted(() => {
  initDropdowns();
});
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
