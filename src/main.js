import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './assets/style.css'
import App from './App.vue'
import router from './router/index'
import axiosIns from './services/axios'

const pinia = createPinia()
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.config.globalProperties.axios = axiosIns
app.use(router)
app.use(pinia)

app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})
app.mount('#app')
