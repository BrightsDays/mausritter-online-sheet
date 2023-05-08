<template>
  <div
    class="item"
    :class="[
      (item.type === 'Heavy' ||
        item.type === 'Heavy armor' ||
        item.type === 'Heavy ranged' ||
        item.type === 'Height utility')
        && 'heavy',
      (item.type === 'Light armor' || item.type === 'Wide utility')
        && `wide`,
      item.type === 'Big utility' && `big`]"
    draggable="true"
    @dragstart="onDragging($event, item as Card)"
  >
    <span class="title">{{ item.title }}</span>
    <div class="status">
      <div class="points">
        <div
          v-for="point in [0, 1, 2]"
          :key="`pt_${point}`"
          class="point"
          :class="{ 'used': +props.item.used > point }"
          @click="useItem(point)"
        />
      </div>
      <span
        v-if="item.stat"
        class="stat"
      >
        {{ item.stat }}
      </span>
      <img
        v-if="imageUrl"
        class="image"
        :src="imageUrl"
        :alt="item.title"
      >
    </div>
    <span class="type">
      {{ item.type }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Card } from '../../types/index'
import { onDragging } from '../../helpers/dragNDrop'
import { computed } from 'vue'

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

const imageUrl = computed(() => props.item.image
  ? new URL(`../../assets/img/${props.item.image}.svg`, import.meta.url).href
  : null)

const emit = defineEmits({
  pointClick: (key) => key
})

const useItem = (index: number) => {
  emit('pointClick', index + 1)
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 120px;
  height: 120px;
  padding: 5px;
  box-shadow: inset 0px 0px 0px 1px var(--main);
  color: var(--main);
  background-color: var(--background);
  cursor: move;
  overflow: hidden;
  z-index: 1;

  &.heavy {
    height: 240px;

    .status .image {
      height: 160px;
      bottom: 15px;
    }
  }

  &.wide {
    width: 240px;

    .status .image {
      width: 160px;
      transform: translate(80px, 0);
    }
  }

  &.big {
    width: 240px;
    height: 240px;

    .status .image {
      transform: translate(100px, 0);
      width: 200px;
      height: 200px;
    }
  }

  .title {
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

  .status {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: max-content;
    margin: 5px 0 auto;
    background: top;

    .points {
      display: flex;
      flex-direction: row;
      gap: 3px;
      background: top;
      
      .point {
        display: block;
        position: relative;
        width: 15px;
        height: 15px;
        border: 1px solid var(--main);
        border-radius: 50%;
        z-index: 1;
        cursor: pointer;
        background: top;
      
        &.used {
          background: var(--main);
        }
      }
    }

    .stat {
      display: inline-block;
      margin-left: auto;
      padding: 5px;
      font-size: 1.6em;
      border: 1px solid var(--main);
      pointer-events: none;
      background: top;
    }
    
    .image {
      position: absolute;
      right: 50%;
      transform: translate(50px, 0);
      height: 80px;
      background: none;
      pointer-events: none;
      bottom: 0px;
    }
  }

  .type {
    font-size: 1.4em;
    text-align: left;
    pointer-events: none;
    background: top;
  }
}
</style>