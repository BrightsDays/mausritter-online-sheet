export interface Popup {
  type: PopupTypes
}

export interface Notification {
  type: 'info' | 'error'
  message: string
}

export interface NotificationList {
  notificationList: Notification[]
}

export type PopupTypes = 'new' | 'full' | 'addHireling' | 'removeHireling' | 'formWarband' | 'disbandWarband' | 'levelUp' | 'clear' | 'upload' | 'info' | 'addCustomItem' | null