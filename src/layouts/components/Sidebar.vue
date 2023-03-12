<template>
  <aside
    id="logo-sidebar"
    class="fixed top-2 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-4">
        <li v-for="menu in listMenu" :key="menu.id">
          <template v-if="menu.child?.length > 0">
            <MenuButton
              @click="parentMenuClick(menu.id)"
              :has-child="true"
              :menu-id="menu.id"
              :active-id="currentMenu"
            >
              <template v-slot:leftIcon>
                <component :is="menu.icon"></component>
              </template>
              <template v-slot:text>
                {{ menu.name }}
              </template>
            </MenuButton>
            <ul
              :class="[currentMenu == menu.id ? '' : 'hidden']"
              class="py-2 space-y-2"
            >
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
          </template>
        </li>
      </ul>
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

// const index = computed(() => {
//   return listMenu.findIndex((d) => d.to == route.name)
// })

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
