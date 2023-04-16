<template>
  <CharInfo />
  <CharItems />
  <HirelingsList v-if="characterStore.hirelings.length" />
</template>

<script setup lang="ts">
import CharInfo from "./CharInfo.vue"
import CharItems from "./CharItems.vue"
import HirelingsList from "../hireling/HirelingsList.vue"
import { useCharacterStore } from "../../store/character"

const characterStore = useCharacterStore()
</script>
