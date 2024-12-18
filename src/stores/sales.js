import { defineStore } from "pinia";
import axiosIns from "../services/axios";
import { useToast } from "vue-toastification";

import { useAuthStore } from "./auth";
import { useNotificationStore } from "./notification";
import { useSalesReturStore } from "./salesRetur";
import { useArrayDifference } from "@vueuse/core";
const toast = useToast();

// ITEM STORE
export const useSalesStore = defineStore("salesStore", {
  state: () => {
    return {
      responses: {},
      singleResponses: null,
      originalSingleResponses: null,
      showDrawerData: null,
      forReturOriginal: [],
      isStoreLoading: false,
      isDestroyLoading: false,
      isUpdateLoading: false,
      isPaymentLoading: false,
      isDrawerLoading: false,
      isTransactionSuccess: false,
      editReturDetail: {},
      formPaymentCredit: {
        sale_id: null,
        created_at: null,
        amount: 0,
        notes: null,
        payment_type: "CASH",
      },
      sortBy: "created_at",
      isAscending: false,
      currentLimit: 10,
      searchName: "",
      paymentStatus: ["SEMUA", "LUNAS", "BELUM LUNAS"],
      deliveryStatus: ["SEMUA", "TAKE AWAY", "DELIVERY"],
      pembayaran: ["SEMUA", "TUNAI", "KREDIT"],
      currentData: {
        fromCustomer: false,
        useGlobalTax: false,
        transaction: {
          bank: {},
        },
        customerData: {
          isCustomer: false,
          id: 1,
          withoutCustomer: true,
          saveCustomer: false,
          type: null,
        },
        currentCart: [],
        total: {},
        tax: { id: 1, name: "Tanpa Pajak", value: 0 },
        credit: {
          amount: 0,
          due_date: null,
          notes: "",
          isCredit: false,
        },
        retur: {
          returStatus: false,
        },
        shipping: {
          useCustomer: false,
        },
      },
      filter: {
        date: [],
        paymentStatus: "SEMUA",
        deliveryStatus: "SEMUA",
        pembayaran: "SEMUA",
        minTotal: 0,
      },
      isLoading: false,
    };
  },
  getters: {
    items: (state) => {
      return state.responses?.data ?? [];
    },
    sortItem: (state) => {
      if (state.isAscending === true) {
        state.items.sort(function (a, b) {
          return a[state.sortBy] > b[state.sortBy] ? 1 : -1;
        });
      } else {
        state.items.sort(function (a, b) {
          return a[state.sortBy] < b[state.sortBy] ? 1 : -1;
        });
      }
      return state.items;
    },
    currentPage(state) {
      return state.responses?.current_page;
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page);
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
    totalResp(state) {
      return state.responses?.total;
    },
    searchQuery(state) {
      if (state.searchName == "" || state.searchName == null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
    minTotalQuery(state) {
      if (state.filter.minTotal == 0 || state.filter.minTotal == "" || state.filter.minTotal == null) {
        return "";
      }
      return "&min-total=" + state.filter.minTotal;
    },
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return "";
      }
      return "&start-date=" + state.filter.date[0] + "&end-date=" + state.filter.date[1];
    },
    paymentStatusQuery(state) {
      switch (state.filter.paymentStatus) {
        case "":
        case null:
          return "";
        case "SEMUA":
          return "";
        case "LUNAS":
          return "&payment-status=LUNAS";
        case "BELUM LUNAS":
          return "&payment-status=BELUM LUNAS";
      }
    },
    deliveryStatusQuery(state) {
      switch (state.filter.deliveryStatus) {
        case "":
        case null:
          return "";
        case "SEMUA":
          return "";
        case "TAKE AWAY":
          return "&delivery-status=TAKE AWAY";
        case "DELIVERY":
          return "&delivery-status=DELIVERY";
      }
    },
    pembayaranQuery(state) {
      switch (state.filter.pembayaran) {
        case "":
        case null:
          return "";
        case "SEMUA":
          return "";
        case "TUNAI":
          return "&credit=0";
        case "KREDIT":
          return "&credit=1";
      }
    },
    // branchQuery(state) {
    //   const authStore = useAuthStore();
    //   return "&branch=" + authStore.userData.branch_id;
    // },
    activeFilter(state) {
      return {
        tanggal: state.filter.date ?? "-",
        paymentStatus: state.filter.paymentStatus ?? "-",
        deliveryStatus: state.filter.deliveryStatus ?? "-",
        kredit: state.filter.kredit ?? "-",
        minTotal: state.filter.minTotal ?? "-",
      };
    },
    subTotal(state) {
      let sum = state.currentData.currentCart.reduce((accumulator, item) => {
        return accumulator + item.price * item.qty;
      }, 0);
      return sum;
    },
    discount(state) {
      let sum = state.currentData.currentCart.reduce((accumulator, item) => {
        return accumulator + item.disc;
      }, 0);
      return sum;
    },
    totalBeforeTax(state) {
      return state.subTotal - state.discount;
    },
    tax(state) {
      let sum = state.currentData.currentCart.reduce((accumulator, item) => {
        return accumulator + item.tax;
      }, 0);
      return sum;
    },
    grandTotal(state) {
      return state.totalBeforeTax + state.tax;
    },
    total(state) {
      return {
        subtotal: state.subTotal,
        discount: state.discount,
        totalBeforeTax: state.totalBeforeTax,
        tax: state.tax,
        grandTotal: state.grandTotal,
      };
    },
    editSubTotal(state) {
      let sum = state.singleResponses?.detail.reduce((accumulator, item) => {
        return accumulator + item.price * item.qty;
      }, 0);
      return sum;
    },
    editDiscount(state) {
      let sum = state.singleResponses?.detail.reduce((accumulator, item) => {
        return accumulator + item.discount;
      }, 0);
      return sum;
    },
    editTotalBeforeTax(state) {
      return state.editSubTotal - state.editDiscount;
    },
    editTax(state) {
      // return 0;
      let sum = state.singleResponses?.detail.reduce((accumulator, item) => {
        return accumulator + item.tax;
      }, 0);
      return sum;
    },
    editGrandTotal(state) {
      return state.editTotalBeforeTax + state.editTax - (state.singleResponses?.total_retur ?? 0);
    },
    editTotal(state) {
      return {
        subtotal: state.editSubTotal,
        discount: state.editDiscount,
        totalBeforeTax: state.editTotalBeforeTax,
        tax: state.editTax,
        grandTotal: state.editGrandTotal,
        etc_desc: "",
        etc: 0,
      };
    },
    editCartPermission(state) {
      const list1 = JSON.stringify(state.singleResponses?.detail);
      const list2 = JSON.stringify(state.originalSingleResponses?.detail);
      if (list1 == list2) {
        return false;
      }
      return true;
    },
    editCreditPermission(state) {
      if (String(state.singleResponses?.credit) == String(state.originalSingleResponses?.credit)) {
        return false;
      }
      return true;
    },
    editCustomerPermission(state) {
      if (JSON.stringify(state.singleResponses?.customer) == JSON.stringify(state.originalSingleResponses?.customer)) {
        return false;
      }
      return true;
    },
    editShippingPermission(state) {
      return false;
    },
    editReturPermission(state) {
      const list1 = JSON.stringify(state.singleResponses?.detail_retur);
      const list2 = JSON.stringify(state.originalSingleResponses?.detail_retur);
      if (list1 == list2) {
        return false;
      }
      return true;
    },
    editRetur(state) {
      return state.singleResponses?.detail_retur?.length > 0 ? 1 : 0 ?? 0;
    },

    dataEdit(state) {
      const authStore = useAuthStore();
      if (state.singleResponses == null) {
        return null;
      }
      return {
        editCartPermission: state.editCartPermission,
        editCreditPermission: state.editCreditPermission,
        editShippingPermission: state.editShippingPermission,
        editReturPermission: state.editReturPermission,
        editCustomerPermission: state.editCustomerPermission,
        useGlobalTax: state.singleResponses.global_tax,
        transaction: {
          bank: {},
        },
        retur: {
          returStatus: state.editRetur,
          returDetail: state.editReturDetail,
        },
        customerData: state.singleResponses.customer,
        currentCart: state.singleResponses.detail,
        total: state.editTotal,
        tax: state.singleResponses.tax_detail,
        credit: {
          due_date: state.singleResponses.credit == 0 ? null : state.singleResponses.due_date,
          isCredit: state.singleResponses.credit,
        },
        shipping: {
          type: state.singleResponses.shipping_type,
          cost: state.singleResponses.shipping_cost,
          id: state.singleResponses.shipping,
        },
        transaction: {
          paymentStatus: state.singleResponses.payment_status,
          paymentType: state.singleResponses.payment_type,
        },
      };
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/sales?limit=${this.currentLimit}${this.searchQuery}${page}${this.paymentStatusQuery}${this.deliveryStatusQuery}${this.pembayaranQuery}${this.dateQuery}${this.minTotalQuery}`
        );
        this.responses = response.data.data;
      } catch (error) {
        if ((error.code = "ERR_BAD_RESPONSE")) {
          toast.error("Database Offline", {
            position: "bottom-right",
          });
        }
      }
      this.isLoading = false;
    },

    async showData(id = "") {
      const returData = useSalesReturStore();
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/sales/${id}`);
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data));
        returData.fromSalesStore(
          JSON.parse(JSON.stringify(response.data.data.detail)),
          JSON.parse(JSON.stringify(response.data.data?.detail_retur ?? []))
        );
      } catch (error) {
        toast.error("Data not found", {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
    async store() {
      const notificationStore = useNotificationStore();
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/sales`, this.currentData);
        this.responses = response.data.data;
        this.isTransactionSuccess = true;
        notificationStore.getUnread();
        return {
          status: true,
          data: response.data.data,
        };
      } catch (error) {
        return false;
      } finally {
        this.isStoreLoading = false;
      }
    },
    async update() {
      this.isUpdateLoading = true;
      try {
        const response = await axiosIns.put(`/sales/${this.singleResponses.id}`, this.dataEdit);
        return true;
      } catch (error) {
        return false;
      } finally {
        this.isUpdateLoading = false;
      }
    },
    async destroyData(id) {
      this.isDestroyLoading = true;
      try {
        const response = await axiosIns.delete(`/sales/${id}`);

        if (response.status == 200) {
          const index = this.items.findIndex((x) => x.id == id);
          this.responses.data.splice(index, 1);

          return {
            status: true,
            data: response.data.data,
          };
        } else {
          return {
            status: false,
            data: null,
            message: "Ops, Something wrong.",
          };
        }
      } catch (error) {
        return {
          status: false,
          data: null,
          message: error,
        };
      } finally {
        this.isDestroyLoading = false;
      }
    },
    async getDrawerData(index) {
      try {
        this.isDrawerLoading = true;
        this.showDrawerData = this.items[index];
      } catch (e) {
        alert(e);
      } finally {
        this.isDrawerLoading = false;
      }
    },
    async storeCreditPayment() {
      try {
        const response = await axiosIns.post(`/sales-credit-payment`, this.formPaymentCredit);
        if (response.status == 201) {
          this.singleResponses.payment.push(response.data.data);
          this.singleResponses.remaining_credit -= this.formPaymentCredit.amount;
          this.resetFormCreditPayment();
          if (this.singleResponses.remaining_credit == 0) {
            this.singleResponses.payment_status = "LUNAS";
          }
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    async destroyCreditData(paymentItem) {
      this.isDestroyLoading = true;
      try {
        const response = await axiosIns.delete(`/sales-credit-payment/${paymentItem.id}`);
        const index = this.singleResponses.payment.findIndex((item) => item.id === paymentItem.id);
        this.singleResponses.payment.splice(index, 1);
        this.singleResponses.remaining_credit += paymentItem.amount;
        return true;
      } catch (error) {
        return false;
      } finally {
        this.isDestroyLoading = false;
      }
    },
    //Fungsi Biasa
    changeDateFilter(payload) {
      this.filter.date = payload;
    },

    changeSortBy(key) {
      this.sortBy = key;
      this.isAscending = !this.isAscending;
    },
    addDataShipping(value) {
      this.currentData.shipping = { ...value };
    },
    setData(isCredit = false, paymentType = "CASH") {
      let transaction = {
        ...this.currentData.transaction,
        paymentType: paymentType,
        isCredit: isCredit,
        amount: paymentType == "CASH" || paymentType == "TRANSFER" ? this.total.grandTotal : this.currentData.total.dp,
        type: "IN",
      };
      this.currentData.transaction = {
        ...transaction,
      };
      this.currentData.total = this.total;
    },
    setReturData(returData) {
      this.singleResponses.retur_status = true;
      this.singleResponses.detail_retur.push(returData);
    },
    resetData() {
      this.currentData = {
        transaction: {
          bank: null,
        },
        customerData: {
          id: 1,
          type: null,
          name: "-",
          address: "-",
          phone_number: "-",
          withoutCustomer: true,
          saveCustomer: false,
        },
        currentCart: [],
        total: {},
        tax: {
          id: 1,
          name: "Tanpa Pajak",
          value: 0,
        },
        credit: {
          amount: 0,
          due_date: null,
          notes: "",
        },
        shipping: {},
      };
    },
    resetFormCustomerData() {
      this.currentData.customerData = {
        id: 1,
        isCustomer: false,
        type: null,
        name: "",
        withoutCustomer: true,
        address: "",
        phone_number: "",
        saveCustomer: false,
      };
    },
    resetFormCreditPayment() {
      this.formPaymentCredit = {
        created_at: null,
        amount: 0,
        notes: null,
        payment_type: "CASH",
      };
    },
    copyOriginalSingleResponses() {
      this.singleResponses = JSON.parse(JSON.stringify(this.originalSingleResponses));
    },
  },
});
