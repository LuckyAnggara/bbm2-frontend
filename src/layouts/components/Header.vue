<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <!-- :class="[
      !versionStore.isOnline
        ? 'dark:bg-red-500 bg-red-500 border-red-200 dark::border-red-500'
        : 'bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    ]" -->
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex xl:hidden items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="https://flowbite.com" class="flex ml-2 md:mr-24">
            <Logo size="w-8 h-8" class="mr-2" />

            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{{
              authStore.userData?.branch?.name ?? ""
            }}</span>
          </a>
        </div>

        <div class="flex items-center">
          <div class="flex items-center">
            <div>
              <button
                @click="isDark = !isDark"
                type="button"
                class="text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 h-12"
              >
                <MoonIcon v-if="!isDark" class="w-6 h-6" />
                <SunIcon v-else class="w-6 h-6" />
              </button>
            </div>
            <NotificationBar />
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import UserDropdown from "./UserDropdown.vue";
import NotificationBar from "./NotificationBar.vue";
import Logo from "@/components/Logo.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
// import { useVersionStore } from '@/stores/version'
const toast = useToast();

const router = useRouter();
const authStore = useAuthStore();
// const versionStore = useVersionStore()
const isDark = ref(localStorage.getItem("isDark") || false);
const openSideBar = ref(localStorage.getItem("openSideBar") || true);
// const isDark = computed(() => {
//   return localStorage.getItem('isDark')
// })

watch(isDark, (newX) => {
  localStorage.setItem("isDark", JSON.stringify(newX));
  document.documentElement.classList.toggle("dark", JSON.parse(localStorage.getItem("isDark")));
});

watch(openSideBar, (newX) => {
  localStorage.setItem("openSideBar", JSON.stringify(newX));
});

async function logout() {
  toast.info("Logging out in progress", {
    id: "logout",
    position: "top-right",
    timeout: false,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
  setTimeout(async () => {
    const success = await authStore.logout();
    if (success) {
      toast.dismiss("logout");
      router.push({ name: "login" });
    }
  }, 5000);
}

// onBeforeMount(() => {
//   versionStore.get() // <div>
// })
</script>
