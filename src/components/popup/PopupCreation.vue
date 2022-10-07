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
      <div
        v-if="selectItem" 
        class="popup__section"
      >
        <label class="popup__label">Select item</label>
        <select
          v-model="startItem"
          class="popup__select"
        >
          <option
            v-for="item in itemsForSelect"
            :key="item"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="popup__section">
        <label class="popup__label">Select weapon</label>
        <select
          v-model="weapon"
          class="popup__select"
          def
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
          :disabled="characterStore.name.length < 3 || 
            (selectItem && startItem === '') ||
            !weapon"
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
import createHireling from '../../helpers/createHireling'

const characterStore = useStore()
const popupStore = usePopupStore()
let save = false

const weapon = ref('')
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

const selectItem = ref(true)
const startItem = ref('')
const itemsForSelect = ref({
  itemA: '',
  itemB: ''
})

const close = () => popupStore.setPopup(null)

const createCharacter = () => {
  characterStore.clearCharacter()

  rollStats(['str', 'dex', 'wil', 'hp', 'pips'], characterStore)

  statsForSwap.value = {
    str: characterStore.str,
    dex: characterStore.dex,
    wil: characterStore.wil
  }

  const background = 
    backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].background
  characterStore.setDescription('background', background)

  itemsForSelect.value.itemA = 
    backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].itemA
  itemsForSelect.value.itemB = 
    backgroundList[characterStore.maxHp as BackgroundKeys][characterStore.pips as BackgroundKeys].itemB
  
  if (!Object.values(statsForSwap.value).filter(item => item > 9).length) {
    selectItem.value = false
  }
}

const saveCharacter = () => {
  characterStore.setDescription('hireling', '')

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

  const isHireling = (item: string): string | null => {
    if (item.includes('Hireling')) {
      characterStore.addHireling(createHireling(item))
      return null
    }
      
    return item
  }

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
      item: selectItem.value ? isHireling(startItem.value) : itemsForSelect.value.itemA
    },
    5: {
      name: '5',
      item: selectItem.value ? null : isHireling(itemsForSelect.value.itemB)
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
}

onMounted(() => {
  createCharacter()
})

onUnmounted(() => {
  if (!save) characterStore.clearCharacter()
})
</script>