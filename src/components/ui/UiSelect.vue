<template>
  <div class="select">
    <label class="label">{{ label }}</label>
    <select
      class="input"
      def
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option
        v-for="option in options"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const {
  label,
  options,
  modelValue
} = defineProps<{
  label: string
  options: string[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  &::after {
      content: '⌄';
      position: absolute;
      top: 0;
      right: 0;
      font-size: 2.6em;
      color: var(--main);
    }

  .input {
    position: relative;
    margin: -2px 0 0 10px;
    font-family: "Pirata One", sans-serif;
    font-size: 3em;
    padding-right: 20px;
    color: var(--main);
    border: none;
    outline: none;
    cursor: pointer;
    appearance: none;

    option {
      font-size: 1em;
      direction: rtl;
    }
  }
  .label {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    color: var(--second);
  }
}
</style>