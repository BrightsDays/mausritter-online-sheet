<template>
  <new-popup-layout title="Be careful">
    <template #body>
      <span class="content">
        This will delete your current character.
      </span>
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        text="OK"
        type="big"
        @click.prevent="clearCharacter()"
      />
    </template>
  </new-popup-layout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import { useNotificationsStore } from '../../store/notifications'
import NewPopupLayout from './PopupLayout.vue'
import { onMounted, onUnmounted } from 'vue'
import UiButton from '../ui/UiButton.vue'

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
  if (event.key === 'Enter') {
    event.preventDefault()
    clearCharacter()
  }
}
onMounted(() => window.addEventListener('keyup', clearByClick))
onUnmounted(() => window.removeEventListener('keyup', clearByClick))
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>