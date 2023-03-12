import { defineStore } from 'pinia'
import axiosIns from '../services/axios'

// ITEM STORE
export const useSalesStore = defineStore('salesStore', {
  state: () => {
    return {
      currentData: {},
    }
  },
  getters: {},
  actions: {},
})
