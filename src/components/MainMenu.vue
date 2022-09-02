<template>
  <aside class="menu">
    <div class="menu__header menu--bordered">
      <h1 class="menu__heading">Character Sheet v.0.0.1</h1>
     <!-- <button
         class="menu__toggle"
         @click="changeColorMode()"
     /> -->
    </div>
    <div class="menu__options menu--bordered">
      <ui-details title="Actions" class="menu--bordered">
        <button
            class="menu__item"
            @click="createCharacter()"
        >
          Create new character
        </button>
        <button class="menu__item" disabled>Upload character</button>
        <button class="menu__item" disabled>Download character</button>
        <button class="menu__item" disabled>Save to local storage</button>
        <button class="menu__item" disabled>Save as PDF</button>
      </ui-details>
      <ui-details title="Items">
        <items />
      </ui-details>
      <ui-details title="Spells">

      </ui-details>
      <ui-details title="Conditions">
        <conditions />
      </ui-details>
    </div>
    <div class="menu__bank">
      <ui-details title="Banked items">

      </ui-details>
    </div>
  </aside>
</template>

<script setup lang="ts">
import UiDetails from './ui/UiDetails.vue'
import { useStore } from '../store/pin'
import rollDices from '../plugins/rollDices'
import Conditions from './menu/Conditions.vue'
import Items from './menu/items.vue'
import backgroundList from '../data/backgroundList.json'

const store = useStore()

const createCharacter = () => {
  const statList = ['str', 'dex', 'wil', 'hp', 'pips']

  statList.forEach(item => {
    const value = (item === 'hp' || item === 'pips') ?
        rollDices(1, 6) :
        rollDices(3, 6, 'min')

    store.setStat(item, value)

    if (item === 'hp') store.setStat('startHp', value)

    if (item === 'pips') store.setStat('startPips', value)
  })
  
  const background = backgroundList[store.hp][store.pips].background

  store.setStat('background', background)
}
</script>

<style lang="scss">
.menu {
  width: 250px;
  max-height: 100vh;
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
