<template>
  <div
    v-if="findedItem"
    class="pack-items__item items__item"
    :class="[
      (findedItem.type === 'Heavy' ||
        findedItem.type === 'Heavy armor' ||
        findedItem.type === 'Heavy ranged') 
        && `pack-items__item--heavy`,
      findedItem.type === 'Light armor' && `pack-items__item--light-armor`]"
    draggable="true"
    @dragstart="onDragging"
  >
    <span class="items__title">{{ findedItem.title }}</span>
    <div class="items__status">
      <div class="points">
        <div
          v-for="point in [0, 1, 2]"
          :key="`pt_${point}`"
          class="points__item"
          :class="{ 'points__item--used': +props.used > point }"
          @click="useItem(point)"
        />
      </div>
      <span
        v-if="findedItem.stat"
        class="items__stat"
      >{{ findedItem.stat }}</span>
    </div>
    <span class="items__type">{{ findedItem.type }}</span>
  </div>
</template>

<script setup lang="ts">
import { Item } from '../../types'
import onDragging from '../../helpers/onDragging'
import items from '../../data/utilityList.json'
import spells from '../../data/spellList.json'
import weapons from '../../data/weaponList.json'
import armors from '../../data/armorList.json'

const props = defineProps({
  item: {
    type: String,
    required: true
  },
  used: {
    type: Number,
    required: true,
    default: 0
  }
})

const emit = defineEmits({
  pointClick: (key) => key
})

const useItem = (index: number) => {
  emit('pointClick', index + 1)
}

const findItem = (title: string): Item | null => {
  const listToFind = [...items.list, ...spells.list, ...weapons.list, ...armors.list]

  const findedItem = listToFind.filter(item => item.title === title)[0]

  return findedItem
    ? findedItem as Item
    : null
}

const findedItem = findItem(props.item)
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