import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
// ITEM STORE
export const useAccountStore = defineStore('accountStore', {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      isStoreLoading: false,
    }
  },
  getters: {
    items: (state) => {
      return state.responses ?? []
    },
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/account`)
        this.responses = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
  },
})
