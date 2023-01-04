import { defineStore } from 'pinia'
import { Notification, NotificationList } from '../types'

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationList => ({
    notificationList: []
  }),
  actions: {
    removeNotification(payload: Notification) {
      setTimeout(() => {
        const index = this.notificationList.findIndex(object => {
          return object.message === payload.message
        })
        
        this.notificationList.splice(index, 1)
      }, 8000)
    },

    setNotification(payload: Notification) {
      this.notificationList.push(payload)

      const store = useNotificationsStore()
      store.removeNotification(payload)
    }
  }
})