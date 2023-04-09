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
      isStoreLoading: false,
      isDestroyLoading: false,
      isTransactionSuccess: false,
      currentLimit: 10,
      searchName: '',
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
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
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
          `/sales?limit=${this.currentLimit}${this.branchQuery}${this.searchQuery}${page}`
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
  },
})
