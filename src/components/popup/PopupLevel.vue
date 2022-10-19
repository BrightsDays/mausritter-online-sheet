<template>
  <popup-layout>
    <h3 class="popup__header">
      Add experience
    </h3>
    <form class="popup__form">
      <div class="popup__section">
        <label class="popup__label">Value</label>
        <input
          v-maska="'######'"
          :value="experience"
          class="popup__input"
          @input="setExperience($event.target as HTMLInputElement)"
        >
      </div>
      <div class="popup__section popup__section--info">
        <span class="popup__label">
          You will gain {{ level }} levels
        </span>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          Cancel
        </button>
        <button
          :disabled="+experience === 0"
          class="popup__button"
          @click.prevent="addExperience(experience)"
        >
          Add
        </button>
      </div>
    </form>
  </popup-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import rollDices from '../../helpers/rollDices'
import { StatKeys } from '../../types'

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

let currentLevel = 1

if (+characterStore.exp >= 1000) currentLevel = 2
if (+characterStore.exp >= 3000) currentLevel = 3
if (+characterStore.exp >= 6000) currentLevel = 4 + Math.floor((+characterStore.exp - 6000) / 5000)

const level = computed(() => {
  let nextLevel = 1

  if (+characterStore.exp + +experience.value >= 1000) nextLevel = 2
  if (+characterStore.exp + +experience.value >= 3000) nextLevel = 3
  if (+characterStore.exp + +experience.value >= 6000) nextLevel = 4 + Math.floor(((+characterStore.exp + +experience.value) - 6000) / 5000)
  
  return (nextLevel - currentLevel)
})

const close = () => popupStore.setPopup(null)

const addExperience = (exp: number) => {
  let newHp = 0

  if (level.value) {
    for (let index = 1; index <= level.value; index++) {
      ['str', 'dex', 'wil'].forEach((stat: string) => {
        const newRoll = rollDices(1, 20)

        if (newRoll > characterStore.stats[stat as StatKeys].max) {
          characterStore.setStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
          characterStore.setMaxStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
        }
      })

      if ((currentLevel + index) === 2) {
        const roll = rollDices(2, 6)
        newHp = roll > newHp ? roll : newHp
      } else if ((currentLevel + index) === 3) {
        const roll = rollDices(3, 6)
        newHp = roll > newHp ? roll : newHp
      } else {
        const roll = rollDices(4, 6)
        newHp = roll > newHp ? roll : newHp
      }
    }
  }

  if (newHp > characterStore.stats.hp.max) {
    characterStore.setStat('hp', newHp)
    characterStore.setMaxStat('hp', newHp)
  } else {
    characterStore.setStat('hp', characterStore.stats.hp.max + 1)
    characterStore.setMaxStat('hp', characterStore.stats.hp.max + 1)
  }

  characterStore.addExperience(+exp)

  close()
}
</script>