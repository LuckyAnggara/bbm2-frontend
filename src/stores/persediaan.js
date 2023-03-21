import { defineStore } from 'pinia'
import axiosIns from '../services/axios'

// ITEM STORE
export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      responses: {},
      fromDate: '',
      toDate: '',
      isLoading: false,
      modalToggle: false,
      currentLimit: 10,
      searchName: '',
      itemDetailData: {
        name: null,
      },
    }
  },
  getters: {
    items: (state) => {
      return state.responses?.data
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
        alert(error)
      }
      this.isLoading = false
    },
    // async storeItemData(data) {
    //   this.modalSubmitLoading = true
    //   try {
    //     const response = await axiosIns.post(`/items`, data)
    //     this.modalToggle = false
    //     this.modalSubmitLoading = false
    //     toast.success('My toast content', {
    //       timeout: 2000,
    //     })
    //     this.getItemData()
    //   } catch (error) {}
    //   this.modalSubmitLoading = false
    // },
    // async deleteItemData(id, index) {
    //   this.isDeleteLoading = true
    //   try {
    //     await axiosIns.delete(`/items/${id}`)
    //     this.items.data.splice(index, 1)
    //     toast.error('Data telah di Delete', {
    //       timeout: 2000,
    //     })
    //     return true
    //   } catch (error) {}
    //   this.isDeleteLoading = false
    // },

    // async getItemDetailData(id) {
    //   this.isLoading = true
    //   try {
    //     const response = await axiosIns.get(`/items/${id}`)
    //     this.itemDetailData = response.data.data
    //   } catch (error) {
    //     alert(error)
    //   }
    //   this.isLoading = false
    // },
    // async getItemTypeData() {
    //   try {
    //     const response = await axiosIns.get(`/item-types`)
    //     this.itemTypes = response.data.data.data
    //   } catch (error) {
    //     alert(error)
    //   }
    // },
    // async getItemUnitData() {
    //   try {
    //     const response = await axiosIns.get(`/item-units`)
    //     this.itemUnits = response.data.data.data
    //   } catch (error) {
    //     alert(error)
    //   }
    // },
    // async getWarehousesData() {
    //   try {
    //     const response = await axiosIns.get(`/warehouses`)
    //     this.warehouses = response.data.data.data
    //   } catch (error) {
    //     alert(error)
    //   }
    // },
    // async getDownloadData() {
    //   this.isLoadingDownload = true
    //   try {
    //     const response = await axiosIns.get(
    //       `/report/item?${this.warehousesQuery}${this.fromToDate}`
    //     )
    //   } catch (error) {
    //     console.info(error)
    //   }
    //   this.isLoadingDownload = false
    // },
  },
})
