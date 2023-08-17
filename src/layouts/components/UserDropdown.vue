<template>
  <Menu
    as="div"
    class="flex text-sm dark:bg-gray-800 bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-2.5"
  >
    <div>
      <template v-if="authStore.isLoading">
        <CircleLoading title="Logging Out" />
      </template>
      <template v-else>
        <MenuButton
          class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </MenuButton>
      </template>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute w-52 right-10 top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3" role="none">
          <p class="text-sm px-1 text-gray-900 dark:text-white" role="none">
            Lucky Anggara
          </p>
          <p
            class="px-1 text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            Cashier
          </p>
        </div>
        <div class="px-1 py-1">
          <MenuItem>
            <button
              class="text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full"
            >
              Dashboard
            </button>
          </MenuItem>
          <MenuItem>
            <button
              class="text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full"
            >
              Setting
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem>
            <button
              class="text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '../../stores/Auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import CircleLoading from '../../components/loading/CircleLoading.vue'
const toast = useToast()

const router = useRouter()
const authStore = useAuthStore()

async function logout() {
  toast.info('Logging out in progress', {
    id: 'logout',
    position: 'bottom-right',
    timeout: false,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
  setTimeout(async () => {
    const success = await authStore.logout()
    if (success) {
      toast.dismiss('logout')
      router.push({ name: 'login' })
    }
  }, 1000)
}
</script>
