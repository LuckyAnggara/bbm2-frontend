import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
// ITEM STORE
export const useShippingDetailStore = defineStore('shippingDetailStore', {
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
    }
  },
  actions: {
    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/shipping-detail/${id}`)
        this.responses = response.data.data
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
      }
      this.isLoading = false
    },
  },
})
