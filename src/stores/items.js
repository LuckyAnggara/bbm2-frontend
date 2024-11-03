import { defineStore } from "pinia";
import axiosIns from "../services/axios";
const userData = JSON.parse(localStorage.getItem("userData"));
import { useToast } from "vue-toastification";
import { useAuthStore } from "./auth";

const toast = useToast();
// ITEM STORE
export const useItemStore = defineStore("itemStore", {
  state: () => {
    return {
      responses: {},
      singleResponses: null,
      originalSingleResponses: null,
      fromDate: "",
      toDate: "",
      isLoading: false,
      isStoreLoading: false,
      isUpdateLoading: false,
      isDestroyLoading: false,
      isTransactionSuccess: false,
      modalToggle: false,
      currentLimit: 10,

      editCurrentData: {},
      currentData: {
        name: null,
        description: null,
        sku: null,
        brand: null,
        category_id: 1,
        unit_id: 0,
        buying_price: 0,
        selling_price: 0,
        iSell: true,
        iBuy: true,
        beginningStock: {
          value: false,
          stock: 0,
          price: 0,
        },
        buying_tax_id: 1,
        selling_tax_id: 1,
        qty_minimum: 0,
        warehouse_id: 0,
        notification_qty: false,
      },
      searchName: "",
      itemDetailData: {
        name: null,
      },
      filter: {
        type: "all",
        minSellingPrice: 0,
        minBuyingPrice: 0,
        minStock: 0,
        unit: 0,
        category: 0,
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
    totalBeginningStock(state) {
      return state.currentData.beginningStock.price * state.currentData.beginningStock.stock;
    },
    searchQuery(state) {
      if (state.searchName == "" || null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
    branchQuery() {
      const authStore = useAuthStore();
      return "&branch=" + authStore.userData.branch_id;
    },
    minSellingPriceQuery(state) {
      if (
        state.filter.minSellingPrice == 0 ||
        state.filter.minSellingPrice == "" ||
        state.filter.minSellingPrice == null
      ) {
        return "";
      }
      return "&min-selling-price=" + state.filter.minSellingPrice;
    },
    minBuyingPriceQuery(state) {
      if (
        state.filter.minBuyingPrice == 0 ||
        state.filter.minBuyingPrice == "" ||
        state.filter.minBuyingPrice == null
      ) {
        return "";
      }
      return "&min-buying-price=" + state.filter.minBuyingPrice;
    },
    minStockQuery(state) {
      if (state.filter.minStock == 0 || state.filter.minStock == "" || state.filter.minStock == null) {
        return "";
      }
      return "&min-stock=" + state.filter.minStock;
    },
    unitQuery(state) {
      switch (state.filter.unit) {
        case "":
        case null:
        case 0:
          return "";
        default:
          return "&unit=" + state.filter.unit;
      }
    },
    categoryQuery(state) {
      switch (state.filter.category) {
        case "":
        case null:
        case 0:
          return "";
        default:
          return "&category=" + state.filter.category;
      }
    },
    typeQuery(state) {
      return "&type=" + state.filter.type;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/items?limit=${this.currentLimit}${this.searchQuery}${this.typeQuery}${this.branchQuery}${page}${this.minSellingPriceQuery}${this.minBuyingPriceQuery}${this.minStockQuery}${this.unitQuery}${this.categoryQuery}`
        );
        this.responses = response.data.data;
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        });
      }
      this.isLoading = false;
    },
    async showData(id = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/items/${id}`);
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data));
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data));
      } catch (error) {
        toast.error("Data not found", {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/items`, this.currentData);
        this.isTransactionSuccess = true;
        this.getData();
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    async update(inListProduct = true) {
      this.isUpdateLoading = true;
      try {
        const response = await axiosIns.put(`/items/${this.singleResponses.id}`, this.singleResponses);
        this.isTransactionSuccess = true;
        // toast.success('Product successfully updated!', {
        //   timeout: 2000,
        // })
        if (inListProduct) {
          this.getData();
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        });
      } finally {
        this.isUpdateLoading = false;
      }
    },
    async destroy(id, inListProduct = true) {
      this.isDestroyLoading = true;
      try {
        await axiosIns.delete(`/items/${id}`);
        toast.success("Data berhasil di hapus", {
          timeout: 2000,
        });
        const index = this.items.findIndex((item) => item.id === id);
        if (inListProduct) {
          this.responses.data.splice(index, 1);
        }
        return true;
      } catch (error) {
        return false;
      } finally {
        this.isDestroyLoading = false;
      }
    },
    copyOriginalSingleResponses() {
      this.singleResponses = JSON.parse(JSON.stringify(this.originalSingleResponses));
    },
    clearData() {
      this.currentData = {
        name: null,
        description: null,
        sku: null,
        brand: null,
        category_id: 1,
        unit_id: 0,
        buying_price: 0,
        selling_price: 0,
        iSell: true,
        iBuy: true,
        beginningStock: {
          value: false,
          stock: 0,
          price: 0,
        },
        buying_tax_id: 1,
        selling_tax_id: 1,
        qty_minimum: 0,
        warehouse_id: 0,
        notification_qty: false,
        created_by: userData.id,
        branch_id: userData.branch_id,
      };
    },
  },
});
