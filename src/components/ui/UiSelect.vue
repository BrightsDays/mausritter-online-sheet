<template>
  <div class="select">
    <label
      v-if="label"
      class="label"
    >{{ label }}</label>

    <button
      class="input"
      @click.stop="clickHandler()"
    >
      {{ toUppercase ? selectedOption.toUpperCase() : selectedOption }}
    </button>

    <UiSelectList
      v-if="showOptions"
      :to-upper-case="toUppercase"
      :options="options"
      @close="showOptions = false"
      @select="(val) => selectHandler(val)"
    />
  </div>
</template>

<script setup lang="ts">
import UiSelectList from './UiSelectList.vue'

const {
  label,
  options,
  toUppercase = false,
  modelValue
} = defineProps<{
  label?: string
  options: string[]
  toUppercase?: boolean
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

let showOptions = $ref(false)
let selectedOption = $ref(options[0])

const clickHandler = () => {
  const list = document.querySelector('#select-list')
  showOptions = !list ? true : false
}

const selectHandler = (option: string) => {
  selectedOption = option
  showOptions = false
  emit('update:modelValue', option)
}
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
    width: 100%;
    font-family: "Pirata One", sans-serif;
    font-size: 3em;
    text-align: right;
    color: var(--main);
    border: none;
    outline: none;
    cursor: pointer;
    appearance: none;
    white-space: nowrap;
  }

  .label {
    width: 100%;
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    color: var(--second);
  }
}
</style>