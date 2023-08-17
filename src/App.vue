<script>
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  'dark',
  JSON.parse(localStorage.getItem('isDark'))
)

import LayoutFull from './layouts/LayoutFull.vue'
import LayoutContent from './layouts/LayoutContent.vue'
import Logo from './components/Logo.vue'
import { TransitionSlide } from '@morev/vue-transitions'
import { onMounted } from 'vue'

// initialize components based on data attribute selectors

export default {
  data() {
    return {
      isLoading: true,
      isDark: JSON.parse(localStorage.getItem('isDark')),
      openSideBar: JSON.parse(localStorage.getItem('openSideBar')),
    }
  },
  components: {
    LayoutFull,
    LayoutContent,
    TransitionSlide,
    Logo,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout === 'layout-full') return 'layout-full'
      return 'layout-content'
    },
  },
  created() {
    // Melakukan proses loading di sini
    setTimeout(() => {
      this.isLoading = false
    }, 1000) // contoh waktu loading selama 3 detik
  },
}
</script>

<template>
  <TransitionSlide mode="out-in" :duration="500">
    <div v-if="isLoading" class="flex h-screen items-center justify-center">
      <Logo
        :size="'w-64 h-64'"
        :animated="true"
        class="dark:bg-black bg-white"
        :is-dark="isDark"
      />
    </div>

    <component v-else :is="layout">
      <router-view />
    </component>
  </TransitionSlide>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
