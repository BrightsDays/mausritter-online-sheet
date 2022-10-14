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
      <ui-hireling-crad
        v-for="hireling, index in characterStore.hirelings" 
        :key="`hr__${index}`"
        :hireling="hireling"
      />
      <!-- <div
        v-for="hireling, index in characterStore.hirelings" 
        :key="`hr__${index}`"
        class="hirelings-item"
      > -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import UiHirelingCrad from './CharHirelingItem.vue'

const characterStore = useCharacterStore()
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
}
</style>