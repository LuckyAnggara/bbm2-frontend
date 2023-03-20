import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

// ITEM STORE
export const useSalesStore = defineStore('salesStore', {
  state: () => {
    return {
      response: null,
      isStoreLoading: false,
      isTransactionSuccess: false,
      currentData: {},
    }
  },
  getters: {},
  actions: {
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/sales`, this.currentData)
        toast.success('Transaksi berhasil di proses', {
          timeout: 3000,
        })
        this.response = response.data
        this.isTransactionSuccess = true
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
