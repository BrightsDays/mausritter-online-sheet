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
import { onDragging } from '../../helpers/dragNDrop'
import { Card, Condition } from '../../types/'
import UiConditionCard from '../ui/UiConditionCard.vue'
</script>

<style lang="scss">
.conditions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: -14px;
}
</style>
