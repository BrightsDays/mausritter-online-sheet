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
    <Transition>
      <popup-level
        v-if="popup.type === 'levelUp'"
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
import PopupLevel from './popup/PopupLevel.vue'
import { useCharacterStore } from '../store/character'
import { onMounted } from 'vue'

const popup = usePopupStore()
const characterStore = useCharacterStore()

characterStore.$subscribe(() => {
  const character = { ...characterStore }

  Object.keys(character).forEach(key => {
    if (key.includes('_') || key.includes('$')) {
      delete character[key as keyof typeof character]
    }
  })
  
  localStorage.setItem('mr__character', JSON.stringify(character))
})

onMounted(() => {
  const character = localStorage.getItem('mr__character')

  if (character) characterStore.fillCharacter(JSON.parse(character))
})
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
