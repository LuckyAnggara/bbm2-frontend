import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";
import { useSalesStore } from "./sales";
import { useArrayFind } from "@vueuse/core";

const toast = useToast();
// ITEM STORE
export const useSalesReturStore = defineStore("salesReturStore", {
  state: () => {
    return {
      data: {},
      dataRetur: {},
      response: {},
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
      const salesStore = useSalesStore();
      this.isStoreLoading = true;
      try {
        const returResponse = await axiosIns.post(`/sales-retur`, this.data);
        toast.success("Retur berhasil di proses", {
          timeout: 3000,
        });
        this.isTransactionSuccess = true;
        salesStore.$patch((state) => {
          state.singleResponses.retur = 1;
          state.singleResponses.total_retur = returResponse.data.data;
        });
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },

    async fromSalesStore(detail, retur) {
      const group = retur.reduce((accumulator, current) => {
        const { item_id, qty } = current;
        if (!accumulator[item_id]) {
          accumulator[item_id] = { item_id, qty: 0 };
        }
        accumulator[item_id].qty += qty;
        return accumulator;
      }, {});

      const groupRetur = Object.values(group);

      this.dataRetur = detail.map(function (item, index) {
        const returData = groupRetur.find((x) => x.item_id == item.item_id);
        const returQty = returData?.qty || 0;
        const itemQty = item.qty || 0;
        const hasil = itemQty - returQty;

        return {
          id: item.id,
          name: item.item.name,
          item_id: item.item_id,
          qty: hasil,
          retur_qty: 0,
          price: item.price,
          tax: item.tax,
          status: item.retur,
          type: "NORMAL", // Tambahkan nilai default untuk 'retur_qty'
          notes: "",
          // Tambahkan nilai default untuk 'notes'
        };
      });
    },
  },
});
