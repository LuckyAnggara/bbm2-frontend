import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'
import { getActivePinia } from 'pinia'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    userLogin: {
      username: null,
      password: null,
    },
    userData: null,
  }),
  actions: {
    async login() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/login`, {
          username: this.userLogin.username,
          password: this.userLogin.password,
        })
        const data = response.data
        if (response.status == 200) {
          localStorage.setItem('token', JSON.stringify(data.data.token))
          localStorage.setItem('userData', JSON.stringify(data.data.user))
          toast.success(data.message, {
            timeout: 1500,
            position: 'top-left',
          })
          return true
        }
        if (response.status == 202) {
          toast.warning(data.message, {
            timeout: 2000,
            position: 'top-left',
          })
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isLoading = false
      }
      return false
    },
    async logout() {
      this.isLoading = true

      try {
        const response = await axiosIns.get(`/logout`)
        if (response.status == 200) {
          if (response.data == 'error') {
            localStorage.clear()
          } else {
            localStorage.removeItem('userData')
            localStorage.removeItem('token')
          }

          const pinia = getActivePinia()

          pinia._s.forEach((store) => console.info(store))
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    isLoggedIn() {
      const user = localStorage.getItem('userData')
      if (user) {
        this.userData = JSON.parse(user)
        nextTick()
        return true
      }
      return false
    },
  },
})
