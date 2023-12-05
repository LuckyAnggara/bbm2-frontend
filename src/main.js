import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router/index";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "@sweetalert2/themes/dark/dark.css";
import axiosIns from "./services/axios";
import { darkModeKey, styleKey } from "@/config.js";

import FloatingVue from "floating-vue";
FloatingVue.options.themes.tooltip.disabled = window.innerWidth <= 768;

import "floating-vue/dist/style.css";
import { useStyleStore } from "./stores/style";

moment.locale("id");

const pinia = createPinia();
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.config.globalProperties = {
  moment: moment,
};

app.use(router);
app.use(pinia);
app.use(autoAnimatePlugin);
app.use(VueSweetalert2);
app.use(FloatingVue);

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.mount("#app");

const styleStore = useStyleStore(pinia);

/* Dark mode */
if (
  (!localStorage[darkModeKey] && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(false);
}

/* Default title tag */
const defaultDocumentTitle = "Easy Counting";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} — ${defaultDocumentTitle}` : defaultDocumentTitle;
});
