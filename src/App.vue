<script>
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  'dark',
  JSON.parse(localStorage.getItem('isDark'))
)

import LayoutFull from './layouts/LayoutFull.vue'
import LayoutContent from './layouts/LayoutContent.vue'

export default {
  components: {
    LayoutFull,
    LayoutContent,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout === 'layout-full') return 'layout-full'
      return 'layout-content'
    },
  },
}
</script>

<script setup>
import { onMounted } from 'vue'
import {
  // initAccordions,
  // initCarousels,
  // initCollapses,
  // initDials,
  // initDismisses,
  // initDrawers,
  initDropdowns,
  // initModals,
  // initPopovers,
  // initTabs,
  // initTooltips,
} from 'flowbite'

onMounted(() => {
  // initAccordions()
  // initCarousels()
  // initCollapses()
  // initDials()
  // initDismisses()
  // initDrawers()
  initDropdowns()
  // initModals()
  // initPopovers()
  // initTabs()
  // initTooltips()
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
