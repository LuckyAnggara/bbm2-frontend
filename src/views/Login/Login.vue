<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="mt-12 flex flex-col items-center">
          <div class="w-full flex-1 mt-8">
            <div class="flex flex-col items-center">
              <button
                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                <div class="bg-white p-2 rounded-full">
                  <svg class="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span class="ml-4"> Sign In with Google </span>
              </button>
            </div>

            <div class="my-12 border-b text-center">
              <div
                class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
              >
                Or sign In with Credential User
              </div>
            </div>

            <div class="mx-auto max-w-xs">
              <input
                v-model="authStore.form.username"
                autocomplete="off"
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Username"
              />
              <div class="relative">
                <input
                  id="password"
                  v-model="authStore.form.password"
                  :type="showPassword == true ? 'text' : 'password'"
                  name="password"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  placeholder="Password"
                  required=""
                />
                <span class="absolute right-2.5 bottom-4 text-gray-300">
                  <EyeSlashIcon
                    v-if="showPassword == true"
                    title="Hide Password"
                    class="cursor-pointer w-6 h-6"
                    @click="showPassword = false"
                  />
                  <EyeIcon v-else title="Show Password" class="cursor-pointer w-6 h-6" @click="showPassword = true" />
                </span>
              </div>

              <button
                @click="login"
                :disabled="authStore.isLoading"
                class="text-white mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <template v-if="authStore.isLoading">
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </template>
                <template v-else>
                  <span class=""> Sign In </span>
                </template>
              </button>
              <p class="mt-2 text-xs text-gray-600 text-center">
                I agree to abide by the
                <a href="#" class="border-b border-gray-500 border-dotted"> Terms of Service </a>
                and
                <a href="#" class="border-b border-gray-500 border-dotted"> Privacy Policy </a>
              </p>
              <img src="@/assets/logo.png" class="mx-auto h-24 mt-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 bg-blue-100 text-center hidden lg:flex">
        <div class="bg-contain bg-center bg-no-repeat mx-auto my-auto">
          <img src="@/assets/logo_light_2.png" class="w-mx-auto my-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "vue-router";

const showPassword = ref(false);
const router = useRouter();
const authStore = useAuthStore();

async function login() {
  const success = await authStore.login();
  if (success) {
    router.push({ name: "dashboard" });
  }
}
</script>
