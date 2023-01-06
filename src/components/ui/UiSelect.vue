<template>
  <div class="select">
    <label
      v-if="label"
      class="label"
    >{{ label }}</label>
    <select
      class="input"
      def
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ toUppercase ? option.toUpperCase() : option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const {
  label,
  options,
  toUppercase,
  modelValue
} = defineProps<{
  label?: string
  options: string[]
  toUppercase?: boolean
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  gap: 20px;

  .input {
    position: relative;
    font-family: "Pirata One", sans-serif;
    font-size: 3em;
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