<template>
  <div class="banked">
    <div class="banked-items">
      <div
        v-for="item in characterStore.bank"
        :id="`${item.name}`"
        :key="`pb__${item}`"
        class="banked-items__item"
        @drop="event => drop(event, 'bank', characterStore)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <div v-if="!item.item" />

        <ui-item-card
          v-else
          :item="item.item"
          class="banked-items__card"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiItemCard from '../ui/UiItemCard.vue'
import { useCharacterStore } from '../../store/character'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'

const characterStore = useCharacterStore()
</script>

<style lang="scss">
.banked-items {
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
    border: 1px dashed var(--second);
  }

  .banked-items__card {
    width: 121px;
    height: 121px;
    margin: -6px;
    border: 1px solid var(--main);
    overflow: hidden;

    .points {
      opacity: 1;
    }

    .items__image--heavy {
      bottom: -80px;
    }

    .items__image--width {
      right: 0px;
    }

    .items__image--big {
      right: -5px;
      bottom: -100px;
    }
  }
}
</style>