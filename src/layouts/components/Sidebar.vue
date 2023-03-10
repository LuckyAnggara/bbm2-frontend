<template>
  <aside
    id="logo-sidebar"
    class="fixed top-2 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-4">
        <li v-for="menu in listMenu" :key="menu.id">
          <MenuButton
            :menu-id="menu.id"
            :active-id="currentMenu"
            @click="currentMenu = menu.id"
            :nav-name="menu.to"
          >
            <template v-slot:icon>
              <component :is="menu.icon"></component>
            </template>
            <template v-slot:text> {{ menu.name }} </template>
          </MenuButton>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import MenuButton from '../../components/buttons/MenuButton.vue'
import { menu } from '../../router/menu'
import { useRoute } from 'vue-router'

const listMenu = reactive(menu)
const route = useRoute()

// const index = computed(() => {
//   return listMenu.findIndex((d) => d.to == route.name)
// })

const currentMenu = ref(0)
</script>
