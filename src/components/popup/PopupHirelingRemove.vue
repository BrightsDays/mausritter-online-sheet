<template>
  <popup-layout>
    <h3 class="popup__header">
      Be careful
    </h3>
    <div class="popup__form">
      <div class="popup__section">
        <span class="popup__label">Do you want to remove hireling?</span>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          No
        </button>
        <button
          class="popup__button"
          @click.prevent="removeHireling()"
        >
          Yes
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

const removeHireling = () => {
  if (typeof characterStore.hirelingIndex === 'number') {
    characterStore.removeHireling(characterStore.hirelingIndex)

    notificationStore.setNotification({
      type: 'info',
      message: 'Hireling has been removed'
    })
  }

  close()
}

const clearByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') removeHireling()
}

onMounted(() => window.addEventListener('keyup', clearByClick))

onUnmounted(() => window.removeEventListener('keyup', clearByClick))
</script>