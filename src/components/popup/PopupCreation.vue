<template>
  <popup-layout>
    <h3 class="popup__header">
      New character
    </h3>
    <form class="popup__form">
      <div class="popup__section">
        <label class="popup__label">Name</label>
        <input
          v-model="characterStore.name"
          class="popup__input"
        >
      </div>
      <div class="popup__section">
        <span class="popup__stats">STR: {{ characterStore.maxStr }}</span>
        <span class="popup__stats">DEX: {{ characterStore.maxDex }}</span>
        <span class="popup__stats">WIL: {{ characterStore.maxWil }}</span>
      </div>
      <div class="popup__section">
        <label class="popup__label">Swap stats</label>
        <select class="popup__select">
          <option value="str">
            STR
          </option>
          <option value="dex">
            DEX
          </option>
          <option value="wil">
            WIL
          </option>
        </select>
        <select class="popup__select">
          <option value="str">
            STR
          </option>
          <option value="dex">
            DEX
          </option>
          <option value="wil">
            WIL
          </option>
        </select>
      </div>
      <div class="popup__section">
        <label class="popup__label">Select weapon</label>
        <select class="popup__select">
          <option>light</option>
          <option>medium</option>
          <option>heavy</option>
          <option>light ranged</option>
          <option>heavy ranged</option>
        </select>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          Cancel
        </button>
        <button
          :disabled="characterStore.name.length < 3"
          class="popup__button"
          @click.prevent="saveCharacter()"
        >
          Create
        </button>
      </div>
    </form>
  </popup-layout>
</template>

<script setup lang="ts">
import PopupLayout from './PopupLayout.vue'
import rollDices from '../../helpers/rollDices'
import detailsList from '../../data/detailsList.json'
import backgroundList from '../../data/backgroundList.json'
import { StatKeys, BackgroundKeys } from '../../types'
import { useStore } from '../../store/character'
import { onMounted, onUnmounted } from 'vue'
import { usePopupStore } from '../../store/popup'

const characterStore = useStore()
const popupStore = usePopupStore()
let save = false

const close = () => popupStore.setPopup(null)

const createCharacter = () => {
  characterStore.setDescription('hireling', '')

  const statList = ['str', 'dex', 'wil', 'hp', 'pips']

  statList.forEach(item => {
    const value = (item === 'hp' || item === 'pips') ?
        rollDices(1, 6) :
        rollDices(3, 6, 'min')

    characterStore.setStat(item as StatKeys, value)
    characterStore.setStat((`max${item.charAt(0).toUpperCase() + item.slice(1)}` as StatKeys), value)

    if (item === 'hp') {
      characterStore.setStat('hp', value)
      characterStore.setStat('maxHp', value)
    }

    if (item === 'pips') {
      characterStore.setStat('startPips', value)
    }
  })
    
  const background = backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].background
  characterStore.setDescription('background', background)

  characterStore.updateItems('bodyBack', {
    'Main Paw': {
      name: 'Main Paw',
      item: null
    },
    'Main Body': {
      name: 'Main Body',
      item: null
    },
    'Second Paw': {
      name: 'Second Paw',
      item: null
    },
    'Second Body': {
      name: 'Second Body',
      item: null
    }
  })

  const itemA = backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].itemA
  const itemB = backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].itemB

  const isHireling = (item: string): string | null => {
    if (item.includes('Hireling')) {
      characterStore.setDescription('hireling', item)
      return null
    }
      
    return item
  }

  characterStore.updateItems('packBack', {
    1: {
      name: '1',
      item: 'Torches'
    },
    2: {
      name: '2',
      item: 'Rations'
    },
    3: {
      name: '3',
      item: isHireling(itemA)
    },
    4: {
      name: '4',
      item: isHireling(itemB)
    },
    5: {
      name: '5',
      item: null
    },
    6: {
      name: '6',
      item: null
    }
  })

  const birthSign = ['Star', 'Wheel', 'Acorn', 'Storm', 'Moon', 'Mother']
  characterStore.setDescription('birthSign', birthSign[rollDices(1, 6) - 1])

  const color = ['Chocolate', 'Black', 'White', 'Tan', 'Grey', 'Blue']
  const pattern = ['Solid', 'Brindle', 'Patchy', 'Banded', 'Marbled', 'Flecked']
    
  characterStore.setDescription('coat', `${color[rollDices(1, 6) - 1]} ${pattern[rollDices(1, 6) - 1]}`)

  characterStore.setDescription('details', detailsList[rollDices(1, detailsList.length) - 1])
}

const saveCharacter = () => {
  save = true
  close()
}

onMounted(() => {
  createCharacter()
})

onUnmounted(() => {
  if (!save) characterStore.clearCharacter()
})
</script>