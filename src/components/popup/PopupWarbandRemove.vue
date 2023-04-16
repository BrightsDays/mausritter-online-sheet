<template>
  <new-popup-layout title="Be careful">
    <template #body>
      <span class="content">Do you want to disband warband?</span>
    </template>
    <template #footer>
      <UiButton
        text="No"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        text="Yes"
        type="big"
        @click.prevent="disband()"
      />
    </template>
  </new-popup-layout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import NewPopupLayout from './PopupLayout.vue'
import { onMounted, onUnmounted } from 'vue'
import { useNotificationsStore } from '../../store/notifications'
import UiButton from '../ui/UiButton.vue'
import router from '../../router'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

const close = () => popupStore.setPopup(null)

const disband = () => {
  characterStore.removeWarband()
  
  notificationStore.setNotification({
    type: 'info',
    message: 'Warband has been removed'
  })

  close()
  router.push('/')
}

const clearByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    disband()
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