<template>
  <div
    class="condition"
    draggable="true"
    @dragstart="onDragging($event, condition as Card)"
  >
    <span class="title">
      {{ condition.title }}
    </span>
    <span class="description">
      {{ condition.description }}
    </span>
    <span class="clear">
      <b class="clear">Clear:</b><br>
      {{ condition.clear }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onDragging } from '../../composables/dragNDrop'
import { Card } from '../../types/cards'
import { Condition } from '../../types/inventory'

const {
  condition
} = defineProps<{
  condition: Condition
}>()
</script>

<style lang="scss" scoped>
.condition {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 120px;
  height: 120px;
  padding: 10px;
  box-shadow: inset 0px 0px 0px 1px var(--main);
  color: var(--main);
  background-color: var(--background);
  cursor: move;
  z-index: 1;

  .title {
    color: var(--special);
    font-family: 'Pirata One', sans-serif;
    font-size: 2em;
    line-height: 1;
  }

  .description {
    font-size: 1.1em;
    text-align: left;
  }

  .clear {
    font-size: 1.1em;
    text-align: left;
  }
}
</style>