import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
const userData = JSON.parse(localStorage.getItem('userData'))
import { useToast } from 'vue-toastification'

const toast = useToast()
// ITEM STORE
export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      responses: {},
      singleResponses: null,
      fromDate: '',
      toDate: '',
      isLoading: false,
      isStoreLoading: false,
      isEditLoading: false,
      isDestroyLoading: false,
      modalToggle: false,
      currentLimit: 10,
      editCurrentData: {},
      currentData: {
        name: null,
        brand_id: 0,
        unit_id: 0,
        warehouse_id: 0,
        created_by: userData.id,
      },
      searchName: '',
      itemDetailData: {
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
    searchQuery(state) {
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/items?limit=${this.currentLimit}${this.searchQuery}${page}`)
        this.responses = response.data.data
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      }
      this.isLoading = false
    },
    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/items/${id}`)
        this.singleResponses = response.data.data
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
      }
      this.isLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/items`, this.currentData)
        toast.success('Produk baru berhasil ditambahkan', {
          timeout: 3000,
        })
        this.getData()
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      } finally {
        this.isStoreLoading = false
      }
    },
    async update() {
      this.isEditLoading = true
      try {
        const response = await axiosIns.put(`/items/${this.editCurrentData.id}`, this.editCurrentData)
        toast.success('Produk berhasil diperbaharui!', {
          timeout: 3000,
        })
        this.getData()
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        })
      } finally {
        this.isEditLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      try {
        const response = await axiosIns.delete(`/items/${id}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
        const index = this.items.findIndex((item) => item.id === id)
        this.responses.data.splice(index, 1)
        return response
      } catch (error) {
        toast.error(error.response.data.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },
  },
})
