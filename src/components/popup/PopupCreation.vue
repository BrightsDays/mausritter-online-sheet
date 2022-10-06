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
        <select
          v-model="swapStats.first"
          class="popup__select"
        >
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
        <select
          v-model="swapStats.second"
          class="popup__select"
        >
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
        <select
          v-model="weapon"
          class="popup__select"
        >
          <option value="light">
            Light
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="heavy">
            Heavy
          </option>
          <option value="light_ranged">
            Light ranged
          </option>
          <option value="heavy_ranged">
            Heavy ranged
          </option>
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
import rollStats from '../../helpers/rollStats'
import detailsList from '../../data/detailsList.json'
import backgroundList from '../../data/backgroundList.json'
import { BackgroundKeys, StatKeys } from '../../types'
import { useStore } from '../../store/character'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePopupStore } from '../../store/popup'

const characterStore = useStore()
const popupStore = usePopupStore()
let save = false

const weapon = ref('medium')
const weaponList = {
  light: 'Needle',
  medium: 'Sword',
  heavy: 'Trashhook',
  light_ranged: 'Sling',
  heavy_ranged: 'Bow'
}

const statsForSwap = ref({
  str: 0,
  dex: 0,
  wil: 0
})
const swapStats = ref({
  first: 'str',
  second: 'str'
})

const close = () => popupStore.setPopup(null)

const createCharacter = () => {
  rollStats(['str', 'dex', 'wil'], characterStore)

  statsForSwap.value = {
    str: characterStore.str,
    dex: characterStore.dex,
    wil: characterStore.wil
  }
}

const saveCharacter = () => {
  characterStore.setDescription('hireling', '')

  rollStats(['hp', 'pips'], characterStore)

  if (swapStats.value.first !== swapStats.value.second) {
    characterStore.setStat(
      swapStats.value.first as StatKeys,
      statsForSwap.value[swapStats.value.second as 'str' | 'dex' | 'wil']
    )
    characterStore.setStat(
      (`max${(swapStats.value.first as StatKeys).charAt(0).toUpperCase()
        + (swapStats.value.first as StatKeys).slice(1)}` as StatKeys),
      statsForSwap.value[swapStats.value.second as 'str' | 'dex' | 'wil']
    )
    characterStore.setStat(
      swapStats.value.second as StatKeys,
      statsForSwap.value[swapStats.value.first as 'str' | 'dex' | 'wil']
    )
    characterStore.setStat(
      (`max${(swapStats.value.second as StatKeys).charAt(0).toUpperCase()
        + (swapStats.value.second as StatKeys).slice(1)}` as StatKeys),
      statsForSwap.value[swapStats.value.first as 'str' | 'dex' | 'wil']
    )
  }
    
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
      item: weaponList[weapon.value as keyof typeof weaponList]
    },
    2: {
      name: '2',
      item: 'Torches'
    },
    3: {
      name: '3',
      item: 'Rations'
    },
    4: {
      name: '4',
      item: itemA
    },
    5: {
      name: '5',
      item: isHireling(itemB)
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



  save = true

  close()
}//TODO Take two items if highted stat is < 10, or choose one

onMounted(() => {
  createCharacter()
})

onUnmounted(() => {
  if (!save) characterStore.clearCharacter()
})
</script>