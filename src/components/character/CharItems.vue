<template>
  <header class="items__header">
    <h2 class="items__heading">
      Inventory
    </h2>
    <div
      class="drop-input"
      @drop="event => drop(event, 'drop', characterStore)"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <label
        id="drop"
        class="drop-input__label"
      >Drop item</label>
    </div>
    <div class="pips-input">
      <label class="pips-input__label">Pips</label>
      <input
        v-maska="'###'"
        class="pips-input__input"
        :value="characterStore.pips"
        @input="updatePips($event.target as HTMLInputElement)"
      >
    </div>
  </header>
  <char-inventory
    :body-back="characterStore.bodyBack"
    :pack-back="characterStore.packBack"
  />
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import CharInventory from '../character/CharInventory.vue'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'

const characterStore = useCharacterStore()

const updatePips = (eventTarget: HTMLInputElement) => 
  characterStore.setValue('pips', +eventTarget.value)
</script>

<style lang="scss">
.items {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__heading {
    display: inline-block;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }
}

.pips-input,.grit-input,.drop-input {
  position: relative;
  border: 2px solid var(--main);
  font-family: 'Ubuntu', sans-serif;
  color: var(--main);

  &:after {
    content: '/ 250';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.4em;
  }

  &__label {
    display: inline-block;
    padding: 10px;
    font-size: 1.4em;
    background: var(--second-background);
  }

  &__input {
    display: inline-block;
    width: 80px;
    padding: 8px 45px 8px 10px;
    color: var(--main);
    font-family: 'Ubuntu', sans-serif;
    text-align: center;
    font-size: 1.4em;
    border: none;
    outline: none;
  }
}

.drop-input {
  margin-left: auto;
  width: 211px;

  &__label {
    width: 100%;
    background: var(--background);
  }
  
  &:after {
    content: '';
  }
}

.grit-input {
  &:after {
    content: '';
  }

  &__input {
    width: 29px;
    padding: 8px 0px;
  }

  &__devider {
    font-size: 1.4em;
    color: var(--main);
  }
}
</style>
