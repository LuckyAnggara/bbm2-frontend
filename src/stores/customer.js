import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import { useAuthStore } from './auth'
const toast = useToast()

// ITEM STORE
export const useCustomerStore = defineStore('customerStore', {
  state: () => {
    return {
      responses: {},
      searchName: '',
      searchBranch: '',
      currentLimit: 5,
      customer: null,
      isLoading: false,
      isEditLoading: false,
      errorMessage: null,
      successMessage: null,
    }
  },
  getters: {
    items: (state) => {
      return state.responses.data
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
    branchQuery2(state) {
      if (state.searchBranch == '' || null) {
        return ''
      }
      return '&branch=' + state.searchBranch
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/customers?limit=${this.currentLimit}${this.searchQuery}${this.branchQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async updateCustomer(data) {
      console.info(data)
      this.isEditLoading = true
      try {
        const response = await axiosIns.put(`/customers/${data.id}`, data)
        toast.success(response.data.message, {
          timeout: 2000,
        })
      } catch (error) {
        alert(error)
      } finally {
        this.isEditLoading = false
      }
    },
  },
})
