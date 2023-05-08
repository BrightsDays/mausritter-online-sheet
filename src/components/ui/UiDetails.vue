<template>
  <div class="details">
    <div
      :class="['summary', {'open': isOpen}]"
      @click="toggleDetails()"
    >
      {{ props.title }}
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  isOpen: {
    type: Boolean,
    required: false
  }
})

const isOpen = ref(props.isOpen || false)

const toggleDetails = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.details {
  padding: 15px 0;

  .summary {
    position: relative;
    padding: 0 15px;
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

    .open {
      &:before {
        transform: rotate(40deg);
      }

      &:after {
        transform: rotate(-40deg);
      }
    }
  }

  .content {
    padding-top: 10px;

    .points {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
