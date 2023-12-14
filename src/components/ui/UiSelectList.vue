<template>
  <div 
    id="select-list"
    v-click-outside="() => emit('close')"
    class="list"
    @mouseleave="emit('close')"
  >
    <div
      v-for="option in options"
      :key="option"
      class="option"
      @click="selectHandler(option)"
    >
      {{ toUpperCase ? option.toUpperCase() : option }}
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  options,
  toUpperCase
} = defineProps<{
  options: string[],
  toUpperCase: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', value: string): void
}>()

const selectHandler = (option: string) => {
  emit('select', option)
  emit('close')
}
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  display: block;
  bottom: 50%;
  right: -15px;
  padding: 10px 15px;
  background: var(--background);
  border: 1px var(--main) solid;
  border-radius: 10px;
  z-index: 1;
  transform: translateY(50%);

  .option {
    font-family: "Pirata One", sans-serif;
    font-size: 3em;
    text-align: right;
    color: var(--main);
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>