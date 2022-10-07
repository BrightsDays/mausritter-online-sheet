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
          @click="createNewCharacter()"
        >
          Create new character
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
          Load from local storage
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
          Upload character
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
      <button
        class="menu__item menu__item--big"
        @click.prevent="addHireling()"
      >
        Add hireling
      </button>
    </div>
    <div class="menu__bank">
      <ui-details title="Banked items" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import UiDetails from './ui/UiDetails.vue'
import { usePopupStore } from '../store/popup'
import MenuItems from './menu/MenuItems.vue'
import MenuConditions from './menu/MenuConditions.vue'
import utilityData from '../data/utilityList.json'
import weaponData from '../data/weaponList.json'
import spellData from '../data/spellList.json'
import { Item } from '../types'

const popup = usePopupStore()

const utilityList = utilityData.list as Item[]
const weaponList = weaponData.list as Item[]
const spellList = spellData.list as Item[]

const createNewCharacter = () => popup.setPopup('new')

const addHireling = () => popup.setPopup('addHireling')
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

  &--bordered {
    border-bottom: 1px solid var(--main);
  }
}
</style>
