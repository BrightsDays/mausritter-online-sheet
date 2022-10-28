<template>
  <div
    class="pack-items__item items__item"
    :class="[
      (item.type === 'Heavy' ||
        item.type === 'Heavy armor' ||
        item.type === 'Heavy ranged' ||
        item.type === 'Hight Utility')
        && 'pack-items__item--hight',
      (item.type === 'Light armor' || item.type === 'Wide Utility')
        && `pack-items__item--wide`,
      item.type === 'Big Utility' && `pack-items__item--big`]"
    draggable="true"
    @dragstart="onDragging($event, item as Card)"
  >
    <span class="items__title">{{ item.title }}</span>
    <div class="items__status">
      <div class="points">
        <div
          v-for="point in [0, 1, 2]"
          :key="`pt_${point}`"
          class="points__item"
          :class="{ 'points__item--used': +props.item.used > point }"
          @click="useItem(point)"
        />
      </div>
      <span
        v-if="item.stat"
        class="items__stat"
      >{{ item.stat }}</span>
      <img
        v-if="imageUrl"
        class="items__image"
        :class="(item.type === 'Heavy' ||
          item.type === 'Heavy ranged') && 'items__image--heavy'"
        :src="imageUrl"
        :alt="item.title"
      >
    </div>
    <span class="items__type">{{ item.type }}</span>
  </div>
</template>

<script setup lang="ts">
import { Card } from '../../types'
import { onDragging } from '../../helpers/dragNDrop'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  hirelingIndex: {
    type: Number,
    required: false,
    default: undefined
  }
})

const imageUrl = props.item.image
  ? new URL(`../../assets/img/${props.item.image}.svg`, import.meta.url).href
  : null

const emit = defineEmits({
  pointClick: (key) => key
})

const useItem = (index: number) => {
  emit('pointClick', index + 1)
}
</script>

<style lang="scss">
.points {
  display: flex;
  flex-direction: row;
  gap: 3px;
  background: top;
  
  &__item {
    display: block;
    position: relative;
    width: 15px;
    height: 15px;
    border: 1px solid var(--main);
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
    background: top;
  
    &--used {
      background: var(--main);
    }
  }
}
</style>