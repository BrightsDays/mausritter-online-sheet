<template>
  <popup-layout>
    <h3 class="popup__header">
      Be careful
    </h3>
    <div class="popup__form">
      <div class="popup__section">
        <span class="popup__label">This will delete your current character.</span>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          Cancel
        </button>
        <button
          class="popup__button"
          @click.prevent="clearCharacter()"
        >
          OK
        </button>
      </div>
    </div>
  </popup-layout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { onMounted, onUnmounted } from 'vue'
import { useNotificationsStore } from '../../store/notifications'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

const close = () => popupStore.setPopup(null)

const clearCharacter = () => {
  characterStore.clearCharacter()

  notificationStore.setNotification({
    type: 'info',
    message: 'Character sheet has been cleared'
  })

  close()
}

const clearByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') clearCharacter()
}

onMounted(() => window.addEventListener('keyup', clearByClick))

onUnmounted(() => window.removeEventListener('keyup', clearByClick))
</script>