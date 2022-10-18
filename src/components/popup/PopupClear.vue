<template>
  <popup-layout>
    <h3 class="popup__header">
      Be careful
    </h3>
    <form class="popup__form">
      <div class="popup__section">
        <span class="popup__label">This will delete your current character.</span>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          Cancel
        </button>
        <button
          class="popup__button"
          @click.prevent="clearCharacter()"
        >
          OK
        </button>
      </div>
    </form>
  </popup-layout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const close = () => popupStore.setPopup(null)

const clearCharacter = () => {
  characterStore.clearCharacter()
  close()
}
</script>