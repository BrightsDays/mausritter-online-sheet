<template>
  <div class="app">
    <template
      v-for="item in popups"
      :key="`pu__${item}`"
    >
      <Teleport to="body">
        <Transition>
          <component
            :is="activePopup(item)"
            v-if="popup.type === item"
          />
        </Transition>
      </Teleport>
    </template>
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
import PopupClear from './popup/PopupClear.vue'
import PopupUpload from './popup/PopupUpload.vue'
import PopupInfo from './popup/PopupInfo.vue'
import { useCharacterStore } from '../store/character'
import { onMounted } from 'vue'

const popup = usePopupStore()
const characterStore = useCharacterStore()

const popups = ['new', 'full', 'addHireling', 'levelUp', 'clear', 'upload', 'info']

const activePopup = (type: string) => {
  switch (type) {
    case 'new':
      return PopupCreation
    case 'addHireling':
      return PopupHireling
    case 'levelUp':
      return PopupLevel
    case 'clear':
      return PopupClear
    case 'upload':
      return PopupUpload
    case 'info':
      return PopupInfo
    default:
      return null
  }
}

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
//TODO Fix all bem-css
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
