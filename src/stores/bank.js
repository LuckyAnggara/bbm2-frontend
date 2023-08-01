import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import { useAuthStore } from './auth'

const toast = useToast()
// ITEM STORE
export const useBankStore = defineStore('bankStore', {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      isStoreLoading: false,
      currentLimit: 10,
      searchName: '',
      currentData: {
        name: null,
      },
      itemDetailData: {
        name: null,
      },
    }
  },
  getters: {
    items: (state) => {
      return state.responses?.data
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
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/banks?${this.searchQuery}${this.branchQuery}`
        )
        this.responses = response.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/banks`, this.currentData)
        toast.success('Bank baru berhasil ditambahkan', {
          timeout: 3000,
        })
        this.responses.data.push(response.data.data)
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      } finally {
        this.isStoreLoading = false
      }
    },
  },
})
