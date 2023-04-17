<template>
  <div
    class="input"
    @drop="event => drop(event, 'drop', characterStore)"
    @dragover="allowDrop"
    @dragleave="leaveDrag"
  >
    <label
      id="drop"
      class="label"
    >Drop item</label>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'

const characterStore = useCharacterStore()
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  border: 2px solid var(--main);
  font-family: 'Ubuntu', sans-serif;
  color: var(--main);
  margin-left: auto;
  width: 211px;
  text-align: center;

  .label {
    display: inline-block;
    padding: 10px;
    font-size: 1.4em;
    background: var(--second-background);
    width: 100%;
    background: var(--background);
  }
  
  .droppable {
    background-color: var(--second-background);
  }
}
</style>