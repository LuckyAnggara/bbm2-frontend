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
      password: "123456",
    },
    isUpdateLoading: false,
    isLoading: false,
    user: null,
  }),
  getters: {
    userData(state) {
      return state.user;
    },
    guest() {
      const storageItem = window.localStorage.getItem("guest");
      if (!storageItem) return false;
      if (storageItem === "isGuest") return true;
      if (storageItem === "isNotGuest") return false;
    },
  },
  actions: {
    async login() {
      this.isLoading = true;
      try {
        const resp = await axiosIns.post(`/login`, {
          username: this.form.username,
          password: this.form.password,
        });
        if (resp.status == 201) {
          localStorage.setItem("token", resp.data.token);
          axiosIns.defaults.headers.common["Authorization"] = `Bearer ${resp.data.token}`;
          return true;
        }
      } catch (error) {
        return false;
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async logout() {
      this.isLoading = true;
      try {
        const response = await axiosIns.post(`/logout`);
        if (response.status == 200) {
          this.user = null;
          localStorage.removeItem("token");
          const pinia = getActivePinia();
          pinia._s.forEach((store) => {
            if (store.$id !== "auth" && store.$id !== "style") {
              store.$reset();
            }
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async getAuthUser() {
      try {
        const respo = await axiosIns.get(`/auth/user`);
        this.user = respo.data;
        return respo.data;
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    isLoggedIn() {
      const user = localStorage.getItem("userData");
      if (user) {
        this.userData = JSON.parse(user).user;
        return true;
      }
      return false;
    },
  },
});
