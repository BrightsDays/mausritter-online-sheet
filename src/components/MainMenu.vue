<template>
  <aside class="menu">
    <div class="menu__header menu--bordered">
      <h1 class="menu__heading">
        Character Sheet v.0.0.0
      </h1>
      <!-- <button
         class="menu__toggle"
         @click="changeColorMode()"
     /> -->
    </div>
    <div class="menu__options menu--bordered">
      <ui-details
        title="Options"
        class="menu--bordered"
      >
        <button
          class="menu__item"
          @click="createCharacter()"
        >
          Create new character
        </button>
        <button
          class="menu__item"
          disabled
        >
          Upload character
        </button>
        <button
          class="menu__item"
          disabled
        >
          Download character
        </button>
        <button
          class="menu__item"
          disabled
        >
          Save to local storage
        </button>
        <button
          class="menu__item"
          disabled
        >
          Save as PDF
        </button>
      </ui-details>
      <ui-details title="Weapons">
        <menu-items :items-list="weaponList" />
      </ui-details>
      <ui-details title="Spells">
        <menu-items :items-list="spellList" />
      </ui-details>
      <ui-details title="Utilities">
        <menu-items :items-list="utilityList" />
      </ui-details>
      <ui-details title="Conditions">
        <menu-conditions />
      </ui-details>
    </div>
    <div class="menu__bank">
      <ui-details title="Banked items" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import UiDetails from './ui/UiDetails.vue'
import { useStore } from '../store/character'
import rollDices from '../helpers/rollDices'
import MenuItems from './menu/MenuItems.vue'
import MenuConditions from './menu/MenuConditions.vue'
import utilityData from '../data/utilityList.json'
import weaponData from '../data/weaponList.json'
import spellData from '../data/spellList.json'
import detailsList from '../data/detailsList.json'
import backgroundList from '../data/backgroundList.json'
import { Item, StatKeys, BackgroundKeys } from '../types'

const store = useStore()

const utilityList = utilityData.list as Item[]
const weaponList = weaponData.list as Item[]
const spellList = spellData.list as Item[]

const createCharacter = () => {
  store.setDescription('hireling', '')

  const statList = ['str', 'dex', 'wil', 'hp', 'pips']

  statList.forEach(item => {
    const value = (item === 'hp' || item === 'pips') ?
        rollDices(1, 6) :
        rollDices(3, 6, 'min')

    store.setStat(item as StatKeys, value)
    store.setStat((`max${item.charAt(0).toUpperCase() + item.slice(1)}` as StatKeys), value)

    if (item === 'hp') {
      store.setStat('hp', value)
      store.setStat('maxHp', value)
    }

    if (item === 'pips') {
      store.setStat('startPips', value)
    }
  })
    
  const background = backgroundList[store.maxHp as BackgroundKeys][store.pips as BackgroundKeys].background
  store.setDescription('background', background)

  store.updateItems('bodyBack', {
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

  const itemA = backgroundList[store.maxHp as BackgroundKeys][store.pips as BackgroundKeys].itemA
  const itemB = backgroundList[store.maxHp as BackgroundKeys][store.pips as BackgroundKeys].itemB

  const isHireling = (item: string): string | null => {
    if (item.includes('Hireling')) {
      store.setDescription('hireling', item)
      return null
    }
      
    return item
  }

  store.updateItems('packBack', {
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
  })//TODO: fix start items generate and choose

  const birthSign = ['Star', 'Wheel', 'Acorn', 'Storm', 'Moon', 'Mother']
  store.setDescription('birthSign', birthSign[rollDices(1, 6) - 1])

  const color = ['Chocolate', 'Black', 'White', 'Tan', 'Grey', 'Blue']
  const pattern = ['Solid', 'Brindle', 'Patchy', 'Banded', 'Marbled', 'Flecked']
    
  store.setDescription('coat', `${color[rollDices(1, 6) - 1]} ${pattern[rollDices(1, 6) - 1]}`)

  store.setDescription('details', detailsList[rollDices(1, detailsList.length) - 1])
}
</script>

<style lang="scss">
.menu {
  width: 250px;
  max-height: calc(100vh - 60px);
  overflow: scroll;

  &__header {
    padding: 15px;
    text-align: left;
  }

  &__heading {
    color: var(--main);
    font-size: 1.4em;
  }

  &__item {
    display: block;
    width: 100%;
    padding: 10px 0 10px 10px;
    font-size: 2em;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    color: var(--main);
    border: none;

    &:disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    &:hover {
      background-color: var(--second-background);
    }
  }

  &--bordered {
    border-bottom: 1px solid var(--main);
  }
}
</style>
