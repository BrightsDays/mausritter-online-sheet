<template>
  <div class="stats">
    <div class="stats__list">
      <div
          class="stats__item"
          v-for="item in stats"
          :key="item.name"
      >
        <label class="stats__label">{{ item.name }}</label>
        <input class="stats__input" />
        <input class="stats__input" />
      </div>
    </div>
    <div class="stats__hp stats__item">
      <label class="stats__label">HP</label>
      <input class="stats__input" />
      <input class="stats__input" />
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = {
  str: {
    name: 'STR',
    max: {type: Number},
    current: {type: Number}
  },
  dex: {
    name: 'DEX',
    max: {type: Number},
    current: {type: Number}
  },
  wil: {
    name: 'WIL',
    max: {type: Number},
    current: {type: Number}
  }
}
</script>

<style lang="scss">
.stats {
  width: 100%;
  margin-top: 150px;

  &__list {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--main);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  &__hp {
    border: 2px solid var(--main);
    border-radius: 10px;
    overflow: hidden;
  }

  &__item {
    display: flex;
  }

  &__label {
    display: inline-block;
    width: 40%;
    padding: 10px;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);
    background-color: var(--second-background);
  }

  &__input {
    width: 30%;
    padding: 10px 10px 5px 10px;
    border: none;
    font-family: 'Cookie', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);
    outline: none;
    text-align: center;

    &:last-child {
      color: var(--special);
      box-shadow: -5px 0px 0px -3px var(--main);
    }
  }
}
</style>
