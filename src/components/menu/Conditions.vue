<template>
  <vue-draggable-next
      class="conditions"
      :list="conditionsList"
      :group="{ name: 'items', pull: 'clone', put: false }"
      :sort="true"
  >
    <div
        class="conditions__item"
        v-for="item in conditionsList"
        :key="item.title"
    >
      <span class="conditions__title">{{ item.title}}</span>
      <span class="conditions__description">{{item.description}}</span>
      <span class="conditions__clear"><b class="conditions__clear">Clear:</b><br>{{item.clear}}</span>
    </div>
  </vue-draggable-next>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import {useStore} from 'vuex'
import conditionsData from '../../data/conditionsList.json'

const store = useStore()

const conditionsList = []
Object.values(conditionsData).forEach(item => conditionsList.push(item))
</script>

<style lang="scss">
.conditions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: -14px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 124px;
    height: 124px;
    padding: 10px;
    border: 1px solid var(--main);
    color: var(--main);
    cursor: move;
  }

  &__title {
    font-family: 'Pirata One', sans-serif;
    font-size: 2em;
    line-height: 1;
  }

  &__description {
    font-size: 1.1em;
    text-align: left;
  }

  &__clear {
    font-size: 1.1em;
    text-align: left;
  }
}
</style>
