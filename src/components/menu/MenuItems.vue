<template>
  <div class="items">
    <UiItemCard
      v-for="item in props.itemsList"
      :id="item.title"
      :key="item.title"
      draggable="true"
      :item="item"
      is-cell
      @dragstart="onDragging($event, item as Card)"
    />
  </div>
</template>

<script setup lang="ts">
import { Item, Card } from '../../types/'
import { type PropType } from 'vue'
import { onDragging } from '../../helpers/dragNDrop'
import UiItemCard from '../ui/UiItemCard.vue'

const props = defineProps({
  itemsList: {
    type: Object as PropType<Item[]>,
    required: true,
  }
})
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: 120px 120px;
  border: 1px solid var(--main);
}
</style>
