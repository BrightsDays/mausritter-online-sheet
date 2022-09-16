<template>
  <div
    class="pack-items__item items__item"
    draggable="true"
    @dragstart="onDragging"
    v-if="findedItem"
  >
    <span class="items__title">{{ findedItem.title }}</span>
    <div class="items__status">
      <ui-item-checkbox />
      <span v-if="findedItem.stat" class="items__stat">{{ findedItem.stat }}</span>
    </div>
    <span class="items__type">{{ findedItem.type }}</span>
  </div>
</template>

<script setup lang="ts">
import { Item } from '../../types'
import onDragging from '../../plugins/onDragging'
import items from '../../data/utilityList.json'
import spells from '../../data/spellList.json'
import weapons from '../../data/weaponList.json'
import UiItemCheckbox from '../ui/UiItemCheckboxes.vue'

const props = defineProps({
  item: {
    type: String,
    required: true,
  }
})

const findItem = (title: string): Item | null => {
  const listToFind = [...items.list, ...spells.list, ...weapons.list]

  const findedItem = listToFind.filter(item => item.title === title)[0]

  return findedItem
    ? findedItem as Item
    : null
}

const findedItem = findItem(props.item)
</script>

<style>

</style>