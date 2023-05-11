<template>
  <div class="grits">
    <div
      v-if="characterStore.exp >= 1000"
      :id="`${characterStore.grit.grit__1.name}`"
      class="item"
      @drop="event => drop(event, 'grit', characterStore)"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <div v-if="!characterStore.grit.grit__1.item" />

      <ui-condition-card
        v-else
        :condition="characterStore.grit.grit__1.item"
        class="banked-items__card"
      />
    </div>
    <div
      v-if="characterStore.exp >= 3000"
      :id="`${characterStore.grit.grit__2.name}`"
      class="item"
      @drop="event => drop(event, 'grit', characterStore)"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <div v-if="!characterStore.grit.grit__2.item" />

      <ui-condition-card
        v-else
        :condition="characterStore.grit.grit__2.item"
        class="banked-items__card"
      />
    </div>
    <div
      v-if="characterStore.exp >= 5000"
      :id="`${characterStore.grit.grit__3.name}`"
      class="item"
      @drop="event => drop(event, 'grit', characterStore)"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <div v-if="!characterStore.grit.grit__3.item" />

      <ui-condition-card
        v-else
        :condition="characterStore.grit.grit__3.item"
        class="banked-items__card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { allowDrop, leaveDrag, drop } from '../../composables/dragNDrop'
import UiConditionCard from '../ui/UiConditionCard.vue'

const characterStore = useCharacterStore()
</script>

<style lang="scss" scoped>
.grits {
  display: grid;
  grid-template-columns: 120px 120px;

  .item {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 120px;
    height: 120px;
    color: var(--main);

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border: 1px dashed var(--second);
      z-index: -1;
    }
  }
}
</style>