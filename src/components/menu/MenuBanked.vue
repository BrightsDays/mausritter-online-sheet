<template>
  <div class="banked">
    <div
      v-for="item in characterStore.bank"
      :id="`${item.name}`"
      :key="`pb__${item}`"
      class="item"
      @drop="event => drop(event, 'bank', characterStore)"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <div
        v-if="!item.item"
        class="dotted"
      />
             
      <UiItemCard
        v-else
        :item="item.item"
        is-cell
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'
import UiItemCard from '../ui/UiItemCard.vue'

const characterStore = useCharacterStore()
</script>

<style lang="scss">
.banked {
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

    .dotted::before {
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