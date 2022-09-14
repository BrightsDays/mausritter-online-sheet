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
        <input
          type="number"
          class="stats__input"
          v-model="item.max"
          readonly
        />
        <input
          type="number"
          class="stats__input"
          v-model="item.current"
          @input="changeStat(item.name, $event)"
        />
      </div>
    </div>
    <div class="stats__hp stats__item">
      <label class="stats__label">HP</label>
      <input
        type="number"
        class="stats__input"
        v-model="maxHp"
        readonly
      />
      <input
        type="number"
        class="stats__input"
        v-model="hp"
        @input="changeStat('hp', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/character'
import { computed } from 'vue'
import changeStat from '../../plugins/changeStat'

const store = useStore()

const stats = computed(() => [
  {
    name: 'str',
    max: store.maxStr,
    current: store.str
  },
  {
    name: 'dex',
    max: store.maxDex,
    current: store.dex
  },
  {
    name: 'wil',
    max: store.maxWil,
    current: store.wil
  }
])

const maxHp = computed(() => store.maxHp)
const hp = computed(() => store.hp)
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
    text-transform: uppercase;
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
