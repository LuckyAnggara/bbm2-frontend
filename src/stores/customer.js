import { defineStore } from 'pinia'
import axiosIns from '../services/axios'

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
    branchQuery(state) {
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
        const response = await axiosIns.get(
          `/customers?limit=${this.currentLimit}${this.searchQuery}${this.branchQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async updateCustomer(data) {
      console.info('edit')
      this.isEditLoading = true
      try {
        const response = await axiosIns.put(`/customers/${data.id}`, data)
        this.customer = response.data.customer
        this.message = 'Update Success'
        return this.message
      } catch (error) {
        this.message = error.message
        return this.message
      } finally {
        this.isEditLoading = false
      }
    },
  },
})
