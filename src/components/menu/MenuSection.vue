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
          <input
            id="upload"
            ref="upload"
            type="file"
            accept=".json"
            class="menu__item--upload"
            @change="uploadCharacter($event)"
          >
          <label
            for="upload"
            class="menu__item"
          >
            Upload character
          </label>
        </div>
        <!-- <button
          class="menu__item"
          disabled
        >
          Save as PDF
        </button> -->
        <button
          class="menu__item"
          :disabled="!characterStore.name"
        >
          Clear sheet
        </button>
      </ui-details>
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
      <button
        class="menu__item menu__item--big"
        @click.prevent="addHireling()"
      >
        Add hireling
      </button>
    </div>
    <div class="menu__bank">
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

const uploadCharacter = (event: Event) => {
  if (event.target) {
    const reader = new FileReader()

    reader.onload = (read) => {
      if (read?.target?.result) {
        const testCharacter = { ...characterStore }

        Object.keys(testCharacter).forEach(key => {
          if (key.includes('_') || key.includes('$')) {
            delete testCharacter[key as keyof typeof testCharacter]
          }
        })

        const character = JSON.parse(read.target.result)
        let isValid = true
        
        Object.keys(character).forEach((key: string) => {
          if (!Object.keys(testCharacter).includes(key)) {
            isValid = false
          }
        })

        if (isValid) characterStore.fillCharacter(character)
      }
    }

    reader.readAsText(event.target.files[0])
  }
}

const addHireling = () => popupStore.setPopup('addHireling')
</script>

<style lang="scss">
.menu {
  width: 250px;
  max-height: 100%;
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

    &--upload {
      display: none;
    }
  }

  &--bordered {
    border-bottom: 1px solid var(--main);
  }
}
</style>
