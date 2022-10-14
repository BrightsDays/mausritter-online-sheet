<template>
  <div class="app">
    <Transition>
      <popup-creation
        v-if="popup.type === 'new'"
      />
    </Transition>
    <Transition>
      <popup-hireling
        v-if="popup.type === 'addHireling'"
      />
    </Transition>
    <main-menu />
    <character-list />
  </div>
</template>

<script setup lang="ts">
import MainMenu from './menu/MenuSection.vue'
import CharacterList from './sheet/CharSheet.vue'
import { usePopupStore } from '../store/popup'
import PopupCreation from './popup/PopupCreation.vue'
import PopupHireling from './popup/PopupHireling.vue'

const popup = usePopupStore()
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
