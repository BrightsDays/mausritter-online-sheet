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
import rollDices from '../../helpers/rollDices'
import { StatKeys } from '../../types'
import { useNotificationsStore } from '../../store/notifications'
import UiButton from '../ui/UiButton.vue'
import UiInput from '../ui/UiInput.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

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
    let newHp = 0
    
    if (level.value) {
      for (let index = 1; index <= level.value; index++) {
        ['str', 'dex', 'wil'].forEach((stat: string) => {
          const newRoll = rollDices(1, 20)

          if (newRoll > characterStore.stats[stat as StatKeys].max) {
            notificationStore.setNotification({
              type: 'info',
              message: `New ${stat} roll is equal ${newRoll} - it's more than previous, so  
              charater stat increase by 1`
            })
            characterStore.setStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
            characterStore.setMaxStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
          } else {
            notificationStore.setNotification({
              type: 'info',
              message: `New ${stat} roll is equal ${newRoll} - it's less than previous, so  
              charater stat don't increase`
            })
          }
        })

        if ((characterStore.level + index) === 2) {
          const roll = rollDices(2, 6)
          newHp = roll > newHp ? roll : newHp
        } else if ((characterStore.level + index) === 3) {
          const roll = rollDices(3, 6)
          newHp = roll > newHp ? roll : newHp
        } else {
          const roll = rollDices(4, 6)
          newHp = roll > newHp ? roll : newHp
        }
      }

      if (newHp > characterStore.stats.hp.max) {
        notificationStore.setNotification({
          type: 'info',
          message: `New HP roll is equal ${newHp} - it's more than previous, so now 
          charater have ${newHp} hp`
        })
        characterStore.setStat('hp', newHp)
        characterStore.setMaxStat('hp', newHp)
      } else {
        notificationStore.setNotification({
          type: 'info',
          message: `New HP roll is equal ${newHp} - it's less than previous, so now 
          charater have ${characterStore.stats.hp.max} + 1 hp`
        })
        characterStore.setStat('hp', characterStore.stats.hp.max + 1)
        characterStore.setMaxStat('hp', characterStore.stats.hp.max + 1)
      }
    }

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