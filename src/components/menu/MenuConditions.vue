<template>
  <div class="conditions">
    <UiConditionCard
      v-for="condition in conditions.list"
      :key="condition.title"
      :condition="(condition as Condition)"
      class="conditions__item"
      draggable="true"
      @dragstart="onDragging($event, condition as Card)"
    />
  </div>
</template>

<script setup lang="ts">
import conditions from '../../data/conditionList.json'
import { onDragging } from '../../composables/dragNDrop'
import { Card } from '../../types/cards'
import { Condition } from '../../types/inventory'
import UiConditionCard from '../ui/UiConditionCard.vue'
</script>

<style lang="scss" scoped>
.conditions {
  display: grid;
  grid-template-columns: 120px 120px;
  border: 1px solid var(--main);
}
</style>
