<template>
  <aside class="menu">
    <div class="menu__header menu--bordered">
      <h1 class="menu__heading">Character Sheet v.0.0.0</h1>
<!--      <button-->
<!--          class="menu__toggle"-->
<!--          @click="changeColorMode()"-->
<!--      />-->
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
import {useStore} from 'vuex'
import rollDices from '../plugins/rollDices'
import Conditions from './menu/Conditions.vue'
import Items from './menu/items.vue'

const store = useStore()

const createCharacter = () => {
  const statList = ['str', 'dex', 'wil', 'hp', 'pips']

  statList.forEach(item => {
    const value = (item === 'hp' || item === 'pips') ?
        rollDices(1, 6) :
        rollDices(3, 6, 'min')

    store.dispatch('setStat', {
      statName: item,
      statValue: value
    })
    if (item === 'hp') store.dispatch('setStat', {
      statName: 'startHp',
      statValue: value
    })
    if (item === 'pips') store.dispatch('setStat', {
      statName: 'startPips',
      statValue: value
    })
  })
}
</script>

<style lang="scss">
.menu {
  width: 250px;

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
