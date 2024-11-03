import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "./auth";
const userData = JSON.parse(localStorage.getItem("userData"));
const toast = useToast();
// ITEM STORE
export const useItemCategoryStore = defineStore("itemCategoryStore", {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      isStoreLoading: false,
      currentLimit: 10,
      searchName: "",
      currentData: {
        name: null,
        description: null,
      },
      itemDetailData: {
        name: null,
      },
    };
  },
  getters: {
    items: (state) => {
      return state.responses?.data;
    },
    searchQuery(state) {
      if (state.searchName == "" || null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/item-categories?${this.searchQuery}`);
        this.responses = response.data;
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/item-categories`, this.currentData);
        console.info(response);
        if (response.status == 200) {
          this.responses.data.push(response.data.data);
          return {
            status: true,
            data: response.data,
          };
        } else {
          return false;
        }
      } catch (error) {
        return false;
      } finally {
        this.isStoreLoading = false;
      }
    },
  },
});
