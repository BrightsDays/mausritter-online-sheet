<template>
  <PopupLayout
    title="Add experience"
    ok-button-text="Add"
    :ok-button-disabled="+experience === 0"
    @ok="addExperience(experience)"
  >
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
  </PopupLayout>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import UiInput from '../ui/UiInput.vue'
import { levelUp } from '../../composables/levelUp'

const characterStore = useCharacterStore()

let experience = $ref(0)

const setExperience = (eventTraget: HTMLInputElement) => {
  if (+eventTraget.value === 0) {
    experience = 0
  } else {
    experience = +eventTraget.value
  }
}

const level = $computed(() => {
  let nextLevel = 1

  if (+characterStore.exp + +experience >= 1000) nextLevel = 2
  if (+characterStore.exp + +experience >= 3000) nextLevel = 3
  if (+characterStore.exp + +experience >= 6000) nextLevel = 4 + Math.floor(((+characterStore.exp + +experience) - 6000) / 5000)
  
  return (nextLevel - characterStore.level)
})

const addExperience = (exp: number) => {
  if (experience > 0) {
    levelUp(level)
    characterStore.addExperience(+exp)
    experience = 0
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
  text-align: center;
}
</style>