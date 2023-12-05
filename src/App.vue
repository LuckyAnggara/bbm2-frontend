<script setup>
import LayoutFull from "@/layouts/LayoutFull.vue";
import LayoutContent from "@/layouts/LayoutContent.vue";
import { TransitionSlide } from "@morev/vue-transitions";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "layout-content") return LayoutContent;
  return LayoutFull;
});
</script>

<template>
  <TransitionSlide mode="out-in" :duration="500">
    <!-- <div v-if="isLoading" class="flex h-screen items-center justify-center">
      <Logo :size="'w-64 h-64'" :animated="true" class="dark:bg-black bg-white" :is-dark="styleStore.darkMode" />
    </div> -->
    <component :is="layout">
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
