<template>
  <button
    class="button"
    :class="type"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const {
  text,
  type,
  disabled = false
} = defineProps<{
  text: string
  type: 'simple' | 'big'
  disabled?: boolean
}>()
</script>

<style lang="scss" scoped>
.button {
  color: var(--main);
  cursor: pointer;
  &:disabled, &[disabled] {
    color: var(--second);
    pointer-events: none;
  }

  &.simple {
    padding: 5px 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.3em;
    border: 2px solid var(--main);
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      background: var(--second-background);
    }
  }

  &.big {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    border: none;
  }
}
</style>