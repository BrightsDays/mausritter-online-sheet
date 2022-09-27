<template>
  <div class="items">
    <div
      v-for="item in props.itemsList"
      :id="item.title"
      :key="item.title"
      class="items__item"
      draggable="true"
      @dragstart="onDragging"
    >
      <span class="items__title">{{ item.title }}</span>
      <div class="items__status">
        <span
          v-if="item.stat"
          class="items__stat"
        >{{ item.stat }}</span>
      </div>
      <span class="items__type">{{ item.type }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item } from '../../types'
import { type PropType } from 'vue'
import onDragging from '../../helpers/onDragging'

const props = defineProps({
  itemsList: {
    type: Object as PropType<Item[]>,
    required: true,
  }
})
</script>

<style lang="scss">
.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: -14px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 121px;
    height: 121px;
    padding: 5px;
    border: 1px solid var(--main);
    color: var(--main);
    cursor: move;
    position: relative;
    left: 0.5px;
  }

  &__title {
    display: inline-block;
    width: calc(100% + 10px);
    min-height: 24px;
    margin: 0 0 0 -5px;
    padding: 0 0 5px 10px;
    text-align: left;
    font-family: 'Pirata One', sans-serif;
    font-size: 1.8em;
    line-height: 1;
    border-bottom: 1px solid var(--main);
    pointer-events: none;
    background: top;
  }

  &__status {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: max-content;
    margin: 5px 0 auto;
    background: top;
    pointer-events: none;//TODO: status control
  }

  &__stat {
    display: inline-block;
    padding: 5px;
    font-size: 1.6em;
    border: 1px solid var(--main);
    pointer-events: none;
    background: top;
  }

  &__type {
    font-size: 1.4em;
    text-align: left;
    pointer-events: none;
    background: top;
  }
}
</style>
