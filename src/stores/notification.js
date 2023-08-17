import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import { useAuthStore } from './auth'

const toast = useToast()
// ITEM STORE
export const useNotificationStore = defineStore('notificationStore', {
  state: () => {
    return {
      responses: {},
      isLoading: false,
      isReadLoading: false,
      isStoreLoading: false,
      currentLimit: 5,
      currentData: {
        name: null,
      },
      itemDetailData: {
        name: null,
      },
      unread: 0,
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
    userQuery() {
      const authStore = useAuthStore()
      return 'user=' + authStore.userData.id
    },
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/notification?${this.userQuery}`)
        this.responses = response.data
        this.getRead()
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async getRead() {
      const authStore = useAuthStore()
      try {
        const unread = await axiosIns.get(
          `/notification/get-unread/${authStore.userData.id}`
        )
        this.unread = unread.data.data
      } catch (error) {
        alert(error)
      }
    },
    async update(item) {
      this.isReadLoading = true
      const data = {
        status: 'read',
      }
      try {
        const response = await axiosIns.put(`/notification/${item.id}`, data)
        if (response.status == 201) {
          const index = this.items.findIndex((item) => item.id === item.id)
          this.items[index].status = 'read'
          console.info(this.items[index])
          this.getRead()
        }
      } catch (error) {
        alert(error)
      }
      this.isReadLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/notification`, this.currentData)
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
