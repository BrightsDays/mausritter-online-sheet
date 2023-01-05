<template>
  <div class="input">
    <label class="label">{{ label }}</label>
    <input
      v-if="type === 'text'"
      class="text"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <input
      v-if="type === 'number'"
      v-maska="'######'"
      class="text"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
const {
  label,
  type,
  modelValue
} = defineProps<{
  label: string
  type: 'text' | 'number'
  modelValue: string | number
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 20px;

  .text {
    width: 100%;
    text-align: right;
    font-family: "Cookie", sans-serif;
    font-size: 3em;
    color: var(--main);
    border: none;
    border-bottom: 1px solid var(--main);
    outline: none;
    appearance: none;
  }

  .label {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    color: var(--second);
  }
}
</style>