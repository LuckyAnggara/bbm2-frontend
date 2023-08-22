import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "./auth";
const toast = useToast();

// ITEM STORE
export const useCustomerStore = defineStore("customerStore", {
  state: () => {
    return {
      responses: {},
      searchName: "",
      searchBranch: "",
      currentLimit: 10,
      customer: null,
      isLoading: false,
      isDestroyLoading: false,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      singleResponses: null,
      originalSingleResponses: null,
      isStoreLoading: false,
      isEditLoading: false,
      errorMessage: null,
      successMessage: null,
      currentData: {
        name: "",
        phoneNumber: "",
        address: "",
        type: "",
        postalCode: "",
        user: useAuthStore().userData,
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
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/customers?limit=${this.currentLimit}${this.searchQuery}${this.branchQuery}&list=true`
        );
        this.responses = response.data.data;
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/customers`, this.currentData);
        this.isTransactionSuccess = true;
        this.getData();
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 2000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    async showData(id = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/customers/${id}`);
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data));
      } catch (error) {
        toast.error("Data not found", {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
    async update(data = null, inListCustomer = false) {
      this.isUpdateLoading = true;
      let payload = null;
      if (data == null) {
        payload = this.singleResponses;
      } else {
        payload = data;
      }
      try {
        const response = await axiosIns.put(`/customers/${payload.id}`, payload);
        this.isUpdateSuccess = true;
        toast.success(response.data.message, {
          timeout: 2000,
        });
        if (inListCustomer) {
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
    async updateCustomer(data = null, inListCustomer = false) {
      console.info(data);
      this.isEditLoading = true;
      try {
        const response = await axiosIns.put(`/customers/${data.id}`, data);
      } catch (error) {
        alert(error);
      } finally {
        this.isEditLoading = false;
      }
    },
    async destroy(id, inListCustomer = true) {
      this.isDestroyLoading = true;
      try {
        await axiosIns.delete(`/customers/${id}`);
        toast.success("Data berhasil di hapus", {
          timeout: 2000,
        });
        const index = this.items.findIndex((item) => item.id === id);
        if (inListCustomer) {
          this.responses.data.splice(index, 1);
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        });
      } finally {
        this.isDestroyLoading = false;
      }
    },
    copyOriginalSingleResponses() {
      this.singleResponses = JSON.parse(JSON.stringify(this.originalSingleResponses));
    },
  },
});
