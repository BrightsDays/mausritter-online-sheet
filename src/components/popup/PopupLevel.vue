<template>
  <new-popup-layout title="Add experience">
    <template #body>
      <UiInput
        v-model="experience"
        label="Value"
        type="number"
        @input="setExperience($event.target as HTMLInputElement)"
      />
      <span class="content">
        You will gain {{ level }} levels
      </span>
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        :disabled="+experience === 0"
        text="Add"
        type="big"
        @click.prevent="addExperience(experience)"
      />
    </template>
  </new-popup-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import NewPopupLayout from './PopupLayout.vue'
import UiButton from '../ui/UiButton.vue'
import UiInput from '../ui/UiInput.vue'
import { levelUp } from '../../composables/levelUp'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const experience = ref(0)

const setExperience = (eventTraget: HTMLInputElement) => {
  if (+eventTraget.value === 0) {
    experience.value = 0
  } else {
    experience.value = +eventTraget.value
  }
}

const level = computed(() => {
  let nextLevel = 1

  if (+characterStore.exp + +experience.value >= 1000) nextLevel = 2
  if (+characterStore.exp + +experience.value >= 3000) nextLevel = 3
  if (+characterStore.exp + +experience.value >= 6000) nextLevel = 4 + Math.floor(((+characterStore.exp + +experience.value) - 6000) / 5000)
  
  return (nextLevel - characterStore.level)
})

const close = () => popupStore.setPopup(null)

const addExperience = (exp: number) => {
  if (experience.value > 0) {
    levelUp(level.value)
    characterStore.addExperience(+exp)
    experience.value = 0
    close()
  }
}

const levelUpByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addExperience(experience.value)
  }
}
onMounted(() => window.addEventListener('keydown', levelUpByClick))
onUnmounted(() => window.removeEventListener('keydown', levelUpByClick))
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
  text-align: center;
}
</style>