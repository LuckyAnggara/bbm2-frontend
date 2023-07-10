import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

import { useAuthStore } from './auth'
const toast = useToast()
const userData = JSON.parse(localStorage.getItem('userData'))

console.info(userData)

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
      currentLimit: 10,
      searchName: '',
      status: ['SEMUA', 'LUNAS', 'BELUM LUNAS'],
      pembayaran: ['SEMUA', 'TUNAI', 'KREDIT'],
      currentData: {
        customerData: {
          id: '',
          name: '',
          address: '',
          phone_number: '',
          userId: userData.id,
          saveCustomer: false,
        },
        currentCart: [],
        total: {},
        credit: {
          amount: 0,
          due_date: null,
          notes: '',
        },
      },
      filter: {
        date: [],
        status: 'SEMUA',
        pembayaran: 'SEMUA',
        minTotal: 0,
      },
      isLoading: false,
    }
  },
  getters: {
    items: (state) => {
      return state.responses?.data
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
    total(state) {
      return state.responses?.total
    },
    searchQuery(state) {
      if (state.searchName == '' || state.searchName == null) {
        return ''
      }
      return '&name=' + state.searchName
    },
    minTotalQuery(state) {
      if (state.filter.minTotal == 0 || state.filter.minTotal == '' || state.filter.minTotal == null) {
        return ''
      }
      return '&min-total=' + state.filter.minTotal
    },
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return ''
      }
      return '&start-date=' + state.filter.date[0] + '&end-date=' + state.filter.date[1]
    },
    statusQuery(state) {
      switch (state.filter.status) {
        case '':
        case null:
          return ''
        case 'SEMUA':
          return ''
        case 'LUNAS':
          return '&status=lunas'
        case 'BELUM LUNAS':
          return '&status=belum_lunas'
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
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/sales?limit=${this.currentLimit}${this.branchQuery}${this.searchQuery}${page}${this.statusQuery}${this.pembayaranQuery}${this.dateQuery}${this.minTotalQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error)
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
        const index = this.singleResponses.payment.findIndex((item) => item.id === id)
        this.singleResponses.payment.splice(index, 1)
      } catch (error) {
        toast.error(error.response.data.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },
  },
})
