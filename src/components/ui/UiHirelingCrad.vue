<template>
  <div class="hirelings-item">
    <h3 class="hirelings-item__heading">
      {{ props.hireling.name }}
    </h3>
    <div class="hirelings-item__wrapper">
      <div class="stats">
        <span class="stats__info stats__max">Max</span>
        <span class="stats__info stats__current">Current</span>
        <div class="stats__list">
          <div
            v-for="item in props.hireling.stats"
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
            <!-- <ui-stat-buttons
              :grow="() => growStat(item.name, item.max)"
              :down="() => downStat(item.name)"
            /> -->
          </div>
        </div>
      </div>
      <character-inventory />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterInventory from '../sheet/CharacterInventory.vue'

const props = defineProps({
  hireling: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.hirelings-item {
  padding-top: 10px;
  text-align: left;
  border-top: 2px solid var(--second);

  &__heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 2.6em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  &__wrapper {
    display: flex;
    gap: 15px;
  }
}
</style>