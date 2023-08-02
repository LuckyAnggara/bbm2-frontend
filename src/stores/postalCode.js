import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
// ITEM STORE
export const usePostalCodeStore = defineStore('postalCodeStore', {
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
      return state.responses?.data ?? []
    },
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`https://kodepos.vercel.app/search/?q=${this.searchName}`)
        this.responses = response.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
  },
})
