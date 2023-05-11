<template>
  <PopupLayout
    title="Be careful"
    cancel-button-text="No"
    ok-button-text="Yes"
    @ok="removeHireling()"
  >
    <template #body>
      <span class="content">Do you want to remove hireling?</span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'

const characterStore = useCharacterStore()
const notificationStore = useNotificationsStore()

const removeHireling = () => {
  if (typeof characterStore.hirelingIndex === 'number') {
    characterStore.removeHireling(characterStore.hirelingIndex)

    notificationStore.setNotification({
      type: 'info',
      message: 'Hireling has been removed'
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>