<template>
  <PopupLayout
    title="New character"
    @ok="userInformed()"
  >
    <template #body>
      <span class="content">This will delete your current character.</span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { useNotificationsStore } from '../../store/notifications'
import { usePopupStore } from '../../store/popup'
import PopupLayout from './PopupLayout.vue'

const popupStore = usePopupStore()
const characterStore = useCharacterStore()
const notificationStore  = useNotificationsStore()

const userInformed = () => {
  characterStore.clearCharacter()

  notificationStore.setNotification({
    type: 'info',
    message: 'Character sheet has been cleared'
  })

  popupStore.setPopup(popupStore.nextPopup)
  popupStore.setNextPopup()
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>