<template>
  <PopupLayout
    title="Be careful"
    cancel-button-text="No"
    ok-button-text="Yes"
    @ok="disband()"
  >
    <template #body>
      <span class="content">Do you want to disband warband?</span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'
import router from '../../router'

const characterStore = useCharacterStore()
const notificationStore = useNotificationsStore()

const disband = () => {
  characterStore.removeWarband()
  
  notificationStore.setNotification({
    type: 'info',
    message: 'Warband has been removed'
  })

  router.push('/')
}
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>