<template>
  <div
    class="pack-items__item conditions__item"
    draggable="true"
    @dragstart="onDragging($event, condition as Card)"
  >
    <span class="conditions__title">{{ props.condition.title }}</span>
    <span class="conditions__description">{{ props.condition.description }}</span>
    <span class="conditions__clear">
      <b class="conditions__clear">Clear:</b><br>
      {{ props.condition.clear }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onDragging } from '../../helpers/dragNDrop'
import { Card } from '../../types/index'

const props = defineProps({
  condition: {
    type: Object,
    required: true,
  }
})
</script>

<style>

</style>