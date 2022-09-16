<template>
  <div
    class="pack-items__item items__item"
    draggable="true"
    @dragstart="onDragging"
  >
    <span class="items__title">{{ item.title }}</span>
    <div class="items__status">
      <ui-item-checkbox />
      <span v-if="item.stat" class="items__stat">{{ item.stat }}</span>
    </div>
    <span class="items__type">{{ item.type }}</span>
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

const item = findItem(props.item)
</script>

<style>

</style>