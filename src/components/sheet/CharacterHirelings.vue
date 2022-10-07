<template>
  <div
    class="hirelings"
  >
    <div class="hirelings__header">
      <h2 class="hirelings__heading">
        Hirelings
      </h2>
      <span class="hirelings__count">
        {{ characterStore.hirelings.length }}
      </span>
    </div>
    <div
      v-if="characterStore.hirelings"
      class="hirelings__list"
    >
      <div
        v-for="hireling, index in characterStore.hirelings" 
        :key="`hr__${index}`"
        class="hirelings-item"
      >
        <h3 class="hirelings-item__heading">{{ hireling.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/character'

const characterStore = useStore()
</script>

<style lang="scss">
.hirelings {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  &__count {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--second);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &-item {
    padding: 15px;
    text-align: left;
    border: 2px solid var(--main);
    border-radius: 10px;

    &__heading {
      display: inline-block;
      font-family: "Pirata One", sans-serif;
      font-size: 2.6em;
      font-weight: normal;
      line-height: 1;
      color: var(--main);
    }
  }
}
</style>