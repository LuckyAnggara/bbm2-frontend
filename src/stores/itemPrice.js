import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
// ITEM STORE
export const useItemPriceStore = defineStore('itemPriceStore', {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      isStoreLoading: false,
      currentLimit: 10,
      currentData: {
        name: null,
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
  },
  actions: {
    async getData(itemId) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/item-prices?limit=${this.currentLimit}&id=${itemId}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
  },
})
