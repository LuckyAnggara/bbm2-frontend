<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Sidebar, Header, Main, Footer },
}
</script>

<template>
  <div class="md:flex flex-col justify-between bg-white dark:bg-gray-900">
    <Sidebar />
    <Header />
    <Main />
    <Footer />
  </div>
</template>
