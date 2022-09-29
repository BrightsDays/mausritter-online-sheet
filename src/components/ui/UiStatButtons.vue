<template>
  <div class="stat-buttons">
    <button
      class="stat-buttons__button stat-buttons__button--grow"
      @click="props.grow"
    >
      +
    </button>
    <button
      class="stat-buttons__button stat-buttons__button--down"
      @click="props.down"
    >
      -
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'

const props = defineProps({
  grow: {
    type: Function as PropType<() => void>,
    required: true
  },
  down: {
    type: Function as PropType<() => void>,
    required: true
  }
})
</script>

<style lang="scss">
.stat-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;

  &__button {
    width: 25px;
    height: 25px;
    font-size: 2em;
    font-weight: bold;
    color: var(--main);
    border: 2px solid var(--main);
    cursor: pointer;

    &--grow {
      border-radius: 10px 10px 0 0;
      border-bottom: 1px solid var(--main);
    }

    &--down {
      border-radius: 0 0 10px 10px;
      border-top: 1px solid var(--main);
    }

    &:hover {
      background-color: var(--second-background);
    }
  }
}
</style>