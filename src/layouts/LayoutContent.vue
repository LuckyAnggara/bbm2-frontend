<script setup>
import Rightbar from "./components/Rightbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="md:flex flex-col justify-between bg-white dark:bg-gray-900">
    <Sidebar />
    <Header />
    <Main />
    <Rightbar />
  </div>
</template>
