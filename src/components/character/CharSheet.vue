<template>
  <div
    class="character"
    :class="{'disabled': !characterStore.name}"
  >
    <CharAbout />
    <CharInfo />
    <CharItems />
    <HirelingsList v-if="characterStore.hirelings.length" />
    <WarbandCard v-if="characterStore.warband" />
  </div>
</template>

<script setup lang="ts">
import CharAbout from "./CharAbout.vue"
import CharInfo from "./CharInfo.vue"
import CharItems from "./CharItems.vue"
import HirelingsList from "../hireling/HirelingsList.vue"
import WarbandCard from '../warband/WarbandCard.vue'
import { useCharacterStore } from "../../store/character"

const characterStore = useCharacterStore()
</script>

<style lang="scss">
.character {
  width: 626px;
  display: flex;
  padding-top: 20px;
  padding-right: 4px;
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
