<template>
  <div class="items">
    <div
        class="items__item"
        v-for="item in weaponsList"
        :key="item.title"
        :id="item.title"
        draggable="true"
        @dragstart="onDragging"
    >
      <span class="items__title">{{ item.title }}</span>
      <div class="items__status">
        <span v-if="item.stat" class="items__stat">{{ item.stat }}</span>
      </div>
      <span class="items__type">{{ item.type }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import weaponsData from '../../data/weaponList.json'
import { Item } from '../../types'

const weaponsList: Item[] = []
Object.values(weaponsData).forEach(item => weaponsList.push(item))

const onDragging = (event: DragEvent) => {
  if (event.dataTransfer) {    
    event.dataTransfer.setData('text', event.target.childNodes[0].textContent)
  }
}
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
