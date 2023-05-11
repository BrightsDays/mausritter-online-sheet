<template>
  <PopupLayout
    title="Form warband"
    ok-button-text="Form"
    @ok="form()"
  >
    <template #body>
      <span class="info">
        A warband will be formed by 20 fighting mice, <br>plus one follower (luggage porter, cook, armourer) for every fighter.
      </span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import createSimpleCard from '../../composables/createSimpleCard'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'

const characterStore = useCharacterStore()
const notificationStore = useNotificationsStore()

const form = () => {
  characterStore.addWarband(createSimpleCard(undefined, true))
  
  notificationStore.setNotification({
    type: 'info',
    message: 'Warband has been formed'
  })
}
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