import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";
import { nextTick } from "vue";
import { getActivePinia } from "pinia";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    form: {
      username: "demo",
      password: "12345678",
    },
    userData: null,
  }),
  getters: {
    user(state) {
      return state.userData;
    },
  },
  actions: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axiosIns.post(`/login`, {
          username: this.form.username,
          password: this.form.password,
        });
        const payload = response.data.data;

        localStorage.removeItem("userData");
        localStorage.setItem("token", JSON.stringify(payload.token));
        localStorage.setItem("userData", JSON.stringify(payload));
        this.userData = payload.user;

        if (response.status == 200) {
          return true;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async logout() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/logout`);
        if (response.status == 200) {
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
          localStorage.clear();

          const pinia = getActivePinia();

          pinia._s.forEach((store) => {
            if (store.$id !== "auth" && store.$id !== "style") {
              console.info(store);
              store.$reset();
            }

            // store.$reset();
          });
          setTimeout(() => {}, 500);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },
    isLoggedIn() {
      const user = localStorage.getItem("userData");
      if (user) {
        this.userData = JSON.parse(user);
        return true;
      }
      return false;
    },
  },
});
