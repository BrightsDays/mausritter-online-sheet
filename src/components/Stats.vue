<template>
  <div class="stats">
    <span class="stats__info stats__max">Max</span>
    <span class="stats__info stats__current">Current</span>
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
  position: relative;
  padding-top: 20px;

  &__info {
    position: absolute;
    top: 0;
    font-family: 'Ubuntu', sans-serif;
    color: var(--second);
    font-size: 1.4em;
    line-height: 1;
  }

  &__max {
    right: 100px;
  }

  &__current {
    right: 25px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--main);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
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
