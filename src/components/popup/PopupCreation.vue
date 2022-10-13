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
        <span class="popup__stats">STR: {{ characterStore.stats.str.max }}</span>
        <span class="popup__stats">DEX: {{ characterStore.stats.dex.max }}</span>
        <span class="popup__stats">WIL: {{ characterStore.stats.wil.max }}</span>
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
          <option value="Light">
            Light
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="Heavy">
            Heavy
          </option>
          <option value="Light ranged">
            Light ranged
          </option>
          <option value="Heavy ranged">
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
import weaponList from '../../data/weaponList.json'
import utilityList from '../../data/utilityList.json'
import detailsList from '../../data/detailsList.json'
import spellList from '../../data/spellList.json'
import armorList from '../../data/armorList.json'
import backgroundList from '../../data/backgroundList.json'
import { BackgroundKeys, Item, StatKeys } from '../../types'
import { useStore } from '../../store/character'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePopupStore } from '../../store/popup'
import createHireling from '../../helpers/createHireling'

const characterStore = useStore()
const popupStore = usePopupStore()
let save = false

const weapon = ref('')

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

  const pips = rollDices(1, 6)
  characterStore.setValue('pips', pips)
  characterStore.setValue('startPips', pips)

  rollStats(characterStore)

  statsForSwap.value = {
    str: characterStore.stats.str.current,
    dex: characterStore.stats.dex.current,
    wil: characterStore.stats.wil.current
  }

  const background = 
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].background
  characterStore.setDescription('background', background)

  itemsForSelect.value.itemA = 
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].itemA
  itemsForSelect.value.itemB = 
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].itemB
  // itemsForSelect.value.itemA = 
  //   backgroundList[1][2].itemA
  // itemsForSelect.value.itemB = 
  //   backgroundList[1][2].itemB //TODO test values

  if (!Object.values(statsForSwap.value).filter(item => item > 9).length) {
    selectItem.value = false
  }
}

const saveCharacter = () => {
  if (swapStats.value.first !== swapStats.value.second) {
    characterStore.setStat(
      swapStats.value.first as StatKeys,
      statsForSwap.value[swapStats.value.second as 'str' | 'dex' | 'wil']
    )
    characterStore.setMaxStat(
      swapStats.value.first as StatKeys,
      statsForSwap.value[swapStats.value.second as 'str' | 'dex' | 'wil']
    )

    characterStore.setStat(
      swapStats.value.second as StatKeys,
      statsForSwap.value[swapStats.value.first as 'str' | 'dex' | 'wil']
    )
    characterStore.setMaxStat(
      swapStats.value.second as StatKeys,
      statsForSwap.value[swapStats.value.first as 'str' | 'dex' | 'wil']
    )
  }

  const findItem = (title: string) => {
    console.log(title);
    

    return (
      utilityList.list.find(item => item.title === title) as Item ||
      weaponList.list.find(item => item.title === title) as Item ||
      armorList.list.find(item => item.title === title) as Item ||
      spellList.list.find(item => item.title === title) as Item )
  }

  const isHireling = (item: string): Item | null => {
    if (item.includes('Hireling')) {
      characterStore.addHireling(createHireling(item))
      return null
    }
    
    return findItem(item)
  }

  characterStore.updateItems('bodyBack', {
    'Main Paw': {
      name: 'Main Paw',
      item: null,
      used: 0
    },
    'Main Body': {
      name: 'Main Body',
      item: null,
      used: 0
    },
    'Second Paw': {
      name: 'Second Paw',
      item: null,
      used: 0
    },
    'Second Body': {
      name: 'Second Body',
      item: null,
      used: 0
    }
  })

  characterStore.updateItems('packBack', {    
    1: {
      name: '1',
      item: weaponList.list.find(item => item.type === weapon.value) as Item,
      used: 0
    },
    2: {
      name: '2',
      item: {
        title: 'Torches',
        stat: '',
        image: '',
        type: 'Utility',
        group: 'items'
      },
      used: 0
    },
    3: {
      name: '3',
      item: {
        title: 'Rations',
        stat: '',
        image: '',
        type: 'Utility',
        group: 'items'
      },
      used: 0
    },
    4: {
      name: '4',
      item: selectItem.value 
        ? isHireling(startItem.value)
        : findItem(itemsForSelect.value.itemA),
      used: 0
    },
    5: {
      name: '5',
      item: selectItem.value
        ? null 
        : isHireling(itemsForSelect.value.itemB),
      used: 0
    },
    6: {
      name: '6',
      item: null,
      used: 0
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