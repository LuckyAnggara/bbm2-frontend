import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";

const toast = useToast();
// ITEM STORE
export const useItemMutationStore = defineStore("itemMutataionStore", {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      currentLimit: 10,
      currentData: {
        name: null,
      },
    };
  },
  getters: {
    items: (state) => {
      return state.responses?.data ?? [];
    },
    currentPage(state) {
      return state.responses?.current_page;
    },
    pageLength(state) {
      return Math.round(state.responses.total / state.responses.per_page);
    },
    lastPage(state) {
      return state.responses?.last_page;
    },
    from(state) {
      return state.responses?.from;
    },
    to(state) {
      return state.responses?.to;
    },
    total(state) {
      return state.responses?.total;
    },
  },
  actions: {
    async getData({ id, currentLimit = 10 }) {
      this.currentLimit = currentLimit;
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/item-mutation?limit=${this.currentLimit}&id=${id}`);
        this.responses = response.data.data;
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
  },
});
