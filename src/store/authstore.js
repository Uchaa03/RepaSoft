// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        //Get data in localstorage
        access_token: localStorage.getItem('access_token') || null,
        user_type: localStorage.getItem('user_type') || null,
        change_password: JSON.parse(localStorage.getItem('change_password') || 'false'),
    }),
    getters: {
      //For get states in pinia
      isAuthenticated: (state) => !!state.access_token,
      userType: (state) => state.user_type,
      shouldChangePassword: (state) => state.change_password,

    },
    actions: {
        //Set data in pinia and localstorage
        setAuthData(data) {
            this.access_token = data.access_token
            this.user_type = data.user_type
            //If tech is undefined return false and if client return 1/0 boolean = true/false
            this.change_password = typeof data.user?.change_password !== undefined ?
                Boolean(data.user.change_password)
                : false

            localStorage.setItem('access_token', this.access_token)
            localStorage.setItem('user_type', this.user_type)
            localStorage.setItem('change_password', JSON.stringify(this.change_password))
        },
        updatePassword(state) {
            this.change_password = state
            localStorage.setItem('change_password', JSON.stringify(state));
        },
        clearAuthData() {
            //Delete data when user logout
            this.access_token = null
            this.user_type = null
            this.change_password = false

            localStorage.removeItem('access_token')
            localStorage.removeItem('user_type')
            localStorage.removeItem('change_password')
        }
    }
})
