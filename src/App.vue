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
  <component :is="layout">
    <router-view />
  </component>
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
