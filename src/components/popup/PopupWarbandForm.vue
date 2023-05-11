<template>
  <PopupLayout title="Form warband">
    <template #body>
      <span class="info">
        A warband will be formed by 20 fighting mice, <br>plus one follower (luggage porter, cook, armourer) for every fighter.
      </span>
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        text="Form"
        type="big"
        @click.prevent="form()"
      />
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import createSimpleCard from '../../composables/createSimpleCard'
import { useCharacterStore } from '../../store/character'
import { usePopupStore } from '../../store/popup'
import UiButton from '../ui/UiButton.vue'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

const close = () => popupStore.setPopup(null)

const form = () => {
  characterStore.addWarband(createSimpleCard(undefined, true))
  
  notificationStore.setNotification({
    type: 'info',
    message: 'Warband has been formed'
  })

  close()
}

const formByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    form()
  }
}

onMounted(() => window.addEventListener('keyup', formByClick))
onUnmounted(() => window.removeEventListener('keyup', formByClick))
</script>

<style lang="scss" scoped>
.info {
  text-align: center;
  color: var(--main);
  font-family: "Ubuntu", sans-serif;
  font-size: 1.6em;
  margin-bottom: 10px;
}
</style>