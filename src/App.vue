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
import MainMenu from './components/MainMenu.vue'
import CharacterList from './components/CharacterList.vue'
import { usePopupStore } from './store/popup'
import PopupCreation from './components/popup/PopupCreation.vue'
import PopupHireling from './components/popup/PopupHireling.vue'

const popup = usePopupStore()//TODO Move to index
</script>

<style lang="scss">
.app {
  display: flex;
  width: 900px;
  height: 776px;
  justify-content: space-between;
  margin: 20px auto 0;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  gap: 15px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
