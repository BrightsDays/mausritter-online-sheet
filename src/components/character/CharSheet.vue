<template>
  <div
    class="character"
    :class="{'disabled': !characterStore.name}"
  >
    <CharAbout />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import CharAbout from "./CharAbout.vue"
import { useCharacterStore } from "../../store/character"

const characterStore = useCharacterStore()
</script>

<style lang="scss">
.character {
  width: 626px;
  display: flex;
  padding: 20px 4px 20px 0;
  flex-direction: column;
  gap: 15px;
  max-height: 100%;
  overflow-y: scroll;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
