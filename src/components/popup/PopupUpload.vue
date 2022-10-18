<template>
  <popup-layout>
    <h3 class="popup__header">
      Upload character
    </h3>
    <form
      v-if="!informed"
      class="popup__form"
    >
      <div class="popup__section">
        <span class="popup__label">It will clear your current character.</span>
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
          @click.prevent="informed = true"
        >
          Upload
        </button>
      </div>
    </form>
    <form
      v-else
      class="popup__form"
    >
      <div class="popup__section popup__section--upload">
        <input
          id="upload"
          ref="upload"
          type="file"
          accept=".json"
          class="popup__input--upload"
          @change="uploadCharacter($event)"
        >
        <label
          for="upload"
          class="popup__label popup__label--upload"
        >
          Upload character
        </label>
      </div>
    </form>
  </popup-layout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { onMounted, ref } from 'vue';

const informed = ref(false)

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const close = () => popupStore.setPopup(null)

const uploadCharacter = (event: Event) => {
  if (event.target) {
    const reader = new FileReader()

    reader.onload = (read) => {
      if (read?.target?.result) {
        const testCharacter = { ...characterStore }

        Object.keys(testCharacter).forEach(key => {
          if (key.includes('_') || key.includes('$')) {
            delete testCharacter[key as keyof typeof testCharacter]
          }
        })

        const character = JSON.parse(read.target.result)
        let isValid = true
        
        Object.keys(character).forEach((key: string) => {
          if (!Object.keys(testCharacter).includes(key)) {
            isValid = false
          }
        })

        if (isValid) characterStore.fillCharacter(character)
      }
    }

    reader.readAsText(event.target.files[0])
  }

  close()
}

onMounted(() => {
  if (!characterStore.name) informed.value = true
})
</script>