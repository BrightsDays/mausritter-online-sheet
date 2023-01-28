<template>
  <aside class="menu">
    <div class="menu__header menu--bordered">
      <h1 class="menu__heading">
        Character Sheet v.0.1.4
      </h1>
      <button
        class="menu__info"
        @click="popupStore.setPopup('info')"
      >
        i
      </button>
    </div>
    <div class="menu__options">
      <ui-details
        title="Options"
        class="menu--bordered"
        :is-open="true"
      >
        <button
          class="menu__item"
          @click="createNewCharacter()"
        >
          Create new character
        </button>
        <button
          class="menu__item"
          :disabled="!characterStore.name"
          @click="downloadCharacter()"
        >
          Download character
        </button>
        <div>
          <button
            class="menu__item"
            @click="popupStore.setPopup('upload')"
          >
            Upload character
          </button>
        </div>
        <button
          class="menu__item"
          :disabled="!characterStore.name"
          @click="popupStore.setPopup('clear')"
        >
          Clear sheet
        </button>
      </ui-details>
    </div>
    <div
      v-if="characterStore.name"
      class="menu__options menu--bordered"
    >
      <ui-details title="Weapons">
        <menu-items :items-list="weaponList" />
      </ui-details>
      <ui-details title="Armors">
        <menu-items :items-list="armorList" />
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
      <div
        v-if="characterStore.name"
        class="menu__options"
      >
        <button
          class="menu__item menu__item--big"
          @click.prevent="addCustomItem()"
        >
          Add custom item
        </button>
      </div>
    </div>
    <div
      v-if="characterStore.name"
      class="menu__options menu--bordered"
    >
      <button
        class="menu__item menu__item--big"
        @click.prevent="addHireling()"
      >
        Add hireling
      </button>
      <button
        disabled
        class="menu__item menu__item--big"
        @click.prevent="addHireling()"
      >
        Add warband
      </button>
    </div>
    <div
      v-if="characterStore.exp >= 1000"
      class="menu__options menu--bordered"
    >
      <ui-details title="Grits">
        <menu-grits />
      </ui-details>
    </div>
    <div
      v-if="characterStore.name"
      class="menu__bank"
    >
      <ui-details title="Banked items">
        <banked-items />
      </ui-details>
    </div>
  </aside>
</template>

<script setup lang="ts">
import UiDetails from '../ui/UiDetails.vue'
import { usePopupStore } from '../../store/popup'
import MenuItems from './MenuItems.vue'
import MenuConditions from './MenuConditions.vue'
import utilityData from '../../data/utilityList.json'
import weaponData from '../../data/weaponList.json'
import armorData from '../../data/armorList.json'
import spellData from '../../data/spellList.json'
import { Item } from '../../types'
import BankedItems from './MenuBanked.vue'
import { useCharacterStore } from '../../store/character'
import MenuGrits from './MenuGrits.vue'

const popupStore = usePopupStore()
const characterStore = useCharacterStore()

const utilityList = utilityData.list as Item[]
const weaponList = weaponData.list as Item[]
const armorList = armorData.list as Item[]
const spellList = spellData.list as Item[]

const createNewCharacter = () => popupStore.setPopup('new')

const downloadCharacter = () => {
  const character = { ...characterStore }

  Object.keys(character).forEach(key => {
    if (key.includes('_') || key.includes('$')) {
      delete character[key as keyof typeof character]
    }
  })

  const fileName = `${character.name}.json`
  const fileContent = JSON.stringify(character)

  const element = document.createElement('a')
	element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(fileContent))
	element.setAttribute('download', fileName)

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()
	document.body.removeChild(element)
}

const addCustomItem = () => popupStore.setPopup('addCustomItem')

const addHireling = () => popupStore.setPopup('addHireling')
</script>

<style lang="scss">
.menu {
  width: 250px;
  max-height: 100%;
  padding-right: 4px;
  overflow-y: scroll;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

    &--big {
      position: relative;
      padding: 15px;
      font-family: "Ubuntu", sans-serif;
      font-size: 2.2em;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      color: var(--main);
      border: none;
    }
  }

  &__info {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--main);
    border: 2px solid var(--main);
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background: var(--second-background);
    }
  }

  &--bordered {
    border-bottom: 1px solid var(--main);
  }
}
</style>
