export interface Popup {
  type: PopupTypes,
  nextPopup: 'new' | 'upload' | null
}

export interface Notification {
  type: 'info' | 'error'
  message: string
}

export interface NotificationList {
  notificationList: Notification[]
}

export type PopupTypes = 'new' | 'inform' | 'full' | 'addHireling' | 'removeHireling' | 'formWarband' | 'disbandWarband' | 'levelUp' | 'clear' | 'upload' | 'info' | 'addCustomItem' | null