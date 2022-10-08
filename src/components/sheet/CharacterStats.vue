<template>
  <div class="stats">
    <span class="stats__info stats__max">Max</span>
    <span class="stats__info stats__current">Current</span>
    <div class="stats__list">
      <div
        v-for="item in stats"
        :key="item.name"
        class="stats__item"
        :class="item.name === 'hp' && 'stats__hp'"
      >
        <label class="stats__label">{{ item.name }}</label>
        <input
          v-model="item.max"
          type="number"
          class="stats__input"
          readonly
        >
        <input
          v-model="item.current"
          type="number"
          class="stats__input"
          readonly
        >
        <ui-stat-buttons
          :grow="() => growStat(item.name, item.max)"
          :down="() => downStat(item.name)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/character'
import { computed } from 'vue'
import changeStat from '../../helpers/changeStat'
import UiStatButtons from '../ui/UiStatButtons.vue';
//TODO Use as single components with props
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
  },
  {
    name: 'hp',
    max: store.maxHp,
    current: store.hp
  }
])

const growStat = (stat: string, maxValue: number) => {
  const target = stats.value.find(el => el.name === stat)
  if (target && target.current < maxValue) changeStat(stat, target.current + 1)
}

const downStat = (stat: string) => {
  const target = stats.value.find(el => el.name === stat)
  if (target && target.current > 0) changeStat(stat, target.current - 1)
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
  }

  &__hp {
    border-top: 2px solid var(--main);
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
    
    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &:nth-child(3) {
      color: var(--special);
      box-shadow: -5px 0px 0px -3px var(--main);
    }
  }
}
</style>
