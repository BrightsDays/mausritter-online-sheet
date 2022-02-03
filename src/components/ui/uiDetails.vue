<template>
  <div class="details">
    <div
        :class="['details__summary', {'details__summary--open': isOpen}]"
        @click="toggleDetails()"
    >
      {{ title }}
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="details__content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {type: String, default: 'Title'}
})
let isOpen = ref(false)

const toggleDetails = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss">
.details {
  padding: 15px;
  border-top: 1px solid var(--summary);
  border-bottom: 1px solid var(--summary);

  &__summary {
    position: relative;
    list-style: none;
    font-size: 2.2em;
    font-weight: 500;
    cursor: pointer;
    transition: padding 0.3s;
    text-align: left;
    color: var(--main);

    &:before, &:after {
      content: '';
      position: absolute;
      border-top: 2px solid var(--main);
      transition: transform 0.4s;
    }

    &:before {
      top: 12px;
      right: 0;
      width: 15px;
      transform: rotate(-40deg);
    }

    &:after {
      top: 12px;
      right: 11px;
      width: 15px;
      transform: rotate(40deg);
    }

    &--open {
      &:before {
        transform: rotate(40deg);
      }

      &:after {
        transform: rotate(-40deg);
      }
    }
  }
}
</style>
