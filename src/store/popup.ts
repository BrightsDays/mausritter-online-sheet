import { defineStore } from 'pinia'
import { Popup, PopupTypes } from '../types'

export const usePopupStore = defineStore('popup', {
  state: (): Popup => ({
    type: null
  }),
  actions: {
    setPopup(payload: PopupTypes) {
      this.type = payload
    }
  }
})