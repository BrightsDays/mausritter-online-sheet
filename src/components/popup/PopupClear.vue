<template>
  <PopupLayout
    title="Be careful"
    ok-button-text="Clear"
    @ok="clearCharacter()"
  >
    <template #body>
      <span class="content">
        This will delete your current character.
      </span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { useNotificationsStore } from '../../store/notifications'
import PopupLayout from './PopupLayout.vue'

const characterStore = useCharacterStore()
const notificationStore = useNotificationsStore()

const clearCharacter = () => {
  console.log('clear');
  
  characterStore.clearCharacter()

  notificationStore.setNotification({
    type: 'info',
    message: 'Character sheet has been cleared'
  })
}
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>