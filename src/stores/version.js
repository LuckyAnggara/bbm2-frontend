import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

// ITEM STORE
export const useVersionStore = defineStore('versionStore', {
  state: () => {
    return {
      response: null,
      isOnline: false,
    }
  },
  getters: {},
  actions: {
    async get() {
      this.isOnline = false
      try {
        const response = await axiosIns.get(`/version`)
        this.response = response.data
        this.isOnline = true
      } catch (error) {
        toast.error('Server offline!!', {
          timeout: 5000,
          position: 'bottom-left',
        })
        this.isOnline = false
      }
    },
  },
})
