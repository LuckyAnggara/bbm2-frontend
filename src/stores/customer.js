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
      singleResponses: null,
      originalSingleResponses: null,
      isStoreLoading: false,
      isEditLoading: false,
      errorMessage: null,
      successMessage: null,
      currentData: {
        name: '',
        phoneNumber: '',
        address: '',
        type: '',
        postalCode: '',
        user: useAuthStore().userData,
      },
    }
  },
  getters: {
    items: (state) => {
      return state.responses?.data ?? []
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    pageLength(state) {
      return Math.round(state.responses.total / state.responses.per_page)
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
        const response = await axiosIns.get(`/customers?limit=${this.currentLimit}${this.searchQuery}${this.branchQuery}&list=true`)
        this.responses = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/customers`, this.currentData)
        this.isTransactionSuccess = true
        this.getData()
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 2000,
        })
      } finally {
        this.isStoreLoading = false
      }
    },
    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/customers/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
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
    copyOriginalSingleResponses() {
      this.singleResponses = JSON.parse(JSON.stringify(this.originalSingleResponses))
    },
  },
})
