<template>
  <div
    class="hirelings"
  >
    <div class="header">
      <h2 class="heading">
        Hirelings
      </h2>
      <span class="count">
        {{ characterStore.hirelings.length }}
      </span>
    </div>
    <div
      v-if="characterStore.hirelings"
      class="list"
    >
      <ui-hireling-crad
        v-for="hireling in characterStore.hirelings" 
        :key="`hr__${hireling}`"
        :hireling="hireling"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import UiHirelingCrad from './HirelingItem.vue'

const characterStore = useCharacterStore()
</script>

<style lang="scss" scoped>
.hirelings {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  .count {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--second);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>