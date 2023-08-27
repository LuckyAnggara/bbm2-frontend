import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";

const toast = useToast();
// ITEM STORE
export const useSalesReturStore = defineStore("salesReturStore", {
  state: () => {
    return {
      data: {},
      dataRetur: {},
      isLoading: false,
      isStoreLoading: false,
      isTransactionSuccess: false,
      currentLimit: 10,
      searchName: "",
    };
  },
  getters: {
    items: (state) => {
      return state.responses?.data ?? [];
    },
  },
  actions: {
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/sales-retur`, this.dataRetur);
        toast.success("Retur berhasil di proses", {
          timeout: 3000,
        });
        this.isTransactionSuccess = true;
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
  },
});
