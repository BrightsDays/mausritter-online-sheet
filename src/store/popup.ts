import { defineStore } from 'pinia'
import { Popup, PopupTypes } from '../types/popup'

export const usePopupStore = defineStore('popup', {
  state: (): Popup => ({
    type: null,
    nextPopup: null
  }),
  actions: {
    setPopup(payload: PopupTypes, ) {
      this.type = payload
    },
    setNextPopup(popup?: 'new' | 'upload') {
      popup ?
        this.nextPopup = popup :
        this.nextPopup = null
    }
  }
})