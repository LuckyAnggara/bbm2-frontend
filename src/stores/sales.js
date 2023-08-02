import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

import { useAuthStore } from './auth'
const toast = useToast()
const userData = JSON.parse(localStorage.getItem('userData'))

// ITEM STORE
export const useSalesStore = defineStore('salesStore', {
  state: () => {
    return {
      responses: {},
      singleResponses: null,
      showDrawerData: null,
      isStoreLoading: false,
      isDestroyLoading: false,
      isPaymentLoading: false,
      isDrawerLoading: false,
      isTransactionSuccess: false,
      sortBy: 'created_at',
      isAscending: false,
      currentLimit: 10,
      searchName: '',
      paymentStatus: ['SEMUA', 'LUNAS', 'BELUM LUNAS'],
      deliveryStatus: ['SEMUA', 'TAKE AWAY', 'DELIVERY'],
      pembayaran: ['SEMUA', 'TUNAI', 'KREDIT'],
      currentData: {
        transaction: {
          bank: {},
        },
        customerData: {
          id: 1,
          name: '-',
          address: '-',
          phone_number: '-',
          withoutCustomer: true,
          userId: userData.id,
          saveCustomer: false,
        },
        currentCart: [],
        total: {},
        tax: { id: 1, name: 'Tanpa Pajak', value: 0 },
        credit: {
          amount: 0,
          due_date: null,
          notes: '',
        },
        shipping: {},
      },
      filter: {
        date: [],
        paymentStatus: 'SEMUA',
        deliveryStatus: 'SEMUA',
        pembayaran: 'SEMUA',
        minTotal: 0,
      },
      isLoading: false,
    }
  },
  getters: {
    items: (state) => {
      return state.responses?.data ?? []
    },
    sortItem: (state) => {
      if (state.isAscending === true) {
        state.items.sort(function (a, b) {
          return a[state.sortBy] > b[state.sortBy] ? 1 : -1
        })
      } else {
        state.items.sort(function (a, b) {
          return a[state.sortBy] < b[state.sortBy] ? 1 : -1
        })
      }
      return state.items
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page)
    },
    lastPage(state) {
      return state.responses?.last_page
    },
    from(state) {
      return state.responses?.from
    },
    to(state) {
      return state.responses?.to
    },
    totalResp(state) {
      return state.responses?.total
    },
    searchQuery(state) {
      if (state.searchName == '' || state.searchName == null) {
        return ''
      }
      return '&name=' + state.searchName
    },
    minTotalQuery(state) {
      if (
        state.filter.minTotal == 0 ||
        state.filter.minTotal == '' ||
        state.filter.minTotal == null
      ) {
        return ''
      }
      return '&min-total=' + state.filter.minTotal
    },
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return ''
      }
      return (
        '&start-date=' +
        state.filter.date[0] +
        '&end-date=' +
        state.filter.date[1]
      )
    },
    paymentStatusQuery(state) {
      switch (state.filter.paymentStatus) {
        case '':
        case null:
          return ''
        case 'SEMUA':
          return ''
        case 'LUNAS':
          return '&payment-status=LUNAS'
        case 'BELUM LUNAS':
          return '&payment-status=BELUM LUNAS'
      }
    },
    deliveryStatusQuery(state) {
      switch (state.filter.deliveryStatus) {
        case '':
        case null:
          return ''
        case 'SEMUA':
          return ''
        case 'TAKE AWAY':
          return '&delivery-status=TAKE AWAY'
        case 'DELIVERY':
          return '&delivery-status=DELIVERY'
      }
    },
    pembayaranQuery(state) {
      switch (state.filter.pembayaran) {
        case '':
        case null:
          return ''
        case 'SEMUA':
          return ''
        case 'TUNAI':
          return '&credit=0'
        case 'KREDIT':
          return '&credit=1'
      }
    },
    branchQuery() {
      const authStore = useAuthStore()
      return '&branch=' + authStore.userData.branch_id
    },
    activeFilter(state) {
      return {
        tanggal: state.filter.date ?? '-',
        paymentStatus: state.filter.paymentStatus ?? '-',
        deliveryStatus: state.filter.deliveryStatus ?? '-',
        kredit: state.filter.kredit ?? '-',
        minTotal: state.filter.minTotal ?? '-',
      }
    },
    subTotal(state) {
      let sum = state.currentData.currentCart.reduce((accumulator, item) => {
        return accumulator + item.price * item.qty
      }, 0)
      return sum
    },
    discount(state) {
      let sum = state.currentData.currentCart.reduce((accumulator, item) => {
        return accumulator + item.disc
      }, 0)
      return sum
    },
    totalBeforeTax(state) {
      return state.subTotal - state.discount
    },
    tax(state) {
      const x = state.totalBeforeTax * state.currentData.tax.value
      if (isNaN(x)) {
        return 0
      }
      return x
    },
    grandTotal(state) {
      return state.totalBeforeTax + state.tax
    },
    total(state) {
      return {
        subtotal: state.subTotal,
        discount: state.discount,
        totalBeforeTax: state.totalBeforeTax,
        tax: state.tax,
        grandTotal: state.grandTotal,
      }
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/sales?limit=${this.currentLimit}${this.branchQuery}${this.searchQuery}${page}${this.paymentStatusQuery}${this.deliveryStatusQuery}${this.pembayaranQuery}${this.dateQuery}${this.minTotalQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        if ((error.code = 'ERR_BAD_RESPONSE')) {
          toast.error('Database Offline', {
            position: 'bottom-right',
          })
        }
      }
      this.isLoading = false
    },

    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/sales/${id}`)
        this.singleResponses = response.data.data
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
      }
      this.isLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/sales`, this.currentData)
        toast.success('Transaksi berhasil di proses', {
          timeout: 3000,
        })
        this.responses = response.data.data
        this.isTransactionSuccess = true
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      } finally {
        this.isStoreLoading = false
      }
    },
    async destroyData(id) {
      this.isDestroyLoading = true
      try {
        const response = await axiosIns.delete(`/sales/${id}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
        const index = this.items.findIndex((item) => item.id === id)
        this.responses.data.splice(index, 1)
      } catch (error) {
        toast.error(error.response.data.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },
    async getDrawerData(index) {
      try {
        this.isDrawerLoading = true
        this.showDrawerData = this.items[index]
      } catch (e) {
        alert(e)
      } finally {
        this.isDrawerLoading = false
      }
    },
    async storeCreditPayment(data) {
      this.isPaymentLoading = true
      try {
        const response = await axiosIns.post(`/payment`, data)
        toast.success('Transaksi berhasil di proses', {
          timeout: 3000,
        })
        this.responses = response.data.data
        this.isTransactionSuccess = true
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      } finally {
        this.isPaymentLoading = false
      }
    },
    async destroyCreditData(id) {
      this.isDestroyLoading = true
      try {
        const response = await axiosIns.delete(`/payment/${id}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
        const index = this.singleResponses.payment.findIndex(
          (item) => item.id === id
        )
        this.singleResponses.payment.splice(index, 1)
      } catch (error) {
        toast.error(error.response.data.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },

    //Fungsi Biasa
    changeDateFilter(payload) {
      this.filter.date = payload
    },

    changeSortBy(key) {
      this.sortBy = key
      this.isAscending = !this.isAscending
    },
    addDataShipping(value) {
      this.currentData.shipping = { ...value }
    },
    setData(isCredit = false, paymentType = 'CASH') {
      const authStore = useAuthStore()
      let transaction = {
        ...this.currentData.transaction,
        paymentType: paymentType,
        isCredit: isCredit,
        amount:
          paymentType == 'CASH' || paymentType == 'TRANSFER'
            ? this.total.grandTotal
            : this.currentData.total.dp,
        type: 'IN',
      }
      this.currentData.transaction = {
        ...transaction,
      }
      this.currentData.total = this.total
      this.currentData.userData = authStore.userData
    },
    resetData() {
      this.currentData = {
        transaction: {
          bank: null,
        },
        customerData: {
          id: 1,
          name: '-',
          address: '-',
          phone_number: '-',
          withoutCustomer: true,
          userId: userData.id,
          saveCustomer: false,
        },
        currentCart: [],
        total: {},
        tax: {
          id: 1,
          name: 'Tanpa Pajak',
          value: 0,
        },
        credit: {
          amount: 0,
          due_date: null,
          notes: '',
        },
        shipping: {},
      }
    },
  },
})
