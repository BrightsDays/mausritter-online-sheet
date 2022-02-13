<template>
  <div class="points">
    <div
        v-for="(item, index) in points"
        :key="item"
        class="points__item"
        :class="{ 'points__item--used': item.isUsed.value }"
        @click="useItem(index)"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const points = [
  {
    key: 'first',
    isUsed: ref(false)
  },
  {
    key: 'second',
    isUsed: ref(false)
  },
  {
    key: 'third',
    isUsed: ref(false)
  }
]

const useItem = (index: number) => points[index].isUsed.value = ! points[index].isUsed.value
</script>

<style lang="scss">
.points {
  display: flex;
  flex-direction: row;
  gap: 5px;

  &__item {
    display: block;
    position: relative;
    width: 15px;
    height: 15px;
    border: 1px solid var(--main);
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;

    &--used {
      background: var(--main);
    }
  }
}
</style>
