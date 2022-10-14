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
      <label class="drop-input__label">Drop item</label>
    </div>
    <div class="grit-input">
      <label class="grit-input__label">Grit</label>
      <input
        v-model="grit"
        class="grit-input__input"
        readonly
      >
      <span class="grit-input__devider">/ </span>
      <input
        v-model="maxGrit"
        class="grit-input__input"
        readonly
      >
    </div>
    <div class="pips-input">
      <label class="pips-input__label">Pips</label>
      <input
        v-model="characterStore.pips"
        class="pips-input__input"
      >
    </div>
  </header>
  <char-inventory
    :body-back="characterStore.bodyBack"
    :pack-back="characterStore.packBack"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '../../store/character'
import CharInventory from '../tables/CharInventory.vue'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'

const characterStore = useCharacterStore()

const grit = computed(() => characterStore.grit)
const exp = computed(() => characterStore.exp)

const maxGrit = computed(() => {
  let result = 0

  if (exp.value >= 1000) result = 1
  if (exp.value >= 3000) result = 2
  if (exp.value >= 6000) result = 2 + Math.floor(exp.value / 6000)

  return result
})
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

  &__label {
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
