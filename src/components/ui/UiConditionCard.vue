<template>
  <div
    class="pack-items__item conditions__item"
    draggable="true"
    @dragstart="onDragging"
  >
    <span class="conditions__title">{{ condition.title}}</span>
    <span class="conditions__description">{{condition.description}}</span>
    <span class="conditions__clear">
      <b class="conditions__clear">Clear:</b><br>
      {{condition.clear}}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Condition } from '../../types'
import onDragging from '../../plugins/onDragging'
import conditions from '../../data/conditionsList.json'

const props = defineProps({
  condition: {
    type: String,
    required: true,
  }
})

const findCondition = (title: string): Condition | null => {
  const findedCondition = conditions.list.filter(item => item.title === title)[0]

  return findedCondition
    ? findedCondition as Condition
    : null
}

const condition = findCondition(props.condition)
</script>

<style>

</style>