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
    items: (state) => {},
  },
  actions: {
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/sales-retur`, this.data);
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
    async fromSalesStore(data) {
      this.dataRetur = data.map(function (item) {
        return {
          id: item.id,
          name: item.item.name,
          item_id: item.item_id,
          qty: item.qty,
          retur_qty: 0,
          price: item.price,
          type: 1, // Tambahkan nilai default untuk 'retur_qty'
          notes: "",
          // Tambahkan nilai default untuk 'notes'
        };
      });
    },
  },
});
