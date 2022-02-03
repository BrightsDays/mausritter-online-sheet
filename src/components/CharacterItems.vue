<template>
  <header class="items__header">
    <h2 class="items__heading">Inventory</h2>
    <div class="grit-input">
      <label class="grit-input__label">Grit</label>
      <input class="grit-input__input" />
      <span class="grit-input__devider">/ </span>
      <input class="grit-input__input" />
    </div>
    <div class="pips-input">
      <label class="pips-input__label">Pips</label>
      <input class="pips-input__input" />
    </div>
  </header>
  <inventory :bodyItems="bodyItems" :packItems="packItems" />
</template>

<script setup lang="ts">
import Inventory from "./Inventory.vue";

const bodyItems = {
  mainPaw: {name: 'Main paw'},
  firstBody: {name: 'Body'},
  offPaw: {name: 'Second Paw'},
  secondBody: {name: 'Body'}
}

const packItems = [
  {name: '1'},
  {name: '2'},
  {name: '3'},
  {name: '4'},
  {name: '5'},
  {name: '6'}
]
</script>

<style lang="scss">
.items {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
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

.pips-input,.grit-input {
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

.grit-input {
  margin-left: auto;

  &:after {
    content: '';
  }

  &__input {
    width: 35px;
    padding: 8px 10px;
  }

  &__devider {
    font-size: 1.4em;
    color: var(--main);
  }
}
</style>
